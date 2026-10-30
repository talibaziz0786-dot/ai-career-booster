import mongoose, { Schema, Model } from "mongoose";

/* ==========================================================
   Admin Settings Interface
   ========================================================= */

export interface IAdminSettings {
  globalAIQuota: {
    freeUsers: number;
    proUsers: number;
    trialUsers: number;
  };
  providerSettings: {
    gemini?: {
      maxRequestsPerHour: number;
      costPerRequest: number;
      enabled: boolean;
      model: string;
    };
    deepseek?: {
      maxRequestsPerHour: number;
      costPerRequest: number;
      enabled: boolean;
      model: string;
    };
    qwen?: {
      maxRequestsPerHour: number;
      costPerRequest: number;
      enabled: boolean;
      model: string;
    };
    local?: {
      maxRequestsPerHour: number;
      costPerRequest: number;
      enabled: boolean;
      model: string;
    };
  };
  featureFlags: {
    enableAdvancedAI: boolean;
    enableCoverLetter: boolean;
    enableATS: boolean;
    enableInterviewPrep: boolean;
    enableLinkedInOptimizer: boolean;
    enableResumeAnalyzer: boolean;
    enableCareerInsights: boolean;
    enableAIGeneration: boolean;
    enablePremiumFeatures: boolean;
    enableBetaFeatures: boolean;
  };
  userManagement: {
    allowSelfRegistration: boolean;
    requireEmailVerification: boolean;
    allowSocialLogin: boolean;
    maxUsersPerEmail: number;
    passwordMinLength: number;
    passwordRequireSpecialChars: boolean;
    passwordRequireNumbers: boolean;
    passwordRequireUppercase: boolean;
  };
  subscriptionSettings: {
    trialEnabled: boolean;
    trialDays: number;
    freePlanEnabled: boolean;
    monthlyPlans: Array<{ name: string; price: number; interval: string; features: string[] }>;
    yearlyPlans: Array<{ name: string; price: number; interval: string; features: string[] }>;
    enableDiscountCodes: boolean;
    defaultCurrency: string;
  };
  security: {
    require2FA: boolean;
    sessionTimeout: number;
    maxLoginAttempts: number;
    accountLockoutDuration: number;
    passwordResetTokenExpiry: number;
    emailVerificationExpiry: number;
    adminIPs?: string[];
  };
  system: {
    maintenanceMode: boolean;
    maintenanceMessage: string;
    allowNewRegistrations: boolean;
    analyticsEnabled: boolean;
    errorLoggingEnabled: boolean;
    debugMode: boolean;
    corsOrigins: string[];
    rateLimitRequests: number;
    rateLimitWindow: number;
  };
  notifications: {
    emailNotifications: boolean;
    adminAlerts: boolean;
    userRegistrationAlerts: boolean;
    paymentAlerts: boolean;
    systemAlerts: boolean;
    aiUsageAlerts: boolean;
  };
  contentManagement: {
    enableBlog: boolean;
    enableHelpCenter: boolean;
    enableDocumentation: boolean;
    autoPublishTemplates: boolean;
  };
  backupSettings: {
    autoBackup: boolean;
    backupFrequency: string;
    backupRetentionDays: number;
    includeUsers: boolean;
    includePayments: boolean;
    includeAIUsage: boolean;
  };
  _id?: mongoose.Types.ObjectId;
}

const adminSettingsSchema = new Schema<IAdminSettings>(
  {
    globalAIQuota: {
      freeUsers: { type: Number, default: 10 },
      proUsers: { type: Number, default: 500 },
      trialUsers: { type: Number, default: 30 }
    },
    providerSettings: {
      gemini: {
        maxRequestsPerHour: { type: Number, default: 100 },
        costPerRequest: { type: Number, default: 0.0005 },
        enabled: { type: Boolean, default: true },
        model: { type: String, default: "gemini-1.5-pro" }
      },
      deepseek: {
        maxRequestsPerHour: { type: Number, default: 50 },
        costPerRequest: { type: Number, default: 0.0002 },
        enabled: { type: Boolean, default: false },
        model: { type: String, default: "deepseek-chat" }
      },
      qwen: {
        maxRequestsPerHour: { type: Number, default: 50 },
        costPerRequest: { type: Number, default: 0.0001 },
        enabled: { type: Boolean, default: false },
        model: { type: String, default: "qwen-turbo" }
      },
      local: {
        maxRequestsPerHour: { type: Number, default: 200 },
        costPerRequest: { type: Number, default: 0 },
        enabled: { type: Boolean, default: false },
        model: { type: String, default: "llama-3" }
      }
    },
    featureFlags: {
      enableAdvancedAI: { type: Boolean, default: true },
      enableCoverLetter: { type: Boolean, default: true },
      enableATS: { type: Boolean, default: true },
      enableInterviewPrep: { type: Boolean, default: true },
      enableLinkedInOptimizer: { type: Boolean, default: true },
      enableResumeAnalyzer: { type: Boolean, default: true },
      enableCareerInsights: { type: Boolean, default: true },
      enableAIGeneration: { type: Boolean, default: true },
      enablePremiumFeatures: { type: Boolean, default: true },
      enableBetaFeatures: { type: Boolean, default: false }
    },
    userManagement: {
      allowSelfRegistration: { type: Boolean, default: true },
      requireEmailVerification: { type: Boolean, default: false },
      allowSocialLogin: { type: Boolean, default: true },
      maxUsersPerEmail: { type: Number, default: 1 },
      passwordMinLength: { type: Number, default: 8 },
      passwordRequireSpecialChars: { type: Boolean, default: false },
      passwordRequireNumbers: { type: Boolean, default: true },
      passwordRequireUppercase: { type: Boolean, default: false }
    },
    subscriptionSettings: {
      trialEnabled: { type: Boolean, default: true },
      trialDays: { type: Number, default: 7 },
      freePlanEnabled: { type: Boolean, default: true },
      monthlyPlans: { type: Array, default: [] },
      yearlyPlans: { type: Array, default: [] },
      enableDiscountCodes: { type: Boolean, default: true },
      defaultCurrency: { type: String, default: "INR" }
    },
    security: {
      require2FA: { type: Boolean, default: false },
      sessionTimeout: { type: Number, default: 30 },
      maxLoginAttempts: { type: Number, default: 5 },
      accountLockoutDuration: { type: Number, default: 15 },
      passwordResetTokenExpiry: { type: Number, default: 60 },
      emailVerificationExpiry: { type: Number, default: 1440 },
      adminIPs: { type: [String], default: [] }
    },
    system: {
      maintenanceMode: { type: Boolean, default: false },
      maintenanceMessage: { type: String, default: "System is undergoing scheduled maintenance." },
      allowNewRegistrations: { type: Boolean, default: true },
      analyticsEnabled: { type: Boolean, default: true },
      errorLoggingEnabled: { type: Boolean, default: true },
      debugMode: { type: Boolean, default: false },
      corsOrigins: { type: [String], default: ["*"] },
      rateLimitRequests: { type: Number, default: 100 },
      rateLimitWindow: { type: Number, default: 15 }
    },
    notifications: {
      emailNotifications: { type: Boolean, default: true },
      adminAlerts: { type: Boolean, default: true },
      userRegistrationAlerts: { type: Boolean, default: false },
      paymentAlerts: { type: Boolean, default: true },
      systemAlerts: { type: Boolean, default: true },
      aiUsageAlerts: { type: Boolean, default: false }
    },
    contentManagement: {
      enableBlog: { type: Boolean, default: false },
      enableHelpCenter: { type: Boolean, default: true },
      enableDocumentation: { type: Boolean, default: true },
      autoPublishTemplates: { type: Boolean, default: true }
    },
    backupSettings: {
      autoBackup: { type: Boolean, default: false },
      backupFrequency: { type: String, default: "daily" },
      backupRetentionDays: { type: Number, default: 30 },
      includeUsers: { type: Boolean, default: true },
      includePayments: { type: Boolean, default: true },
      includeAIUsage: { type: Boolean, default: false }
    }
  },
  { timestamps: true }
);

const AdminSettings: Model<IAdminSettings> = mongoose.models.AdminSettings || mongoose.model<IAdminSettings>("AdminSettings", adminSettingsSchema);

export async function getOrCreateAdminSettings(): Promise<IAdminSettings> {
  let settings = await AdminSettings.findOne();
  if (!settings) {
    settings = await AdminSettings.create({});
  }
  return settings;
}

export default AdminSettings;