// src/screens/UserSettingsScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const UserSettingsScreen: React.FC = () => {
  // 各設定項目の状態を管理
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [trainingGoal, setTrainingGoal] = useState<string>('');
  const [experienceLevel, setExperienceLevel] = useState<string>('');

  const handleUpdateSettings = () => {
    // ここでユーザー設定の保存処理を実装する（例：API呼び出しなど）
    console.log('ユーザー設定を保存:', { profileImage, weight, height, trainingGoal, experienceLevel });
  };

  const handleChangeProfileImage = () => {
    // プロフィール画像の変更処理（例：画像ピッカーの起動）を実装する
    console.log('プロフィール画像の変更を実行');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ユーザー設定</Text>

      <View style={styles.imageContainer}>
        {/* 画像がある場合はその画像、ない場合はプレースホルダー画像を表示 */}
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require('../assets/images/profile_placeholder.png')
          }
          style={styles.profileImage}
        />
      </View>
      <TouchableOpacity style={styles.changeImageButton} onPress={handleChangeProfileImage}>
        <Text style={styles.changeImageButtonText}>プロフィール画像を変更</Text>
      </TouchableOpacity>

      <Text style={styles.label}>体重 (kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="例: 70"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />

      <Text style={styles.label}>身長 (cm)</Text>
      <TextInput
        style={styles.input}
        placeholder="例: 175"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />

      <Text style={styles.label}>トレーニング目標</Text>
      <TextInput
        style={styles.input}
        placeholder="例: 筋力アップ"
        value={trainingGoal}
        onChangeText={setTrainingGoal}
      />

      <Text style={styles.label}>経験レベル</Text>
      <TextInput
        style={styles.input}
        placeholder="例: 初心者 / 中級者 / 上級者"
        value={experienceLevel}
        onChangeText={setExperienceLevel}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleUpdateSettings}>
        <Text style={styles.saveButtonText}>設定を保存</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc', // 画像が読み込まれなかった場合のバックグラウンド
  },
  changeImageButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
  },
  changeImageButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserSettingsScreen;