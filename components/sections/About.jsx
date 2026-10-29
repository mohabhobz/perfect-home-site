import { Fragment } from 'react';
import { S, A, AR, R } from '../../lib/view-helpers';

export default function About({ v }) {
  return (
    <>
    <section id={"about"} ref={R(v.aboutRef)} style={{ "display": "flex", "flexWrap": "wrap", "minHeight": "100vh" }}>
      {' '}
      <div style={{ "flex": "1 1 560px", "minWidth": "0", "display": "flex", "flexDirection": "column", "justifyContent": "center", "padding": `clamp(96px, 10vw, 150px) ${S(v.edge)}` }}>
        {' '}
        <h2 style={{ "margin": "0", "maxWidth": "620px", "fontFamily": `${S(v.font?.display)}`, "fontWeight": "700", "fontSize": "clamp(36px, 4.2vw, 66px)", "lineHeight": `${S(v.font?.lh)}` }}>
          {' '}
          {(v.aboutWords || []).map((wd, __i5) => (
            <Fragment key={__i5}>
              <span style={{ "opacity": `${S(wd?.op)}`, "transition": "opacity 200ms linear" }}>
                {`${S(wd?.w)} `}
              </span>
            </Fragment>
          ))}
          {' '}
        </h2>
        {' '}
        <p className={"rv"} style={{ "margin": "28px 0 0", "maxWidth": "520px", "fontSize": "18px", "lineHeight": "1.85", "color": `${S(v.th?.muted)}`, "fontWeight": "400", "transitionDelay": "120ms" }}>
          {`${S(v.t?.about?.body)}`}
        </p>
        {' '}
        <div className={"rv"} style={{ "marginTop": "56px", "display": "flex", "flexWrap": "wrap", "gap": "32px 64px", "transitionDelay": "220ms" }}>
          {' '}
          {(v.t?.stats || []).map((s, __i5) => (
            <Fragment key={__i5}>
              {' '}
              <div style={{ "display": "flex", "flexDirection": "column", "gap": "10px" }}>
                {' '}
                <span dir={"ltr"} style={{ "fontFamily": "'Outfit', sans-serif", "fontWeight": "400", "fontSize": "clamp(44px, 4.4vw, 64px)", "lineHeight": "1", "textAlign": "start", "color": `${S(v.th?.accent)}` }}>
                  {`${S(s?.value)}`}
                </span>
                {' '}
                <span style={{ "color": `${S(v.th?.muted)}`, "fontSize": "15px" }}>
                  {`${S(s?.label)}`}
                </span>
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
      <figure style={{ "flex": "1 1 520px", "minHeight": "80vh", "margin": "0", "position": "relative", "overflow": "hidden", "background": `${S(v.th?.placeholder)}`, "clipPath": `inset(${S(v.aboutClip)}% 0 0 0)` }}>
        {' '}
        {v.img?.hasAbout ? (
          <>
            {' '}
            <img loading={"lazy"} decoding={"async"} src={A(v.img?.about)} srcSet={A(v.img?.aboutSet)} sizes={"(max-width: 760px) 320px, (max-width: 1120px) 100vw, 50vw"} alt={A(v.t?.about?.alt)} style={{ "position": "absolute", "inset": "0", "width": "100%", "height": "100%", "objectFit": "cover", "display": "block", "transform": `scale(${S(v.aboutScale)})` }} />
            {' '}
          </>
        ) : null}
        {' '}
        <figcaption style={{ "position": "absolute", "insetInline": "0", "bottom": "0", "padding": "72px clamp(24px, 3vw, 40px) 28px", "fontSize": "13px", "color": "#EDEAE3", "background": "linear-gradient(0deg, rgba(8,9,11,0.62), rgba(8,9,11,0))" }}>
          {`${S(v.t?.about?.caption)}`}
        </figcaption>
        {' '}
      </figure>
      {' '}
    </section>
    </>
  );
}
