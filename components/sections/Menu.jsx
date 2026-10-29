import { Fragment } from 'react';
import { S, A, AR, R } from '../../lib/view-helpers';

export default function Menu({ v }) {
  return (
    <>
    {v.menuOpen ? (
      <>
        {' '}
        <div className={"ph-menu"} role={"dialog"} aria-modal={"true"} aria-label={AR(v.t?.navLabel)} style={{ "position": "fixed", "inset": "0", "zIndex": "39", "background": `${S(v.th?.bg)}`, "color": `${S(v.th?.text)}`, "display": "flex", "flexDirection": "column", "padding": "calc(env(safe-area-inset-top, 0px) + 104px) 24px calc(env(safe-area-inset-bottom, 0px) + 32px)", "boxSizing": "border-box", "animation": "phfade 280ms ease both" }}>
          {' '}
          <nav aria-label={AR(v.t?.navLabel)} style={{ "display": "flex", "flexDirection": "column" }}>
            {' '}
            {(v.menuItems || []).map((m, __i6) => (
              <Fragment key={__i6}>
                {' '}
                <a href={A(m?.href)} onClick={v.menuClose} className={"ph-menu-a"} style={{ "display": "block", "padding": "18px 0", "borderBottom": `1px solid ${S(v.th?.line)}`, "textDecoration": "none", "fontFamily": `${S(v.font?.display)}`, "fontWeight": "700", "fontSize": "28px", "lineHeight": "1.3", "animation": "phaA 600ms cubic-bezier(0.23,1,0.32,1) both", "animationDelay": `${S(m?.delay)}ms` }}>
                  {`${S(m?.label)}`}
                </a>
                {' '}
              </Fragment>
            ))}
            {' '}
          </nav>
          {' '}
          <div style={{ "marginTop": "auto", "display": "flex", "flexDirection": "column", "gap": "16px" }}>
            {' '}
            <div style={{ "display": "flex", "gap": "10px" }}>
              {' '}
              <button type={"button"} onClick={v.toggleLang} className={"ph-btn"} style={{ "flex": "1 1 0", "height": "48px", "borderRadius": "6px", "border": `1px solid ${S(v.th?.line)}`, "background": "transparent", "color": "inherit", "font": "inherit", "fontSize": "15px", "cursor": "pointer" }}>
                {`${S(v.t?.langLabelFull)}`}
              </button>
              {' '}
              <button type={"button"} onClick={v.toggleTheme} className={"ph-btn"} style={{ "flex": "1 1 0", "height": "48px", "borderRadius": "6px", "border": `1px solid ${S(v.th?.line)}`, "background": "transparent", "color": "inherit", "font": "inherit", "fontSize": "15px", "cursor": "pointer" }}>
                {`${S(v.themeLabel)}`}
              </button>
              {' '}
            </div>
            {' '}
            <a href={"https://wa.me/966534221199"} className={"ph-btn"} style={{ "height": "52px", "borderRadius": "6px", "background": "#C9A45C", "color": "#000", "display": "flex", "alignItems": "center", "justifyContent": "center", "textDecoration": "none", "fontWeight": "700", "fontSize": "16px" }}>
              {`${S(v.t?.contact?.whatsapp)}`}
            </a>
            {' '}
            <p style={{ "margin": "0", "fontSize": "13px", "color": `${S(v.th?.faint)}`, "textAlign": "center" }}>
              {`${S(v.t?.footer?.hours)}`}
            </p>
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
