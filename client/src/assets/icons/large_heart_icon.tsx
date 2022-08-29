import React from "react";
type Props = {
  widthSvg?: number;
  heightSvg?: number;
  isLiked?: boolean;
};
const LargeheartIcon = ({ heightSvg, widthSvg, isLiked }: Props) => {
  return (
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
                      isLiked
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
  );
};

export default LargeheartIcon;