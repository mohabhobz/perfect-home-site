import { Fragment } from 'react';
import { S, A, AR, R } from '../../lib/view-helpers';

export default function Loader({ v }) {
  return (
    <>
    {v.ld?.show ? (
      <>
        {' '}
        <div data-loader={"1"} role={"progressbar"} aria-label={AR(v.t?.loading)} aria-valuemin={"0"} aria-valuemax={"100"} style={{ "position": "fixed", "inset": "0", "zIndex": "100", "background": "#000000", "display": "flex", "alignItems": "center", "justifyContent": "center", "opacity": `${S(v.ld?.op)}`, "transition": "opacity 700ms cubic-bezier(0.23,1,0.32,1)", "pointerEvents": `${S(v.ld?.pe)}` }}>
          {' '}
          <div style={{ "display": "flex", "flexDirection": "column", "alignItems": "center" }}>
            {' '}
            <svg viewBox={"146 3 455.5 671"} aria-hidden={"true"} style={{ "display": "block", "height": "min(26vh, 230px)", "width": "auto", "aspectRatio": "455.5 / 671", "overflow": "visible" }}>
              <defs>
                <mask id={"phm-g"} maskUnits={"userSpaceOnUse"} x={"0"} y={"-100"} width={"800"} height={"900"}>
                  <path ref={R(v.ldRef0)} className={"ph-ldp"} data-ld={"1"} d={"M96 43.5 H362.5 A40 40 0 0 1 402.5 83.5 V220 A40 40 0 0 1 362.5 260 H226 A40 40 0 0 0 186 300 V560"} fill={"none"} stroke={"#fff"} strokeWidth={"114"} />
                </mask>
                <mask id={"phm-s"} maskUnits={"userSpaceOnUse"} x={"0"} y={"-100"} width={"800"} height={"900"}>
                  <path ref={R(v.ldRef1)} className={"ph-ldp"} data-ld={"1"} d={"M561.75 120 V720"} fill={"none"} stroke={"#fff"} strokeWidth={"114"} />
                  <path ref={R(v.ldRef2)} className={"ph-ldp"} data-ld={"1"} d={"M561.75 418 H385 A40 40 0 0 0 345 458 V720"} fill={"none"} stroke={"#fff"} strokeWidth={"114"} />
                </mask>
              </defs>
              <path d={"M146 79 A76 76 0 0 1 222.00 3.00 H367.00 A76 76 0 0 1 443.00 79.00 V224.00 A76 76 0 0 1 367.00 300.00 H226 V515 H222.00 A76 76 0 0 1 146.00 439.00 V296.00 A76 76 0 0 1 222.00 220.00 H362 V84 H146 Z"} fill={"rgba(237,234,227,0.05)"} />
              <path d={"M522 163 H525.50 A76 76 0 0 1 601.50 239.00 V596.00 A76 76 0 0 1 525.50 672.00 H522 V457 H384 V672 H382.00 A76 76 0 0 1 306.00 596.00 V455.00 A76 76 0 0 1 382.00 379.00 H522 Z"} fill={"rgba(237,234,227,0.05)"} />
              <path d={"M146 79 A76 76 0 0 1 222.00 3.00 H367.00 A76 76 0 0 1 443.00 79.00 V224.00 A76 76 0 0 1 367.00 300.00 H226 V515 H222.00 A76 76 0 0 1 146.00 439.00 V296.00 A76 76 0 0 1 222.00 220.00 H362 V84 H146 Z"} fill={"#A8844A"} mask={"url(#phm-g)"} />
              <path d={"M522 163 H525.50 A76 76 0 0 1 601.50 239.00 V596.00 A76 76 0 0 1 525.50 672.00 H522 V457 H384 V672 H382.00 A76 76 0 0 1 306.00 596.00 V455.00 A76 76 0 0 1 382.00 379.00 H522 Z"} fill={"#8E9196"} mask={"url(#phm-s)"} />
            </svg>
            {' '}
            <img src={"/media/logo/ph-wordmark.svg?v=2"} alt={""} aria-hidden={"true"} style={{ "display": "block", "width": "calc(min(26vh, 230px) * 1.1475)", "height": "auto", "marginTop": "calc(min(26vh, 230px) * 0.109)", "opacity": `${S(v.ld?.wordOp)}`, "transform": `translateY(${S(v.ld?.wordTy)}px)`, "filter": `blur(${S(v.ld?.wordBlur)}px)`, "transition": "opacity 600ms cubic-bezier(0.23,1,0.32,1), transform 700ms cubic-bezier(0.23,1,0.32,1), filter 600ms ease" }} />
            {' '}
          </div>
          {' '}
        </div>
        {' '}
      </>
    ) : null}
    </>
  );
}
