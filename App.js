import React, { useEffect } from "react";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import JobDetailsScreen from "./screens/JobDetailsScreen";
import ApplyScreen from "./screens/ApplyScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import JobAddScreen from "./screens/JobAddScreen";
import EmployerApplicationsScreen from "./screens/EmployerApplicationsScreen";
import WorkerApplicationsScreen from "./screens/WorkerApplicationsScreen";
import CategoryJobsScreen from "./screens/CategoryJobsScreen";
import MunicipalityJobScreen from "./screens/MunicipalityJobScreen";
import JobSearchScreen from "./screens/JobSearchScreen";
import SplashScreen from "./screens/SplashScreen";
import MyJobScreen from "./screens/MyJobScreen";
import SavedJobsScreen from "./screens/SavedJobScreen";
import AdminHome from "./screens/AdminHome";
import AdminJobScreen from "./screens/AdminJobScreen";

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    if (Platform.OS === "web" && typeof document !== "undefined") {
      document.body.style.overflow = "auto";
      document.body.style.overflowY = "auto";
    }
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            headerTintColor: "#75D5C2",
            headerTitleStyle: { color: "#5B8DB8" },
            headerStyle: { backgroundColor: "#FFFFFF" },
          }}
        >
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false, title: "Početna" }}
          />
          <Stack.Screen
            name="JobDetailsScreen"
            component={JobDetailsScreen}
            options={{ title: "Detalji posla" }}
          />
          <Stack.Screen
            name="ApplyScreen"
            component={ApplyScreen}
            options={{ title: "Prijava na oglas" }}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{ title: "Registracija" }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ title: "Prijava" }}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ title: "Moj profil" }}
          />
          <Stack.Screen
            name="JobAddScreen"
            component={JobAddScreen}
            options={{ title: "Dodavanje oglasa" }}
          />
          <Stack.Screen
            name="EmployerApplicationsScreen"
            component={EmployerApplicationsScreen}
            options={{ title: "Moje prijave" }}
          />
          <Stack.Screen
            name="WorkerApplicationsScreen"
            component={WorkerApplicationsScreen}
            options={{ title: "Moje prijave" }}
          />
          <Stack.Screen
            name="CategoryJobsScreen"
            component={CategoryJobsScreen}
            options={{ title: "Pretraga" }}
          />
          <Stack.Screen
            name="MunicipalityJobScreen"
            component={MunicipalityJobScreen}
            options={{ title: "Pretraga" }}
          />
          <Stack.Screen
            name="JobSearchScreen"
            component={JobSearchScreen}
            options={{ title: "Pretraga" }}
          />
          <Stack.Screen
            name="MyJobScreen"
            component={MyJobScreen}
            options={{ title: "" }}
          />
          <Stack.Screen
            name="AdminJobScreen"
            component={AdminJobScreen}
            options={{ title: "" }}
          />
          <Stack.Screen
            name="AdminHome"
            component={AdminHome}
            options={{ title: "Admin Panel", headerShown: false }}
          />
          <Stack.Screen
            name="SavedJobsScreen"
            component={SavedJobsScreen}
            options={{ title: "Sačuvani oglasi" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
