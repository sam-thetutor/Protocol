import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import { ConnectWallet, useIdentityKit } from "@nfid/identitykit/react";
import { FaUserCircle } from "react-icons/fa";
import { HttpAgent } from "@dfinity/agent";
import { createActor } from "../../Utils/createActor";
import { ICP_LEDGER_ID, PORTAL_FACTORY } from "../../Utils/constants";
import { idlFactory as PortalFactoryIDL } from "../../Utils/portalfactory.did";
import { Principal } from "@dfinity/principal";
import { idlFactory as ICPDL } from "../../Utils/icp.did";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
const agent = new HttpAgent({ host: "https://ic0.app" });
const _backend = createActor(PORTAL_FACTORY, PortalFactoryIDL, agent);
let icpActor = createActor(ICP_LEDGER_ID, ICPDL, agent);

const Navbar = () => {
  const { connect, user,disconnect } = useIdentityKit();
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [portalDetails, setPortalDetails] = useState(null);
const [refreshData,setRefreshData] = useState("")



  const handleProfileClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // useEffect(() => {
  //   const getUserPortalDetails = async () => {
  //     if (!user) return;
  //     try {
  //       //get the user portal, if user is logged in
  //       let userPortal = await _backend.get_user_portal(
  //         Principal.fromText("2vxsx-fae")
  //       );
        
  //       if (userPortal !== "") {
  //         //get user balance
  //         let balance = await icpActor.icrc1_balance_of({
  //           owner: Principal.fromText(userPortal),
  //           subaccount: [],
  //         });
          
  //         setPortalDetails({
  //           balance:Number(balance),
  //           id: userPortal,
  //         });
  //         console.log("user",user?.principal?.toString())
  //         console.log("user portal :", userPortal, Number(balance));
  //       } else {
  //         setPortalDetails(null);
  //       }
  //     } catch (error) {
  //       console.log("error in getting user portal details", error);
  //     }
  //   };

  //   getUserPortalDetails();
  // }, [user,refreshData]);

  return (
    <nav className="bg-gray-800 ">
      <div className="mx-10 flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <img
          onClick={()=>navigate("/")}
          
          src={Logo} alt="Logo" className="h-24 w-24 cursor-pointer" />
        </div>
        <div className="flex flex-row gap-8 justify-center items-center">

          <div
          onClick={()=>navigate("marketplace")}
           className="text-white cursor-pointer ">Marketplace</div>
          {user ? (
            <div className="flex flex-row gap-6 justify-center items-center">

              <FaUserCircle
                className="text-white text-3xl cursor-pointer"
                onClick={()=>navigate("/profile")}
                />
            <LuLogOut className="cursor-pointer" color="white" onClick={()=>disconnect()} size={23} />
            </div>
          ) : (
            <button
              onClick={() => connect()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
