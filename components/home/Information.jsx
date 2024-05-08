import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";
import { COLORS } from "@constants";
import { Image } from "react-native";
import { BackHeader } from "../../components";
import { Topic } from "../../components";
import { CircleButton } from "../../components";
import { router } from "expo-router";
const Information = ({
	username,
	skill,
	birthDay,
	userTopicSkill,
	avatar,
	imageCerti,
	description,
}) => {
    console.log(userTopicSkill);
	const handleBackButton = () => {
		router.replace("/home");
	};
	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "white",
			}}
		>
			<Stack.Screen
				options={{
					title: "Information",
					headerShown: true,
					headerShadowVisible: true,
					headerTitle: (props) => (
						<BackHeader
							{...props}
							headerText={username}
							handleBackButton={handleBackButton}
						/>
					), 
				}}
			/>
			<View style={styles.buttonContainer}>
				<CircleButton iconUrl={require("@assets/icons/cancel.svg")} />
				<CircleButton iconUrl={require("@assets/icons/tickCircle.svg")} />
			</View>
			<ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
				<View style={styles.container}>
					<View style={styles.avatar}>
						<Image style={{ width: "100%", height: "100%" }} source={avatar} />
					</View>

					<View style={styles.boxContainer}>
						<Text style={styles.headerText}>Description</Text>
						<Text style={styles.detailText}>{description}</Text>

						<Text style={styles.headerText}>Birthday</Text>
						<Text style={styles.detailText}>{birthDay}</Text>
					</View>

					<View style={styles.boxContainer}>
						{skill?.length > 0 ? (
							<>
								<Text style={styles.headerText}>Skill description</Text>
								<View style={styles.skillContainer}>
									{skill?.map((item, index) => (
										<Text key={index} style={styles.detailText}>
											{item}
										</Text>
									))}
								</View>
							</>
						) : null}
						<Text style={styles.headerText}>Topic</Text>
						<View style={styles.topicContainer}>
							{userTopicSkill?.map((topic, index) => (
								<Topic
									key={index}
									style={styles.detailText}
									topicContent={topic}
								/>
							))}
						</View>

						{imageCerti?.length > 0 ? (
							<>
								<Text style={styles.headerText}>Certification</Text>
								<View style={styles.certiContainer}>
									{imageCerti.map((certi, index) => (
										<Image
											key={index}
											source={certi}
											resizeMode="cover"
											style={{ width: "100%", height: 300, borderRadius: 10 }}
										/>
									))}
								</View>
							</>
						) : null}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		// justifyContent: "center",
		gap: 13,
		alignItems: "center",
		paddingVertical: 10,
	},
	avatar: {
		width: 120,
		height: 120,
		borderRadius: 1000,
		shadowColor: COLORS.shadowBlue,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 10,
		overflow: "hidden",
	},
	boxContainer: {
		width: "100%",
		paddingHorizontal: 20,
		paddingVertical: 15,
		gap: 9,
		backgroundColor: COLORS.lightWhite,
		borderRadius: 10,
		shadowColor: COLORS.shadowBlue,
		elevation: 5,
	},
	headerText: {
		fontSize: 14,
		fontFamily: "SegoeUI",
		fontWeight: "bold",
		color: "#606060",
	},
	detailText: {
		fontSize: 15,
		fontFamily: "NotoRegular",
		lineHeight: 15 * 1.5,
	},
	topicContainer: {
		flexDirection: "row",
        flexWrap: "wrap",
		gap: 13,
	},
	skillContainer: {
		flexDirection: "row",
		gap: 13,
	},
	certiContainer: {
		gap: 10,
	},
	buttonContainer: {
		gap: 30,
		paddingBottom: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		bottom: 10,
		zIndex: 100,
		width: "100%",
	},
});

export default Information;
