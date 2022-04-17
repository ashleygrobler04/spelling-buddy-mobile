import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as Speech from 'expo-speech'

export default function App() {
  const [word, setWord] = useState('')
  const [input, setInput] = useState('')
  const getWord = () => {
    const url = "https://ashleygrobler04.pythonanywhere.com";
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setWord(data.word)
      })
  }
  useEffect(() => {
    setWord(getWord())
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.info}> Spelling Buddy</Text>
      </View>
      <Text style={styles.info}>We already have your word.
        Click the "listen" option to listen to the word and type what you heard, then click the "submit" option to validate your input</Text>
      <TextInput placeholder='Enter what you heard' accessibilityLabel='Enter what you heard' value={input} onChangeText={(e) => setInput(e)} />
      <TouchableOpacity onPress={() => {
        if (input == word) {
          Alert.alert("Success", "That is the correct spelling.")
          getWord()
          setInput("")
        }
        else if (input != word) {
          Alert.alert("Oops", "That was incorrect. Please try again. If this continues, please ensure your input is lower case and doesn't contain any spaces.")
          setInput("")
        }
      }}>
        <Text> Validate input</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Speech.speak(word)}>
        <Text> Listen</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        for (let i = 0; i < word.length; i++) {
          Speech.speak(word[i])
        }
      }}>
        <Text> Spell current word</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    color: 'white'
  }
});
