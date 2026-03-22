// components/AdminHeader.js

import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import About from "./About";

const AdminHeader = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigation = useNavigation();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ?? null);
    });
    return unsubscribe;
  }, [auth]);

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
      setProfileMenuVisible(false);
      navigation.replace("LoginScreen");
    } catch (error) {
      console.error("Greška pri odjavi:", error);
    }
  }, [auth, navigation]);

  const handleSearch = useCallback(() => {
    const query = searchTerm.trim();
    if (!query) return;

    navigation.navigate("JobSearchScreen", { query });
    setSearchTerm("");
  }, [navigation, searchTerm]);

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
          {user ? (
            <TouchableOpacity
              onPress={() => setProfileMenuVisible(true)}
              accessibilityRole="button"
              accessibilityLabel="Otvori profil meni"
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
        <View style={styles.searchContainer}>
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

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AdminJobScreen")}
          accessibilityRole="button"
          accessibilityLabel="Objavi oglas"
        >
          <Text style={styles.buttonText}>+ Objavi oglas</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={profileMenuVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setProfileMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Moj profil</Text>

            <TouchableOpacity
              onPress={() => {
                setProfileMenuVisible(false);
                navigation.navigate("ProfileScreen");
              }}
            >
              <Text style={styles.menuItem}>👤 Moj profil</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.menuItem}>🚪 Odjavi se</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setProfileMenuVisible(false)}>
              <Text style={styles.closeButton}>Zatvori</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={menuVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
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

            <TouchableOpacity onPress={() => setMenuVisible(false)}>
              <Text style={styles.closeButton}>Zatvori</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={contactVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setContactVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Kontakt informacije</Text>
            <Text style={styles.infoText}>Email: kontakt@berzarada.com</Text>
            <Text style={styles.infoText}>Telefon: +387 65 123 456</Text>

            <TouchableOpacity onPress={() => setContactVisible(false)}>
              <Text style={styles.closeButton}>Zatvori</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={aboutVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAboutVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContentLarge}>
            <Text style={styles.modalTitle}>O nama</Text>

            <View style={styles.aboutContainer}>
              <About />
            </View>

            <TouchableOpacity onPress={() => setAboutVisible(false)}>
              <Text style={styles.closeButton}>Zatvori</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AdminHeader;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#A8E6CF",
    paddingBottom: 10,
  },

  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  logoContainer: {
    flex: 1,
    alignItems: "center",
  },

  headerLogo: {
    width: 220,
    height: 80,
    resizeMode: "contain",
  },

  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 8,
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

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 16,
  },

  modalContent: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 12,
    width: "100%",
    maxWidth: 340,
    alignItems: "center",
  },

  modalContentLarge: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 12,
    width: "100%",
    maxWidth: 380,
    alignItems: "center",
  },

  aboutContainer: {
    width: "100%",
    maxHeight: 420,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1B3A57",
  },

  menuItem: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    textAlign: "center",
  },

  infoText: {
    fontSize: 14,
    marginBottom: 6,
    color: "#111",
    textAlign: "center",
  },

  closeButton: {
    marginTop: 12,
    fontSize: 16,
    color: "red",
  },
});
