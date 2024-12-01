import { HttpAgent } from "@dfinity/agent";
import React, { useEffect, useState } from "react";
import {
  BONE_FUN_FACTORY_ID,
  PORTAL_FACTORY,
  shortenPrincipal,
} from "../../../Utils/constants";
import { idlFactory as PortalFactoryIDL } from "../../../Utils/portalfactory.did";
import { idlFactory as BoneFactoryIDL } from "../../../Utils/bonefactory.did";
import { useIdentityKit } from "@nfid/identitykit/react";
import { createActor } from "../../../Utils/createActor";
import { ClipLoader } from "react-spinners";
import NewDogModal from "./CreateDog";

const agent = new HttpAgent({ host: "https://ic0.app" });
const _backend = createActor(PORTAL_FACTORY, PortalFactoryIDL, agent);
const _boneFactory = createActor(BONE_FUN_FACTORY_ID, BoneFactoryIDL, agent);

const Index = () => {
  const { user: loggedInUser } = useIdentityKit();
  const [boneDetails, setBoneDetails] = useState(null);
  const [topUser, setTopUser] = useState(null);
  const [topAlliance, setTopAlliance] = useState(null);

  const [isMinerModalOpen, setIsMinerModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("miner");

  const openMinerModal = () => setIsMinerModalOpen(true);
  const closeMinerModal = () => setIsMinerModalOpen(false);

  useEffect(() => {
    const getDetails = async () => {
      try {
        let bneDetails = await _boneFactory.get_homepage_calc();
        let _topUser = await _boneFactory.top_user();

        let data = [];
        setTopUser(_topUser);
        const _topAlliance = await _boneFactory.top_alliance();
        for (const alliance of _topAlliance) {
          let _creator = await _boneFactory.get_mining_alliance(alliance[1]);
          data.push([...alliance, _creator.owner]);
        }
        console.log("alliance : ", data);
        setTopAlliance(data);
        console.log("bone details : ", bneDetails, _topUser);
        setBoneDetails(bneDetails);
      } catch (error) {
        console.log("error in fetching data : ", error);
      }
    };

    getDetails();
  }, [loggedInUser]);

  return (
    <div className="flex flex-col font-boneFont text-white md:flex-col px-4 bg-[#000] font-bold w-full gap-4 pb-8 text-sm  min-h-screen items-center">
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-3xl text-white">Bone</h1>

        <span>The First POW GameFi Mining Project on ICP</span>
        <span>Bark, Mine, and Shine Join the Doggo Mining Adventure</span>
      </div>
      <div>
        {boneDetails ? (
          <div className="flex flex-row gap-2">
            <div className="flex flex-col gap-1 p-1 rounded-md">
              <span className="font-bold">Circulating Bone supply</span>
              <span className="text-[#f98c3f] font-bold bg-[#212224] rounded-sm w-full items-center justify-center flex">
                921.23 K
              </span>
            </div>
            <div className="flex flex-col gap-1  p-1 rounded-md">
              <span className="font-bold">Miners</span>
              <span className="text-[#f98c3f] font-bold bg-[#212224] rounded-sm w-full items-center justify-center flex">
                {Number(boneDetails.current_avtive_minders)}
              </span>
            </div>
            <div className="flex flex-col gap-1  p-1 rounded-md">
              <span className="font-bold">Current Block Reward</span>
              <span className="text-[#f98c3f] font-bold bg-[#212224] rounded-sm w-full items-center justify-center flex">
                500
              </span>
            </div>
            {/* tabs for the miner and allegiance */}
          </div>
        ) : (
          <ClipLoader color="#fff" loading={true} size={20} />
        )}
      </div>
      <div className="flex flex-row gap-3 w-full justify-center items-center">
        <button
          className="border p-1 rounded-lg bg-[#212224]"
          onClick={() => setActiveTab("miner")}
        >
          Miner
        </button>
        <button
          className="border p-1 rounded-lg bg-[#212224]"
          onClick={() => setActiveTab("allegiance")}
        >
          Alliance
        </button>
      </div>
      {activeTab === "miner" && (
        <div>
          <button onClick={openMinerModal}>Create Miner</button>
          <NewDogModal isOpen={isMinerModalOpen} onClose={closeMinerModal} />
          <table className="table-auto w-full mt-4 border-collapse">
            <thead className="">
              <tr className="">
                <th className=" px-4 py-2 ">Principal ID</th>
                <th className=" px-4 py-2">Diamond Dog</th>
                <th className=" px-4 py-2">Gold Dog</th>
                <th className=" px-4 py-2">Silver Dog</th>
                <th className=" px-4 py-2">Cooper Dog</th>
                <th className=" px-4 py-2">Block Mined</th>
              </tr>
            </thead>
            <tbody>
              {topUser?.map((user, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "" : "bg-[#212224] rounded-lg"}
                >
                  <td className=" text-center px-4 py-2 ">
                    {shortenPrincipal(user[0])}
                  </td>
                  <td className=" text-center px-4 py-2 ">
                    {user[1].toString()}
                  </td>
                  <td className=" text-center px-4 py-2">
                    {user[2].toString()}
                  </td>
                  <td className=" text-center px-4 py-2">
                    {user[3].toString()}
                  </td>
                  <td className=" text-center px-4 py-2">
                    {user[4].toString()}
                  </td>
                  <td className=" text-center px-4 py-2">
                    {user[5].toString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === "allegiance" && (
        <table className="table-auto w-full mt-4 border-collapse">
          <thead className="">
            <tr className="">
              <th className=" px-4 py-2 ">Alliance Name</th>
              <th className=" px-4 py-2">Alliance ID</th>
              <th className=" px-4 py-2"> Alliance Creator</th>
              <th className=" px-4 py-2 text-start">Dog Info</th>
              <th className=" px-4 py-2">Mining Weight</th>
              {loggedInUser && <th className=" px-4 py-2">Join Alliance</th>}
            </tr>
          </thead>
          <tbody>
            {topAlliance?.map((user, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "" : "bg-[#212224] rounded-lg"}
              >
                <td className=" text-center px-4 py-2 ">{user[0]}</td>
                <td className=" text-center px-4 py-2 ">
                  {user[1].toString()}
                </td>
                <td className=" text-center px-4 py-2">
                  {shortenPrincipal(user[7])}
                </td>
                <td className=" text-center px-4 py-2">
                  <div className="flex flex-col text-start text-sm gap-1">
                    <span>Cooper Dog: {user[6].toString()}</span>
                    <span>Silver Dog: {user[3].toString()}</span>
                    <span>Gold Dog: {user[4].toString()}</span>
                    <span>Diamond Dog: {user[5].toString()}</span>
                  </div>
                </td>
                <td className=" text-center px-4 py-2">{user[6].toString()}</td>
                {loggedInUser && (
                  <td className=" text-center px-4 py-2">Join</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Index;
