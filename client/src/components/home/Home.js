import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './home.css';
import PostCard from '../post/postPreview/PostCard';
import Banner from '../home/banner/Banner';
import FilterBox from './searchFilter/filterBox/FilterBox';
import SearchBar from '../home/searchBar/SearchBar';
import { loadPosts } from '../../actions/post/post';

const Home = props => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post.postList);

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  return (
    <div className="br-home-page-wrapper">
      <Banner />
      <FilterBox />
      <div className="br-searchbar-postcards-container">
        <SearchBar />
        {posts.map(post => {
          return <PostCard key={post._id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default Home;
