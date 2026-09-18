const siteIndex = `# Crabionics

> Crabionics is building a connected production system for more controlled mud-crab farming.

Crabionics works across habitat, observation, local intervention, operating records and production learning. The company does not publish biological results, customer outcomes or performance metrics unless they are supported by confirmed evidence.

## Primary pages

- [System](https://crabionics.com/system): How habitat, observation, decision, intervention and learning fit together.
- [For Producers](https://crabionics.com/producers): Production jobs, operating context and pilot questions.
- [Validation](https://crabionics.com/validation): Separate tracks for system integration, biology and commercial demand.
- [Company](https://crabionics.com/company): Company history, team and institutional relationships.
- [AquaOS](https://crabionics.com/aquaos): The operating software layer being developed within the production system.
- [Investors](https://crabionics.com/investors): Factual company context, development work and validation pathway.
- [Insights](https://crabionics.com/insights): Research notes, pilot designs and field-learning updates when publishable material is ready.
- [Talk to us](https://crabionics.com/contact): Contact for producer, technical, research and technology partnership conversations.

## Company identity

- Legal name used on this site: Crabionics Aquaculture Pvt. Ltd.
- Email: sameer@crabionics.com
- LinkedIn: https://www.linkedin.com/company/crabionics-aquaculture-private-limited/

## Current boundaries

AquaOS is in development. The validation programme describes questions and evidence tracks, not completed biological or commercial results. Public pages should be read as current company context and development direction, not as a catalogue of completed product capabilities.
`;

export function GET() {
  return new Response(siteIndex, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
