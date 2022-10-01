import { ReactNode } from "react";
import { createPortal } from "react-dom";
import DangerIcon from "../../assets/icons/danger_icon";
import SuccessIcon from "../../assets/icons/success_icon";
import WarningIcon from "../../assets/icons/warning_icon";
import { IMessages } from "../../redux/slice/message_slice";

type IFilter = {
  bgColor: string;
  icon: ReactNode | null;
};

type Props = {
  messages: IMessages[] | null;
};
const MessageContainer = ({ messages }: Props) => {
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
              icon: null,
            };
            switch (item.type) {
              case "success":
                filter = {
                  bgColor: "var(--success)",
                  icon: <SuccessIcon />,
                };
                break;
              case "danger":
                filter = {
                  bgColor: "var(--danger)",
                  icon: <DangerIcon />,
                };
                break;
              case "warning":
                filter = {
                  bgColor: "var(--warning)",
                  icon: <WarningIcon />,
                };
                break;
              default:
                filter = {
                  bgColor: "var(--text)",
                  icon: null,
                };
                break;
            }
            return (
              <div
                key={index}
                style={{
                  backgroundColor: filter.bgColor,
                }}
                className={`${
                  item.isVisible
                    ? "animate-[translateMessage_3s_ease-in-out]"
                    : ""
                } min-w-[220px] min-h-[45px] rounded px-2 py-1`}
              >
                <div className="m-auto w-full h-full px-2 py-1 flex justify-start space-x-2">
                  {filter.icon}
                  <p className="text-white font-semibold leading-[40px]">
                    {item.text}
                  </p>
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
