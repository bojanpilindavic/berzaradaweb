import React from "react";
import { ScrollView, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../components/Header";
import JobCategories from "../components/JobCategories";
import NajnovijiOglasi from "../components/NajnovijiOglasi";
import PretragaOpstina from "../components/PretragaOpstina";
import Footer from "../components/Footer";
import NajtrazenijiOglasi from "../components/NajtrazenijiOglasi";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Header />
        <JobCategories />
        <NajtrazenijiOglasi />
        <NajnovijiOglasi />
        <PretragaOpstina />
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 24,
  },
});
