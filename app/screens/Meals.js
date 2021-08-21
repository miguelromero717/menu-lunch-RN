import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import ListItem from "../components/ListItem";
import useFetch from '../hooks/useFetch'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  list: {
    alignSelf: "stretch",
  },
});

const Meals = ({ navigation }) => {

  const {loading, data} = useFetch('https://menu-lunch-api-miguelromero717.vercel.app/api/meals')

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={data}
          keyExtractor={(d) => d._id}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => navigation.navigate("Modal", { _id: item._id })}
              name={item.name}
            />
          )}
        />
      )}
    </View>
  );
};

Meals.navigationOptions = {
  title: "Meals Availables",
};

export default Meals;
