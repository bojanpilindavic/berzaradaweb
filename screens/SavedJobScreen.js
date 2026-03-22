import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const SavedJobsScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = getFirestore();
  const auth = getAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          setJobs([]);
          setLoading(false);
          return;
        }

        const userSnap = await getDoc(doc(db, "users", user.uid));
        const savedJobsIds = userSnap.exists()
          ? userSnap.data()?.savedJobs || []
          : [];

        if (savedJobsIds.length === 0) {
          setJobs([]);
          return;
        }

        const jobSnaps = await Promise.all(
          savedJobsIds.map((jobId) => getDoc(doc(db, "jobs", jobId)))
        );

        const jobList = jobSnaps
          .filter((snap) => snap.exists())
          .map((snap) => ({ id: snap.id, ...snap.data() }));

        setJobs(jobList);
      } catch (error) {
        console.error("Greška pri učitavanju sačuvanih oglasa:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, [auth, db]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("JobDetailsScreen", { job: item })}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.company}>
          {item.companyName || "Nepoznata firma"}
        </Text>
        {item.logo ? (
          <Image source={{ uri: item.logo }} style={styles.logo} />
        ) : null}
      </View>

      <Text style={styles.position}>
        {item.position || "Nepoznata pozicija"}
      </Text>
      <Text style={styles.location}>📍 {item.municipality || "-"}</Text>
      <Text style={styles.deadline}>⏳ Konkurs do: {item.endDate || "-"}</Text>
      <Text style={styles.numberPosition}>
        👥 Broj pozicija: {item.numberOfPositions ?? "-"}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#5B8DB8" />
      </View>
    );
  }

  if (jobs.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Nemate nijedan sačuvani oglas.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>💾 Sačuvani oglasi</Text>
      <FlatList
        data={jobs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 20,
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#274E6D",
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFE3",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  company: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#274E6D",
    flex: 1,
    paddingRight: 8,
  },
  position: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#274E6D",
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: "#274E6D",
    marginBottom: 3,
  },
  deadline: {
    fontSize: 13,
    color: "#274E6D",
    marginBottom: 3,
  },
  numberPosition: {
    fontSize: 13,
    color: "#274E6D",
    marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: "contain",
  },
});

export default SavedJobsScreen;
