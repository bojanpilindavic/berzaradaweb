import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";

const JobDetailsScreen = ({ route, navigation }) => {
  const { job } = route.params;

  const auth = getAuth();
  const user = auth.currentUser;

  const db = getFirestore();
  const userDoc = user ? doc(db, "users", user.uid) : null;

  const employer = job?.userId;
  const isEmployer = !!user && user.uid === employer;
  const canApply = !isEmployer;

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!userDoc || !job?.id) return;

    let mounted = true;

    (async () => {
      try {
        const snap = await getDoc(userDoc);
        const savedJobs = snap.exists() ? snap.data()?.savedJobs || [] : [];
        if (mounted) {
          setIsSaved(savedJobs.includes(job.id));
        }
      } catch (e) {
        console.error("Greška pri učitavanju sačuvanih oglasa:", e);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [userDoc, job?.id]);

  const toggleSave = useCallback(async () => {
    if (!userDoc || !user || !job?.id) {
      navigation.navigate("LoginScreen");
      return;
    }

    try {
      if (isSaved) {
        await updateDoc(userDoc, { savedJobs: arrayRemove(job.id) });
      } else {
        await updateDoc(userDoc, { savedJobs: arrayUnion(job.id) });
      }
      setIsSaved((prev) => !prev);
    } catch (e) {
      console.error("Greška pri čuvanju oglasa:", e);
    }
  }, [userDoc, user, job?.id, isSaved, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={toggleSave} style={styles.headerButton}>
          <MaterialIcons
            name={isSaved ? "star" : "star-border"}
            size={24}
            color={isSaved ? "#FFD700" : "#75D5C2"}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isSaved, toggleSave]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {job?.logo ? (
        <Image source={{ uri: job.logo }} style={styles.logo} />
      ) : null}

      <Text style={styles.company}>
        {job?.companyName || "Nepoznata firma"}
      </Text>
      <Text style={styles.position}>
        {job?.position || "Nepoznata pozicija"}
      </Text>
      <Text style={styles.location}>📍 {job?.municipality || "-"}</Text>
      <Text style={styles.deadline}>
        ⏳ Konkurs otvoren do: {job?.endDate || "-"}
      </Text>
      <Text style={styles.positions}>
        👥 Broj pozicija: {job?.numberOfPositions ?? "-"}
      </Text>

      <Text style={styles.sectionTitle}>Opis posla</Text>
      <Text style={styles.text}>{job?.description || "Opis nije unesen."}</Text>

      <Text style={styles.sectionTitle}>Uslovi</Text>
      <Text style={styles.text}>
        {job?.conditions || "Uslovi nisu navedeni."}
      </Text>

      {canApply ? (
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => {
            if (user) {
              navigation.navigate("ApplyScreen", {
                jobId: job.id,
                uid: user.uid,
                employer,
              });
            } else {
              navigation.navigate("LoginScreen");
            }
          }}
          activeOpacity={0.85}
        >
          <Text style={styles.applyButtonText}>📨 Prijavi se</Text>
        </TouchableOpacity>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#e6f0fa",
    flexGrow: 1,
  },
  headerButton: {
    marginRight: 16,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 15,
    borderRadius: 10,
    resizeMode: "contain",
  },
  company: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#274E6D",
  },
  position: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
    color: "#274E6D",
  },
  location: {
    textAlign: "center",
    marginTop: 5,
    color: "#555",
  },
  deadline: {
    textAlign: "center",
    marginTop: 5,
    color: "#555",
  },
  positions: {
    textAlign: "center",
    marginTop: 5,
    marginBottom: 10,
    color: "#555",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#274E6D",
  },
  text: {
    fontSize: 15,
    color: "#333",
    marginBottom: 15,
    lineHeight: 22,
  },
  applyButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#5B8DB8",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 40,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default JobDetailsScreen;
