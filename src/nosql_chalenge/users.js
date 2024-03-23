
import mongoose from "mongoose"

export const connection=() => {
    mongoose.connect("mongodb://localhost:27017/Techshop")
    console.log("connected")
}


const userSchema = new mongoose.Schema({
    name: String, // String is shorthand for {type: String}
    email: {type:String, unique: true},
    password: String,
  });

const User = mongoose.model('USER', userSchema);

//create user
User.create([{name: "Elsie", email: "el@gmail.com", password: 'abc123'}, ])

// Assuming you've already created the users
const daniel = await User.findOne({ name: "Daniel" });
const johnDoe = await User.findOne({ name: "John Doe" });

// Access the _id fields
const danielId = daniel._id;
const johnDoeId = johnDoe._id;

console.log("Daniel's _id:", danielId);
console.log("John Doe's _id:", johnDoeId);

export default User
