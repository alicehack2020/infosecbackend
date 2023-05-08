import mongoose from "mongoose";
const database_url="mongodb+srv://sample1:sample1@cluster0.zle8g.mongodb.net/testingcode?retryWrites=true"

const connectDb = async () => {
  try {
    await mongoose.connect(database_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("connection successfully....");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
