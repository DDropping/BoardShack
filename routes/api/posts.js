//Routes for api/posts
// - POST api/posts (create a new post)
// - POST api/posts/update/:id (update an existing post)
// - GET api/posts/postId/:id (retrieve post given id)
// - GET api/posts (retrieve all posts)
// - GET api/posts/filter (retrieve filtered posts)
// - GET api/posts/loadSimilarPosts (retrieve posts similar to currentPost)
// - DELETE api/posts/delete/:postId (delete post given id)
// - PUT api/posts/like (like post)
// - PUT api/posts/unlike (like post)
// - PUT api/posts/addView

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const Post = require('../../models/Post');
const User = require('../../models/User');

// @route   POST api/posts
// @desc    Create a post
// @access  Protected
router.post(
  '/',
  [
    auth,
    [
      (check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('price', 'Price is required')
        .not()
        .isEmpty())
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      price,
      boardType,
      condition,
      description,
      tail,
      finSystem,
      finConfiguration,
      lengthFt,
      lengthIn,
      width,
      depth,
      volume,
      construction,
      glassing,
      contour,
      waveSize,
      drive,
      paddlePower,
      movability,
      shaper,
      model,
      images,
      location
    } = req.body;

    //build post object
    const postFields = {};
    postFields.user = req.user.id;
    if (title) postFields.title = title;
    if (price) postFields.price = price;
    if (boardType) postFields.boardType = boardType;
    if (condition) postFields.condition = condition;
    if (description) postFields.description = description;
    if (tail) postFields.tail = tail;
    if (finSystem) postFields.finSystem = finSystem;
    if (finConfiguration) postFields.finConfiguration = finConfiguration;
    if (construction) postFields.construction = construction;
    if (glassing) postFields.glassing = glassing;
    if (contour) postFields.contour = contour;
    if (waveSize) postFields.waveSize = waveSize;
    if (drive) postFields.drive = drive;
    if (paddlePower) postFields.paddlePower = paddlePower;
    if (movability) postFields.movability = movability;
    if (shaper) postFields.shaper = shaper;
    if (model) postFields.model = model;

    if (lengthFt) postFields.lengthFt = lengthFt;
    if (lengthIn) postFields.lengthIn = lengthIn;
    if (width) postFields.width = width;
    if (depth) postFields.depth = depth;
    if (volume) postFields.volume = volume;

    //list of image urls
    if (images) postFields.images = images;

    //build location object
    postFields.location = {};
    if (location.lat) postFields.location.lat = location.lat;
    if (location.lng) postFields.location.lng = location.lng;
    if (location.country) postFields.location.country = location.country;
    if (location.state) postFields.location.state = location.state;
    if (location.city) postFields.location.city = location.city;
    if (location.postalCode)
      postFields.location.postalCode = location.postalCode;
    if (location.locationImage)
      postFields.location.locationImage = location.locationImage;

    try {
      let post = new Post(postFields);
      await post.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      re.status(500).send('Server Error');
    }
  }
);

// @route   POST api/posts/update/:id
// @desc    Update a post
// @access  Protected
router.post(
  '/update/:id',
  [
    auth,
    [
      (check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('price', 'Price is required')
        .not()
        .isEmpty())
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      isNewBoard,
      title,
      price,
      shaper,
      model,
      boardType,
      condition,
      isWaterTight,
      height,
      width,
      depth,
      volume,
      country,
      state,
      city,
      zip,
      description
    } = req.body;

    //build post object
    const postFields = {};
    postFields.user = req.user.id;
    if (isNewBoard) postFields.isNewBoard = isNewBoard;
    if (title) postFields.title = title;
    if (price) postFields.price = price;
    if (shaper) postFields.shaper = shaper;
    if (model) postFields.model = model;
    if (boardType) postFields.boardType = boardType;
    if (condition) postFields.condition = condition;
    if (isWaterTight) postFields.isWaterTight = isWaterTight;
    if (description) postFields.description = description;

    // //build dimensions object
    postFields.dimensions = {};
    if (height) postFields.dimensions.height = height;
    if (width) postFields.dimensions.width = width;
    if (depth) postFields.dimensions.depth = depth;
    if (volume) postFields.dimensions.volume = volume;

    // //build location object
    postFields.location = {};
    if (country) postFields.location.country = country;
    if (state) postFields.location.state = state;
    if (city) postFields.location.city = city;
    if (zip) postFields.location.zip = zip;

    try {
      let post = await Post.findById({ _id: req.params.id });

      if (!post) {
        res.status(404).json('Post Not Found');
      }

      if (post.user.toString() !== req.user.id) {
        return res.status(400).json({ msg: 'User Not Authorized' });
      }

      // Update
      post = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: postFields },
        { new: true }
      );

      return res.json(post);
    } catch (err) {
      console.error(err.message);
      re.status(500).send('Server Error');
    }
  }
);

// @route   GET api/posts/postId/:id
// @desc    Get specific post
// @access  Public
router.get('/postId/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      'user',
      'username'
    );

    if (!post) {
      return res.status(400).json({ msg: 'There is no post with this id' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post Not Found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts
// @desc    Get all post
// @access  Public
router.get('/', async (req, res) => {
  try {
    const post = await Post.find({}).populate('user', 'username');

    if (!post) {
      return res.status(400).json({ msg: 'There is no posts' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//TODO      Check if in filters{} the json formats should be, like if(height) filters.dimensions.height = height
// @route   GET api/posts/filter
// @desc    Get filtered posts
// @access  Public
router.get('/filter', async (req, res) => {
  try {
    const {
      isNewBoard,
      title,
      price,
      shaper,
      model,
      boardType,
      condition,
      isWaterTight,
      height,
      width,
      depth,
      volume,
      country,
      state,
      city,
      zip,
      description
    } = req.body;

    const filters = {};
    if (isNewBoard) filters.isNewBoard = isNewBoard;
    if (description) filters.description = description;
    if (title) filters.title = title;
    if (price) filters.price = price;
    if (shaper) filters.shaper = shaper;
    if (model) filters.model = model;
    if (boardType) filters.boardType = boardType;
    if (condition) filters.condition = condition;
    if (isWaterTight) filters.isWaterTight = isWaterTight;
    if (height) filters.height = height;
    if (width) filters.width = width;
    if (depth) filters.depth = depth;
    if (volume) filters.volume = volume;
    if (country) filters.country = country;
    if (state) filters.state = state;
    if (city) filters.city = city;
    if (zip) filters.zip = zip;

    const posts = await Post.find(filters).populate('user', 'username');
    res.json(posts);
  } catch {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts/similarPosts/:id
// @desc    Get specific post
// @access  Public
router.get('/similarPosts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).json({ msg: 'There is no post with this id' });
    }

    const similarPosts = await Post.find({ volume: post.volume })
      .sort({ _id: -1 })
      .limit(3)
      .populate('user', 'username');

    res.json(similarPosts);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post Not Found' });
    }
    res.status(500).send('Server Error');
  }
});

// @TODO    Allow admin to delete post
// @route   DELETE api/posts/delete/:id
// @desc    Delete specific post | remove post from posts collection
// @access  Protected (Owner only)
router.delete('/delete/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    //check if post exists
    if (!post) {
      return res.status(404).json({ msg: 'Post Not Found' });
    }
    //check if user === post author
    if (post.user.toString() !== req.user.id) {
      return res.status(400).json({ msg: 'User Not Authorized' });
    }
    await post.remove();
    res.json('Post Deleted');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//TODO save postid to user's liked posts array
// @route   PUT api/posts/like/:id
// @desc    Like a specific post | add userId to post like[], add postId to user likedPosts[]
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //check if user has already liked the post
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    //add like and save
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//TODO remove postid to user's liked posts array
// @route   PUT api/posts/unlike/:id
// @desc    Unlike a specific post | remove userId from post like[], remove postId from uses likePosts[]
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //check if user has already liked the post
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: 'Post has not been liked' });
    }

    //remove like and save
    const removePostIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removePostIndex, 1);

    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/favorite
// @desc    Favorite a specific post | add userId to post favorite[], add postId to user favoritedPosts[]
// @access  Private
router.put('/favorite', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.body.id);

    //check if user has already favorited the post
    if (
      post.favorites.filter(favorite => favorite.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: 'Post already favorited' });
    }

    //add favorite to post's favorites and save
    post.favorites.unshift(req.user.id);
    await post.save();

    //add favorite to user's favorites and save
    const user = await User.findById(req.user.id);
    user.favorites.unshift(req.body.id);
    await user.save();
    res.json(post.favorites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/favorite
// @desc    Unfavorite a specific post | remove userId to post favorite[], remove postId to user favoritedPosts[]
// @access  Private
router.put('/unFavorite', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.body.id);

    //check if user has already favorited the post
    if (
      post.favorites.filter(favorite => favorite.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post is not favorited' });
    }

    //remove favorite from post's favorites array
    const removePostIndex = post.favorites
      .map(favorite => favorite.toString())
      .indexOf(req.user.id);
    post.favorites.splice(removePostIndex, 1);
    await post.save();

    //remove favorite from user's favorites array
    const user = await User.findById(req.user.id);
    const removeUserIndex = user.favorites
      .map(favorite => favorite.toString())
      .indexOf(req.body.id);
    user.favorites.splice(removeUserIndex, 1);
    await user.save();
    res.json(post.favorites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/addView
// @desc    Add 1 to view count of post
// @access  Public
router.put('/addView', async (req, res) => {
  try {
    const post = await Post.findById(req.body.id);

    //increment post viewCount and save
    post.viewCount++;
    await post.save();
    res.send('Post ' + req.body.id + ' opened.');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
