/* eslint-disable */
import * as React from "react";

function SourcesVideo(sources: {
  src: string;
  type: string;
  size?: number;
}[] = []): {}[] {
  const sourcesVideo: {}[] = [];

  if (sources?.length) {
    for (let index = 0; index < sources.length; index += 1) {
      const { src = '', type = '', size = 0 } = sources[index];
      sourcesVideo.push(
        <source
          key={index}
          // @ts-ignore
          size={size}
          src={src}
          type={type}
        />,
      );
    }
  }

  return SourcesVideo;
}

export default SourcesVideo;
