import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ExpandableInput from './assets/components/ExpandableInput';
import { useState } from 'react';

export default function App() {
  const [submittedText, setSubmittedText] = useState("");

  const handleSubmission = (result) => {
    setSubmittedText(result);
  }
  return (
    <View style={styles.container}>
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
