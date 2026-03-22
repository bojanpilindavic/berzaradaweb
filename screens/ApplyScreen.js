import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const ApplyScreen = ({ route }) => {
  const { jobId, uid, employer: employerId } = route.params;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [cv, setCV] = useState(null);
  const [loading, setLoading] = useState(false);

  const showMessage = (title, message) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (!result || result.canceled) return;

      const file = result.assets ? result.assets[0] : result;

      if (!file?.uri) {
        showMessage("Greška", "Neuspjelo učitavanje CV-a.");
        return;
      }

      setCV(file);
    } catch (error) {
      showMessage("Greška", "Pokušajte ponovo.");
    }
  };

  const handleSubmit = async () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !cv?.uri) {
      showMessage("Greška", "Ime, email i CV su obavezni!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      showMessage("Greška", "Unesite ispravan email.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "applications"), {
        name: trimmedName,
        email: trimmedEmail,
        message: message.trim(),
        cvName: cv.name ?? "CV",
        cvUri: cv.uri,
        jobId,
        appliedAt: new Date(),
        uid,
        employerId,
      });

      showMessage("Uspješno", "Vaša prijava je uspješno poslata!");
      setName("");
      setEmail("");
      setMessage("");
      setCV(null);
    } catch (error) {
      console.error("Greška pri slanju prijave:", error);
      showMessage("Greška", "Došlo je do greške pri slanju prijave.");
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Prijava na oglas</Text>

      <Text style={styles.label}>
        Ime i prezime <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Unesite ime i prezime"
        value={name}
        onChangeText={setName}
        returnKeyType="next"
        placeholderTextColor="#777"
      />

      <Text style={styles.label}>
        Email <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Unesite email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        placeholderTextColor="#777"
      />

      <Text style={styles.label}>Poruka (opciono)</Text>
      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Ostavite poruku"
        value={message}
        onChangeText={setMessage}
        multiline
        textAlignVertical="top"
        placeholderTextColor="#777"
      />

      <Text style={styles.label}>
        Dodajte CV <Text style={styles.required}>*</Text>
      </Text>
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={handleFileUpload}
        activeOpacity={0.8}
      >
        <Text style={styles.uploadText}>
          {cv ? `📄 ${cv.name ?? "CV"}` : "Dodaj CV"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.submitButton, loading && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={loading}
        activeOpacity={0.85}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitText}>📨 Pošalji prijavu</Text>
        )}
      </TouchableOpacity>
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
  container: {
    padding: 20,
    backgroundColor: "#e6f0fa",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#274E6D",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#274E6D",
    marginTop: 10,
  },
  required: {
    color: "red",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginTop: 6,
    fontSize: 16,
    outlineStyle: "none",
  },
  messageInput: {
    height: 80,
  },
  uploadButton: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  uploadText: {
    fontSize: 16,
    color: "#5B8DB8",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#5B8DB8",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonDisabled: {
    backgroundColor: "#ccc",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ApplyScreen;
