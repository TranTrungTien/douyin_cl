import { useFetch } from "../../hooks/useFetch";
import { IUser } from "../../interfaces/user.interface";
import {
  getUserInfoFailed,
  getUserInfoRequested,
  getUserInfoSuccessfully,
} from "../slice/user.slice";
import { call, put, takeEvery } from "redux-saga/effects";
import axios, { AxiosError } from "axios";

const getUserInfo = async () => {
  return await axios.get<{ message: string; doc: IUser }>("user/", {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export function* fetchUser(): any {
  try {
    let response = yield call(() => getUserInfo());
    yield put(getUserInfoSuccessfully(response.data.doc));
  } catch (e: any) {
    yield put({ type: getUserInfoFailed.type, e });
  }
}
export default function* userSaga() {
  yield takeEvery(getUserInfoRequested.type, fetchUser);
}
