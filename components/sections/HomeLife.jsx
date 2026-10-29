import { Fragment } from 'react';
import { S, A, AR, R } from '../../lib/view-helpers';

export default function HomeLife({ v }) {
  return (
    <>
    <section id={"home-life"} ref={R(v.homeRef)} aria-label={AR(v.t?.home2?.title)} style={{ "position": "relative", "height": "220vh", "background": "#EDEAE3" }}>
      {' '}
      <div className={"ph-stage"} style={{ "position": "sticky", "top": "0", "height": "100vh", "overflow": "hidden", "color": "#15171A" }}>
        {' '}
        <img loading={"lazy"} decoding={"async"} src={A(v.hl?.img)} srcSet={A(v.hl?.set)} sizes={"(max-width: 760px) 320px, 100vw"} alt={A(v.t?.home2?.alt)} className={"ph-hl-img"} style={{ "position": "absolute", "inset": "0", "width": "100%", "height": "100%", "objectFit": "cover", "objectPosition": `${S(v.hl?.pos)}`, "transform": `scaleX(${S(v.hl?.flip)}) scale(${S(v.hl?.scale)})`, "transformOrigin": "50% 60%" }} />
        {' '}
        <div aria-hidden={"true"} style={{ "position": "absolute", "inset": "0", "background": `linear-gradient(${S(v.scrimDir)}, rgba(240,237,230,0.7) 0%, rgba(240,237,230,0.35) 30%, rgba(240,237,230,0) 46%)` }} />
        {' '}
        <div aria-hidden={"true"} className={"ph-hl-fade"} />
        {' '}
        <div className={"ph-hl-txt"} style={{ "position": "absolute", "insetInlineStart": `${S(v.edge)}`, "top": "50%", "width": "min(520px, calc(100% - 48px))", "opacity": `${S(v.hl?.txtOp)}`, "transform": `translateY(calc(-50% + ${S(v.hl?.txtTy)}px))`, "filter": `blur(${S(v.hl?.txtBlur)}px)` }}>
          {' '}
          <p style={{ "margin": "0 0 20px", "fontSize": "14px", "color": "#8A6A2E" }}>
            {`${S(v.t?.home2?.eyebrow)}`}
          </p>
          {' '}
          <h2 style={{ "margin": "0", "fontFamily": `${S(v.font?.display)}`, "fontWeight": "700", "fontSize": "clamp(36px, 4vw, 60px)", "lineHeight": `${S(v.font?.lh)}` }}>
            {`${S(v.t?.home2?.title)}`}
          </h2>
          {' '}
          <p style={{ "margin": "22px 0 0", "maxWidth": "440px", "fontSize": "17px", "lineHeight": "1.8", "color": "#3E434A" }}>
            {`${S(v.t?.home2?.body)}`}
          </p>
          {' '}
        </div>
        {' '}
        {(v.hl?.cards || []).map((cd, __i4) => (
          <Fragment key={__i4}>
            {' '}
            <div className={`ph-float ${S(cd?.cls)}`} style={{ "position": "absolute", "left": `${S(cd?.l)}`, "right": `${S(cd?.r)}`, "top": `${S(cd?.t)}`, "bottom": `${S(cd?.b)}`, "opacity": `${S(cd?.op)}`, "transform": `translateY(${S(cd?.ty)}px) scale(${S(cd?.sc)})`, "animationDelay": `${S(cd?.delay)}ms` }}>
              {' '}
              <div className={"ph-glass"} style={{ "padding": "18px 20px", "display": "flex", "alignItems": "center", "gap": "16px" }}>
                {' '}
                {cd?.ring ? (
                  <>
                    {' '}
                    <svg width={"64"} height={"64"} viewBox={"0 0 64 64"} aria-hidden={"true"} style={{ "flex": "0 0 auto", "transform": "rotate(-90deg)" }}>
                      <circle cx={"32"} cy={"32"} r={"27"} fill={"none"} stroke={"rgba(21,23,26,0.16)"} strokeWidth={"5"} />
                      <circle cx={"32"} cy={"32"} r={"27"} fill={"none"} stroke={"#7A5A22"} strokeWidth={"5"} strokeLinecap={"round"} strokeDasharray={"169.6"} strokeDashoffset={A(v.hl?.ringOff)} />
                    </svg>
                    {' '}
                  </>
                ) : null}
                {' '}
                {cd?.thumbs ? (
                  <>
                    {' '}
                    <span aria-hidden={"true"} style={{ "flex": "0 0 auto", "display": "flex", "gap": "4px" }}>
                      <img loading={"lazy"} decoding={"async"} src={A(v.hl?.t1)} alt={""} style={{ "width": "56px", "height": "64px", "objectFit": "cover", "display": "block", "borderRadius": "10px" }} />
                      <img loading={"lazy"} decoding={"async"} src={A(v.hl?.t2)} alt={""} style={{ "width": "56px", "height": "64px", "objectFit": "cover", "display": "block", "borderRadius": "10px" }} />
                    </span>
                    {' '}
                  </>
                ) : null}
                {' '}
                <span style={{ "display": "flex", "flexDirection": "column", "gap": "4px", "minWidth": "0" }}>
                  {' '}
                  <span style={{ "fontSize": "13px", "color": "#2E3237" }}>
                    {`${S(cd?.k)}`}
                  </span>
                  {' '}
                  <span style={{ "fontSize": "17px", "fontWeight": "700", "whiteSpace": "nowrap" }}>
                    <span dir={"auto"} style={{ "unicodeBidi": "isolate" }}>
                      {`${S(cd?.v)}`}
                    </span>
                  </span>
                  {' '}
                </span>
                {' '}
              </div>
              {' '}
            </div>
            {' '}
          </Fragment>
        ))}
        {' '}
      </div>
      {' '}
    </section>
    </>
  );
}
