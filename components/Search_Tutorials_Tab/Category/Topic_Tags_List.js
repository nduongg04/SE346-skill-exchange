import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {styles} from '../Topic_Tags/Tag_styles'
import TagsButton from '../Topic_Tags/Tags';
import { render } from 'react-dom';
import { FlatList, View } from 'react-native-web';
import Tag_Data from '../Topic_Tags/Tag_Data';

export default TopicTagsList = ()=>{
    render(
        <View>
            <FlatList
            data={Tag_Data}
            renderItem={renderItem}
            horizontal={false} // Đặt horizontal thành false để FlatList hiển thị dọc
            numColumns={2} // Số cột
            keyExtractor={item => item.id}/>
        </View>
    )
}

const renderItem = ({ item }) => (
    <TagsButton name={item.name} />
);
