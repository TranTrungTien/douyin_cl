import { useRef } from "react";
import {
  ableToDelete,
  useAppDispatch,
  useAppSelector,
} from "../redux/app/hooks";
import {
  deleteMessage,
  setMessage,
  setShow,
} from "../redux/slice/message_slice";
import { makeID } from "../utils/uid";
export function MessageTransfer() {
  const dispatch = useAppDispatch();
  const isDel = useAppSelector(ableToDelete);
  const isDelRef = useRef<boolean>(isDel);
  isDelRef.current = isDel;
  const messageIntervalIDRef = useRef<NodeJS.Timeout>();
  const sendMessage = (
    text: string,
    type: "success" | "warning" | "danger" | "primary" = "success",
    forever: boolean = false,
    seconds: number = 3
  ) => {
    // set again because inner function var will be missed updated data ....
    const uid = makeID();
    dispatch(
      setMessage({
        uid: uid,
        forever: forever,
        visibility: true,
        text: text,
        duration: seconds,
        type: type,
      })
    );
    !forever && setTimeout(() => dispatch(setShow(uid)), seconds * 1000);
  };
  const clearMessage = () => {
    console.log("re run ...");

    if (isDelRef.current) {
      dispatch(deleteMessage());
      clearInterval(messageIntervalIDRef.current);
      messageIntervalIDRef.current = undefined;
    }
  };
  if (!messageIntervalIDRef.current) {
    messageIntervalIDRef.current = setInterval(clearMessage, 4000);
  }
  return {
    sendMessage,
  };
}
