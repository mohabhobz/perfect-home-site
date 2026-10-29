import { Fragment } from 'react';
import { S, A, AR, R } from '../../lib/view-helpers';

export default function Album({ v }) {
  return (
    <>
    <section id={"album"} aria-label={AR(v.t?.album?.title)} style={{ "padding": `clamp(96px, 11vw, 160px) ${S(v.edge)} clamp(64px, 7vw, 112px)` }}>
      {' '}
      <div className={"rv"} style={{ "display": "flex", "flexWrap": "wrap", "gap": "24px 64px", "alignItems": "flex-end", "justifyContent": "space-between", "marginBottom": "clamp(32px, 4vw, 48px)" }}>
        {' '}
        <div style={{ "flex": "1 1 520px", "minWidth": "0" }}>
          {' '}
          <p style={{ "margin": "0 0 20px", "fontSize": "14px", "color": `${S(v.th?.accent)}` }}>
            {`${S(v.t?.album?.eyebrow)}`}
          </p>
          {' '}
          <h2 style={{ "margin": "0", "fontFamily": `${S(v.font?.display)}`, "fontWeight": "700", "fontSize": "clamp(34px, 3.6vw, 56px)", "lineHeight": `${S(v.font?.lh)}` }}>
            {`${S(v.t?.album?.title)}`}
          </h2>
          {' '}
        </div>
        {' '}
        <p style={{ "flex": "0 1 440px", "margin": "0", "fontSize": "17px", "lineHeight": "1.85", "color": `${S(v.th?.muted)}` }}>
          {`${S(v.t?.album?.intro)}`}
        </p>
        {' '}
      </div>
      {' '}
      <div className={"rv ph-tabs"} role={"tablist"} aria-label={AR(v.t?.album?.filterLabel)} style={{ "display": "flex", "gap": "clamp(20px, 2.6vw, 36px)", "borderBottom": `1px solid ${S(v.th?.line)}`, "marginBottom": "clamp(24px, 3vw, 36px)", "overflowX": "auto", "scrollbarWidth": "none" }}>
        {' '}
        {(v.alb?.cats || []).map((ct, __i4) => (
          <Fragment key={__i4}>
            {' '}
            <button type={"button"} role={"tab"} aria-selected={AR(ct?.on)} onClick={ct?.pick} className={"ph-tab"} style={{ "position": "relative", "flex": "0 0 auto", "height": "48px", "padding": "0 2px", "marginBottom": "-1px", "border": "0", "borderBottom": `2px solid ${S(ct?.line)}`, "background": "transparent", "color": `${S(ct?.fg)}`, "font": "inherit", "fontSize": "15px", "fontWeight": `${S(ct?.fw)}`, "cursor": "pointer", "whiteSpace": "nowrap", "transition": "color 200ms ease, border-color 300ms cubic-bezier(0.23,1,0.32,1)" }}>
              {`${S(ct?.label)}`}
            </button>
            {' '}
          </Fragment>
        ))}
        {' '}
      </div>
      {' '}
      <div className={"ph-alb"}>
        {' '}
        {(v.alb?.items || []).map((it, __i4) => (
          <Fragment key={__i4}>
            {' '}
            <button type={"button"} onClick={it?.open} aria-label={AR(it?.title)} className={`ph-card ph-ai ${S(it?.cls)}`} style={{ "position": "relative", "overflow": "hidden", "border": "0", "padding": "0", "margin": "0", "background": `${S(v.th?.placeholder)}`, "cursor": "zoom-in", "animation": `${S(v.alb?.anim)} 900ms cubic-bezier(0.23,1,0.32,1) both`, "animationDelay": `${S(it?.delay)}ms` }}>
              {' '}
              <img src={A(it?.src)} srcSet={A(it?.set)} sizes={"(max-width: 760px) 320px, 40vw"} alt={A(it?.title)} loading={"lazy"} className={"ph-zoom"} style={{ "width": "100%", "height": "100%", "objectFit": "cover", "display": "block" }} />
              {' '}
              <span className={"ph-acap"} style={{ "position": "absolute", "inset": "auto 0 0 0", "padding": "40px 18px 16px", "background": "linear-gradient(0deg, rgba(8,9,11,0.72), rgba(8,9,11,0))", "color": "#EDEAE3", "textAlign": "start", "display": "flex", "flexDirection": "column", "gap": "4px" }}>
                {' '}
                <span style={{ "fontSize": "12px", "color": "#C9A45C" }}>
                  {`${S(it?.cat)}`}
                </span>
                {' '}
                <span style={{ "fontSize": "16px", "fontWeight": "700" }}>
                  {`${S(it?.title)}`}
                </span>
                {' '}
              </span>
              {' '}
            </button>
            {' '}
          </Fragment>
        ))}
        {' '}
      </div>
      {' '}
      {v.lb?.open ? (
        <>
          {' '}
          <div role={"dialog"} aria-modal={"true"} aria-label={AR(v.lb?.title)} onClick={v.lb?.close} style={{ "position": "fixed", "inset": "0", "zIndex": "90", "background": "rgba(8,9,11,0.88)", "backdropFilter": "blur(14px)", "WebkitBackdropFilter": "blur(14px)", "display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "center", "gap": "20px", "padding": "72px 88px 40px", "boxSizing": "border-box", "animation": "phfade 300ms ease both" }}>
            {' '}
            <img src={A(v.lb?.src)} srcSet={A(v.lb?.set)} sizes={"(max-width: 760px) 400px, 90vw"} alt={A(v.lb?.title)} onClick={v.lb?.stop} style={{ "maxWidth": "100%", "maxHeight": "calc(100vh - 200px)", "objectFit": "contain", "display": "block", "boxShadow": "0 30px 80px rgba(0,0,0,0.5)", "animation": "phpop 500ms cubic-bezier(0.23,1,0.32,1) both" }} />
            {' '}
            <div onClick={v.lb?.stop} style={{ "display": "flex", "alignItems": "center", "gap": "16px", "color": "#EDEAE3" }}>
              {' '}
              <span style={{ "fontSize": "13px", "color": "#C9A45C" }}>
                {`${S(v.lb?.cat)}`}
              </span>
              {' '}
              <span style={{ "fontSize": "17px", "fontWeight": "700" }}>
                {`${S(v.lb?.title)}`}
              </span>
              {' '}
              <span style={{ "fontFamily": "'Outfit', sans-serif", "fontSize": "13px", "color": "#8E949B" }}>
                <span dir={"ltr"}>
                  {`${S(v.lb?.pos)}`}
                </span>
              </span>
              {' '}
            </div>
            {' '}
            <button type={"button"} onClick={v.lb?.close} aria-label={AR(v.t?.album?.close)} className={"ph-btn ph-btn-line"} style={{ "position": "absolute", "top": "20px", "insetInlineEnd": "20px", "width": "44px", "height": "44px", "borderRadius": "6px", "border": "1px solid rgba(237,234,227,0.3)", "background": "transparent", "color": "#EDEAE3", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "justifyContent": "center" }}>
              <svg width={"18"} height={"18"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.6"} aria-hidden={"true"}>
                <path d={"M5 5l14 14M19 5L5 19"} />
              </svg>
            </button>
            {' '}
            <button type={"button"} onClick={v.lb?.prev} aria-label={AR(v.t?.album?.prev)} className={"ph-btn ph-btn-line"} style={{ "position": "absolute", "top": "50%", "insetInlineStart": "20px", "marginTop": "-24px", "width": "48px", "height": "48px", "borderRadius": "6px", "border": "1px solid rgba(237,234,227,0.3)", "background": "transparent", "color": "#EDEAE3", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "justifyContent": "center" }}>
              <svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.6"} aria-hidden={"true"} style={{ "transform": `scaleX(${S(v.lb?.flip)})` }}>
                <path d={"M9 5l7 7-7 7"} />
              </svg>
            </button>
            {' '}
            <button type={"button"} onClick={v.lb?.next} aria-label={AR(v.t?.album?.next)} className={"ph-btn ph-btn-line"} style={{ "position": "absolute", "top": "50%", "insetInlineEnd": "20px", "marginTop": "-24px", "width": "48px", "height": "48px", "borderRadius": "6px", "border": "1px solid rgba(237,234,227,0.3)", "background": "transparent", "color": "#EDEAE3", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "justifyContent": "center" }}>
              <svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.6"} aria-hidden={"true"} style={{ "transform": `scaleX(${S(v.lb?.flipN)})` }}>
                <path d={"M9 5l7 7-7 7"} />
              </svg>
            </button>
            {' '}
          </div>
          {' '}
        </>
      ) : null}
      {' '}
    </section>
    </>
  );
}
