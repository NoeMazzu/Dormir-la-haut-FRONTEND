import { StyleSheet, Text, View, ScrollView } from "react-native";
import MeteoCard from "../components/MeteoCard";
import React, { useEffect, useState } from "react";

export default function MeteoScreen() {
  const massifFavs = ["Chartreuse", "Vanoise","Belledonne","Beaufortain"];
  const [meteoData, setMeteoData] = useState([]);
  const [meteoDataTmp, setMeteoDataTmp] = useState([]);

  useEffect(() => {
    const url = `https://dormir-la-haut-backend.vercel.app/meteo/${massifFavs.join(',')}`;;
    console.log("URL:",url)
    fetch(url)
      .then((response) => (console.log('[RESPONSE_FETCH]',response),response.json()))
      // .then((data) => (setMeteoDataTmp(prevMeteoDataTmp => [...prevMeteoDataTmp, ...data.meteoInfo])))
      .then((data) => setMeteoData(data.meteoInfo));
  }, []);

  console.log("MeteoData:",meteoData)
  const meteoCards = meteoData.map((data, i) => {
    return (
      <MeteoCard
        key={i}
        massif={data.massif}
        weatherIcon={`https://openweathermap.org/img/wn/${data.meteoData[0].data.weatherIcon}@2x.png`}
        temp = {data.meteoData[0].data.temp}
        windSpe = {data.meteoData[0].data.windSpe*3.6}
        windOri = {data.meteoData[0].data.windOri}
      />
    );
  });

  console.log('[METEO_DATA state:',meteoData)

  const updateMeteoByDate = (index) => {
    setMeteoData(prevMeteoData => 
      {
        const updatedMeteoData = [...prevMeteoData];
        const updatedMeteoCard = { ...updatedMeteoData[index] };
        // updatedMeteoCard.meteoData[0].today.temp = updateMeteoData.meteoData[0];
        updatedMeteoData[index] = updatedMeteoCard;
        return updatedMeteoData;
      });
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Météo des massifs</Text>
      {/* Utiliser ScrollView pour permettre le défilement */}
      <ScrollView contentContainerStyle={styles.scrollView}>
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
    paddingTop: 60,
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
    alignItems:'center',
    gap:24,
  },
});
