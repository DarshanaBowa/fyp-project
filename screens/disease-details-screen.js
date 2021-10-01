import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import languageJSON from "../language.json";
export function DiseaseDetailsScreen({ route, navigation }) {
  const { lang, itemSelected, typeSelected, diseaseId } = route.params;
  console.log(lang, itemSelected);

  const screenId = "diseaseDetailScreen";
  const [transLations, setTransLations] = useState(languageJSON[lang]);
  const [preventionsList, setPreventionsList] = useState([]);
  useEffect(() => {
    console.log(transLations[screenId].title);
  }, []);

  useEffect(() => {
    console.log(
      "transLations!",
      diseaseId,
      transLations?.diseases[itemSelected][typeSelected],
      itemSelected
    );
    setPreventionsList(
      transLations?.diseases[itemSelected][typeSelected].find(
        (x) => x.id == diseaseId
      ).preventionsList
    );
  }, [transLations]);

  const preventionsList1 = [
    "Start with certified, disease free seed. Seed produced in arid areas and tested for freedom from Halo blight should be used.",
    "Cultivars with resistance are available.",
    "Rotate to non-host crops for 2-4 years.",
    "Promptly incorporate bean debris after harvest to encourage decomposition.",
    "Eliminate weeds and volunteer beans that might be potential reservoirs for the bacteria.",
    "Furrow or drip irrigation is preferred to prevent secondary spread of the bacteria.",
    "Avoid cultivation and other traffic through fields when the foliage is wet.",
  ];

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text style={{ fontSize: 30, textAlign: "center", color: "#1ebba3" }}>
        {transLations[screenId].title}
      </Text>
      <ScrollView>
        {preventionsList?.map((item, index) => (
          <Text
            key={index}
            style={{ fontSize: 20, fontWeight: "400", margin: 10 }}
          >
            ✔️ {item}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}
