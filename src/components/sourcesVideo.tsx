/*eslint-disable*/
import React from "react";

function sourcesVideo(
  sources: {
    src: string;
    type: string;
    size?: number;
  }[] = [],
): any[] {
  const sourcesVideos: any[] = [];

  if (sources?.length) {
    for (let i = 0; i < sources.length; i += 1) {
      const { src = '', type = '', size = 0 } = sources[i];

      // @ts-ignore
      sourcesVideos.push(<source key={i} size={size} src={src} type={type} />);
    }
  }

  return sourcesVideos;
}

export default sourcesVideo;
