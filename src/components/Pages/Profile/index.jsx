import { HttpAgent } from "@dfinity/agent";
import React, { useEffect, useState } from "react";
import { createActor } from "../../../Utils/createActor";
import { ICP_LEDGER_ID, PORTAL_FACTORY } from "../../../Utils/constants";
import { idlFactory as PortalFactoryIDL } from "../../../Utils/portalfactory.did";
import { idlFactory as ICPDL } from "../../../Utils/icp.did";
import { useNavigate } from "react-router-dom";
import { Principal } from "@dfinity/principal";
import { useIdentityKit } from "@nfid/identitykit/react";
import { AccountIdentifier } from "@dfinity/ledger-icp";
import { CgClose } from "react-icons/cg";
import { ClipLoader } from "react-spinners";

const agent = new HttpAgent({ host: "https://ic0.app" });
const _backend = createActor(PORTAL_FACTORY, PortalFactoryIDL, agent);
let icpActor = createActor(ICP_LEDGER_ID, ICPDL, agent);

const Index = () => {
  const { connect, user, disconnect } = useIdentityKit();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [portalDetails, setPortalDetails] = useState(null);
  const [refreshData, setRefreshData] = useState("");
  const [dataLoading, setDataLoading] = useState(false);
  const [newPortalLoading, setNewPortalLoading] = useState(false);

  useEffect(() => {
    const getUserPortalDetails = async () => {
      if (!user) return;
      try {
        setDataLoading(true);
        //get the user portal, if user is logged in
        let userPortal = await _backend.get_user_portal(user.principal);

        if (userPortal !== "") {
          //get user balance
          let balance = await icpActor.icrc1_balance_of({
            owner: Principal.fromText(userPortal),
            subaccount: [],
          });

          setPortalDetails({
            balance: Number(balance),
            id: userPortal,
          });
          console.log("user portal :", userPortal, Number(balance));
        } else {
          setPortalDetails(null);
        }
        console.log("user", user?.principal?.toString());
      } catch (error) {
        console.log("error in getting user portal details", error);
      }
      setDataLoading(false);
    };

    getUserPortalDetails();
  }, [user, refreshData]);



  //create new portal
  const handleNewPortal = async () => {
    try {
      console.log("creating new portal");
    } catch (error) {
      console.log("error in creating new portal", error);
    }
  };

  

  return (
    <div className="flex flex-col w-full justify-center px-8 items-center">
      {/* portal information */}
      <div className="flex flex-row items-center justify-between gap-16">
        <h1 className="flex">Control Center</h1>
        <CgClose
          className="cursor-pointer"
          size={25}
          onClick={() => disconnect()}
        />
      </div>
      {user && !dataLoading ? (
        portalDetails ? (
          <div className="flex gap-4 flex-col mt-6 bg-gray-800 rounded-lg text-white justify-center items-start px-8 py-4">
            <div className="flex flex-col gap-1">
              <span>Portal ID :</span>
              <span>{portalDetails.id}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span>Account Identifier :</span>
              <span>
                {AccountIdentifier.fromPrincipal({
                  principal: user.principal,
                }).toHex()}
              </span>
            </div>

            <h1 className="text-xl ">Balance: {portalDetails?.balance}</h1>
          </div>
        ) : (
          <>
            {newPortalLoading ? (
              <ClipLoader color="gray" size={25} />
            ) : (
              <button
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-400"
                onClick={handleNewPortal}
              >
                Create Portal
              </button>
            )}
          </>
        )
      ) : (
        <ClipLoader color="gray" size={25} />
      )}
    </div>
  );
};

export default Index;