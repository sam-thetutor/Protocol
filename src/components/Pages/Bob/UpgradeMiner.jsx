import React from 'react'

const UpgradeMiner = ({miner}) => {

  const handleUpgrade = async (miner) => {
    console.log("miner :", miner);
  };


  return (
    <button
    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-400"
    onClick={() => handleUpgrade(miner)}
  >
    Upgrade
  </button>
  )
}

export default UpgradeMiner
