import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const PAGE_SIZE = 7;

const NajnovijiOglasi = () => {
  const navigation = useNavigation();

  const [oglasi, setOglasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchJobs = async (pagination = false, isRefresh = false) => {
    try {
      let q = query(
        collection(db, "jobs"),
        orderBy("createdAt", "desc"),
        limit(PAGE_SIZE)
      );

      if (pagination && lastVisible) {
        q = query(
          collection(db, "jobs"),
          orderBy("createdAt", "desc"),
          startAfter(lastVisible),
          limit(PAGE_SIZE)
        );
      }

      const querySnapshot = await getDocs(q);

      const jobsData = querySnapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setOglasi((prev) => {
        if (pagination) {
          return [...prev, ...jobsData];
        }
        return jobsData;
      });

      const lastVisibleDoc =
        querySnapshot.docs.length > 0
          ? querySnapshot.docs[querySnapshot.docs.length - 1]
          : null;

      setLastVisible(lastVisibleDoc);

      console.log("🔁 Oglasi učitani:", jobsData.length);
    } catch (error) {
      console.error("❌ Greška prilikom preuzimanja oglasa:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      if (isRefresh) {
        setRefreshing(false);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      setLastVisible(null);
      fetchJobs(false, false);
    }, [])
  );

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setLastVisible(null);
    fetchJobs(false, true);
  }, []);

  const loadMore = useCallback(() => {
    if (loadingMore || !lastVisible) return;

    setLoadingMore(true);
    fetchJobs(true, false);
  }, [loadingMore, lastVisible]);

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#274E6D" />
        <Text style={styles.loadingText}>Učitavanje oglasa...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Najnoviji oglasi</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {oglasi.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Trenutno nema oglasa.</Text>
          </View>
        ) : (
          oglasi.map((oglas) => (
            <TouchableOpacity
              key={oglas.id}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate("JobDetailsScreen", { job: oglas })
              }
            >
              <View style={styles.cardHeader}>
                <Text style={styles.firma} numberOfLines={1}>
                  {oglas.companyName || "Naziv firme"}
                </Text>

                {oglas.logo ? (
                  <Image
                    source={{ uri: oglas.logo }}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                ) : null}
              </View>

              {!!oglas.position && (
                <Text style={styles.position}>{oglas.position}</Text>
              )}

              {!!oglas.municipality && (
                <Text style={styles.location}>📍 {oglas.municipality}</Text>
              )}

              {!!oglas.endDate && (
                <Text style={styles.deadline}>
                  ⏳ Konkurs otvoren do: {oglas.endDate}
                </Text>
              )}

              {oglas.numberOfPositions !== undefined &&
              oglas.numberOfPositions !== null ? (
                <Text style={styles.numberPosition}>
                  👥 Broj slobodnih pozicija: {oglas.numberOfPositions}
                </Text>
              ) : null}
            </TouchableOpacity>
          ))
        )}

        {loadingMore ? (
          <ActivityIndicator
            size="large"
            color="#add8e6"
            style={styles.loadingMore}
          />
        ) : null}

        {!loadingMore && lastVisible ? (
          <TouchableOpacity onPress={loadMore} style={styles.loadMoreButton}>
            <Text style={styles.loadMoreText}>Učitaj još</Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: "#F0F0F0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#274E6D",
  },
  card: {
    backgroundColor: "#E0F7FA",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
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
  },
  loadMoreButton: {
    backgroundColor: "#5B8DB8",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 40,
  },
  loadMoreText: {
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    minHeight: 200,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },
  loadingText: {
    marginTop: 10,
    color: "#274E6D",
  },
  loadingMore: {
    marginTop: 20,
  },
  emptyContainer: {
    paddingVertical: 30,
    alignItems: "center",
  },
  emptyText: {
    color: "#274E6D",
    fontSize: 15,
  },
});

export default NajnovijiOglasi;
