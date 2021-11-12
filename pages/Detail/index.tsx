import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { WebView } from "react-native-webview";

import mangas from "../../mangas";

const WebViewContainer = ({ uri }: { uri: string }) => (
  <WebView style={styles.container} source={{ uri }} />
);

const Detail = ({ route, navigation }: any) => {
  const [uri, setUri] = useState<string | null>(null);
  const { id } = route.params;
  const manga = mangas[id];
  if (uri) return <WebViewContainer uri={uri} />;
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Image source={{ uri: manga.img }} style={styles.img} />
        <Text style={styles.header1}>
          #{Number(id) + 1} {manga.name}
        </Text>
        <Text>{manga.description}</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            setUri(manga.link);
          }}
        >
          <View style={styles.btn}>
            <Text style={styles.btnText}>Ouvrir</Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8c291",
    flex: 1,
  },
  scrollContainer: {
    marginTop: StatusBar.currentHeight || 10,
    marginBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
  img: {
    height: 300,
    marginBottom: 10,
  },
  header1: {
    fontSize: 38,
    fontWeight: "bold",
  },
  btn: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    padding: 20,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    textAlign: "center",
  },
  btnText: {
    color: "#fff",
  },
});

export default Detail;
