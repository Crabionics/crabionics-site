import type { Metadata } from "next";
import { Page } from "../components/public/Experience";
import ProductFilm from "../components/product/ProductFilm";
export const metadata: Metadata = {title:"CrabDesk + Moltie | Product Film",description:"Watch the CrabDesk dashboard and a real Moltie response using demo records. RAS grow-out software, the first working AquaOS capability.",alternates:{canonical:"/demo"}};
export default function DemoPage(){return <Page name="demo"><ProductFilm page="demo"/></Page>;}
