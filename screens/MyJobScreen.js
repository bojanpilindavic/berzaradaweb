import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from "react-native";
import { getAuth } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  getFirestore,
} from "firebase/firestore";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const MyJobScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = getFirestore();
  const auth = getAuth();
  const navigation = useNavigation();

  const fetchMyJobs = useCallback(async () => {
    try {
      setLoading(true);

      const userId = auth.currentUser?.uid;
      if (!userId) {
        setJobs([]);
        setLoading(false);
        return;
      }

      const q = query(collection(db, "jobs"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      const jobList = querySnapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setJobs(jobList);
    } catch (error) {
      console.error("Greška pri učitavanju mojih oglasa:", error);
    } finally {
      setLoading(false);
    }
  }, [auth, db]);

  useFocusEffect(
    useCallback(() => {
      fetchMyJobs();
    }, [fetchMyJobs])
  );

  const performDelete = async (jobId) => {
    try {
      await deleteDoc(doc(db, "jobs", jobId));
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error("Greška pri brisanju oglasa:", error);

      if (Platform.OS === "web") {
        window.alert("Došlo je do greške pri brisanju oglasa.");
      } else {
        Alert.alert("Greška", "Došlo je do greške pri brisanju oglasa.");
      }
    }
  };

  const handleDelete = (jobId) => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm(
        "Da li si siguran da želiš obrisati ovaj oglas?"
      );

      if (confirmed) {
        performDelete(jobId);
      }
      return;
    }

    Alert.alert(
      "Brisanje oglasa",
      "Da li si siguran da želiš obrisati ovaj oglas?",
      [
        { text: "Otkaži", style: "cancel" },
        {
          text: "Obriši",
          style: "destructive",
          onPress: () => performDelete(jobId),
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
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
          ⏳ Konkurs otvoren do: {item.endDate || "—"}
        </Text>
        <Text style={styles.numberPosition}>
          👥 Broj slobodnih pozicija: {item.numberOfPositions ?? "—"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
        activeOpacity={0.85}
      >
        <Text style={styles.deleteButtonText}>🗑️ Obriši oglas</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📂 Moji oglasi</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#5B8DB8" style={styles.loader} />
      ) : jobs.length === 0 ? (
        <Text style={styles.noJobsText}>Nema tvojih oglasa.</Text>
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#274E6D",
  },
  loader: {
    marginTop: 20,
  },
  noJobsText: {
    marginTop: 20,
    textAlign: "center",
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
  deleteButton: {
    backgroundColor: "#C97A63",
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  deleteButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default MyJobScreen;
