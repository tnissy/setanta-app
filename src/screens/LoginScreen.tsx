// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// firebaseConfig からの auth インポートは不要
// import { auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Repository } from '../services/Repository';

type RootStackParamList = {
  Login: undefined;
  HomeTabs: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('mo2.ayase@gmail.com');
  const [password, setPassword] = useState<string>('test4545');
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async (): Promise<void> => {
    console.log('handleLogin関数が開始');
    try {
      console.log('baseRepository.loginWithEmail を実行');
      const userCredential = await baseRepository.loginWithEmail(email, password);
      console.log('ログイン成功:', userCredential.user.email);
      Alert.alert('ログイン成功', `ようこそ ${userCredential.user.email} さん！`);
      navigation.navigate('HomeTabs'); // ログイン成功後にホーム画面へ遷移
      console.log('handleLogin関数が正常に終了');
    } catch (error: any) {
      console.error('ログイン失敗:', error);
      Alert.alert('ログインエラー', error.message);
      console.log('handleLogin関数がエラーで終了');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>セタンタ トレアプリ ログイン</Text>
      <TextInput
        style={styles.input}
        placeholder="メールアドレス"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="パスワード"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>ログイン</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeTabs')}>
        <Text style={styles.buttonText}>ホーム画面へ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default LoginScreen;