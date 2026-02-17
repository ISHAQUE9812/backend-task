import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";


// --------------------
// 1️⃣ Interface
// --------------------
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";

  comparePassword(candidatePassword: string): Promise<boolean>;
}


// --------------------
// 2️⃣ Schema
// --------------------
const userSchema = new Schema<IUser>(
    {
        name:{
            type: String,
            required: [true, 'name is required'],
            trim: true
        },
        email:{
            type: String,
            unique: true,
            required: [true, 'email is required'],
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required:[true, 'password is required'],
            minLength: 6,
            select: false // 🔥 Important: Hide password by default
        },
        role: {
            type: String,
            enum:['User', 'admin'],
            default:'user',
        },
    },
    {
        timestamps: true,
    }
)

// --------------------
// 3️⃣ Password Hashing (Pre Save Hook)
// --------------------

userSchema.pre('save', async function (next) {
    // Only hash if password is modified
    if(!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
// --------------------
// 4️⃣ Compare Password Method
// --------------------
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password)
}




export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema)



