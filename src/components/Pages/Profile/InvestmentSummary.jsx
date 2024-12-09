import { HttpAgent } from "@dfinity/agent";
import { useIdentityKit } from "@nfid/identitykit/react";
import React, { useEffect } from "react";
import { createActor } from "../../../Utils/createActor";
import { useQuery } from "@tanstack/react-query";
import { idlFactory as PersonalPortal } from "../../../Utils/personalportal.did";

const agent = new HttpAgent({ host: "https://ic0.app", retryTimes: 5 });

const InvestmentSummary = () => {
  const { user } = useIdentityKit();

  const { data: userPortal } = useQuery({
    queryKey: ["userPortal"],
  });

  useEffect(() => {
    const getInvestmentSummary = async () => {
      if (user && userPortal) {
        //create the portal actor

        let _portalActor = createActor(userPortal, PersonalPortal, agent);

        let results = await _portalActor.get_all_portal_investments();
        console.log("hahhahahhah :", results);
      }
    };

    getInvestmentSummary();
  }, [user, userPortal]);

  return (
    <div className="flex flex-col text-sm border gap-4 py-4 rounded-lg w-full justify-center">
      {/* <h1 className="text-center">Investment Summary</h1> */}
      <div className="flex flex-col md:flex-row w-full justify-center items-center">
        {/* <div className="flex flex-row gap-2 justify-between items-center">
          <div className="flex bg-[#211d1e] flex-col items-center border h-[100px] border-gray-700 p-2 justify-between">
            <span>Total Investment</span>
            <span>0.00 ICP</span>
            <span className="text-xs flex justify-center w-full items-center">0.00 USD</span>
         
          </div>

          <div className="flex bg-[#211d1e] flex-col items-center border border-gray-700 h-[100px] p-2 justify-between">
            <span>Investment Gain</span>
            <span>0.00 ICP</span>
            <span className="flex text-xs">0.00 USD</span>
          </div>
        </div> */}
      </div>
      <div className="flex flex-row w-full justify-center gap-2 items-center">
        <div className="flex w-[100px] bg-[#211d2e] flex-col items-center border h-[100px] border-gray-700 p-1 justify-between">
          <span className="flex border-b-2 w-full justify-center">KONGSWAP</span>
          <span>0.00 ICP</span>
        </div>
        <div className="flex w-[100px] bg-[#211d2e] flex-col items-center border h-[100px] border-gray-700 p-1 justify-between">
          <span className="flex border-b-2 w-full justify-center">BOB</span>
          {/* <span>200 BOB</span> */}
          <span>100 usd</span>

        </div>
        <div className="flex w-[100px] bg-[#211d2e] flex-col items-center border h-[100px] border-gray-700 p-1 justify-between">
          <span className="flex border-b-2 w-full justify-center">WTN</span>
          <span>0.00 ICP</span>
        </div>
        <div className="flex w-[100px] bg-[#211d2e] flex-col items-center border h-[100px] border-gray-700 p-1 justify-between">
          <span className="flex border-b-2 w-full justify-center">BONE</span>
          <span>0.00 ICP</span>
        </div>
        <div className="flex w-[100px] bg-[#211d2e] flex-col items-center border h-[100px] border-gray-700 p-1 justify-between">
          <span className="flex border-b-2 w-full justify-center">ICPSwap</span>
          <span>0.00 ICP</span>
        </div>
        <div className="flex w-[100px] bg-[#211d2e] flex-col items-center border h-[100px] border-gray-700 p-1 justify-between">
          <span className="flex border-b-2 w-full justify-center">NNS</span>
          <span>0.00 ICP</span>
        </div>
      </div>
    </div>
  );
};

export default InvestmentSummary;
