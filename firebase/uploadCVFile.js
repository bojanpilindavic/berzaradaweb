import { Platform } from "react-native";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";

const getSafeFileName = (name = "cv") => {
  return name.replace(/[^\w.\-]+/g, "_");
};

const dataUrlToBlob = async (dataUrl) => {
  const response = await fetch(dataUrl);
  return await response.blob();
};

export const uploadCVFile = async (uid, file) => {
  if (!uid) {
    throw new Error("Korisnik nije prijavljen.");
  }

  if (!file) {
    throw new Error("CV nije odabran.");
  }

  const originalName = file.name || "cv_file.pdf";
  const safeName = getSafeFileName(originalName);
  const finalName = `${Date.now()}_${safeName}`;
  const storagePath = `cvFiles/${uid}/${finalName}`;
  const storageRef = ref(storage, storagePath);

  let fileToUpload;
  let contentType = file.mimeType || file.type || "application/octet-stream";

  if (Platform.OS === "web") {
    if (file.file instanceof File) {
      fileToUpload = file.file;
      contentType = file.file.type || contentType;
    } else if (file.uri && file.uri.startsWith("data:")) {
      fileToUpload = await dataUrlToBlob(file.uri);
    } else {
      throw new Error("Web CV fajl nije u ispravnom formatu.");
    }
  } else {
    if (!file.uri) {
      throw new Error("CV fajl nema validan uri.");
    }
    const response = await fetch(file.uri);
    fileToUpload = await response.blob();
  }

  await uploadBytes(storageRef, fileToUpload, { contentType });

  const downloadURL = await getDownloadURL(storageRef);

  return {
    fileName: originalName,
    downloadURL,
    storagePath,
  };
};
