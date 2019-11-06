import React from 'react';
import { Icon, Button } from 'antd';

const Filter = () => {
  return (
    <Button
      onClick={console.log('hello')}
      style={{ marginRight: '5px' }}
      type="primary"
      ghost
    >
      <Icon type="filter" />
      Filter
    </Button>
  );
};

export default Filter;
