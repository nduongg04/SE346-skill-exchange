import GradienLayout from "../../components/register/TemplateLayout/GradientLayout";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import styles from "../../components/register/style";

import { COLORS } from "../../constants";
import { scale } from "react-native-size-matters";
import React from "react";
import BackButton from "../../components/register/Button/BackButton";
import CustomButton from "../../components/register/Button/CustomButton";
import { Stack, router } from "expo-router";
import { SafeAreaView } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const ChangeYourSkills = () => {
	const topics = [
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
			_id: "66168b3af909b4d3937cd587",
			name: "Bicycle Repair Techniques",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FBicycle%20Repair%20Techniques.png?alt=media&token=5ae9aed7-5e08-48ee-89f9-d9f3f1afc802",
			__v: 0,
			id: "66168b3af909b4d3937cd587",
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
			_id: "66168bc5f909b4d3937cd590",
			name: "Business",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FBusiness.png?alt=media&token=51a607a9-0056-4fb3-98cf-e0910f575f59",
			__v: 0,
			id: "66168bc5f909b4d3937cd590",
		},
		{
			_id: "66168dbc7c0f4757e77258ae",
			name: "SEO Techniques",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FSEO%20Techniques.png?alt=media&token=25c9f82f-8e35-46dd-9cc3-6b7867217dc1",
			__v: 0,
			id: "66168dbc7c0f4757e77258ae",
		},
		{
			_id: "66168dbd7c0f4757e77258b0",
			name: "Storytelling Techniques",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FStorytelling%20Techniques.png?alt=media&token=f310a727-7325-4933-b3be-50060fcfd776",
			__v: 0,
			id: "66168dbd7c0f4757e77258b0",
		},
		{
			_id: "66168dbd7c0f4757e77258b2",
			name: "Information Retrieval Skills",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FInformation%20Retrieval%20Skills.png?alt=media&token=7265dc9a-213c-4faf-bd8a-5df052bb9a5c",
			__v: 0,
			id: "66168dbd7c0f4757e77258b2",
		},
		{
			_id: "66168dbd7c0f4757e77258b4",
			name: "Game Development",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FGame%20Development.png?alt=media&token=55eb8063-f018-4ef0-a8f1-4e3de8bdf353",
			__v: 0,
			id: "66168dbd7c0f4757e77258b4",
		},
		{
			_id: "66168dbd7c0f4757e77258b6",
			name: "Financial Analysis Skills",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FFinancial%20Analysis%20Skills.png?alt=media&token=a954b37d-d9bb-40cb-83a6-0587db6c2e10",
			__v: 0,
			id: "66168dbd7c0f4757e77258b6",
		},
		{
			_id: "66168dbd7c0f4757e77258bc",
			name: "Construction Techniques",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FConstruction%20Techniques.png?alt=media&token=1744f29f-273f-4f28-b70b-57e9a631b905",
			__v: 0,
			id: "66168dbd7c0f4757e77258bc",
		},
		{
			_id: "66168dbd7c0f4757e77258be",
			name: "Data Exploration and Analysis Skills",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FData%20Exploration%20and%20Analysis%20Skills.png?alt=media&token=1ee3aae5-8063-4211-a2ab-1da0b59ad175",
			__v: 0,
			id: "66168dbd7c0f4757e77258be",
		},
		{
			_id: "66168dbd7c0f4757e77258c0",
			name: "Self-Care Skills",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FSelf-Care%20Skills.png?alt=media&token=57d0d63f-0c21-4fdc-990b-232ffe0d0e0a",
			__v: 0,
			id: "66168dbd7c0f4757e77258c0",
		},
		{
			_id: "66168dbd7c0f4757e77258c4",
			name: "Graphic Design",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FGraphic%20Design.png?alt=media&token=dbf27530-ba53-4d6f-9a70-11f7d0a2ecff",
			__v: 0,
			id: "66168dbd7c0f4757e77258c4",
		},
		{
			_id: "66168dbd7c0f4757e77258c2",
			name: "Telecommunication Techniques",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FTelecommunication%20Techniques.png?alt=media&token=3f3f1c05-2b1c-45bf-9f0b-ad0c007ab52d",
			__v: 0,
			id: "66168dbd7c0f4757e77258c2",
		},
		{
			_id: "66168dbd7c0f4757e77258c6",
			name: "Time Management",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FTime%20Management.png?alt=media&token=a369dd55-03c2-4c73-afa8-e13d90fda7be",
			__v: 0,
			id: "66168dbd7c0f4757e77258c6",
		},
		{
			_id: "66168dbd7c0f4757e77258c8",
			name: "Culinary Techniques",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FCulinary%20Techniques.png?alt=media&token=3d237fee-3cb7-4a3b-a2f7-95e33b30fc64",
			__v: 0,
			id: "66168dbd7c0f4757e77258c8",
		},
		{
			_id: "66168dbd7c0f4757e77258ca",
			name: "Reading",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FReading.png?alt=media&token=9551a728-c588-4744-ba36-501187f96ae1",
			__v: 0,
			id: "66168dbd7c0f4757e77258ca",
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
			_id: "66168dbd7c0f4757e77258ce",
			name: "Leadership Skills",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FLeadership%20Skills.png?alt=media&token=c9141fb4-756b-4a2d-96e4-3a9d736392d7",
			__v: 0,
			id: "66168dbd7c0f4757e77258ce",
		},
		{
			_id: "66168dbd7c0f4757e77258d0",
			name: "Creativity Skills",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FCreativity%20Skills.png?alt=media&token=db22acf8-5d6e-4ef3-bae4-9939d2ded2c8",
			__v: 0,
			id: "66168dbd7c0f4757e77258d0",
		},
		{
			_id: "66168dbd7c0f4757e77258d2",
			name: "Packaging Techniques",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FPackaging%20Techniques.png?alt=media&token=d13f7960-c762-4d5a-b3cc-0eff71e9a474",
			__v: 0,
			id: "66168dbd7c0f4757e77258d2",
		},
		{
			_id: "66168dbd7c0f4757e77258d4",
			name: "Coding",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FCoding.png?alt=media&token=2b9d5877-6edf-4bc6-b0ba-a35f6e5eb2e8",
			__v: 0,
			id: "66168dbd7c0f4757e77258d4",
		},
		{
			_id: "66168dbd7c0f4757e77258d6",
			name: "Python Programming Skills",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FPython%20Programming%20Skills.png?alt=media&token=9988a02f-7171-4f4e-905b-69ea486aac94",
			__v: 0,
			id: "66168dbd7c0f4757e77258d6",
		},
		{
			_id: "66168dbd7c0f4757e77258d8",
			name: "Mobile Development",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FMobile%20Development.png?alt=media&token=2683e189-ab6f-4b0e-8861-1137f68d3347",
			__v: 0,
			id: "66168dbd7c0f4757e77258d8",
		},
		{
			_id: "66168dbd7c0f4757e77258da",
			name: "Writing",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FWriting.png?alt=media&token=fba6b09a-871e-4c76-acc7-a7f1b1123ae4",
			__v: 0,
			id: "66168dbd7c0f4757e77258da",
		},
		{
			_id: "66168dbd7c0f4757e77258dc",
			name: "Management Skills",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FManagement%20Skills.png?alt=media&token=b52e7a57-3f02-4045-927b-71d44ae3e249",
			__v: 0,
			id: "66168dbd7c0f4757e77258dc",
		},
		{
			_id: "66168dbd7c0f4757e77258de",
			name: "Exercise",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FExercise.png?alt=media&token=d30b5f81-c988-4498-af44-6eabf1bdfdaa",
			__v: 0,
			id: "66168dbd7c0f4757e77258de",
		},
		{
			_id: "66168dbd7c0f4757e77258e0",
			name: "Computer Programming Techniques",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FComputer%20Programming%20Techniques.png?alt=media&token=78eb9554-c49f-4c73-a739-1e33e0808887",
			__v: 0,
			id: "66168dbd7c0f4757e77258e0",
		},
		{
			_id: "66168dbd7c0f4757e77258e2",
			name: "Electrical Techniques",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FElectrical%20Techniques.png?alt=media&token=15ff83d1-6ac9-456e-aedd-ccb248c0418a",
			__v: 0,
			id: "66168dbd7c0f4757e77258e2",
		},
		{
			_id: "66168dbd7c0f4757e77258e4",
			name: "Product Design",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FProduct%20Design.png?alt=media&token=2ecdd3e2-1069-4aec-b53b-18a4dbbffacf",
			__v: 0,
			id: "66168dbd7c0f4757e77258e4",
		},
		{
			_id: "66168dbd7c0f4757e77258b8",
			name: "Personal Development Skills",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FPersonal%20Development%20Skills.png?alt=media&token=b29af8e8-75b1-43ea-bb3a-779205bf2908",
			__v: 0,
			id: "66168dbd7c0f4757e77258b8",
		},
		{
			_id: "66168dbd7c0f4757e77258e8",
			name: "Soft Skills",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FSoft%20Skills.png?alt=media&token=906cbf8a-d563-48ee-9c64-a393d0a5502d",
			__v: 0,
			id: "66168dbd7c0f4757e77258e8",
		},
		{
			_id: "66168dbd7c0f4757e77258ba",
			name: "Software Testing Techniques",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FSoftware%20Testing%20Techniques.png?alt=media&token=5b8e1a25-ea3b-4904-bbfb-f02fe44de158",
			__v: 0,
			id: "66168dbd7c0f4757e77258ba",
		},
		{
			_id: "66168dbe7c0f4757e77258ec",
			name: "Effective Communication Skills",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FEffective%20Communication%20Skills.png?alt=media&token=10d8649b-9c18-43a5-b8f1-6f491473a86b",
			__v: 0,
			id: "66168dbe7c0f4757e77258ec",
		},
		{
			_id: "66168dbe7c0f4757e77258ee",
			name: "Presentation Skills",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FPresentation%20Skills.png?alt=media&token=615f6aba-90c6-4083-b02f-b45bbd982c53",
			__v: 0,
			id: "66168dbe7c0f4757e77258ee",
		},
		{
			_id: "66168dbe7c0f4757e77258f0",
			name: "Music",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FMusic.png?alt=media&token=4e298833-4869-439f-8225-bcb0e7cf5b86",
			__v: 0,
			id: "66168dbe7c0f4757e77258f0",
		},
		{
			_id: "66168dbe7c0f4757e77258f2",
			name: "Networking Skills",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FNetworking%20Skills.png?alt=media&token=b5528ed8-8a09-4fe9-9019-60d7131b20f2",
			__v: 0,
			id: "66168dbe7c0f4757e77258f2",
		},
		{
			_id: "66168dbe7c0f4757e77258f4",
			name: "Repair Techniques",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FRepair%20Techniques.png?alt=media&token=48d80184-1542-4d1a-b611-8c578a9639a5",
			__v: 0,
			id: "66168dbe7c0f4757e77258f4",
		},
		{
			_id: "66168dbe7c0f4757e77258f6",
			name: "Personal Finance",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FPersonal%20Finance.png?alt=media&token=77ee9411-190d-4f0a-a727-fe1a6843bca6",
			__v: 0,
			id: "66168dbe7c0f4757e77258f6",
		},
		{
			_id: "66168dbe7c0f4757e77258f8",
			name: "Marketing",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FMarketing.png?alt=media&token=080b3554-aae3-47c5-a595-f05d3fb145d2",
			__v: 0,
			id: "66168dbe7c0f4757e77258f8",
		},
		{
			_id: "66168dbe7c0f4757e77258fa",
			name: "Football",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FFootball.png?alt=media&token=cf3838ed-4370-462c-bf66-6752e49bc016",
			__v: 0,
			id: "66168dbe7c0f4757e77258fa",
		},
		{
			_id: "66168dbe7c0f4757e77258fc",
			name: "Cooking",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2Fcooking.png?alt=media&token=b77c36ae-54f8-4249-8207-d1c69c3af90a",
			__v: 0,
			id: "66168dbe7c0f4757e77258fc",
		},
		{
			_id: "66168dbe7c0f4757e77258fe",
			name: "Photography",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FPhotography.png?alt=media&token=991956de-b456-4148-9905-37088db1b9a0",
			__v: 0,
			id: "66168dbe7c0f4757e77258fe",
		},
		{
			_id: "66168dbe7c0f4757e7725900",
			name: "Spatial Organization Techniques",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FSpatial%20Organization%20Techniques.png?alt=media&token=5b350ff5-3b29-46f8-a2dd-3ea8d8ea3cab",
			__v: 0,
			id: "66168dbe7c0f4757e7725900",
		},
		{
			_id: "66168dbe7c0f4757e7725902",
			name: "Object-Oriented Programming Skills",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FObject-Oriented%20Programming%20Skills.png?alt=media&token=51b667db-b2fa-4b23-8e67-4c0dd0a8db84",
			__v: 0,
			id: "66168dbe7c0f4757e7725902",
		},
		{
			_id: "66168dbe7c0f4757e7725904",
			name: "Research Techniques",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FResearch%20Techniques.png?alt=media&token=850d0740-182a-4fb0-9a65-19464e45d46a",
			__v: 0,
			id: "66168dbe7c0f4757e7725904",
		},
		{
			_id: "66168dbe7c0f4757e7725906",
			name: "Project Management",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FProject%20Management.png?alt=media&token=913558cf-dc16-463d-9cc7-4a781886ff3c",
			__v: 0,
			id: "66168dbe7c0f4757e7725906",
		},
		{
			_id: "66168dbe7c0f4757e772590a",
			name: "Emotional Intelligence Skills",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FEmotional%20Intelligence%20Skills.png?alt=media&token=3d006d65-0d99-4228-84ee-e6b213dba2da",
			__v: 0,
			id: "66168dbe7c0f4757e772590a",
		},
		{
			_id: "66168dbe7c0f4757e7725908",
			name: "Gardening",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FGardening.png?alt=media&token=0883ad6c-cff8-40eb-b887-657222fcf26a",
			__v: 0,
			id: "66168dbe7c0f4757e7725908",
		},
		{
			_id: "66168dbe7c0f4757e772590c",
			name: "Engineering Techniques",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FEngineering%20Techniques.png?alt=media&token=e34028de-ba4f-411d-9604-e7d5ff495b77",
			__v: 0,
			id: "66168dbe7c0f4757e772590c",
		},
		{
			_id: "66168dbd7c0f4757e77258e6",
			name: "Planning",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FPlanning.png?alt=media&token=053ddff5-aa49-4c76-be24-4c0d606c09a5",
			__v: 0,
			id: "66168dbd7c0f4757e77258e6",
		},
		{
			_id: "66168dbe7c0f4757e7725910",
			name: "Web Development",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FWeb%20Development.png?alt=media&token=cf054f2e-1559-483f-9736-fe8e91bcf27e",
			__v: 0,
			id: "66168dbe7c0f4757e7725910",
		},
		{
			_id: "66168dbe7c0f4757e7725912",
			name: "English Conversation",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FEnglish%20Conversation.png?alt=media&token=5044b2cc-7657-4c6d-9897-848682b7d740",
			__v: 0,
			id: "66168dbe7c0f4757e7725912",
		},
		{
			_id: "66168dbe7c0f4757e7725914",
			name: "Learning a New Language",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FLearning%20a%20New%20Language.png?alt=media&token=49414012-06c0-43c5-9881-ab5f64fc64e6",
			__v: 0,
			id: "66168dbe7c0f4757e7725914",
		},
		{
			_id: "66168dbe7c0f4757e7725918",
			name: "Problem Solving Skills",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FProblem%20Solving%20Skills.png?alt=media&token=2885f2ae-3c91-4c4d-9436-12c7e43dae2d",
			__v: 0,
			id: "66168dbe7c0f4757e7725918",
		},
		{
			_id: "66168dbe7c0f4757e77258ea",
			name: "Travel",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FTravel.png?alt=media&token=ef8a98be-8cc2-4a96-b648-baecf87c65ca",
			__v: 0,
			id: "66168dbe7c0f4757e77258ea",
		},
		{
			_id: "66168dbe7c0f4757e772591a",
			name: "Yoga",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FYoga.png?alt=media&token=d8ec9dff-8d57-4120-a83a-31a27707249c",
			__v: 0,
			id: "66168dbe7c0f4757e772591a",
		},
		{
			_id: "66168dbe7c0f4757e772591c",
			name: "Medicine and Health",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FMedicine%20and%20Health.png?alt=media&token=be448e7e-e984-4ce6-8545-81d11d596238",
			__v: 0,
			id: "66168dbe7c0f4757e772591c",
		},
		{
			_id: "66168dbe7c0f4757e772591e",
			name: "Mathematics",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FMathematics.png?alt=media&token=3140914d-4e6e-446c-8722-802fc357344f",
			__v: 0,
			id: "66168dbe7c0f4757e772591e",
		},
		{
			_id: "66168dbe7c0f4757e7725920",
			name: "Self-Defense Skills",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FSelf-Defense%20Skills.png?alt=media&token=66a8de44-be99-4313-8a06-59c44767badd",
			__v: 0,
			id: "66168dbe7c0f4757e7725920",
		},
		{
			_id: "66168dbe7c0f4757e7725922",
			name: "EngLish",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FEngLish.png?alt=media&token=94015feb-a61a-4a1d-a729-d72794dd8ad0",
			__v: 0,
			id: "66168dbe7c0f4757e7725922",
		},
		{
			_id: "66168dbe7c0f4757e7725924",
			name: "Stress Management Skills",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FStress%20Management%20Skills.png?alt=media&token=ef6c452f-4aa2-41de-833f-9fc8a581fb79",
			__v: 0,
			id: "66168dbe7c0f4757e7725924",
		},
		{
			_id: "66168dbe7c0f4757e7725926",
			name: "Teaching and Instruction Skills",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FTeaching%20and%20Instruction%20Skills.png?alt=media&token=a231d8a8-b1ec-4578-a83b-3267816093f4",
			__v: 0,
			id: "66168dbe7c0f4757e7725926",
		},
		{
			_id: "66168dbe7c0f4757e7725928",
			name: "Teamwork Skills",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FTeamwork%20Skills.png?alt=media&token=89696a94-3752-4693-b384-067d2ef34e72",
			__v: 0,
			id: "66168dbe7c0f4757e7725928",
		},
		{
			_id: "66168dbe7c0f4757e772590e",
			name: "Drawing and Art",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FDrawing%20and%20Art.png?alt=media&token=9a8412d8-af0e-4600-9dc1-d97bd37d703e",
			__v: 0,
			id: "66168dbe7c0f4757e772590e",
		},
		{
			_id: "66168dbe7c0f4757e7725916",
			name: "Video Learning",
			imageUrl:
				"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FVideo%20Learning.png?alt=media&token=539745e5-7514-42b2-a904-2afdbbed23fa",
			__v: 0,
			id: "66168dbe7c0f4757e7725916",
		},
	];

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
			<GradienLayout>
				{/* <Spinner
				// visible={this.state.isLoading}
                visible={true}
				textContent={"Loading topic..."}
				textStyle={{ color: "#FFF" }}
			/> */}
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
					></AntDesign>
					<Text
						style={{
							fontSize: 14,
							fontFamily: "Coda-Regular",
							color: COLORS.orange,
						}}
					>
						Back
					</Text>
				</TouchableOpacity>
				<Text style={[styles.text_center, { marginTop: 10 }]}>
					CHOOSE TOPIC
				</Text>
				<Text style={styles.text_center}>you know</Text>
				<View
					style={{
						height: 4,
						backgroundColor: COLORS.purple,
						borderRadius: 50,
						width: 120,
						alignSelf: "center",
						margin: 15,
					}}
				></View>

				<View
					style={{ height: scale(260), alignSelf: "center", width: scale(300) }}
				>
					<FlatList
						// onEndReached={() => {}}
						// onEndReachedThreshold={0.5}
						data={topics}
						keyExtractor={(item) => item._id}
						renderItem={({ item }) => (
							<TouchableOpacity
								style={
									item.chosen ? styles.topicButtonSelected : styles.topicButton
								}
								onPress={() => {}}
							>
								<Text
									style={
										item.chosen ? styles.topicTextSelected : styles.topicText
									}
									numberOfLines={2}
									ellipsizeMode="tail"
								>
									{item.name}
								</Text>
							</TouchableOpacity>
						)}
						numColumns={2}
					/>
				</View>
				<CustomButton
					text="Next"
					onPress={() => {
						// if (topicID.length === 0) {
						// 	alert("Please choose at least one topic");
						// 	return;
						// }
						// console.log(params);
						// this.props.navigation.navigate("UploadInfo", params);
					}}
				/>
			</GradienLayout>
		</SafeAreaView>
	);
};

export default ChangeYourSkills;
