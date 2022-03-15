import React, { useState, useEffect, forwardRef } from "react";
import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { encode } from "uint8-to-base64";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Masonry from "@mui/lab/Masonry";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EditIcon from "@mui/icons-material/Edit";
import HomeIcon from "@mui/icons-material/Home";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CameraIcon from "@mui/icons-material/Camera";

import service from "../service";
import Loading from "../../components/loading";

const toolbarHeight = 68;

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Main() {
  const [isArtDone] = useState(Boolean(localStorage.getItem("isArtDone")));
  const [currentProfile, setCurrentProfile] = useState();
  const [avatar, setAvatar] = useState();
  const [searchParams] = useSearchParams();
  const [isArtSelected, setIsArtSelected] = useState(true);
  const [isEditProfile, setIsEditProfile] = useState(true);
  const [showPrixerList, setShowPrixerList] = useState(false);
  const [isEditArt, setIsEditArt] = useState(false);

  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [message, setMessage] = useState(undefined);
  const [severity, setSeverity] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [asset, setAsset] = useState();
  const [assetArt, setAssetArt] = useState();
  const [arts, setArts] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const [isCreateArt, setIsCreateArt] = useState(false);
  const [isCreateGallery, setIsCrateGallery] = useState(false);
  const [isShowToolsInfo, setIsShowToolsInfo] = useState(false);
  const [camera, setCamera] = useState("");
  const [lens, setLens] = useState("");

  const [artTitle, setArtTitle] = useState("");
  const [artType, setArtType] = useState("");
  const [artCamera, setArtCamera] = useState("");
  const [artCategory, setArtCategory] = useState("");
  const [lensArt, setLensArt] = useState("");
  const [tagsArt, setTagsArt] = useState([]);
  const [tagValue, setTagValue] = useState("");
  const [aboutArt, setAboutArt] = useState("");
  const [galleryArt, setGalleryArt] = useState("");
  const [titleGallery, setTitleGallery] = useState("");
  const [aboutGallery, setAboutGallery] = useState("");

  const [anchorElCreation, setAnchorElCreation] = React.useState(null);
  const openCreation = Boolean(anchorElCreation);

  const [artistTools, setArtistTools] = useState([]);
  const [artTypes, setArtTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesTools, setCategoriesTools] = useState([]);
  const [tools, setTools] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]);
  const [currentTools, setCurrentTools] = useState([]);

  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const theme = useTheme();
  const mobileBreakpoint = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    setCurrentTools({
      camera: artistTools
        ?.map((art) =>
          tools.find((tl) => art.id === tl.id && art.category.name === "Camera")
        )
        .filter((i) => i)[0],
      lens: artistTools
        ?.map((art) =>
          tools.find((tl) => art.id === tl.id && art.category.name === "Lens")
        )
        .filter((i) => i)[0],
    });
    if (isArtDone) {
      if (searchParams.get("isEdit") === "true") {
        navigate("/main?page=profile&isEdit=true");
      } else if (searchParams.get("image")) {
        navigate("/main?page=profile&image=" + searchParams.get("image"));
      } else if (searchParams.get("gallery")) {
        navigate("/main?page=profile&gallery=" + searchParams.get("gallery"));
      } else {
        navigate("/main?page=profile");
      }
    }
  }, [searchParams]);

  useEffect(async () => {
    if (!Boolean(localStorage.getItem("wallet"))) navigate("/login");
    const profile = await service.getProfile();
    const arts = await getArtsPrincipal();
    const artGallery = await service.getGalleriesByPrincipal(
      JSON.parse(localStorage.getItem("_scApp")).principal
    );
    const artist = await service.getArtist();
    const artTypes = await service.readAllArtTypes();
    const categories = await service.readAllArtCategories();
    const toolsCategories = await service.getToolsCategories();
    const tools = await service.getTools();

    setCurrentTools({
      camera: artist.ok.tools
        .map((art) =>
          tools.ok.find(
            (tl) => art.id === tl.id && art.category.name === "Camera"
          )
        )
        .filter((i) => i)[0],
      lens: artist.ok.tools
        .map((art) =>
          tools.ok.find(
            (tl) => art.id === tl.id && art.category.name === "Lens"
          )
        )
        .filter((i) => i)[0],
    });

    if (arts.ok.length > 0) navigate("/main?page=profile");

    if (Object.keys(profile)[0] === "err") {
      navigate("/login");
      localStorage.clear();
    } else {
      setCurrentProfile(profile.ok[0][0].bio);
      setAvatar(
        "data:image/jpeg;base64," + encode(profile.ok[1][0].payload[0])
      );
      setAsset(profile.ok[1][0].payload[0]);
      const formatArts = arts.ok.map((result) => ({
        image: "data:image/jpeg;base64," + encode(result[2].payload[0]),
        id: result[0],
        info: result[1],
        asset: result[2].payload[0],
      }));

      setArts(formatArts);
      setArtTypes(artTypes.ok);
      setCategories(categories.ok);
      setCategoriesTools(toolsCategories.ok);
      setArtistTools(artist.ok.tools);
      setTools(tools.ok);
      setSelectedTools(
        artist.ok.tools.map((art) => tools.ok.find((tl) => art.id === tl.id))
      );
      setGalleries(
        artGallery.ok.map((result) => {
          return {
            image: formatArts.find(
              (art) => art.info.artBasics.artGalleries[0] === result[0]
            ),
            id: result[0],
            info: result[1],
          };
        })
      );
    }
  }, []);

  useEffect(() => {
    if (currentProfile) {
      setUsername(currentProfile.username[0]);
      setDisplayName(currentProfile.displayName[0]);
      setGivenName(currentProfile.givenName[0]);
      setFamilyName(currentProfile.familyName[0]);
      setLocation(currentProfile.location[0]);
      setEmail(currentProfile.email[0]);
      setPhone(currentProfile.phone[0]);
      setAbout(currentProfile.about[0]);
    }
  }, [currentProfile]);

  useEffect(() => {
    if (isEditProfile) setAsset(avatar);
  }, [isEditProfile]);

  useEffect(async () => {
    if (isEditArt) {
      const selectedArt = arts.find(
        (art) => art.id === searchParams.get("image")
      );
      setArtTitle(selectedArt?.info?.artBasics?.title);
      setArtType(selectedArt?.info?.artBasics?.artType.id);
      setArtCategory(selectedArt?.info?.artBasics?.artCategory.id);
      setAboutArt(selectedArt?.info?.artBasics?.about);
      setArtCamera(
        selectedArt?.info?.artBasics?.tools[0].find(
          (tl) => tl.category.name === "Camera"
        ).id
      );
      setLensArt(
        selectedArt?.info?.artBasics?.tools[0].find(
          (tl) => tl.category.name === "Lens"
        ).id
      );
      setTagsArt(selectedArt?.info?.artBasics?.tags);
      setAssetArt(selectedArt?.image);
      setAsset(selectedArt?.asset);
      setGalleryArt(selectedArt?.info?.artBasics?.artGalleries[0]);
    } else {
      setArtTitle("");
      setArtType("");
      setArtCategory("");
      setAboutArt("");
      setArtCamera("");
      setLensArt("");
      setGalleryArt("");
      setTagsArt([]);
      setAssetArt(undefined);
      setAsset(undefined);
    }
  }, [isEditArt]);
  return !currentProfile || isLoading ? (
    <Loading />
  ) : (
    <div
      style={{
        height: "100vh",
      }}
    >
      <MuiAppBar position="fixed" style={{ height: toolbarHeight }}>
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
        {searchParams.get("page") === "profile" ? (
          searchParams.get("isEdit") === "true" ? (
            <Box style={{ padding: 16 }}>
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h4">
                  {isEditProfile ? "Profile" : "Your cameras & lenses"}
                </Typography>

                <IconButton
                  color="primary"
                  onClick={() => navigate("/main&page=profile")}
                  style={{ marginLeft: "auto" }}
                >
                  <ArrowCircleLeftOutlinedIcon fontSize="large" />
                </IconButton>
              </Box>
              {isEditProfile ? (
                <>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 8,
                    }}
                  >
                    <IconButton component="label">
                      <Avatar
                        src={avatar && avatar}
                        style={{ width: "120px", height: "120px" }}
                      />
                      <input
                        hidden
                        type="file"
                        onChange={(event) => handleChange(event, true)}
                      />
                    </IconButton>
                  </Box>
                  <Grid container spacing={1} style={{ marginTop: "32px" }}>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                      <TextField
                        type="text"
                        label="Username"
                        variant="outlined"
                        value={username}
                        required
                        onChange={(event) => setUsername(event.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                      <TextField
                        type="text"
                        label="Display name"
                        variant="outlined"
                        required
                        value={displayName}
                        onChange={(event) => setDisplayName(event.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                      <TextField
                        type="text"
                        label="Given name"
                        value={givenName}
                        onChange={(event) => setGivenName(event.target.value)}
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                      <TextField
                        type="text"
                        label="Family name"
                        onChange={(event) => setFamilyName(event.target.value)}
                        variant="outlined"
                        value={familyName}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                      <TextField
                        type="text"
                        label="Location"
                        variant="outlined"
                        fullWidth
                        onChange={(event) => setLocation(event.target.value)}
                        value={location}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                      <TextField
                        fullWidth
                        type="text"
                        label="Email"
                        value={email}
                        variant="outlined"
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                      <TextField
                        fullWidth
                        type="text"
                        label="Phone"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <TextField
                        fullWidth
                        type="text"
                        label="About"
                        variant="outlined"
                        value={about}
                        onChange={(event) => setAbout(event.target.value)}
                        multiline
                        rows={3}
                      />
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid container spacing={1} style={{ marginTop: 24 }}>
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
                                style={{
                                  marginBottom: "8px",
                                  marginRight: "2px",
                                }}
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
                        onClick={() => addTools(camera)}
                        size="large"
                        color="primary"
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
                                style={{
                                  marginBottom: "8px",
                                  marginRight: "2px",
                                }}
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
                        onClick={() => addTools(lens)}
                        size="large"
                        color="primary"
                      >
                        <AddBoxIcon fontSize="large" color="primary" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </>
              )}
              {
                <Box style={{ marginTop: 12 }}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      onUpdateProfile(
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
                              key: JSON.parse(localStorage.getItem("_scApp"))
                                .principal,
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
                    Update
                  </Button>
                </Box>
              }

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
                    background: !isEditProfile && "white",
                    color: !isEditProfile && "black",
                  }}
                  onClick={() => setIsEditProfile(true)}
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
                    background: isEditProfile && "white",
                    color: isEditProfile && "black",
                  }}
                  onClick={() => setIsEditProfile(false)}
                >
                  Cameras & Lenses
                </Button>
              </Box>
            </Box>
          ) : searchParams.get("image") ? (
            !isEditArt ? (
              <Box>
                <Box style={{ padding: 16 }}>
                  <Box style={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h4">Art Detail</Typography>

                    <IconButton
                      color="primary"
                      onClick={() => navigate("/main?page=profile")}
                      style={{ marginLeft: "auto" }}
                    >
                      <ArrowCircleLeftOutlinedIcon fontSize="large" />
                    </IconButton>
                  </Box>
                </Box>
                <img
                  src={
                    arts.find((art) => art.id === searchParams.get("image"))
                      ?.image
                  }
                  srcSet={
                    arts.find((art) => art.id === searchParams.get("image"))
                      ?.image
                  }
                  alt={"image"}
                  loading="lazy"
                  style={{
                    borderBottomLeftRadius: 4,
                    borderBottomRightRadius: 4,
                    display: "block",
                    width: !mobileBreakpoint && "100%",
                    margin: mobileBreakpoint && "auto",
                    maxHeight: mobileBreakpoint && 650,
                  }}
                />
                <Box style={{ padding: 16 }}>
                  <Box style={{ display: "flex" }}>
                    <Box>
                      <Box>
                        <Typography variant="h5">
                          {
                            arts.find(
                              (art) => art.id === searchParams.get("image")
                            )?.info?.artBasics?.title
                          }
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body1">
                          {
                            arts.find(
                              (art) => art.id === searchParams.get("image")
                            )?.info?.artBasics?.about
                          }
                        </Typography>
                      </Box>
                    </Box>
                    <Box style={{ marginLeft: "auto" }}>
                      <IconButton color="primary">
                        <DeleteIcon
                          onClick={() => deleteArt(searchParams.get("image"))}
                        />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => setIsEditArt(true)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box style={{ marginTop: 24 }}>
                    <Box style={{ display: "flex" }}>
                      <Box style={{ marginRight: 8 }}>
                        <CameraAltIcon color="primary" />
                      </Box>
                      <Box>
                        <Typography variant="p">
                          {
                            arts
                              .find(
                                (art) => art.id === searchParams.get("image")
                              )
                              ?.info?.artBasics?.tools[0]?.find(
                                (tl) => tl.category.name === "Camera"
                              ).name
                          }
                          {/* Canon 7D Mark II */}
                        </Typography>
                      </Box>
                    </Box>
                    <Box style={{ display: "flex" }}>
                      <Box style={{ marginRight: 8 }}>
                        <CameraOutlinedIcon color="primary" />
                      </Box>
                      <Box>
                        <Typography variant="p">
                          {
                            arts
                              .find(
                                (art) => art.id === searchParams.get("image")
                              )
                              ?.info?.artBasics?.tools[0]?.find(
                                (tl) => tl.category.name === "Lens"
                              ).name
                          }
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box style={{ marginTop: 16 }}>
                    <Typography variant="h6">Categories</Typography>
                    {arts
                      .find((art) => art.id === searchParams.get("image"))
                      ?.info?.artBasics?.tags?.map((tag, index) => (
                        <Chip
                          label={tag}
                          variant="outlined"
                          style={{ marginBottom: "6px", marginRight: "2px" }}
                          key={index}
                        />
                      ))}
                  </Box>
                  <Box style={{ marginTop: 16 }}>
                    <Typography variant="h6">Comments</Typography>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box style={{ padding: 24 }}>
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h4">Edit Art</Typography>

                  <IconButton
                    color="primary"
                    onClick={() => setIsEditArt(false)}
                    style={{ marginLeft: "auto" }}
                  >
                    <ArrowCircleLeftOutlinedIcon fontSize="large" />
                  </IconButton>
                </Box>
                <Grid container spacing={1}>
                  <Paper
                    elevation={5}
                    style={{ padding: 24, marginTop: 14, width: "100%" }}
                  >
                    <Grid container spacing={1}>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={4}
                        xl={4}
                        style={{ textAlign: "center" }}
                      >
                        <Button component="label">
                          <img
                            src={assetArt}
                            srcSet={assetArt}
                            alt="image"
                            loading="lazy"
                            style={{
                              borderBottomLeftRadius: 4,
                              borderBottomRightRadius: 4,
                              display: "block",
                              width: "100%",
                              maxHeight: "232px",
                            }}
                          />
                          <input
                            type="file"
                            hidden
                            onChange={(event) => handleChange(event, false)}
                          />
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
                        <Box style={{ display: "flex" }}>
                          <Box style={{ width: "50%", marginRight: 4 }}>
                            <TextField
                              type="text"
                              label="Title"
                              variant="outlined"
                              required
                              fullWidth
                              style={{ marginBottom: 4 }}
                              value={artTitle}
                              onChange={(event) =>
                                setArtTitle(event.target.value)
                              }
                            />
                          </Box>
                          <Box style={{ width: "50%" }}>
                            <FormControl
                              style={{ marginBottom: 4 }}
                              required
                              fullWidth
                            >
                              <InputLabel id="type-label">Type</InputLabel>
                              <Select
                                labelId="type-label"
                                id="type-label-select"
                                value={artType}
                                onChange={(event) =>
                                  setArtType(event.target.value)
                                }
                                label="Type"
                              >
                                {artTypes.map((type) => (
                                  <MenuItem value={type.id} key={type.id}>
                                    {type.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Box>
                        </Box>
                        <Box style={{ display: "flex" }}>
                          <Box style={{ width: "50%", marginRight: 4 }}>
                            <FormControl
                              style={{ marginBottom: 4 }}
                              required
                              fullWidth
                            >
                              <InputLabel id="category-label">
                                Category
                              </InputLabel>
                              <Select
                                labelId="category-label"
                                id="category-select"
                                value={""}
                                label="Category"
                                value={artCategory}
                                onChange={(event) =>
                                  setArtCategory(event.target.value)
                                }
                              >
                                {categories.map((type) => (
                                  <MenuItem value={type.id} key={type.id}>
                                    {type.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Box>
                          <Box style={{ width: "50%" }}>
                            <TextField
                              type="text"
                              label="Location"
                              variant="outlined"
                              fullWidth
                              style={{ marginBottom: 4 }}
                            />
                          </Box>
                        </Box>
                        <Box style={{ display: "flex" }}>
                          <Box style={{ width: "50%", marginRight: 4 }}>
                            <FormControl style={{ marginBottom: 4 }} fullWidth>
                              <InputLabel id="camera-label">Camera</InputLabel>
                              <Select
                                labelId="camera-label"
                                id="category-select"
                                value={artCamera}
                                onChange={(event) =>
                                  setArtCamera(event.target.value)
                                }
                                label="Camera"
                              >
                                {artistTools.map(
                                  (art) =>
                                    tools.find((tl) => art.id === tl.id) &&
                                    art.category.name === "Camera" && (
                                      <MenuItem key={art.id} value={art.id}>
                                        {art.name}
                                      </MenuItem>
                                    )
                                )}
                              </Select>
                            </FormControl>
                          </Box>
                          <Box style={{ width: "50%" }}>
                            <FormControl style={{ marginBottom: 4 }} fullWidth>
                              <InputLabel id="lens-label">Lens</InputLabel>
                              <Select
                                labelId="lens-label"
                                id="lens-select"
                                value={lensArt}
                                onChange={(event) =>
                                  setLensArt(event.target.value)
                                }
                                label="Lens"
                              >
                                {artistTools.map(
                                  (art) =>
                                    tools.find((tl) => art.id === tl.id) &&
                                    art.category.name === "Lens" && (
                                      <MenuItem key={art.id} value={art.id}>
                                        {art.name}
                                      </MenuItem>
                                    )
                                )}
                              </Select>
                            </FormControl>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <FormControl style={{ marginBottom: 4 }} fullWidth>
                          <InputLabel id="gallery-label">Gallery</InputLabel>
                          <Select
                            labelId="gallery-label"
                            id="gallery-select"
                            value={galleryArt}
                            onChange={(event) =>
                              setGalleryArt(event.target.value)
                            }
                            label="Labels"
                          >
                            {galleries.map((gallery) => (
                              <MenuItem value={gallery.id} key={gallery.id}>
                                {gallery.info.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <TextField
                          type="text"
                          label="About the art"
                          variant="outlined"
                          fullWidth
                          style={{ marginBottom: 4 }}
                          multiline
                          rows={4}
                          value={aboutArt}
                          onChange={(event) => setAboutArt(event.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <TextField
                          placeholder="labels"
                          fullWidth
                          value={tagValue}
                          onChange={(event) => setTagValue(event.target.value)}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  color="primary"
                                  onClick={() => addTags(tagValue)}
                                >
                                  <AddBoxIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Box style={{ marginTop: "8px", padding: 8 }}>
                        {tagsArt.map((tg) => (
                          <Chip
                            key={tg}
                            label={tg}
                            variant="outlined"
                            style={{
                              marginBottom: "8px",
                              marginRight: "2px",
                            }}
                            onDelete={() =>
                              setTagsArt(tagsArt.filter((tag) => tag !== tg))
                            }
                          />
                        ))}
                      </Box>
                    </Grid>
                    <Box style={{ marginTop: 12 }}>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          onUpdateArt(
                            {
                              artBasics: {
                                artGalleries:
                                  galleryArt !== "" ? [`${galleryArt}`] : [],
                                artType: artTypes.find(
                                  (type) => type.id === artType
                                ),
                                title: artTitle,
                                about: aboutArt,
                                artCategory: categories.find(
                                  (cat) => cat.id === artCategory
                                ),
                                tags: tagsArt,
                                tools: [
                                  [
                                    tools.find((tl) => tl.id === artCamera),
                                    tools.find((tl) => tl.id === lensArt),
                                  ],
                                ],
                              },
                              artRequest: {
                                Put: {
                                  key: "lol",
                                  contentType: "image/jpeg",
                                  payload: {
                                    Payload: asset,
                                  },
                                  callback: [],
                                },
                              },
                            },
                            searchParams.get("image")
                          );
                          navigate("/main?page=profile");
                        }}
                      >
                        Update
                      </Button>
                    </Box>
                    <Box
                      style={{
                        marginTop: "32px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    ></Box>
                  </Paper>
                </Grid>
              </Box>
            )
          ) : searchParams.get("gallery") ? (
            <Box>
              <Box style={{ padding: 16 }}>
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    variant="h4"
                  >{`${
                    galleries.find(
                      (gallery) => gallery.id === searchParams.get("gallery")
                    )?.info?.name
                  }`}</Typography>

                  <IconButton
                    color="primary"
                    onClick={() => navigate("/main?page=profile")}
                    style={{ marginLeft: "auto" }}
                  >
                    <ArrowCircleLeftOutlinedIcon fontSize="large" />
                  </IconButton>
                </Box>
                <Masonry columns={3} spacing={0.2}>
                  {arts.map(
                    (item, index) =>
                      item.info.artBasics.artGalleries[0] ===
                        searchParams.get("gallery") && (
                        <div
                          key={index}
                          onClick={() =>
                            navigate("/main?page=profile&image=" + item.id)
                          }
                        >
                          <img
                            src={`${item.image}`}
                            srcSet={`${item.image}`}
                            alt={item.id}
                            loading="lazy"
                            style={{
                              borderBottomLeftRadius: 4,
                              borderBottomRightRadius: 4,
                              display: "block",
                              width: "100%",
                            }}
                          />
                        </div>
                      )
                  )}
                </Masonry>
              </Box>
            </Box>
          ) : showPrixerList ? (
            <>
              <Box style={{ padding: 16 }}>
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h4">Prixers</Typography>

                  <IconButton
                    color="primary"
                    onClick={() => setShowPrixerList(false)}
                    style={{ marginLeft: "auto" }}
                  >
                    <ArrowCircleLeftOutlinedIcon fontSize="large" />
                  </IconButton>
                </Box>
                <Grid container spacing={1}>
                  {[1, 2, 3, 4].map((item, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4} lg={4} xl={3}>
                      <Card>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="200"
                            image="https://i.pinimg.com/originals/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg?w=162&auto=format"
                            alt="prixer"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Gleiber Granado
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </>
          ) : isCreateArt ? (
            <Box style={{ padding: 24 }}>
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h4">Create Art</Typography>

                <IconButton
                  color="primary"
                  onClick={() => setIsCreateArt(false)}
                  style={{ marginLeft: "auto" }}
                >
                  <ArrowCircleLeftOutlinedIcon fontSize="large" />
                </IconButton>
              </Box>
              <Grid container spacing={1}>
                <Paper
                  elevation={5}
                  style={{ padding: 24, marginTop: 14, width: "100%" }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                      {assetArt ? (
                        <Button component="label">
                          <img
                            src={assetArt}
                            alt="image"
                            srcSet={`${assetArt}`}
                            loading="lazy"
                            style={{
                              borderBottomLeftRadius: 4,
                              borderBottomRightRadius: 4,
                              display: "block",
                              width: "100%",
                            }}
                          />
                          <input
                            type="file"
                            hidden
                            onChange={(event) => handleChange(event, false)}
                          />
                        </Button>
                      ) : (
                        <Button fullWidth component="label">
                          <AddPhotoAlternateIcon
                            style={{ height: 230, width: 80 }}
                          />
                          <input
                            type="file"
                            hidden
                            onChange={(event) => handleChange(event, false)}
                          />
                        </Button>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
                      <Box style={{ display: "flex" }}>
                        <Box style={{ width: "50%", marginRight: 4 }}>
                          <TextField
                            type="text"
                            label="Title"
                            variant="outlined"
                            required
                            fullWidth
                            style={{ marginBottom: 4 }}
                            value={artTitle}
                            onChange={(event) =>
                              setArtTitle(event.target.value)
                            }
                          />
                        </Box>
                        <Box style={{ width: "50%" }}>
                          <FormControl
                            style={{ marginBottom: 4 }}
                            required
                            fullWidth
                          >
                            <InputLabel id="type-label">Type</InputLabel>
                            <Select
                              labelId="type-label"
                              id="type-label-select"
                              value={artType}
                              onChange={(event) =>
                                setArtType(event.target.value)
                              }
                              label="Type"
                            >
                              {artTypes.map((type) => (
                                <MenuItem value={type.id} key={type.id}>
                                  {type.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Box>
                      <Box style={{ display: "flex" }}>
                        <Box style={{ width: "50%", marginRight: 4 }}>
                          <FormControl
                            style={{ marginBottom: 4 }}
                            required
                            fullWidth
                          >
                            <InputLabel id="category-label">
                              Category
                            </InputLabel>
                            <Select
                              labelId="category-label"
                              id="category-select"
                              value={""}
                              label="Category"
                              value={artCategory}
                              onChange={(event) =>
                                setArtCategory(event.target.value)
                              }
                            >
                              {categories.map((type) => (
                                <MenuItem value={type.id} key={type.id}>
                                  {type.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                        <Box style={{ width: "50%" }}>
                          <TextField
                            type="text"
                            label="Location"
                            variant="outlined"
                            fullWidth
                            style={{ marginBottom: 4 }}
                          />
                        </Box>
                      </Box>
                      <Box style={{ display: "flex" }}>
                        <Box style={{ width: "50%", marginRight: 4 }}>
                          <FormControl style={{ marginBottom: 4 }} fullWidth>
                            <InputLabel id="camera-label">Camera</InputLabel>
                            <Select
                              labelId="camera-label"
                              id="category-select"
                              value={artCamera}
                              onChange={(event) =>
                                setArtCamera(event.target.value)
                              }
                              label="Camera"
                            >
                              {artistTools.map(
                                (art) =>
                                  tools.find((tl) => art.id === tl.id) &&
                                  art.category.name === "Camera" && (
                                    <MenuItem key={art.id} value={art.id}>
                                      {art.name}
                                    </MenuItem>
                                  )
                              )}
                            </Select>
                          </FormControl>
                        </Box>
                        <Box style={{ width: "50%" }}>
                          <FormControl style={{ marginBottom: 4 }} fullWidth>
                            <InputLabel id="camera-label">Lens</InputLabel>
                            <Select
                              labelId="camera-label"
                              id="category-select"
                              value={lensArt}
                              onChange={(event) =>
                                setLensArt(event.target.value)
                              }
                              label="Lens"
                            >
                              {artistTools.map(
                                (art) =>
                                  tools.find((tl) => art.id === tl.id) &&
                                  art.category.name === "Lens" && (
                                    <MenuItem key={art.id} value={art.id}>
                                      {art.name}
                                    </MenuItem>
                                  )
                              )}
                            </Select>
                          </FormControl>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <FormControl style={{ marginBottom: 4 }} fullWidth>
                        <InputLabel id="gallery-label">Gallery</InputLabel>
                        <Select
                          labelId="gallery-label"
                          id="gallery-select"
                          value={galleryArt}
                          onChange={(event) =>
                            setGalleryArt(event.target.value)
                          }
                          label="Labels"
                        >
                          {galleries.map((gallery) => (
                            <MenuItem value={gallery.id}>
                              {gallery.info.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <TextField
                        type="text"
                        label="About the art"
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: 4 }}
                        multiline
                        rows={4}
                        value={aboutArt}
                        onChange={(event) => setAboutArt(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <TextField
                        placeholder="labels"
                        fullWidth
                        value={tagValue}
                        onChange={(event) => setTagValue(event.target.value)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => addTags(tagValue)}
                                color="primary"
                              >
                                <AddBoxIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Box style={{ marginTop: "8px", padding: 8 }}>
                      {tagsArt.map((tg) => (
                        <Chip
                          key={tg}
                          label={tg}
                          variant="outlined"
                          style={{
                            marginBottom: "8px",
                            marginRight: "2px",
                          }}
                          onDelete={() =>
                            setTagsArt(tagsArt.filter((tag) => tag !== tg))
                          }
                        />
                      ))}
                    </Box>
                  </Grid>
                  <Box style={{ marginTop: 12 }}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        onCreateArt({
                          artBasics: {
                            artGalleries:
                              galleryArt !== "" ? [`${galleryArt}`] : [],
                            artType: artTypes.find(
                              (type) => type.id === artType
                            ),
                            title: artTitle,
                            about: aboutArt,
                            artCategory: categories.find(
                              (cat) => cat.id === artCategory
                            ),
                            tags: tagsArt,
                            tools: [
                              [
                                tools.find((tl) => tl.id === artCamera),
                                tools.find((tl) => tl.id === lensArt),
                              ],
                            ],
                          },
                          artRequest: {
                            Put: {
                              key: "lol",
                              contentType: "image/jpeg",
                              payload: {
                                Payload: asset,
                              },
                              callback: [],
                            },
                          },
                        });
                        navigate("/main?page=profile");
                      }}
                    >
                      Create
                    </Button>
                  </Box>
                  <Box
                    style={{
                      marginTop: "32px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  ></Box>
                </Paper>
              </Grid>
            </Box>
          ) : isCreateGallery ? (
            <Box style={{ padding: 24 }}>
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h4">Create Gallery</Typography>

                <IconButton
                  color="primary"
                  onClick={() => setIsCrateGallery(false)}
                  style={{ marginLeft: "auto" }}
                >
                  <ArrowCircleLeftOutlinedIcon fontSize="large" />
                </IconButton>
              </Box>
              <Grid container spacing={1}>
                <Paper elevation={5} style={{ padding: 24, marginTop: 24 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <TextField
                        type="text"
                        label="title"
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: 4 }}
                        value={titleGallery}
                        onChange={(event) =>
                          setTitleGallery(event.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <TextField
                        type="text"
                        label="About the gallery"
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: 4 }}
                        multiline
                        rows={4}
                        value={aboutGallery}
                        onChange={(event) =>
                          setAboutGallery(event.target.value)
                        }
                      />
                    </Grid>
                  </Grid>
                  <Box style={{ marginTop: 12 }}>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        onCreateGallery({
                          artGalleryBanner: [],
                          description: aboutGallery,
                          name: titleGallery,
                        })
                      }
                    >
                      Create
                    </Button>
                  </Box>
                  <Box
                    style={{
                      marginTop: "32px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  ></Box>
                </Paper>
              </Grid>
            </Box>
          ) : (
            <>
              <div
                style={{
                  height: 100,
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1643041447984-ff891bdf0815?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0NTM4NTM1NA&ixlib=rb-1.2.1&q=80&w=1080')",
                  backgroundSize: "cover",
                }}
              />
              <Box>
                <Paper
                  elevation={3}
                  style={{
                    marginTop: -30,
                    marginLeft: !mobileBreakpoint ? 16 : "auto",
                    marginRight: !mobileBreakpoint ? 16 : "auto",
                    padding: 8,
                    maxWidth: mobileBreakpoint && 600,
                  }}
                >
                  <Box style={{ display: "flex", alignItems: "center" }}>
                    <Box style={{ marginRight: "12px" }}>
                      {!isShowToolsInfo && (
                        <Avatar
                          src={avatar && avatar}
                          style={{ width: 48, height: 48 }}
                        />
                      )}
                    </Box>
                    <Box>
                      <Box>
                        <Typography variant="body1">
                          {isShowToolsInfo ? (
                            <Box
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <CameraAltIcon
                                fontFamily="small"
                                color="primary"
                              />{" "}
                              {`${currentTools?.camera?.name}`}
                            </Box>
                          ) : (
                            `${currentProfile.givenName[0]} ${currentProfile.familyName[0]}`
                          )}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2">
                          {isShowToolsInfo ? (
                            <Box
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <CameraIcon fontFamily="small" color="primary" />
                              {`${currentTools?.lens?.name}`}
                            </Box>
                          ) : (
                            `${currentProfile.displayName[0]}`
                          )}
                        </Typography>
                      </Box>
                      {!isShowToolsInfo && (
                        <Box>
                          <Typography variant="body2">
                            {`${currentProfile.about[0]}`}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Box style={{ marginLeft: "auto" }}>
                      <Box style={{ display: "flex" }}>
                        <Box>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => setIsShowToolsInfo(!isShowToolsInfo)}
                          >
                            {isShowToolsInfo ? (
                              <AccountCircleIcon
                                fontFamily="small"
                                color="primary"
                              />
                            ) : (
                              <CameraAltIcon
                                fontFamily="small"
                                color="primary"
                              />
                            )}
                          </IconButton>
                        </Box>
                        <Box>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() =>
                              navigate("/main?page=profile&isEdit=true")
                            }
                          >
                            <EditIcon fontFamily="small" color="primary" />
                          </IconButton>
                        </Box>
                      </Box>
                      <Box style={{ display: "flex", justifyContent: "end" }}>
                        <IconButton
                          size="small"
                          color="primary"
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={handleClick}
                        >
                          <MoreHorizIcon color="primary" fontFamily="small" />
                        </IconButton>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={() => setAnchorEl(null)}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem
                            style={{ color: "red" }}
                            onClick={() => deleteProfile()}
                          >
                            Delete profile
                          </MenuItem>
                        </Menu>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
                <Box
                  style={{
                    marginTop: 16,
                    display: "flex",
                    marginLeft: !mobileBreakpoint ? 16 : "auto",
                    marginRight: !mobileBreakpoint ? 16 : "auto",
                    maxWidth: mobileBreakpoint && 750,
                  }}
                >
                  <Box style={{ width: "50%", marginRight: "16px" }}>
                    <Button
                      style={{
                        textTransform: "capitalize",
                        background: !isArtSelected && "white",
                        color: !isArtSelected && "#000000",
                      }}
                      variant="contained"
                      fullWidth
                      onClick={() => setIsArtSelected(true)}
                    >
                      Art
                    </Button>
                  </Box>
                  <Box style={{ width: "50%" }}>
                    <Button
                      variant="contained"
                      fullWidth
                      style={{
                        textTransform: "capitalize",
                        background: isArtSelected && "white",
                        color: isArtSelected && "#000000",
                      }}
                      onClick={() => setIsArtSelected(false)}
                    >
                      Gallery
                    </Button>
                  </Box>
                </Box>
                <Box style={{ padding: 16, paddingBottom: 72 }}>
                  {isArtSelected ? (
                    <Masonry columns={3} spacing={0.2}>
                      {arts.map((item, index) => (
                        <div
                          key={index}
                          onClick={() =>
                            navigate("/main?page=profile&image=" + item.id)
                          }
                        >
                          <img
                            src={`${item.image}`}
                            srcSet={`${item.image}`}
                            alt={item.id}
                            loading="lazy"
                            style={{
                              borderBottomLeftRadius: 4,
                              borderBottomRightRadius: 4,
                              display: "block",
                              width: "100%",
                            }}
                          />
                        </div>
                      ))}
                    </Masonry>
                  ) : (
                    <Grid container spacing={1}>
                      {galleries?.map((item, index) => (
                        <Grid
                          key={index}
                          item
                          xs={12}
                          sm={4}
                          md={4}
                          lg={4}
                          xl={3}
                        >
                          <Card
                            onClick={() =>
                              navigate(`/main?page=profile&gallery=${item.id}`)
                            }
                          >
                            <CardMedia
                              component="img"
                              height="180"
                              image={
                                item.image
                                  ? item.image.image
                                  : "https://images.unsplash.com/photo-1643310638896-b73dd89c4597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0NTQwNjY0MA&ixlib=rb-1.2.1&q=80&w=1080"
                              }
                              alt="image"
                            />
                            <CardContent>
                              <Box
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Box
                                  style={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                  >
                                    {item.info.name}
                                  </Typography>
                                </Box>
                                <Box style={{ marginLeft: "auto" }}>
                                  <IconButton
                                    color="primary"
                                    onClick={() => deleteGallery(item.id)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Box>
                              </Box>

                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {item.info.description}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Box>
                {!mobileBreakpoint ? (
                  <Paper
                    elevation={5}
                    style={{
                      height: 60,
                      backgroundColor: "#FFFFFF",
                      width: "100%",
                      bottom: 0,
                      position: "fixed",
                      display: "flex",
                      alignItems: "center",
                      // padding: 16,
                    }}
                  >
                    <Box style={{ width: "20%", textAlign: "center" }}>
                      <IconButton color="primary">
                        <HomeIcon fontSize="large" />
                      </IconButton>
                    </Box>
                    <Box style={{ width: "20%", textAlign: "center" }}>
                      <IconButton
                        color="primary"
                        // onClick={() => setShowPrixerList(true)}
                      >
                        <Typography
                          style={{
                            fontSize: 32,

                            fontWeight: "bold",
                          }}
                        >
                          P
                        </Typography>
                      </IconButton>
                    </Box>
                    <Box
                      style={{
                        width: "20%",
                        textAlign: "center",
                        marginTop: -45,
                      }}
                    >
                      <Fab
                        color="primary"
                        id="basic-button"
                        aria-controls={openCreation ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={openCreation ? "true" : undefined}
                        onClick={handleClickCreation}
                      >
                        <AddIcon />
                      </Fab>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorElCreation}
                        open={openCreation}
                        onClose={() => setAnchorElCreation(null)}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem
                          onClick={() => {
                            setIsCreateArt(true);
                            setAnchorElCreation(null);
                          }}
                        >
                          Create Art
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setIsCrateGallery(true);
                            setAnchorElCreation(null);
                          }}
                        >
                          Create Gallery
                        </MenuItem>
                      </Menu>
                    </Box>
                    <Box style={{ width: "20%", textAlign: "center" }}>
                      <IconButton color="primary">
                        <LocalFireDepartmentIcon fontSize="large" />
                      </IconButton>
                    </Box>
                    <Box style={{ width: "20%", textAlign: "center" }}>
                      <IconButton color="primary">
                        <AccountCircleIcon fontSize="large" />
                      </IconButton>
                    </Box>
                  </Paper>
                ) : (
                  <>
                    <Fab
                      color="primary"
                      id="basic-button"
                      aria-controls={openCreation ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openCreation ? "true" : undefined}
                      onClick={handleClickCreation}
                      style={{ position: "fixed", bottom: 16, right: 16 }}
                    >
                      <AddIcon />
                    </Fab>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorElCreation}
                      open={openCreation}
                      onClose={() => setAnchorElCreation(null)}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          setIsCreateArt(true);
                          setAnchorElCreation(null);
                        }}
                      >
                        Create Art
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setIsCrateGallery(true);
                          setAnchorElCreation(null);
                        }}
                      >
                        Create Gallery
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </Box>
            </>
          )
        ) : (
          <Box style={{ padding: "32px" }}>
            <Typography variant="h5">Add your 1st art</Typography>
            <Paper elevation={5} style={{ padding: 24, marginTop: 8 }}>
              <Grid container spacing={1}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={4}
                  style={{ textAlign: "center" }}
                >
                  {assetArt ? (
                    <Button component="label">
                      <img
                        src={assetArt}
                        alt="image"
                        srcSet={`${assetArt}`}
                        loading="lazy"
                        style={{
                          borderBottomLeftRadius: 4,
                          borderBottomRightRadius: 4,
                          display: "block",
                          maxHeight: "232px",
                          width: "100%",
                        }}
                      />
                      <input
                        type="file"
                        hidden
                        onChange={(event) => handleChange(event, false)}
                      />
                    </Button>
                  ) : (
                    <Button fullWidth component="label">
                      <AddPhotoAlternateIcon
                        style={{ height: 230, width: 80 }}
                      />
                      <input
                        type="file"
                        hidden
                        onChange={(event) => handleChange(event, false)}
                      />
                    </Button>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
                  <Box style={{ display: "flex" }}>
                    <Box style={{ width: "50%", marginRight: 4 }}>
                      <TextField
                        type="text"
                        label="Title"
                        variant="outlined"
                        required
                        fullWidth
                        value={artTitle}
                        onChange={(event) => setArtTitle(event.target.value)}
                        style={{ marginBottom: 4 }}
                      />
                    </Box>
                    <Box style={{ width: "50%" }}>
                      <FormControl
                        style={{ marginBottom: 4 }}
                        required
                        fullWidth
                      >
                        <InputLabel id="type-label">Type</InputLabel>
                        <Select
                          labelId="type-label"
                          id="type-label-select"
                          value={artType}
                          onChange={(event) => setArtType(event.target.value)}
                          label="Type"
                        >
                          {artTypes.map((type) => (
                            <MenuItem value={type.id} key={type.id}>
                              {type.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                  <Box style={{ display: "flex" }}>
                    <Box style={{ width: "50%", marginRight: 4 }}>
                      <FormControl
                        style={{ marginBottom: 4 }}
                        required
                        fullWidth
                      >
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                          labelId="category-label"
                          id="category-select"
                          value={""}
                          label="Category"
                          value={artCategory}
                          onChange={(event) =>
                            setArtCategory(event.target.value)
                          }
                        >
                          {categories.map((type) => (
                            <MenuItem value={type.id} key={type.id}>
                              {type.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box style={{ width: "50%" }}>
                      <TextField
                        type="text"
                        label="Location"
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: 4 }}
                      />
                    </Box>
                  </Box>
                  <Box style={{ display: "flex" }}>
                    <Box style={{ width: "50%", marginRight: 4 }}>
                      <FormControl style={{ marginBottom: 4 }} fullWidth>
                        <InputLabel id="camera-label">Camera</InputLabel>
                        <Select
                          labelId="camera-label"
                          id="category-select"
                          value={artCamera}
                          onChange={(event) => setArtCamera(event.target.value)}
                          label="Camera"
                        >
                          {artistTools.map(
                            (art) =>
                              tools.find((tl) => art.id === tl.id) &&
                              art.category.name === "Camera" && (
                                <MenuItem key={art.id} value={art.id}>
                                  {art.name}
                                </MenuItem>
                              )
                          )}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box style={{ width: "50%" }}>
                      <FormControl style={{ marginBottom: 8 }} fullWidth>
                        <InputLabel id="lens-label">Lens</InputLabel>
                        <Select
                          labelId="lens-label"
                          id="lens-select"
                          value={lensArt}
                          onChange={(event) => setLensArt(event.target.value)}
                          label="Lens"
                        >
                          {artistTools.map(
                            (art) =>
                              tools.find((tl) => art.id === tl.id) &&
                              art.category.name === "Lens" && (
                                <MenuItem key={art.id} value={art.id}>
                                  {art.name}
                                </MenuItem>
                              )
                          )}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <TextField
                    type="text"
                    label="About the art"
                    variant="outlined"
                    fullWidth
                    style={{ marginBottom: 4 }}
                    multiline
                    rows={4}
                    value={aboutArt}
                    onChange={(event) => setAboutArt(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <TextField
                    placeholder="labels"
                    fullWidth
                    value={tagValue}
                    onChange={(event) => setTagValue(event.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            color="primary"
                            onClick={() => addTags(tagValue)}
                          >
                            <AddBoxIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Box style={{ marginTop: "8px", padding: 8 }}>
                  {tagsArt.map((tg) => (
                    <Chip
                      key={tg}
                      label={tg}
                      variant="outlined"
                      style={{
                        marginBottom: "8px",
                        marginRight: "2px",
                      }}
                      onDelete={() =>
                        setTagsArt(tagsArt.filter((tag) => tag !== tg))
                      }
                    />
                  ))}
                </Box>
              </Grid>
              <Box style={{ marginTop: 12 }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    onCreateArt({
                      artBasics: {
                        artGalleries: [],
                        artType: artTypes.find((type) => type.id === artType),
                        title: artTitle,
                        about: aboutArt,
                        artCategory: categories.find(
                          (cat) => cat.id === artCategory
                        ),
                        tags: tagsArt,
                        tools: [
                          [
                            tools.find((tl) => tl.id === artCamera),
                            tools.find((tl) => tl.id === lensArt),
                          ],
                        ],
                      },
                      artRequest: {
                        Put: {
                          key: "lol",
                          contentType: "image/jpeg",
                          payload: {
                            Payload: asset,
                          },
                          callback: [],
                        },
                      },
                    });
                    navigate("/main?page=profile");
                    localStorage.setItem("isArtDone", true);
                  }}
                >
                  Create
                </Button>
              </Box>
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
                  }}
                  // onClick={() => onHandleScreem(false)}
                  fullWidth
                >
                  Add another
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  style={{
                    textTransform: "capitalize",
                    fontSize: "12px",
                    background: "white",
                    color: "black",
                  }}
                  onClick={() => {
                    localStorage.setItem("isArtDone", true);
                    navigate("/main?page=profile");
                  }}
                >
                  Go to profile
                </Button>
              </Box>
            </Paper>
          </Box>
        )}
      </Box>
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

  async function handleChange(e, isAvatar) {
    const file = e.target.files[0];
    const resizedString = await convertToBase64(file);
    const data = [...new Uint8Array(await file.arrayBuffer())];
    if (isAvatar) setAvatar(resizedString);
    else setAssetArt(resizedString);
    setAsset(data);
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

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClickCreation(event) {
    setAnchorElCreation(event.currentTarget);
  }

  function onLogout() {
    localStorage.clear();
    navigate("/login");
  }

  async function onUpdateProfile(profileData, tools) {
    setIsLoading(true);
    const update = await service.updateProfile(profileData);
    await service.updateArtist(tools.tools);
    setIsLoading(false);
    if (Object.keys(update)[0] !== "err") {
      setIsSnackbarOpen(true);
      setMessage("Profile updated successfully");
      setSeverity("success");
    } else {
      setIsSnackbarOpen(true);
      setMessage("Error updating profile");
      setSeverity("error");
    }

    setAsset(undefined);
  }

  async function onCreateArt(artUpdate) {
    setIsLoading(true);
    const create = await service.createArt(artUpdate);
    setAsset(undefined);
    if (Object.keys(create)[0] !== "err") {
      const arts = await getArtsPrincipal();
      const formatArts = arts.ok.map((result) => ({
        image: "data:image/jpeg;base64," + encode(result[2].payload[0]),
        id: result[0],
        info: result[1],
      }));
      setArts(formatArts);
      const artGallery = await service.getGalleriesByPrincipal(
        JSON.parse(localStorage.getItem("_scApp")).principal
      );
      setGalleries(
        artGallery.ok.map((result) => ({
          image: formatArts.find(
            (art) => art.info.artBasics.artGalleries[0] === result[0]
          ),
          id: result[0],
          info: result[1],
        }))
      );
      setIsCreateArt(false);
      setIsLoading(false);
      setIsSnackbarOpen(true);
      setMessage("Art created correctly");
      setSeverity("success");
      setArtTitle("");
      setArtType("");
      setArtCategory("");
      setAboutArt("");
      setArtCamera("");
      setLensArt("");
      setTagsArt([]);
      setAssetArt(undefined);
    } else {
      setIsCreateArt(false);
      setIsLoading(false);
      setIsSnackbarOpen(true);
      setMessage("Error al crear arte");
      setSeverity("error");
    }
  }

  async function onUpdateArt(artUpdate, id) {
    setIsLoading(true);
    const updated = await service.updateArt(artUpdate, id);
    setAsset(undefined);
    if (Object.keys(updated)[0] !== "err") {
      const arts = await getArtsPrincipal();
      const formatArts = arts.ok.map((result) => ({
        image: "data:image/jpeg;base64," + encode(result[2].payload[0]),
        id: result[0],
        info: result[1],
      }));
      setArts(formatArts);
      const artGallery = await service.getGalleriesByPrincipal(
        JSON.parse(localStorage.getItem("_scApp")).principal
      );
      setGalleries(
        artGallery.ok.map((result) => ({
          image: formatArts.find(
            (art) => art.info.artBasics.artGalleries[0] === result[0]
          ),
          id: result[0],
          info: result[1],
        }))
      );
      setIsCreateArt(false);
      setIsLoading(false);
      setIsSnackbarOpen(true);
      setMessage("art updated successfully");
      setSeverity("success");
      setArtTitle("");
      setArtType("");
      setArtCategory("");
      setAboutArt("");
      setArtCamera("");
      setLensArt("");
      setTagsArt([]);
      setAssetArt(undefined);
      setIsEditArt(false);
    } else {
      setIsCreateArt(false);
      setIsLoading(false);
      setIsSnackbarOpen(true);
      setMessage("Error updating art");
      setSeverity("error");
      setIsEditArt(false);
    }
  }

  async function getArtsPrincipal() {
    return await service.getArtsByPrincipal(
      JSON.parse(localStorage.getItem("_scApp")).principal
    );
  }

  async function deleteProfile() {
    setIsLoading(true);
    await service.deleteProfile(
      JSON.parse(localStorage.getItem("_scApp")).principal
    );
    localStorage.clear();
    navigate("/login");
  }

  async function deleteArt(id) {
    setIsLoading(true);
    await service.deleteArt(id);
    const artGallery = await service.getGalleriesByPrincipal(
      JSON.parse(localStorage.getItem("_scApp")).principal
    );
    const arts = await getArtsPrincipal();

    const formatArts = arts.ok.map((result) => ({
      image: "data:image/jpeg;base64," + encode(result[2].payload[0]),
      id: result[0],
      info: result[1],
    }));
    setArts(formatArts);

    setGalleries(
      artGallery.ok.map((result) => {
        return {
          image: formatArts.find(
            (art) => art.info.artBasics.artGalleries[0] === result[0]
          ),
          id: result[0],
          info: result[1],
        };
      })
    );
    setIsLoading(false);
    navigate("/main?page=profile");
    setIsSnackbarOpen(true);
    setMessage("Art removed successfully");
    setSeverity("success");
  }

  async function deleteGallery(id) {
    setIsLoading(true);
    await service.deleteGallery(id);
    const artGallery = await service.getGalleriesByPrincipal(
      JSON.parse(localStorage.getItem("_scApp")).principal
    );

    setGalleries(
      artGallery.ok.map((result) => {
        return {
          image: arts.find(
            (art) => art.info.artBasics.artGalleries[0] === result[0]
          ),
          id: result[0],
          info: result[1],
        };
      })
    );
    setIsLoading(false);
    navigate("/main?page=profile");
    setIsSnackbarOpen(true);
    setMessage("Gallery deleted successfully");
    setSeverity("success");
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

  function addTags(currentTag) {
    if (tagsArt.find((tag) => tag === currentTag)) {
      setIsSnackbarOpen(true);
      setSeverity("error");
      setMessage("Item already exist");
    } else {
      setTagsArt([...tagsArt, currentTag]);
      setTagValue("");
    }
  }

  async function onCreateGallery(galleryUpdate) {
    setIsLoading(true);
    const create = await service.createArtGallery(galleryUpdate);

    if (Object.keys(create)[0] !== "err") {
      const artGallery = await service.getGalleriesByPrincipal(
        JSON.parse(localStorage.getItem("_scApp")).principal
      );
      setGalleries(
        artGallery.ok.map((result) => {
          return {
            image: arts.find(
              (art) => art.info.artBasics.artGalleries[0] === result[0]
            ),
            id: result[0],
            info: result[1],
          };
        })
      );
      setIsCreateArt(false);
      setIsLoading(false);
      setIsSnackbarOpen(true);
      setMessage("Gallery created successfully");
      setSeverity("success");
      setIsCrateGallery(false);
      setTitleGallery("");
      setAboutGallery("");
    } else {
      setIsCreateArt(false);
      setIsLoading(false);
      setIsSnackbarOpen(true);
      setMessage("Error creating gallery");
      setSeverity("error");
    }
  }
}

export default Main;
