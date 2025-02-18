import React from 'react';
import LoginScreen from './src/screens/LoginScreen';
import FirestoreTestScreen from './src/screens/FirestoreTestScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  console.log('App component rendered');
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'ログイン' }}
        />
        <Stack.Screen
          name="Home"
          component={FirestoreTestScreen}
          options={{ title: 'ホーム' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;