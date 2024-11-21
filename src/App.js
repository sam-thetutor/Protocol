import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Pages/Home";
import OpportunityDetails from "./components/Pages/OpportunityDetails";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/opportunity/:oppId" element={<OpportunityDetails />} />

      </Routes>
    </>
  );
}

export default App;
