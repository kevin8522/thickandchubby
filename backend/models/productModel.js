import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: false },
    slug: { type: String, required: false, unique: false },
    image: { type: String, required: false },
    images: [String],
    
    category: { type: String, required: false },
   
   
    countInStock: { type: Number, required: false },
    rating: { type: Number, required: false },
    numReviews: { type: Number, required: false },
    reviews: [reviewSchema],

 
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

const Product = mongoose.model('Product', productSchema);
export default Product;
