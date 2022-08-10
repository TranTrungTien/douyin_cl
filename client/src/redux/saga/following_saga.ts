import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { servicesPath } from "../../config/app_config";
import { IFollowing } from "../../interfaces/following";
import {
  getAllFollowingFailed,
  getAllFollowingRequested,
  getAllFollowingSuccessfully,
} from "../slice/following_slice";

const getAllFollowing = async () => {
  return await axios.get<{ message: string; list: IFollowing }>(
    servicesPath.GET_ALL_FOLLOWING,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
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
