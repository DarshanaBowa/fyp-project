import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
import config from "../language.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function DiseaseTypeScreen({ route, navigation }) {
  const { lang } = route.params;
  const screenId = "diseaseTypeScreen";

  const [transLations, setTransLations] = useState(config.eng);
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);

  useEffect(() => {
    console.log("config,", config.eng);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30 }}>{transLations[screenId].title}</Text>

      <TouchableOpacity
        style={{
          borderWidth: 3,
          padding: 3,
          backgroundColor: "#3CB371",
          width: "50%",
          marginTop: "10%",
          alignItems: "center",
          borderRadius: 20,
          borderColor: "#008000",
        }}
        onPress={() =>
          navigation.navigate({ name: "loginScreen", params: { lang: lang } })
        }
      >
        <Text style={{ fontSize: 20, color: "white" }}>
          {transLations[screenId].button}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          borderWidth: 3,
          padding: 3,
          backgroundColor: "#3CB371",
          width: "50%",
          marginTop: "10%",
          alignItems: "center",
          borderRadius: 20,
          borderColor: "#008000",
        }}
        onPress={() =>
          navigation.navigate({ name: "loginScreen", params: { lang: lang } })
        }
      >
        <Text style={{ fontSize: 20, color: "white" }}>
          {transLations[screenId].button}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          borderWidth: 3,
          padding: 3,
          backgroundColor: "#3CB371",
          width: "50%",
          marginTop: "10%",
          alignItems: "center",
          borderRadius: 20,
          borderColor: "#008000",
        }}
        onPress={() =>
          navigation.navigate({ name: "loginScreen", params: { lang: lang } })
        }
      >
        <Text style={{ fontSize: 20, color: "white" }}>
          {transLations[screenId].button}
        </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
