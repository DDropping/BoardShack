/**
 * Image upload component
 * - change icon to loading when loading
 */

import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';

import './imgUpload.css';
import { uploadImage } from '../../../../actions/createPost/imageUpload';

class ImageUpload extends React.Component {
  render() {
    return (
      <div className="upload-btn-wrapper">
        <button className="btn">
          <Icon type={this.props.isLoading ? 'loading' : 'plus'} />

          <div className="ant-upload-text">Upload</div>
        </button>
        <input
          type="file"
          onChange={event => this.props.uploadImage(event.target.files[0])}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.imgUpload.isLoading
  };
};

export default connect(
  mapStateToProps,
  { uploadImage }
)(ImageUpload);
