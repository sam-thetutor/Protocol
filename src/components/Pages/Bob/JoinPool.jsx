import { useAgent, useIdentityKit } from "@nfid/identitykit/react";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { createActor } from "../../../Utils/createActor";
import { PORTAL_FACTORY } from "../../../Utils/constants";
import { idlFactory } from "../../../Utils/portalfactory.did";
import { idlFactory as PersonalPortal } from "../../../Utils/personalportal.did";
import { HttpAgent } from "@dfinity/agent";
import { useQuery } from "@tanstack/react-query";

const agent = new HttpAgent({ host: "https://ic0.app", retryTimes: 5 });
const JoinPool = () => {
  const [hrsInPool, setHrsInPool] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [icpAmount, setIcpAmount] = useState(0);
  const [hoursLoading, setHoursLoading] = useState(false);
  const { user } = useIdentityKit();
  const authenticatedAgent = useAgent();
  const { data: userPortal } = useQuery({
    queryKey: ["userPortal"],
  });
  useEffect(() => {
    const getPoolHours = async () => {
      if (!user) return;
      try {
        const portalFactory = createActor(PORTAL_FACTORY, idlFactory, agent);
        let results = await portalFactory.get_bob_miner_pool_hours_left(
          user.principal
        );
        console.log("pool hours left", results);
        setHrsInPool(Number(results));
      } catch (error) {
        console.log("error in getPoolHours", error);
      }
      setHoursLoading(false);
    };

    getPoolHours();
  }, [user]);

  const joinPool = async () => {
    if (!user || !authenticatedAgent) {
      return alert("Please login first");
    }

    if(!icpAmount){
      return alert("Please enter ICP amount");
    }

    if(icpAmount < 1){
      return alert("Minimum amount is 1 ICP");
    }

    if(!userPortal){  
      return alert("Please create a portal first");

    }


    try {
      setButtonLoading(true);

      const portalActor = createActor(userPortal, PersonalPortal, authenticatedAgent);
      let results = await portalActor.join_bob_miner_pool(11111111);
      console.log("join pool results", results);
    } catch (error) {
      console.log("error in joinPool", error);
    }
    setButtonLoading(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-400"
      >
        Join Pool
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 p-4 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-[#252525] flex flex-col rounded-lg shadow-lg text-white  p-6 w-96">
            <h1 className="flex w-full justify-center underline">Join Pool</h1>

            <span className="text-xs mt-2">
              You will be charged {icpAmount} ICP to be in the pool for {24 * icpAmount} hours
            </span>
            <input
              type="number"
              placeholder="Enter amount. min 1 ICP"
              value={icpAmount}
              onChange={(e) => setIcpAmount(e.target.value)}
              className="bg-gray-800 text-xs text-white px-4 outline-none hover:border-none py-2 rounded mt-4"
            />

            <div className="flex flex-row w-full mt-8 justify-between items-center">
              <span className="text-xs">
                {hoursLoading ? (
                  <ClipLoader color="white" size={20} />
                ) : (
                  `${hrsInPool} hours left in pool`
                )}
              </span>

              <div className="flex flex-row  w-full items-center justify-end  gap-3">
                <button
                  className="bg-red-400 text-white p-1 rounded-md "
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-500 flex justify-center items-center text-white p-1 rounded-md"
                  onClick={joinPool}
                >
                  {buttonLoading ? (
                    <ClipLoader color="white" size={20} />
                  ) : (
                    "Join Pool"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinPool;
