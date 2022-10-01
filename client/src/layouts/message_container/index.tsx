import { createPortal } from "react-dom";
import { IMessages } from "../../redux/slice/message_slice";
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
            return (
              <div
                key={index}
                style={{
                  backgroundColor:
                    item.type === "primary"
                      ? "var(--text)"
                      : item.type === "danger"
                      ? "var(--danger)"
                      : item.type === "warning"
                      ? "var(--warning)"
                      : "var(--success)",
                }}
                className={`${
                  item.isVisible
                    ? "animate-[translateMessage_3s_ease-in-out]"
                    : ""
                } min-w-[220px] min-h-[45px] rounded px-2 py-1`}
              >
                <div className="m-auto w-full h-full px-2 py-1 flex justify-start">
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
