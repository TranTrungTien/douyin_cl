import React from "react";
import { useAppSelector } from "../../redux/app/hooks";
import { IMessages } from "../../redux/slice/message_slice";
import MessageContainer from "../message_container";

const MessageModal = () => {
  const messages = useAppSelector(
    (state) => state.message as IMessages[] | null
  );

  return <MessageContainer messages={messages} />;
};

export default MessageModal;
