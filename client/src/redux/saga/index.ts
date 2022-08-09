import { all } from "redux-saga/effects";
import followingSaga from "./following_saga";
import userSaga from "./user_saga";

export default function* rootSaga() {
  yield all([userSaga(), followingSaga()]);
}
