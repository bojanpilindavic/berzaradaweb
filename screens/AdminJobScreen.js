// screens/AdminJobScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../firebase/firebaseConfig";
import DropdownMunicipality from "../components/DropdownMunicipality";

const AdminJobScreen = () => {
  const [employer, setEmployer] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [endDate, setEndDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const db = getFirestore();

  const showMessage = (title, message) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleDateChange = (_event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) setEndDate(selectedDate);
  };

  const handleWebDateChange = (e) => {
    const value = e.target.value;
    if (!value) return;

    const selectedDate = new Date(value);
    if (!Number.isNaN(selectedDate.getTime())) {
      setEndDate(selectedDate);
    }
  };

  const formatDateForInput = (date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const isValidUrl = (value) => {
    try {
      const url =
        value.startsWith("http://") || value.startsWith("https://")
          ? value
          : `https://${value}`;
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const normalizeUrl = (value) => {
    if (!value) return "";
    return value.startsWith("http://") || value.startsWith("https://")
      ? value.trim()
      : `https://${value.trim()}`;
  };

  const handleAddJob = async () => {
    const trimmedEmployer = employer.trim();
    const trimmedMunicipality = municipality.trim();
    const trimmedLink = link.trim();

    if (!trimmedEmployer || !trimmedMunicipality || !trimmedLink) {
      showMessage("Nedostaju podaci", "Molimo popunite sva polja.");
      return;
    }

    if (!isValidUrl(trimmedLink)) {
      showMessage(
        "Neispravan link",
        "Molimo unesite ispravan URL (npr. https://...)."
      );
      return;
    }

    setLoading(true);
    try {
      const formattedEndDate = endDate.toLocaleDateString("sr-RS", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      const jobData = {
        employer: trimmedEmployer,
        municipality: trimmedMunicipality,
        endDate: formattedEndDate,
        link: normalizeUrl(trimmedLink),
        createdAt: serverTimestamp(),
        userId: auth.currentUser?.uid || null,
      };

      await addDoc(collection(db, "adminJobs"), jobData);

      showMessage("Uspješno", "✅ Oglas je uspješno dodat!");
      setEmployer("");
      setMunicipality("");
      setEndDate(new Date());
      setLink("");
    } catch (error) {
      console.error("❌ Greška prilikom dodavanja oglasa:", error);
      showMessage("Greška", "Došlo je do greške prilikom dodavanja oglasa.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Admin: Dodaj oglas</Text>

          <Text style={styles.label}>Poslodavac</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="business-outline"
              size={20}
              color="#555"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              value={employer}
              onChangeText={setEmployer}
              placeholder="Unesite ime poslodavca"
              returnKeyType="next"
            />
          </View>

          <Text style={styles.label}>Opština</Text>
          <View style={styles.dropdownWrapper}>
            <DropdownMunicipality
              selected={municipality}
              onSelect={setMunicipality}
            />
          </View>

          <Text style={styles.label}>Trajanje konkursa</Text>

          {Platform.OS === "web" ? (
            <View style={styles.webDateWrapper}>
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#555"
                style={styles.icon}
              />
              <input
                type="date"
                value={formatDateForInput(endDate)}
                min={formatDateForInput(new Date())}
                onChange={handleWebDateChange}
                style={styles.webDateInput}
              />
            </View>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => setShowPicker(true)}
                style={styles.datePicker}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color="#555"
                  style={styles.icon}
                />
                <Text style={styles.dateText}>
                  {endDate.toLocaleDateString("sr-RS")}
                </Text>
              </TouchableOpacity>

              {showPicker && (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                />
              )}
            </>
          )}

          <Text style={styles.label}>Link</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="link-outline"
              size={20}
              color="#555"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              value={link}
              onChangeText={setLink}
              placeholder="Unesite URL oglasa"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={Platform.OS === "ios" ? "url" : "default"}
              returnKeyType="done"
              onSubmitEditing={handleAddJob}
            />
          </View>

          {loading ? (
            <ActivityIndicator
              size="large"
              color="#5B8DB8"
              style={styles.loader}
            />
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={handleAddJob}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>📤 Objavi oglas</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AdminJobScreen;

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#e6f0fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#274E6D",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
    color: "#274E6D",
  },
  dropdownWrapper: {
    zIndex: 10,
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 15,
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
  },
  dateText: {
    marginLeft: 6,
    fontSize: 16,
    color: "#333",
  },
  webDateWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#5B8DB8",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 40,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loader: {
    marginTop: 20,
  },
  webDateInput: {
    flex: 1,
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    fontSize: 16,
    color: "#333",
  },
});
