// FILE: TokenCard.jsx
import React from 'react';

const TokenCard = ({ tokenName, tokenBalance, onSend, onReceive }) => {
  return (
    <div className="card w-32 h-16 border text-sm bg-gray-800 border-gray-500 rounded-md py-2 px-1">
      <div className="flex flex-col">
        <div className="flex text-sm flex-row justify-between">
          <span>{tokenName}</span>
          <span>{tokenBalance?.toFixed(4)}</span>
        </div>
        <div className="flex flex-row text-sm justify-between mt-2">
          <button className="bg-blue-500 text-white  rounded-sm px-1 hover:bg-blue-700" onClick={onSend}>
            Send
          </button>
          <button className="bg-green-500 text-white  rounded-sm px-1 hover:bg-green-700" onClick={onReceive}>
            Receive
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenCard;