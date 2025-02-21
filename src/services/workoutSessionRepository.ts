import firebaseApp from '../firebaseConfig';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { WorkoutSession } from '../types/workoutSessionEntity';

export class WorkoutSessionRepository {
    // シングルトンインスタンス
    private static instance: WorkoutSessionRepository;

    // private コンストラクタ
    private constructor() {
        // ...existing code...
    }

    // インスタンス取得メソッド
    public static getInstance(): WorkoutSessionRepository {
        if (!WorkoutSessionRepository.instance) {
            WorkoutSessionRepository.instance = new WorkoutSessionRepository();
        }
        return WorkoutSessionRepository.instance;
    }

    public async createWorkoutSession(workoutSession: WorkoutSession): Promise<void> {
        const db = getFirestore(firebaseApp);
        try {
            await addDoc(collection(db, 'workoutSessions'), workoutSession);
            console.log('ワークアウトセッションの作成に成功しました');
        } catch (error) {
            console.error('ワークアウトセッション作成エラー:', error);
            throw error;
        }
    }
    public async getWorkoutSession(workoutSession: WorkoutSession): Promise<void> {
        const db = getFirestore(firebaseApp);
        try {
            await addDoc(collection(db, 'workoutSessions'), workoutSession);
            console.log('ワークアウトセッションの作成に成功しました');
        } catch (error) {
            console.error('ワークアウトセッション作成エラー:', error);
            throw error;
        }
    }
}
