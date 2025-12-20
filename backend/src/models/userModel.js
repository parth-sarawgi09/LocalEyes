import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name is required"]
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:[true, "Password is required"],
        minlength:[6, "Password must be at least 6 characters long"],
    },
    role:{
        type:String,
        enum:["tourist", "guide", "admin"],
        default:"tourist",
    },
    verificationTier:{
        type:String,
        enum:["none", "verifies", "certified", "top-rated"],
        default:"none",
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
},
{timestamps:true}
);

const User = mongoose.model("User", userSchema);
export default User;