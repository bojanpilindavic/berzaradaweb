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
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";

const CategoryJobsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const category = route?.params?.category ?? "";

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = getFirestore();

  useEffect(() => {
    const fetchJobs = async () => {
      if (!category) {
        setJobs([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const q = query(
          collection(db, "jobs"),
          where("category", "==", category)
        );
        const querySnapshot = await getDocs(q);

        const jobsList = querySnapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        setJobs(jobsList);
      } catch (error) {
        console.error("Greška pri učitavanju poslova:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [category, db]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("JobDetailsScreen", { job: item })}
      activeOpacity={0.85}
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
        ⏳ Konkurs otvoren do: {item.endDate || "Nepoznato"}
      </Text>
      <Text style={styles.numberPosition}>
        👥 Broj slobodnih pozicija: {item.numberOfPositions ?? "Nepoznato"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Kategorija: <Text style={styles.headerBold}>{category || "—"}</Text>
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#5B8DB8" style={styles.loader} />
      ) : jobs.length === 0 ? (
        <Text style={styles.noJobsText}>Nema oglasa za ovu kategoriju.</Text>
      ) : (
        <FlatList
          data={jobs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
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
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#274E6D",
  },
  headerBold: {
    fontWeight: "bold",
  },
  loader: {
    marginTop: 20,
  },
  noJobsText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
    color: "#555",
  },
  listContent: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#FFFFE3",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#5B8DB8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
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
    paddingRight: 10,
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

export default CategoryJobsScreen;
