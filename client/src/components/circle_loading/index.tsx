import React from "react";
import "./style.css";
type Props = {
  width?: number;
  height?: number;
  strokeColor?: string;
};
const CircleLoading = ({ height, width, strokeColor }: Props) => {
  return (
    <div className="flex justify-center items-center">
      <div
        style={{
          width: width && `${width}px`,
          height: height && `${height}px`,
          borderTopColor: strokeColor && `${strokeColor}`,
          borderLeftColor: strokeColor && `${strokeColor}`,
          borderBottomColor: strokeColor && `${strokeColor}`,
        }}
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-r-transparent border-red-600"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default CircleLoading;
