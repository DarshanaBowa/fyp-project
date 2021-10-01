import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import languageJSON from "../language.json";
import { AuthStore } from "../stores/auth-store";
import RadioGroup from "react-native-radio-buttons-group";
export function LoginScreen({ route, navigation }) {
  const { lang } = route.params;
  console.log(lang);
  const setLogin = AuthStore((state) => state.setIsLoggedIn);
  const newloginUser = AuthStore((state) => state.loginUser);

  const screenId = "loginScreen";
  const [transLations, setTransLations] = useState(languageJSON[lang]);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const setConsultant = AuthStore((state) => state.setIsConsultant)
  const radioButtonsData = [
    {
      id: "1", // acts as primary key, should be unique and non-empty string
      label: "Farmer",
      value: "far",
      selected: true,
    },
    {
      id: "2",
      label: "Consultant",
      value: "con",
    },
  ];
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);

  useEffect(() => {
    console.log(transLations[screenId].loginTitle);
    async function fetchData() {
      try {
        await AsyncStorage.setItem("IS_CONSULTANT", "false");
      } catch (e) {
        // saving error
        throw new Error("Couldn't save the LANGUAGE");
      }
    }
    fetchData();
  }, []);

  async function onPressRadioButton(radioButtonsArray) {
    // console.log("Btn press ",radioButtonsArray);
    const result = radioButtonsArray.filter((val) => val.selected == true);
    console.log(result);

    try {
      if (result[0].value == "far") {
        console.log("Farmerrererer");
        await AsyncStorage.setItem("IS_CONSULTANT", "false");
      } else {
        console.log("consultttaa");
        await AsyncStorage.setItem("IS_CONSULTANT", "true");
      }
    } catch (e) {
      // saving error
      throw new Error("Couldn't save the LANGUAGE");
    }

    setRadioButtons(radioButtonsArray);
  }

  async function loginUser() {
    console.log("email", email, "pass", pass);
    if (email == "bowa@gmail.com" && pass == "bowa") {
      console.log("Successfully logged in");
      await newloginUser();
      await setLogin();
      await setConsultant();
      // navigation.navigate({name:'homeScreen',params: { lang: lang }});
    } else {
      console.log("Credential doesn't match");
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <View style={{ marginTop: "10%" }}>
        <RadioGroup
          layout="row"
          radioButtons={radioButtons}
          onPress={onPressRadioButton}
        />
      </View>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          color: "#1ebba3",
          textAlign: "center",
        }}
      >
        {transLations[screenId].loginTitle}
      </Text>
      <TextInput
        keyboardType="email-address"
        placeholderTextColor={"#1ebba3"}
        style={{
          height: 60,
          width: "80%",
          margin: 12,
          borderWidth: 3,
          padding: 15,
          borderColor: "#1ebba3",
          borderRadius: 20,
        }}
        placeholder={transLations[screenId].emailPlaceHolderInput}
        onChangeText={setEmail}
      />

      <TextInput
        secureTextEntry={true}
        placeholderTextColor={"#1ebba3"}
        style={{
          height: 60,
          width: "80%",
          margin: 12,
          borderWidth: 3,
          padding: 15,
          borderColor: "#1ebba3",
          borderRadius: 20,
        }}
        placeholder={transLations[screenId].pwdPlaceHolderInput}
        onChangeText={setPass}
      />

      <TouchableOpacity
        style={{
          height: 60,
          width: "80%",
          margin: 12,
          borderWidth: 3,
          padding: 15,
          borderColor: "#1ebba3",
          backgroundColor: "#1ebba3",
          borderRadius: 20,
          alignItems: "center",
        }}
        onPress={() => loginUser()}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          {transLations[screenId].button}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
