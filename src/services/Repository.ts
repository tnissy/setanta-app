// src/services/Repository.ts
import firebaseApp from '../firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp, 
  updateDoc, 
  collection, 
  addDoc 
} from 'firebase/firestore';
import { TrainingPlan } from '../types/TrainingPlan';

export class Repository {
  static async loginWithEmail(email: string, password: string) {
    if (!email) {
      throw new Error('Email is required');
    }
    try {
      console.log('Repository: signInWithEmailAndPassword 開始');
      const auth = getAuth(firebaseApp);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Repository: ログイン成功', userCredential.user.email);
      return userCredential;
    } catch (error) {
      console.error('Repository: ログイン失敗', error);
      throw error;
    }
  }
}

// トレイニー文書作成処理（存在しなければ作成）
export async function getTraineeDocument(): Promise<void> {
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;
  if (!user) {
    console.log('認証ユーザが見つかりません');
    return;
  }
  const db = getFirestore(firebaseApp);
  const traineeDocRef = doc(db, 'trainees', user.uid);
  const traineeDocSnap = await getDoc(traineeDocRef);
  if (!traineeDocSnap.exists()) {
    const traineeData = {
      name: user.displayName || '',
      email: user.email || '',
      weight: null,
      gender: 'other',
      createdAt: serverTimestamp(),
    };
    try {
      await setDoc(traineeDocRef, traineeData);
      console.log('トレイニーのドキュメントを作成しました:', traineeData);
    } catch (error) {
      console.error('トレイニーのドキュメント作成に失敗しました:', error);
    }
  } else {
    console.log('トレイニーのドキュメントは既に存在します');
  }
}

/**
 * トレイニー情報を取得する処理
 */
export const getTraineeData = async () => {
  await getTraineeDocument();
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;
  if (!user) {
    throw new Error('認証ユーザーが見つかりません');
  }
  const db = getFirestore(firebaseApp);
  const traineeDocRef = doc(db, 'trainees', user.uid);
  const traineeSnap = await getDoc(traineeDocRef);
  if (traineeSnap.exists()) {
    return traineeSnap.data();
  } else {
    throw new Error('トレイニー情報が存在しません');
  }
};

/**
 * トレイニーの体重情報を更新する処理
 */
export const updateTraineeWeight = async (weight: number) => {
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;
  if (!user) {
    throw new Error('認証ユーザーが見つかりません');
  }
  const db = getFirestore(firebaseApp);
  const traineeDocRef = doc(db, 'trainees', user.uid);
  await updateDoc(traineeDocRef, { weight });
};

/**
 * トレーニングプランを作成する処理
 */
export const createTrainingPlan = async (trainingPlan: TrainingPlan): Promise<void> => {
  const db = getFirestore(firebaseApp);
  try {
    await addDoc(collection(db, 'trainingPlans'), trainingPlan);
  } catch (error) {
    console.error("Error adding training plan:", error);
    throw error;
  }
};