import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import PasswordInput from './assets/components/PasswordInput';
import ExpandableInput from './assets/components/ExpandableInput';

export default function App() {
  const [submittedPassword, setSubmittedPassword] = useState("");
  const [submittedText, setSubmittedText] = useState("");

  const handleSubmissionPass = (result) => {
    setSubmittedPassword(result);
  }
  const handleSubmissionAbout = (result) => {
    setSubmittedText(result);
  }
  return (
    <View style={styles.container}>

      {/*
      PasswordInput props (all props are optional):
      · minimumCharacters: int - Minimum amount of allowed characters
      · requireNumbers: bool - Is a number required in the password?
      · requireSpecialCharacters: bool - Is a special character required in the password?
      · requireMixedCases: bool - Is a mix of upper and lower case required in the password?
      · title: string - Custom component title
      · buttonTitle: string - Custom title on button
      · handleSubmission: function - Function to recieve input when user presses submit
      */}
      <PasswordInput
        minimumCharacters={4}
        requireNumbers={true}
        requireSpecialCharacters={false}
        requireMixedCases={true}
        handleSubmission={handleSubmissionPass}
      />
      <Text>Submitted password: {submittedPassword}</Text>

      {/*
      ExpandableInput props (all props are optional):
      · maxCharacters: int - Maximum amount of allowed characters
      · title: string - Custom component title
      · buttonTitle: string - Custom title on button
      · handleSubmission: function - Function to recieve input when user presses submit
      */}
      <ExpandableInput
        maxCharacters={150}
        title="Write about yourself"
        buttonTitle="DONE"
        handleSubmission={handleSubmissionAbout}
      />
      <Text>Submitted about: {submittedText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
