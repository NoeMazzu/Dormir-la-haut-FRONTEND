import React from "react";
import  {Image, StyleSheet, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const Slider = (props) => {

//! IMPORTER LES PHOTOS DEPUIS LA BDD

  const gallery = [
    { img: "https://source.unsplash.com/1024x768/?nature" },
    { img: "https://source.unsplash.com/1024x768/?water" },
    { img: "https://source.unsplash.com/1024x768/?girl" },
    { img: "https://source.unsplash.com/1024x768/?tree" },
  ];

return (
    <Carousel
              ref={(c) => { this._carousel = c; }}
              data={gallery}
              renderItem={({item,index})=>{
                return (<Image source={{uri: item.img}}  style={{
                  height: '100%',
                  resizeMode: 'cover',
                  width: '100%',
                }}/>)}}
              sliderWidth={340}
              itemWidth={300}
              loop
              enableMomentum={false}
              ockScrollWhileSnapping={true} 
              autoplay={true}
              autoplayInterval={4000}
            />
)
}

const styles = StyleSheet.create({

});

export default Slider;
