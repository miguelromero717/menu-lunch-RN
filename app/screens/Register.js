import React from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import useForm from '../hooks/useForm'

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
    fetch(
      `https://menu-lunch-api-miguelromero717.vercel.app/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    )
      .then((res) => res.text())
      .then((t) => {
        if (t === "User created successfully")
          return Alert.alert("Success", t, [
            {
              text: "Return to Login",
              onPress: () => navigation.navigate("Login"),
            },
          ]);
        Alert.alert("Error", t);
      });
  };

  const { subscribe, inputs, handleSubmit } = useForm(initialState, onSubmit);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={inputs.email}
        onChangeText={subscribe("email")}
        autoCapitalize={"none"}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={inputs.password}
        onChangeText={subscribe("password")}
        autoCapitalize={"none"}
      />
      <Button title="Send" onPress={handleSubmit} />
      <Button
        title="Return to Login"
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
    </View>
  );
};
