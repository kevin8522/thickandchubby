import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Post from '../models/Post.js';
import { isAuth, isAdmin } from '../utils.js';

const postRouter = express.Router();

postRouter.get('/', async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

const PAGE_SIZE = 3;

postRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || '';
    const country = query.country || '';
    const body = query.body || '';
    const birth = query.birth || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            name: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {};
    const birthFilter = birth && birth !== 'all' ? { birth } : {};
    const bodyFilter = body && body !== 'all' ? { body } : {};
    const countryFilter = country && country !== 'all' ? { country } : {};
    const categoryFilter = category && category !== 'all' ? { category } : {};
    const ratingFilter =
      rating && rating !== 'all'
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      price && price !== 'all'
        ? {
            // 1-50
            price: {
              $gte: Number(price.split('-')[0]),
              $lte: Number(price.split('-')[1]),
            },
          }
        : {};
    const sortOrder =
      order === 'featured'
        ? { featured: -1 }
        : order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : order === 'newest'
        ? { createdAt: -1 }
        : { _id: -1 };

    const posts = await Post.find({
      ...queryFilter,
      ...categoryFilter,
      ...countryFilter,
      ...bodyFilter,
      ...birthFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countPosts = await Post.countDocuments({
      ...queryFilter,
      ...birthFilter,
      ...bodyFilter,
      ...countryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    res.send({
      posts,
      countPosts,
      page,
      pages: Math.ceil(countPosts / pageSize),
    });
  })
);

postRouter.get(
  '/births',
  expressAsyncHandler(async (req, res) => {
    const births = await Post.find().distinct('birth');
    res.send(births);
  })
);

postRouter.get(
  '/bodies',
  expressAsyncHandler(async (req, res) => {
    const bodies = await Post.find().distinct('body');
    res.send(bodies);
  })
); 

postRouter.get(
  '/countries',
  expressAsyncHandler(async (req, res) => {
    const countries = await Post.find().distinct('country');
    res.send(countries);
  })
);

postRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Post.find().distinct('category');
    res.send(categories);
  })
);

postRouter.get('/slug/:slug', async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  if (post) {
    res.send(post);
  } else {
    res.status(404).send({ message: 'Post Not Found' });
  }
});



postRouter.put(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (post) {
      post.name = req.body.name ;
  
      post.city = req.body.city;
      post.age = req.body.age ;
      post.instagram = req.body.instagram ;
      post.phone = req.body.phone ;
      post.whatsapp = req.body.whatsapp ;
      post.about = req.body.about ;
      post.birth = req.body.birth ;
      post.school = req.body.school ;
      post.country = req.body.country ;
      post.body = req.body.body ;
      post.genderpref = req.body.genderpref ;
      post.gender = req.body.gender ;
      post.category = req.body.category ;
      post.images = req.body.images ;
      post.image = req.body.image ;
  

      await post.save();
      res.send({ message: 'Profile Updated' });
    } else {
      res.status(404).send({ message: 'Profile Not Found' });
    }
  })
);

postRouter.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    res.send(post);
  } else {
    res.status(404).send({ message: 'Post Not Found' });
  }
});

postRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (post) {
      if (post.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'You already submitted a review' });
      }

      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      post.reviews.push(review);
      post.numReviews = post.reviews.length;
      const updatedPost = await post.save();
      res.status(201).send({
        message: 'Review Created',
        review: updatedPost.reviews[updatedPost.reviews.length - 1],
        numReviews: post.numReviews,
      });
    } else {
      res.status(404).send({ message: 'Post Not Found' });
    }
  })
);

postRouter.post(
  '/:id/likes',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (post) {
      //if the name of the person submiting already exist dont post
      if (post.likes.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'You already submitted a review' });
      }

      const review = {
        
        name: req.user.name,
        age: req.user.age,
        image: req.user.image,
        city: req.user.city,
        country: req.user.country,
        category: req.user.category,
        instagram: req.user.instagram,
        phone: req.user.phone,
        whatsapp: req.user.whatsapp,
      
       
      };
      post.likes.push(review);
      post.numLikes = post.likes.length;
      const updatedPost = await post.save();
      res.status(201).send({
        message: 'Review Created',
        like: updatedPost.reviews[updatedPost.reviews.length - 1],
        numLikes: post.numLikes,
      });
    } else {
      res.status(404).send({ message: 'Post Not Found' });
    }
  })
);



export default postRouter;