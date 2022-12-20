import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import Unorderedlist from 'react-native-unordered-list';

import { Text, View, StyleSheet, TextInput, Button } from 'react-native';

// Colors based on Nord theme
const lightGrey = '#4c566a';
const darkGrey = '#2e3440';
const accentBlue = '#81a1c1';

const white = '#fff';
const red = '#bf616a';
const orange = '#d08770';
const yellow = '#ebcb8b';
const green = '#a3be8c';

// Visual properties
const padding = 10;
const borderRadius = 10;
const barHeight = 10;

const PasswordInput = (props) => {
    // State for password string
    const [password, setPassword] = useState("");

    // States related to password strength indicators
    const [strengthDescriptor, setStrengthDescriptor] = useState("Insufficient");
    const [barColor, setBarColor] = useState(darkGrey);
    const [barFill, setBarFill] = useState("0%");

    // State for wheter password can be submitted or not
    const [buttonEnabled, setButtonEnabled] = useState(false);

    // Never allow empty passwords
    const minimumCharacters = props.minimumCharacters ? props.minimumCharacters : 1;

    // Check if character limit is reached.
    const exceedsCharacterLimit = (str) => {
        return str.length >= minimumCharacters;
    }

    // Check if string contains mix of upper and lowercase characters.
    // https://stackoverflow.com/questions/70509923/how-do-i-check-if-a-string-contains-both-lowercase-and-uppercase-letters-in-js
    const containsMixUpperLower = (str) => {
        let upper = /[A-Z]/.test(str);
        let lower = /[a-z]/.test(str);
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

    // Verify if requirements are fulfilled
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

    // Update strength level according to rules fulfilled and length.
    // Example:
    // Insufficient: 0%, depends
    // Poor: <6 characters, 25% fill
    // Fair: >=6 characters, mix upper+lower, 50% fill
    // Good: >=8 characters, mix upper+lower, numbers, 75% fill
    // Excellent: >=10 characters, mix upper+lower, numbers, special chars 100% fill
    const updateStrengthLevel = (input) => {
        let fullfills = fullfillsRequirements(input);

        setPassword(input); // Update password string state
        setButtonEnabled(fullfills); // Update enabled status of accept button

        let level = 0; // Level = 0 means not fulfilled

        // If requirements are not fullfilled, level
        // will be insufficient.
        if(fullfills) {
            setButtonEnabled(true);
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
    

    // Set component indicators according to provided strength level
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
            default: // Not fulfilled
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
        buttonView: {
            marginVertical: padding,
        },
        container: {
          backgroundColor: lightGrey,
          paddingHorizontal: padding,
          width: 400,
          height: 350,
          margin: 10,
          borderRadius: borderRadius,
          justifyContent: 'center',
        },
    });

    const componentSubmission = () => {
        // If provided, call parents handleSubmission.
        if(props.handleSubmission)
            props.handleSubmission(password);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{props.title ?? "Enter password"}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
                <Text style={styles.descriptionText}>Choose a password:</Text>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputStyling}
                        secureTextEntry={true}
                        value={password}
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
                    Be atleast {minimumCharacters} characters long.
                </Text>
            </Unorderedlist>
            {
                props.requireNumbers ? 
                    <Unorderedlist color={white} style={{marginLeft: 25}}>
                        <Text style={styles.itemText}>
                            Contain a number.
                        </Text>
                    </Unorderedlist>
                    : 
                    null
            }
            {
                props.requireSpecialCharacters ? 
                    <Unorderedlist color={white} style={{marginLeft: 25}}>
                        <Text style={styles.itemText}>
                            Contain a special character.
                        </Text>
                    </Unorderedlist>
                    : 
                    null
            }
            {
                props.requireMixedCases ? 
                    <Unorderedlist color={white} style={{marginLeft: 25}}>
                        <Text style={styles.itemText}>
                            Contain a mix of uppercase and lowercase characters.
                        </Text>
                    </Unorderedlist>
                    : 
                    null
            }
            <View style={{marginVertical: 10}}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.descriptionText}>Password strength: </Text>
                    <Text style={[styles.descriptionText, {color: barColor}]}>{strengthDescriptor}</Text>
                </View>
            </View>
            <View style={styles.strengthMeter}>
                <View style={styles.strengthBar}/>
            </View>
            <View style={styles.buttonView}>
                <Button
                    onPress={() => componentSubmission()}
                    title={props.buttonTitle ?? "ACCEPT PASSWORD"}
                    style={styles.buttonStyle}
                    color={accentBlue}
                    disabled={!buttonEnabled}
                />
            </View>
        </View>
    );
    
}

export default PasswordInput;