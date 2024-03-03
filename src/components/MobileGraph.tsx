import React from 'react';
import LineGraph from './LineGraph'; 

const MobileGraph = () => (
  <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <LineGraph width={800} height={300}  />
    </div>
    <style jsx>{`
      @media (max-width: 600px) {
        LineGraph {
          width: 300px;
        }
      }
    `}</style>
  </div>
);

export default MobileGraph;
