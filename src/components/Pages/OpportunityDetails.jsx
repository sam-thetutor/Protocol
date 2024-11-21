import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BobIndex from "../Pages/Bob";
import Bone from "../Pages/Bone";
import WaterNeuron from "../Pages/WaterNeuron";
import ICPSwap from "../Pages/ICPSwap";

const OpportunityDetails = () => {
  const { oppId } = useParams();
  return (
    <>
      {oppId === "bobfun" && <BobIndex />}
      {oppId === "bonefun" && <Bone />}
      {oppId === "waterneuron" && <WaterNeuron />}
      {oppId === "icpswap" && <ICPSwap />}
    </>
  );
};

export default OpportunityDetails;
