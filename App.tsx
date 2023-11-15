

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';



const App = () => {
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Step One</Text>
      <Text style={styles.title}>Step Two</Text>
      <Text style={styles.title}>Step Three</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    backgroundColor: 'orange',
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: 'blue',
    backgroundColor: 'grey',
    flex: 1,
    margin: 10
  },
});

export default App;
