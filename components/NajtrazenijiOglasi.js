// NajtrazenijiOglasi.js

import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Platform,
} from "react-native";
import { collection, query, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const NajtrazenijiOglasi = () => {
  const [oglasi, setOglasi] = useState([]);
  const [loading, setLoading] = useState(true);

  const showMessage = useCallback((title, message) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
      return;
    }
  }, []);

  const openLink = useCallback(
    async (url) => {
      if (!url) return;

      try {
        const finalUrl =
          url.startsWith("http://") || url.startsWith("https://")
            ? url
            : `https://${url}`;

        const canOpen = await Linking.canOpenURL(finalUrl);

        if (!canOpen) {
          showMessage("Neispravan link", "Ovaj link se ne može otvoriti.");
          return;
        }

        await Linking.openURL(finalUrl);
      } catch (e) {
        console.error("❌ Greška pri otvaranju linka:", e);
        showMessage("Greška", "Nije moguće otvoriti link.");
      }
    },
    [showMessage]
  );

  useEffect(() => {
    let mounted = true;

    const fetchJobs = async () => {
      try {
        const q = query(collection(db, "adminJobs"), limit(10));
        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        if (mounted) {
          setOglasi(data);
        }
      } catch (err) {
        console.error("❌ Greška pri učitavanju oglasa:", err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchJobs();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5B8DB8" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oglasi javnih institucija</Text>

      {oglasi.length === 0 ? (
        <Text style={styles.emptyText}>Trenutno nema oglasa.</Text>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {oglasi.map((oglas) => (
            <View key={oglas.id} style={styles.card}>
              <Text style={styles.employer} numberOfLines={2}>
                {oglas.employer || "Javna institucija"}
              </Text>

              <View style={styles.row}>
                <Text style={styles.label}>📍</Text>
                <Text style={styles.value} numberOfLines={1}>
                  {oglas.municipality || "-"}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>⏳</Text>
                <Text style={styles.value} numberOfLines={1}>
                  {oglas.endDate || "-"}
                </Text>
              </View>

              {oglas.link ? (
                <TouchableOpacity
                  onPress={() => openLink(oglas.link)}
                  style={styles.linkContainer}
                  accessibilityRole="button"
                  accessibilityLabel="Otvori link oglasa"
                  activeOpacity={0.8}
                >
                  <Text style={styles.linkText} numberOfLines={1}>
                    🔗 Pogledaj link
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 8,
    backgroundColor: "#F0F0F0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#274E6D",
  },
  scrollContent: {
    paddingRight: 8,
    paddingBottom: 4,
  },
  card: {
    width: 200,
    backgroundColor: "#94D8CA",
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
    elevation: 2,
  },
  employer: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#274E6D",
    marginBottom: 6,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    marginRight: 4,
  },
  value: {
    fontSize: 12,
    color: "#333",
    flexShrink: 1,
  },
  linkContainer: {
    marginTop: 4,
  },
  linkText: {
    fontSize: 12,
    color: "#274E6D",
    textDecorationLine: "underline",
  },
  loadingContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    marginBottom: 12,
  },
});

export default NajtrazenijiOglasi;
