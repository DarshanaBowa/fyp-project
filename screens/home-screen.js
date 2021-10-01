import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import languageJSON from "../language.json";
import { AuthStore } from "../stores/auth-store";
export function HomeScreen({ route, navigation }) {
  const screenId = "homeScreen";
  const setLogin = AuthStore((state) => state.setIsLoggedIn);
  const logoutUser = AuthStore((state) => state.logoutUser);
  const [lang, setLanguage] = useState("");
  const [transLations, setTransLations] = useState(null);
  const [DATA, setVegData] = useState([]);

  const DATA1 = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "Beans",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Tomato",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Cabbage",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28b",
      title: "Spinach",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f6",
      title: "Brinjols",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d7",
      title: "Broccoli",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28",
      title: "Mushrooms",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f",
      title: "Beets",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d",
      title: "Carrots",
    },
  ];

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const language = await AsyncStorage.getItem("LANGUAGE");
      setLanguage(language);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Lang been setr");
    setTransLations(languageJSON[lang]);
  }, [lang]);

  useEffect(() => {
    console.log("transLations!", transLations?.vegetables);
    setVegData(transLations?.vegetables);
  }, [transLations]);

  const Item = ({ title }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate({
          name: "deseaseTypeScreen",
          params: { lang: lang, itemSelected: lang == "eng" ? title.toLowerCase() : "beans" },
        });
      }}
      style={styles.item}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => <Item title={item.title} />;

  if (!transLations) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading....</Text>
        <TouchableOpacity
          style={{ backgroundColor: "red" }}
          onPress={async () => {
            await logoutUser();
            await setLogin();
          }}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "#000",
              padding: 10,
              borderRadius: 10,
              margin: 5,
            }}
            onPress={() => {
              navigation.navigate({
                name: "helpScreen",
                params: { lang: lang },
              });
            }}
          >
            <Text style={{ fontSize: 15, color: "white", textAlign: "center" }}>
              {transLations[screenId].helpBtnText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "#FE3C01",
              padding: 10,
              borderRadius: 10,
              margin: 5,
            }}
            onPress={async () => {
              await logoutUser();
              await setLogin();
            }}
          >
            <Text style={{ fontSize: 15, color: "white" }}>
              {transLations[screenId].logout}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{ flex: 2.5, fontSize: 30, color: "#1ebba3" }}>
          {transLations[screenId].mainTitle}
        </Text>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#1ebba3",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: 300,
    borderRadius: 20,
  },
  title: {
    fontSize: 32,
  },
});
