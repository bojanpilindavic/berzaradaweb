import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "./firebaseConfig";

const getFileExtension = (file) => {
  if (file?.name && file.name.includes(".")) {
    return file.name.split(".").pop().toLowerCase();
  }

  if (file?.type && file.type.includes("/")) {
    return file.type.split("/")[1].toLowerCase();
  }

  return "jpg";
};

export const uploadUserProfileImage = async (uid, file) => {
  if (!uid) {
    throw new Error("Korisnik nije prijavljen.");
  }

  if (!file) {
    throw new Error("Fajl nije odabran.");
  }

  if (!file.type || !file.type.startsWith("image/")) {
    throw new Error("Odabrani fajl nije slika.");
  }

  const ext = getFileExtension(file);
  const fileName = `profile_${Date.now()}.${ext}`;
  const storageRef = ref(storage, `profileImages/${uid}/${fileName}`);

  await uploadBytes(storageRef, file);

  const imageURL = await getDownloadURL(storageRef);

  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    imageURL,
  });

  return imageURL;
};
