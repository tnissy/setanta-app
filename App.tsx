import React from 'react';
import { View, StyleSheet } from 'react-native';
import FirestoreTestScreen from './src/screens/FirestoreTestScreen'; // 新しいスクリーンをインポート

// Firebase初期化（副作用として実行されるだけで、返り値は使わない）
import './src/firebaseConfig';

const App: React.FC = () => {
  console.log('App component rendered');
  return (
    <View style={styles.container}>
      <FirestoreTestScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;