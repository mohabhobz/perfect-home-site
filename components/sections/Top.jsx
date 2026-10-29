import { Fragment } from 'react';
import { S, A, AR, R } from '../../lib/view-helpers';

export default function Top({ v }) {
  return (
    <>
    <section id={"top"} ref={R(v.filmRef)} aria-label={AR(v.t?.filmLabel)} style={{ "position": "relative", "height": `${S(v.filmVh)}vh`, "background": "#000000" }}>
      {' '}
      <div className={"ph-stage"} style={{ "position": "sticky", "top": "0", "height": "100vh", "overflow": "hidden", "color": "#EDEAE3" }}>
        {' '}
        {(v.clips || []).map((k, __i4) => (
          <Fragment key={__i4}>
            {' '}
            <div style={{ "position": "absolute", "inset": "0", "opacity": `${S(k?.op)}`, "transition": "opacity 350ms linear" }}>
              {' '}
              {k?.load ? (
                <>
                  {' '}
                  <video ref={R(k?.setRef)} src={A(k?.src)} muted={!!v.yes} playsInline={!!v.yes} preload={"auto"} aria-hidden={"true"} style={{ "width": "100%", "height": "100%", "objectFit": "cover", "display": "block", "transform": `scaleX(${S(v.vidFlip)})` }} />
                  {' '}
                </>
              ) : null}
              {' '}
            </div>
            {' '}
          </Fragment>
        ))}
        {' '}
        <div aria-hidden={"true"} style={{ "position": "absolute", "inset": "0", "pointerEvents": "none", "background": "linear-gradient(180deg, rgba(8,9,11,0.45) 0%, rgba(8,9,11,0) 20%), linear-gradient(0deg, rgba(8,9,11,0.35) 0%, rgba(8,9,11,0) 24%)" }} />
        {' '}
        <div aria-hidden={"true"} style={{ "position": "absolute", "inset": "0", "pointerEvents": "none", "background": `linear-gradient(${S(v.scrimDir)}, rgba(8,9,11,0.42) 0%, rgba(8,9,11,0.22) 26%, rgba(8,9,11,0.06) 46%, rgba(8,9,11,0) 60%)` }} />
        {' '}
        <div aria-hidden={"true"} style={{ "position": "absolute", "inset": "0", "background": "#000000", "opacity": `${S(v.introVeil)}`, "pointerEvents": "none" }} />
        {' '}
        <div aria-hidden={"true"} className={"ph-cue"} style={{ "position": "absolute", "bottom": "44px", "left": "50%", "transform": "translateX(-50%)", "display": "flex", "flexDirection": "column", "alignItems": "center", "gap": "12px", "color": "#A9AEB5", "fontSize": "13px", "opacity": `${S(v.cueOp)}` }}>
          {' '}
          <span>
            {`${S(v.t?.cue)}`}
          </span>
          {' '}
          <div style={{ "width": "1px", "height": "48px", "background": "linear-gradient(#A9AEB5, rgba(169,174,181,0))" }} />
          {' '}
        </div>
        {' '}
        <div aria-hidden={"true"} style={{ "position": "absolute", "top": "16vh", "bottom": "40vh", "insetInlineStart": "max(clamp(28px, 3.4vw, 52px), calc((100vw - 1360px) / 2 + 40px))", "width": "1px", "opacity": `${S(v.railOp)}` }}>
          {' '}
          <div style={{ "position": "absolute", "inset": "0", "background": "rgba(237,234,227,0.16)" }} />
          {' '}
          <div style={{ "position": "absolute", "top": "0", "insetInlineStart": "0", "width": "1px", "height": `${S(v.railPct)}%`, "background": `${S(v.accent)}` }} />
          {' '}
          {(v.chapters || []).map((c, __i5) => (
            <Fragment key={__i5}>
              {' '}
              <div style={{ "position": "absolute", "top": `${S(c?.nodeTop)}%`, "insetInlineStart": "-3px", "width": "7px", "height": "7px", "borderRadius": "50%", "boxSizing": "border-box", "border": `1px solid ${S(c?.nodeLine)}`, "background": `${S(c?.nodeFill)}`, "transform": "translateY(-50%)" }} />
              {' '}
            </Fragment>
          ))}
          {' '}
          <div style={{ "position": "absolute", "top": `${S(v.railPct)}%`, "insetInlineStart": "-5px", "width": "11px", "height": "11px", "borderRadius": "50%", "background": `${S(v.accent)}`, "boxShadow": "0 0 0 6px rgba(201,164,92,0.14)", "transform": "translateY(-50%)" }} />
          {' '}
        </div>
        {' '}
        <div dir={A(v.dir)} className={"ph-follow"} style={{ "position": "absolute", "top": `${S(v.followTop)}`, "insetInlineStart": "max(clamp(28px, 3.4vw, 52px), calc((100vw - 1360px) / 2 + 40px))", "width": "min(760px, 52vw)", "transform": "translateY(-10px)", "pointerEvents": "none", "opacity": `${S(v.railOp)}` }}>
          {' '}
          {(v.chapters || []).map((c, __i5) => (
            <Fragment key={__i5}>
              {' '}
              <div style={{ "position": "absolute", "top": "0", "insetInlineStart": "0", "width": "100%", "display": "flex", "alignItems": "flex-start", "gap": "16px", "opacity": `${S(c?.headOp)}` }}>
                {' '}
                <div style={{ "flex": "0 0 auto", "height": "1px", "width": `${S(c?.lineW)}px`, "background": `${S(v.accent)}`, "marginTop": "9px" }} />
                {' '}
                <div style={{ "flex": "1 1 auto", "minWidth": "0" }}>
                  {' '}
                  <p style={{ "margin": "0 0 14px", "fontFamily": `${S(v.font?.alt)}`, "fontSize": "13px", "letterSpacing": "0.04em", "color": `${S(v.accent)}`, "lineHeight": "20px" }}>
                    {`${S(c?.service)}`}
                  </p>
                  {' '}
                  <h2 style={{ "margin": "0", "fontFamily": `${S(v.font?.display)}`, "fontWeight": "700", "fontSize": "clamp(34px, 5.2vw, 84px)", "lineHeight": `${S(v.font?.lh)}`, "letterSpacing": "0", "filter": `blur(${S(c?.headBlur)}px)`, "transform": `translateY(${S(c?.headTy)}px)` }}>
                    {`${S(c?.title)}`}
                  </h2>
                  {' '}
                  <p style={{ "margin": "18px 0 0", "maxWidth": "440px", "fontSize": "clamp(15px, 1.2vw, 18px)", "lineHeight": "1.85", "color": "#D2D5D9", "fontWeight": "400", "opacity": `${S(c?.subOp)}`, "transform": `translateY(${S(c?.subTy)}px)` }}>
                    {`${S(c?.sub)}`}
                  </p>
                  {' '}
                  {c?.isLast ? (
                    <>
                      {' '}
                      <div style={{ "marginTop": "28px", "display": "flex", "gap": "12px", "flexWrap": "wrap", "opacity": `${S(v.endOp)}`, "pointerEvents": `${S(v.endPe)}` }}>
                        {' '}
                        <a href={"#contact"} className={"ph-btn ph-btn-gold"} style={{ "textDecoration": "none", "background": "#C9A45C", "color": "#0B0C0E", "padding": "0 28px", "minHeight": "52px", "display": "inline-flex", "alignItems": "center", "borderRadius": "6px", "fontWeight": "600", "fontSize": "16px" }}>
                          {`${S(v.t?.cta)}`}
                        </a>
                        {' '}
                        <a href={"#sectors"} className={"ph-btn ph-btn-line"} style={{ "textDecoration": "none", "color": "#EDEAE3", "border": "1px solid rgba(237,234,227,0.5)", "padding": "0 28px", "minHeight": "52px", "display": "inline-flex", "alignItems": "center", "borderRadius": "6px", "fontSize": "16px" }}>
                          {`${S(v.t?.ctaWork)}`}
                        </a>
                        {' '}
                      </div>
                      {' '}
                    </>
                  ) : null}
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
      </div>
      {' '}
    </section>
    </>
  );
}
