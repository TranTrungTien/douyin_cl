import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { IFollowing } from "../../interfaces/following";
import {
  getAllFollowingFailed,
  getAllFollowingRequested,
  getAllFollowingSuccessfully,
} from "../slice/following_slice";

const getAllFollowing = async () => {
  return await axios.get<{ message: string; list: IFollowing }>("following/", {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
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
