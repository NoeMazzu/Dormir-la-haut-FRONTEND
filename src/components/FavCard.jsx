import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ImageSourcePropType,
} from "react-native";

const FavCard = ({
  title,
  poiType,
  imageUrl,
}) => {
  return (
    <View style={[styles.meteoCard, styles.meteoCardBorder]}>
      <View style={[styles.titleType, styles.typeFlexBox]}>
        <View style={styles.frameFlexBox}>
          <Text style={[styles.titleText, styles.textTypo]}>{title}</Text>
        </View>
        <View style={[styles.typeFrame, styles.frameFlexBox]}>
          <View style={[styles.typeBadge, styles.typeBadgeFlexBox]}>
            <Text style={[styles.typeText, styles.textTypo]}>{poiType}</Text>
          </View>
        </View>
      </View>
      <ImageBackground
        style={[styles.imageIcon, styles.typeBadgeFlexBox]}
        resizeMode="cover"
        source={{uri: imageUrl}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  meteoCardBorder: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: '#161D46',
    borderStyle: "solid",
  },
  typeFlexBox: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  textTypo: {
    display: "flex",
    fontSize: 12,
    alignItems: "center",
    fontFamily: 'JosefinSansRegular',
  },
  frameFlexBox: {
    padding: 8,
    alignItems: "center",
    alignSelf: "stretch",
    flexDirection: "row",
    overflow: "hidden",
  },
  typeBadgeFlexBox: {
    alignItems: "center",
    overflow: "hidden",
  },
  titleText: {
    fontFamily: 'JosefinSansRegular',
    color: '#161D46',
    textAlign: "left",
    // width: 90,
    height: 15,
  },
  typeText: {
    fontFamily: 'JosefinSansRegular',
    color: 'white',
    textAlign: "center",
    justifyContent: "center",
    flex: 1,
    alignSelf: "stretch",
    paddingTop: 3,
  },
  typeBadge: {
    borderRadius: 8,
    backgroundColor: '#161D46',
    width: 60,
    height: 20,
    paddingHorizontal: 4,
    paddingVertical: 0,
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: '#161D46',
    borderStyle: "solid",
  },
  typeFrame: {
    marginTop: 8,
  },
  titleType: {
    justifyContent: "center",
    overflow: "hidden",
  },
  imageIcon: {
    width: 120,
    alignSelf: "stretch",
    alignItems: "center",
  },
  meteoCard: {
    borderRadius: 16,
    backgroundColor: 'white',
    width: 328,
    height: 88,
    overflow: "hidden",
  },
});

export default FavCard;
