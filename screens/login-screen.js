import React , {useEffect,useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import languageJSON from '../language.json';
export  function LoginScreen({route,navigation}) {
  const { lang } = route.params;
  console.log(lang);

  const screenId = "loginScreen";
  const [transLations, setTransLations] = useState(languageJSON[lang]);

  return (
  <View>
      <Text>{transLations[screenId].title}</Text>
  </View>
  );
}





