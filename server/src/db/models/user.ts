import { hash } from "bcrypt";
import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already in use"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      unique: [true, "Phone number already in use"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username already in use"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  // Hash password before saving the document to the database
  const hashedPassword = await hash(this.password, 10);
  this.password = hashedPassword;

  next();
});

const User = model("User", userSchema);

export { User };
