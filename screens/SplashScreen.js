import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    let isMounted = true;

    const timer = setTimeout(() => {
      if (isMounted) {
        navigation.replace("HomeScreen");
      }
    }, 5000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/header.png")} style={styles.banner} />

      <Image
        source={require("../assets/headerlogo.png")}
        style={styles.appLogo}
      />

      <View style={styles.partnerContainer}>
        <Image
          source={require("../assets/leplogo.png")}
          style={styles.partnerLogo}
        />
        <Image
          source={require("../assets/logorais.png")}
          style={styles.partnerLogo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B6D8F7",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
  },
  banner: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    marginBottom: -40,
  },
  appLogo: {
    width: 350,
    height: 350,
    resizeMode: "contain",
    marginVertical: 20,
  },
  partnerContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 4,
  },
  partnerLogo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
});

export default SplashScreen;
