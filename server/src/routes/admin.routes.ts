import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { requireAdminRole } from "../middleware/admin.middleware.js";

import { getAdminDashboard } from "../controllers/admin/dashboard.controller.js";
import { getAllUsers, getUserDetails, updateUser, updateUserStatus, deleteUser } from "../controllers/admin/users.controller.js";
import { getAIOverview, getAIProviders, updateAIProvider } from "../controllers/admin/ai.controller.js";

import { getAllSubscriptions, updateSubscriptionPlan } from "../controllers/admin/subscriptions.controller.js";

import { getAllPayments } from "../controllers/admin/payments.controller.js";

import { getAnalyticsOverview } from "../controllers/admin/analytics.controller.js";

import { getAllTemplates, createTemplate, deleteTemplate } from "../controllers/admin/content.controller.js";

import { getFeatureFlags, updateFeatureFlag } from "../controllers/admin/feature-flags.controller.js";

import { getSystemHealth } from "../controllers/admin/system.controller.js";

import { getLogs } from "../controllers/admin/logs.controller.js";

import { getSecuritySettings, updateSecuritySetting } from "../controllers/admin/security.controller.js";

const router = Router();

/* ==========================================================
   Admin Dashboard
   ========================================================= */

router.get("/dashboard", authMiddleware, requireAdminRole, getAdminDashboard);

/* ==========================================================
   User Management
   ========================================================= */

router.get("/users", authMiddleware, requireAdminRole, getAllUsers);
router.get("/users/:id", authMiddleware, requireAdminRole, getUserDetails);
router.put("/users/:id", authMiddleware, requireAdminRole, updateUser);
router.put("/users/:id/status", authMiddleware, requireAdminRole, updateUserStatus);
router.delete("/users/:id", authMiddleware, requireAdminRole, deleteUser);

/* ==========================================================
   AI Control Center
   ========================================================= */

router.get("/ai/overview", authMiddleware, requireAdminRole, getAIOverview);
router.get("/ai/providers", authMiddleware, requireAdminRole, getAIProviders);
router.put("/ai/providers/:provider", authMiddleware, requireAdminRole, updateAIProvider);
router.put("/ai/providers/:provider/status", authMiddleware, requireAdminRole, updateAIProvider);

/* ==========================================================
   Subscriptions Management
   ========================================================= */

router.get("/subscriptions", authMiddleware, requireAdminRole, getAllSubscriptions);
router.put("/subscriptions/:id/plan", authMiddleware, requireAdminRole, updateSubscriptionPlan);

/* ==========================================================
   Payments Management
   ========================================================= */

router.get("/payments", authMiddleware, requireAdminRole, getAllPayments);

/* ==========================================================
   Analytics
   ========================================================= */

router.get("/analytics", authMiddleware, requireAdminRole, getAnalyticsOverview);
router.get("/analytics/overview", authMiddleware, requireAdminRole, getAnalyticsOverview);

/* ==========================================================
   Content Management
   ========================================================= */

router.get("/templates", authMiddleware, requireAdminRole, getAllTemplates);
router.post("/templates", authMiddleware, requireAdminRole, createTemplate);
router.delete("/templates/:id", authMiddleware, requireAdminRole, deleteTemplate);
router.get("/content/templates", authMiddleware, requireAdminRole, getAllTemplates);
router.post("/content/templates", authMiddleware, requireAdminRole, createTemplate);
router.delete("/content/templates/:id", authMiddleware, requireAdminRole, deleteTemplate);

/* ==========================================================
   Feature Flags
   ========================================================= */

router.get("/feature-flags", authMiddleware, requireAdminRole, getFeatureFlags);
router.put("/feature-flags/:key", authMiddleware, requireAdminRole, updateFeatureFlag);

/* ==========================================================
   System Health
   ========================================================= */

router.get("/system/health", authMiddleware, requireAdminRole, getSystemHealth);
router.get("/system/status", authMiddleware, requireAdminRole, getSystemHealth);

/* ==========================================================
   Logs
   ========================================================= */

router.get("/logs", authMiddleware, requireAdminRole, getLogs);
router.get("/system/logs", authMiddleware, requireAdminRole, getLogs);

/* ==========================================================
   Security Settings
   ========================================================= */

router.get("/security", authMiddleware, requireAdminRole, getSecuritySettings);
router.get("/security/settings", authMiddleware, requireAdminRole, getSecuritySettings);
router.put("/security/settings/:id", authMiddleware, requireAdminRole, updateSecuritySetting);
router.put("/security/:id", authMiddleware, requireAdminRole, updateSecuritySetting);

export default router;
