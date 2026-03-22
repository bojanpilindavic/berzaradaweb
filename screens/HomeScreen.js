import React from "react";
import { ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../components/Header";
import JobCategories from "../components/JobCategories";
import NajnovijiOglasi from "../components/NajnovijiOglasi";
import PretragaOpstina from "../components/PretragaOpstina";
import Footer from "../components/Footer";
import NajtrazenijiOglasi from "../components/NajtrazenijiOglasi";

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} edges={["top"]}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
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
