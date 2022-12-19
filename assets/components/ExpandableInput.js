import { useState } from "react";
import {
    Text, View, StyleSheet,
    TextInput, ScrollView, Button,
    TouchableOpacity, 
} from 'react-native';

const lightGrey = '#4c566a';
const darkGrey = '#2e3440';
const accentBlue = '#81a1c1';

const padding = 10;
const borderRadius = 10;

const collapsedHeight = 100;

const ExpandableInput = (props) => {
    // State keeps track of input character amount and content
    const [content, setContent] = useState("");
    const maxCharacters = props.maxCharacters ?? 300; // Optional prop defaults to 300
    const [currentCharacters, setCurrentCharacters] = useState(0);

    // State to handle if component is expanded or not
    const [expanded, setExpanded] = useState(false);

    // Updates content state and character counter when
    // user inputs data.
    const updateTextState = (input) => {
        setContent(input);
        setCurrentCharacters(input.length);
    }

    const componentSubmission = () => {
        setExpanded(false)

        // If provided, call parents handleSubmission.
        if(props.handleSubmission)
            props.handleSubmission(content);
    }

    // Expanded component is larger, displays the character counter
    // and has a "DONE" button.
    return expanded ?
    (
        <View style={styles.container}>
            <Text style={styles.titleText}>{props.title ?? ""}</Text>
            <View style={styles.inputView}>
                <ScrollView style={styles.scrollInputView}>
                    <TextInput
                        style={styles.inputStyling}
                        multiline={true}
                        value={content}
                        onChangeText={input => updateTextState(input)}
                        maxLength={maxCharacters}
                    />
                </ScrollView>
                <Text style={styles.characterLimitText}>
                    { currentCharacters + "/" + maxCharacters }
                </Text>
            </View>
            <View style={styles.buttonView}>
                <Button
                    onPress={() => componentSubmission()}
                    title={props.buttonTitle ?? "DONE"}
                    style={styles.buttonStyle}
                    color={accentBlue}
                />
            </View>
        </View>
    )
    : // Non expanded component is expanded via component touch. Re-use a lot of styling.
    (
        <TouchableOpacity onPress={() => {setExpanded(true)}}>
            <View style={[styles.container, {height: collapsedHeight}]}>
                <Text style={styles.titleText}>{props.title ?? ""}</Text>
                <View style={[styles.inputView, {height: collapsedHeight / 2}]}>
                    <ScrollView style={[styles.scrollInputView, {height: collapsedHeight / 2}]}>
                        <Text style={{color: 'white'}} numberOfLines={1}>{content}</Text>
                    </ScrollView>
                </View>
            </View>
        </TouchableOpacity>
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