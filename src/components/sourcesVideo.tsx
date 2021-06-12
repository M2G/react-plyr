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
      // eslint-disable-next-line
      //@ts-ignore
      sourcesVideos.push(<source key={i} size={size} src={src} type={type} />);
    }
  }
  // eslint-disable-next-line
  return sourcesVideos;
}

export default sourcesVideo;
