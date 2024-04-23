import React from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import Data from "./Data_Topic_List";
import { render } from "react-dom";
import Category from "./Category/Category";

const renderItem = ({ item }) => (
	<Category id={item._id} imageUri={item.imageUrl} name={item.name} />
);

const Topic_List = () => {
	return (
		<View style={styles.container}>
			<FlatList
				data={Data}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				horizontal={true}
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
});

export default Topic_List;
