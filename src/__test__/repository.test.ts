// Repository モジュールと firebase/auth の関数をインポートしています。
// Repository の loginWithEmail メソッドの動作を検証するためのテストファイルです。
import { BaseRepository } from '../services/baseRepository';
//import { exerciseRepository } from '../services/exerciseRepository';
//import { workoutSessionRepository } from '../services/workoutSessionRepository';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

const baseRepository = BaseRepository.getInstance(); // すでにあるインスタンスを取得

// firebase/auth モジュールのモックを作成しています。
// signInWithEmailAndPassword と getAuth はそれぞれ jest.fn() を使ってモック化されています。
jest.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: jest.fn(),
    getAuth: jest.fn(() => ({}))
}));

// 同じモックの重複定義になっていますが、実際には 1 つで十分です。
jest.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: jest.fn(),
    getAuth: jest.fn(() => ({}))
}));

// baseRepository.loginWithEmail のテストスイートです。
// 各テストケースは、firebase/auth のモックを利用して、ログインの正常動作、エラーハンドリングなどを検証しています。
describe('baseRepository.loginWithEmail', () => {
    // テストで利用するダミーデータを定義します。
    const fakeEmail = 'test@example.com';
    const fakePassword = 'password123';
    const fakeUserCredential = { user: { email: fakeEmail } };

    // 各テスト後にモック状態をリセットするための処理です。
    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });
    
    // ログイン成功時に、正しいユーザー認証情報が返されるかを検証するテストケースです。
    test('should login successfully and return user credential', async () => {
        // signInWithEmailAndPassword の呼び出しは成功し、fakeUserCredential を返すように設定します。
        (signInWithEmailAndPassword as jest.Mock).mockResolvedValue(fakeUserCredential);
        
        // baseRepository.loginWithEmail を呼び出し、返された結果を検証します。
        const result = await baseRepository.loginWithEmail(fakeEmail, fakePassword);
        
        // firebase/auth の getAuth が呼ばれたこと、正しい引数で signInWithEmailAndPassword が呼ばれていることを確認します。
        expect(getAuth).toHaveBeenCalled();
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.any(Object), fakeEmail, fakePassword);
        // 結果が期待通りのユーザー認証情報であることを確認します。
        expect(result).toEqual(fakeUserCredential);
    });
        test('should call signInWithEmailAndPassword only once', async () => {
        (signInWithEmailAndPassword as jest.Mock).mockResolvedValue(fakeUserCredential);
        
        await baseRepository.loginWithEmail(fakeEmail, fakePassword);
        
        expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    });

    test('should reject when email is empty', async () => {
        await expect(baseRepository.loginWithEmail('', fakePassword)).rejects.toThrow();
    });
    
    test('should log start and success messages on successful login', async () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        (signInWithEmailAndPassword as jest.Mock).mockResolvedValue(fakeUserCredential);
        
        await baseRepository.loginWithEmail(fakeEmail, fakePassword);
        
        expect(logSpy).toHaveBeenCalledWith('Repository: signInWithEmailAndPassword 開始');
        expect(logSpy).toHaveBeenCalledWith("Repository: ログイン成功", "test@example.com");
    });
    
    test('should log error message on failed login', async () => {
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const testError = new Error('Authentication failed');
        (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(testError);
        
        await expect(baseRepository.loginWithEmail(fakeEmail, fakePassword)).rejects.toThrow(testError);
        
        expect(errorSpy).toHaveBeenCalledWith('Repository: ログイン失敗', testError);
    });
});