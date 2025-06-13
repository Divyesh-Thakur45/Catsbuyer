import { Document, model, models, Schema } from "mongoose";

interface cartData extends Document {
  image: string;
  name: string;
  price: string;
  loginID: string;
}

const schema: Schema = new Schema<cartData>({
  image: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  loginID: {
    type: String,
    require: true,
  },
});

const addtocartModel = models.addtocart || model<cartData>("addtocart", schema);

export default addtocartModel;
