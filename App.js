import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import PasswordInput from './assets/components/PasswordInput';
import ExpandableInput from './assets/components/ExpandableInput';

export default function App() {
  const [submittedText, setSubmittedText] = useState("");

  const handleSubmission = (result) => {
    setSubmittedText(result);
  }
  return (
    <View style={styles.container}>
      <PasswordInput
        // minimumCharacters={4}
      />


      <ExpandableInput
        maxCharacters={150}
        title="Write about yourself"
        handleSubmission={handleSubmission}
        buttonTitle="SUBMIT"
      />
      <Text>{submittedText}</Text>
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
