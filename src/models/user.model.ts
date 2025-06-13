import { Document, model, models, Schema } from "mongoose";

interface userData extends Document {
  email: string;
  password: string;
  phoneNum: string;
  otp: string;
}

const schema: Schema = new Schema<userData>({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  phoneNum: {
    type: String,
    require: true,
  },
  otp: {
    type: String,
    require: true,
  },
});

const userModel = models.users || model<userData>("users", schema);

export default userModel;
