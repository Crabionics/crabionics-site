export const solutions = [
  {
    slug: "habitat",
    name: "Habitat",
    category: "Production environment",
    title: "A setting built around the animal.",
    description: "A defined setting for care, handling and observation.",
    image: "/photos/isolation-box.jpg",
    alt: "Mud crab in an individual blue habitat.",
    concept: false,
    status: "Integration in development",
    href: "/solutions/habitat",
    icon: "habitat",
    requirements: [
      "Production setting and intended stock",
      "Handling and daily care responsibilities",
      "Water management and supporting equipment",
    ],
    scope:
      "Habitat integration is in development. Pond settings have separate requirements.",
    question:
      "How does the physical setting support observation, handling and repeatable operating work?",
  },
  {
    slug: "crabsense",
    name: "CrabSense",
    category: "Environmental observation",
    title: "Understand conditions in context.",
    description: "Observe conditions in their production context.",
    image: "/images/versioned/sensing.b79a337c.webp",
    alt: "Concept illustration of sensing probes beside a mud-crab habitat.",
    concept: true,
    status: "Sensing scope under development",
    href: "/solutions/crabsense",
    icon: "sense",
    requirements: [
      "Parameters relevant to the production question",
      "Sensor installation and maintenance responsibilities",
      "The farm, unit or cohort each reading describes",
    ],
    scope:
      "Define the sensing scope and evaluate observations for each setting.",
    question:
      "Can reliable observations be linked to the right setting and the action that follows?",
  },
  {
    slug: "crabpod",
    name: "CrabPod",
    category: "Local equipment connection",
    title: "Connect decisions to local response.",
    description: "Connect local equipment to observations and commands.",
    image: "/photos/ras-plumbing.jpg",
    alt: "Production racks and water equipment in an aquaculture installation.",
    concept: false,
    status: "Local integration in development",
    href: "/solutions/crabpod",
    icon: "pod",
    requirements: [
      "Equipment and permitted actions",
      "Operator oversight and escalation responsibilities",
      "Communication, power and response verification",
    ],
    scope:
      "Local integration is in development. Define permitted actions and verify each equipment response.",
    question:
      "Does an authorised command produce an observable, recorded equipment response?",
  },
  {
    slug: "aquaos",
    name: "AquaOS",
    category: "Operating software",
    title: "Keep the production work connected.",
    description: "Link observations, decisions and operating history.",
    image: null,
    alt: "",
    concept: true,
    status: "Grow-out beta interest",
    href: "/aquaos",
    icon: "record",
    requirements: [
      "Daily routines and current records",
      "Operator roles and production context",
      "Trial scope and physical integration where relevant",
    ],
    scope:
      "Software foundations exist. Physical integration and the biological control loop need further demonstration.",
    question:
      "Can the team connect what was observed, what was decided and what changed?",
  },
] as const;

export const resources = [
  {
    slug: "planning-a-production-pilot",
    category: "Partnership guide",
    title: "What to bring to a production pilot conversation",
    description:
      "A practical checklist for defining the setting, responsibilities and question before a trial.",
    reading: "4 minute read",
    sections: [
      {
        title: "Begin with your production setting",
        paragraphs: [
          "A useful pilot starts with the daily work. Explain whether you operate a pond, receive crabs for finishing, or coordinate supply for a buyer. Include your region, species, stock size and condition, and the people responsible for care.",
          "Expected quantity, availability season, handling and destination help define the connection between stages. An initial conversation can begin even when some of these details are still being established.",
        ],
        points: [
          "Operating role and location",
          "Species, seed source, stock size and condition",
          "Quantity and expected availability",
          "Current equipment, water management and records",
        ],
      },
      {
        title: "Agree one question before choosing equipment",
        paragraphs: [
          "Define what you need to understand: an operating routine, the usefulness of observations, suitable finishing intake, or a production connection. That question determines what is measured and which components are relevant.",
          "Technology should fit the agreed production question. Habitat, sensing, local equipment and operating software each have a role, but their scope should be specified for the setting.",
        ],
      },
      {
        title: "Make responsibilities explicit",
        paragraphs: [
          "Agree who supplies equipment, handles stock, checks observations, maintains devices and reviews the results. Costs, duration, site access and handling arrangements belong in the trial plan.",
          "Participation, equipment scope and timing are discussed individually. A pilot enquiry is the beginning of a fit conversation.",
        ],
      },
      {
        title: "Define what would inform the next step",
        paragraphs: [
          "A trial should leave a useful record. Agree measurements, operating events and review points before work begins. Identify which outcomes are technical, biological or commercial, and assess each with the evidence it requires.",
        ],
      },
    ],
  },
  {
    slug: "understanding-the-operating-loop",
    category: "System explainer",
    title: "From an observation to a useful operating history",
    description:
      "How production context, operator oversight and recorded responses fit together.",
    reading: "3 minute read",
    sections: [
      {
        title: "A reading needs a setting",
        paragraphs: [
          "An environmental observation becomes more useful when it is linked to the pond, production unit or cohort it describes. Timing, equipment condition and handling events provide the context for interpreting what happened.",
        ],
      },
      {
        title: "Decisions have responsibilities",
        paragraphs: [
          "Crabionics’ operating design places decisions and defined rules under operator oversight. Where local control is appropriate, a bounded command connects a decision to equipment. Its acknowledgement and subsequent observations help the team review the response.",
          "Permitted actions, local equipment and escalation responsibilities need to be defined and tested for each integration.",
        ],
      },
      {
        title: "A command and an outcome are different observations",
        paragraphs: [
          "Equipment acknowledgement can show that a request was received. A subsequent observation helps establish what changed in the setting. Biological performance and production value require their own measurements over the relevant period.",
          "Keeping these records together supports review without treating a technical response as proof of a biological or commercial result.",
        ],
      },
      {
        title: "The current development boundary",
        paragraphs: [
          "AquaOS software foundations cover observations, operating records, execution requests and event history. Physical integration is in development, and a complete biological control loop remains to be demonstrated.",
        ],
      },
    ],
  },
  {
    slug: "defining-finishing-intake",
    category: "Production planning",
    title: "Define intake before planning controlled finishing",
    description:
      "The stock, handling and supply questions that connect pond production to a finishing trial.",
    reading: "3 minute read",
    sections: [
      {
        title: "Describe the stock you expect to receive",
        paragraphs: [
          "Species, size, condition and seed source are starting points for a finishing conversation. Discuss expected quantity, grading, availability dates and how stock would move from pond harvest to the receiving setting.",
          "These details help define a trial’s scope and the operating records needed to understand its results.",
        ],
      },
      {
        title: "Connect the people at each stage",
        paragraphs: [
          "Identify who grows, grades, transports and receives the stock. Handling responsibilities, transfer records and the receiving team’s daily routines should be agreed alongside equipment and water-management responsibilities.",
        ],
      },
      {
        title: "Work back from market requirements",
        paragraphs: [
          "Buyers and processors contribute the specification: species, size, condition, required quantity, dates, handling and destination. Their requirements help shape which production questions a trial should examine.",
          "The wider pond-to-finishing connection is a proposed production model. Reliable biomass supply, biological performance, operating costs and demand need to be examined in their own settings.",
        ],
      },
      {
        title: "Keep the proposed scope clear",
        paragraphs: [
          "The proposed 600-box configuration is a later controlled-finishing validation setting. Configuration, responsibilities, costs and trial arrangements depend on the production setting and its agreed measurement plan.",
        ],
      },
    ],
  },
] as const;

export const partnershipFaq = [
  [
    "Who can enquire?",
    "Growers, finishing operators, buyers and partners. Bring your role, region, stock and question.",
  ],
  [
    "What will Crabionics supply?",
    "Scope is agreed for each setting: equipment, installation, maintenance, stock handling and operating responsibilities.",
  ],
  [
    "Pilot costs and timing?",
    "Agreed during scoping. There is no standard package or guaranteed start date.",
  ],
  [
    "Is AquaOS available for my pond?",
    "Early-access interest is welcome. Explore the illustrative workflow preview. No released operator beta is evidenced yet; trial access and equipment integration are discussed individually.",
  ],
  [
    "What production results have been demonstrated?",
    "Integration, biological performance and commercial fit need separate evidence. Proposed validation is not a demonstrated result.",
  ],
] as const;
