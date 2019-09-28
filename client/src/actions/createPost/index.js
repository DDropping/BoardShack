import axios from 'axios';

export const createPost = (formProps, imgList) => async dispatch => {
  const images = imgList.map(obj => {
    return {
      thumbnail: obj.imgThumbnail,
      default: obj.imgDefault
    };
  });

  const postItems = formProps;
  postItems.images = images;

  //set headers for request
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  //stringify the form items
  const body = JSON.stringify(postItems);

  //post new account to DB
  try {
    const res = await axios.post('/api/posts', body, config);
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }

  //   console.log('Inside createPost action...');
  //   console.log(formProps);
  //   console.log(images);
  //   console.log(body);
};
