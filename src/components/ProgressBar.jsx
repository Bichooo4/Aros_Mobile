import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export default function ProgressBar ({ progress }) {
  return (
    <View style={styles.progressBarContainer}>
      <Animated.View
        style={[
          styles.bar,
          {
            width: progress.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    width: '80%',
    height: 20,
    backgroundColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
  },
  bar: {
    height: 20,
    backgroundColor: '#4CAF50', 
    borderRadius: 10,
  },
});