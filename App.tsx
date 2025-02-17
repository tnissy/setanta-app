import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import FirestoreTestScreen from './src/screens/FirestoreTestScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App: React.FC = () => {
  console.log('App component rendered');
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="Home" component={FirestoreTestScreen} options={{ title: 'ホーム' }} />
          <Stack.Screen name="Details" component={LoginScreen} options={{ title: 'FirestoreTestScreen' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;