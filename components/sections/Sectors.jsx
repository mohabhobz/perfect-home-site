import { Fragment } from 'react';
import { S, A, AR, R } from '../../lib/view-helpers';

export default function Sectors({ v }) {
  return (
    <>
    <section id={"sectors"} ref={R(v.secRef)} style={{ "position": "relative", "height": `${S(v.secVh)}vh`, "background": `${S(v.th?.surface)}`, "borderTop": `1px solid ${S(v.th?.line)}` }}>
      {' '}
      <div style={{ "position": "sticky", "top": "0", "height": "100vh", "overflow": "hidden", "display": "flex", "flexDirection": "column", "justifyContent": "center", "gap": "clamp(28px, 4vh, 48px)", "paddingTop": "72px", "boxSizing": "border-box" }}>
        {' '}
        <div style={{ "width": "100%", "padding": `0 ${S(v.edge)}`, "boxSizing": "border-box", "display": "flex", "flexWrap": "wrap", "gap": "16px 48px", "alignItems": "flex-end", "justifyContent": "space-between" }}>
          {' '}
          <div className={"rv"} style={{ "flex": "1 1 520px", "minWidth": "0" }}>
            {' '}
            <p style={{ "margin": "0 0 18px", "fontSize": "14px", "color": `${S(v.th?.accent)}` }}>
              {`${S(v.t?.sectors?.eyebrow)}`}
            </p>
            {' '}
            <h2 style={{ "margin": "0", "fontFamily": `${S(v.font?.display)}`, "fontWeight": "700", "fontSize": "clamp(34px, 3.6vw, 56px)", "lineHeight": `${S(v.font?.lh)}` }}>
              {`${S(v.t?.sectors?.title)}`}
            </h2>
            {' '}
          </div>
          {' '}
        </div>
        {' '}
        <div ref={R(v.trackRef)} style={{ "display": "flex", "gap": "clamp(16px, 2vw, 24px)", "paddingInline": `${S(v.edge)}`, "transform": `translateX(${S(v.secX)}px)`, "willChange": "transform", "width": "max-content" }}>
          {' '}
          {(v.sectors || []).map((w, __i5) => (
            <Fragment key={__i5}>
              {' '}
              <a href={"#contact"} className={"ph-card"} style={{ "flex": "0 0 auto", "width": "min(72vw, 1080px)", "height": "min(62vh, 620px)", "position": "relative", "overflow": "hidden", "display": "block", "textDecoration": "none", "color": "#EDEAE3", "background": `${S(v.th?.placeholder)}` }}>
                {' '}
                <div className={"ph-zoom"}>
                  {' '}
                  {w?.has ? (
                    <>
                      {' '}
                      <img src={A(w?.src)} srcSet={A(w?.set)} sizes={"(max-width: 760px) 320px, 72vw"} loading={"lazy"} alt={A(w?.title)} style={{ "position": "absolute", "inset": "0", "width": "100%", "height": "100%", "objectFit": "cover", "display": "block", "transform": `scale(${S(w?.scale)}) translateX(${S(w?.par)}px)` }} />
                      {' '}
                    </>
                  ) : null}
                  {' '}
                </div>
                {' '}
                <div aria-hidden={"true"} style={{ "position": "absolute", "inset": "0", "background": "linear-gradient(0deg, rgba(8,9,11,0.72) 0%, rgba(8,9,11,0.2) 38%, rgba(8,9,11,0) 60%)" }} />
                {' '}
                <div style={{ "position": "absolute", "insetInline": "clamp(20px, 3vw, 40px)", "bottom": "clamp(20px, 3vw, 36px)", "display": "flex", "flexWrap": "wrap", "gap": "10px 40px", "alignItems": "flex-end", "justifyContent": "space-between" }}>
                  {' '}
                  <span style={{ "fontFamily": `${S(v.font?.display)}`, "fontWeight": "700", "fontSize": "clamp(24px, 2.2vw, 34px)", "lineHeight": `${S(v.font?.lh)}` }}>
                    {`${S(w?.title)}`}
                  </span>
                  {' '}
                  <span style={{ "flex": "0 1 380px", "fontSize": "15px", "lineHeight": "1.75", "color": "#D2D5D9" }}>
                    {`${S(w?.body)}`}
                  </span>
                  {' '}
                </div>
                {' '}
              </a>
              {' '}
            </Fragment>
          ))}
          {' '}
        </div>
        {' '}
      </div>
      {' '}
    </section>
    </>
  );
}
