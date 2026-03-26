import React, { useMemo, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";

const CATEGORIES = [
  "Turizam i ugostiteljstvo",
  "Tehničke usluge",
  "Transport i logistika",
  "Prehrambena industrija",
  "Građevina i geodezija",
  "Elektrotehnika",
  "Administrativne usluge",
  "Zanatske i lične usluge",
  "Pravo i ekonomija",
  "Prerada i obrada drveta",
  "Ostalo",
];

export default function Category({ selected, onSelect }) {
  const [open, setOpen] = useState(false);

  const label = useMemo(() => selected || "Izaberite kategoriju", [selected]);

  const toggleOpen = useCallback(() => setOpen((prev) => !prev), []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <View style={styles.container}>
      {open && (
        <Pressable
          style={styles.backdrop}
          onPress={close}
          accessibilityRole="button"
          accessibilityLabel="Zatvori listu kategorija"
        />
      )}

      <TouchableOpacity
        style={styles.dropdown}
        onPress={toggleOpen}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Izbor kategorije"
      >
        <Text style={styles.dropdownText} numberOfLines={1}>
          {label}
        </Text>
        <Text style={styles.arrow}>{open ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {open && (
        <View style={styles.optionsContainer}>
          <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={true}>
            {CATEGORIES.map((item, idx) => {
              const isLast = idx === CATEGORIES.length - 1;

              return (
                <TouchableOpacity
                  key={item}
                  onPress={() => {
                    onSelect?.(item);
                    close();
                  }}
                  style={[styles.option, isLast && styles.optionLast]}
                  accessibilityRole="button"
                  accessibilityLabel={`Izaberi kategoriju: ${item}`}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    zIndex: 999,
    position: "relative",
  },

  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  dropdown: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  dropdownText: {
    color: "#333",
    flex: 1,
    paddingRight: 10,
  },

  arrow: {
    color: "#333",
    fontSize: 12,
  },

  optionsContainer: {
    position: "absolute",
    top: 48,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    backgroundColor: "#fff",
    overflow: "hidden",
    zIndex: 1000,
    maxHeight: 260,
  },

  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  optionLast: {
    borderBottomWidth: 0,
  },

  optionText: {
    color: "#111",
  },
});
