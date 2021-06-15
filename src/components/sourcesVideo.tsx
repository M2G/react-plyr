import React from "react";

function sourcesVideo(
  sources: {
    src: string;
    type: string;
    size?: string;
  }[] = [],
): any[] {
  const sourcesVideos: any[] = [];

  if (sources?.length) {
    for (let i = 0; i < sources.length; i += 1) {
      const { src = '', type = '', size = '' } = sources[i];

      sourcesVideos.push(<source key={i} sizes={size} src={src} type={type} />);
    }
  }

  return sourcesVideos;
}

export default sourcesVideo;
