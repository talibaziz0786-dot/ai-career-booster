import mongoose, {
  Schema,
  type Model,
} from "mongoose";

import bcrypt from "bcryptjs";

/* ==========================================================
   User Roles
========================================================== */

export type UserRole =
  | "user"
  | "admin";

/* ==========================================================
   IUser Interface
========================================================== */

export interface IUser {
  name: string;

  email: string;

  password?: string;

  isProUser: boolean;

  role: UserRole;

  refreshToken?: string;

  subscription?: mongoose.Types.ObjectId;

  bio?: string;

  title?: string;

  location?: string;

  phone?: string;

  github?: string;

  linkedin?: string;

  portfolio?: string;

  avatar?: string;

  comparePassword(
    enteredPassword: string
  ): Promise<boolean>;
}

/* ==========================================================
   User Document
========================================================== */

export type UserDocument =
  mongoose.HydratedDocument<IUser>;

/* ==========================================================
   User Schema
========================================================== */

const userSchema =
  new Schema<IUser>(
    {
      /* ====================================================
         Basic Identity
      ==================================================== */

      name: {
        type: String,

        required: [
          true,
          "Please add a name",
        ],

        trim: true,

        minlength: [
          2,
          "Name must be at least 2 characters",
        ],

        maxlength: [
          100,
          "Name cannot exceed 100 characters",
        ],
      },

      email: {
        type: String,

        required: [
          true,
          "Please add an email",
        ],

        unique: true,

        lowercase: true,

        trim: true,

        maxlength: 254,

        match: [
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

          "Please enter a valid email",
        ],
      },

      /* ====================================================
         Authentication
      ==================================================== */

      password: {
        type: String,

        required: [
          true,
          "Please add a password",
        ],

        minlength: [
          6,
          "Password must be at least 6 characters",
        ],

        select: false,
      },

      /* ====================================================
         Account
      ==================================================== */

      isProUser: {
        type: Boolean,

        default: false,

        required: true,
      },

      role: {
        type: String,

        enum: [
          "user",
          "admin",
        ],

        default: "user",

        required: true,
      },

      /* ====================================================
         Refresh Token
      ==================================================== */

      refreshToken: {
        type: String,

        default: undefined,

        select: false,
      },

      /* ====================================================
         Subscription
      ==================================================== */

      subscription: {
        type: Schema.Types.ObjectId,

        ref: "Subscription",

        default: undefined,
      },

      /* ====================================================
         Profile
      ==================================================== */

      bio: {
        type: String,

        trim: true,

        maxlength: [
          500,
          "Bio cannot exceed 500 characters",
        ],

        default: "",
      },

      title: {
        type: String,

        trim: true,

        maxlength: [
          100,
          "Title cannot exceed 100 characters",
        ],

        default: "",
      },

      location: {
        type: String,

        trim: true,

        maxlength: [
          100,
          "Location cannot exceed 100 characters",
        ],

        default: "",
      },

      phone: {
        type: String,

        trim: true,

        maxlength: [
          30,
          "Phone number cannot exceed 30 characters",
        ],

        default: "",
      },

      github: {
        type: String,

        trim: true,

        maxlength: [
          200,
          "GitHub URL cannot exceed 200 characters",
        ],

        default: "",
      },

      linkedin: {
        type: String,

        trim: true,

        maxlength: [
          200,
          "LinkedIn URL cannot exceed 200 characters",
        ],

        default: "",
      },

      portfolio: {
        type: String,

        trim: true,

        maxlength: [
          200,
          "Portfolio URL cannot exceed 200 characters",
        ],

        default: "",
      },

      avatar: {
        type: String,

        trim: true,

        maxlength: [
          500,
          "Avatar URL cannot exceed 500 characters",
        ],

        default: "",
      },
    },

    {
      timestamps: true,

      versionKey: false,
    }
  );

/* ==========================================================
   Password Hashing
========================================================== */

userSchema.pre(
  "save",
  async function () {
    if (
      !this.isModified(
        "password"
      )
    ) {
      return;
    }

    if (!this.password) {
      return;
    }

    const salt =
      await bcrypt.genSalt(12);

    this.password =
      await bcrypt.hash(
        this.password,
        salt
      );
  }
);

/* ==========================================================
   Password Comparison
========================================================== */

userSchema.methods.comparePassword =
  async function (
    enteredPassword: string
  ): Promise<boolean> {
    if (!this.password) {
      return false;
    }

    return bcrypt.compare(
      enteredPassword,
      this.password
    );
  };

/* ==========================================================
   User Model
========================================================== */

const User: Model<IUser> =
  mongoose.model<IUser>(
    "User",
    userSchema
  );

export default User;