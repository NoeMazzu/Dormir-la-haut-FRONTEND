import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import Carousel from "react-native-snap-carousel";

const Slider = (props) => {
  
  return (
    <Carousel
      ref={(c) => {
        this._carousel = c;
      }}
      data={props.photos}
      renderItem={({ item, index }) => {
        return (
          <Image
            source={{ uri: item.url}}
            style={{
              height: "100%",
              resizeMode: "cover",
              width: "100%",
            }}
          />
        );
      }}
      sliderHeight={props.height ? props.height : 0.01}
      sliderWidth={props.width ? props.width : 0.01}
      itemHeight={props.height ? props.height : 0.01}
      itemWidth={props.width ? props.width : 0.01}
      loop
      enableMomentum={false}
      ockScrollWhileSnapping={true}
      autoplay={props.playing}
      autoplayInterval={4000}
    />
  );
};

const styles = StyleSheet.create({});

export default Slider;
