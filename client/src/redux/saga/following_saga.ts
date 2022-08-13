import { call, put, takeEvery } from "redux-saga/effects";
import { IFollowing } from "../../interfaces/following";
import { getData } from "../../services/app_services";
import { servicesPath } from "../../services/services_path";
import {
  getAllFollowingFailed,
  getAllFollowingRequested,
  getAllFollowingSuccessfully,
} from "../slice/following_slice";

const getAllFollowing = async () => {
  return getData<{ message: string; list: IFollowing }>(
    servicesPath.GET_ALL_FOLLOWING,
    null,
    true
  );
};

export function* fetchFollowing(): any {
  try {
    let response = yield call(() => getAllFollowing());
    yield put(getAllFollowingSuccessfully(response.data.list));
  } catch (e: any) {
    yield put({ type: getAllFollowingFailed.type, e });
  }
}
export default function* followingSaga() {
  yield takeEvery(getAllFollowingRequested.type, fetchFollowing);
}
