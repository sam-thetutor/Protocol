import { HttpAgent } from "@dfinity/agent";
import React, { useEffect, useState } from "react";
import { createActor } from "../../../Utils/createActor";
import {
  copyToClipboard,
  ICP_LEDGER_ID,
  PORTAL_FACTORY,
  shortenText,
  tokenLedgers,
} from "../../../Utils/constants";
import { idlFactory as PortalFactoryIDL } from "../../../Utils/portalfactory.did";
import { idlFactory as ICPDL } from "../../../Utils/icp.did";
import { useNavigate } from "react-router-dom";
import { Principal } from "@dfinity/principal";
import { useAgent, useIdentityKit } from "@nfid/identitykit/react";
import { AccountIdentifier } from "@dfinity/ledger-icp";
import { CgClose } from "react-icons/cg";
import { ClipLoader } from "react-spinners";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IoIosCopy } from "react-icons/io";
import { IoCopyOutline } from "react-icons/io5";
import TokenCard from "./TokenCard";
import { IcrcLedgerCanister } from "@dfinity/ledger-icrc";
import InvestmentSummary from "./InvestmentSummary";
import Analytics from "./Analytics/Analytics";
import { idlFactory as PersonalPortal } from "../../../Utils/personalportal.did";
const agent = new HttpAgent({ host: "https://ic0.app", retryTimes: 5 });
const _backend = createActor(PORTAL_FACTORY, PortalFactoryIDL, agent);

let icpActor = createActor(ICP_LEDGER_ID, ICPDL, agent);

const Index = () => {
  const { connect, user, disconnect } = useIdentityKit();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [portalDetails, setPortalDetails] = useState(null);
  const [refreshData, setRefreshData] = useState("");
  const [dataLoading, setDataLoading] = useState(false);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [newPortalLoading, setNewPortalLoading] = useState(false);
  const [tokenBalances, setTokenBalances] = useState([]);

  //set analytics data

  const [BobAnalytics, setBobAnalytics] = useState(null);
  const [portalAnalytics, setPortalAnalytics] = useState(null);

  const authenticatedAgent = useAgent();
  const queryClient = useQueryClient();

  const { data: userPortal } = useQuery({
    queryKey: ["userPortal"],
  });

  //7l4jp-byaaa-aaaap-qpkna-cai
  useEffect(() => {
    const getUserPortalDetails = async () => {
      if (!user) return;
      try {
        setDataLoading(true);
        //get the user portal, if user is logged in
        console.log("user principal : ", user.principal.toString());
        let userPortal = await _backend.get_user_portal(user.principal);

        console.log("user portal", userPortal);
        if (userPortal != "") {
          //get user balance
          let balance = await icpActor.icrc1_balance_of({
            owner: Principal.fromText(userPortal),
            subaccount: [],
          });
          console.log("balance", Number(balance));
          queryClient.setQueryData(["userPortal"], userPortal);

          setPortalDetails({
            balance: Number(balance),
            id: userPortal,
          });
        } else {
          setPortalDetails(null);
        }
      } catch (error) {
        console.log("error in getting user portal details", error);
      }

      setDataLoading(false);
    };

    getUserPortalDetails();
  }, [user, refreshData]);

  //get the analytics data

 

  //get all the token balances

  useEffect(() => {
    const getBalances = async () => {
      try {
        if (!user) return;

        let data = [];
        setBalanceLoading(true);
        for (const _token of tokenLedgers) {
          let _ledger = IcrcLedgerCanister.create({
            agent,
            canisterId: _token.canister_id,
          });

          //fetch the balance
          let _balance = await _ledger.balance({
            owner: user.principal,
            subaccount: undefined,
            certified: false,
          });
          data.push({
            name: _token.name,
            balance: Number(_balance) / Math.pow(10, _token.decimals),
          });
        }

        setTokenBalances(data);
      } catch (error) {
        console.log("error in getting user portal details", error);
      }
      setBalanceLoading(false);
    };

    getBalances();
  }, [user, refreshData]);

  //create new portal
  const handleNewPortal = async () => {
    try {
      if (!user || !authenticatedAgent) return;

      setNewPortalLoading(true);

      const authActor = createActor(
        PORTAL_FACTORY,
        PortalFactoryIDL,
        authenticatedAgent
      );

      let newPortal = await authActor.create_user_portal();
      console.log("new portal", newPortal);
    } catch (error) {
      console.log("error in creating new portal", error);
    }
    setNewPortalLoading(false);
    setRefreshData(Math.random());
  };

  const handleSend = (tokenName, tokenBalance) => {
    console.log(`Send ${tokenName}` + " " + tokenBalance);
  };

  const handleReceive = (tokenName) => {
    console.log(`Receive ${tokenName}`);
  };

  return (
    <div className="flex bg-[#151314] min-h-screen  flex-col w-full  px-8 items-center">
      <div className="flex w-[60vw] flex-col text-white items-center justify-between gap-4">
        {!dataLoading ? (
          portalDetails ? (
            <div className="flex gap-4 w-[60vw] flex-col mt-6 border  rounded-lg text-white justify-center items-start px-8 py-4">
              <div className="flex flex-col  md:flex-row w-full  justify-between">
                <div className="flex flex-col gap-1">
                  <span className="font-bold">Portal ID</span>
                  <div className="flex flex-row gap-2 justify-center items-center">
                    <span>{shortenText(portalDetails?.id)}</span>

                    <IoCopyOutline
                      className="flex cursor-pointer"
                      onClick={() => copyToClipboard(portalDetails?.id)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold">Account Identifier </span>
                  <div className="flex flex-row gap-2 justify-center items-center">
                    <span>
                      {user?.principal &&
                        shortenText(
                          AccountIdentifier.fromPrincipal({
                            principal: user?.principal,
                          }).toHex()
                        )}
                    </span>
                    <IoCopyOutline
                      className="flex cursor-pointer"
                      onClick={() =>
                        copyToClipboard(
                          AccountIdentifier.fromPrincipal({
                            principal: user?.principal,
                          }).toHex()
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex w-full justify-center flex-wrap gap-4 mt-4">
                {balanceLoading ? (
                  <ClipLoader color="white" size={25} />
                ) : (
                  tokenBalances?.map((_token, index) => (
                    <TokenCard
                      key={index}
                      tokenName={_token.name}
                      tokenBalance={_token.balance}
                      onSend={() => handleSend(_token.name, _token.balance)}
                      onReceive={() =>
                        handleReceive(_token.name, _token.balance)
                      }
                    />
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="flex gap-4 w-full flex-col mt-6 bg-gray-800 rounded-lg text-white justify-center items-center px-8 py-4">
              {newPortalLoading ? (
                <ClipLoader color="white" size={25} />
              ) : (
                <button
                  className=" text-white px-4 py-2 bg-gray-500 items-center justify-center flex rounded hover:bg-gray-400"
                  onClick={handleNewPortal}
                >
                  Create Portal
                </button>
              )}
            </div>
          )
        ) : (
          <ClipLoader color="white" size={25} />
        )}

        <InvestmentSummary />
        { (
          <Analytics analytics={portalAnalytics} />
        )}
      </div>
    </div>
  );
};

export default Index;
