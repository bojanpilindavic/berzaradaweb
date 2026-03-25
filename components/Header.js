import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

import About from "./About";
import Contact from "./Contact";

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);

  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigation = useNavigation();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!isMounted) return;

      setUser(currentUser ?? null);

      if (!currentUser) {
        setUserType(null);
        return;
      }

      try {
        const snap = await getDoc(doc(db, "users", currentUser.uid));
        if (!isMounted) return;

        if (snap.exists()) {
          setUserType(snap.data()?.userType ?? null);
        } else {
          setUserType(null);
        }
      } catch (e) {
        console.error("Greška pri učitavanju userType:", e);
        if (isMounted) setUserType(null);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [auth, db]);

  const handleSearch = useCallback(() => {
    const query = searchTerm.trim();
    if (!query) return;

    navigation.navigate("JobSearchScreen", { query });
    setSearchTerm("");
  }, [navigation, searchTerm]);

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
      setProfileMenuVisible(false);
    } catch (error) {
      console.error("Greška prilikom odjave:", error);
    }
  }, [auth]);

  const goToHeart = useCallback(() => {
    if (userType === "worker") {
      navigation.navigate("SavedJobsScreen");
    } else {
      navigation.navigate("MyJobScreen");
    }
  }, [navigation, userType]);

  const canPostJob = userType === "employer" || !user;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          accessibilityRole="button"
          accessibilityLabel="Otvori meni"
        >
          <Ionicons name="menu" size={30} color="#274E6D" />
        </TouchableOpacity>

        <View style={styles.logoContainer} pointerEvents="none">
          <Image
            source={require("../assets/headert.png")}
            style={styles.headerLogo}
            accessible
            accessibilityLabel="Berza rada"
          />
        </View>

        <View style={styles.iconsContainer}>
          <TouchableOpacity
            onPress={goToHeart}
            accessibilityRole="button"
            accessibilityLabel="Sačuvani oglasi"
            style={styles.iconButton}
          >
            <Ionicons name="heart-outline" size={24} color="#274E6D" />
          </TouchableOpacity>

          {user ? (
            <TouchableOpacity
              onPress={() => setProfileMenuVisible(true)}
              accessibilityRole="button"
              accessibilityLabel="Profil meni"
            >
              <Ionicons
                name="person-circle-outline"
                size={30}
                color="#274E6D"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
              accessibilityRole="button"
              accessibilityLabel="Prijava"
            >
              <Ionicons name="log-in-outline" size={24} color="#274E6D" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View
          style={[styles.searchContainer, !canPostJob && styles.searchFull]}
        >
          <Ionicons name="search" size={20} color="#555" />

          <TextInput
            placeholder="Pretraži oglase..."
            placeholderTextColor="#666"
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={setSearchTerm}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
            accessibilityLabel="Pretraga oglasa"
          />

          <Ionicons name="mic" size={20} color="#555" />
        </View>

        {canPostJob ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate(user ? "JobAddScreen" : "RegisterScreen")
            }
            accessibilityRole="button"
            accessibilityLabel="Objavi oglas"
          >
            <Text style={styles.buttonText}>+ Objavi oglas</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <Modal
        visible={menuVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            {!user && (
              <TouchableOpacity
                onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate("RegisterScreen");
                }}
              >
                <Text style={styles.menuItem}>📝 Registracija</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                setContactVisible(true);
              }}
            >
              <Text style={styles.menuItem}>📞 Kontakt</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                setAboutVisible(true);
              }}
            >
              <Text style={styles.menuItem}>ℹ️ O nama</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonCentered]}
              onPress={() => setMenuVisible(false)}
            >
              <Text style={styles.modalButtonText}>Zatvori</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={contactVisible}
        animationType="slide"
        onRequestClose={() => setContactVisible(false)}
      >
        <SafeAreaView
          style={styles.fullscreenModal}
          edges={["top", "left", "right", "bottom"]}
        >
          <Contact />

          <TouchableOpacity
            style={[styles.modalButton, styles.modalButtonCentered]}
            onPress={() => setContactVisible(false)}
          >
            <Text style={styles.modalButtonText}>Zatvori</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      <Modal
        visible={aboutVisible}
        animationType="slide"
        onRequestClose={() => setAboutVisible(false)}
      >
        <SafeAreaView
          style={styles.fullscreenModal}
          edges={["top", "left", "right", "bottom"]}
        >
          <About />

          <TouchableOpacity
            style={[styles.modalButton, styles.modalButtonCentered]}
            onPress={() => setAboutVisible(false)}
          >
            <Text style={styles.modalButtonText}>Zatvori</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      <Modal
        visible={profileMenuVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setProfileMenuVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <Text style={styles.profileTitle}>Profil meni</Text>

            <TouchableOpacity
              onPress={() => {
                setProfileMenuVisible(false);
                navigation.navigate("ProfileScreen");
              }}
            >
              <Text style={styles.menuItem}>👤 Moj profil</Text>
            </TouchableOpacity>

            {userType === "employer" && (
              <TouchableOpacity
                onPress={() => {
                  setProfileMenuVisible(false);
                  navigation.navigate("EmployerApplicationsScreen");
                }}
              >
                <Text style={styles.menuItem}>📥 Prijave kandidata</Text>
              </TouchableOpacity>
            )}

            {userType === "worker" && (
              <TouchableOpacity
                onPress={() => {
                  setProfileMenuVisible(false);
                  navigation.navigate("WorkerApplicationsScreen");
                }}
              >
                <Text style={styles.menuItem}>📄 Moje prijave</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={handleLogout}>
              <Text style={[styles.menuItem, styles.logoutItem]}>
                🚪 Odjavi se
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonCentered]}
              onPress={() => setProfileMenuVisible(false)}
            >
              <Text style={styles.modalButtonText}>Zatvori</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#A8E6CF",
    paddingBottom: 10,
  },

  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  logoContainer: {
    flex: 1,
    alignItems: "center",
    maxHeight: 100,
  },

  headerLogo: {
    width: 250,
    height: 140,
    resizeMode: "contain",
    marginTop: -36,
    marginLeft: 40,
  },

  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconButton: {
    marginRight: 10,
  },

  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 6,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flex: 1,
    minWidth: 0,
  },

  searchFull: {
    marginRight: 0,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 0,
    marginLeft: 6,
    marginRight: 6,
    color: "#111",
    minWidth: 0,
    outlineStyle: "none",
  },

  button: {
    backgroundColor: "#5B8DB8",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 10,
  },

  buttonText: {
    fontWeight: "700",
    color: "#FFFFFF",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  modalBox: {
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: 360,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },

  profileTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1B3A57",
  },

  menuItem: {
    fontSize: 16,
    paddingVertical: 12,
    textAlign: "center",
  },

  logoutItem: {
    color: "red",
  },

  modalButton: {
    backgroundColor: "#274E6D",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  modalButtonCentered: {
    alignSelf: "center",
    marginTop: 20,
  },

  modalButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  fullscreenModal: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "space-between",
  },
});

export default Header;
