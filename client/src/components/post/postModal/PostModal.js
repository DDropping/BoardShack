/* Displays postModal if isPostModalVisible === true */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Fade from 'react-reveal/Fade';

import './postModal.css';
import { addView } from '../../../actions/post/post';
import PostModalToolBar from './PostModalToolBar';
import PostModalBody from './PostModalBody';

const PostModal = ({ post, hidePostModal }) => {
  const dispatch = useDispatch();
  const viewedPosts = useSelector(state => state.post.viewedPosts);

  useEffect(() => {
    //increase post viewCount if this is first time user is viewing post
    if (
      viewedPosts.filter(postId => postId.toString() === post._id.toString())
        .length === 0
    ) {
      dispatch(addView(post._id));
    }
  }, [post._id, dispatch, viewedPosts]);

  return (
    <Fade>
      <div className="br-post-modal-grey" onClick={() => hidePostModal()} />

      <div className="br-post-modal-wrapper">
        <PostModalToolBar post={post} hidePostModal={hidePostModal} />
        <PostModalBody post={post} />
      </div>
    </Fade>
  );
};

export default PostModal;
