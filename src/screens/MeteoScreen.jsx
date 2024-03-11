import { StyleSheet, Text, View, ScrollView } from "react-native";
import MeteoCard from "../components/MeteoCard";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function MeteoScreen({navigation}) {
  const user = useSelector((state) => state.user.value);

  const massifFavs = ["Chartreuse", "Vanoise","Belledonne","Beaufortain","Mont Blanc","Bauges","Ecrins"];
  const [meteoData, setMeteoData] = useState([]);
  const [meteoDataTmp, setMeteoDataTmp] = useState([]);
  const [meteoDataTest, setMeteoDataTest] = useState([]);

  useEffect(() => {
    if (user?.token) {
      navigation.navigate("TabNavigator");
    }
  }, []);
  useEffect(() => {
    const url = `https://dormir-la-haut-backend.vercel.app/meteo/${massifFavs.join(',')}`;
    console.log("URL:", url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => 
      {
        setMeteoData(data.meteoInfo);
        setMeteoDataTmp(prevMeteoDataTmp => {
          const newData = [...prevMeteoDataTmp, ...data.meteoInfo];
          return newData
        })
        return data.meteoInfo;
      })        
      .then((patate) =>
      {
        setMeteoDataTest(prevMeteoData => {
          const meteoDay = patate.map(item => ({massif: item.massif, meteoData: item.meteoData[0]}));
          const newData = [...prevMeteoData, ...meteoDay];
          return newData;
      })});;
  }, []);
  
  console.log('[METEODATATMP]:', meteoDataTmp);
  console.log('[METEODATATEST]:', meteoDataTest);

  const updateMeteoByDate = (index,day) => {
    return setMeteoDataTest(prevMeteoData => 
      {
        const updatedMeteoCard = { ...meteoDataTmp[index].meteoData[day] };
        // updatedMeteoCard.meteoData[0].today.temp = updateMeteoData.meteoData[0];
        const updatedPrevMeteoData = [...prevMeteoData];
        updatedPrevMeteoData[index].meteoData = updatedMeteoCard;
        console.log('[PrevMeteoData]', updatedPrevMeteoData[index]);
        return updatedPrevMeteoData;            
      });
  };
  console.log('[METEODATATEST_POSTFUNCTION]:', meteoDataTest[3]);

  const meteoCards = meteoDataTest.map((data, i) => {
    return (
      <MeteoCard
        key={i}
        massif={data.massif}
        weatherIcon={`https://openweathermap.org/img/wn/${data.meteoData.data.weatherIcon}@2x.png`}
        temp = {data.meteoData.data.temp}
        windSpe = {data.meteoData.data.windSpe*3.6}
        windOri = {data.meteoData.data.windOri}
        time = {data.meteoData.time}
        onPress0={() => updateMeteoByDate(i,0)}
        onPress3={() => updateMeteoByDate(i,1)}
        onPress5={() => updateMeteoByDate(i,2)}

      />
    );
  });

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
