import React from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },  
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    alignSelf: 'stretch',
    marginBottom: 10,
    borderRadius: 25,
    paddingHorizontal: 15,
  }
})

export default ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input}/>
      <TextInput style={styles.input}/>
      <Button title="Login" onPress={() => {}} />
      <Button title="Register" onPress={() => {navigation.navigate('Register')}} />
    </View>
  );
};
