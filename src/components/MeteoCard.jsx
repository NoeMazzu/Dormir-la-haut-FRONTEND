import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";

export default function MeteoCard() {
  return (
    <View style={styles.meteoCard}>
      <View style={[styles.frameParent, styles.parentWrapperFlexBox]}>
        <View style={[styles.lesBaugesWrapper, styles.parentWrapperFlexBox]}>
          <Text style={[styles.lesBauges, styles.lesTypo]}>Les Bauges</Text>
        </View>
        <View style={[styles.badgeMeteoParent, styles.parentWrapperFlexBox]}>
          <View style={[styles.badgeMeteo, styles.badgeFrameFlexBox]}>
            <Text style={[styles.today, styles.todayFlexBox]}>Today</Text>
          </View>
          <View style={[styles.badgeMeteo1, styles.badgeFrameFlexBox]}>
            <Text style={[styles.today1, styles.todayFlexBox]}>3J</Text>
          </View>
          <View style={[styles.badgeMeteo2, styles.badgeFrameFlexBox]}>
            <Text style={[styles.today, styles.todayFlexBox]}>5J</Text>
          </View>
        </View>
      </View>
      <View style={[styles.frameGroup, styles.frameSpaceBlock]}>
        <View style={[styles.frameContainer, styles.frameSpaceBlock]}>
          <View style={[styles.image32Wrapper, styles.parentWrapperFlexBox]}>
            <Image
              style={styles.image32Icon}
              contentFit="cover"
              source={require("../assets/image-32.png")}
            />
          </View>
          <View style={[styles.image30Parent, styles.parentWrapperFlexBox]}>
            <Image
              style={styles.image30Icon}
              contentFit="cover"
              source={require("../assets/image-30.png")}
            />
            <Image
              style={styles.image32Icon1}
              contentFit="cover"
              source={require("../assets/image-321.png")}
            />
          </View>
          <View style={[styles.tempParent, styles.frameSpaceBlock]}>
            <Text style={[styles.temp, styles.tempTypo]}>13°</Text>
            <Text style={[styles.wind, styles.windTypo]}>25 km/h - S/SE</Text>
          </View>
        </View>
        <View style={styles.beraParent}>
          <Text style={[styles.bera, styles.beraTypo]}>BERA</Text>
          <Image
            style={styles.iconLayout}
            contentFit="cover"
            source={require("../assets/arrowrightcircle.png")}
          />
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
      padding: Padding.p_5xs,
      alignItems: "center",
    },
    parentWrapperFlexBox: {
      alignSelf: "stretch",
      overflow: "hidden",
    },
    lesTypo: {
      height: 13,
      width: 90,
      textAlign: "center",
      fontSize: FontSize.size_xs,
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      fontFamily: FontFamily.iBMPlexMonoBold,
      fontWeight: "700",
    },
    badgeFrameFlexBox: {
      paddingVertical: 0,
      flexDirection: "row",
      alignItems: "center",
    },
    todayFlexBox: {
      fontFamily: FontFamily.josefinSansBold,
      textAlign: "center",
      fontSize: FontSize.size_xs,
      alignSelf: "stretch",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      fontWeight: "700",
      flex: 1,
    },
    frameSpaceBlock: {
      paddingHorizontal: Padding.p_5xs,
      alignSelf: "stretch",
      overflow: "hidden",
    },
    tempTypo: {
      height: 15,
      width: 101,
      fontSize: FontSize.size_3xs,
      fontFamily: FontFamily.josefinSansBold,
      alignItems: "center",
      display: "flex",
      textAlign: "left",
      fontWeight: "700",
    },
    windTypo: {
      marginTop: 4,
      height: 15,
      width: 101,
      fontSize: FontSize.size_3xs,
      fontFamily: FontFamily.josefinSansBold,
      alignItems: "center",
      display: "flex",
      textAlign: "left",
      fontWeight: "700",
    },
    beraTypo: {
      width: 50,
      height: 24,
      fontSize: FontSize.size_3xs,
      fontFamily: FontFamily.josefinSansBold,
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
      borderColor: Color.colorBlack,
      borderStyle: "solid",
      borderRadius: Border.br_base,
      padding: Padding.p_5xs,
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
      fontFamily: FontFamily.iBMPlexMonoBold,
      fontWeight: "700",
      color: Color.colorWhite,
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
      borderTopLeftRadius: Border.br_5xs,
      borderTopRightRadius: Border.br_5xs,
      height: 50,
      paddingHorizontal: Padding.p_base,
      paddingVertical: Padding.p_9xs,
      justifyContent: "center",
      flexDirection: "row",
      backgroundColor: Color.colorDarkslateblue_100,
      alignItems: "center",
    },
    lesBauges: {
      color: Color.colorBlack,
    },
    lesBaugesWrapper: {
      width: 104,
      padding: Padding.p_5xs,
      alignItems: "center",
      flexDirection: "row",
    },
    today: {
      color: Color.colorWhite,
    },
    badgeMeteo: {
      paddingHorizontal: Padding.p_9xs,
      width: 54,
      borderRadius: Border.br_5xs,
      paddingVertical: 0,
      height: 16,
      borderWidth: 1,
      borderColor: Color.colorBlack,
      borderStyle: "solid",
      justifyContent: "center",
      overflow: "hidden",
      backgroundColor: Color.colorBlack,
    },
    today1: {
      color: Color.colorBlack,
    },
    badgeMeteo1: {
      paddingHorizontal: Padding.p_9xs,
      width: 54,
      borderRadius: Border.br_5xs,
      paddingVertical: 0,
      height: 16,
      borderWidth: 1,
      borderColor: Color.colorBlack,
      borderStyle: "solid",
      justifyContent: "center",
      overflow: "hidden",
      backgroundColor: Color.colorWhite,
      marginLeft: 8,
    },
    badgeMeteo2: {
      paddingHorizontal: Padding.p_9xs,
      width: 54,
      borderRadius: Border.br_5xs,
      paddingVertical: 0,
      height: 16,
      borderWidth: 1,
      borderColor: Color.colorBlack,
      borderStyle: "solid",
      justifyContent: "center",
      overflow: "hidden",
      backgroundColor: Color.colorBlack,
      marginLeft: 8,
    },
    badgeMeteoParent: {
      marginLeft: 8,
      padding: Padding.p_5xs,
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
      color: Color.colorBlack,
    },
    wind: {
      color: Color.colorBlack,
    },
    tempParent: {
      width: 123,
      paddingVertical: Padding.p_7xs,
      marginLeft: 8,
    },
    frameContainer: {
      width: 203,
      paddingVertical: 0,
      flexDirection: "row",
      alignItems: "center",
    },
    bera: {
      color: Color.colorBlack,
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
      borderColor: Color.colorBlack,
      borderStyle: "solid",
      borderRadius: Border.br_base,
      backgroundColor: Color.colorWhite,
      padding: Padding.p_5xs,
      overflow: "hidden",
    },
    lesBauges1: {
      color: Color.colorWhite,
    },
    badgeMeteo3: {
      paddingHorizontal: Padding.p_9xs,
      width: 54,
      borderRadius: Border.br_5xs,
      paddingVertical: 0,
      height: 16,
      borderWidth: 1,
      borderColor: Color.colorBlack,
      borderStyle: "solid",
      justifyContent: "center",
      overflow: "hidden",
      backgroundColor: Color.colorWhite,
    },
    temp1: {
      color: Color.colorWhite,
    },
    wind1: {
      color: Color.colorWhite,
    },
    bera1: {
      color: Color.colorWhite,
    },
    meteoCard1: {
      backgroundColor: Color.colorDarkslateblue_100,
    },
    meteoCard2: {
      backgroundColor: Color.colorWhite,
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
  });
