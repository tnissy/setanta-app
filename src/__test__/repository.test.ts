// Repository モジュールと firebase/auth の関数をインポートしています。
// Repository の loginWithEmail メソッドの動作を検証するためのテストファイルです。
import { Repository } from '../services/Repository';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

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

// Repository.loginWithEmail のテストスイートです。
// 各テストケースは、firebase/auth のモックを利用して、ログインの正常動作、エラーハンドリングなどを検証しています。
describe('Repository.loginWithEmail', () => {
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
        
        // Repository.loginWithEmail を呼び出し、返された結果を検証します。
        const result = await Repository.loginWithEmail(fakeEmail, fakePassword);
        
        // firebase/auth の getAuth が呼ばれたこと、正しい引数で signInWithEmailAndPassword が呼ばれていることを確認します。
        expect(getAuth).toHaveBeenCalled();
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.any(Object), fakeEmail, fakePassword);
        // 結果が期待通りのユーザー認証情報であることを確認します。
        expect(result).toEqual(fakeUserCredential);
    });
    
    // ログイン失敗時に、エラーがスローされることを検証するテストケースです。
    test('should throw error on failed login', async () => {
        // signInWithEmailAndPassword でエラーが発生するように設定します。
        const testError = new Error('Authentication failed');
        (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(testError);
        
        // エラー発生を確認するために、Repository.loginWithEmail 呼び出しで例外が発生するかを検証します。
        await expect(Repository.loginWithEmail(fakeEmail, fakePassword)).rejects.toThrow(testError);
    });

    test('should call signInWithEmailAndPassword only once', async () => {
        (signInWithEmailAndPassword as jest.Mock).mockResolvedValue(fakeUserCredential);
        
        await Repository.loginWithEmail(fakeEmail, fakePassword);
        
        expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    });

    test('should reject when email is empty', async () => {
        await expect(Repository.loginWithEmail('', fakePassword)).rejects.toThrow();
    });
    
    test('should log start and success messages on successful login', async () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        (signInWithEmailAndPassword as jest.Mock).mockResolvedValue(fakeUserCredential);
        
        await Repository.loginWithEmail(fakeEmail, fakePassword);
        
        expect(logSpy).toHaveBeenCalledWith('Repository: signInWithEmailAndPassword 開始');
        expect(logSpy).toHaveBeenCalledWith("Repository: ログイン成功", "test@example.com");
    });
    
    test('should log error message on failed login', async () => {
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const testError = new Error('Authentication failed');
        (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(testError);
        
        await expect(Repository.loginWithEmail(fakeEmail, fakePassword)).rejects.toThrow(testError);
        
        expect(errorSpy).toHaveBeenCalledWith('Repository: ログイン失敗', testError);
    });
});