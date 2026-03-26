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
  const [regularJobs, setRegularJobs] = useState([]);
  const [publicJobs, setPublicJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const db = getFirestore();
  const auth = getAuth();

  const fetchJobs = useCallback(async () => {
    const jobsSnapshot = await getDocs(collection(db, "jobs"));
    const adminJobsSnapshot = await getDocs(collection(db, "adminJobs"));

    const regular = jobsSnapshot.docs.map((d) => ({
      id: d.id,
      sourceCollection: "jobs",
      ...d.data(),
    }));

    const publicList = adminJobsSnapshot.docs.map((d) => ({
      id: d.id,
      sourceCollection: "adminJobs",
      ...d.data(),
    }));

    return { regular, publicList };
  }, [db]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUserEmail(u?.email || "");
    });

    (async () => {
      try {
        const data = await fetchJobs();
        setRegularJobs(data.regular);
        setPublicJobs(data.publicList);
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
      setRegularJobs(data.regular);
      setPublicJobs(data.publicList);
    } catch (e) {
      console.error("Greška pri osvežavanju oglasa:", e);
    } finally {
      setRefreshing(false);
    }
  };

  const showMessage = (title, message) => {
    if (Platform.OS === "web") {
      window.alert(message);
    } else {
      Alert.alert(title, message);
    }
  };

  const performDelete = async (item) => {
    try {
      await deleteDoc(doc(db, item.sourceCollection, item.id));

      if (item.sourceCollection === "jobs") {
        setRegularJobs((prev) => prev.filter((j) => j.id !== item.id));
      } else {
        setPublicJobs((prev) => prev.filter((j) => j.id !== item.id));
      }

      showMessage("Obrisano", "Oglas je uspješno obrisan.");
    } catch (e) {
      console.error("Greška pri brisanju oglasa:", e);
      showMessage("Greška", "Brisanje oglasa nije uspjelo.");
    }
  };

  const handleDelete = (item) => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm("Želite li obrisati ovaj oglas?");
      if (confirmed) {
        performDelete(item);
      }
      return;
    }

    Alert.alert("Potvrda brisanja", "Želite li obrisati ovaj oglas?", [
      { text: "Otkaži", style: "cancel" },
      {
        text: "Obriši",
        style: "destructive",
        onPress: () => performDelete(item),
      },
    ]);
  };

  const renderJobItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>
          {item.position || item.employer || "Bez naziva"}
        </Text>
        <Text style={styles.company}>
          {item.companyName || item.municipality || "Bez dodatnih podataka"}
        </Text>
      </View>

      <TouchableOpacity onPress={() => handleDelete(item)}>
        <Text style={styles.deleteText}>Obriši</Text>
      </TouchableOpacity>
    </View>
  );

  const Section = ({ title, data, emptyText }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {data.length === 0 ? (
        <Text style={styles.emptySectionText}>{emptyText}</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => `${item.sourceCollection}_${item.id}`}
          renderItem={renderJobItem}
          scrollEnabled={false}
        />
      )}
    </View>
  );

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
        data={[{ id: "content" }]}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        renderItem={() => (
          <View style={styles.container}>
            <Text style={styles.header}>🛠️ Admin Panel</Text>
            {!!userEmail && (
              <Text style={styles.subtitle}>Ulogovani: {userEmail}</Text>
            )}

            <Section
              title="Oglasi firmi"
              data={regularJobs}
              emptyText="Nema oglasa firmi."
            />

            <Section
              title="Javne nabavke"
              data={publicJobs}
              emptyText="Nema javnih nabavki."
            />
          </View>
        )}
        ListHeaderComponent={<AdminHeader />}
        ListFooterComponent={<Footer />}
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
    marginBottom: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#274E6D",
    marginBottom: 10,
  },
  emptySectionText: {
    color: "#777",
    fontSize: 14,
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFE3",
    padding: 12,
    borderRadius: 8,
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
