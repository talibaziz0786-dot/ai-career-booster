import mongoose from "mongoose";

const usageSchema = new mongoose.Schema(
  {
    resumeToday: {
      type: Number,
      default: 0,
    },

    atsToday: {
      type: Number,
      default: 0,
    },

    interviewToday: {
      type: Number,
      default: 0,
    },

    coverLetterToday: {
      type: Number,
      default: 0,
    },

    lastReset: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
);

const subscriptionSchema =
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

        unique: true,
      },

      plan: {
        type: String,

        enum: [
          "free",
          "trial",
          "pro-monthly",
          "pro-yearly",
        ],

        default: "trial",
      },

      status: {
        type: String,

        enum: [
          "active",
          "expired",
          "cancelled",
        ],

        default: "active",
      },

      trialStart: {
        type: Date,

        default: Date.now,
      },

      trialEnd: {
        type: Date,

        default: () =>
          new Date(
            Date.now() +
              3 * 24 * 60 * 60 * 1000
          ),
      },

      expiresAt: {
        type: Date,
      },

      paymentMethod: {
  type: String,
},

amountPaid: {
  type: Number,
  default: 0,
},

currency: {
  type: String,
  default: "INR",
},

      razorpayOrderId: {
  type: String,
},

razorpayPaymentId: {
  type: String,
},

razorpaySignature: {
  type: String,
},

 paymentDate: {
  type: Date,
},

      usage: {
        type: usageSchema,

        default: () => ({}),
      },
    },
    {
      timestamps: true,
    }
  );

const Subscription =
  mongoose.model(
    "Subscription",
    subscriptionSchema
  );

export default Subscription;