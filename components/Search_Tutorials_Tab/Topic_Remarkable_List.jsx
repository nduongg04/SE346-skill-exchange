import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import Category from "./Category/Category";
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const [data, setData] = useState([]);
const useData = () => {
    const bareUrl = "https://se346-skillexchangebe.onrender.com";
    const limit = 6;
    const page = 1 ;
    useEffect(() => {
        const fetchData = async ()=>{
            const response = await axios({
                method: 'get',
                maxBodyLength: Infinity,
                url: `${bareUrl}/api/v1/topic/pagination?page=${page}&limit=${limit}}`,
                headers: { }
            })
            setData(response.data);
        }
        fetchData();
    }, []);

    return data;
}

const renderItem = ({ item }) => (
    <Category id={item._id} imageUrl={item.imageUrl} name={item.name} />
);

const numColumns = 2;
const Topic_Remarkable_List = () => {
    const data = useData();
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
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
        justifyContent: "center",
        alignItems: "center",
    },
    itemContainer: {
        flex: 1,
        width: 220,
        height: 220,
        margin: 5,
        backgroundColor: "#fff",
    },
    columnWrapper: {
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
});

export default Topic_Remarkable_List;