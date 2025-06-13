import { Document, model, models, Schema } from "mongoose";

interface catsData extends Document {
  image: string;
  name: string;
  price: string;
}

const schema: Schema = new Schema<catsData>({
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
});

const catsModel = models.cats || model<catsData>("cats", schema);

export default catsModel;
