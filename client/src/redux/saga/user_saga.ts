import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { servicesPath } from "../../config/app_config";
import { IUser } from "../../interfaces/user.interface";
import {
  getUserInfoFailed,
  getUserInfoRequested,
  getUserInfoSuccessfully,
} from "../slice/user.slice";

const getUserInfo = async () => {
  return await axios.get<{ message: string; doc: IUser }>(
    servicesPath.GET_MY_INFO,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
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
