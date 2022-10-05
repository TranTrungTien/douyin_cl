import { call, put, takeEvery } from "redux-saga/effects";
import { IUser } from "../../interfaces/user.interface";
import { getData } from "../../services/app_services";
import { servicesPath } from "../../services/services_path";
import {
  getUserInfoFailed,
  getUserInfoRequested,
  getUserInfoSuccessfully,
} from "../slice/user_slice";

const getUserInfo = async () => {
  return getData<{ message: string; data: IUser }>(
    servicesPath.GET_MY_INFO,
    null,
    true
  );
};

export function* fetchUser(): any {
  try {
    let response = yield call(() => getUserInfo());
    yield put(getUserInfoSuccessfully(response.data.data));
  } catch (e: any) {
    yield put({ type: getUserInfoFailed.type, e });
  }
}
export default function* userSaga() {
  yield takeEvery(getUserInfoRequested.type, fetchUser);
}
