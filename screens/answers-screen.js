import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import languageJSON from "../language.json";
import firebase from "firebase/app";
import { AuthStore } from "../stores/auth-store";
import "firebase/database";
export function AnswersScreen({ route, navigation }) {
  const { lang, item } = route.params;
  const db_path = `questions/${item.key}/answers`;
  console.log(lang);
  const ICN = AuthStore((state) => state.isConsultant);
  const screenId = "answersScreen";
  const [transLations, setTransLations] = useState(languageJSON[lang]);
  const [answers, setAnswers] = useState([]);
  const [isFirstTimeLoading, setIsFirstTimeLoading] = useState(true);
  const [answerText, setAnswerText] = useState("");
  useEffect(() => {
    console.log(transLations[screenId].title);
    let fetchedArray = [];
    async function fetchData() {
      // You can await here
      const dataRef = firebase.database().ref(db_path);
      const snapshot = await dataRef.once("value");
      snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        console.log(childKey, childData);
        fetchedArray.push({
          key: childKey,
          answer: childData.answer,
        });
      });
      setAnswers(fetchedArray);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("questionsList", answers);
    setIsFirstTimeLoading(false);
  }, [answers]);

  useEffect(() => {
    if (!isFirstTimeLoading) {
      // on event
      firebase
        .database()
        .ref(db_path)
        .on("child_added", (snapshot) => {
          const newAnswer = snapshot.val();
          var childKey = snapshot.key;
          console.log("New high score: " + newAnswer.answer, childKey);
          const even = (element) => element.key == childKey;
          console.log(answers.some(even));
          if (!answers.some(even)) {
            const newAnswerObj = {
              key: childKey,
              answer: newAnswer.answer,
            };
            console.log("Adding new valueeee", newAnswerObj);
            setAnswers((oldArray) => [...oldArray, newAnswerObj]);
          }
        });
    }
  }, [isFirstTimeLoading]);

  function addNewAnswer() {
    console.log("Add answer");
    // A post entry.
    var postData = {
      answer: answerText,
    };

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child(db_path).push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates[db_path + "/" + newPostKey] = postData;

    return firebase.database().ref().update(updates);
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      {ICN && (
        <View style={{width: "80%"}}>
          <TextInput
            placeholderTextColor={"#1ebba3"}
            style={{
              height: 60,
              width: "100%",
              margin: 12,
              borderWidth: 3,
              padding: 15,
              borderColor: "#1ebba3",
              borderRadius: 20,
            }}
            placeholder={transLations[screenId].answerPlaceHolderInput}
            onChangeText={setAnswerText}
          ></TextInput>
          <TouchableOpacity
            style={{
              width: "100%",
              backgroundColor: "#000",
              padding: 10,
              borderRadius: 10,
              margin: 5,
            }}
            onPress={() => {
              addNewAnswer();
            }}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
              {transLations[screenId].addAnswerBtn}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={{ fontSize: 25 }}>{transLations[screenId].title}</Text>
      {answers.map((e, i) => (
        <View key={i} style={{ width: "90%" }}>
          <Text style={{ fontSize: 20 }}>
            {i + 1}. {e.answer}
          </Text>
        </View>
      ))}
    </View>
  );
}
