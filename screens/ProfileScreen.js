import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
  ActivityIndicator,
  View,
  Image,
} from "react-native";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import DropdownMunicipality from "../components/DropdownMunicipality";
import { uploadUserProfileImage } from "../firebase/uploadUserProfileImage";

const ProfileScreen = () => {
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;
  const fileInputRef = useRef(null);

  const [userData, setUserData] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [editing, setEditing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const showMessage = (title, message) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setLoadingProfile(false);
        return;
      }

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setEditedData(data);
        } else {
          showMessage("Greška", "Podaci o korisniku nisu pronađeni.");
        }
      } catch (error) {
        console.error("Greška pri dohvaćanju podataka:", error);
        showMessage("Greška", "Nije moguće dohvatiti podatke o korisniku.");
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchUserData();
  }, [user, db]);

  const handleWebButtonClick = () => {
    if (!user) {
      showMessage("Greška", "Niste prijavljeni.");
      return;
    }

    if (uploadingImage) return;

    if (Platform.OS === "web" && fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleWebFileChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!user) {
      showMessage("Greška", "Niste prijavljeni.");
      return;
    }

    try {
      setUploadingImage(true);

      const imageURL = await uploadUserProfileImage(user.uid, file);

      setUserData((prev) => ({
        ...prev,
        imageURL,
      }));

      setEditedData((prev) => ({
        ...prev,
        imageURL,
      }));

      showMessage("Uspeh", "Slika profila je uspešno sačuvana.");
    } catch (error) {
      console.error("Greška pri uploadu slike:", error);
      showMessage(
        "Greška",
        error?.message || "Došlo je do greške prilikom snimanja slike."
      );
    } finally {
      if (event?.target) {
        event.target.value = "";
      }
      setUploadingImage(false);
    }
  };

  const handleSaveChanges = async () => {
    if (!user) {
      showMessage("Greška", "Niste prijavljeni.");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, editedData);

      setUserData((prev) => ({ ...prev, ...editedData }));
      setEditing(false);

      showMessage("Uspeh", "Podaci su uspešno ažurirani.");
    } catch (error) {
      console.error("Greška pri ažuriranju profila:", error);
      showMessage("Greška", "Došlo je do greške prilikom čuvanja promena.");
    }
  };

  if (loadingProfile) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5B8DB8" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.emptyText}>Podaci o profilu nisu dostupni.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>👤 Moj profil</Text>

      {userData.imageURL ? (
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: userData.imageURL }}
            style={styles.profileImage}
          />
        </View>
      ) : null}

      {Platform.OS === "web" ? (
        <>
          <TouchableOpacity
            onPress={handleWebButtonClick}
            style={styles.logoButton}
            activeOpacity={0.85}
            disabled={uploadingImage}
          >
            {uploadingImage ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.logoButtonText}>
                {userData.imageURL
                  ? "Promijeni logo / sliku"
                  : "Dodaj logo / sliku"}
              </Text>
            )}
          </TouchableOpacity>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleWebFileChange}
            style={{ display: "none" }}
          />
        </>
      ) : null}

      <Text style={styles.label}>Email</Text>
      <Text style={styles.valueBox}>{userData.email}</Text>

      {userData.userType === "worker" ? (
        <>
          <Text style={styles.label}>Ime i prezime</Text>
          {editing ? (
            <TextInput
              value={editedData.fullName ?? ""}
              onChangeText={(text) =>
                setEditedData({ ...editedData, fullName: text })
              }
              style={styles.input}
            />
          ) : (
            <Text style={styles.valueBox}>{userData.fullName}</Text>
          )}

          <Text style={styles.label}>Opština</Text>
          {editing ? (
            <DropdownMunicipality
              selected={editedData.municipality ?? ""}
              onSelect={(opstina) =>
                setEditedData({ ...editedData, municipality: opstina })
              }
            />
          ) : (
            <Text style={styles.valueBox}>{userData.municipality}</Text>
          )}
        </>
      ) : (
        <>
          <Text style={styles.label}>Naziv firme</Text>
          {editing ? (
            <TextInput
              value={editedData.companyName ?? ""}
              onChangeText={(text) =>
                setEditedData({ ...editedData, companyName: text })
              }
              style={styles.input}
            />
          ) : (
            <Text style={styles.valueBox}>{userData.companyName}</Text>
          )}

          <Text style={styles.label}>JIB</Text>
          {editing ? (
            <TextInput
              value={editedData.jib ?? ""}
              onChangeText={(text) =>
                setEditedData({ ...editedData, jib: text })
              }
              style={styles.input}
            />
          ) : (
            <Text style={styles.valueBox}>{userData.jib}</Text>
          )}

          <Text style={styles.label}>Delatnost</Text>
          {editing ? (
            <TextInput
              value={editedData.activity ?? ""}
              onChangeText={(text) =>
                setEditedData({ ...editedData, activity: text })
              }
              style={styles.input}
            />
          ) : (
            <Text style={styles.valueBox}>{userData.activity}</Text>
          )}

          <Text style={styles.label}>Opština</Text>
          {editing ? (
            <DropdownMunicipality
              selected={editedData.municipality ?? ""}
              onSelect={(opstina) =>
                setEditedData({ ...editedData, municipality: opstina })
              }
            />
          ) : (
            <Text style={styles.valueBox}>{userData.municipality}</Text>
          )}
        </>
      )}

      {!editing ? (
        <TouchableOpacity
          onPress={() => setEditing(true)}
          style={styles.editButton}
          activeOpacity={0.85}
        >
          <Text style={styles.editButtonText}>✏️ Izmeni profil</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleSaveChanges}
          style={styles.saveButton}
          activeOpacity={0.85}
        >
          <Text style={styles.saveButtonText}>💾 Sačuvaj promene</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F0F0F0",
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    color: "#274E6D",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  logoButton: {
    backgroundColor: "#5B8DB8",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 18,
  },
  logoButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  label: {
    fontWeight: "bold",
    color: "#274E6D",
    marginTop: 12,
    marginBottom: 4,
    fontSize: 15,
  },
  valueBox: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 10,
    fontSize: 15,
  },
  editButton: {
    backgroundColor: "#5B8DB8",
    padding: 14,
    borderRadius: 8,
    marginTop: 30,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 14,
    borderRadius: 8,
    marginTop: 30,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});

export default ProfileScreen;
