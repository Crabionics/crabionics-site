const siteIndex = `# Crabionics

> Crabionics is building a connected production system for more controlled mud-crab farming.

Crabionics works across biology, habitat, sensing, local equipment and operating software. Its wider direction connects hatchery and nursery development, farmer pond production, aggregation and grading, controlled finishing and processor or buyer requirements. These production connections are proposed arrangements being examined through development and partner work.

## Primary pages

- [Solutions](https://www.crabionics.com/solutions): Habitat, CrabSense, CrabPod and AquaOS, with their current development scope.
- [System](https://www.crabionics.com/system): How habitat, sensing, operating decisions, defined rules and local equipment connect under operator oversight.
- [For Producers](https://www.crabionics.com/producers): Production jobs, operating context and pilot questions.
- [Validation](https://www.crabionics.com/validation): Separate tracks for system integration, biology and commercial demand.
- [Company](https://www.crabionics.com/company): Company history, team and institutional relationships.
- [AquaOS](https://www.crabionics.com/aquaos): The operating and control layer being developed, with a proposed operator early-access workflow.
- [Investors](https://www.crabionics.com/investors): Factual company context, development work and validation pathway.
- [Workflow preview](https://www.crabionics.com/demo): An illustrative sample operator workflow, not a released beta.
- [Early access](https://www.crabionics.com/early-access): Express interest in the proposed operator workflow.
- [Resources](https://www.crabionics.com/resources): Practical guides to pilot scoping, operating history and finishing intake. Research results will be published when evidence is ready.
- [Talk to us](https://www.crabionics.com/contact): Production, market, technical, beta, research, institutional and investment enquiry paths via info@crabionics.com.

## Company identity

- Legal name used on this site: Crabionics Aquaculture Pvt. Ltd.
- Email: info@crabionics.com
- LinkedIn: https://www.linkedin.com/company/crabionics-aquaculture-private-limited/

## Current boundaries

AquaOS is in development. Its design links observations, operating state, decisions, defined rules, alerts, bounded commands and outcomes. Software foundations exist; physical integration and a complete biological control loop remain to be demonstrated. Technical, biological and commercial results require separate measurements. The proposed 600-box configuration is a later validation setting.
`;

export function GET() {
  return new Response(siteIndex, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
