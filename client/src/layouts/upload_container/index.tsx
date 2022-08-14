import { MouseEvent, ReactNode, SyntheticEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button, SelectFile } from "../../components";
import { servicesPath } from "../../services/services_path";
import { postData } from "../../services/app_services";
import "./style.css";

type IInputOpts = {
  cmt: {
    checked: boolean;
  };
  duet: {
    checked: boolean;
  };
  stich: {
    checked: boolean;
  };
  copyrightCheck: {
    checked: boolean;
  };
};

const UploadContainer = () => {
  const textInputRef = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<{ videoMetaData: any; video: File } | null>(
    null
  );
  const [videoCover, setVideoCover] = useState<File | null>(null);
  const [openOption, setOpenOption] = useState({
    isOpen: false,
    select: "Public",
  });
  const onChangeFile = (file: File | undefined) => {
    if (!file) return;
    else {
      const canvas = document.createElement("canvas");
      const video = document.createElement("video");
      const source = document.createElement("source");
      const context = canvas.getContext("2d");
      const videoObj = URL.createObjectURL(file);

      video.style.setProperty("display", "none");
      canvas.style.setProperty("display", "none");

      source.setAttribute("src", videoObj);
      video.setAttribute("crossorigin", "anonymous");

      video.appendChild(source);
      document.body.appendChild(canvas);
      document.body.appendChild(video);

      if (!context) {
        return;
      }
      video.load();
      video.currentTime = 1;
      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      };
      video.onseeking = () => {};
      video.onloadeddata = () => {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        canvas.toBlob((blob) => {
          if (!blob) {
            return;
          }
          const cover = new File([blob], "cover ", {
            type: "image/png",
          });
          const videoMetaData = {
            name: file.name,
            size: file.size,
            type: file.type,
            width: video.videoWidth,
            height: video.videoHeight,
            duration: video.duration,
          };
          URL.revokeObjectURL(videoObj);
          video.remove();
          canvas.remove();
          setFile({ videoMetaData, video: file });
          setVideoCover(cover);
        }, "image/png");
      };
    }
  };
  const onChangeOption = () => {
    setOpenOption({ ...openOption, isOpen: !openOption.isOpen });
  };
  const onChooseSelections = (
    e: MouseEvent<HTMLDivElement> & {
      target: { closest: (selector: string) => ReactNode };
    }
  ) => {
    const publicElem = e.target.closest("#Public") as HTMLDivElement;
    const friendElem = e.target.closest("#Friend") as HTMLDivElement;
    const privateElem = e.target.closest("#Private") as HTMLDivElement;
    publicElem
      ? setOpenOption({ ...openOption, select: publicElem.id })
      : friendElem
      ? setOpenOption({ ...openOption, select: friendElem.id })
      : setOpenOption({ ...openOption, select: privateElem.id });
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!file || !videoCover) return;

    const target = e.target as typeof e.target & IInputOpts;
    const formData = new FormData();
    formData.append(videoCover.name, videoCover, videoCover.name);
    formData.append(
      file.videoMetaData.name,
      file.video,
      file.videoMetaData.name
    );
    const fileRes = await postData<{ id_f: string }>(
      servicesPath.POST_FORMDATA,
      formData,
      true,
      "json",
      "multipart/form-data"
    ).catch(console.error);
    if (fileRes && fileRes.data) {
      const caption = textInputRef.current && textInputRef.current.innerText;
      const whoCanView = openOption.select;
      const copyrightCheck = target.copyrightCheck.checked;

      const allowUserDo = {
        cmt: target.cmt.checked,
        duet: target.duet.checked,
        stich: target.stich.checked,
      };
      const video_id_f = fileRes.data.id_f;
      const videoMetaData = file.videoMetaData;
      const metaRes = await postData(
        servicesPath.POST_METADATA,
        {
          video_id_f,
          cover_id_f: video_id_f + "_cover.png",
          music_id_f: video_id_f + "_music.mp3",
          caption,
          whoCanView,
          allowUserDo,
          copyrightCheck,
          videoMetaData,
        },
        true
      ).catch(console.error);
      metaRes && metaRes.data && console.log("upload metadata done");
    }
  };
  return (
    <main className="py-4 h-[1000px] xl:w-[1100px] m-auto">
      <div className="p-[24px_56px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] rounded-lg flex justify-center gap-x-6">
        <SelectFile
          onChangeFile={onChangeFile}
          fileName={file?.videoMetaData.name}
        />
        <div className="flex-1">
          <form id="video-form" onSubmit={onSubmit}>
            <div className="flex flex-col justify-start  gap-y-6">
              <div>
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-base text-[rgb(22,24,35)] leading-normal inline">
                    Caption
                  </h4>
                  <div className="flex justify-center items-center font-normal text-sm text-[rgb(22,24,35)] opacity-50 leading-normal">
                    <span>0</span>/<span>150</span>
                  </div>
                </div>
                <div className="w-full min-h-full rounded border-[rgba(22,24,35,0.12)] border p-[0px_80px_0px_16px]">
                  <div
                    ref={textInputRef}
                    className="py-3 outline-none border-none leading-[18px] font-normal text-[15px] select-text whitespace-pre-wrap break-words"
                    contentEditable
                  ></div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-base text-[rgb(22,24,35)] leading-normal inline">
                  Cover
                </h4>
                <div className="p-[6px] rounded-sm border border-[rgba(22,24,35,0.12)] w-full h-[168px]">
                  {videoCover && (
                    <div className="h-full w-[100px]">
                      <img
                        src={window.URL.createObjectURL(videoCover)}
                        alt="Cover"
                        className="w-full h-full object-cover object-center rounded-sm"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-base text-[rgb(22,24,35)] leading-normal inline">
                  Who can view this video
                </h4>
                <div className="w-[300px] h-[36px] rounded border border-[rgba(22,24,35,0.12)] relative cursor-pointer">
                  <div
                    onClick={onChangeOption}
                    className="relative flex justify-start items-center p-[5px_12px_7px_12px]"
                  >
                    <span className="text-[rgb(22,24,35) leading-[22px]] inline-block h-[22px] text-base">
                      {openOption.select}
                    </span>
                    <div className="absolute top-1/2 -translate-y-1/2 right-2">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 48 48"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M25.5187 35.2284C24.7205 36.1596 23.2798 36.1596 22.4816 35.2284L8.83008 19.3016C7.71807 18.0042 8.63988 16 10.3486 16H37.6517C39.3604 16 40.2822 18.0042 39.1702 19.3016L25.5187 35.2284Z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  {openOption.isOpen && (
                    <div
                      onClick={onChooseSelections}
                      className="z-10 absolute left-0 top-[120%] bg-white border border-white px-1 w-[300px] rounded shadow-[0_2px_12px_rgba(0,0,0,0.1)] text-left"
                    >
                      <div
                        id="Public"
                        className="p-[10px_12px] hover:bg-[rgba(22,24,36,0.06)]  cursor-pointer"
                      >
                        <p className="text-base font-normal leading-[22px] text-[rgb(22,25,35)]">
                          Public
                        </p>
                      </div>
                      <div
                        id="Friend"
                        className="p-[10px_12px] hover:bg-[rgba(22,24,36,0.06)]  cursor-pointer"
                      >
                        <p className="text-base font-normal leading-[22px] text-[rgb(22,25,35)]">
                          Friends
                        </p>
                      </div>
                      <div
                        id="Private"
                        className="p-[10px_12px] hover:bg-[rgba(22,24,36,0.06)]  cursor-pointer"
                      >
                        <p className="text-base font-normal leading-[22px] text-[rgb(22,25,35)]">
                          Private
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-base text-[rgb(22,24,35)] leading-normal inline">
                  Alow users to :
                </h4>
                <div className="text-white flex justify-start items-center gap-x-6">
                  <div className="flex items-center justify-center">
                    <label
                      htmlFor="cmt"
                      className="cursor-pointer text-base font-normal leading-[22px] flex-1 text-[rgb(22,24,35)] flex justify-start items-center gap-x-2"
                    >
                      <div className="">
                        <input
                          className="hidden appearance-none cmt-input"
                          name="cmt"
                          id="cmt"
                          type="checkbox"
                        />
                        <div className="relative w-4 h-4 rounded-sm border border-[rgba(24,25,35,0.12)] cmt-box">
                          <div className=" absolute top-0 left-0 w-full h-full grid  place-content text-white">
                            <svg
                              width="14"
                              height="14"
                              viewBox="-1.2 -3 12.3 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3.88632 5.95189L8.77465 0.915431C8.96697 0.717276 9.28352 0.712552 9.48168 0.904878L9.67738 1.09483C9.87553 1.28715 9.88026 1.6037 9.68793 1.80185L4.34296 7.3088C4.093 7.56633 3.67963 7.56633 3.42967 7.3088L0.948335 4.75227C0.756009 4.55411 0.760734 4.23757 0.958888 4.04524L1.15459 3.85529C1.35275 3.66297 1.66929 3.66769 1.86162 3.86584L3.88632 5.95189Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <span>Comment</span>
                    </label>
                  </div>
                  <div className="flex items-center justify-start">
                    <label
                      className=" cursor-pointer  text-base text-[rgb(22,24,35)] font-normal leading-[22px] flex-1 flex items-center gap-x-2 justify-center"
                      htmlFor="duet"
                    >
                      <input
                        className="hidden appearance-none duet-input"
                        name="duet"
                        id="duet"
                        type="checkbox"
                      />
                      <div className="relative w-4 h-4 rounded-sm border border-[rgba(24,25,35,0.12)] duet-box">
                        <div className=" absolute top-0 left-0 w-full h-full grid place-content-center text-white">
                          <svg
                            width="14"
                            height="14"
                            viewBox="-1.2 -3 12.3 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.88632 5.95189L8.77465 0.915431C8.96697 0.717276 9.28352 0.712552 9.48168 0.904878L9.67738 1.09483C9.87553 1.28715 9.88026 1.6037 9.68793 1.80185L4.34296 7.3088C4.093 7.56633 3.67963 7.56633 3.42967 7.3088L0.948335 4.75227C0.756009 4.55411 0.760734 4.23757 0.958888 4.04524L1.15459 3.85529C1.35275 3.66297 1.66929 3.66769 1.86162 3.86584L3.88632 5.95189Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <span>Duet</span>
                    </label>
                  </div>
                  <div className="flex items-center justify-start">
                    <label
                      htmlFor="stich"
                      className=" cursor-pointer text-base font-normal text-[rgb(22,24,35)] leading-[22px] flex-1 flex items-center justify-start gap-x-2"
                    >
                      <input
                        className="hidden appearance-none stich-input"
                        name="stich"
                        id="stich"
                        type="checkbox"
                      />
                      <div className="relative w-4 h-4 rounded-sm border stich-box border-[rgba(24,25,35,0.12)]">
                        <div className=" absolute top-0 left-0 w-full h-full grid place-content-center text-white">
                          <svg
                            width="14"
                            height="14"
                            viewBox="-1.2 -3 12.3 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.88632 5.95189L8.77465 0.915431C8.96697 0.717276 9.28352 0.712552 9.48168 0.904878L9.67738 1.09483C9.87553 1.28715 9.88026 1.6037 9.68793 1.80185L4.34296 7.3088C4.093 7.56633 3.67963 7.56633 3.42967 7.3088L0.948335 4.75227C0.756009 4.55411 0.760734 4.23757 0.958888 4.04524L1.15459 3.85529C1.35275 3.66297 1.66929 3.66769 1.86162 3.86584L3.88632 5.95189Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <span>Stich</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-start items-center gap-x-4">
                <h4 className="font-semibold text-base text-[rgb(22,24,35)] leading-normal inline">
                  Run the copyright check
                </h4>
                <label
                  htmlFor="copyright-check"
                  className="relative w-[44px] h-[24px] rounded-full bg-[rgba(22,24,35,0.12)] p-[2px] cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="appearance-none hidden copyright-input"
                    id="copyright-check"
                    name="copyrightCheck"
                  />
                  <span className="absolute h-5 w-5 rounded-full bg-white top-[2px] left-[2px] copyright-circle transition-all"></span>
                </label>
              </div>
              <div>
                <p className="font-normal text-[rgba(22,24,35,0.75)] text-xs leading-[22px]">
                  We'll check your video for potential copyright infringements
                  on used sounds. If infringements are found, you can edit the
                  video before posting.{" "}
                  <Link
                    className=" text-xs font-semibold text-[rgb(22,24,35)]"
                    to={"/"}
                  >
                    Learn more
                  </Link>
                </p>
              </div>
              <div className="flex justify-start gap-x-4 items-center ">
                <div className="w-[168px]">
                  <Button
                    onClick={() => {}}
                    text="Discard"
                    borderRadius="rounded-sm"
                    backgroundColor="bg-transparent"
                    styleArray="border border-[rgb(242,242,242)] w-full px-5 font-semibold"
                    width="min-w-[72px]"
                    height="h-11"
                  />
                </div>
                <div className="w-[168px]">
                  <Button
                    text="Post"
                    type="submit"
                    borderRadius="rounded-sm"
                    backgroundColor="bg-[rgb(242,242,242)]"
                    width="min-w-[72px]"
                    styleArray="font-semibold w-full px-5 border-[rgb(242,242,242)] cursor-not-allowed"
                    height="h-11"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default UploadContainer;
