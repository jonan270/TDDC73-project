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
      <PasswordInput
        minimumCharacters={4}
        requireNumbers={true}
        requireSpecialCharacters={false}
        requireMixedCases={true}
        handleSubmission={handleSubmissionPass}
      />
      <Text>Submitted password: {submittedPassword}</Text>

      <ExpandableInput
        maxCharacters={150}
        title="Write about yourself"
        buttonTitle="SUBMIT"
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
