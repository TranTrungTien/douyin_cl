import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import {
  deleteMessage,
  setMessage,
  setShow,
} from "../redux/slice/message_slice";
import { makeID } from "../utils/uid";
export function MessageTransfer() {
  const dispatch = useAppDispatch();
  const isEmpty = useAppSelector((state) => state.message.length === 0);

  const messageIntervalIDRef = useRef<NodeJS.Timeout>();
  const sendMessage = (
    text: string,
    type: "success" | "warning" | "danger" | "primary" = "success",
    delayHidden: number = 3000
  ) => {
    // set again because inner function var will be missed updated data ....
    const isEmptyCurrent = isEmpty;
    const uid = makeID();
    dispatch(
      setMessage({
        uid: uid,
        isVisible: true,
        text: text,
        type: type,
      })
    );
    setTimeout(() => dispatch(setShow(uid)), delayHidden);
    const clearMessage = () => {
      dispatch(deleteMessage());
      if (isEmptyCurrent) {
        clearInterval(messageIntervalIDRef.current);
        messageIntervalIDRef.current = undefined;
      }
    };
    if (!messageIntervalIDRef.current) {
      messageIntervalIDRef.current = setInterval(clearMessage, 4000);
    }
  };
  return {
    sendMessage,
  };
}
