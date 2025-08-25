"use strict";
// import mongoose from 'mongoose';
// import app from './app';
// import config from './config';
// import { User, UserRole } from './modules/user/user.model';
// import bcrypt from 'bcryptjs';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const PORT = config.port || 5000;
// const createDefaultAdmin = async () => {
//   const adminEmail = 'admin@gmail.com';
//   const existingAdmin = await User.findOne({ email: adminEmail });
//   if (!existingAdmin) {
//     const hashedPassword = await bcrypt.hash('admin123', 10);
//     const adminUser = new User({
//       name: 'Super Admin',
//       email: adminEmail,
//       password: hashedPassword,
//       role: UserRole.ADMIN,
//       isBlocked: false,
//       isApproved: true,
//     });
//     await adminUser.save();
//     console.log(' Default admin user created');
//   } else {
//     console.log(' Admin already exists');
//   }
// };
// const main = async () => {
//   try {
//     await mongoose.connect(config.mongo_uri as string);
//     console.log(' Connected to MongoDB');
//     await createDefaultAdmin(); // Auto-create admin if missing
//     app.listen(PORT, () => {
//       console.log(` Server is running on port ${PORT}`);
//     });
//   } catch (err) {
//     console.error(' Failed to start server:', err);
//   }
// };
// main();
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const user_model_1 = require("./modules/user/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const PORT = config_1.default.port;
const createDefaultAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const adminEmail = 'admin@gmail.com';
    const existingAdmin = yield user_model_1.User.findOne({ email: adminEmail });
    if (!existingAdmin) {
        const hashedPassword = yield bcryptjs_1.default.hash('admin123', 10);
        const adminUser = new user_model_1.User({
            name: 'Super Admin',
            email: adminEmail,
            password: hashedPassword,
            role: user_model_1.UserRole.ADMIN,
            isBlocked: false,
            isApproved: true
        });
        yield adminUser.save();
        console.log('✅ Default admin created');
    }
    else {
        console.log('ℹ️ Admin already exists');
    }
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(config_1.default.mongo_uri);
        console.log('✅ Connected to MongoDB');
        yield createDefaultAdmin();
        app_1.default.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    }
    catch (err) {
        console.error('❌ Failed to start server:', err);
    }
});
main();
