import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import languageJSON from "../language.json";
import { AuthStore } from "../stores/auth-store";
import firebase from "firebase/app";
import "firebase/database";
export function HelpScreen({ route, navigation }) {
  const db_path = `questions`;
  const ICN = AuthStore((state) => state.isConsultant);
  const screenId = "helpScreen";
  const [lang, setLanguage] = useState("");
  const [transLations, setTransLations] = useState(null);
  const [questionsList, setQuestionsList] = useState([]);
  const [isFirstTimeLoading, setIsFirstTimeLoading] = useState(true);
  const setLogin = AuthStore((state) => state.setIsLoggedIn);
  const logoutUser = AuthStore((state) => state.logoutUser);
  const setConsultant = AuthStore((state) => state.setIsConsultant);
  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyB6JHjCKGiCjLzlpxA6EHauR1ej-XewSh4",
    authDomain: "smart-farmer-83134.firebaseapp.com",
    databaseURL: "https://smart-farmer-83134-default-rtdb.firebaseio.com",
    projectId: "smart-farmer-83134",
    storageBucket: "smart-farmer-83134.appspot.com",
    messagingSenderId: "731042773866",
    appId: "1:731042773866:web:5d8291efd9fd1feb738313",
    measurementId: "G-4S966RJ35S",
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }

  useEffect(() => {
    // console.log(transLations[screenId].title);
    let fetchedArray = [];

    async function fetchData() {
      const language = await AsyncStorage.getItem("LANGUAGE");
      setLanguage(language);
      // You can await here
      const dataRef = firebase.database().ref(db_path);
      const snapshot = await dataRef.once("value");
      snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        console.log(childKey, childData);
        fetchedArray.push({
          key: childKey,
          question: childData.question,
          questionImg: childData.questionImg,
          answers: [],
        });
      });
      setQuestionsList(fetchedArray);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Lang been setr");
    setTransLations(languageJSON[lang]);
  }, [lang]);

  useEffect(() => {
    console.log("questionsList", questionsList);
    setIsFirstTimeLoading(false);
  }, [questionsList]);

  useEffect(() => {
    if (!isFirstTimeLoading) {
      // on event
      firebase
        .database()
        .ref(db_path)
        .on("child_added", (snapshot) => {
          const newQuestion = snapshot.val();
          var childKey = snapshot.key;
          console.log("New high score: " + newQuestion.question, childKey);
          const even = (element) => element.key == childKey;
          console.log(questionsList.some(even));
          if (!questionsList.some(even)) {
            const newQuestionObj = {
              key: childKey,
              question: newQuestion.question,
              questionImg: newQuestion.questionImg,
              answers: [],
            };
            console.log("Adding new valueeee", newQuestionObj);
            setQuestionsList((oldArray) => [...oldArray, newQuestionObj]);
          }
        });
    }
  }, [isFirstTimeLoading]);

  function addQuestionsToDb() {
    console.log("Add to database");
    if (lang == "eng") {
      firebase.database().ref(db_path).push().set({
        question: "what's the solution?",
        questionImg:
          "https://ag.umass.edu/sites/ag.umass.edu/files/fact-sheets/images/clip_image003.jpg",
        answers: [],
      });
    } else {
      firebase.database().ref(db_path).push().set({
        question: "මෙයට විසඳුම කුමක්ද?",
        questionImg:
          "https://ag.umass.edu/sites/ag.umass.edu/files/fact-sheets/images/clip_image003.jpg",
        answers: [],
      });
    }
  }

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
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        {/* <Text style={{ fontSize: 25 }}>Help Screen</Text> */}
        {!ICN ? (
          <View>
            <TouchableOpacity
              style={{
                width: "90%",
                backgroundColor: "#000",
                padding: 10,
                borderRadius: 10,
                margin: 5,
              }}
              onPress={() => {
                addQuestionsToDb();
              }}
            >
              <Text
                style={{ fontSize: 15, color: "white", textAlign: "center" }}
              >
                {transLations[screenId].postText}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
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
                await setConsultant();
              }}
            >
              <Text style={{ fontSize: 15, color: "white" }}>
                {transLations[screenId].logout}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={{ fontSize: 20 }}>
          {transLations[screenId].previousQuestionText}
        </Text>
        <ScrollView style={{ marginTop: 10 }}>
          {questionsList.map((e, i) => (
            <TouchableOpacity
              style={{ margin: 5 }}
              key={i + "."}
              onPress={() => {
                navigation.navigate({
                  name: "answersScreen",
                  params: { lang: lang, item: e },
                });
              }}
            >
              <View>
                <Text style={{ fontSize: 20, fontWeight: "500" }}>
                  {i + 1 + "."} {e.question}
                </Text>
                <Image
                  style={{ width: 200, height: 200 }}
                  source={{
                    uri: e.questionImg,
                  }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}
