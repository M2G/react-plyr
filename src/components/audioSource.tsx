import React from "react";

function audioSource(
  sources: {
    src: string;
    type: string;
  }[] = [],
): any[] {
  const audioSources: any[] = [];

  if (sources?.length) {
    for (let i = 0; i < sources.length; i += 1) {
      const { src = '', type = '' } = sources[i];
      audioSources.push(<source key={i} src={src} type={type} />);
    }
  }
  // eslint-disable-next-line
  return audioSources;
}

export default audioSource;
