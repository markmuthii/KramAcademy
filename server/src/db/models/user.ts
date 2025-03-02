import { hash } from "bcrypt";
import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email already in use"],
    },
    phone: {
      type: String,
      required: true,
      unique: [true, "Phone number already in use"],
    },
    username: {
      type: String,
      required: true,
      unique: [true, "Username already in use"],
    },
    password: {
      type: String,
      required: true,
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

  // Check if the email is already in use
  const emailExists = await User.exists({ email: this.email });

  next();
});

const User = model("user", userSchema);

export { User };
