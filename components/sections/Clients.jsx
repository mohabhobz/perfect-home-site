import { Fragment } from 'react';
import { S, A, AR, R } from '../../lib/view-helpers';

export default function Clients({ v }) {
  return (
    <>
    <section aria-label={AR(v.t?.proof?.label)} style={{ "padding": `clamp(96px, 11vw, 160px) ${S(v.edge)}` }}>
      {' '}
      <div className={"rv"} style={{ "display": "flex", "flexWrap": "wrap", "gap": "24px 64px", "alignItems": "flex-end", "justifyContent": "space-between", "marginBottom": "clamp(40px, 5vw, 72px)" }}>
        {' '}
        <div style={{ "flex": "1 1 520px", "minWidth": "0" }}>
          {' '}
          <p style={{ "margin": "0 0 20px", "fontSize": "14px", "color": `${S(v.th?.accent)}` }}>
            {`${S(v.t?.proof?.clientsLabel)}`}
          </p>
          {' '}
          <h2 style={{ "margin": "0", "fontFamily": `${S(v.font?.display)}`, "fontWeight": "700", "fontSize": "clamp(34px, 3.6vw, 56px)", "lineHeight": `${S(v.font?.lh)}` }}>
            {`${S(v.t?.proof?.title)}`}
          </h2>
          {' '}
        </div>
        {' '}
        <p style={{ "flex": "0 1 440px", "margin": "0", "fontSize": "17px", "lineHeight": "1.85", "color": `${S(v.th?.muted)}` }}>
          {`${S(v.t?.proof?.intro)}`}
        </p>
        {' '}
      </div>
      {' '}
      <div ref={R(v.proofRef)} onMouseLeave={v.clLeave} style={{ "display": "flex", "flexWrap": "wrap", "gap": "clamp(32px, 4vw, 72px)", "alignItems": "stretch" }}>
        {' '}
        <div className={"rv"} role={"tablist"} aria-label={AR(v.t?.proof?.clientsLabel)} style={{ "flex": "1 1 360px", "minWidth": "0", "display": "flex", "flexDirection": "column", "justifyContent": "center" }}>
          {' '}
          {(v.proofClients || []).map((cl, __i5) => (
            <Fragment key={__i5}>
              {' '}
              <button type={"button"} role={"tab"} aria-selected={AR(cl?.on)} onMouseEnter={cl?.pick} onFocus={cl?.pick} onClick={cl?.pick} className={"ph-row"} style={{ "position": "relative", "display": "block", "width": "100%", "textAlign": "start", "background": "transparent", "border": "0", "borderTop": `1px solid ${S(v.th?.line)}`, "padding": "clamp(22px, 2.4vw, 32px) 0", "color": `${S(v.th?.text)}`, "font": "inherit", "cursor": "pointer" }}>
                {' '}
                <span aria-hidden={"true"} style={{ "position": "absolute", "top": "-1px", "insetInlineStart": "0", "height": "1px", "width": "100%", "background": `${S(v.th?.accent)}`, "transformOrigin": `${S(v.originSide)}`, "transform": `scaleX(${S(cl?.barFull)})`, "animation": `${S(cl?.barAnim)} 6000ms linear forwards` }} />
                {' '}
                <span style={{ "display": "block", "fontSize": "13px", "color": `${S(cl?.typeColor)}`, "transition": "color 300ms ease" }}>
                  {`${S(cl?.type)}`}
                </span>
                {' '}
                <span style={{ "display": "block", "marginTop": "10px", "fontFamily": `${S(v.font?.display)}`, "fontWeight": "700", "fontSize": "clamp(26px, 2.6vw, 40px)", "lineHeight": `${S(v.font?.lh)}`, "color": `${S(cl?.nameColor)}`, "transition": "color 300ms ease" }}>
                  {`${S(cl?.name)}`}
                </span>
                {' '}
                <span style={{ "display": "grid", "gridTemplateRows": `${S(cl?.rows)}`, "transition": "grid-template-rows 600ms cubic-bezier(0.23,1,0.32,1)" }}>
                  {' '}
                  <span style={{ "overflow": "hidden", "minHeight": "0" }}>
                    {' '}
                    <span style={{ "display": "block", "paddingTop": "12px", "maxWidth": "420px", "fontSize": "16px", "lineHeight": "1.75", "color": `${S(v.th?.muted)}`, "opacity": `${S(cl?.workOp)}`, "transition": "opacity 500ms ease" }}>
                      {`${S(cl?.work)}`}
                    </span>
                    {' '}
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
        <div className={"rv"} style={{ "flex": "1.5 1 520px", "minWidth": "0", "position": "relative", "height": "clamp(420px, 42vw, 640px)", "overflow": "hidden", "background": `${S(v.th?.placeholder)}`, "transitionDelay": "120ms" }}>
          {' '}
          {(v.proofClients || []).map((cl, __i5) => (
            <Fragment key={__i5}>
              {' '}
              <figure aria-hidden={AR(cl?.off)} style={{ "position": "absolute", "inset": "0", "margin": "0", "zIndex": `${S(cl?.z)}`, "clipPath": `${S(cl?.clip)}`, "transition": "clip-path 1100ms cubic-bezier(0.77,0,0.175,1)" }}>
                {' '}
                <img loading={"lazy"} decoding={"async"} src={A(cl?.img)} srcSet={A(cl?.imgSet)} sizes={"(max-width: 760px) 320px, (max-width: 900px) 100vw, 60vw"} alt={A(cl?.alt)} className={"ph-kb"} style={{ "position": "absolute", "inset": "0", "width": "100%", "height": "100%", "objectFit": "cover", "transformOrigin": `${S(cl?.origin)}`, "animationPlayState": `${S(cl?.play)}` }} />
                {' '}
                <span aria-hidden={"true"} style={{ "position": "absolute", "inset": "auto 0 0 0", "height": "45%", "background": "linear-gradient(0deg, rgba(8,9,11,0.62), rgba(8,9,11,0))" }} />
                {' '}
                <figcaption style={{ "position": "absolute", "insetInline": "clamp(20px, 2.4vw, 32px)", "bottom": "clamp(18px, 2.2vw, 28px)", "color": "#EDEAE3", "fontSize": "14px" }}>
                  {`${S(cl?.caption)}`}
                </figcaption>
                {' '}
              </figure>
              {' '}
            </Fragment>
          ))}
          {' '}
        </div>
        {' '}
      </div>
      {' '}
      <dl className={"rv"} style={{ "margin": "clamp(56px, 6vw, 88px) 0 0", "display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", "gap": "1px", "background": `${S(v.th?.line)}`, "border": `1px solid ${S(v.th?.line)}`, "borderRadius": "6px", "overflow": "hidden", "transitionDelay": "120ms" }}>
        {' '}
        {(v.t?.proof?.creds || []).map((cr, __i4) => (
          <Fragment key={__i4}>
            {' '}
            <div style={{ "background": `${S(v.th?.bg)}`, "padding": "clamp(22px, 2.4vw, 32px)", "display": "flex", "flexDirection": "column", "gap": "10px" }}>
              {' '}
              <dt style={{ "fontSize": "13px", "color": `${S(v.th?.faint)}` }}>
                {`${S(cr?.k)}`}
              </dt>
              {' '}
              <dd style={{ "margin": "0", "fontSize": "18px", "lineHeight": "1.5", "fontFamily": `${S(v.font?.alt)}` }}>
                <span dir={"auto"} style={{ "unicodeBidi": "isolate" }}>
                  {`${S(cr?.v)}`}
                </span>
              </dd>
              {' '}
            </div>
            {' '}
          </Fragment>
        ))}
        {' '}
      </dl>
      {' '}
    </section>
    </>
  );
}
