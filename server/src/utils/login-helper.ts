type ICode = {
  email: string | null;
  code: string;
};

type IExistedEmail = {
  code: string;
  isExisted: boolean;
  email: string | null;
};

type IVerifyCode = {
  code: string;
  verifyCode: string;
  email: string | null;
};

class LoginHelper {
  private _code: ICode[];
  private _existedEmail: IExistedEmail[];
  private _verifyCode: IVerifyCode[];
  constructor() {
    this._code = [];
    this._existedEmail = [];
    this._verifyCode = [];
  }
  get code() {
    return this._code;
  }
  get existedEmail() {
    return this._existedEmail;
  }

  get verifyCode() {
    return this._verifyCode;
  }
  addNewCode(code: ICode): void {
    this._code.push(code);
  }
  addNewExistedEmail(email: IExistedEmail): void {
    this._existedEmail.push(email);
  }
  addVerifyCode(code: IVerifyCode): void {
    this._verifyCode.push(code);
  }
  findCode(clientCode: string, email: string): ICode | undefined {
    return this._code.find(
      (code) => clientCode === code.code && email === code.email
    );
  }
  findExistedEmail(email: string): IExistedEmail | undefined {
    return this._existedEmail.find(
      (exitedEmail) => exitedEmail.isExisted && exitedEmail.email === email
    );
  }
  findVerifiedCode(clientCode: string, email: string): IVerifyCode | undefined {
    return this._verifyCode.find(
      (verifyCode) =>
        verifyCode.verifyCode === clientCode && verifyCode.email === email
    );
  }

  deletePendingLogin(code: string, email: string): void {
    this._deleteCode(code, email);
    this._deleteExistedEmail(code, email);
    this._deleteVerifiedCode(code, email);
  }

  private _deleteCode(cCode: string, email: string): void {
    const index = this._code.findIndex(
      (code) => cCode === code.code && email === code.email
    );
    this._code.splice(index, 1);
  }
  private _deleteExistedEmail(cCode: string, email: string): void {
    const index = this._existedEmail.findIndex(
      (exitedEmail) =>
        exitedEmail.isExisted &&
        exitedEmail.email === email &&
        exitedEmail.code === cCode
    );
    this._code.splice(index, 1);
  }
  private _deleteVerifiedCode(cCode: string, email: string): void {
    const index = this._verifyCode.findIndex(
      (verifyCode) => verifyCode.code === cCode && verifyCode.email === email
    );
    this._code.splice(index, 1);
  }
}

export default LoginHelper;
