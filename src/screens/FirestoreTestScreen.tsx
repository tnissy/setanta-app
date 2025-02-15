// src/screens/FirestoreTestScreen.tsx
import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, ScrollView } from 'react-native';
import app from '../firebaseConfig';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const db = getFirestore(app);

const FirestoreTestScreen: React.FC = () => {
  const [docs, setDocs] = useState<any[]>([]);

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
});

export default FirestoreTestScreen;