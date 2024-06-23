import React from 'react';

const VerticalLine: React.FC = () => {
  const lineStyle: React.CSSProperties = {
    borderLeft: '1px solid white',
    height: '100vh',
    margin: '0 10px'
  };

  return (
    <div style={lineStyle}></div>
  );
};

export default VerticalLine
