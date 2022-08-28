import { useRef } from "react";
import { VideoSlide } from "..";
import { AvatarCardLink } from "../../components";
import { useOnScreen } from "../../hooks/use_on_screen";
import { IStatistics } from "../../interfaces/statistic";
import { IVideo } from "../../interfaces/video.interface";
import { ISearchPapeData } from "../../pages/search_page";
import { getDayFromVideoUploaded } from "../../utils/time";

type Props = {
  avatarThumb: string;
  nickname: string;
  className?: string;
  video: IVideo;
  statistics?: IStatistics;
};

const VideoSearchedContainer = ({
  avatarThumb,
  statistics,
  nickname,
  video,
  className = "w-full h-full",
}: Props) => {
  const onScreenRef = useRef<HTMLDivElement | null>(null);
  const onScreen: ISearchPapeData = useOnScreen<HTMLDivElement>(
    onScreenRef,
    "-50% 0% -30% 0%"
  );
  console.log({ onScreen });
  const playerId = video._id.toString();
  return (
    <div className="w-auto h-auto mb-16 space-y-4">
      <div className="w-full h-auto space-y-4">
        <div className="flex justify-start items-center space-x-4">
          <AvatarCardLink
            target="_blank"
            href={`/user/${video.author_id.uid}`}
            title={nickname}
            firstNickNameCharacter={nickname[0]}
            image={avatarThumb}
            borderRadius="rounded-full"
            height="h-10"
            width="w-10"
            hint={nickname}
          />
          <h4 className="text-base text-gray-100">{nickname}</h4>
          <div className="flex justify-center items-start space-x-2">
            <span className="text-gray-200 text-sm leading-3 font-semibold">
              .
            </span>
            <span className="text-gray-200 text-xs font-normal">
              {getDayFromVideoUploaded(video.createdAt)}年前
            </span>
          </div>
        </div>
        <div>
          <p className="text-base text-gray-200">{video.desc}</p>
        </div>
      </div>
      <div className={className}>
        <div ref={onScreenRef} id={playerId} className="w-full h-full">
          <VideoSlide
            playerId={playerId}
            searchPageData={onScreen}
            allowedPlay={onScreen.isActive ? true : false}
            statistics={statistics}
            avatarThumb={avatarThumb}
            nickname={nickname}
            video={video}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoSearchedContainer;
