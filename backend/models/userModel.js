import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    password: { type: String, required: true },
    resetToken: { type: String },
    isAdmin: { type: Boolean, default: true, required: true },

    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
   
    image: { type: String, required: false },
    images: [String],
    category: { type: String, required: false },
    gender: { type: String, required: false } ,
    genderpref: { type: String, required: false } ,
    body: { type: String, required: false } ,

    country: { type: String, required: false } ,
    school: { type: String, required: false } ,
    birth: { type: String, required: false } ,
    about: { type: String, required: false } ,
    whatsapp: { type: String, required: false } ,
    phone: { type: String, required: false } ,
    instagram: { type: String, required: false } ,
   
    age: { type: String, required: false } ,
    city: { type: String, required: false } ,

  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
