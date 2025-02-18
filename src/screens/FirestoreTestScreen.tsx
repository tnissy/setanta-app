// src/screens/FirestoreTestScreen.tsx
import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import app from '../firebaseConfig';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const db = getFirestore(app);

const FirestoreTestScreen: React.FC = () => {
  const [docs, setDocs] = useState<any[]>([]);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // 書き込み関数: testCollectionにテストデータを追加する
  const writeData = async () => {
    try {
      const docRef = await addDoc(collection(db, 'testCollection'), {
        name: 'Test User',
        age: 30,
        timestamp: new Date().toISOString(),
      });
      console.log('Document written with ID:', docRef.id);
    } catch (e) {
      console.error('Error adding document:', e);
    }
  };

  // 読み込み関数: testCollectionから全データを取得する
  const readData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'testCollection'));
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setDocs(data);
      console.log('Data retrieved:', data);
    } catch (e) {
      console.error('Error reading documents:', e);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="データを書き込む" onPress={writeData} />
      <View style={styles.spacer} />
      <Button title="データを読み込む" onPress={readData} />
      <View style={styles.spacer} />
      {docs.map((doc) => (
        <Text key={doc.id} style={styles.docText}>
          {JSON.stringify(doc, null, 2)}
        </Text>
      ))}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>ログイン画面へ</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  spacer: {
    height: 20,
  },
  docText: {
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default FirestoreTestScreen;