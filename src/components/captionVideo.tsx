import React from "react";
import { SETTINGS } from "../constants";

const { CAPTIONS } = SETTINGS;

function captionVideo(
  tracks: {
    default: boolean;
    kind: string;
    label: string;
    src: string;
    srcLang: string;
  }[] = [],
): any {
  const captionsMap: any[] = [];

  if (tracks?.length) {
    for (let i = 0; i < tracks.length; i += 1) {
      const {
        kind = CAPTIONS,
        label,
        src,
        srcLang,
        default: def,
        ...attributes
      } = tracks[i];

      captionsMap.push(
        <track
          key={i}
          default={def}
          kind={kind}
          label={label}
          src={src}
          srcLang={srcLang}
          {...attributes}
        />,
      );
    }
  }
  // eslint-disable-next-line
  return captionsMap;
}

export default captionVideo;
