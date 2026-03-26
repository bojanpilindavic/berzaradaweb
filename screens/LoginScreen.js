import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { isAdmin } from "../firebase/firebaseConfig";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();
  const auth = getAuth();

  const normalizeEmail = (value) => value.trim().toLowerCase();

  const showMessage = (title, message) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleLogin = async () => {
    const cleanEmail = normalizeEmail(email);

    if (!cleanEmail || !password) {
      setErrorMessage("Molimo unesite email i šifru.");
      return;
    }

    setErrorMessage("");
    setLoading(true);

    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        cleanEmail,
        password
      );

      if (!user.emailVerified) {
        setErrorMessage("Molimo verifikujte svoj email pre prijave.");
        setLoading(false);
        return;
      }

      const adminFlag = isAdmin(user.email);
      setLoading(false);

      if (adminFlag) {
        navigation.reset({ index: 0, routes: [{ name: "AdminHome" }] });
        return;
      }

      console.log("User logged in:", user.email);
      navigation.reset({ index: 0, routes: [{ name: "HomeScreen" }] });
    } catch (error) {
      let message = "Došlo je do greške. Pokušajte ponovo.";

      switch (error.code) {
        case "auth/invalid-email":
          message = "Neispravan format email adrese.";
          break;
        case "auth/user-not-found":
          message = "Korisnik sa ovom email adresom ne postoji.";
          break;
        case "auth/wrong-password":
        case "auth/invalid-credential":
          message = "Pogrešna šifra ili email. Pokušajte ponovo.";
          break;
        case "auth/too-many-requests":
          message = "Previše neuspjelh pokušaja. Pokušajte kasnije.";
          break;
        default:
          break;
      }

      setErrorMessage(message);
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const cleanEmail = normalizeEmail(email);

    if (!cleanEmail) {
      showMessage(
        "Greška",
        "Molimo unesite email adresu pre nego što resetujete šifru."
      );
      return;
    }

    try {
      await sendPasswordResetEmail(auth, cleanEmail);
      showMessage(
        "Potvrda",
        "Link za resetovanje šifre je poslat na vaš email."
      );
    } catch (error) {
      let message = "Došlo je do greške. Pokušajte ponovo.";
      if (error.code === "auth/user-not-found") {
        message = "Nije pronađen korisnik sa ovom email adresom.";
      }
      showMessage("Greška", message);
    }
  };

  const content = (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Image
          source={require("../assets/headerlogo.png")}
          style={styles.headerLogo}
        />

        <Text style={styles.title}>Prijava</Text>

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <View style={styles.inputContainer}>
          <Ionicons
            name="mail-outline"
            size={20}
            color="#555"
            style={styles.icon}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.inputField}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            placeholderTextColor="#777"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#555"
            style={styles.icon}
          />
          <TextInput
            placeholder="Šifra"
            value={password}
            onChangeText={setPassword}
            style={styles.inputField}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={handleLogin}
            placeholderTextColor="#777"
          />
          <TouchableOpacity
            onPress={() => setShowPassword((p) => !p)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#555"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Prijavi se</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleForgotPassword} activeOpacity={0.8}>
          <Text style={styles.forgotPassword}>Zaboravljena šifra?</Text>
        </TouchableOpacity>

        <Text style={styles.registerText}>Nemate nalog?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("RegisterScreen")}
          activeOpacity={0.8}
        >
          <Text style={styles.registerLink}>Registrujte se</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  if (Platform.OS === "web") {
    return <View style={styles.webWrapper}>{content}</View>;
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {content}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  webWrapper: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#e6f0fa",
    minHeight: "100%",
  },
  headerLogo: {
    width: 200,
    height: 220,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#274E6D",
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
    fontSize: 16,
    outlineStyle: "none",
  },
  eyeIcon: {
    marginLeft: 5,
  },
  button: {
    backgroundColor: "#5B8DB8",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  forgotPassword: {
    marginTop: 10,
    color: "#274E6D",
    fontWeight: "bold",
  },
  registerText: {
    marginTop: 15,
    fontSize: 14,
    color: "#274E6D",
  },
  registerLink: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default LoginScreen;
