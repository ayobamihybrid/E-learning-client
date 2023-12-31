import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
  const [videoData, setVideoData] = useState({
    otp: '',
    playbackInfo: '',
  });

  useEffect(() => {
    axios
      .post(
        `https://e-learning-server-afb9da638086.herokuapp.com/getVdoCipherOTP`,
        {
          videoId: videoUrl,
        }
      )
      .then((res) => {
        setVideoData(res.data);
      });
  }, [videoUrl]);

  return (
    <div
      style={{ paddingTop: '56.25%', position: 'relative', overflow: 'hidden' }}
    >
      {videoData.otp && videoData.playbackInfo !== '' && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=FSL8VS87g0AFt5xx`}
          style={{
            border: 0,
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
