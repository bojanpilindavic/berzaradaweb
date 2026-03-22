import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const JobScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const rawQuery = route.params?.query ?? "";
  const searchQuery = useMemo(() => rawQuery.trim(), [rawQuery]);
  const normalizedQuery = useMemo(
    () => searchQuery.toLowerCase(),
    [searchQuery]
  );

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);

      try {
        const jobsRef = collection(db, "jobs");
        const snapshot = await getDocs(jobsRef);

        const allJobs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

        if (!normalizedQuery) {
          setJobs(allJobs);
          return;
        }

        const filteredJobs = allJobs.filter((job) => {
          const position = (job.position || "").toLowerCase();
          const description = (job.description || "").toLowerCase();
          const municipality = (job.municipality || "").toLowerCase();

          return (
            position.includes(normalizedQuery) ||
            description.includes(normalizedQuery) ||
            municipality.includes(normalizedQuery)
          );
        });

        setJobs(filteredJobs);
      } catch (error) {
        console.error("Greška pri učitavanju poslova:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [normalizedQuery]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("JobDetailsScreen", { job: item })}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.firma}>
          {item.companyName || "Nepoznata firma"}
        </Text>
        {item.logo ? (
          <Image source={{ uri: item.logo }} style={styles.logo} />
        ) : null}
      </View>

      <Text style={styles.position}>
        {item.position || "Nepoznata pozicija"}
      </Text>

      <Text style={styles.location}>
        📍 {item.municipality || "Nepoznata lokacija"}
      </Text>

      <Text style={styles.deadline}>
        ⏳ Konkurs otvoren do: {item.endDate || "-"}
      </Text>

      <Text style={styles.numberPosition}>
        👥 Broj slobodnih pozicija: {item.numberOfPositions ?? "Nepoznato"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rezultati pretrage: "{searchQuery}"</Text>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#5B8DB8" />
          <Text style={styles.loadingText}>Učitavanje...</Text>
        </View>
      ) : jobs.length === 0 ? (
        <Text style={styles.noResults}>Nema rezultata.</Text>
      ) : (
        <FlatList
          data={jobs}
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
    paddingHorizontal: 10,
    marginTop: 20,
    backgroundColor: "#F0F0F0",
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#274E6D",
  },
  noResults: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginTop: 40,
  },
  loadingContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  loadingText: {
    color: "#274E6D",
    marginTop: 10,
  },
  listContent: {
    paddingBottom: 50,
  },
  card: {
    backgroundColor: "#FFFFE3",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#5B8DB8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  firma: {
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
    color: "#5B8DB8",
    marginBottom: 3,
  },
  deadline: {
    fontSize: 13,
    color: "#5B8DB8",
    marginBottom: 3,
  },
  numberPosition: {
    fontSize: 13,
    color: "#5B8DB8",
    marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: "contain",
  },
});

export default JobScreen;
