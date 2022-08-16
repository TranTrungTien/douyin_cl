import { useState } from "react";
import { RightBarAction } from "../../layouts/video_slide";
import { useAppDispatch } from "../../redux/app/hooks";
import { setIsLogin } from "../../redux/slice/login_slice";
import { deleteData, postData } from "../../services/app_services";
import { servicesPath } from "../../services/services_path";
import Button from "../button";
import DeleteIcon from "../../assets/icons/delete_icon.svg";

type Props = {
  onOpenRightBar?: (action: RightBarAction) => void;
  my_id?: string;
  liked?: boolean;
  styleArrayInner?: string;
  styleArray?: string;
  widthSvg?: string;
  heightSvg?: string;
  video_id: string;
};
const LikeCmtShare = ({
  liked,
  my_id,
  video_id,
  onOpenRightBar,
  styleArrayInner,
  styleArray = "flex flex-col justify-center items-center space-y-2",
  widthSvg = "36",
  heightSvg = "36",
}: Props) => {
  const [like, setLike] = useState(liked);
  const dispatch = useAppDispatch();
  const onLikeVideo = async () => {
    if (my_id) {
      if (!like) {
        const likeRes = await postData(
          servicesPath.POST_LIKE_VIDEO,
          {
            video_id: video_id,
          },
          true
        ).catch(console.error);
        likeRes && likeRes.data && console.log("liked video");
      } else {
        const delRes = await deleteData(servicesPath.DEL_LIKE_VIDEO, {
          video_id: video_id,
        }).catch(console.error);
        delRes && delRes.data && console.log("del like video successfully");
      }
      setLike(!like);
    } else {
      dispatch(setIsLogin(true));
    }
  };
  const handleOpenOptions = () => {
    console.log("click");
  };
  return (
    <div className={`${styleArray}`}>
      {/* heart icon */}
      <button
        onClick={onLikeVideo}
        title="喜欢"
        className={`${styleArrayInner} text-white opacity-80 hover:opacity-100`}
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 72 72"
            width={`${widthSvg}`}
            height={`${heightSvg}`}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <clipPath id="__lottie_element_680">
                <rect width="72" height="72" x="0" y="0"></rect>
              </clipPath>
              <clipPath id="__lottie_element_682">
                <path d="M0,0 L168,0 L168,168 L0,168z"></path>
              </clipPath>
              <clipPath id="__lottie_element_686">
                <path d="M0,0 L1680,0 L1680,1680 L0,1680z"></path>
              </clipPath>
              <clipPath id="__lottie_element_690">
                <path d="M0,0 L1000,0 L1000,1000 L0,1000z"></path>
              </clipPath>
              <clipPath id="__lottie_element_697">
                <path d="M0,0 L1000,0 L1000,1000 L0,1000z"></path>
              </clipPath>
              <clipPath id="__lottie_element_707">
                <path d="M0,0 L120,0 L120,120 L0,120z"></path>
              </clipPath>
            </defs>
            <g clipPath="url(#__lottie_element_680)">
              <g
                clipPath="url(#__lottie_element_682)"
                transform="matrix(0.5099999904632568,0,0,0.5099999904632568,-6.840000152587891,-6.840000152587891)"
                opacity="0.9"
                style={{ display: "block" }}
              >
                <g
                  clipPath="url(#__lottie_element_686)"
                  transform="matrix(0.10000000149011612,0,0,0.10000000149011612,0,0)"
                  opacity="1"
                  style={{ display: "block" }}
                >
                  <g style={{ display: "none" }}>
                    <g>
                      <path
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        fillOpacity="0"
                        strokeMiterlimit="4"
                      ></path>
                    </g>
                  </g>
                  <g
                    clipPath="url(#__lottie_element_707)"
                    style={{ display: "none" }}
                  >
                    <g style={{ display: "none" }}>
                      <g>
                        <path></path>
                        <path
                          strokeLinecap="butt"
                          strokeLinejoin="miter"
                          fillOpacity="0"
                          strokeMiterlimit="4"
                        ></path>
                      </g>
                    </g>
                    <g style={{ display: "none" }}>
                      <g>
                        <path></path>
                        <path
                          strokeLinecap="butt"
                          strokeLinejoin="miter"
                          fillOpacity="0"
                          strokeMiterlimit="4"
                        ></path>
                      </g>
                    </g>
                    <g style={{ display: "none" }}>
                      <g>
                        <path></path>
                        <path
                          strokeLinecap="butt"
                          strokeLinejoin="miter"
                          fillOpacity="0"
                          strokeMiterlimit="4"
                        ></path>
                      </g>
                    </g>
                    <g style={{ display: "none" }}>
                      <g>
                        <path></path>
                        <path
                          strokeLinecap="butt"
                          strokeLinejoin="miter"
                          fillOpacity="0"
                          strokeMiterlimit="4"
                        ></path>
                      </g>
                    </g>
                    <g style={{ display: "none" }}>
                      <g>
                        <path></path>
                        <path
                          strokeLinecap="butt"
                          strokeLinejoin="miter"
                          fillOpacity="0"
                          strokeMiterlimit="4"
                        ></path>
                      </g>
                    </g>
                    <g style={{ display: "none" }}>
                      <g>
                        <path></path>
                        <path
                          strokeLinecap="butt"
                          strokeLinejoin="miter"
                          fillOpacity="0"
                          strokeMiterlimit="4"
                        ></path>
                      </g>
                    </g>
                  </g>
                  <g
                    clipPath="url(#__lottie_element_697)"
                    transform="matrix(1,0,0,1,340,340)"
                    opacity="1"
                    style={{ display: "block" }}
                  >
                    <g
                      transform="matrix(1,0,0,1,54.5,92)"
                      opacity="1"
                      style={{ display: "block" }}
                    >
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path
                          className={`${
                            like
                              ? "fill-fresh_red animate-scaleUpAndDown"
                              : "fill-current"
                          }`}
                          fillOpacity="1"
                          d=" M453.0360107421875,88.71199798583984 C493.77398681640625,30.663999557495117 560.6599731445312,0 634.2509765625,0 C774.4030151367188,0 890.9719848632812,121.58999633789062 890.9719848632812,266.1369934082031 C890.9719848632812,266.1549987792969 890.9719848632812,266.1730041503906 890.9719848632812,266.1910095214844 C890.9810180664062,266.1709899902344 890.9910278320312,266.1510009765625 891,266.1310119628906 C891,270.25201416015625 890.9299926757812,273.37200927734375 890.8779907226562,275.6679992675781 C890.8060302734375,278.8190002441406 890.77001953125,280.4159851074219 891,280.9159851074219 C890.468994140625,311.3190002441406 885.2219848632812,336.43798828125 875.8989868164062,369.62799072265625 C870.6090087890625,375.5880126953125 865.6939697265625,386.81201171875 860.7979736328125,399.1990051269531 C853.073974609375,411.1969909667969 850.1510009765625,417.0090026855469 845.697021484375,428.7699890136719 C841.1519775390625,436.39898681640625 836.323974609375,444.06298828125 831.2449951171875,451.7439880371094 C793.7960205078125,508.54400634765625 743.7080078125,565.073974609375 693.6669921875,615.2520141601562 C615.3359985351562,694.2769775390625 535.5440063476562,760.0579833984375 500.8320007324219,788.6749877929688 C491.24700927734375,796.5759887695312 485.1000061035156,801.6439819335938 483.3680114746094,803.375 C471.0669860839844,815.677978515625 458.7650146484375,815.9860229492188 446.4630126953125,815.9940185546875 C446.1390075683594,815.9979858398438 445.8139953613281,816 445.4859924316406,816 C420.25,816 407.6319885253906,803.3809814453125 395.0140075683594,790.7630004882812 C394.0509948730469,789.7999877929688 391.60101318359375,787.7789916992188 387.8580017089844,784.7830200195312 C349.625,756.5999755859375 263.58599853515625,687.7860107421875 182.74200439453125,604.7830200195312 C121.06600189208984,542.02001953125 61.62200164794922,470.0069885253906 29.091999053955078,399.5880126953125 C16.474000930786133,374.35101318359375 0.7310000061988831,314.2640075683594 0,280.9219970703125 C0.26899999380111694,280.6549987792969 0.22699999809265137,279.04901123046875 0.14399999380111694,275.843994140625 C0.08299999684095383,273.49798583984375 0,270.2969970703125 0,266.1369934082031 C0,121.52400207519531 116.50199890136719,0 256.72100830078125,0 C330.1789855957031,0 397.1310119628906,30.663999557495117 453.0360107421875,88.71199798583984z"
                        ></path>
                      </g>
                    </g>
                  </g>
                  <g
                    clipPath="url(#__lottie_element_690)"
                    style={{ display: "none" }}
                  >
                    <g style={{ display: "none" }}>
                      <g>
                        <path></path>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <span className="font-medium text-[15px] leading-[23px]">6.9w</span>
      </button>
      {/* cmt icon */}
      <button
        title="评论"
        onClick={() => {
          if (!onOpenRightBar) return;
          onOpenRightBar({ comment: true, isOpen: true, user: false });
        }}
        className={`${styleArrayInner} text-white opacity-80 hover:opacity-100`}
      >
        <div>
          <svg
            width={`${widthSvg}`}
            height={`${heightSvg}`}
            className="fill-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 36 36"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M29.25 16.71c0 2.712-1.304 5.04-3.536 7.275-.196.197-.404.392-.62.584-1.953 2.171-3.86 3.437-5.583 3.94-2.243.657-1.376-2.42-1.348-2.518v-.002c-6.214 0-11.413-3.777-11.413-9.278S11.787 6.75 18 6.75c6.214 0 11.25 4.46 11.25 9.96zm-16.715 1.85c.888 0 1.608-.715 1.608-1.597 0-.88-.72-1.595-1.608-1.595-.887 0-1.607.714-1.607 1.595 0 .882.72 1.596 1.607 1.596zm7.072-1.597c0 .882-.72 1.596-1.607 1.596a1.602 1.602 0 01-1.608-1.596c0-.88.72-1.595 1.608-1.595.887 0 1.607.714 1.607 1.595zm3.857 1.596c.888 0 1.607-.714 1.607-1.596a1.6 1.6 0 00-1.607-1.595c-.887 0-1.607.714-1.607 1.595 0 .882.72 1.596 1.607 1.596z"
              fillOpacity="1"
            ></path>
          </svg>
        </div>
        <span className="font-medium text-[15px] leading-[23px]">1.2w</span>
      </button>
      {/* star icon */}
      <button
        className={`${styleArrayInner} text-white opacity-80 hover:opacity-100`}
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="25 25 148 153"
            width={`${widthSvg}`}
            height={`${heightSvg}`}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <clipPath id="__lottie_element_729">
                <rect width="198" height="198" x="0" y="0"></rect>
              </clipPath>
              <clipPath id="__lottie_element_734">
                <path d="M0,0 L1000,0 L1000,1000 L0,1000z"></path>
              </clipPath>
              <clipPath id="__lottie_element_756">
                <path d="M0,0 L120,0 L120,120 L0,120z"></path>
              </clipPath>
              <clipPath id="__lottie_element_763">
                <path d="M0,0 L120,0 L120,120 L0,120z"></path>
              </clipPath>
            </defs>
            <g clipPath="url(#__lottie_element_729)">
              <g
                clipPath="url(#__lottie_element_763)"
                transform="matrix(1,0,0,1,39,39)"
                opacity="1"
                style={{ display: "block" }}
              >
                <g
                  transform="matrix(1,0,0,1,10,12)"
                  opacity="0.9"
                  style={{ display: "block" }}
                >
                  <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                    <path
                      fill="rgb(255,255,255)"
                      fillOpacity="1"
                      d=" M43.79199981689453,4.316999912261963 C45.93899917602539,-1.4390000104904175 54.06100082397461,-1.4390000104904175 56.20800018310547,4.316999912261963 C56.20800018310547,4.316999912261963 65.927001953125,30.375 65.927001953125,30.375 C65.927001953125,30.375 93.6510009765625,31.59000015258789 93.6510009765625,31.59000015258789 C99.7750015258789,31.857999801635742 102.28500366210938,39.60200119018555 97.48799896240234,43.428001403808594 C97.48799896240234,43.428001403808594 75.77100372314453,60.74700164794922 75.77100372314453,60.74700164794922 C75.77100372314453,60.74700164794922 83.18599700927734,87.55599975585938 83.18599700927734,87.55599975585938 C84.8239974975586,93.47799682617188 78.25299835205078,98.26399993896484 73.14099884033203,94.87200164794922 C73.14099884033203,94.87200164794922 50,79.51799774169922 50,79.51799774169922 C50,79.51799774169922 26.858999252319336,94.87200164794922 26.858999252319336,94.87200164794922 C21.746999740600586,98.26399993896484 15.175999641418457,93.47799682617188 16.81399917602539,87.55599975585938 C16.81399917602539,87.55599975585938 24.229000091552734,60.74700164794922 24.229000091552734,60.74700164794922 C24.229000091552734,60.74700164794922 2.51200008392334,43.428001403808594 2.51200008392334,43.428001403808594 C-2.2850000858306885,39.60200119018555 0.22499999403953552,31.857999801635742 6.348999977111816,31.59000015258789 C6.348999977111816,31.59000015258789 34.073001861572266,30.375 34.073001861572266,30.375 C34.073001861572266,30.375 43.79199981689453,4.316999912261963 43.79199981689453,4.316999912261963z"
                    ></path>
                  </g>
                </g>
                <g
                  transform="matrix(1,0,0,1,10,45.720001220703125)"
                  opacity="0.7000000000000001"
                  style={{ display: "block" }}
                >
                  <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                    <path
                      fill="rgb(241,241,241)"
                      fillOpacity="1"
                      d=" M77.80999755859375,25.400999069213867 C77.80999755859375,25.400999069213867 97.48799896240234,9.708000183105469 97.48799896240234,9.708000183105469 C100.77100372314453,7.090000152587891 100.63200378417969,2.635999917984009 98.25399780273438,0 C98.02300262451172,0.24799999594688416 97.76799774169922,0.48500001430511475 97.48799896240234,0.7080000042915344 C97.48799896240234,0.7080000042915344 75.77100372314453,18.027000427246094 75.77100372314453,18.027000427246094 C75.77100372314453,18.027000427246094 77.80999755859375,25.400999069213867 77.80999755859375,25.400999069213867z M17.757999420166016,50.42300033569336 C17.757999420166016,50.42300033569336 16.81399917602539,53.83599853515625 16.81399917602539,53.83599853515625 C15.175999641418457,59.757999420166016 21.746999740600586,64.54399871826172 26.858999252319336,61.152000427246094 C26.858999252319336,61.152000427246094 50,45.79800033569336 50,45.79800033569336 C50,45.79800033569336 73.14099884033203,61.152000427246094 73.14099884033203,61.152000427246094 C78.25299835205078,64.54399871826172 84.8239974975586,59.757999420166016 83.18599700927734,53.83599853515625 C83.18599700927734,53.83599853515625 82.24199676513672,50.42300033569336 82.24199676513672,50.42300033569336 C80.31900024414062,53.132999420166016 76.4280014038086,54.33300018310547 73.14099884033203,52.152000427246094 C73.14099884033203,52.152000427246094 50,36.79800033569336 50,36.79800033569336 C50,36.79800033569336 26.858999252319336,52.152000427246094 26.858999252319336,52.152000427246094 C23.57200050354004,54.33300018310547 19.680999755859375,53.132999420166016 17.757999420166016,50.42300033569336z M1.746000051498413,0 C-0.6320000290870667,2.635999917984009 -0.7710000276565552,7.090000152587891 2.51200008392334,9.708000183105469 C2.51200008392334,9.708000183105469 22.190000534057617,25.400999069213867 22.190000534057617,25.400999069213867 C22.190000534057617,25.400999069213867 24.229000091552734,18.027000427246094 24.229000091552734,18.027000427246094 C24.229000091552734,18.027000427246094 2.51200008392334,0.7080000042915344 2.51200008392334,0.7080000042915344 C2.2320001125335693,0.48500001430511475 1.9769999980926514,0.24799999594688416 1.746000051498413,0z"
                    ></path>
                  </g>
                </g>
                <g
                  transform="matrix(1,0,0,1,60,60)"
                  opacity="1"
                  style={{ display: "block" }}
                ></g>
              </g>
              <g
                clipPath="url(#__lottie_element_756)"
                style={{ display: "none" }}
              >
                <g style={{ display: "none" }}>
                  <g>
                    <path></path>
                  </g>
                </g>
              </g>
              <g
                transform="matrix(1,0,0,1,98.68900299072266,98.85199737548828)"
                opacity="1"
                style={{ display: "block" }}
              >
                <g
                  opacity="0"
                  transform="matrix(1,0,0,1,0.3109999895095825,0.14800000190734863)"
                >
                  <path
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    fillOpacity="0"
                    strokeMiterlimit="4"
                    stroke="rgb(255,90,0)"
                    strokeOpacity="1"
                    strokeWidth="20"
                    d=" M0,0 C0,0 0,0 0,0 C0,0 0,0 0,0 C0,0 0,0 0,0 C0,0 0,0 0,0z"
                  ></path>
                </g>
              </g>
              <g
                clipPath="url(#__lottie_element_734)"
                style={{ display: "none" }}
              >
                <g style={{ display: "none" }}>
                  <g>
                    <path></path>
                    <path
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      fillOpacity="0"
                      strokeMiterlimit="4"
                    ></path>
                  </g>
                </g>
                <g style={{ display: "none" }}>
                  <g>
                    <path></path>
                    <path
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      fillOpacity="0"
                      strokeMiterlimit="4"
                    ></path>
                  </g>
                </g>
                <g style={{ display: "none" }}>
                  <g>
                    <path></path>
                    <path
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      fillOpacity="0"
                      strokeMiterlimit="4"
                    ></path>
                  </g>
                </g>
                <g style={{ display: "none" }}>
                  <g>
                    <path></path>
                    <path
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      fillOpacity="0"
                      strokeMiterlimit="4"
                    ></path>
                  </g>
                </g>
                <g style={{ display: "none" }}>
                  <g>
                    <path></path>
                    <path
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      fillOpacity="0"
                      strokeMiterlimit="4"
                    ></path>
                  </g>
                </g>
                <g style={{ display: "none" }}>
                  <g>
                    <path></path>
                    <path
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      fillOpacity="0"
                      strokeMiterlimit="4"
                    ></path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <span className="font-medium text-[15px] leading-[23px]">1.0w</span>
      </button>
      {/* share icon */}
      <button
        title="分享"
        className={`${styleArrayInner} text-white opacity-80 hover:opacity-100`}
      >
        <div>
          <svg
            width={`${widthSvg}`}
            height={`${heightSvg}`}
            className="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 36 36"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.884 9.417c-1.209-1.157-3.214-.3-3.214 1.373v2.396c-.132 0-.263.001-.393.004-1.402-.039-6.254.115-9.667 3.775-2.361 2.532-3.423 6.562-3.357 8.64-.062 2.075.905 1.888 1.165 1.41 2.976-5.46 12.252-3.79 12.252-3.79v2.265c0 1.637 1.932 2.508 3.159 1.424l7.989-7.059a1.9 1.9 0 00.055-2.797l-7.99-7.641z"
              fillOpacity="1"
            ></path>
          </svg>
        </div>
      </button>
      {/* report icon */}

      <Button
        onClick={handleOpenOptions}
        text=""
        backgroundColor="bg-transparent"
        width="w-auo"
        height="h-auto"
        styleArray={`${styleArrayInner} text-white opacity-80 hover:opacity-100 relative`}
        icon={
          <div>
            <svg
              width={`${widthSvg}`}
              height={`${heightSvg}`}
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 36 36"
            >
              <path d="M13.556 17.778a1.778 1.778 0 11-3.556 0 1.778 1.778 0 013.556 0zM19.778 17.778a1.778 1.778 0 11-3.556 0 1.778 1.778 0 013.556 0zM24.222 19.556a1.778 1.778 0 100-3.556 1.778 1.778 0 000 3.556z"></path>
            </svg>
          </div>
        }
      >
        <div className="bg-white absolute bottom-full left-0"></div>
      </Button>
    </div>
  );
};

export default LikeCmtShare;
