import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CTA,
  Intro,
  Page,
  Section,
  TextLink,
  styles as s,
} from "../../components/public/Experience";
import { resources } from "../../components/public/site-content";
export function generateStaticParams() {
  return resources.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = resources.find((item) => item.slug === slug);
  return {
    title: resource?.title || "Resource",
    description: resource?.description,
    alternates: { canonical: `/resources/${slug}` },
  };
}
export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = resources.find((item) => item.slug === slug);
  if (!resource) notFound();
  return (
    <Page name={`resource-${slug}`}>
      <Intro eyebrow={resource.category} title={resource.title}>
        <p className={s.lead}>{resource.description}</p>
        <p className={s.resourceMeta}>
          Crabionics · {resource.reading} · Planning guide
        </p>
      </Intro>
      <Section>
        <article className={s.article}>
          <div className={s.back}>
            <TextLink href="/resources">All resources</TextLink>
          </div>
          {resource.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {"points" in section && (
                <ul>
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <div className={s.note}>
            <p>
              This guide describes the scoping approach. The operating design
              and proposed production connections remain subject to development
              and validation in defined settings.
            </p>
          </div>
        </article>
      </Section>
      <CTA />
    </Page>
  );
}
