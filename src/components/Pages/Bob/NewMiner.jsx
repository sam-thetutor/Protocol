import { useAgent, useIdentityKit } from "@nfid/identitykit/react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { idlFactory as PersonalPortal } from "../../../Utils/personalportal.did";
import { idlFactory as ICPDL } from "../../../Utils/icp.did";
import { createActor } from "../../../Utils/createActor";
import { ICP_LEDGER_ID } from "../../../Utils/constants";
import { ClipLoader } from "react-spinners";
const NewMiner = () => {
  const { user } = useIdentityKit();
  const authenticatedAgent = useAgent();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: userPortal } = useQuery({
    queryKey: ["userPortal"],
  });

  const spawnBobMiner = async () => {
    try {
      //check if th user is logged in, if not alert the user to login first
      if (!user) {
        return alert("Please login first");
      }
      // if there is not authenticated agent, alert the user to login first
      if (!authenticatedAgent) {
        return alert("Please login first");
      }

      //check if the user has a portal,otherwise, redirect the user to the portal page to create one.
      if (!userPortal) {
        return alert("Please create a portal first");
      }

      const portalActor = createActor(
        userPortal,
        PersonalPortal,
        authenticatedAgent
      );
      setButtonLoading(true);
      let newMinerResults = await portalActor.create_new_bob_miner();
      console.log("bob miner results :", newMinerResults);
    } catch (error) {
      console.log("error in spawnBobMiner", error);
    }
    setButtonLoading(false);
  };

  return (
    <div>
      <button
        className="bg-gray-800 text-white px-4 py-2 flex items-center justify-center rounded hover:bg-gray-400"
        onClick={() => setIsModalOpen(true)}
      >
        New Miner
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 p-4 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-[#252525] flex flex-col rounded-lg shadow-lg text-white  p-6 w-96">
            <h1 className="text-white w-full flex justify-center items-center">
              Create New BOB miner?
            </h1>
            <span className="text-xs mt-6">
              You will be charged 1 ICP from your portal balance
            </span>

            <div className="flex flex-row w-full items-center justify-end mt-4 gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="border cursor-pointer text-sm bg-red-400 p-1 rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={() => spawnBobMiner()}
                className="border justify-center items-center flex text-sm bg-green-500 cursor-pointer p-1 rounded-md"
              >
                {buttonLoading ? (
                  <ClipLoader color="white" size={20} />
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewMiner;
