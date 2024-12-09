import { HttpAgent } from '@dfinity/agent';
import React, { useState } from 'react'
import { PORTAL_FACTORY } from '../../Utils/constants';
import { idlFactory as PortalFactoryIDL } from '../../Utils/portalfactory.did';
import { createActor } from '../../Utils/createActor';
const agent = new HttpAgent({ host: "https://ic0.app" });
const _backend = createActor(PORTAL_FACTORY, PortalFactoryIDL, agent);
 

const Admin = () => {
    


  const [file, setWasmFile] = useState(null);

  const handleFileChange =(event) => {
    console.log("event :",event)
    const selectedFile = event.target.files[0];
    console.log("uploaded wasm :",selectedFile)
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const arrayBuffer = reader.result;
        const uint8Array = new Uint8Array(arrayBuffer);
        console.log("wasm buffer :",uint8Array)

        await _backend.uploadWasm(uint8Array).then((res)=>{
          console.log("Wasm upload status : ", res)
        })
        
        // You can now use the Uint8Array as needed (e.g., send it to a server, process it, etc.)
      };
      reader.readAsArrayBuffer(selectedFile);
      setWasmFile(selectedFile);
    }
  };

  return (
    <>
     <h2>File Upload and Convert to Uint8Array</h2>

      <input type="file" onChange={handleFileChange} />
      
      {file && <p>Selected File: {file.name}</p>}
    </>



   
  )
}

export default Admin