import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import useForm from "../hooks/useForm";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    alignSelf: "stretch",
    marginBottom: 10,
    borderRadius: 25,
    paddingHorizontal: 15,
  },
});

export default ({ navigation }) => {
  const initialState = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    fetch(`https://menu-lunch-api-miguelromero717.vercel.app/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.text())
      .then((t) => {
        try {
          return JSON.parse(t);
        } catch {
          throw t;
        }
      })
      .then((t) => {
        AsyncStorage.setItem("token", t.token);
        navigation.navigate("Meals");
      })
      .catch((e) => Alert.alert("Error", e));
  };

  const { subscribe, inputs, handleSubmit } = useForm(initialState, onSubmit);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={inputs.email}
        onChangeText={subscribe("email")}
        autoCapitalize={"none"}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        placeholder="Password"
        value={inputs.password}
        onChangeText={subscribe("password")}
        autoCapitalize={"none"}
      />
      <Button title="Login" onPress={handleSubmit} />
      <Button
        title="Register"
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
    </View>
  );
};
