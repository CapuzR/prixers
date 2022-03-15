import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Auth from "../pages/auth";
import Main from "../pages/main/index";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/main" element={<Main />} />

        <Route path="*" element={<Navigate to="/main" />} />
      </Routes>
    </Router>
  );
};
