import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';

import {
    Text, View, StyleSheet,
    TextInput, ScrollView, Button,
} from 'react-native';

const lightGrey = '#4c566a';
const darkGrey = '#2e3440';
const accentBlue = '#81a1c1';

const padding = 10;
const borderRadius = 10;

const PasswordInput = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Password Input</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
                <Text style={styles.descriptionText}>Choose a password:</Text>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputStyling}
                    />
                </View>
            </View>
            <View style={{flexDirection: 'row', alignContent: 'center', marginVertical: 10}}>
                <Ionicons name="information-circle" size={20} color={accentBlue}/>
                <Text style={[styles.descriptionText, {marginLeft: 5}]}>
                    Password must include:
                </Text>
            </View>
        </View>
    );
}

export default PasswordInput;

const styles = StyleSheet.create({
    titleText: {
        marginBottom: padding/2,
        fontSize: 18,
        color: 'white'
    },
    descriptionText: {
        marginBottom: padding/2,
        fontSize: 14,
        color: 'white',
        alignSelf: 'center'
    },
    inputView: {
        backgroundColor: darkGrey,
        borderRadius: borderRadius/2,
        width: '60%',
        marginLeft: 15
    },
    inputStyling: {
        color: "white",
        padding: 5,
    },
    container: {
      backgroundColor: lightGrey,
      paddingHorizontal: padding,
      width: 400,
      height: 300,
      margin: 10,
      borderRadius: borderRadius,
      justifyContent: 'center',
    },
});