// src/screens/TrainingRecordScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// Firestore にデータを書き込むためのメソッドをインポート
import { collection, addDoc, Timestamp } from 'firebase/firestore';
// 自分のfirebaseConfigから `db` をインポート
import { db } from '../firebaseConfig'; 

const TrainingRecordScreen: React.FC = () => {
  // 入力データを管理するためのステート
  const [exerciseName, setExerciseName] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [notes, setNotes] = useState('');

  // Firestore に書き込む関数
  const handleSaveRecord = async () => {
    try {
      // addDocを使う場合はコレクション名を指定
      // 例: "trainingRecords" コレクションを作成してそこに格納するイメージ
      await addDoc(collection(db, 'trainingRecords'), {
        exerciseName,
        weight: Number(weight), // 重量を数値に変換
        reps: Number(reps),     // レップを数値に変換
        sets: Number(sets),     // セット数を数値に変換
        notes,
        createdAt: Timestamp.now(), // Firestoreのタイムスタンプ
      });

      Alert.alert('成功', 'トレーニング記録が保存されたよ！');
      // 保存後、入力をクリアしておく（必要に応じて）
      setExerciseName('');
      setWeight('');
      setReps('');
      setSets('');
      setNotes('');
    } catch (error: any) {
      console.error(error);
      Alert.alert('エラー', `データの保存に失敗: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>トレーニング記録</Text>

      <TextInput
        style={styles.input}
        placeholder="種目名（例: ベンチプレス）"
        value={exerciseName}
        onChangeText={setExerciseName}
      />

      <TextInput
        style={styles.input}
        placeholder="重量 (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="レップ数"
        value={reps}
        onChangeText={setReps}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="セット数"
        value={sets}
        onChangeText={setSets}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="メモ・コメント"
        value={notes}
        onChangeText={setNotes}
      />

      <TouchableOpacity style={styles.button} onPress={handleSaveRecord}>
        <Text style={styles.buttonText}>記録を保存</Text>
      </TouchableOpacity>

      {/* Debug表示したい場合はこんなの入れてみる */}
      {/* <Text>{JSON.stringify({ exerciseName, weight, reps, sets, notes }, null, 2)}</Text> */}
    </View>
  );
};

export default TrainingRecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});