import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  Button,
  CTA,
  Eyebrow,
  Heading,
  ImagePanel,
  Intro,
  Page,
  Section,
  Status,
  TextLink,
  styles as s,
} from "../../components/public/Experience";
import { solutions } from "../../components/public/site-content";
import { ConnectedDiagram, Glyph } from "../../components/public/Visuals";
export function generateStaticParams() {
  return solutions
    .filter((solution) => solution.slug !== "aquaos")
    .map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = solutions.find((item) => item.slug === slug);
  return {
    title: solution?.name || "Solution",
    description: solution?.description,
    alternates: { canonical: `/solutions/${slug}` },
  };
}
export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === "aquaos") redirect("/aquaos");
  const solution = solutions.find((item) => item.slug === slug);
  if (!solution || !solution.image) notFound();
  return (
    <Page name={`solution-${slug}`}>
      <Intro
        eyebrow={`${solution.name} / ${solution.category}`}
        title={solution.title}
        aside={
          <ImagePanel
            src={solution.image}
            alt={solution.alt}
            caption={
              solution.concept
                ? "Concept illustration"
                : "Production photograph"
            }
            priority
          />
        }
      >
        <p className={s.lead}>{solution.description}</p>
        <Status>{solution.status}</Status>
        <div className={s.actions}>
          <Button href="/contact#technical">Discuss the technical scope</Button>
        </div>
      </Intro>
      <Section>
        <div className={s.split}>
          <div>
            <Eyebrow>The production question</Eyebrow>
            <h2>{solution.question}</h2>
          </div>
          <div>
            <p>{solution.scope}</p>
            <TextLink href="/validation">
              See how the work is evaluated
            </TextLink>
          </div>
        </div>
      </Section>
      <Section tone="mist">
        <Heading
          eyebrow="Define it for your setting"
          title="Start with the requirements."
        />
        <div className={s.three}>
          {solution.requirements.map((requirement, i) => (
            <article className={s.detailBox} key={requirement}>
              <div className={s.cardIcon}>
                <Glyph kind={["habitat", "decision", "record"][i]} />
              </div>
              <h3>{requirement}</h3>
            </article>
          ))}
        </div>
        <div className={s.note}>
          <p>
            Equipment, measurements, costs, responsibilities and timing are
            agreed for each research or pilot setting.
          </p>
        </div>
      </Section>
      <Section>
        <div className={s.split}>
          <div>
            <Eyebrow>Part of Crabionics</Eyebrow>
            <h2>Connected to the whole system.</h2>
            <TextLink href="/system">Explore the connected system</TextLink>
          </div>
          <ConnectedDiagram />
        </div>
      </Section>
      <CTA
        href="/contact#technical"
        title={`Explore ${solution.name} in your production setting.`}
        label="Discuss the scope"
      />
    </Page>
  );
}
