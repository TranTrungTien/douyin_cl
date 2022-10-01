import { ReactNode } from "react";
import { createPortal } from "react-dom";
import CloseIcon from "../../assets/icons/close_icon";
import DangerIcon from "../../assets/icons/danger_icon";
import SuccessIcon from "../../assets/icons/success_icon";
import WarningIcon from "../../assets/icons/warning_icon";
import { Button } from "../../components";
import { useAppDispatch } from "../../redux/app/hooks";
import {
  deleteVisibilityForeverMessage,
  IMessages,
} from "../../redux/slice/message_slice";

type IFilter = {
  bgColor: string;
  prefixIcon: ReactNode | null;
  suffixIcon: ReactNode | null;
};

type Props = {
  messages: IMessages[] | null;
};
const MessageContainer = ({ messages }: Props) => {
  const dispatch = useAppDispatch();
  const handleCloseMessage = (uid: string) => {
    dispatch(deleteVisibilityForeverMessage(uid));
  };
  console.log({ messages });

  return createPortal(
    <div
      id="message"
      className={`absolute top-[100px] right-0 translate-x-full z-[9999]`}
    >
      <div className="space-y-3">
        {messages &&
          messages.map((item, index) => {
            let filter: IFilter = {
              bgColor: "var(--text)",
              prefixIcon: null,
              suffixIcon: null,
            };
            switch (item.type) {
              case "success":
                filter = {
                  bgColor: "var(--success)",
                  prefixIcon: <SuccessIcon />,
                  suffixIcon: item.forever ? <CloseIcon /> : null,
                };
                break;
              case "danger":
                filter = {
                  bgColor: "var(--danger)",
                  prefixIcon: <DangerIcon />,
                  suffixIcon: item.forever ? <CloseIcon /> : null,
                };
                break;
              case "warning":
                filter = {
                  bgColor: "var(--warning)",
                  prefixIcon: <WarningIcon />,
                  suffixIcon: item.forever ? <CloseIcon /> : null,
                };
                break;
              default:
                filter = {
                  bgColor: "var(--text)",
                  prefixIcon: null,
                  suffixIcon: null,
                };
                break;
            }
            const animation = item.visibility
              ? item.forever
                ? `animate-[translateForward_3s_ease-in-out_0s_1_normal_forwards]`
                : `animate-[translateForwardAndBack_3s_ease-in-out]`
              : "";
            return (
              <div
                key={index}
                style={{
                  backgroundColor: filter.bgColor,
                }}
                className={`${animation} min-w-[220px] min-h-[45px] rounded px-2 py-1`}
              >
                <div className="m-auto w-full h-full px-2 py-1 flex justify-start items-center space-x-2">
                  {filter.prefixIcon}
                  <p className="text-white font-semibold leading-[40px] mr-4 flex-1">
                    {item.text}
                  </p>
                  {filter.suffixIcon && (
                    <Button
                      text=""
                      className="pt-2"
                      onClick={() => handleCloseMessage(item.uid)}
                    >
                      {filter.suffixIcon}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>,
    document.getElementById("root") as HTMLElement
  );
};

export default MessageContainer;
