import React from "react";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Loading() {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <CircularProgress color="primary" />
      &nbsp;&nbsp; Loading...
    </Box>
  );
}

export default Loading;
