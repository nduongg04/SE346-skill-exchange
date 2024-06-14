import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    ScrollView,
} from "react-native";
import styles from "../../components/register/style";
import InputText from "../../components/register/Button/InputText";
import BackButton from "../../components/register/Button/BackButton";
import CustomButton from "../../components/register/Button/CustomButton";
import { COLORS } from "../../constants";
import { scale } from "react-native-size-matters";
import React, { useState } from "react";
import { router } from "expo-router";
import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { useSession } from "../../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import PatchData from "../../utils/patchdata";


const ChangeInformation = () => {
    const [skill, setSkill] = useState("");
    const { user, login } = useSession();
    const [isUpdating, setIsUpdating] = useState(false);

    const handleChangeSkillDescription = async () => {
        setIsUpdating(true);
        const baseUrl = "https://se346-skillexchangebe.onrender.com";
        const data = await PatchData(`${baseUrl}/api/v1/user/update/${user.id}`, {
            skill: [skill],
        });
        if (!data || data === "404" || data === "Something went wrong") {
            alert("Something went wrong when updating user's skill");
            setIsUpdating(false);
            return;
        }
        login({
            ...user,
            skill: [skill],
        });
        Alert.alert("Successfully", "Update successfully", [
            {
                text: "OK",
                onPress: () => {
                    router.replace("/profile");
                },
            },
        ]);
        setIsUpdating(false);
    };
    
    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <Stack.Screen
                options={{
                    title: "Change skill description",
                    headerShown: false,
                    headerTitle: "",
                }}
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
                        height: "auto", //554/896
                        width: scale(320), //372/410,
                        padding: 20,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            router.back();
                        }}
                        style={{
                            flexDirection: "row",
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
                    
                    <Text style={[styles.text_center, { marginTop: 10 }]}>
                        CHANGE INFORMATION
                    </Text>
                    <InputText
                        placeholder='Your username'
                        label='Username'
                        error={null}

                    />
                    <InputText
                        placeholder='Your email address'
                        label='Email'
                        error={null} 
                    />
                    <InputText
                        placeholder='Your phone number'
                        label='Phone Number'
                        error={null}
                        keyboardType='numeric'
                    />
                    <TouchableOpacity>
                        <InputText
                            placeholder='Your birthday'
                            label='Birthday'
                            error={null}
                            editable={false}
                            value={"Your Birthday"}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            backgroundColor: COLORS.orange,
                            borderRadius: 27,
                            alignSelf: "flex-end",
                            paddingHorizontal: 20,
                            paddingVertical: 7,
                            marginTop: 16,
                        }}
                        
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: 16,
                                color: COLORS.white,
                            }}
                        >
                            Change
                        </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default ChangeInformation;