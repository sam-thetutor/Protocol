import { useAgent, useIdentityKit } from "@nfid/identitykit/react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { idlFactory as PersonalPortal } from "../../../Utils/personalportal.did";
import { createActor } from "../../../Utils/createActor";
const UpgradeMiner = ({ miner }) => {
  const { user } = useIdentityKit();
  const authenticatedAgent = useAgent();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: userPortal } = useQuery({
    queryKey: ["userPortal"],
  });

  const handleUpgrade = async () => {
    try {
      if (!user) {
        return alert("Please login first");
      }

      if (!authenticatedAgent) {
        return alert("Please login first");
      }

      if (!userPortal) {
        return alert("Please create a portal first");
      }

      if (!miner) {
        return alert("Please select a miner to upgrade");
      }

      const portalActor = createActor(
        userPortal,
        PersonalPortal,
        authenticatedAgent
      );

      setButtonLoading(true);

      let res = await portalActor.upgrade_bob_miner(miner.id);
      console.log("upgrade miner results :", res);
    } catch (error) {
      console.log("error in upgrading miner", error);
    }
    setButtonLoading(false);
  };

  return (
    <div>
      <button
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-400"
        onClick={() => setIsModalOpen(true)}
      >
        Upgrade
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 p-4 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-[#252525] flex flex-col rounded-lg shadow-lg text-white  p-6 w-96">
            <h1>Upgrade Miner</h1>

            <div className="flex mt-4">
              <span>Miner Id: {miner?.id.toString()}</span>
            </div>

            <div className="flex flex-row w-full items-center justify-end mt-4 gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="border cursor-pointer text-sm bg-red-400 p-1 rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={() => handleUpgrade()}
                className="border justify-center items-center flex text-sm bg-green-500 cursor-pointer p-1 rounded-md"
              >
                {buttonLoading ? (
                  <ClipLoader color="white" size={20} />
                ) : (
                  "Upgrade"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpgradeMiner;
