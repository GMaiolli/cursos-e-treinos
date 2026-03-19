import React from 'react';

const Interface = ({ onReset, onEmbaralhar }) => {
  return (
    <div className="interface-container">
      <button className="embaralhar-btn" onClick={onEmbaralhar}>Embaralhar</button>
      <button className="reset-btn" onClick={onReset}>Resetar Cubo</button>
    </div>
  );
};

export default Interface;