import mongoose, {
  Schema,
  type Model,
} from "mongoose";

/* ==========================================================
   Settings Interface
========================================================= */

export interface ISettings {
  user: mongoose.Types.ObjectId;
  darkMode: boolean;
  sendEmailNotifications: boolean;
  sendSMSNotifications: boolean;
  profileVisibility: "public" | "private";

  _id: mongoose.Types.ObjectId;
}

/* ==========================================================
   Settings Schema
========================================================= */

const settingsSchema = new Schema<ISettings>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    darkMode: {
      type: Boolean,
      default: false,
    },

    sendEmailNotifications: {
      type: Boolean,
      default: true,
    },

    sendSMSNotifications: {
      type: Boolean,
      default: false,
    },

    profileVisibility: {
      type: String,
      enum: [
        "public",
        "private",
      ],
      default: "public",
    },
  },
  {
    timestamps: true,
  }
);

/* ==========================================================
   Exports
========================================================= */

const Settings: Model<ISettings> =
  mongoose.model<ISettings>(
    "Settings",
    settingsSchema
  );

export default Settings;