import React from "react";
import * as React from "react";
import ReactDOM from "react-dom";

import CssBaseline from "@mui/material/CssBaseline";

import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

import { AppRouter } from "./routes/appRouter";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2D2D2D",
    },
  },
});

function PrixerApp() {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default PrixerApp;
ReactDOM.render(<PrixerApp />, document.querySelector("#app"));
