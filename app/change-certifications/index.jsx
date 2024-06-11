import GradienLayout from "../../components/register/TemplateLayout/GradientLayout";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import styles from "../../components/register/style";

import { COLORS } from "../../constants";
import { scale } from "react-native-size-matters";
import React, { useEffect, useState } from "react";
import CustomButton from "../../components/register/Button/CustomButton";
import { Stack, router } from "expo-router";
import { SafeAreaView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSession } from "../../context/AuthContext";
import PatchData from "../../utils/patchdata";
import { Alert } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

const ChangeCertifications = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	// const { user, login } = useSession();
	const user = {
		_id: "66370dad92bdb2d7e5c22fe6",
		username: "Nguyen Du",
		email: "123@gmail.com",
		phoneNumber: "0987654321",
		avatar:
			"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2Fchinese-chess.jpg?alt=media&token=df5b1f35-f66f-4e65-a832-c06ac6025722",
		imageCerti: [
			"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2Fchinese-chess.jpg?alt=media&token=df5b1f35-f66f-4e65-a832-c06ac6025722",
		],
		description: ["I'm an bilingual"],
		userTopicSkill: [
			{
				_id: "66168dbd7c0f4757e77258dc",
				name: "Management Skills",
				imageUrl:
					"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FManagement%20Skills.png?alt=media&token=b52e7a57-3f02-4045-927b-71d44ae3e249",
				__v: 0,
				id: "66168dbd7c0f4757e77258dc",
			},
			{
				_id: "66168dbd7c0f4757e77258da",
				name: "Writing",
				imageUrl:
					"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FWriting.png?alt=media&token=fba6b09a-871e-4c76-acc7-a7f1b1123ae4",
				__v: 0,
				id: "66168dbd7c0f4757e77258da",
			},
		],
		learnTopicSkill: [
			{
				_id: "66168dbd7c0f4757e77258d4",
				name: "Coding",
				imageUrl:
					"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FCoding.png?alt=media&token=2b9d5877-6edf-4bc6-b0ba-a35f6e5eb2e8",
				__v: 0,
				id: "66168dbd7c0f4757e77258d4",
			},
			{
				_id: "66168dbd7c0f4757e77258ce",
				name: "Leadership Skills",
				imageUrl:
					"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FLeadership%20Skills.png?alt=media&token=c9141fb4-756b-4a2d-96e4-3a9d736392d7",
				__v: 0,
				id: "66168dbd7c0f4757e77258ce",
			},
			{
				_id: "66168dbd7c0f4757e77258cc",
				name: "Electronics",
				imageUrl:
					"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FElectronics.png?alt=media&token=249f9898-c5d1-4d62-8b5d-320dbc7e6e4a",
				__v: 0,
				id: "66168dbd7c0f4757e77258cc",
			},
			{
				_id: "66168aa3f909b4d3937cd57a",
				name: "Artificial Intelligence Programming",
				imageUrl:
					"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FArtificial%20Intelligence%20Programming.png?alt=media&token=3accd6fe-5296-4e68-94e4-eefe98660110",
				__v: 0,
				id: "66168aa3f909b4d3937cd57a",
			},
			{
				_id: "66168ac2f909b4d3937cd57e",
				name: "Artistic Photography Techniques",
				imageUrl:
					"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FArtistic%20Photography%20Techniques.png?alt=media&token=77fbaf45-5bbc-48d8-b65c-7dbaaab52e24",
				__v: 0,
				id: "66168ac2f909b4d3937cd57e",
			},
			{
				_id: "66168ad3f909b4d3937cd581",
				name: "Assessment Techniques",
				imageUrl:
					"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FAssessment%20Techniques.png?alt=media&token=4e5db0b9-9ef7-47bf-9fa9-c9dc3d851d9a",
				__v: 0,
				id: "66168ad3f909b4d3937cd581",
			},
			{
				_id: "66168ae5f909b4d3937cd584",
				name: "Automotive Techniques",
				imageUrl:
					"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FAutomotive%20Techniques.png?alt=media&token=4d26cebd-28d6-4990-bd05-664df548ebf8",
				__v: 0,
				id: "66168ae5f909b4d3937cd584",
			},
			{
				_id: "66168b49f909b4d3937cd58a",
				name: "Blogging",
				imageUrl:
					"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FBlogging.png?alt=media&token=357ee27e-f997-49e2-9aba-7b24e33ac93c",
				__v: 0,
				id: "66168b49f909b4d3937cd58a",
			},
			{
				_id: "66168b5bf909b4d3937cd58d",
				name: "Broadcasting and Television Techniques",
				imageUrl:
					"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FBroadcasting%20and%20Television%20Techniques.png?alt=media&token=26194509-cb3b-46ef-8b1c-1c66cc4451b7",
				__v: 0,
				id: "66168b5bf909b4d3937cd58d",
			},
			{
				_id: "66168b3af909b4d3937cd587",
				name: "Bicycle Repair Techniques",
				imageUrl:
					"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FBicycle%20Repair%20Techniques.png?alt=media&token=5ae9aed7-5e08-48ee-89f9-d9f3f1afc802",
				__v: 0,
				id: "66168b3af909b4d3937cd587",
			},
			{
				_id: "66168bc5f909b4d3937cd590",
				name: "Business",
				imageUrl:
					"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FBusiness.png?alt=media&token=51a607a9-0056-4fb3-98cf-e0910f575f59",
				__v: 0,
				id: "66168bc5f909b4d3937cd590",
			},
		],
		skill: ["English"],
		birthDay: "2004-08-11T00:00:00.000Z",
	};

	const handleChangeCertifications = () => {};
	return (
		<SafeAreaView
			style={{
				flex: 1,
				width: "100%",
				height: "100%",
				backgroundColor: COLORS.white,
			}}
		>
			<Stack.Screen options={{ headerShown: false }} />
			<Spinner
				visible={isLoading}
				textContent={"Loading certifications..."}
				textStyle={{ color: "#FFF" }}
			/>
			<Spinner
				visible={isUpdating}
				textContent={"Updating..."}
				textStyle={{ color: "#FFF" }}
			/>
			<LinearGradient
				style={{
					flex: 1,
					backgroundColor: "#fff",
					alignItems: "center",
					justifyContent: "center",
				}}
				colors={["#FFBE98", "#7751C7"]}
			>
				<View
					style={{
						backgroundColor: "#fff",
						borderRadius: 30,
						height: scale(565), //554/896
						width: scale(320), //372/410,
						paddingTop: 25,
					}}
				>
					<View
						style={{
							flex: 1,
							height: "100%",
						}}
					>
						<TouchableOpacity
							onPress={() => {
								router.back();
							}}
							style={{
								flexDirection: "row",
								marginLeft: scale(20),
								alignItems: "center",
							}}
						>
							<AntDesign
								name="arrowleft"
								size={16}
								color={COLORS.orange}
								style={{ marginRight: 5 }}
							/>
							<Text
								style={{
									fontSize: 14,
									fontFamily: "CodaRegular",
									color: COLORS.orange,
								}}
							>
								Back
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={{
								backgroundColor: COLORS.orange,
								borderRadius: 27,
								alignSelf: "center",
								paddingHorizontal: 30,
								paddingVertical: 10,
							}}
						>
							<Text
								style={{
									textAlign: "center",
									fontSize: 16,
									color: COLORS.white,
								}}
							>
								Upload image
							</Text>
						</TouchableOpacity>

						<View
							style={{
								height: 4,
								backgroundColor: COLORS.purple,
								borderRadius: 50,
								width: 120,
								alignSelf: "center",
								margin: 15,
							}}
						/>

						<View
							style={{
								height: scale(280),
								alignSelf: "center",
								width: scale(300),
								flexDirection: "column",
								backgroundColor: "red",
							}}
						></View>
						<CustomButton
							text="Done"
							margin={false}
							style={{ alignSelf: "flex-end", marginTop: 20, marginRight: 20 }}
							onPress={handleChangeCertifications}
						/>
					</View>
				</View>
			</LinearGradient>
		</SafeAreaView>
	);
};

export default ChangeCertifications;
