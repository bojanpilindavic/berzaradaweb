import React, { useCallback } from "react";
import { ScrollView, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CATEGORIES = [
  {
    id: 1,
    name: "Turizam i ugostiteljstvo",
    icon: "restaurant-outline",
    color: "#274E6D",
  },
  {
    id: 2,
    name: "Tehničke usluge",
    icon: "construct-outline",
    color: "#274E6D",
  },
  {
    id: 3,
    name: "Transport i logistika",
    icon: "bus-outline",
    color: "#274E6D",
  },
  {
    id: 4,
    name: "Prehrambena industrija",
    icon: "fast-food-outline",
    color: "#274E6D",
  },
  {
    id: 5,
    name: "Građevina i geodezija",
    icon: "business-outline",
    color: "#274E6D",
  },
  {
    id: 6,
    name: "Elektrotehnika",
    icon: "flash-outline",
    color: "#274E6D",
  },
  {
    id: 7,
    name: "Administrativne usluge",
    icon: "document-text-outline",
    color: "#274E6D",
  },
  {
    id: 8,
    name: "Zanatske i lične usluge",
    icon: "hammer-outline",
    color: "#274E6D",
  },
  {
    id: 9,
    name: "Pravo i ekonomija",
    icon: "book-outline",
    color: "#274E6D",
  },
  {
    id: 10,
    name: "Prerada i obrada drveta",
    icon: "leaf-outline",
    color: "#274E6D",
  },
  {
    id: 11,
    name: "Ostalo",
    icon: "ellipsis-horizontal-outline",
    color: "#274E6D",
  },
];

const JobCategories = () => {
  const navigation = useNavigation();

  const handleCategoryPress = useCallback(
    (categoryName) => {
      navigation.navigate("CategoryJobsScreen", { category: categoryName });
    },
    [navigation]
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContent}
    >
      {CATEGORIES.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.category}
          onPress={() => handleCategoryPress(category.name)}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel={`Kategorija: ${category.name}`}
        >
          <Ionicons
            name={category.icon}
            size={30}
            color={category.color || "#274E6D"}
          />
          <Text style={styles.text} numberOfLines={2}>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    marginTop: 10,
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 4,
  },
  category: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    backgroundColor: "#E0F7FA",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    minWidth: 110,
  },
  text: {
    marginTop: 6,
    fontSize: 12,
    textAlign: "center",
    color: "#274E6D",
  },
});

export default JobCategories;
