import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import useFetch from "../hooks/useFetch";
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ({ navigation }) => {
  const id = navigation.getParam("_id");
  const { loading, data } = useFetch(
    `https://menu-lunch-api-miguelromero717.vercel.app/api/meals/${id}`
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text>{data._id}</Text>
          <Text>{data.name}</Text>
          <Text>{data.description}</Text>
          <Button title="Accept" onPress={async () => {
            const token = await AsyncStorage('token')
            fetch(`https://menu-lunch-api-miguelromero717.vercel.app/api/orders`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'authorization': token
              },
              body: JSON.stringify({
                meal_id: id,
                user_id: '112233'
              })
            }).then((t) => {
              if (t.status !== 201)
                return alert('Order could not be generated')
              alert('Order generated successfully')
              navigation.navigate('Meals')
            })
          }}/>
          <Button title="Cancel" onPress={() => navigation.navigate('Meals')}/>
        </>
      )}
    </View>
  );
};
