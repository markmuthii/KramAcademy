import { model, Schema } from "mongoose";

const tokensSchema = new Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    type: {
      type: String,
      enum: ["email", "password"],
      required: [true, "Token type is required"],
    },
    status: {
      type: String,
      enum: ["active", "inactive", "expired"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Token = model("Token", tokensSchema);

export { Token };
