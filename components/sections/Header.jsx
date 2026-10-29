import { Fragment } from 'react';
import { S, A, AR, R } from '../../lib/view-helpers';

export default function Header({ v }) {
  return (
    <>
    <header style={{ "position": "fixed", "top": "0", "right": "0", "left": "0", "zIndex": "40", "background": `${S(v.hdr?.bg)}`, "borderBottom": `1px solid ${S(v.hdr?.line)}`, "backdropFilter": `blur(${S(v.hdr?.blur)}px) saturate(140%)`, "WebkitBackdropFilter": `blur(${S(v.hdr?.blur)}px) saturate(140%)`, "color": `${S(v.hdr?.text)}`, "pointerEvents": `${S(v.hdr?.pe)}`, "transition": "color 300ms ease" }}>
      {' '}
      <div style={{ "maxWidth": "1360px", "margin": "0 auto", "height": "72px", "padding": "0 clamp(16px, 3vw, 40px)", "display": "flex", "alignItems": "center", "gap": "24px" }}>
        {' '}
        <div aria-hidden={"true"} style={{ "width": "28px", "flex": "0 0 auto" }} />
        {' '}
        <nav className={"ph-nav"} aria-label={AR(v.t?.navLabel)} style={{ "flex": "1 1 auto", "display": "flex", "justifyContent": "center", "gap": "clamp(20px, 2.6vw, 36px)", "fontSize": "14px" }}>
          {' '}
          {(v.navItems || []).map((n, __i5) => (
            <Fragment key={__i5}>
              {' '}
              <a href={A(n?.href)} style={{ "opacity": `${S(n?.op)}`, "transform": `translateY(${S(n?.ty)}px)`, "display": "inline-block" }}>
                {`${S(n?.label)}`}
              </a>
              {' '}
            </Fragment>
          ))}
          {' '}
        </nav>
        {' '}
        <div style={{ "display": "flex", "alignItems": "center", "gap": "8px", "flex": "0 0 auto", "marginInlineStart": "auto", "opacity": `${S(v.hdr?.ctrlOp)}`, "transform": `translateY(${S(v.hdr?.ctrlTy)}px)` }}>
          {' '}
          <button type={"button"} onClick={v.toggleLang} aria-label={AR(v.t?.langAria)} className={"ph-btn ph-desk"} style={{ "minWidth": "44px", "height": "44px", "padding": "0 12px", "borderRadius": "6px", "border": `1px solid ${S(v.hdr?.btnLine)}`, "background": "transparent", "color": "inherit", "fontFamily": `${S(v.font?.alt)}`, "fontSize": "13px", "cursor": "pointer" }}>
            {`${S(v.t?.langSwitch)}`}
          </button>
          {' '}
          <button type={"button"} onClick={v.toggleTheme} aria-label={AR(v.t?.themeAria)} className={"ph-btn ph-desk"} style={{ "width": "44px", "height": "44px", "borderRadius": "6px", "border": `1px solid ${S(v.hdr?.btnLine)}`, "background": "transparent", "color": "inherit", "display": "inline-flex", "alignItems": "center", "justifyContent": "center", "cursor": "pointer" }}>
            {' '}
            {v.isDark ? (
              <>
                {' '}
                <svg width={"18"} height={"18"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.5"} strokeLinecap={"round"} aria-hidden={"true"}>
                  <circle cx={"12"} cy={"12"} r={"4"} />
                  <path d={"M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"} />
                </svg>
                {' '}
              </>
            ) : null}
            {' '}
            {v.isLight ? (
              <>
                {' '}
                <svg width={"18"} height={"18"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.5"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}>
                  <path d={"M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"} />
                </svg>
                {' '}
              </>
            ) : null}
            {' '}
          </button>
          {' '}
          <a href={"#contact"} className={"ph-btn"} style={{ "height": "44px", "padding": "0 20px", "borderRadius": "6px", "background": `${S(v.hdr?.ctaBg)}`, "color": `${S(v.hdr?.ctaText)}`, "display": "inline-flex", "alignItems": "center", "textDecoration": "none", "fontSize": "14px", "fontWeight": "600", "whiteSpace": "nowrap" }}>
            {`${S(v.t?.cta)}`}
          </a>
          {' '}
          <button type={"button"} onClick={v.menuToggle} aria-label={AR(v.menuAria)} aria-expanded={AR(v.menuOpen)} className={"ph-btn ph-burger"} style={{ "width": "44px", "height": "44px", "borderRadius": "6px", "border": `1px solid ${S(v.hdr?.btnLine)}`, "background": "transparent", "color": "inherit", "cursor": "pointer", "alignItems": "center", "justifyContent": "center" }}>
            {' '}
            <svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.6"} strokeLinecap={"round"} aria-hidden={"true"}>
              <path d={A(v.menuIcon)} />
            </svg>
            {' '}
          </button>
          {' '}
        </div>
        {' '}
      </div>
      {' '}
      <div aria-hidden={"true"} style={{ "position": "absolute", "left": "0", "right": "0", "bottom": "-1px", "height": "1px", "pointerEvents": "none", "opacity": `${S(v.hdr?.ctrlOp)}` }}>
        {' '}
        <div style={{ "position": "absolute", "top": "0", "bottom": "0", "insetInlineStart": "0", "width": `${S(v.pagePct)}%`, "background": `${S(v.accent)}`, "transition": "width 120ms linear" }} />
        {' '}
      </div>
      {' '}
    </header>
    </>
  );
}
