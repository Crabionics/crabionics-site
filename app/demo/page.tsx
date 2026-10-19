import type { Metadata } from "next";
import { Intro, Page, styles as s } from "../components/public/Experience";
import AquaDiscovery from "../components/discovery/AquaDiscovery";
export const metadata: Metadata = {title:"Try CrabDesk + Moltie",description:"Explore real CrabDesk demo captures, reveal recorded Moltie answers and compare with the dashboard source. No sign-in required.",alternates:{canonical:"/demo"}};
export default function DemoPage(){return <Page name="demo"><Intro eyebrow="CrabDesk + Moltie / Public discovery" title="A closer look at the working software."><p className={s.lead}>Check the dashboard, choose a question and trace the answer. This read-only replay uses authentic captures and demo records. Moltie’s responses are recorded, not generated live.</p></Intro><AquaDiscovery page="demo"/></Page>;}
