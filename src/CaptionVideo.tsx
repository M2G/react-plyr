/* eslint-disable */
import * as React from "react";
import { SETTINGS } from '@constants';

const { CAPTIONS } = SETTINGS;

function CaptionVideo(tracks: {
default: boolean;
  kind: string;
  label: string;
  src: string;
  srcLang: string;
}[] = []) {
  const captionsMap: {}[] = [];

  if (tracks?.length) {
    for (let index = 0; index < tracks.length; index += 1) {
      const {
        kind = CAPTIONS,
        label,
        src,
        srcLang,
        default: def,
        ...attributes
      } = tracks[index];

      captionsMap.push(
        <track
          key={index}
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

  return captionsMap;
}

export default CaptionVideo;
