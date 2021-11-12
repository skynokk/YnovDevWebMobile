import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  StatusBar,
} from "react-native";
import mangas from "../../mangas";

const CardContent = ({ manga, i }: any) => (
  <React.Fragment>
    <Image source={{ uri: manga.img }} style={styles.cardImg} />
    <Text style={styles.cardTxt}>
      #{i + 1} {manga.name}
    </Text>
  </React.Fragment>
);

const Home = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {mangas.map((manga, i) => (
          <TouchableWithoutFeedback
            key={i}
            onPress={() => {
              navigation.navigate("detail", { id: i });
            }}
          >
            <View style={styles.card}>
              <CardContent manga={manga} i={i} />
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8c291",
  },
  scrollContainer: {
    marginTop: StatusBar.currentHeight || 10,
    marginBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
  img: {
    width: 305,
    height: 159,
  },
  btn: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    padding: 20,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
  },
  btnText: {
    color: "#fff",
  },
  card: {
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImg: {
    height: 159,
    borderRadius: 15,
    marginBottom: 10,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
  },
  cardTxt: {
    margin: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Home;
