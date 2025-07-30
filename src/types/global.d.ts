import { UserRole } from '../modules/user/user.model';

declare global {
  namespace Express {
    interface Request {
      user?: {
       
        userId: string;
        role: UserRole;
        
      };
    }
  }
}



// // src/types/express/index.d.ts
// import { Types } from 'mongoose';

// declare global {
//   namespace Express {
//     interface Request {
//       user?: {
//         _id: Types.ObjectId;
//         role: string;
//         email?: string;
//       };
//     }
//   }
// }
