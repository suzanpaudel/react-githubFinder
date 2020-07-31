import React from 'react';

const Alert = (props) => {
  return props.alert !== null ? (
    <div className={`alert alert-${props.alert.type}`}>
      <i className='fas fa-info-circle'></i> {props.alert.msg}
    </div>
  ) : null;
};

export default Alert;
