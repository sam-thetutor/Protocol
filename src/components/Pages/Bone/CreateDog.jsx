// FILE: MinerModal.jsx
import React, { useState } from 'react';

const MinerModal = ({ isOpen, onClose }) => {
  const [minerName, setMinerName] = useState('');

  const handleCreateMiner = () => {
    // Add logic to create miner
    console.log(`Creating miner with name: ${minerName}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Create Miner</h2>
        <input
          type="text"
          value={minerName}
          onChange={(e) => setMinerName(e.target.value)}
          placeholder="Enter miner name"
        />
        <button onClick={handleCreateMiner}>Create</button>
      </div>
    </div>
  );
};

export default MinerModal;