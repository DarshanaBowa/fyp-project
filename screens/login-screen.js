import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import languageJSON from "../language.json";
import { AuthStore } from "../stores/auth-store";
export function LoginScreen({ route, navigation }) {
  const { lang } = route.params;
  console.log(lang);
  const setLogin = AuthStore((state) => state.setIsLoggedIn);
  const newloginUser = AuthStore((state) => state.loginUser);

  const screenId = "loginScreen";
  const [transLations, setTransLations] = useState(languageJSON[lang]);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    console.log(transLations[screenId].loginTitle);
  });

  async function loginUser() {
    console.log("email", email, "pass", pass);
    if (email == "bowa@gmail.com" && pass == "bowa") {
      console.log("Successfully logged in");
      await newloginUser();
      await setLogin();
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
