import { MONGO_URI } from "@/constants";
import { connect } from "mongoose";

export const connectToDatabase = () => {
  connect(MONGO_URI)
    .then(() => console.log("Connected to the database"))
    .catch(() => process.exit(1));
};
