import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const reviewSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      comment: { type: String, required: true },
     
    },
    {
      timestamps: true,
    }
  );

  const likeSchema = new mongoose.Schema(
    {
      image: { type: String, required: true },
      age: { type: String, required: true },
      name: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      category: { type: String, required: true },
      instagram: { type: String, required: true },
      phone: { type: String, required: true },
      whatsapp: { type: String, required: true },
     
    },
    {
      timestamps: true,
    }
  );

const postSchema = new Schema({
    name: { type: String, required: true, unique: false },
    image: { type: String, required: false },
   

    // Your existing fields...
    slug: { type: String, required: false, unique: false },
    images: [String],
    category: { type: String, required: false },
    gender: { type: String, required: false },
    genderpref: { type: String, required: false },
    body: { type: String, required: false },
    country: { type: String, required: false },
    school: { type: String, required: false },
    birth: { type: String, required: false },
    about: { type: String, required: false },
    whatsapp: { type: String, required: false },
    phone: { type: String, required: false },
    instagram: { type: String, required: false },
    age: { type: String, required: false },
    city: { type: String, required: false },
    numReviews: { type: Number, required: false },
    reviews: [reviewSchema],
    numLikes: { type: Number, required: false },
    likes: [likeSchema],
});

export default model('Post', postSchema);
