import { all } from "redux-saga/effects";
import userSaga from "./user_saga";

export default function* rootSaga() {
  yield all([userSaga()]);
}
