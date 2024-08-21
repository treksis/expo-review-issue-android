import React from 'react';
import { View, Button, StyleSheet, Platform } from 'react-native';
import * as StoreReview from 'expo-store-review';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {
  const [reviewStatus, setReviewStatus] = React.useState('');

  const checkAvailability = async () => {
    const isAvailable = await StoreReview.isAvailableAsync();
    console.log('Is StoreReview available:', isAvailable);
    setReviewStatus(`StoreReview API available: ${isAvailable}`);

    if (Platform.OS === 'android') {
      const hasAction = await StoreReview.hasAction();
      console.log('Has StoreReview action:', hasAction);
      setReviewStatus(prev => `${prev}\nHas StoreReview action: ${hasAction}`);
    }
  };

  const requestReview = async () => {
    try {
      console.log('Requesting review...');
      await StoreReview.requestReview();
      console.log('Review requested successfully');
      setReviewStatus(prev => `${prev}\nReview requested successfully`);
    } catch (error) {
      console.error('Error:', error);
      setReviewStatus(prev => `${prev}\nError: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Store Review API Test (Android Emulator)</ThemedText>
      <Button title="Check Availability" onPress={checkAvailability} />
      <Button title="Request Review" onPress={requestReview} />
      <ThemedText style={styles.status}>{reviewStatus}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  status: {
    marginTop: 20,
    textAlign: 'center',
  },
});