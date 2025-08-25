// src/modules/admin/analytics.controller.ts
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Ride, RideStatus } from '../ride/ride.model';
import { User, UserRole } from '../user/user.model';

// Return arrays for last N days
const getLastNDates = (n: number) => {
  const dates: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().slice(0, 10)); // YYYY-MM-DD
  }
  return dates;
};

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    // 1) Ride volume (last 7 days) - group by day (requestedAt)
    const last7 = getLastNDates(7); // array of YYYY-MM-DD strings

    const rideVolumeAgg = await Ride.aggregate([
      {
        $match: {
          'timestamps.requestedAt': { $gte: new Date(new Date().setDate(new Date().getDate() - 6)) },
        },
      },
      {
        $project: {
          day: {
            $dateToString: { format: '%Y-%m-%d', date: '$timestamps.requestedAt' },
          },
        },
      },
      {
        $group: {
          _id: '$day',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Map aggregation result to date->count
    const volumeMap: Record<string, number> = {};
    rideVolumeAgg.forEach((r: any) => (volumeMap[r._id] = r.count));

    const rideVolume = last7.map((d) => ({ date: d, rides: volumeMap[d] ?? 0 }));

    // 2) Revenue (completed rides) - last 7 days sum(fare)
    const revenueAgg = await Ride.aggregate([
      {
        $match: {
          status: RideStatus.COMPLETED,
          'timestamps.completedAt': { $gte: new Date(new Date().setDate(new Date().getDate() - 6)) },
        },
      },
      {
        $project: {
          day: {
            $dateToString: { format: '%Y-%m-%d', date: '$timestamps.completedAt' },
          },
          fare: { $ifNull: ['$fare', 0] },
        },
      },
      {
        $group: {
          _id: '$day',
          total: { $sum: '$fare' },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const revenueMap: Record<string, number> = {};
    revenueAgg.forEach((r: any) => (revenueMap[r._id] = r.total));
    const revenue = last7.map((d) => ({ date: d, revenue: revenueMap[d] ?? 0 }));

    // 3) Driver activity: online vs offline (counts)
    const totalDrivers = await User.countDocuments({ role: UserRole.DRIVER });
    const onlineDrivers = await User.countDocuments({ role: UserRole.DRIVER, isOnline: true });
    const offlineDrivers = totalDrivers - onlineDrivers;

    // Optional: top drivers by completed rides in last 30 days
    const topDriversAgg = await Ride.aggregate([
      {
        $match: {
          status: RideStatus.COMPLETED,
          'timestamps.completedAt': { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) },
        },
      },
      {
        $group: {
          _id: '$driverId',
          rides: { $sum: 1 },
          revenue: { $sum: { $ifNull: ['$fare', 0] } },
        },
      },
      { $sort: { rides: -1 } },
      { $limit: 5 },
      // populate driver info (lookup)
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'driver',
        },
      },
      {
        $unwind: { path: '$driver', preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          driverId: '$_id',
          name: '$driver.name',
          email: '$driver.email',
          rides: 1,
          revenue: 1,
        },
      },
    ]);

    return res.json({
      success: true,
      data: {
        rideVolume,
        revenue,
        driverActivity: [
          { name: 'Online', value: onlineDrivers },
          { name: 'Offline', value: offlineDrivers },
        ],
        topDrivers: topDriversAgg,
      },
    });
  } catch (err) {
    console.error('Analytics error', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch analytics', error: err });
  }
};
