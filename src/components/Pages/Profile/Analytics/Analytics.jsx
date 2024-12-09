import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import WtnAnalytics from "./WtnAnalytics";
import BoneAnalytics from "./BoneAnalytics";
import BobAnalytics from "./BobAnalytics";
import IcpSwapAnalytics from "./IcpSwapAnalytics";
import NnsAnalytics from "./NnsAnalytics";
import { HttpAgent } from "@dfinity/agent";
import { PORTAL_FACTORY } from "../../../../Utils/constants";
import { idlFactory as PortalFactoryIDL } from "../../../../Utils/portalfactory.did";
import { createActor } from "../../../../Utils/createActor";
import { useQuery } from "@tanstack/react-query";
import { useIdentityKit } from "@nfid/identitykit/react";
import { idlFactory as PersonalPortal } from "../../../../Utils/personalportal.did";

const agent = new HttpAgent({ host: "https://ic0.app", retryTimes: 5 });
const _backend = createActor(PORTAL_FACTORY, PortalFactoryIDL, agent);


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const Analytics = () => {
  //   const creationData = {
  //     labels: ['Miners Created'],
  //     datasets: [
  //       {
  //         label: 'Miners Created',
  //         data: [Number(minerCreationCount)],
  //         backgroundColor: 'rgba(75, 192, 192, 0.6)',
  //       },
  //     ],
  //   };

  //   const upgradeData = {
  //     labels: ['Miners Upgraded'],
  //     datasets: [
  //       {
  //         label: 'Miners Upgraded',
  //         data: [Number(minerUpgradeCount)],
  //         backgroundColor: 'rgba(153, 102, 255, 0.6)',
  //       },
  //     ],
  //   };

  //   const stakedData = {
  //     labels: ['Total Staked Amount'],
  //     datasets: [
  //       {
  //         label: 'Total Staked Amount',
  //         data: [Number(8)],
  //         backgroundColor: 'rgba(255, 159, 64, 0.6)',
  //       },
  //     ],
  //   };

  //   const logLabels = logData.map((log, index) => `Log ${index + 1}`);
  //   const logActions = logData.map(log => log.action);

  //   const logChartData = {
  //     labels: logLabels,
  //     datasets: [
  //       {
  //         label: 'Log Actions',
  //         data: logActions,
  //         backgroundColor: 'rgba(54, 162, 235, 0.6)',
  //       },
  //     ],
  //   };

  const [selectedToken, setSelectedToken] = useState("BOB");
  const tokens = ["BOB", "WTN", "BONE", "ICPSwap", "NNS"];
  const {user} = useIdentityKit()
  const handleTokenClick = (token) => {
    setSelectedToken(token);
  };



  const { data: userPortal } = useQuery({
    queryKey: ["userPortal"],
  });


  const [portalAnalytics, setPortalAnalytics] = useState(null);


  

  useEffect(() => {
      const getData = async () => {
        try {
          if (!userPortal) return;
          let _portalActor = createActor(userPortal, PersonalPortal, agent);
  
          const [_bob] = await Promise.all([_portalActor.get_bob_analytics()]);
  
          setPortalAnalytics({
            bob: _bob,



          });
          console.log("analytics", _bob);
        } catch (error) {
          console.log("error in getting user portal analytics", error);
        }
      };
      getData();
    }, [user,userPortal]);



 


  return (
    <div className="flex border rounded-lg flex-row gap-1 w-full ">
      <div className="w-1/6 flex flex-col  p-4">
        <div className="flex text-sm pr-2 border-r-2 flex-col w-full gap-2">
          {tokens.map((token) => (
            <span
              key={token}
              className={`cursor-pointer rounded-md p-2 ${
                selectedToken === token
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handleTokenClick(token)}
            >
              {token}
            </span>
          ))}
        </div>
      </div>
      <div className="flex w-3/4 h-[40vh] p-4">
        {
          selectedToken === "BOB" && <BobAnalytics analytics={portalAnalytics?.bob}/>
        }
        {selectedToken === "WTN" && <WtnAnalytics analytics={portalAnalytics?.bob} />}
        {selectedToken === "BONE" && <BoneAnalytics analytics={portalAnalytics?.bob} />}
        {selectedToken === "ICPSwap" && <IcpSwapAnalytics analytics={portalAnalytics?.icpswap} />}
        {selectedToken === "NNS" && <NnsAnalytics analytics={portalAnalytics?.nns} />}
      </div>
    </div>
  );
};

export default Analytics;
