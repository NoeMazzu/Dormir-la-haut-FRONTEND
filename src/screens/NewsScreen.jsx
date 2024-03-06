import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import LittleNews from "../components/LittleNews";

const NewsScreen = ({ navigation }) => {
  const [actuData, setActuData] = useState([]);

  useEffect(() => {
    fetch("https://dormir-la-haut-backend.vercel.app/newsApi")
      .then((response) => response.json())
      .then((data) => {
        // Utilise la fonction filter pour éliminer les doublons basés sur le titre
        const uniqueActuData = data.articles.filter(
          (article, index, arr) =>
            index === arr.findIndex((a) => a.title === article.title)
        );

        setActuData(uniqueActuData);
      });
  }, []);

  const actu = actuData.map((data, i) => {
    const limitedDescription =
      data.description.length > 75
        ? data.description.substring(0, 75) + "..."
        : data.description;
    const limitedTitle =
      data.title.length > 40 ? data.title.substring(0, 40) + "..." : data.title;

    return (
      <LittleNews
        key={i}
        title={limitedTitle}
        description={limitedDescription}
      />
    );
  });

  return (
    <View style={styles.filter}>
      <Text style={styles.title}>Actualités</Text>

      {/* Utilisez ScrollView pour permettre le défilement */}
      <ScrollView style={styles.scrollView}>
        {/* Utilisez la méthode map pour créer un composant LittleNews pour chaque actualité */}
        {actu}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  filter: {
    backgroundColor: "#161D46",
    flex: 1,
    width: "100%",
    paddingTop: 40,
  },
  title: {
    color: "#ffffff",
    fontSize: 45,
    marginLeft: 15,
  },
  scrollView: {
    flex: 1,
    marginTop: 10,
  },
});

export default NewsScreen;
