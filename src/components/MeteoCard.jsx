import React from "react";
import { StyleSheet, Text, View,Image, TouchableOpacity } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

export default function MeteoCard(props) {
<<<<<<< HEAD
=======

  const dynBadStyToday = props.time === 'today' ? [styles.badgeMeteoFocus,styles.focus] : [styles.badgeMeteoDef,styles.default]
  const dynBadStyThreeJ = props.time === 'threeJ' ? [styles.badgeMeteoFocus,styles.focus] : [styles.badgeMeteoDef,styles.default]
  const dynBadStyFiveJ = props.time === 'fiveJ' ? [styles.badgeMeteoFocus,styles.focus] : [styles.badgeMeteoDef,styles.default]

>>>>>>> meteo5
  return (
    <View style={styles.meteoCard}>
      <View style={[styles.frameParent, styles.parentWrapperFlexBox]}>
        <View style={[styles.massifWrap, styles.parentWrapperFlexBox]}>
          <Text style={styles.massifText}>{props.massif}</Text>
        </View>
        <View style={[styles.badgeMeteoParent, styles.parentWrapperFlexBox]}>
          <TouchableOpacity style={[dynBadStyToday[0], styles.badgeFrameFlexBox]} onPress={props.onPress0}>
            <Text style={[dynBadStyToday[1], styles.dayTextBox]}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[dynBadStyThreeJ[0], styles.badgeFrameFlexBox]} onPress={props.onPress3}>
            <Text style={[dynBadStyThreeJ[1], styles.dayTextBox]}>3J</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[dynBadStyFiveJ[0], styles.badgeFrameFlexBox]} onPress={props.onPress5}>
            <Text style={[dynBadStyFiveJ[1], styles.dayTextBox]}>5J</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.frameGroup, styles.frameSpaceBlock]}>
        <View style={[styles.frameContainer, styles.frameSpaceBlock]}>
          <View style={[styles.image32Wrapper, styles.parentWrapperFlexBox]}>
            {/*TODO -- Mise à jour icone */}
            <Image source={{ uri: props.weatherIcon }} style={styles.weatherIcon} />
          </View>
          <View style={[styles.image30Parent, styles.parentWrapperFlexBox]}>
            <FontAwesome name='thermometer-full' size={16} color='#161D46' />
            <FontAwesome name='wind' size={16} color='#161D46' />
          </View>
          <View style={[styles.tempParent, styles.frameSpaceBlock]}>
            <Text style={[styles.temp, styles.tempTypo]}>{props.temp} °C </Text>
            <Text style={[styles.wind, styles.windTypo]}>{props.windSpe}  km/h - {props.windOri} </Text>
          </View>
        </View>
        <View style={styles.beraParent}>
          <Text style={[styles.bera, styles.beraTypo]}>BERA</Text>
          <FontAwesome name='arrow-circle-right' size={16} color='#161D46' />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    menuBottomaddPosition: {
      width: 390,
      left: 0,
      position: "absolute",
      overflow: "hidden",
    },
    iconLayout1: {
      height: 36,
      width: 36,
    },
    iconSpaceBlock: {
      marginLeft: 100,
      overflow: "hidden",
    },
    meteoParentSpaceBlock: {
      padding: 8,
      alignItems: "center",
    },
    parentWrapperFlexBox: {
      alignSelf: "stretch",
      overflow: "hidden",
    },
    massifText: {
      height: 13,
      width: 90,
      textAlign: "left",
      fontSize: 12,
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      fontFamily: "Arial",
      fontWeight: "700",
      color:  "#000",
    },
    badgeFrameFlexBox: {
      paddingVertical: 0,
      flexDirection: "row",
      alignItems: "center",
    },
    dayTextBox: {
      fontFamily: "Arial",
      textAlign: "center",
      fontSize: 12,
      alignSelf: "stretch",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      fontWeight: "700",
      flex: 1,
    },
    frameSpaceBlock: {
      paddingHorizontal: 8,
      alignSelf: "stretch",
      overflow: "hidden",
    },
    tempTypo: {
      height: 15,
      width: 101,
      fontSize: 10,
      fontFamily: "Arial",
      alignItems: "center",
      display: "flex",
      textAlign: "left",
      fontWeight: "700",
    },
    windTypo: {
      marginTop: 4,
      height: 15,
      width: 101,
      fontSize: 10,
      fontFamily: "Arial",
      alignItems: "center",
      display: "flex",
      textAlign: "left",
      fontWeight: "700",
    },
    beraTypo: {
      width: 50,
      height: 24,
      fontSize: 10,
      fontFamily: "Arial",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      fontWeight: "700",
    },
    meteoCardLayout: {
      marginTop: 32,
      height: 88,
      width: 328,
      borderWidth: 1,
      borderColor:  "#000",
      borderStyle: "solid",
      borderRadius: 16,
      padding: 8,
      overflow: "hidden",
    },
    iconLayout: {
      width: 24,
      height: 24,
      overflow: "hidden",
    },
    mto: {
      left: 16,
      fontSize: 24,
      width: 216,
      height: 39,
      alignItems: "center",
      display: "flex",
      textAlign: "left",
      fontFamily: "Arial",
      fontWeight: "700",
      color:  "#fff",
      top: 8,
      position: "absolute",
    },
    starIcon: {
      overflow: "hidden",
    },
    plusCircleIcon: {
      display: "none",
      height: 36,
      width: 36,
    },
    icon: {
      width: 43,
      height: 41,
    },
    menuBottomadd: {
      top: 794,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      height: 50,
      paddingHorizontal: 16,
      paddingVertical: 4,
      justifyContent: "center",
      flexDirection: "row",
      backgroundColor: " #35357f",
      alignItems: "center",
    },
    massifWrap: {
      width: 104,
      padding: 8,
      alignItems: "center",
      flexDirection: "row",
    },
    default: {
      color:  "#fff",
    },
    badgeMeteoFocus: {
      paddingHorizontal: 4,
      width: 54,
      borderRadius: 8,
      paddingVertical: 0,
      height: 16,
      borderWidth: 1,
      borderColor:  "#161D46",
      borderStyle: "solid",
      justifyContent: "center",
      overflow: "hidden",
      backgroundColor:  "#fff",
    },
    focus: {
      color:  "#161D46",
    },
    badgeMeteoDef: {
      paddingHorizontal: 4,
      width: 54,
      borderRadius: 8,
      paddingVertical: 0,
      height: 16,
      borderWidth: 1,
      borderColor:  "#161D46",
      borderStyle: "solid",
      justifyContent: "center",
      overflow: "hidden",
      backgroundColor:  "#161D46",
      marginLeft: 8,
    },
    // badgeMeteo2: {
    //   paddingHorizontal: 4,
    //   width: 54,
    //   borderRadius: 8,
    //   paddingVertical: 0,
    //   height: 16,
    //   borderWidth: 1,
    //   borderColor:  "#000",
    //   borderStyle: "solid",
    //   justifyContent: "center",
    //   overflow: "hidden",
    //   backgroundColor:  "#000",
    //   marginLeft: 8,
    // },
    badgeMeteoParent: {
      marginLeft: 8,
      padding: 8,
      alignItems: "center",
      flexDirection: "row",
    },
    frameParent: {
      height: 30,
      flexDirection: "row",
      alignItems: "center",
    },
    image32Icon: {
      top: 5,
      height: 32,
      width: 32,
      left: 0,
      position: "absolute",
    },
    image32Wrapper: {
      width: 32,
    },
    image30Icon: {
      width: 12,
      height: 16,
    },
    image32Icon1: {
      width: 13,
      height: 8,
      marginTop: 8,
    },
    image30Parent: {
      marginLeft: 8,
      justifyContent: "center",
    },
    temp: {
      color:  "#000",
    },
    wind: {
      color:  "#000",
    },
    tempParent: {
      width: 123,
      paddingVertical: 6,
      marginLeft: 8,
    },
    frameContainer: {
      width: 203,
      paddingVertical: 0,
      flexDirection: "row",
      alignItems: "center",
    },
    bera: {
      color:  "#000",
    },
    beraParent: {
      width: 84,
      justifyContent: "flex-end",
      height: 24,
      marginLeft: 8,
      flexDirection: "row",
      alignItems: "center",
      overflow: "hidden",
    },
    frameGroup: {
      height: 42,
      paddingVertical: 0,
      flexDirection: "row",
      alignItems: "center",
    },
    meteoCard: {
      height: 88,
      width: 328,
      borderWidth: 1,
      borderColor:  "#000",
      borderStyle: "solid",
      borderRadius: 16,
      backgroundColor:  "#fff",
      padding: 8,
      overflow: "hidden",
    },
    badgeMeteo3: {
      paddingHorizontal: 4,
      width: 54,
      borderRadius: 8,
      paddingVertical: 0,
      height: 16,
      borderWidth: 1,
      borderColor:  "#000",
      borderStyle: "solid",
      justifyContent: "center",
      overflow: "hidden",
      backgroundColor:  "#fff",
    },
    temp1: {
      color:  "#fff",
    },
    wind1: {
      color:  "#fff",
    },
    bera1: {
      color:  "#fff",
    },
    meteoCard1: {
      backgroundColor: " #35357f",
    },
    meteoCard2: {
      backgroundColor:  "#fff",
      marginTop: 32,
    },
    meteoCardParent: {
      top: 117,
      height: 677,
      width: 390,
      left: 0,
      position: "absolute",
      overflow: "hidden",
    },
    moreHorizontalIcon: {
      left: 334,
      top: 8,
      position: "absolute",
      width: 24,
    },
    meteoUpdated: {
      backgroundColor: "#161d46",
      width: "100%",
      height: 844,
      overflow: "hidden",
      flex: 1,
    },
    weatherIcon: {
      width: 24,
      height: 24,
      alignSelf:'flex-start',
      shadowColor: '#161D46', // Couleur de l'ombre
      shadowOffset: { width: 0, height: 2 }, // Décalage de l'ombre (horizontale, verticale)
      shadowOpacity: 0.3, // Opacité de l'ombre (0 à 1)
      shadowRadius: 4, // Rayon de l'ombre
  // elevation: 5, // Pour Android voir pour utilsier elevation
    },
  });
