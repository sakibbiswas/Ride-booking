"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalytics = void 0;
const ride_model_1 = require("../ride/ride.model");
const user_model_1 = require("../user/user.model");
// Return arrays for last N days
const getLastNDates = (n) => {
    const dates = [];
    for (let i = n - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dates.push(d.toISOString().slice(0, 10)); // YYYY-MM-DD
    }
    return dates;
};
const getAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1) Ride volume (last 7 days) - group by day (requestedAt)
        const last7 = getLastNDates(7); // array of YYYY-MM-DD strings
        const rideVolumeAgg = yield ride_model_1.Ride.aggregate([
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
        const volumeMap = {};
        rideVolumeAgg.forEach((r) => (volumeMap[r._id] = r.count));
        const rideVolume = last7.map((d) => { var _a; return ({ date: d, rides: (_a = volumeMap[d]) !== null && _a !== void 0 ? _a : 0 }); });
        // 2) Revenue (completed rides) - last 7 days sum(fare)
        const revenueAgg = yield ride_model_1.Ride.aggregate([
            {
                $match: {
                    status: ride_model_1.RideStatus.COMPLETED,
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
        const revenueMap = {};
        revenueAgg.forEach((r) => (revenueMap[r._id] = r.total));
        const revenue = last7.map((d) => { var _a; return ({ date: d, revenue: (_a = revenueMap[d]) !== null && _a !== void 0 ? _a : 0 }); });
        // 3) Driver activity: online vs offline (counts)
        const totalDrivers = yield user_model_1.User.countDocuments({ role: user_model_1.UserRole.DRIVER });
        const onlineDrivers = yield user_model_1.User.countDocuments({ role: user_model_1.UserRole.DRIVER, isOnline: true });
        const offlineDrivers = totalDrivers - onlineDrivers;
        // Optional: top drivers by completed rides in last 30 days
        const topDriversAgg = yield ride_model_1.Ride.aggregate([
            {
                $match: {
                    status: ride_model_1.RideStatus.COMPLETED,
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
    }
    catch (err) {
        console.error('Analytics error', err);
        return res.status(500).json({ success: false, message: 'Failed to fetch analytics', error: err });
    }
});
exports.getAnalytics = getAnalytics;
