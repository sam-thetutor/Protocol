import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners';

const SaleMiner = ({miner}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [price, setPrice] = React.useState(0);
const [buttonLoading, setButtonLoading] = useState(false);

  const saleMiner = async () => {
    console.log("sale miner",miner);

  }

  return (
    <div>
    <button
    onClick={() => setIsModalOpen(true)}
    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-400"
    >
    Sale
  </button>
  {/* add modal to allow user specify the price of the miner */}

  {isModalOpen && (
    <div className="fixed inset-0 p-4  flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-[#252525] flex flex-col rounded-lg shadow-lg text-white  p-6 w-96">
      <h1 className="flex w-full justify-center ">Sale Miner</h1>
      <input
          type="number"
          placeholder="enter price in icp"
          className="bg-gray-800 text-white px-4 py-2 rounded-lg mt-4"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
         <div className="flex flex-row mt-2  w-full items-center justify-end  gap-3">
                <button
                className="border cursor-pointer text-sm bg-red-400 p-1 rounded-md"
                onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                className="border justify-center items-center flex text-sm bg-green-500 cursor-pointer p-1 rounded-md"
                onClick={saleMiner}
                >
                  {buttonLoading ? (
                    <ClipLoader color="white" size={20} />
                  ) : (
                    "list"
                  )}
                </button>
              </div>
      </div>
    </div>



  )}




    </div>
  )
}

export default SaleMiner
