import React from 'react'; 
import Logo from "../assets/logo.png"
import { ConnectWallet, useIdentityKit } from '@nfid/identitykit/react';
const Navbar = () => {
  const {connect} = useIdentityKit()

  return (
    <nav className="bg-gray-800">
      <div className=" mx-10 flex justify-between items-center">
        <div className="text-white text-lg font-bold">
            <img src={Logo} alt="" className='h-24 w-24' />
        </div>
        <div>
          <button onClick={()=>connect()} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Login
          </button>
           <ConnectWallet />

        </div>
      </div>
    </nav>
  );
};
export default Navbar;
