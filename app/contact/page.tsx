import type { Metadata } from "next";
import styles from "../components/public/Participation.module.css";

export const metadata: Metadata = {
  title: "Talk to us",
  description: "Talk to Crabionics about pond and finishing partnerships, AquaOS grow-out beta interest, research, institutional collaboration or investment.",
  alternates: { canonical: "/contact" },
};

const conversations = [
  { id: "production", label: "Production", title: "Discuss a pond or finishing partnership", description: "Your setting, location, species and operating role—and the production question you want to examine.", subject: "Pond / finishing partnership enquiry" },
  { id: "market", label: "Market", title: "Discuss buyer or cluster requirements", description: "Size, condition, supply frequency, handling and destination requirements for a buyer, processor or cluster conversation.", subject: "Buyer / cluster requirements enquiry" },
  { id: "technical", label: "Technical", title: "Discuss the technical scope", description: "Request a technical brief or discuss how the production setting, sensing, local intervention and operating record fit together.", subject: "Technical brief enquiry" },
  { id: "research", label: "Research", title: "Explore a research partnership", description: "Your institution and research question, from seed and biological outcomes to system integration and production learning.", subject: "Research partnership enquiry" },
  { id: "aquaos-beta", label: "AquaOS", title: "Register grow-out beta interest", description: "Tell us about your pond, production team and current record-keeping so we can discuss fit with the work being developed.", subject: "AquaOS grow-out beta interest" },
  { id: "institutions", label: "Institutions", title: "Discuss a government or institutional collaboration", description: "Your organisation, programme and region, and the production or fisheries question you are working on.", subject: "Government / institutional collaboration" },
  { id: "investors", label: "Investors", title: "Discuss the company and investment", description: "Your organisation and interest in Crabionics, its development programme and the wider production direction.", subject: "Investment enquiry" },
];

export default function ContactPage() {
  return (
    <div data-page="contact" className={styles.page}>
      <section className={`${styles.section} ${styles.pale} ${styles.contactOpening}`}>
        <div className={`${styles.container} ${styles.contactIntro}`}>
          <div><p className={styles.eyebrow}>Talk to Crabionics</p><h1 className={styles.title}>Talk to the team.</h1><p className={styles.lead}>Bring a production setting, a software question, a research or institutional opportunity, or an interest in the company.</p></div>
          <div className={styles.directContact}><p className={styles.eyebrow}>A direct conversation</p><a href="mailto:info@crabionics.com">info@crabionics.com <span aria-hidden="true">↗</span></a><p>Choose a subject below, or write to us directly.</p></div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.container} ${styles.contactBody}`}>
          <div className={styles.contactGuide}><p className={styles.eyebrow}>Choose a conversation</p><h2 className={styles.smallHeading}>Start with <br />what matters to you.</h2><p>Each link opens an email with the subject prepared. Include your name, organisation, role and operating region.</p><a className={styles.textLink} href="mailto:info@crabionics.com">Email the team <span aria-hidden="true">→</span></a></div>
          <div className={styles.conversationList}>
            {conversations.map((conversation, index) => (
              <article className={styles.conversation} id={conversation.id} key={conversation.id}>
                <span className={styles.conversationNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div><p className={styles.eyebrow}>{conversation.label}</p><h3><a href={`mailto:info@crabionics.com?subject=${encodeURIComponent(conversation.subject)}`}>{conversation.title}<span aria-hidden="true">↗</span></a></h3><p className={styles.conversationDescription}>{conversation.description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
