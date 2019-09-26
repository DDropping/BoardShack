import React from 'react';
import { Card, Icon } from 'antd';
import { connect } from 'react-redux';

import { deleteImagePreview } from '../../../../actions/createPost/imageUpload';
import './imgUpload.css';

const PreviewImage = props => {
  var isLoading = true;
  props.imgList
    .filter(item => item.imgKey === props.imgKey)
    .map(item => (isLoading = item.isLoading));

  return (
    <Card
      style={{
        width: '150px',
        height: '200px',
        backgroundColor: '#f3f7f9',
        marginBottom: '10px',
        marginRight: '10px',
        display: 'inline-block',
        lineHeight: '150px'
      }}
      hoverable={true}
      bodyStyle={{ padding: 0 }}
      cover={
        <div className="preview-img-card-img-parent">
          {isLoading ? (
            <div style={{ display: 'inline-block' }}>
              <img
                className="preview-img-card-img-loading"
                alt="surfboard"
                src={props.previewObjectUrl}
              />
              <Icon
                className="preview-img-upload-loading-icon"
                type="loading"
                key="loading"
              />
            </div>
          ) : (
            <img
              className="preview-img-card-img"
              alt="surfboard"
              src={props.previewObjectUrl}
            />
          )}
        </div>
      }
      actions={[
        <Icon type="star" key="star" />,
        <Icon
          type="delete"
          key="delete"
          onClick={() => props.deleteImagePreview(props.imgKey)}
        />
      ]}
    ></Card>
  );
};

const mapStateToProps = state => {
  return {
    imgList: state.imgUpload.imgList
  };
};

export default connect(
  mapStateToProps,
  { deleteImagePreview }
)(PreviewImage);
