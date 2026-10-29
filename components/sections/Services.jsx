import { Fragment } from 'react';
import { S, A, AR, R } from '../../lib/view-helpers';

export default function Services({ v }) {
  return (
    <>
    <section id={"services"} style={{ "borderTop": `1px solid ${S(v.th?.line)}` }}>
      {' '}
      <div style={{ "padding": `clamp(90px, 10vw, 150px) ${S(v.edge)} clamp(56px, 7vw, 100px)`, "display": "flex", "flexWrap": "wrap", "gap": "24px 64px", "alignItems": "flex-end", "justifyContent": "space-between" }}>
        {' '}
        <div className={"rv"} style={{ "flex": "1 1 520px", "minWidth": "0" }}>
          {' '}
          <p style={{ "margin": "0 0 20px", "fontSize": "14px", "color": `${S(v.th?.accent)}` }}>
            {`${S(v.t?.services?.eyebrow)}`}
          </p>
          {' '}
          <h2 style={{ "margin": "0", "fontFamily": `${S(v.font?.display)}`, "fontWeight": "700", "fontSize": "clamp(34px, 3.6vw, 56px)", "lineHeight": `${S(v.font?.lh)}` }}>
            {`${S(v.t?.services?.title)}`}
          </h2>
          {' '}
        </div>
        {' '}
        <p className={"rv"} style={{ "transitionDelay": "140ms", "flex": "0 1 440px", "margin": "0", "fontSize": "17px", "lineHeight": "1.85", "color": `${S(v.th?.muted)}`, "fontWeight": "400" }}>
          {`${S(v.t?.services?.intro)}`}
        </p>
        {' '}
      </div>
      {' '}
      <div style={{ "position": "relative" }}>
        {' '}
        {(v.svc || []).map((s, __i4) => (
          <Fragment key={__i4}>
            {' '}
            <article ref={R(s?.setRef)} style={{ "position": "sticky", "top": "0", "height": "100vh", "overflow": "hidden", "background": "#000", "color": "#EDEAE3" }}>
              {' '}
              <div style={{ "position": "absolute", "inset": "0", "overflow": "hidden", "transform": `scale(${S(s?.depth)})`, "transformOrigin": "50% 0", "opacity": `${S(s?.dim)}`, "willChange": "transform, opacity" }}>
                {' '}
                {s?.has ? (
                  <>
                    {' '}
                    <img loading={"lazy"} decoding={"async"} src={A(s?.src)} srcSet={A(s?.set)} sizes={"(max-width: 760px) 320px, 100vw"} alt={A(s?.alt)} style={{ "position": "absolute", "inset": "0", "width": "100%", "height": "100%", "objectFit": "cover", "display": "block", "transform": `scale(${S(s?.scale)})` }} />
                    {' '}
                  </>
                ) : null}
                {' '}
                <div aria-hidden={"true"} style={{ "position": "absolute", "inset": "0", "background": `linear-gradient(${S(v.scrimDir)}, rgba(8,9,11,0.62) 0%, rgba(8,9,11,0.3) 36%, rgba(8,9,11,0) 62%), linear-gradient(0deg, rgba(8,9,11,0.55) 0%, rgba(8,9,11,0) 40%)` }} />
                {' '}
                <div style={{ "position": "absolute", "insetInlineStart": `${S(v.edge)}`, "bottom": "clamp(48px, 11vh, 120px)", "width": "min(640px, calc(100% - 48px))", "display": "flex", "flexDirection": "column", "gap": "20px", "opacity": `${S(s?.txtOp)}`, "transform": `translateY(${S(s?.txtTy)}px)` }}>
                  {' '}
                  <span style={{ "fontSize": "14px", "color": "#C9A45C" }}>
                    {`${S(s?.alt)}`}
                  </span>
                  {' '}
                  <h3 style={{ "margin": "0", "fontFamily": `${S(v.font?.display)}`, "fontWeight": "700", "fontSize": "clamp(40px, 4.6vw, 74px)", "lineHeight": `${S(v.font?.lh)}` }}>
                    {`${S(s?.title)}`}
                  </h3>
                  {' '}
                  <p style={{ "margin": "0", "maxWidth": "520px", "fontSize": "clamp(16px, 1.3vw, 19px)", "lineHeight": "1.85", "color": "#D2D5D9", "fontWeight": "400" }}>
                    {`${S(s?.body)}`}
                  </p>
                  {' '}
                  <ul style={{ "listStyle": "none", "margin": "6px 0 0", "padding": "0", "display": "flex", "flexWrap": "wrap", "gap": "8px" }}>
                    {' '}
                    {(s?.tags || []).map((tg, __i10) => (
                      <Fragment key={__i10}>
                        {' '}
                        <li style={{ "padding": "6px 14px", "borderRadius": "999px", "fontSize": "13px", "lineHeight": "1.5", "color": "#EDEAE3", "background": "rgba(237,234,227,0.14)", "border": "1px solid rgba(237,234,227,0.18)", "backdropFilter": "blur(10px) saturate(140%)", "WebkitBackdropFilter": "blur(10px) saturate(140%)" }}>
                          {`${S(tg)}`}
                        </li>
                        {' '}
                      </Fragment>
                    ))}
                    {' '}
                  </ul>
                  {' '}
                </div>
                {' '}
              </div>
              {' '}
            </article>
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
