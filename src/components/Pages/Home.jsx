import React from "react";
import Logo from "../../assets/logo.png";
import BobLogo from "../../assets/boblogo.png";
import WaterNeuronLogo from "../../assets/waterneuron.png";
import BoneLogo from "../../assets/bonelogo.png";
import IcpSwapLogo from "../../assets/icpswap.png";
import { GoDotFill } from "react-icons/go";
import Kongswap from "../../assets/kongswap.png"
import { useNavigate } from "react-router-dom";

const Home = () => {
  const cards = [
    {
      title: "Bob",
      description: "Bitcoin's consensus with Doge's utility	",
      image: BobLogo,
      logo: BobLogo,
      opportunities: 1,
      link: "/opportunity/bobfun",
    },
    {
      title: "Water Neuron",
      description: "WaterNeuron is a liquid staking protocol on ICP",
      image: "https://via.placeholder.com/150",
      logo: WaterNeuronLogo,
      opportunities: 1,
      link: "/opportunity/waterneuron",
    },
    {
      title: "ICPSwap",
      description:
        "A full-stack financial, market, and DAO services hub on ICP",
      image: "https://via.placeholder.com/150",
      logo: IcpSwapLogo,
      opportunities: 40,
      link: "/opportunity/icpswap",
    },
    {
      title: "Bone",
      description: "The First POW GameFi Mining Project on ICP",
      image: "https://via.placeholder.com/150",
      logo: BoneLogo,
      opportunities: 1,
      link: "/opportunity/bonefun",
    },
    {
      title: "KongSwap",
      description: "The one stop token shop-Trade tokens across all chains with ease",
      image: "https://via.placeholder.com/150",
      logo: Kongswap,
      opportunities: 2,
      link: "/opportunity/kongswap",
    },
  ];

  const navigate = useNavigate();

  return (
    <div
      className="export default Home
flex w-full px-4 gap-4 h-[50vh] flex-col justify-center items-center"
    >
      <div className="flex flex-col mt-36 items-center">
        <h1 className="text-7xl mt-6">Dearn Protocol</h1>
        <span>A cross-chain yield asset management protocol</span>
        {/* <button onClick={()=>navigate('/admin')}>Admin</button> */}
      </div>
      <div className="grid grid-cols-2 mt-4  gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-gray-800 text-white flex flex-col px-4 py-3 rounded-lg shadow-lg"
          >
            <div className="flex flex-row justify-between items-center">
              <h2
                onClick={() => navigate(card.link)}
                className="text-3xl cursor-pointer"
              >
                {card.title}
              </h2>
              <img
                src={card.logo}
                alt={`${card.title} logo`}
                className="w-12 h-12 mb-2"
              />
            </div>
            <p className="">{card.description}</p>
            <div className="flex flex-row mt-4 justify-center items-center w-full">
              <span className="flex  items-center mt w-full">
                {card.opportunities} challenges
              </span>
              <div className="flex flex-row items-center">
                <GoDotFill size={20} color="green" />
                <span>active</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
