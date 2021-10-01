import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import config from "../language.json";
import languageJSON from "../language.json";
export function DiseaseTypeScreen({ route, navigation }) {
  const { lang, itemSelected } = route.params;
  const screenId = "diseaseTypeScreen";

  const [transLations, setTransLations] = useState(languageJSON[lang]);
  const [diseasesList, setDiseasesList] = useState([]);
  const [typeSelected, setTypeSelected] = useState("fungus");

  const DATA = {
    fungus: [
      {
        id: "fungus-bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "disease1",
        image:
          "https://previews.123rf.com/images/wisawa222/wisawa2221908/wisawa222190800006/128945071-kidney-bean-with-fungus-very-dangerous.jpg",
        desc: "A bean is the seed of one of several genera of the flowering plant family Fabaceae, which are used as vegetables for human or animal food.",
      },
      {
        id: "fungus-3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "fungus disease2",
        image:
          "https://previews.123rf.com/images/wisawa222/wisawa2221908/wisawa222190800006/128945071-kidney-bean-with-fungus-very-dangerous.jpg",
        desc: "A bean is the seed of one of several genera of the flowering plant family Fabaceae, which are used as vegetables for human or animal food.",
      },
      {
        id: "fungus-58694a0f-3da1-471f-bd96-145571e29d72",
        title: "disease3",
        image:
          "https://previews.123rf.com/images/wisawa222/wisawa2221908/wisawa222190800006/128945071-kidney-bean-with-fungus-very-dangerous.jpg",
        desc: "A bean is the seed of one of several genera of the flowering plant family Fabaceae, which are used as vegetables for human or animal food.",
      },
    ],
    backteria: [
      {
        id: "backteria-bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "backteria disease1",
        image:
          "https://www.gardeningknowhow.com/wp-content/uploads/2017/04/bean-blight.jpg",
        desc: "A bean is the seed of one of several genera of the flowering plant family Fabaceae, which are used as vegetables for human or animal food.",
      },
    ],
    insects: [
      {
        id: "insects-bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "insects disease1",
        image:
          "https://www.growingproduce.com/wp-content/uploads/2014/11/bean-leaf-beetle-for-web.jpg",
        desc: "A bean is the seed of one of several genera of the flowering plant family Fabaceae, which are used as vegetables for human or animal food.",
      },
    ],
    soil: [
      {
        id: "soil-bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "soil disease1",
        image:
          "https://plantvillage-production-new.s3.amazonaws.com/images/pics/000/000/767/original/White_mold_2.jpg?1370528410",
        desc: "A bean is the seed of one of several genera of the flowering plant family Fabaceae, which are used as vegetables for human or animal food.",
      },
    ],
  };

  useEffect(() => {
    console.log("config,", config.eng);
  }, []);

  useEffect(() => {
    console.log("transLations!", transLations?.diseases, itemSelected);
    setDiseasesList(transLations?.diseases[itemSelected]);
  }, [transLations]);

  function selectType(type) {
    setTypeSelected(type);
  }

  const Item = ({ title, image, desc, id }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate({
          name: "diseaseDetailsScreen",
          params: {
            lang: lang,
            itemSelected: itemSelected,
            typeSelected: typeSelected,
            diseaseId: id,
          },
        });
      }}
      style={styles.item}
    >
      <Image
        style={{ width: 200, height: 200 }}
        source={{
          uri: image,
        }}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{desc}</Text>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => (
    <Item image={item.image} title={item.title} desc={item.desc} id={item.id} />
  );

  return (
    <View style={styles.container}>
      <Text style={{ color: "#1ebba3", fontSize: 30 }}>
        {transLations[screenId].title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "90%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            selectType("fungus");
          }}
          style={
            typeSelected == "fungus"
              ? styles.diseaseTypeSelected
              : styles.diseaseType
          }
        >
          <Text style={{ color: "white", fontWeight: "600" }}>
            {transLations[screenId].diseaseType.fungus}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            selectType("backteria");
          }}
          style={
            typeSelected == "backteria"
              ? styles.diseaseTypeSelected
              : styles.diseaseType
          }
        >
          <Text style={{ color: "white", fontWeight: "600" }}>
            {transLations[screenId].diseaseType.backteria}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            selectType("insects");
          }}
          style={
            typeSelected == "insects"
              ? styles.diseaseTypeSelected
              : styles.diseaseType
          }
        >
          <Text style={{ color: "white", fontWeight: "600" }}>
            {transLations[screenId].diseaseType.insects}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            selectType("soil");
          }}
          style={
            typeSelected == "soil"
              ? styles.diseaseTypeSelected
              : styles.diseaseType
          }
        >
          <Text style={{ color: "white", fontWeight: "600" }}>
            {transLations[screenId].diseaseType.soil}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={diseasesList[typeSelected]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  diseaseType: {
    flex: 1,
    backgroundColor: "#1ebba3",
    padding: 10,
    margin: 2,
    textAlign: "center",
  },
  diseaseTypeSelected: {
    flex: 1,
    backgroundColor: "#1D403A",
    padding: 10,
    margin: 2,
    textAlign: "center",
  },
  title: {
    fontSize: 32,
  },
  desc: {
    fontSize: 15,
  },
  item: {
    padding: 10,
    borderBottomWidth: 5,
    backgroundColor: "#E0E0E0",
    margin: 4,
  },
});
