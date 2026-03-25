import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Linking,
  Alert,
  Platform,
  TouchableOpacity,
} from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { getAuth } from "firebase/auth";

const EmployerApplicationsScreen = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const currentUser = auth.currentUser;

        if (!currentUser) {
          setApplications([]);
          setLoading(false);
          return;
        }

        const appsQuery = query(
          collection(db, "applications"),
          where("employerId", "==", currentUser.uid)
        );

        const appsSnapshot = await getDocs(appsQuery);

        const data = appsSnapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        setApplications(data);
      } catch (error) {
        console.error("Greška pri dohvatanju prijava:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [auth]);

  const showMessage = (title, message) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const openCV = async (url) => {
    if (!url) {
      showMessage("Greška", "CV nije dostupan.");
      return;
    }

    try {
      if (Platform.OS === "web") {
        window.open(url, "_blank", "noopener,noreferrer");
        return;
      }

      const supported = await Linking.canOpenURL(url);

      if (!supported) {
        showMessage("Greška", "Ne mogu otvoriti ovaj CV link.");
        return;
      }

      await Linking.openURL(url);
    } catch (err) {
      console.error("Greška pri otvaranju CV-a", err);
      showMessage("Greška", "Ne mogu otvoriti CV.");
    }
  };

  const renderItem = ({ item }) => {
    const cvLink = item.cvURL || item.cvUri || "";

    return (
      <View style={styles.card}>
        <Text style={styles.applicantName}>👤 {item.name || "Nepoznato"}</Text>
        <Text style={styles.email}>📧 {item.email || "—"}</Text>
        <Text style={styles.message}>
          💬 Poruka: {item.message || "Bez poruke"}
        </Text>

        <TouchableOpacity onPress={() => openCV(cvLink)} activeOpacity={0.8}>
          <Text style={styles.cv}>📎 CV: {item.cvName || "Nema naziva"}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#5B8DB8" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📥 Prijave na vaše oglase</Text>

      {applications.length === 0 ? (
        <Text style={styles.noAppsText}>Nema prijava.</Text>
      ) : (
        <FlatList
          data={applications}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: "#F0F0F0",
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#274E6D",
  },
  card: {
    backgroundColor: "#FFFFE3",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  applicantName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#274E6D",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#274E6D",
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: "#274E6D",
    marginBottom: 4,
  },
  cv: {
    fontSize: 14,
    color: "#5B8DB8",
    marginTop: 4,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noAppsText: {
    fontSize: 16,
    color: "gray",
    marginTop: 30,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default EmployerApplicationsScreen;
