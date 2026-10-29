import { Fragment } from 'react';
import { S, A, AR, R } from '../../lib/view-helpers';

export default function FlyingLogo({ v }) {
  return (
    <>
    <a href={"#top"} aria-label={AR(v.t?.home)} style={{ "position": "fixed", "top": "0", "left": "0", "zIndex": "60", "display": "block", "transform": `translate(${S(v.logo?.x)}px, ${S(v.logo?.y)}px)`, "transformOrigin": "0 0", "textDecoration": "none", "willChange": "transform" }}>
      {' '}
      <img src={"/media/logo/ph-mark.svg?v=2"} alt={"المساكن المتقنة — Perfect Home"} style={{ "display": "block", "height": `${S(v.logo?.h)}px`, "width": "auto", "margin": "0 auto" }} />
      {' '}
      <img src={"/media/logo/ph-wordmark.svg?v=2"} alt={""} aria-hidden={"true"} style={{ "display": "block", "width": `${S(v.logo?.ww)}px`, "height": "auto", "margin": `${S(v.logo?.gap)}px 0 0 ${S(v.logo?.wx)}px`, "opacity": `${S(v.logo?.wordOp)}` }} />
      {' '}
    </a>
    </>
  );
}
