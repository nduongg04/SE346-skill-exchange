import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Tag_Data from './Topic_Tags/Tag_Data';
import TagsButton from './Topic_Tags/Tags';
import { render } from 'react-dom';


const renderItem = ({ item }) => (
    < TagsButton name = {item.name} />
);

const numColumns = 3;
export default Topic_Tags_List = ()=> {
    render(
        <View style={styles.container}>
        <FlatList
            data={Tag_Data}
            renderItem={renderItem}
            horizontal={false}
            numColumns = {numColumns}
            columnWrapperStyle={styles.columnWrapper}
        />
    </View>
    )
}

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
