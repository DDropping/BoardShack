const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Message = require('../../models/Message');

// @route   POST api/messages/openMessages/:postId
// @desc    Create message thread
// @access  Private
//get postID, get userID, search msg db for match
//if not exist, create new thread w/ postID userID autherID
//get the message threadID
router.post('/openThread/:postId', auth, async (req, res) => {
  try {
    const msgThread = await Message.findOne({
      postId: req.params.postId,
      userId: req.user.id
    });
    if (msgThread) {
      res.json(msgThread.id);
    }
    //if msgThread does not exist
    const messageFields = {};
    messageFields.postId = req.params.postId;
    messageFields.userId = req.user.id;
    messageFields.authorId = req.body.authorId;

    let message = new Message(messageFields);
    await message.save();
    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

// @route   PUT api/messages/openMessages/:threadId
// @desc    Add message to thread
// @access  Private
// search message db with threadID
router.put('/addMessage', auth, async (req, res) => {
  try {
    const message = await Message.findById({ id: '5d21268094f4370820cf927e' });
    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

// @route   GET api/messages/allMessages
// @desc    Get all message threads
// @access  Private (admin only)
router.get('/allMessages', async (req, res) => {
  //check if admin
  if (req.user.userType !== 'admin') {
    return res.status(400).json('User Not Authorized');
  }
  try {
    const message = await Message.find({});
    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
