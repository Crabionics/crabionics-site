import { Intro, Page, Section } from "../../components/public/Experience";
import DemandReview from "../../components/public/DemandReview";
export const metadata={title:"Early-access Team Review",robots:{index:false,follow:false}};
export default function ReviewPage(){return <Page name="team-review"><Intro eyebrow="Private team review" title="Understand confirmed producer interest."><p>Review roles, regions and needs after email verification.</p></Intro><Section><DemandReview/></Section></Page>}
