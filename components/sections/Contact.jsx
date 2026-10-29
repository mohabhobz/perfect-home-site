import { Fragment } from 'react';
import { S, A, AR, R } from '../../lib/view-helpers';

export default function Contact({ v }) {
  return (
    <>
    <section id={"contact"}>
      {' '}
      <div style={{ "position": "relative", "minHeight": "100vh", "overflow": "hidden", "background": "#000000", "color": "#EDEAE3", "display": "flex", "alignItems": "center" }}>
        {' '}
        {v.img?.hasContact ? (
          <>
            {' '}
            <img src={A(v.img?.contact)} srcSet={A(v.img?.contactSet)} sizes={"(max-width: 760px) 320px, 100vw"} loading={"lazy"} alt={""} aria-hidden={"true"} style={{ "position": "absolute", "inset": "0", "width": "100%", "height": "100%", "objectFit": "cover", "objectPosition": "50% 55%", "transform": `scaleX(-1) scale(${S(v.contactScale)})` }} />
            {' '}
          </>
        ) : null}
        {' '}
        <div aria-hidden={"true"} style={{ "position": "absolute", "inset": "0", "background": "linear-gradient(to left, rgba(8,22,52,0.55) 0%, rgba(8,22,52,0.3) 26%, rgba(8,22,52,0.06) 46%, rgba(8,22,52,0) 58%), linear-gradient(0deg, rgba(10,12,18,0.4) 0%, rgba(10,12,18,0) 28%)" }} />
        {' '}
        <div dir={"ltr"} style={{ "position": "relative", "width": "100%", "padding": `clamp(110px, 12vw, 160px) ${S(v.edge)}`, "boxSizing": "border-box", "display": "flex", "justifyContent": "flex-end" }}>
          {' '}
          <div dir={A(v.dir)} className={"rv"} style={{ "width": "min(560px, 100%)", "display": "flex", "flexDirection": "column", "gap": "28px" }}>
            {' '}
            <div>
              {' '}
              <h2 style={{ "margin": "0", "fontFamily": `${S(v.font?.display)}`, "fontWeight": "700", "fontSize": "clamp(36px, 4.2vw, 64px)", "lineHeight": `${S(v.font?.lh)}` }}>
                {`${S(v.t?.contact?.title1)}`}
                <br />
                <span style={{ "color": "#C9A45C" }}>
                  {`${S(v.t?.contact?.title2)}`}
                </span>
              </h2>
              {' '}
              <p style={{ "margin": "20px 0 0", "maxWidth": "460px", "fontSize": "17px", "lineHeight": "1.8", "color": "#D2D5D9" }}>
                {`${S(v.t?.contact?.body)}`}
              </p>
              {' '}
            </div>
            {' '}
            <form onSubmit={v.onSubmit} className={"ph-form"} style={{ "minWidth": "0", "background": "rgba(10,14,24,0.5)", "border": "1px solid rgba(237,234,227,0.16)", "borderRadius": "6px", "padding": "clamp(22px, 2.6vw, 32px)", "backdropFilter": "blur(18px) saturate(130%)", "WebkitBackdropFilter": "blur(18px) saturate(130%)", "display": "grid", "gridTemplateColumns": "repeat(2, minmax(0, 1fr))", "gap": "18px" }}>
              {' '}
              <p style={{ "gridColumn": "1 / -1", "margin": "0 0 4px", "fontFamily": `${S(v.font?.display)}`, "fontWeight": "700", "fontSize": "22px" }}>
                {`${S(v.t?.form?.title)}`}
              </p>
              {' '}
              <label style={{ "display": "flex", "flexDirection": "column", "gap": "8px", "fontSize": "13px", "color": "#B7BBC1" }}>
                {`${S(v.t?.form?.name)}`}
                <input type={"text"} name={"name"} autoComplete={"name"} className={"ph-in"} style={{ "height": "48px", "padding": "0 14px", "borderRadius": "6px", "border": "1px solid rgba(237,234,227,0.2)", "background": "rgba(237,234,227,0.04)", "color": "#EDEAE3", "font": "inherit", "fontSize": "15px" }} />
              </label>
              {' '}
              <label style={{ "display": "flex", "flexDirection": "column", "gap": "8px", "fontSize": "13px", "color": "#B7BBC1" }}>
                {`${S(v.t?.form?.phone)}`}
                <input type={"tel"} name={"phone"} autoComplete={"tel"} dir={"ltr"} className={"ph-in"} style={{ "height": "48px", "padding": "0 14px", "borderRadius": "6px", "border": "1px solid rgba(237,234,227,0.2)", "background": "rgba(237,234,227,0.04)", "color": "#EDEAE3", "font": "inherit", "fontSize": "15px" }} />
              </label>
              {' '}
              <label style={{ "display": "flex", "flexDirection": "column", "gap": "8px", "fontSize": "13px", "color": "#B7BBC1" }}>
                {`${S(v.t?.form?.type)}`}
                <select name={"type"} className={"ph-in ph-sel"} style={{ "height": "48px", "paddingBlock": "0", "paddingInline": "14px 40px", "borderRadius": "6px", "border": "1px solid rgba(237,234,227,0.2)", "backgroundColor": "rgba(237,234,227,0.04)", "color": "#EDEAE3", "font": "inherit", "fontSize": "15px", "cursor": "pointer" }}>
                  {(v.t?.form?.types || []).map((o, __i9) => (
                    <Fragment key={__i9}>
                      <option>
                        {`${S(o)}`}
                      </option>
                    </Fragment>
                  ))}
                </select>
              </label>
              {' '}
              <label style={{ "display": "flex", "flexDirection": "column", "gap": "8px", "fontSize": "13px", "color": "#B7BBC1" }}>
                {`${S(v.t?.form?.city)}`}
                <input type={"text"} name={"city"} className={"ph-in"} style={{ "height": "48px", "padding": "0 14px", "borderRadius": "6px", "border": "1px solid rgba(237,234,227,0.2)", "background": "rgba(237,234,227,0.04)", "color": "#EDEAE3", "font": "inherit", "fontSize": "15px" }} />
              </label>
              {' '}
              <label style={{ "gridColumn": "1 / -1", "display": "flex", "flexDirection": "column", "gap": "8px", "fontSize": "13px", "color": "#B7BBC1" }}>
                {`${S(v.t?.form?.msg)}`}
                <textarea name={"msg"} rows={"3"} className={"ph-in"} style={{ "padding": "12px 14px", "borderRadius": "6px", "border": "1px solid rgba(237,234,227,0.2)", "background": "rgba(237,234,227,0.04)", "color": "#EDEAE3", "font": "inherit", "fontSize": "15px", "resize": "vertical" }} />
              </label>
              {' '}
              <button type={"submit"} className={"ph-btn ph-btn-gold"} style={{ "gridColumn": "1 / -1", "height": "52px", "border": "0", "borderRadius": "6px", "background": "#C9A45C", "color": "#0B0C0E", "font": "inherit", "fontSize": "16px", "fontWeight": "700", "cursor": "pointer" }}>
                {`${S(v.formBtn)}`}
              </button>
              {' '}
            </form>
            {' '}
            <div style={{ "display": "flex", "flexWrap": "wrap", "gap": "10px" }}>
              {' '}
              <a href={"https://wa.me/966534221199"} className={"ph-btn ph-btn-line"} style={{ "textDecoration": "none", "display": "inline-flex", "alignItems": "center", "minHeight": "44px", "padding": "0 18px", "border": "1px solid rgba(237,234,227,0.3)", "borderRadius": "6px", "fontSize": "14px" }}>
                {`${S(v.t?.contact?.whatsapp)}`}
              </a>
              {' '}
              <a href={"tel:+966112222570"} className={"ph-btn ph-btn-line"} style={{ "textDecoration": "none", "display": "inline-flex", "alignItems": "center", "minHeight": "44px", "padding": "0 18px", "border": "1px solid rgba(237,234,227,0.3)", "borderRadius": "6px", "fontSize": "14px" }}>
                <span dir={"ltr"}>
                  {"+966 11 2222 570"}
                </span>
              </a>
              {' '}
              <a href={"mailto:info@phome.sa"} className={"ph-btn ph-btn-line"} style={{ "textDecoration": "none", "display": "inline-flex", "alignItems": "center", "minHeight": "44px", "padding": "0 18px", "border": "1px solid rgba(237,234,227,0.3)", "borderRadius": "6px", "fontSize": "14px" }}>
                {"info@phome.sa"}
              </a>
              {' '}
            </div>
            {' '}
          </div>
          {' '}
        </div>
        {' '}
      </div>
      {' '}
      <footer style={{ "borderTop": `1px solid ${S(v.th?.line)}` }}>
        {' '}
        <div className={"ph-foot"} style={{ "padding": `clamp(56px, 6vw, 80px) ${S(v.edge)} clamp(40px, 4vw, 56px)`, "fontSize": "15px", "lineHeight": "1.7", "color": `${S(v.th?.muted)}` }}>
          {' '}
          <div style={{ "display": "flex", "flexDirection": "column", "alignItems": "flex-start", "gap": "20px" }}>
            {' '}
            <img src={"/media/logo/ph-lockup.svg?v=2"} alt={"المساكن المتقنة — Perfect Home"} style={{ "height": "96px", "width": "auto", "display": "block" }} />
            {' '}
            <p style={{ "margin": "0", "maxWidth": "280px" }}>
              {`${S(v.t?.tagline)}`}
            </p>
            {' '}
          </div>
          {' '}
          <div className={"ph-fcol"}>
            {' '}
            <p className={"ph-flabel"} style={{ "color": `${S(v.th?.faint)}` }}>
              {`${S(v.t?.footer?.addressLabel)}`}
            </p>
            {' '}
            <p style={{ "margin": "0", "maxWidth": "300px" }}>
              {`${S(v.t?.footer?.address)}`}
            </p>
            {' '}
            <a href={"https://goo.gl/maps/wgLoC7fjxkyTuDcm9"} target={"_blank"} rel={"noopener"} className={"ph-flink"} style={{ "color": `${S(v.th?.accent)}` }}>
              {`${S(v.t?.footer?.map)}`}
            </a>
            {' '}
            <p style={{ "margin": "8px 0 0", "fontSize": "14px" }}>
              {`${S(v.t?.footer?.hours)}`}
            </p>
            {' '}
          </div>
          {' '}
          <div className={"ph-fcol"}>
            {' '}
            <p className={"ph-flabel"} style={{ "color": `${S(v.th?.faint)}` }}>
              {`${S(v.t?.footer?.contactLabel)}`}
            </p>
            {' '}
            <a href={"tel:+966112222570"} className={"ph-flink"}>
              <span dir={"ltr"}>
                {"+966 11 2222 570"}
              </span>
            </a>
            {' '}
            <a href={"tel:+966534221199"} className={"ph-flink"}>
              <span dir={"ltr"}>
                {"+966 53 422 1199"}
              </span>
            </a>
            {' '}
            <a href={"mailto:info@phome.sa"} className={"ph-flink"}>
              <span dir={"ltr"}>
                {"info@phome.sa"}
              </span>
            </a>
            {' '}
            <a href={"https://www.instagram.com/phome_sa"} target={"_blank"} rel={"noopener"} className={"ph-flink"}>
              <span dir={"ltr"}>
                {"Instagram @phome_sa"}
              </span>
            </a>
            {' '}
          </div>
          {' '}
          <div className={"ph-fcol"}>
            {' '}
            <p className={"ph-flabel"} style={{ "color": `${S(v.th?.faint)}` }}>
              {`${S(v.t?.footer?.officialLabel)}`}
            </p>
            {' '}
            <p style={{ "margin": "0" }}>
              {`${S(v.t?.footer?.crLabel)} `}
              <span dir={"ltr"} style={{ "fontFamily": "'Outfit', sans-serif" }}>
                {"7008464179"}
              </span>
            </p>
            {' '}
            <p style={{ "margin": "0" }}>
              {`${S(v.t?.footer?.chamberLabel)} `}
              <span dir={"ltr"} style={{ "fontFamily": "'Outfit', sans-serif" }}>
                {"42631"}
              </span>
            </p>
            {' '}
          </div>
          {' '}
        </div>
        {' '}
        <div style={{ "padding": `24px ${S(v.edge)} 32px`, "display": "flex", "flexWrap": "wrap", "alignItems": "center", "justifyContent": "space-between", "gap": "12px 32px", "fontSize": "13px", "color": `${S(v.th?.faint)}`, "borderTop": `1px solid ${S(v.th?.line)}` }}>
          {' '}
          <span>
            {`${S(v.t?.footer?.legal)}`}
          </span>
          {' '}
          <a href={"#top"} className={"ph-flink"}>
            {`${S(v.t?.footer?.top)}`}
          </a>
          {' '}
        </div>
        {' '}
      </footer>
      {' '}
    </section>
    </>
  );
}
