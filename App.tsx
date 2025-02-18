import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './src/screens/LoginScreen';
import TrainingHistoryScreen from './src/screens/TrainingHistoryScreen';
import TrainingRecordScreen from './src/screens/TrainingRecordScreen';
import TrainingPlanScreen from './src/screens/TrainingPlanScreen';

// 型定義
type RootStackParamList = {
  Login: undefined;
  HomeTabs: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Tab Navigator の定義
const HomeTabs: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="History"
        component={TrainingHistoryScreen}
        options={{ title: 'History' }}
      />
      <Tab.Screen
        name="Record"
        component={TrainingRecordScreen}
        options={{ title: 'Record' }}
      />
      <Tab.Screen
        name="Plan"
        component={TrainingPlanScreen}
        options={{ title: 'Plan' }}
      />
    </Tab.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'ログイン' }}
        />
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{ title: 'ホーム' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;