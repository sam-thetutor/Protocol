import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navigation/Navbar";
import Home from "./components/Pages/Home";
import OpportunityDetails from "./components/Pages/OpportunityDetails";
import Admin from "./components/Pages/Admin";
import Profile from "./components/Pages/Profile";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />


        <Route path="/opportunity/:oppId" element={<OpportunityDetails />} />
      </Routes>
    </>
  );
}

export default App;
