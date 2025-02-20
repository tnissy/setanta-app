import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import firebaseApp from '../firebaseConfig'; // Firebaseの初期設定

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export async function ensureTraineeDocument() {
  // ログイン済みの認証ユーザを取得（user）
  const user = auth.currentUser;
  if (!user) {
    console.log('認証ユーザが見つかりません');
    return;
  }

  // Firestoreの「trainees」コレクションからトレイニーのドキュメントを取得
  const traineeDocRef = doc(db, 'trainees', user.uid);
  const traineeDocSnap = await getDoc(traineeDocRef);

  if (!traineeDocSnap.exists()) {
    // ドキュメントが存在しなければ、初期データで新規作成
    const traineeData = {
      name: user.displayName || '', // 表示名がなければ空文字
      email: user.email || '',
      weight: null,                 // 初期は体重データがないのでnullにしておく
      gender: 'other',              // 初期値（必要に応じて変更）
      createdAt: serverTimestamp(), // 作成日時
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