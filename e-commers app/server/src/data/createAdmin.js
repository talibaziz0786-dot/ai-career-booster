// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import bcrypt from "bcryptjs";

// import User from "../models/User.js";

// dotenv.config();

// mongoose.connect(process.env.MONGO_URI);

// const createAdmin = async () => {
//   try {
//     const hashedPassword =
//       await bcrypt.hash("123456", 10);

//     await User.deleteMany({
//       email: "admin@gmail.com",
//     });

//     const user = await User.create({
//       name: "Admin",
//       email: "admin@gmail.com",
//       password: hashedPassword,
//       role: "admin",
//     });

//     console.log("ADMIN CREATED ✅");
//     console.log(user);

//     process.exit();
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// createAdmin();