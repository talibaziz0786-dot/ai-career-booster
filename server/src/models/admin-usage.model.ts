import mongoose, {
  Schema,
  Model,
  Document,
} from "mongoose";

/* ==========================================================
   Admin Usage Interface
   ========================================================= */

export interface IAdminUsage extends Document {
  adminId: mongoose.Types.ObjectId;
  action:
    | "user_suspended"
    | "user_deleted"
    | "user_created"
    | "user_updated"
    | "plan_upgraded"
    | "plan_downgraded"
    | "provider_enabled"
    | "provider_disabled"
    | "provider_configured"
    | "feature_flag_updated"
    | "payment_processed"
    | "payment_refunded"
    | "admin_login"
    | "admin_logout"
    | "settings_updated"
    | "quota_changed"
    | "template_created"
    | "template_updated"
    | "content_published";
  target: string; // userId, email, provider name, feature name, etc.
  details: string;
  ip: string;
  userAgent?: string;
  createdAt: Date;
}

/* ==========================================================
   Admin Usage Schema
   ========================================================= */

const adminUsageSchema = new Schema<IAdminUsage>(
  {
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    action: {
      type: String,
      required: true,
      index: true,
    },
    target: {
      type: String,
      required: true,
      index: true,
    },
    details: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

/* ==========================================================
   Exports
   ========================================================= */

const AdminUsage: Model<IAdminUsage> = mongoose.model<IAdminUsage>(
  "AdminUsage",
  adminUsageSchema
);

export default AdminUsage;