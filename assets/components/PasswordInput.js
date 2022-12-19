import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import Unorderedlist from 'react-native-unordered-list';

import { Text, View, StyleSheet, TextInput } from 'react-native';

const lightGrey = '#4c566a';
const darkGrey = '#2e3440';
const accentBlue = '#81a1c1';

const white = '#fff';
const red = '#bf616a';
const orange = '#d08770';
const yellow = '#ebcb8b';
const green = '#a3be8c';

const padding = 10;
const borderRadius = 10;

const barHeight = 10;

const PasswordInput = (props) => {
    const [strengthDescriptor, setStrengthDescriptor] = useState("Insufficient");
    const [barColor, setBarColor] = useState(darkGrey);
    const [barFill, setBarFill] = useState("0%");

    const exceedsCharacterLimit = (str) => {
        let minimumLength = props.minimumCharacters ? props.minimumCharacters : 0;
        return str.length >= minimumLength;
    }

    // Check if string contains mix of upper and lowercase characters.
    // https://stackoverflow.com/questions/70509923/how-do-i-check-if-a-string-contains-both-lowercase-and-uppercase-letters-in-js
    const containsMixUpperLower = (str) => {
        const
        upper = /[A-Z]/.test(str),
        lower = /[a-z]/.test(str);
        return upper && lower;
    }

    // Check if string contains numbers.
    // https://stackoverflow.com/questions/5778020/check-whether-an-input-string-contains-a-number-in-javascript
    const containsNumbers = (str) => {
        return /\d/.test(str);
    }

    // Check if string contains special characters.
    // https://codingbeautydev.com/blog/javascript-check-if-string-contains-special-characters/
    const containsSpecialChars = (str) => {
        const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return specialChars.test(str);
    }

    const fullfillsRequirements = (str) => {
        if (!exceedsCharacterLimit(str))
            return false;

        if (
            props.requireMixedCases &&
            !containsMixUpperLower(str)
        ) return false;

        if (
            props.requireNumbers &&
            !containsNumbers(str)
        ) return false;

        if (
            props.requireSpecialCharacters &&
            !containsSpecialChars(str)
        ) return false;

        return true;
    }

    // Example:
    // Insufficient: 0%, depends
    // Poor: <6 characters, 25% fill
    // Fair: >=6 characters, mix upper+lower, 50% fill
    // Good: >=8 characters, mix upper+lower, numbers, 75% fill
    // Excellent: >=10 characters, mix upper+lower, numbers, special chars 100% fill
    const updateStrengthLevel = (input) => {
        let level = 0;

        // If requirements are not fullfilled, level
        // will be insufficient.
        if(fullfillsRequirements(input)) {
            level++; // Bare minimum. Level 1
            let length = input.length;
            
            // Count amount of rules fulfilled
            let rulesFulfilled = 0;
            if(containsMixUpperLower(input)) rulesFulfilled++;
            if(containsNumbers(input)) rulesFulfilled++;
            if(containsSpecialChars(input)) rulesFulfilled++;
            
            // It is also important that pw is of sufficient length.
            // For each rule fulfilled, increase level if password
            // length is also sufficient.
            if(rulesFulfilled >= 1 && length >= 6) level++;
            if(rulesFulfilled >= 2 && length >= 8) level++;
            if(rulesFulfilled >= 3 && length >= 10) level++;
        }

        setPwLevel(level);
    }

    const setPwLevel = (level) => {
        switch (level) {
            case 1:
                setStrengthDescriptor("Poor");
                setBarColor(red);
                setBarFill("25%");
                break;
            case 2:
                setStrengthDescriptor("Fair");
                setBarColor(orange);
                setBarFill("50%");
                break;
            case 3:
                setStrengthDescriptor("Good");
                setBarColor(yellow);
                setBarFill("75%");
                break;
            case 4:
                setStrengthDescriptor("Excellent");
                setBarColor(green);
                setBarFill("100%");
                break;
            default:
                setStrengthDescriptor("Insufficient");
                setBarColor(darkGrey);
                setBarFill("0%");
                break;
        }
    }

    const styles = StyleSheet.create({
        titleText: {
            marginBottom: padding/2,
            fontSize: 18,
            color: white
        },
        descriptionText: {
            marginBottom: padding/2,
            fontSize: 14,
            color: white,
            alignSelf: 'center'
        },
        inputView: {
            backgroundColor: darkGrey,
            borderRadius: borderRadius/2,
            width: '60%',
            marginLeft: 15
        },
        inputStyling: {
            color: white,
            padding: 5,
        },
        itemText: {
            marginBottom: padding/2,
            fontSize: 12,
            color: white,
        },
        strengthMeter: {
            backgroundColor: darkGrey,
            width: '100%',
            height: barHeight,
            borderRadius: borderRadius/2,
        },
        strengthBar: {
            backgroundColor: barColor,
            width: barFill,
            height: barHeight,
            borderRadius: borderRadius/2,
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
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Password Input</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
                <Text style={styles.descriptionText}>Choose a password:</Text>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputStyling}
                        secureTextEntry={true}
                        onChangeText={input => updateStrengthLevel(input)}
                    />
                </View>
            </View>
            <View style={{flexDirection: 'row', alignContent: 'center', marginTop: 10}}>
                <Ionicons name="information-circle" size={20} color={accentBlue}/>
                <Text style={[styles.descriptionText, {marginLeft: 5}]}>
                    Password must:
                </Text>
            </View>
            <Unorderedlist color={white} style={{marginLeft: 25}}>
                <Text style={styles.itemText}>
                    Be atleast 8 characters long.
                </Text>
            </Unorderedlist>
            <Unorderedlist color={white} style={{marginLeft: 25}}>
                <Text style={styles.itemText}>
                    Contain a special character.
                </Text>
            </Unorderedlist>
            <View style={{marginVertical: 10}}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.descriptionText}>Password strength: </Text>
                    <Text style={[styles.descriptionText, {color: barColor}]}>{strengthDescriptor}</Text>
                </View>
            </View>
            <View style={styles.strengthMeter}>
                <View style={styles.strengthBar}/>
            </View>
        </View>
    );
    
}

export default PasswordInput;