import React, { useState, useEffect, forwardRef } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";

import AddBoxIcon from "@mui/icons-material/AddBox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import Loading from "../../components/loading";
import service from "../service";

const toolbarHeight = 68;

function Auth() {
  const [isWalletAuth, setIsWalletAuth] = useState(
    Boolean(localStorage.getItem("wallet"))
  );
  const [isUserData, setIsUserData] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [asset, setAsset] = useState();
  const [image, setImage] = useState(
    "https://via.placeholder.com/300.png/09f/fff"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [message, setMessage] = useState(undefined);
  const [severity, setSeverity] = useState(undefined);

  const [tools, setTools] = useState([]);
  const [camera, setCamera] = useState("");
  const [lens, setLens] = useState("");
  const [selectedTools, setSelectedTools] = useState([]);

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(async () => {
    if (isWalletAuth) navigate("/main");
  }, []);
  return isLoading ? (
    <Loading />
  ) : (
    <div>
      {!isWalletAuth && (
        <div
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1644256086122-7988468e2545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0NTE5NzQxNg&ixlib=rb-1.2.1&q=80&w=1080')",
            height: "100vh",
            backgroundSize: "cover",
          }}
        >
          <MuiAppBar
            position="fixed"
            style={{ background: "transparent", height: toolbarHeight }}
          >
            <Toolbar>
              <img src={""} alt="logo" />
            </Toolbar>
          </MuiAppBar>
          <Box style={{ paddingTop: toolbarHeight }}>
            <Box
              style={{
                height: `calc(100vh - ${toolbarHeight}px)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                style={{ textTransform: "capitalize" }}
                onClick={onSignInStoic}
              >
                Connect stoic
              </Button>
            </Box>
          </Box>
        </div>
      )}
      {isWalletAuth && (
        <div>
          <MuiAppBar style={{ height: toolbarHeight }} position="fixed">
            <Toolbar>
              <img src={""} alt="logo" />
              <IconButton
                style={{ color: "white", marginLeft: "auto" }}
                onClick={onLogout}
              >
                <ExitToAppIcon style={{ color: "white" }} />
              </IconButton>
            </Toolbar>
          </MuiAppBar>
          <Box style={{ paddingTop: toolbarHeight }}>
            <Box style={{ padding: "32px", paddingTop: "16px" }}>
              <Typography variant="h4">Welcome!</Typography>
              <Paper elevation={3} style={{ padding: "24px" }}>
                {!isUserData ? (
                  <>
                    <Box style={{ display: "flex", justifyContent: "center" }}>
                      <IconButton component="label">
                        <Avatar
                          style={{ width: "120px", height: "120px" }}
                          src={image}
                        />
                        <input hidden type="file" onChange={handleChange} />
                      </IconButton>
                    </Box>
                    <Grid container spacing={1} style={{ marginTop: "32px" }}>
                      <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                        <TextField
                          type="text"
                          label="Username"
                          variant="outlined"
                          required
                          fullWidth
                          value={username}
                          onChange={(event) => setUsername(event.target.value)}
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                        <TextField
                          type="text"
                          label="Display name"
                          variant="outlined"
                          required
                          value={displayName}
                          onChange={(event) =>
                            setDisplayName(event.target.value)
                          }
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                        <TextField
                          type="text"
                          label="Given name"
                          variant="outlined"
                          fullWidth
                          value={givenName}
                          onChange={(event) => setGivenName(event.target.value)}
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                        <TextField
                          type="text"
                          label="Family name"
                          variant="outlined"
                          fullWidth
                          value={familyName}
                          onChange={(event) =>
                            setFamilyName(event.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                        <TextField
                          type="text"
                          label="Location"
                          variant="outlined"
                          fullWidth
                          value={location}
                          onChange={(event) => setLocation(event.target.value)}
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                        <TextField
                          fullWidth
                          type="text"
                          label="Email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                        <TextField
                          fullWidth
                          type="text"
                          label="Phone"
                          variant="outlined"
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <TextField
                          fullWidth
                          type="text"
                          label="About"
                          variant="outlined"
                          multiline
                          rows={3}
                          value={about}
                          onChange={(event) => setAbout(event.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Typography variant="h5">Cameras</Typography>
                      <FormControl
                        style={{ marginBottom: 4 }}
                        required
                        fullWidth
                      >
                        <Select
                          labelId="camera-label"
                          id="camera-label-select"
                          value={camera}
                          onChange={(event) => setCamera(event.target.value)}
                        >
                          {tools.map(
                            (type) =>
                              type.category.name === "Camera" && (
                                <MenuItem value={type.id} key={type.id}>
                                  {type.name}
                                </MenuItem>
                              )
                          )}
                        </Select>
                      </FormControl>
                      <Box style={{ marginTop: "8px" }}>
                        {selectedTools.map(
                          (tool) =>
                            tool.category.name === "Camera" && (
                              <Chip
                                label={tool.name}
                                variant="outlined"
                                style={{ marginBottom: "8px" }}
                                key={tool.id}
                                onDelete={() => {
                                  setSelectedTools(
                                    selectedTools.filter(
                                      (tl) => tl.id !== tool.id
                                    )
                                  );
                                }}
                              />
                            )
                        )}
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      style={{ justifyContent: "center", display: "flex" }}
                    >
                      <IconButton
                        size="large"
                        color="primary"
                        disabled={camera === "" ? true : false}
                        onClick={() => addTools(camera)}
                      >
                        <AddBoxIcon fontSize="large" color="primary" />
                      </IconButton>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Typography variant="h5">Lenses</Typography>
                      <FormControl
                        style={{ marginBottom: 4 }}
                        required
                        fullWidth
                      >
                        <Select
                          labelId="lenses-label"
                          id="lenses-label-select"
                          value={lens}
                          onChange={(event) => setLens(event.target.value)}
                        >
                          {tools.map(
                            (type) =>
                              type.category.name === "Lens" && (
                                <MenuItem value={type.id} key={type.id}>
                                  {type.name}
                                </MenuItem>
                              )
                          )}
                        </Select>
                      </FormControl>
                      <Box style={{ marginTop: "8px" }}>
                        {selectedTools.map(
                          (tool) =>
                            tool.category.name === "Lens" && (
                              <Chip
                                label={tool.name}
                                style={{ marginBottom: "8px" }}
                                variant="outlined"
                                key={tool.id}
                                onDelete={() => {
                                  setSelectedTools(
                                    selectedTools.filter(
                                      (tl) => tl.id !== tool.id
                                    )
                                  );
                                }}
                              />
                            )
                        )}
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      style={{ justifyContent: "center", display: "flex" }}
                    >
                      <IconButton
                        disabled={lens === "" ? true : false}
                        size="large"
                        onClick={() => addTools(lens)}
                        color="primary"
                      >
                        <AddBoxIcon fontSize="large" color="primary" />
                      </IconButton>
                    </Grid>
                  </Grid>
                )}

                <Box
                  style={{
                    marginTop: "32px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    style={{
                      marginRight: "4px",
                      textTransform: "capitalize",
                      fontSize: "12px",
                      background: isUserData && "white",
                      color: isUserData && "black",
                    }}
                    onClick={() => onHandleScreem(false)}
                    fullWidth
                  >
                    Basics
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    style={{
                      textTransform: "capitalize",
                      fontSize: "12px",
                      background: !isUserData && "white",
                      color: !isUserData && "black",
                    }}
                    onClick={() => onHandleScreem(true)}
                  >
                    Cameras & Lenses
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Box>
          <Fab
            color="primary"
            aria-label="add"
            style={{ position: "absolute", bottom: 16, right: 16 }}
            onClick={() => {
              onCreateProfile(
                {
                  bio: {
                    givenName: [givenName],
                    familyName: [familyName],
                    username: [username],
                    displayName: [displayName],
                    location: [location],
                    about: [about],
                    email: [email],
                    phone: [phone],
                    socials: [
                      {
                        deSo: [
                          {
                            distrikt: [],
                            dscvr: [],
                            openChat: [],
                          },
                        ],
                        ceSo: [
                          {
                            discord: [],
                            twitter: [],
                            instagram: [],
                            facebook: [],
                            tiktok: [],
                          },
                        ],
                      },
                    ],
                  },
                  avatarRequest: {
                    Put: {
                      key: JSON.parse(localStorage.getItem("_scApp")).principal,
                      contentType: "image/jpeg",
                      payload: {
                        Payload: asset,
                      },
                      callback: [],
                    },
                  },
                },
                {
                  tools: selectedTools,
                }
              );
            }}
          >
            <ChevronRightIcon />
          </Fab>
        </div>
      )}
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleCloseSnackbar}
        open={isSnackbarOpen}
        TransitionComponent={SlideTransition}
        style={{ display: isSnackbarOpen ? "flex" : "none" }}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </div>
  );

  function convertToBase64(blob) {
    return new Promise((resolve) => {
      var reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }

  async function handleChange(e) {
    const file = e.target.files[0];

    const resizedString = await convertToBase64(file);

    const data = [...new Uint8Array(await file.arrayBuffer())];
    setImage(resizedString);
    setAsset(data);
  }

  function onHandleScreem(screen) {
    setIsUserData(screen);
  }

  function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
  }

  function handleCloseSnackbar(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
  }

  async function onLogout() {
    const wallet = localStorage.getItem("wallet");
    if (wallet) {
      const isDisconnected = await service.onSignOutStoic();
      if (isDisconnected) {
        localStorage.removeItem("wallet");
        setIsWalletAuth(false);
        setIsUserData(false);
      }
    }
  }

  async function onSignInStoic() {
    setIsLoading(true);
    const identity = await service.onSignInStoic();
    if (identity) {
      localStorage.setItem("wallet", "Stoic");
      setIsWalletAuth(true);
      const profile = await service.getProfile();
      const tools = await service.getTools();
      setTools(tools.ok);

      if (Object.keys(profile)[0] !== "err") navigate("/main");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      alert("not");
    }
  }

  async function onCreateProfile(profileData, tools) {
    setIsLoading(true);
    await service.createProfile(profileData);
    await service.createArtist(tools.tools);
    navigate("/main");

    setIsLoading(false);
  }

  function addTools(id) {
    const tool = tools.find((tl) => tl.id === id);
    if (selectedTools.find((tl) => tl.id === tool.id)) {
      setIsSnackbarOpen(true);
      setSeverity("error");
      setMessage("Item already exist");
    } else {
      setSelectedTools([...selectedTools, tool]);
    }
  }
}

export default Auth;
