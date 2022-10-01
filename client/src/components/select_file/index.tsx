import React, { FormEvent } from "react";
import Button from "../button";
import Input from "../input";

type Props = {
  fileName?: string;
  onChangeFile: (file: File | undefined) => void;
};
const SelectFile = ({ fileName, onChangeFile }: Props) => {
  const handleChangeFile = (e: FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    onChangeFile(file);
  };
  return (
    <section className="w-[260px] h-[458px] rounded-lg border-[2px] border-dashed flex justify-center items-center border-[rgba(22,24,35,0.2)]">
      <div className="flex justify-center flex-col items-center px-[35px]">
        <label
          htmlFor="file_upload"
          className="flex flex-col justify-center items-center"
        >
          <Input
            onChange={handleChangeFile}
            type="file"
            className="hidden"
            id="file_upload"
            name="file_upload"
          />
          <img src="/images/upload_icon.svg" alt="Upload Icon" />
          <p className="text-center text-[rgb(22,24,35)] opacity-100 font-semibold leading-normal text-[18px] mt-6">
            Select video to upload{" "}
          </p>
          <span className="text-center text-[rgb(22,24,35)] font-normal leading-normal text-sm opacity-50 mb-6 mt-1">
            Or drag and drop a file
          </span>
          <p className="text-center text-[rgb(22,24,35)] font-normal leading-normal text-sm opacity-50 mb-[6px]">
            MP4 or WebM{" "}
          </p>
          <p className="text-center text-[rgb(22,24,35)] font-normal leading-normal text-sm opacity-50 mb-[6px] ">
            720x1280 resolution or higher
          </p>
          <p className="text-center text-[rgb(22,24,35)] font-normal leading-normal text-sm opacity-50 mb-[6px]">
            Up to 10 minutes
          </p>
          <p className="text-center text-[rgb(22,24,35)] font-normal leading-normal text-sm opacity-50 mb-[6px]">
            Less than 2 GB
          </p>
          <Button
            text="Select File"
            className="h-[36px] rounded-sm font-semibold mt-[32px] text-white w-[186px]"
          />
        </label>
        {fileName && <p className="truncate-text">{fileName}</p>}
      </div>
    </section>
  );
};

export default SelectFile;
