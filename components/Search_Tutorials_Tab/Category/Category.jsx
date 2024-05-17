import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, ImageBackground, View } from 'react-native';
import { router } from "expo-router";


const Category = (props) => {
    const handleOnPress = () => {
        router.push({
            pathname: "/result/[id]",
            params: {
              data: props.name,
            },
        });
    }

    return(
        <TouchableOpacity
        activeOpacity={0.8} onPress={handleOnPress}
        style={{ height: 200, width: 200, marginLeft: 5, marginBottom: 5, borderWidth: 0.5, borderColor: '#dddddd',  borderRadius: 20  }}>
            <View style = {{height:200, width: 200, borderWidth: 0.5, borderColor: '#dddddd',  borderRadius: 20,  overflow: 'hidden' }}>
                <View style ={{flex: 2, }}>
                    <ImageBackground style = {[styles.backgroundImage, {borderRadius: 20}]} source={{ uri: props.imageUri }} resizeMode="cover" onError={(error) => console.log(error)}>
                        <Text style ={styles.fixToImage} numberOfLines={1} ellipsizeMode='tail'>{props.name}</Text>
                    </ImageBackground>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({ 
    fixToImage: {
    position: 'absolute',
      top: '85%', // Điều chỉnh theo yêu cầu
      textAlign: 'center',
      color: 'white', // Màu văn bản 
      fontSize: 20,
      fontWeight: 'bold',
    },
    backgroundImage: {
      width: 200,
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    }
});

export default Category;