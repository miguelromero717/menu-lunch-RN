import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import ListItem from "../components/ListItem";

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
  const [loading, setLoading] = useState(true);
  const [meals, setMeals] = useState([]);

  const fetchMeals = async () => {
    const response = await fetch(
      "https://menu-lunch-api-miguelromero717.vercel.app/api/meals"
    );
    const data = await response.json();
    setMeals(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={meals}
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
