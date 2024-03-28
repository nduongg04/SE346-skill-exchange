import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Data from "./Data_Topic_List";



const renderItem = ({ item }) => (
    <ListItem category={item.Category} />
);

const numColumns = 2;
const Topic_Remarkable_List = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={Data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={numColumns}
                columnWrapperStyle={styles.columnWrapper}
                horizontal={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContainer: {
        flex: 1,
        width: 220,
        height: 220,
        margin: 5,
        backgroundColor: '#fff',
    },
    columnWrapper: {
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});

export default  Topic_Remarkable_List ;