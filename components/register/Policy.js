import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../../constants";
import { scale } from "react-native-size-matters";
import { ScrollView } from "react-native-gesture-handler";

const Policy = ({ 
    onPress
}) => {
    return (
      <View style={[styles.centeredView, { backgroundColor: "rgba(0,0,0,0.5)" }]}>
        <View style={styles.modalView}>
          <Text style={styles.header}>Terms of Service and</Text>
          <Text style={[styles.header, {marginBottom: 10}]}>Privacy Policy</Text>
          <ScrollView 
            style={{flexGrow: 1,
            paddingVertical: 20}}>
            <Text style={styles.text}>
            Welcome to Skill Exchange!

            By accessing or using our service, you agree to be bound by these Terms of Service ("Terms"). Please read these Terms carefully before using our Service.

Use of the Service

You agree to use the Service only for lawful purposes and in accordance with these Terms.
Intellectual Property

The Service and its original content, features, and functionality are owned by [Company Name] and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
User Accounts

You may be required to create an account to access certain features of the Service. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device.
Limitation of Liability

In no event shall [Company Name], nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
Governing Law

These Terms shall be governed and construed in accordance with the laws of [Your Country], without regard to its conflict of law provisions.
Changes

We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
            </Text>
          </ScrollView>
        <BackButton style={{position: 'absolute',bottom: 10}} onPress={onPress}></BackButton>
        </View>
      </View>
    );
  }
export default Policy;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: scale(300),
    height: '70%',
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Coda-Regular",
  },
  text: {
    fontSize: 16,
    textAlign: 'justify',
    paddingHorizontal: 20,
  }
});
