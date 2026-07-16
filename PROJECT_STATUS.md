# 🚀 CareerBoost AI

Production Ready AI Career SaaS

---

# Project Information

Project Name:

CareerBoost AI

Version:

v1.0.0

Status:

🟡 Production Sprint

Owner:

Talib Aziz

Stack:

Frontend

- React 2026
- Vite
- TypeScript
- Tailwind CSS Latest
- React Router
- Zustand
- React Hook Form
- Zod
- Framer Motion
- Axios

Backend

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT
- Gemini AI
- DeepSeek (Upcoming)
- Qwen (Upcoming)

Deployment

Frontend

Vercel

Backend

Render

Database

MongoDB Atlas

---

# Folder Structure

careerboost-ai

client/

server/

PROJECT_STATUS.md

README.md

LICENSE

---

# Current Sprint

Resume Builder Production Sprint

Goal

Production Ready Resume Builder

---

# Completed Modules

Authentication

- Login

- Register

- JWT

- Protected Routes

- Logout

Resume Builder

- AI Resume Generation

- Resume Templates

- Resume History

- Resume Preview

- Template Switcher

- Resume Score

- AI Suggestions

- PDF Base Export

AI Architecture

- AI Manager

- AI Orchestrator

- AI Retry

- AI Logger

- AI Cache

- AI Parser

- AI Validator

Providers

- Gemini

- DeepSeek (Placeholder)

- Qwen (Placeholder)

- Local AI (Placeholder)

Career Intelligence

Completed

Interview Module

Basic Completed

Dark Mode

Completed

Responsive Layout

Completed

---

# In Progress

Resume Builder UI Polish

Tasks

- A4 Layout

- Zoom

- Fit Screen

- Print Preview

- PDF Perfection

---

# Pending Modules

Payments

Subscriptions

Admin Dashboard

Ads

Analytics

SEO

Deployment

Android App

---

# AI Modules

Resume Builder

Status

Completed

ATS Checker

Pending

Cover Letter

Pending

Interview Preparation

Pending

LinkedIn Optimizer

Pending

Career Intelligence

Completed

Job Tracker

Pending

---

# Payment Roadmap

Free Plan

- Resume Builder

- Limited AI

- Ads Enabled

Pro Monthly

Unlimited AI

Premium Templates

ATS

Interview

Cover Letter

No Ads

Pro Yearly

Everything Included

---

# Admin Dashboard

Pending

Features

Users

Revenue

Plans

AI Usage

Coupons

Analytics

---

# Current Dependencies

Frontend

react

react-dom

react-router-dom

zustand

axios

framer-motion

react-hook-form

zod

@hookform/resolvers

jspdf

html2canvas

react-hot-toast

lucide-react

Backend

express

mongoose

jsonwebtoken

bcryptjs

multer

cloudinary

dotenv

tsx

typescript

@google/generative-ai

---

# Environment Variables

Frontend

VITE_API_URL

Backend

PORT

MONGO_URI

JWT_SECRET

GEMINI_API_KEY

CLOUDINARY_NAME

CLOUDINARY_KEY

CLOUDINARY_SECRET

---

# Deployment Checklist

Authentication

Resume Builder

AI

PDF Export

Payments

Subscriptions

Admin

SEO

Analytics

Error Monitoring

Responsive

Dark Mode

---

# Known Issues

None

---

# Coding Rules

Always use

TypeScript

NodeNext

Latest packages

No deprecated syntax

No broken imports

No relative import mismatch

No missing exports

No console errors

No TypeScript errors

Production Ready only

---

# Project Goals

Launch SaaS

Generate Revenue

Recruiter Ready

Portfolio Ready

Android App Ready

Production Ready

---

# Future Versions

v1.0

Resume Builder

v1.1

ATS Checker

v1.2

Cover Letter AI

v1.3

Interview Preparation

v1.4

LinkedIn Optimizer

v2.0

Android App

v3.0

Enterprise Version

---

# Last Updated

Production Sprint Started

Resume Builder UI Polish






Ab tak tumhare project me ye major systems design ya implement ho chuke hain:

✅ Authentication (JWT)
✅ Resume Builder AI
✅ Resume History
✅ Resume Upload
✅ ATS Analysis
✅ AI Interview System
✅ Interview Feedback
✅ Interview Session History
✅ Career Insights
✅ Dashboard
✅ Subscription System
✅ AI Router (Free → Flash, Premium → Pro → Flash Fallback)
✅ Multi AI Provider Architecture (Gemini, DeepSeek, Qwen, Local placeholders)
✅ AI Usage Limits
✅ Premium/Free Plan Logic
✅ Referral & Daily Premium Code planning
✅ Enterprise Prompt Architecture planning

Ye already recruiter-level SaaS architecture ban chuka hai.




✅ Last Completed Features
1. AI Architecture (Production Ready) ✅

Complete AI Layer ban chuki hai.

Controller
      ↓
Prompt Builder
      ↓
AI Manager
      ↓
AI Router
      ↓
Gemini Provider
      ↓
Fallback
Done
✅ AI Manager
✅ Gemini Provider
✅ DeepSeek Placeholder
✅ Qwen Placeholder
✅ Local AI Placeholder
✅ AI Router
✅ Premium vs Free model selection
2. Gemini Smart Fallback ✅

Ye bahut important feature tha.

Flow:

Premium User

↓

Gemini 2.5 Pro

↓

Fail?

↓

Automatically

↓

Gemini 2.5 Flash

↓

User ko pata bhi nahi chalega

Free user

Gemini Flash Only
3. AI Usage Middleware ✅

Ye complete ho gaya.

Current limits decide hue:

Free
Resume → 2/day
ATS → 2/day
Cover Letter → 1/day
Interview Questions → 10–20/day (humne decide kiya ki 10 better hai)
Trial

Unlimited

Premium

Unlimited

Middleware already existing tha aur usko production logic ke hisaab se improve karna tha.

4. Interview AI ✅

Interview page already complete hai.

Features:

Skill Interview
HR Interview
Mixed Interview

Languages

English
Hindi
Hinglish
Urdu

Difficulty

Beginner
Intermediate
Advanced
5. AI Prompt System Planning ✅

Humne decide kiya ki prompt ko controller se bahar nikalenge.

Current structure:

server/src/prompts

interview-question.prompt.ts

interview-feedback.prompt.ts

resume-builder.prompt.ts

ats-analysis.prompt.ts

cover-letter.prompt.ts

career-insights.prompt.ts

recruiter-analysis.prompt.ts

technical-rules.prompt.ts

language-rules.prompt.ts

json-rules.prompt.ts

prompt.constants.ts

Ye planning complete hui.

6. Subscription Architecture ✅

Current plans

Free

↓

Trial

↓

Pro Monthly

↓

Pro Yearly
7. AI Model Routing ✅

Decision

Free

↓

Gemini Flash

Premium

↓

Gemini Pro

↓

Fail

↓

Gemini Flash
🟡 Features Planning Complete (Implementation Pending)

Ye features humne design kar diye.

1. Daily Premium Code System ⭐⭐⭐⭐⭐

Ye bahut unique feature hai.

Flow

Admin

↓

Every night 12 AM

↓

New Random Code Generated

↓

Admin copies code

↓

Shares to user

↓

User enters code

↓

1 Day Premium Access

↓

Next Day

↓

Code Invalid

↓

Need New Code

Ye abhi implement nahi hua.

2. Referral System ⭐⭐⭐⭐⭐

Flow

User A

↓

Invite Friend

↓

Friend Purchases Premium

↓

User A gets

5 Days Premium

Planning complete.

3. Admin Free Premium Access

Admin manually

Select User

↓

Grant Premium

↓

1 Day

3 Days

7 Days

30 Days

Planning done.

🔴 Current Work

Hum kis cheez par kaam kar rahe the?

Documentation Architecture

Humne decide kiya

Project itna bada ho gaya hai ki

Documentation banana padega.

Hum ye files banane wale the

PROJECT_CONTEXT.md

ARCHITECTURE.md

FILE_TREE.md

BACKEND_ARCHITECTURE.md

FRONTEND_ARCHITECTURE.md

AI_ENGINE.md

DATABASE.md

API_REFERENCE.md

DEVELOPMENT_RULES.md

GPT_HANDOFF_PROMPT.md
📄 careerboost-tree.txt

Tumne finally

tree /F /A

nikal liya.

Ye bahut important milestone tha.

Ab documentation guess nahi karni padegi.

❌ Abhi Pending Features
Resume Builder
Resume PDF perfection
Resume Zoom
Resume Print
Resume A4 Layout
ATS

Need production polish

Cover Letter

Need implementation

LinkedIn Optimizer

Not started

Job Tracker

Not started

Admin Panel

Not started

Payments

Need Razorpay

Need Webhook

Need Verification

Need Subscription Activation

Ads

Need Free Plan Ads

Analytics

Need Dashboard Analytics

Recruiter Dashboard

Need Implementation

🎯 Next Development Order (Recommended)

Main ye order recommend karta hoon:

1.

Documentation Pack

↓

2.

Prompt System

↓

3.

Interview AI Refactor

↓

4.

Resume Builder Refactor

↓

5.

ATS Refactor

↓

6.

Cover Letter AI

↓

7.

Subscription + Razorpay

↓

8.

Referral System

↓

9.

Daily Premium Code

↓

10.

Admin Panel

↓

11.

LinkedIn Optimizer

↓

12.

Job Tracker

↓

13.

Android App
⭐ Project Maturity

Main honestly bolun to CareerBoost AI ab sirf ek MERN project nahi raha.

Ab isme already ye enterprise systems design ya implement ho chuke hain:

AI Orchestration
Multi-Provider AI Architecture
Model Routing
Smart Fallback
Usage Limiter
Subscription Architecture
Prompt Architecture
Enterprise Documentation Planning
Production Folder Structure

Ye foundation recruiter-level SaaS ke liye kaafi strong hai. Ab focus implementation polish aur remaining business features (payments, referrals, admin, documentation) par hona chahiye.