const VerificationMark = () => {
  return (
    <div className="flex justify-start items-center space-x-1 ">
      <div className="w-4 h-4">
        <img
          src="/images/verify.svg"
          alt="Verify Account"
          className="w-full h-full object-cover object-center rounded-full"
        />
      </div>

      <span className="text-xs leading-5 font-normal opacity-70">
        娱乐视频自媒体{" "}
      </span>
    </div>
  );
};

export default VerificationMark;
