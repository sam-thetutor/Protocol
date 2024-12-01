import { HttpAgent } from "@dfinity/agent";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { createActor } from "../../../Utils/createActor";
import { PORTAL_FACTORY } from "../../../Utils/constants";
import { idlFactory as PortalFactoryIDL } from "../../../Utils/portalfactory.did";
import { ClipLoader } from "react-spinners";
import NewMiner from "./NewMiner";
import UpgradeMiner from "./UpgradeMiner";
import JoinPool from "./JoinPool";
import { useIdentityKit } from "@nfid/identitykit/react";
import { Principal } from "@dfinity/principal";
import SaleMiner from "./SaleMiner";
import { useQuery } from "@tanstack/react-query";
import { idlFactory as BobMinerIDL } from "../../../Utils/bobminer.did";
import Marketplace from "./Marketplace";

const agent = new HttpAgent({ host: "https://ic0.app" });
const _backend = createActor(PORTAL_FACTORY, PortalFactoryIDL, agent);

const Index = () => {
  const { oppId } = useParams();

  const { user } = useIdentityKit();

  const { data: userPortal } = useQuery({
    queryKey: ["userPortal"],
  });

  console.log("ddddd :", userPortal);
  const [bobInfo, setBobInfo] = React.useState(null);
  const [infoLoading, setInfoLoading] = React.useState(true);
  const [userMiners, setUserMiners] = React.useState(null);
  const [userMinersLoading, setUserMinersLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch BOB info
        let info = await _backend.get_bob_info();
        setBobInfo(info);
        console.log("dd :", info);

        // Fetch user miners if user is logged in
        if (user) {
          let miners = await _backend.get_user_miners(
            Principal.fromText(
              "nlax3-itogf-zlna4-5h4tp-staqt-pod4l-at4li-fq4wv-kgcbr-4z24y-vqe"
            )
          );

          if (miners.length > 0) {
            let data = [];

            let dd = miners.slice(0, 8);
            for (const miner of dd) {
              const _bobminer = createActor(
                miner.id.toString(),
                BobMinerIDL,
                agent
              );
              let res = await _bobminer.get_statistics();
              data.push({ ...miner, ...res });
            }

            console.log("data :", data);

            setUserMiners(data);
          }
        }
      } catch (error) {
        console.log("error in fetching data :", error);
      } finally {
        setInfoLoading(false);
        setUserMinersLoading(false);
      }
    };

    fetchData();
  }, [user, oppId]);




  return (
    <div className="flex flex-col md:flex-col px-4 w-full gap-4 justify-center items-center">
      <h1 className="flex text-4xl mt-8 w-full justify-center items-center uppercase">
        blockchain on blockchain(BOB)
      </h1>

      {/* description and information */}
      <div>
        <span>
          Blockchain-on-Blockchain (BOB) is a new blockchain built on top of
          another blockchain called ICP. It's like a special layer on an
          existing system. BOB creates a secure digital record book that uses
          ICP's network for safety.
        </span>

        {/* information about the miners */}

        <div className="mt-8 w-full justify-center items-center flex">
          {bobInfo ? (
            <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
              {/* <h2 className='text-2xl mb-4'>BOB Token Information</h2> */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex flex-col ">
                  <span>Total Miners:</span>
                  <p> {Number(bobInfo.totalMiners)}</p>
                </div>
                <div className="flex flex-col ">
                  <span>Blocks Mined: </span>
                  <p> {Number(bobInfo.blocksMined)}</p>
                </div>
                <div className="flex flex-col ">
                  <span>Current Block Miner Count: </span>
                  <p> {Number(bobInfo.currentBlockMinerCount)}</p>
                </div>

                <div className="flex flex-col ">
                  <span>Next Halving In: </span>
                  <p> {Number(bobInfo.nextHalvingIn)}</p>
                </div>
              </div>
            </div>
          ) : (
            <ClipLoader color="#000" size={20} />
          )}
        </div>
        {/* new miners and old miners */}
        <div className="flex flex-col gap-4 py-2 items-center justify-center w-full mt-8 ">
          <div className="flex gap-2">
            <NewMiner />
            <JoinPool />
            <Marketplace/>
          </div>
          <div className="flex flex-col gap-4  w-full justify-center items-center">
            <h2 className="flex w-full mt-8 items-center justify-center">
              My Miners
            </h2>

            <div className="flex flex-row w-full justify-center items-center">
              {user ? (
                <div className="flex w-full items-center justify-center border rounded-lg">
                  {userMiners ? (
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr>
                          <th className="py-2 ">Principal</th>
                          <th className="py-2">Mined Blocks</th>
                          <th className="py-2">Cycle Balance</th>
                          <th className="py-2">Cycles burned per minute</th>
                          {/* <th className="py-2">Hash per minute</th> */}
                          <th className="py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userMiners.map((miner, index) => (
                          <tr key={index}>
                            <td className="border px-4 py-2 text-center">
                              {miner.id.toString()}
                            </td>
                            <td className="border px-4 py-2 text-center">
                              {Number(miner.mined_blocks)}
                            </td>
                            <td className="border px-4 py-2 text-center">
                              {(Number(miner.cycle_balance) /1e12).toFixed(4) } T
                            </td>
                            <td className="border px-4 py-2 text-center">
                              {(Number(miner.cycles_burned_per_minute)/1e12).toFixed(4)}T
                            </td>
                            {/* <td className="border px-4 py-2 text-center">
                              {Number(miner.hash_per_minute)}
                            </td> */}





                            <td className="border px-4 py-2 text-center">
                              <div className="flex flex-row gap-2 items-center justify-center">
                                <UpgradeMiner miner={miner} />
                                <SaleMiner miner={miner} />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <ClipLoader color="#000" size={20} />
                  )}
                </div>
              ) : (
                <div>Login to see your miners</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
