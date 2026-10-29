import { memo } from 'react';
import { S, A, AR, R, same } from '../lib/view-helpers';
import FlyingLogoView from './sections/FlyingLogo';
import LoaderView from './sections/Loader';
import MenuView from './sections/Menu';
import HeaderView from './sections/Header';
import TopView from './sections/Top';
import AboutView from './sections/About';
import ServicesView from './sections/Services';
import HomeLifeView from './sections/HomeLife';
import SectorsView from './sections/Sectors';
import AlbumView from './sections/Album';
import ClientsView from './sections/Clients';
import ContactView from './sections/Contact';

// Each section re-renders only when the values it reads change (scrolling updates a few of them every frame).
const FlyingLogo = memo(FlyingLogoView, (a, b) => same(a.v, b.v, ["t","logo"]));
const Loader = memo(LoaderView, (a, b) => same(a.v, b.v, ["ld","t","ldRef0","ldRef1","ldRef2"]));
const Menu = memo(MenuView, (a, b) => same(a.v, b.v, ["menuOpen","t","th","menuItems","menuClose","font","toggleLang","toggleTheme","themeLabel"]));
const Header = memo(HeaderView, (a, b) => same(a.v, b.v, ["hdr","t","navItems","toggleLang","font","toggleTheme","isDark","isLight","menuToggle","menuAria","menuOpen","menuIcon","pagePct","accent"]));
const Top = memo(TopView, (a, b) => same(a.v, b.v, ["filmRef","t","filmVh","clips","yes","vidFlip","scrimDir","introVeil","cueOp","railOp","railPct","accent","chapters","dir","followTop","font","endOp","endPe"]));
const About = memo(AboutView, (a, b) => same(a.v, b.v, ["aboutRef","edge","font","aboutWords","th","t","aboutClip","img","aboutScale"]));
const Services = memo(ServicesView, (a, b) => same(a.v, b.v, ["th","edge","t","font","svc","scrimDir"]));
const HomeLife = memo(HomeLifeView, (a, b) => same(a.v, b.v, ["homeRef","t","hl","scrimDir","edge","font"]));
const Sectors = memo(SectorsView, (a, b) => same(a.v, b.v, ["secRef","secVh","th","edge","t","font","trackRef","secX","sectors"]));
const Album = memo(AlbumView, (a, b) => same(a.v, b.v, ["t","edge","th","font","alb","lb"]));
const Clients = memo(ClientsView, (a, b) => same(a.v, b.v, ["t","edge","th","font","proofRef","clLeave","proofClients","originSide"]));
const Contact = memo(ContactView, (a, b) => same(a.v, b.v, ["img","contactScale","edge","dir","font","t","onSubmit","formBtn","th"]));

export default function SiteView({ v }) {
  return (
    <div dir={A(v.dir)} lang={A(v.lang)} style={{ "--ph-origin": `${S(v.originSide)}`, "background": `${S(v.th?.bg)}`, "color": `${S(v.th?.text)}`, "fontFamily": `${S(v.font?.body)}`, "minHeight": "100vh", "position": "relative", "transition": "background 300ms ease, color 300ms ease" }}>
      <FlyingLogo v={v} />
      <Loader v={v} />
      <Menu v={v} />
      <Header v={v} />
      <Top v={v} />
      <About v={v} />
      <Services v={v} />
      <HomeLife v={v} />
      <Sectors v={v} />
      <Album v={v} />
      <Clients v={v} />
      <Contact v={v} />
    </div>
  );
}
