import mongoose, { Schema } from "mongoose";
// const { ObjectId } = mongoose.Types;

const usersSchema = new Schema({
  name: { type: String, require: true, maxlength: 255, minlength: 3 },
  // email: { type: String, require: true, unique: true },
  // phone: { type: String, require: true, max: 20, min: 7 },
  // password: { type: String, require: true },
  // subscription: { type: String, require: true, default: "free" },
  // token: { type: String, require: true, default: "" },
});

usersSchema.statics.createUser = createUser;

async function createUser(newUserParams) {
  return this.create(newUserParams);
}

const userModel = mongoose.model("users", usersSchema);
module.exports = userModel;
