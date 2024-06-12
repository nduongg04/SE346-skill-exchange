import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Alert,
} from "react-native";
import { useSession } from "../../context/AuthContext";
import { Image } from "expo-image";
import styles from "../../components/register/style";
import { useState } from "react";
import { COLORS } from "../../constants";
import { Stack, router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { scale } from "react-native-size-matters";

const EditMyProfile = () => {
    const { user, login } = useSession();

    const handleEditMyProfile = async () => {
        const baseUrl = "https://se346-skillexchangebe.onrender.com";
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                width: "100%",
                height: "100%",
                backgroundColor: COLORS.white,
            }}
        >
            <Stack.Screen
                options={{
                    title: "Edit your profile",
                    headerShown: false,
                    headerTitle: "",
                }}
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
                        paddingVertical: 25,
                        paddingHorizontal: 20,
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
                    
                    <TouchableOpacity
                        style={{
                            backgroundColor: COLORS.orange,
                            borderRadius: 27,
                            alignSelf: "flex-end",
                            paddingHorizontal: 20,
                            paddingVertical: 7,
                            marginTop: 16,
                        }}
                        onPress={handleChangeAboutYou}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: 16,
                                color: COLORS.white,
                            }}
                        >
                            Done
                        </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default EditMyProfile;