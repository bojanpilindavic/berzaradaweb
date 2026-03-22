// RegisterScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Modal,
  Button,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import TermsOfService from "../components/TermsOfService";
import PrivacyPolicy from "../components/PrivacyPolicy";
import DropdownMunicipality from "../components/DropdownMunicipality";
import { saveUserToFirestore } from "../firebase/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const RegisterScreen = () => {
  const [userType, setUserType] = useState("worker");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jib, setJib] = useState("");
  const [activity, setActivity] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [municipality, setMunicipality] = useState("");

  const showMessage = (title, message) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const validatePassword = (value) => {
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (!hasUpperCase || !hasNumber || !hasSpecialChar) {
      return "Šifra mora imati bar jedno veliko slovo, broj i specijalan znak.";
    }

    return "";
  };

  const validateFields = () => {
    let isValid = true;
    const trimmedEmail = email.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setEmailError("Unesite ispravan email.");
      isValid = false;
    } else {
      setEmailError("");
    }

    const pwError = validatePassword(password);
    if (pwError) {
      setPasswordError(pwError);
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Šifre se ne poklapaju.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (
      userType === "worker" &&
      (!fullName.trim() || !trimmedEmail || !password)
    ) {
      showMessage("Greška", "Sva obavezna polja moraju biti popunjena!");
      isValid = false;
    }

    if (
      userType === "employer" &&
      (!companyName.trim() ||
        !jib.trim() ||
        !municipality.trim() ||
        !trimmedEmail ||
        !password)
    ) {
      showMessage("Greška", "Sva obavezna polja moraju biti popunjena!");
      isValid = false;
    }

    if (!agreed) {
      showMessage("Greška", "Morate prihvatiti uslove korišćenja.");
      isValid = false;
    }

    return isValid;
  };

  const handleRegister = async () => {
    if (!validateFields()) return;

    setLoading(true);
    const auth = getAuth();

    try {
      const trimmedEmail = email.trim().toLowerCase();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        trimmedEmail,
        password
      );

      const user = userCredential.user;
      await sendEmailVerification(user);

      await saveUserToFirestore(
        user.uid,
        userType,
        {
          email: trimmedEmail,
          ...(userType === "worker"
            ? { fullName: fullName.trim(), municipality: municipality.trim() }
            : {
                companyName: companyName.trim(),
                jib: jib.trim(),
                activity: activity.trim(),
                municipality: municipality.trim(),
              }),
        },
        image
      );

      showMessage(
        "Proverite email",
        "Na vaš email je poslat link za potvrdu registracije."
      );

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFullName("");
      setCompanyName("");
      setJib("");
      setActivity("");
      setImage(null);
      setMunicipality("");
      setAgreed(false);
      setEmailError("");
      setPasswordError("");
      setConfirmPasswordError("");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setEmailError("Email adresa je već registrovana.");
      } else {
        showMessage("Greška", error.message || "Došlo je do greške.");
      }
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    try {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
          showMessage("Dozvola potrebna", "Morate omogućiti pristup galeriji.");
          return;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Greška pri odabiru slike:", error);
      showMessage("Greška", "Nije moguće izabrati sliku.");
    }
  };

  const renderInput = (
    iconName,
    value,
    setValue,
    placeholder,
    secure = false,
    toggle = null,
    show = true,
    extraProps = {}
  ) => (
    <View style={styles.inputContainer}>
      <Ionicons name={iconName} size={20} color="#555" style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        style={styles.inputField}
        secureTextEntry={secure && !show}
        {...extraProps}
      />
      {toggle && (
        <TouchableOpacity onPress={toggle} activeOpacity={0.8}>
          <Ionicons
            name={show ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#555"
          />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardContainer}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Registracija</Text>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, userType === "worker" && styles.activeTab]}
            onPress={() => setUserType("worker")}
            activeOpacity={0.85}
          >
            <Text style={styles.tabText}>Radnik</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, userType === "employer" && styles.activeTab]}
            onPress={() => setUserType("employer")}
            activeOpacity={0.85}
          >
            <Text style={styles.tabText}>Poslodavac</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.imageContainer}
          onPress={pickImage}
          activeOpacity={0.85}
        >
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <MaterialIcons name="photo-camera" size={40} color="gray" />
              <Text style={styles.imageButtonText}>
                {userType === "worker" ? "Dodaj sliku" : "Dodaj logo"}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {userType === "worker" ? (
          <>
            {renderInput(
              "person-outline",
              fullName,
              setFullName,
              "Ime i prezime",
              false,
              null,
              true,
              { returnKeyType: "next" }
            )}

            <DropdownMunicipality
              selected={municipality}
              onSelect={setMunicipality}
            />
          </>
        ) : (
          <>
            {renderInput(
              "business-outline",
              companyName,
              setCompanyName,
              "Naziv firme",
              false,
              null,
              true,
              { returnKeyType: "next" }
            )}

            {renderInput(
              "document-outline",
              jib,
              setJib,
              "JIB",
              false,
              null,
              true,
              {
                keyboardType: "numeric",
                returnKeyType: "next",
              }
            )}

            {renderInput(
              "briefcase-outline",
              activity,
              setActivity,
              "Delatnost",
              false,
              null,
              true,
              { returnKeyType: "next" }
            )}

            <DropdownMunicipality
              selected={municipality}
              onSelect={setMunicipality}
            />
          </>
        )}

        {renderInput(
          "mail-outline",
          email,
          setEmail,
          "Email",
          false,
          null,
          true,
          {
            keyboardType: "email-address",
            autoCapitalize: "none",
            autoCorrect: false,
            returnKeyType: "next",
          }
        )}
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {renderInput(
          "lock-closed-outline",
          password,
          setPassword,
          "Šifra",
          true,
          () => setShowPassword(!showPassword),
          showPassword,
          {
            autoCapitalize: "none",
            autoCorrect: false,
            returnKeyType: "next",
          }
        )}
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}

        {renderInput(
          "lock-closed-outline",
          confirmPassword,
          setConfirmPassword,
          "Ponovi šifru",
          true,
          () => setShowConfirm(!showConfirm),
          showConfirm,
          {
            autoCapitalize: "none",
            autoCorrect: false,
            returnKeyType: "done",
            onSubmitEditing: handleRegister,
          }
        )}
        {confirmPasswordError ? (
          <Text style={styles.errorText}>{confirmPasswordError}</Text>
        ) : null}

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setAgreed(!agreed)}
          activeOpacity={0.85}
        >
          <MaterialIcons
            name={agreed ? "check-box" : "check-box-outline-blank"}
            size={24}
            color="#007bff"
          />
          <Text style={styles.checkboxText}>
            Prihvatam{" "}
            <Text style={styles.link} onPress={() => setShowPrivacyModal(true)}>
              Politiku privatnosti
            </Text>{" "}
            i{" "}
            <Text style={styles.link} onPress={() => setShowTermsModal(true)}>
              Uslove korišćenja
            </Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.registerButton,
            (!agreed || loading) && styles.disabledButton,
          ]}
          onPress={handleRegister}
          disabled={!agreed || loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.registerButtonText}>Registruj se</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={showPrivacyModal}
        animationType="slide"
        onRequestClose={() => setShowPrivacyModal(false)}
      >
        <View style={styles.modalContent}>
          <PrivacyPolicy />
          <Button title="Zatvori" onPress={() => setShowPrivacyModal(false)} />
        </View>
      </Modal>

      <Modal
        visible={showTermsModal}
        animationType="slide"
        onRequestClose={() => setShowTermsModal(false)}
      >
        <View style={styles.modalContent}>
          <TermsOfService />
          <Button title="Zatvori" onPress={() => setShowTermsModal(false)} />
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#e6f0fa",
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#274E6D",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#ccc",
  },
  activeTab: {
    backgroundColor: "#5B8DB8",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  imageContainer: {
    alignSelf: "center",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 50,
  },
  imageButtonText: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 5,
  },
  inputField: {
    flex: 1,
    paddingVertical: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 14,
    flex: 1,
  },
  link: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
  registerButton: {
    backgroundColor: "#5B8DB8",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 20,
  },
  registerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "gray",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
});

export default RegisterScreen;
