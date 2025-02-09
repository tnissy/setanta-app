// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import UserSettingsScreen from './src/screens/UserSettingsScreen'; // 追加！
import DashboardScreen from './src/screens/DashboardScreen';
import TrainingPlanScreen from './src/screens/TrainingPlanScreen';
import TrainingHistoryScreen from './src/screens/TrainingHistoryScreen';


import { SafeAreaView } from 'react-native';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TrainingPlanScreen/>
    </SafeAreaView>
  );
};

export default App;