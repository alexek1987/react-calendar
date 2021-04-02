import mongoose from "mongoose";

const instance = new mongoose.Schema(
  {
    /*
      document ID is set by default via MongoDB - next line is deprecated
      _id: mongoose.Schema.Types.ObjectId,
    */

    // key: Type,
    event: String,
    date: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
    // ^ ^ ^ this creates and maintains:
    // {
    //   createdAt: Date,
    //   updatedAt: Date,
    // }
  }
);

// NOTE! use a singular model name, mongoose automatically creates a collection like so:
// model: 'Account' === collection: 'accounts'
const modelName = "Event";

export default mongoose.model(modelName, instance);
