import { useState } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, Button } from 'react-native';

const lightGrey = '#4c566a';
const darkGrey = '#2e3440';
const accentBlue = '#81a1c1';

const padding = 10;
const borderRadius = 10;

const ExpandableInput = () => {
    // State keeps track of input character amount
    const maxCharacters = 50;
    const [currentCharacters, setCurrentCharacters] = useState(0);

    const updateCounter = (input) => {
        setCurrentCharacters(input.length);
    }

    return(
    <View style={styles.container}>
        <Text style={styles.titleText}>Description</Text>
        <View style={styles.inputView}>
            <ScrollView style={styles.scrollInputView}>
                <TextInput
                    style={styles.inputStyling}
                    multiline={true}
                    onChangeText={input => updateCounter(input)}
                    maxLength={maxCharacters}
                />
            </ScrollView>
            <Text style={styles.characterLimitText}>
                { currentCharacters + "/" + maxCharacters}
            </Text>
        </View>
        <View style={styles.buttonView}>
            <Button onPress={() => {}} title={"DONE"} style={styles.buttonStyle} color={accentBlue}/>
        </View>
    </View>
    );
}

export default ExpandableInput;

const styles = StyleSheet.create({
    titleText: {
        marginBottom: padding/2,
        fontSize: 18,
        color: 'white'
    },
    container: {
      backgroundColor: lightGrey,
      paddingHorizontal: padding,
      width: 400,
      height: 300,
      borderRadius: borderRadius,
      justifyContent: 'center',
    },
    inputView: {
        backgroundColor: darkGrey,
        borderRadius: borderRadius,
        width: '100%',
        height: '65%',
    },
    scrollInputView: {
        padding: padding,
    },
    inputStyling: {
        color: "white",
        marginBottom: 50,
    },
    characterLimitText: {
        alignSelf: 'flex-end',
        margin: borderRadius,
        color: 'white'
    },
    buttonView: {
        marginVertical: padding,
    },
  });