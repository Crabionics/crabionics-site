import type { Metadata } from "next";
import { Intro, Page, styles as s } from "../components/public/Experience";
import AquaDiscovery from "../components/discovery/AquaDiscovery";
export const metadata: Metadata = {title:"Explore AquaOS",description:"Three short conceptual interactions: see the operation, follow a change and understand its history. Request a guided product demonstration.",alternates:{canonical:"/demo"}};
export default function DemoPage(){return <Page name="demo"><Intro eyebrow="AquaOS / Public discovery" title="Three connections. One continuing story."><p className={s.lead}>Explore the value of connected records in about 30–45 seconds. These conceptual visuals explain the idea; they are not CrabDesk screenshots or a live farm workspace.</p></Intro><AquaDiscovery page="demo"/></Page>;}
