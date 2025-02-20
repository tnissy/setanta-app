import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { userSchema } from '../types/User';

const UserFormScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('60');
  const [gender, setGender] = useState('other');
  const [nameError, setNameError] = useState('');
  const [weightError, setWeightError] = useState('');
  const [genderError, setGenderError] = useState('');

  const onSubmit = () => {
    // バリデーション
    let isValid = true;
    const parsedWeight = parseFloat(weight);

    if (name.length > 50) {
      setNameError('名前は50文字以内で入力してください');
      isValid = false;
    } else {
      setNameError('');
    }

    if (isNaN(parsedWeight) || parsedWeight < 20 || parsedWeight > 200) {
      setWeightError('体重は20kg〜200kgの範囲で入力してください');
      isValid = false;
    } else {
      setWeightError('');
    }

    if (!['male', 'female', 'other'].includes(gender)) {
      setGenderError('性別を選択してください');
      isValid = false;
    } else {
      setGenderError('');
    }

    if (isValid) {
      const userData = {
        name: name,
        weight: parsedWeight,
        gender: gender,
      };
      console.log(userData);
      // ここでデータを保存する処理を実装
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>名前</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          accessibilityLabel="名前"
          keyboardType="default"
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

        <Text style={styles.label}>体重 (kg)</Text>
        <TextInput
          keyboardType="decimal-pad"
          value={weight}
          onChangeText={setWeight}
          style={styles.input}
          accessibilityLabel="体重 (kg)"
        />
        {weightError ? <Text style={styles.errorText}>{weightError}</Text> : null}

        <View style={styles.genderContainer}>
          <Text style={styles.subtitle}>性別</Text>
          <View style={styles.radioGroup}>
            <Text onPress={() => setGender('male')} style={[styles.radioLabel, gender === 'male' && styles.radioLabelSelected]}>男性</Text>
            <Text onPress={() => setGender('female')} style={[styles.radioLabel, gender === 'female' && styles.radioLabelSelected]}>女性</Text>
            <Text onPress={() => setGender('other')} style={[styles.radioLabel, gender === 'other' && styles.radioLabelSelected]}>その他</Text>
          </View>
          {genderError ? <Text style={styles.errorText}>{genderError}</Text> : null}
        </View>

        <Button
          title="保存"
          onPress={onSubmit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
  },
  genderContainer: {
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  radioLabel: {
    fontSize: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  radioLabelSelected: {
    backgroundColor: '#ddd',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
});

export default UserFormScreen;