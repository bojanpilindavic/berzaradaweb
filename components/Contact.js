import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Contact = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title} accessibilityRole="header">
          Kontakt
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Biro Istočno Novo Sarajevo</Text>
          <Text style={styles.text}>
            📧 Email: biro.insarajevo@fis.zzzrs.net
          </Text>
          <Text style={styles.text}>📞 Telefon: 057 / 344 – 261</Text>
          <Text style={styles.text}>
            📍 Adresa: Spasovdanska 23, 71123 Istočno Sarajevo
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Biro Istočna Ilidža</Text>
          <Text style={styles.text}>📧 Email: biro.iilidza@fis.zzzrs.net</Text>
          <Text style={styles.text}>📞 Telefon: 057 / 344 – 262</Text>
          <Text style={styles.text}>
            📍 Adresa: Dabrobosanska 26, 71123 Istočna Ilidža
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#B6D8F7",
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
    backgroundColor: "#B6D8F7",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#274E6D",
    marginBottom: 16,
    textAlign: "center",
  },
  section: {
    backgroundColor: "rgba(255,255,255,0.55)",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#274E6D",
    fontWeight: "700",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#274E6D",
    marginBottom: 8,
    lineHeight: 22,
  },
});

export default Contact;
