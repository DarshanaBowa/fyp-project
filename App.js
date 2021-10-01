import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { InitialScreen } from "./screens/first-screen";
import { LoginScreen } from "./screens/login-screen";
import { HomeScreen } from "./screens/home-screen";
import { DiseaseTypeScreen } from "./screens/disease-type-screen";
import { DiseaseDetailsScreen } from "./screens/disease-details-screen";
import { HelpScreen } from "./screens/help-screen";
import { AnswersScreen } from "./screens/answers-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthStore } from "./stores/auth-store";
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const ILI = AuthStore((state) => state.isLoggedIn);
  const ICN = AuthStore((state) => state.isConsultant);
  const setLogin = AuthStore((state) => state.setIsLoggedIn);
  const setConsultant = AuthStore((state) => state.setIsConsultant);

  useEffect(() => {
    console.log("ILI ", ILI, "isConsultant ", ICN);
  });

  useEffect(() => {
    async function fetchData() {
      // You can await here
      await setLogin();
      await setConsultant();
    }
    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, [ILI]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  } else if (!ILI) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="intialScreen" component={InitialScreen} />
          <Stack.Screen name="loginScreen" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else if (!ICN) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="homeScreen" component={HomeScreen} />
          <Stack.Screen
            name="deseaseTypeScreen"
            component={DiseaseTypeScreen}
          />
          <Stack.Screen
            name="diseaseDetailsScreen"
            component={DiseaseDetailsScreen}
          />
          <Stack.Screen name="helpScreen" component={HelpScreen} />
          <Stack.Screen name="answersScreen" component={AnswersScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="helpScreen" component={HelpScreen} />
          <Stack.Screen name="answersScreen" component={AnswersScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
