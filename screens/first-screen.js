import { StatusBar } from 'expo-status-bar';
import React, { useState ,useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import config from '../language.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function InitialScreen({ navigation }) {
    const radioButtonsData = [{
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'සිංහල',
      value: 'sin'
    }, {
      id: '2',
      label: 'English',
      selected: true,
      value: 'eng'
    }];
    const screenId = "firstScreen";
  
    const [transLations, setTransLations] = useState(config.eng);
    const [lang, setLang] = useState('eng');
    const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  
    async function  onPressRadioButton(radioButtonsArray)  {
      // console.log("Btn press ",radioButtonsArray);
      const result = radioButtonsArray.filter(val => val.selected == true);
      console.log(result);
      console.log(config[result[0].value]);
      setTransLations(config[result[0].value])
  
    // try {
    //     await AsyncStorage.setItem('@storage_Key', result[0].value)
    //   } catch (e) {
    //     // saving error
    //   }

    setLang(result[0].value)
  
      setRadioButtons(radioButtonsArray);
    }
    useEffect(()=>{
      console.log("config,",config.eng);
      
    },[]);
  
    useEffect(()=>{
      // console.log(config);
    },[radioButtons]);
  
    useEffect(()=>{
      console.log("selected translation",transLations);
    },[transLations]);
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 30 }}>{transLations[screenId].title}</Text>
        <View style={{ marginTop: "10%" }}>
          <RadioGroup
            layout='row'
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
          />
        </View>
  
        <TouchableOpacity style={{
          borderWidth: 3, padding: 3, backgroundColor: "#3CB371",
          width: "50%",
          marginTop: "10%",
          alignItems: "center",
          borderRadius: 20, borderColor: "#008000"
        }}
        onPress={() => navigation.navigate({name:'loginScreen',params: { lang: lang }})}
        onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.navigate('loginScreen', {
                lang: lang,
            });
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>{transLations[screenId].button}</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });