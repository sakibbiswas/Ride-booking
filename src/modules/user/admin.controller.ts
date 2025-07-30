import { Request, Response } from 'express';
import { User } from '../user/user.model';
import { UserRole } from '../user/user.model';

export const approveDriver = async (req: Request, res: Response) => {
  const { driverId } = req.params;

  //  Update driver in the User collection
  const updated = await User.findOneAndUpdate(
    { _id: driverId, role: UserRole.DRIVER },
    { isApproved: true },
    { new: true }
  );

  if (!updated) {
    return res.status(404).json({ message: 'Driver not found' });
  }

  res.json({
    message: 'Driver approved successfully',
    driver: updated,
  });
};

export const suspendDriver = async (req: Request, res: Response) => {
  const { driverId } = req.params;

  const updated = await User.findOneAndUpdate(
    { _id: driverId, role: UserRole.DRIVER },
    { isBlocked: true },
    { new: true }
  );

  if (!updated) {
    return res.status(404).json({ message: 'Driver not found' });
  }

  res.json({
    message: 'Driver suspended successfully',
    driver: updated,
  });
};

export const viewSystemStats = async (req: Request, res: Response) => {
  const totalDrivers = await User.countDocuments({ role: UserRole.DRIVER });
  const approvedDrivers = await User.countDocuments({
    role: UserRole.DRIVER,
    isApproved: true,
  });
  const onlineDrivers = await User.countDocuments({
    role: UserRole.DRIVER,
    isOnline: true,
  });

  res.json({
    totalDrivers,
    approvedDrivers,
    onlineDrivers,
  });
};
