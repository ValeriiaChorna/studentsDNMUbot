import mongoose, { Schema } from "mongoose";
// const { ObjectId } = mongoose.Types;

const usersSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  username: { type: String },
  user_id: { type: Number },
  message_id: { type: Number },
  message_date: { type: Number },
  message_text: { type: String },
});

usersSchema.statics.createUser = createUser;

async function createUser(newUserParams) {
  return this.create(newUserParams);
}

const userModel = mongoose.model("users", usersSchema);
module.exports = userModel;
