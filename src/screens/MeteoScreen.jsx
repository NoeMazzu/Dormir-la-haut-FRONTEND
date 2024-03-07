import { StyleSheet, Text, View, ScrollView } from "react-native";
import MeteoCard from "../components/MeteoCard";
import React, { useEffect, useState } from "react";

export default function MeteoScreen() {
  const massifFavs = ["Chartreuse", "Vanoise","Belledonne","Beaufortain"];
  const [meteoData, setMeteoData] = useState([]);

  useEffect(() => {
    const url = `https://dormir-la-haut-backend.vercel.app/meteo/${massifFavs.join(',')}`;;
    console.log("URL:",url)
    fetch(url)
      .then((response) => response.json())
      .then((data) => (console.log(data), setMeteoData(data.meteoInfo)));
  }, []);

  console.log("MeteoData:",meteoData)
  const meteoCards = meteoData.map((data, i) => {
    return (
      <MeteoCard
        key={i}
        massif={data.massif}
        weatherIcon={`https://openweathermap.org/img/wn/${data.weatherIcon}@2x.png`}
        temp = {data.temp}
        windSpe = {data.windSpe}
        windOri = {data.windOri}
      />
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Météo des massifs</Text>
      {/* Utiliser ScrollView pour permettre le défilement */}
      <ScrollView style={styles.scrollView}>
        {/* Utiliser la méthode map pour créer un composant MeteoCard pour chaque massif */}
        {meteoCards}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161D46",
    flex: 1,
    width: "100%",
    paddingTop: 40,
    gap: 40,
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
