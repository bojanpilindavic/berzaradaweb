import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const saveUserToFirestore = async (
  uid,
  userType,
  data,
  imageURL = null
) => {
  if (!uid) {
    throw new Error("Nedostaje uid za upis korisnika u Firestore.");
  }

  const userData = {
    uid,
    userType,
    email: (data?.email || "").trim(),
    imageURL: imageURL || null,
    dateCreated: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  if (userType === "worker") {
    userData.fullName = (data?.fullName || "").trim();
    userData.municipality = data?.municipality || "";
  } else if (userType === "employer") {
    userData.companyName = (data?.companyName || "").trim();
    userData.jib = (data?.jib || "").trim();
    userData.activity = (data?.activity || "").trim();
    userData.municipality = data?.municipality || "";
  }

  try {
    await setDoc(doc(db, "users", uid), userData, { merge: true });
    console.log("✅ Korisnik uspešno sačuvan u Firestore");
  } catch (error) {
    console.error("❌ Greška prilikom snimanja korisnika:", error);
    throw error;
  }
};
