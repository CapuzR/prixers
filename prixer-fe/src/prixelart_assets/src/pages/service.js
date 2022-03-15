import { StoicIdentity } from "ic-stoic-identity";
import { createActor as wPCreateActor } from "../../../declarations/prixelart";
import { createActor as wPCreateActorPrixer } from "../../../declarations/prixelartbe";
import { Principal } from "@dfinity/principal";

const service = {
  onSignOutStoic,
  onSignInStoic,
  wPActor,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  createArt,
  deleteArt,
  getArtsByPrincipal,
  getGalleriesByPrincipal,
  createArtGallery,
  deleteGallery,
  createArtist,
  getArtist,
  readAllArtTypes,
  readAllArtCategories,
  createTool,
  getToolsCategories,
  getTools,
  updateArtist,
  updateArt,
};

export default service;

async function onSignInStoic() {
  const identity = await StoicIdentity.load();
  if (identity !== false) {
    return identity;
  } else {
    const identity = await StoicIdentity.connect();
    return identity;
  }
}

async function onSignOutStoic() {
  const identity = await StoicIdentity.load();
  if (identity !== false) {
    StoicIdentity.disconnect();
    return true;
  } else {
    return false;
  }
}

async function wPActor(identity) {
  return await wPCreateActor("rkp4c-7iaaa-aaaaa-aaaca-cai", {
    agentOptions: {
      identity: identity,
    },
  });
}

async function wPActorPrixer(identity) {
  return await wPCreateActorPrixer("rrkah-fqaaa-aaaaa-aaaaq-cai", {
    agentOptions: {
      identity: identity,
    },
  });
}

async function getProfile() {
  const identity = await onSignInStoic();
  const actor = await wPActor(identity);
  return await actor.readProfile();
}

async function createProfile(profileData) {
  const identity = await onSignInStoic();
  const actor = await wPActor(identity);
  const result = await actor.createProfile(profileData);
  if (result.ok) {
    return true;
  } else {
    return false;
  }
}

async function updateProfile(profileData) {
  const identity = await onSignInStoic();
  const actor = await wPActor(identity);

  const result = await actor.updateProfile(profileData);
  return result;
}

async function deleteProfile(key) {
  const identity = await onSignInStoic();
  const actor = await wPActor(identity);

  return await actor.deleteProfile({
    Remove: {
      key: key,
      callback: [],
    },
  });
}

async function createArt(artUpdate) {
  const identity = await onSignInStoic();
  const actor = await wPActorPrixer(identity);
  const result = await actor.createArt(artUpdate);
  return result;
}

async function getArtsByPrincipal(principal) {
  const identity = await onSignInStoic();
  const actor = await wPActorPrixer(identity);
  const result = await actor.readArtsByArtist(Principal.fromText(principal));
  return result;
}

async function deleteArt(id) {
  const identity = await onSignInStoic();
  const actor = await wPActorPrixer(identity);

  return await actor.deleteArt(id);
}

async function deleteGallery(id) {
  const identity = await onSignInStoic();
  const actor = await wPActorPrixer(identity);

  return await actor.deleteArtGallery(id);
}

async function getToolsByPrincipal(principal) {
  const identity = await onSignInStoic();
  const actor = await wPActorPrixer(identity);
  const result = await actor.readArtsByArtist(Principal.fromText(principal));
  return result;
}

async function createArtGallery(ArtGalleryUpdate) {
  const identity = await onSignInStoic();
  const actor = await wPActorPrixer(identity);
  const result = await actor.createArtGallery(ArtGalleryUpdate);
  return result;
}

async function getGalleriesByPrincipal(principal) {
  const identity = await onSignInStoic();
  const actor = await wPActorPrixer(identity);
  const result = await actor.readArtGalleriesByArtist(
    Principal.fromText(principal)
  );
  return result;
}

async function createArtist(tools) {
  const identity = await onSignInStoic();
  const actor = await wPActorPrixer(identity);
  const result = await actor.createArtist(tools);
  return result;
}

async function getArtist() {
  const identity = await onSignInStoic();
  const actor = await wPActorPrixer(identity);
  const result = await actor.readArtist();
  return result;
}

async function readAllArtTypes() {
  const identity = await onSignInStoic();
  const actor = await wPActorPrixer(identity);
  const result = await actor.readAllArtTypes();
  return result;
}

async function readAllArtCategories() {
  const identity = await onSignInStoic();
  const actor = await wPActorPrixer(identity);
  const result = await actor.readAllArtCategories();
  return result;
}

async function createTool(tool) {
  const identity = await onSignInStoic();
  const actor = await wPActorPrixer(identity);
  const result = await actor.createTool(tool);
  return result;
}

async function getToolsCategories() {
  const identity = await onSignInStoic();
  const actor = await wPActorPrixer(identity);
  const result = await actor.readAllToolCategories();
  return result;
}

async function getTools() {
  const identity = await onSignInStoic();
  const actor = await wPActorPrixer(identity);
  const result = await actor.readAllTools();
  return result;
}

async function updateArtist(tools) {
  const identity = await onSignInStoic();
  const actor = await wPActorPrixer(identity);
  const result = await actor.updateArtist(tools);
  return result;
}

async function updateArt(artUpdate, id) {
  const identity = await onSignInStoic();
  const actor = await wPActorPrixer(identity);
  const result = await actor.updateArt(artUpdate, id);
  return result;
}
