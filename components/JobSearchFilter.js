import React, { useMemo, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const dummyJobs = [
  { id: "1", firma: "Firma A", position: "Programer", location: "Beograd" },
  { id: "2", firma: "Firma B", position: "Dizajner", location: "Novi Sad" },
  { id: "3", firma: "Firma C", position: "Menadžer", location: "Beograd" },
];

const LOCATIONS = ["Beograd", "Novi Sad"];

const JobSearchFilter = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const filteredJobs = useMemo(() => {
    return dummyJobs
      .filter(
        (job) =>
          job.firma.toLowerCase().includes(searchText.toLowerCase()) ||
          job.position.toLowerCase().includes(searchText.toLowerCase())
      )
      .filter((job) =>
        selectedLocation ? job.location === selectedLocation : true
      );
  }, [searchText, selectedLocation]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Pretraži posao..."
        value={searchText}
        onChangeText={setSearchText}
        style={styles.input}
        placeholderTextColor="#666"
      />

      <View style={styles.locationsRow}>
        {LOCATIONS.map((location) => {
          const isSelected = selectedLocation === location;

          return (
            <TouchableOpacity
              key={location}
              onPress={() => setSelectedLocation(isSelected ? "" : location)}
              style={[
                styles.locationButton,
                isSelected && styles.locationButtonActive,
              ]}
              activeOpacity={0.8}
            >
              <Text style={styles.locationButtonText}>{location}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <View style={styles.jobItem}>
            <Text style={styles.jobText}>
              {item.firma} - {item.position} ({item.location})
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nema rezultata.</Text>
        }
      />
    </View>
  );
};

export default JobSearchFilter;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    color: "#111",
    outlineStyle: "none",
  },
  locationsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  locationButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: "gray",
    borderRadius: 8,
  },
  locationButtonActive: {
    backgroundColor: "blue",
  },
  locationButtonText: {
    color: "white",
  },
  jobItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  jobText: {
    color: "#111",
  },
  emptyText: {
    paddingVertical: 20,
    textAlign: "center",
    color: "#666",
  },
});
