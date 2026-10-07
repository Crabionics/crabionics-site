export const assistantAnswers = [
  {
    id: "pond",
    question: "What suits my pond?",
    keywords: ["pond", "grower", "farm", "growout", "grow-out", "farmer"],
    answer:
      "Tell us your production stage, stock, region and biggest operating problem. Pond production, seed supply and partnership questions can be discussed with the team. AquaOS operator-beta interest is a separate path; software and equipment fit are scoped for the setting.",
    links: [
      ["For producers", "/producers#pond-production"],
      ["Join early access", "/early-access"],
    ],
  },
  {
    id: "demo",
    question: "What can I try today?",
    keywords: ["demo", "try", "walkthrough", "today", "available"],
    answer:
      "Explore an illustrative feeding round: review a sample observation, choose an operator follow-up, record a sample outcome and see the history. This website preview is not a released operator beta. It saves no farm records and controls no equipment.",
    links: [["Explore the workflow preview", "/demo"]],
  },
  {
    id: "beta",
    question: "How do I join the beta?",
    keywords: ["beta", "access", "register", "signup", "sign up", "join"],
    answer:
      "Share your role, region and daily operating problem, then confirm your email. The team reviews fit and discusses participation. The operator beta is in development; registration expresses interest and does not provide immediate product access or a guaranteed trial date.",
    links: [["Early-access interest", "/early-access"]],
  },
  {
    id: "system",
    question: "How do the components connect?",
    keywords: [
      "system",
      "component",
      "connect",
      "habitat",
      "crabsense",
      "sensor",
      "crabpod",
      "aquaos",
      "software",
    ],
    answer:
      "AquaOS is the developing operating layer connecting production context, observations, decisions, actions and outcome history. Habitat provides the physical setting; CrabSense and CrabPod are developing sensing and equipment connections. The intended loop returns measured outcomes to the records. Copilot is an operator interface into this wider system.",
    links: [
      ["See the system diagram", "/system"],
      ["Explore solutions", "/solutions"],
    ],
  },
  {
    id: "cost",
    question: "What does a pilot cost?",
    keywords: [
      "cost",
      "price",
      "pricing",
      "buy",
      "purchase",
      "budget",
      "timeline",
      "when",
      "date",
      "supply",
    ],
    answer:
      "Costs, timing and supply depend on stock, equipment, responsibilities and the production question. There is no standard price or guaranteed start date published. The team can scope these with you.",
    links: [["Discuss your setting", "/contact#production"]],
  },
  {
    id: "results",
    question: "What results are demonstrated?",
    keywords: [
      "result",
      "survival",
      "growth",
      "roi",
      "profit",
      "performance",
      "evidence",
      "research",
      "validation",
      "600",
    ],
    answer:
      "Physical integration is in development. Biological performance, operating costs and adoption need separate measurements. The 600-box finishing configuration is proposed later validation; it is not a demonstrated result.",
    links: [["Research & validation", "/validation"]],
  },
  {
    id: "finishing",
    question: "What about controlled finishing?",
    keywords: ["finishing", "intake", "ras", "box", "grading"],
    answer:
      "Start with stock condition, grading, handling, water management and operating roles. Equipment and the measurement plan are agreed for each setting.",
    links: [
      ["Finishing partners", "/producers#controlled-finishing"],
      ["Intake planning guide", "/resources/defining-finishing-intake"],
    ],
  },
  {
    id: "buyer",
    question: "I am a buyer or cluster partner.",
    keywords: ["buyer", "market", "cluster", "export", "processor", "quantity"],
    answer:
      "Bring species, size, condition, quantity, supply dates and handling requirements. Those specifications help shape the proposed production connection.",
    links: [
      ["Buyer requirements", "/producers#buyer-requirements"],
      ["Discuss requirements", "/contact#market"],
    ],
  },
] as const;
export function answerQuestion(question: string) {
  const text = question.toLowerCase().replace(/[^a-z0-9 -]/g, " ");
  const words = new Set(text.split(/\s+/));
  if (
    /\b(disease|medicine|treat|treatment|dose|dosage|dying|dead|antibiotic|salinity|ammonia|threshold)\b/.test(
      text,
    )
  )
    return {
      question,
      answer:
        "Farm-specific care, treatment and operating limits need an assessment of your setting. This assistant cannot diagnose animals or prescribe an action. Please contact a qualified local professional and discuss the research or equipment scope with the Crabionics team.",
      links: [
        ["Contact the team", "/contact#technical"],
      ] as readonly (readonly [string, string])[],
    };
  const matches = assistantAnswers.map((answer) => ({ answer, score: 0 }));
  // Score whole words and phrases, so unrelated words do not trigger a match.
  for (const match of matches)
    match.score = match.answer.keywords.reduce(
      (sum, key) =>
        sum +
        ((
          key.includes(" ")
            ? text.includes(key)
            : words.has(key) || words.has(key + "s")
        )
          ? 1
          : 0),
      0,
    );
  matches.sort((a, b) => b.score - a.score);
  if (!matches[0]?.score)
    return {
      question,
      answer:
        "I don’t have an approved answer for that question. Please ask the team about your setting. For farm-specific care, disease, treatment or operating limits, a general website answer cannot determine the right action.",
      links: [["Ask the team", "/contact#technical"]] as readonly (readonly [
        string,
        string,
      ])[],
    };
  return matches[0].answer;
}
