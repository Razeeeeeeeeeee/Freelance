import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React from "react";
import "./App.css";
import Candidate from "./pages/candidate";
import Home from "./pages/home";
import NavBar from "./components/navbar";
import Candidate_form from "./pages/candidate_manual";
import Offlline_mode_candi from "./pages/offlline_mode_candi";
import Employer from "./pages/employer";
import Employer_manual from "./pages/employer_manual";
import Employer_offline from "./pages/employer_offline";
import Admin_panel from "./pages/admin_panel";
import Selectalgorithm from "./pages/selectalgorithm";
import Visualisation from "./pages/visualisation";

function App() {
  const location = useLocation();
  return (
    <>
      <NavBar />
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/candidate" element={<Candidate />} />
          <Route path="/candidate_form" element={<Candidate_form />} />
          <Route
            path="/offlline_mode_candi"
            element={<Offlline_mode_candi />}
          />
          <Route path="/employer" element={<Employer />} />
          <Route path="/employer_form" element={<Employer_manual />} />
          <Route path="/employer_offline" element={<Employer_offline />} />
          <Route path="/admin_panel" element={<Admin_panel />} />
          <Route path="/select" element={<Selectalgorithm />} />
          <Route path="/visualisation" element={<Visualisation />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
