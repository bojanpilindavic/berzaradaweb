// screens/AdminHome.js

import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Footer from "../components/Footer";
import AdminHeader from "../components/AdminHeader";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const AdminHome = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const db = getFirestore();
  const auth = getAuth();

  const fetchJobs = useCallback(async () => {
    const snapshot = await getDocs(collection(db, "jobs"));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  }, [db]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUserEmail(u?.email || "");
    });

    (async () => {
      try {
        const data = await fetchJobs();
        setJobs(data);
      } catch (e) {
        console.error("Greška pri učitavanju oglasa:", e);
      } finally {
        setLoading(false);
      }
    })();

    return () => unsub();
  }, [auth, fetchJobs]);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      const data = await fetchJobs();
      setJobs(data);
    } catch (e) {
      console.error("Greška pri osvežavanju oglasa:", e);
    } finally {
      setRefreshing(false);
    }
  };

  const performDelete = async (jobId) => {
    try {
      await deleteDoc(doc(db, "jobs", jobId));
      setJobs((current) => current.filter((j) => j.id !== jobId));

      if (Platform.OS === "web") {
        window.alert("Oglas je uspješno obrisan.");
      } else {
        Alert.alert("Obrisano", "Oglas je uspješno obrisan.");
      }
    } catch (e) {
      console.error("Greška pri brisanju oglasa:", e);

      if (Platform.OS === "web") {
        window.alert("Brisanje oglasa nije uspjelo.");
      } else {
        Alert.alert("Greška", "Brisanje oglasa nije uspjelo.");
      }
    }
  };

  const handleDelete = (jobId) => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm("Želite li obrisati ovaj oglas?");
      if (confirmed) {
        performDelete(jobId);
      }
      return;
    }

    Alert.alert("Potvrda brisanja", "Želite li obrisati ovaj oglas?", [
      { text: "Otkaži", style: "cancel" },
      {
        text: "Obriši",
        style: "destructive",
        onPress: () => performDelete(jobId),
      },
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <AdminHeader />
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#5B8DB8" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListHeaderComponent={() => (
          <>
            <AdminHeader />
            <View style={styles.container}>
              <Text style={styles.header}>🛠️ Admin Panel</Text>
              {!!userEmail && (
                <Text style={styles.subtitle}>Ulogovani: {userEmail}</Text>
              )}
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Nema oglasa za prikaz.</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.title}>
                {item.position || "Bez pozicije"}
              </Text>
              <Text style={styles.company}>
                {item.companyName || "Bez naziva firme"}
              </Text>
            </View>

            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.deleteText}>Obriši</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={() => <Footer />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#274E6D",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    paddingHorizontal: 16,
    paddingVertical: 30,
    alignItems: "center",
  },
  emptyText: {
    color: "#555",
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFE3",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 10,
    elevation: 1,
  },
  cardContent: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#274E6D",
  },
  company: {
    fontSize: 14,
    color: "#5B8DB8",
    marginTop: 2,
  },
  deleteText: {
    color: "#C00",
    fontWeight: "bold",
  },
});

export default AdminHome;
