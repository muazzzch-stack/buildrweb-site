export type PrivacySection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  /** two-column reference rows: [label, explanation] */
  table?: [string, string][];
  closing?: string[];
};

export const LAST_UPDATED = "21 November 2026";

export const SECTIONS: PrivacySection[] = [
  {
    title: "Who We Are",
    paragraphs: [
      "BuildrWeb (“we”, “us”, “our”) is a remote-first studio that designs, builds and maintains websites, AI voice agents and business automations for UK tradespeople and local service businesses, including plumbers, electricians, roofers, builders, garden designers, heating engineers, insulation installers, garage door fitters, dentists, restaurants and estate agents. BuildrWeb is operated by its founder, Muaz.",
      "We are a remote company, not a local one. We do not operate a physical office, shop front or studio that clients can visit. All of our work, including discovery, design, development, configuration of voice agents and automations, testing, handover and ongoing support, is carried out online and delivered remotely across the United Kingdom. Our team works remotely, including from outside the United Kingdom (currently Pakistan). Section 14 explains how we protect personal data when it is accessed from outside the UK.",
      "For the purposes of the UK General Data Protection Regulation (“UK GDPR”) and the Data Protection Act 2018, BuildrWeb is the data controller for the personal data described in sections 3, 4 and 15 (our own website, enquiries, our clients, and our own marketing). BuildrWeb is a data processor for the personal data we handle on a client’s behalf through the websites, voice agents and automations we build for them (see sections 2 and 8). Our data protection contact is:",
    ],
    bullets: ["Email: hello@buildrweb.com", "Phone: +44 7916 999893", "Website: https://buildrweb.com"],
  },
  {
    title: "Scope and Who Is Responsible for What",
    paragraphs: [
      "This policy covers personal data collected through buildrweb.com, our contact form, email, phone, WhatsApp and social media, and personal data we handle while building and running websites, AI voice agents and automations. Because we do different things for different people, the table below shows our role in each situation.",
    ],
    table: [
      ["You visit buildrweb.com or contact us", "We are the controller. This policy is your privacy notice."],
      ["You are a prospective or current client", "We are the controller of your business and contact data, project files, invoices and communications."],
      ["You are a prospect we contact about our services", "We are the controller. See section 15 for the source of your details and how to opt out."],
      ["You call, message or book through a client’s website, voice agent or automation", "The client (the trade, practice, restaurant or agency you contacted) is the controller. We are its processor and only act on its written instructions. The client’s own privacy notice applies to you."],
      ["You administer a website, phone line or automation we build", "We are the controller of your account and access details, and a processor of any customer data stored in those systems."],
    ],
    closing: [
      "If you are unsure whose privacy notice applies to you, ask the business you dealt with. You can also contact us at hello@buildrweb.com and we will point you to the right controller.",
    ],
  },
  {
    title: "Data We Collect: Website Visitors and Enquiries",
    paragraphs: ["We collect only what we need to answer enquiries and run our own business. Depending on how you interact with us, this may include:"],
    bullets: [
      "Contact form data: your full name, email address, phone number (optional), what you need (website, AI voice agent, automation or all), your trade or business type, and the message you write. These are sent to us by Formspree.",
      "Direct communications: the content and metadata of emails, WhatsApp messages, Instagram or Facebook messages, calls and video meetings you have with us, including attachments, screenshots and links you send.",
      "Technical data: IP address, browser and device type, operating system, referring page, pages requested and timestamps, recorded in server and CDN logs by our hosting provider and used for security, reliability and abuse prevention.",
      "Business information you volunteer: trading name, service area, existing website address, branding, Google Business Profile details and the services you offer.",
    ],
    closing: ["We do not use advertising pixels, cross-site trackers, behavioural profiling or fingerprinting on buildrweb.com, and we do not sell personal data."],
  },
  {
    title: "Data We Collect: Website Design and Development Projects",
    paragraphs: ["To design, build, host, migrate and maintain a website we may need the following, depending on the project:"],
    bullets: [
      "Identity and contact data for you and your team: names, job titles, business email addresses, phone numbers and preferred contact times.",
      "Business data: legal and trading name, company number, VAT number, registered and trading address, service areas, opening hours, accreditations (for example Gas Safe, NICEIC, NAPIT, TrustMark, GDC, FCA, Propertymark), insurance details and pricing.",
      "Content you supply: text, logos, photos and videos of your work, team photos, testimonials and reviews, case studies, brochures, price lists, FAQs and downloadable documents. Where this includes images of identifiable people, you confirm you have the right to use them.",
      "Website content migrated from your current site, including page text, blog posts, images, redirects and SEO metadata, and, where we migrate or integrate forms, the form entries stored on the old site.",
      "Website administration data: WordPress users and roles, plugin and theme licence keys, hosting and domain details, DNS records, SSL certificates, backups, uptime and performance logs.",
      "Enquiry data from forms we build for you: names, email addresses, phone numbers, addresses or postcodes, job details, photos uploaded by customers and the message text, held in the website, the form service or your inbox as agreed.",
      "Search and analytics data from tools such as Google Search Console, Google Analytics, Google Business Profile and Google Tag Manager where you ask us to set them up or review them.",
      "Billing data: quotes, invoices, payment status and bank or payment-platform references. We never ask for or store full card numbers.",
    ],
  },
  {
    title: "Data We Collect: AI Voice Agents",
    paragraphs: [
      "An AI voice agent answers a phone number for the business, holds a spoken conversation with the caller, and can book appointments, take messages, answer common questions and pass details to the right person. Setting up and running one involves the following personal data, which we process as the client’s processor unless stated otherwise:",
    ],
    bullets: [
      "Call audio and, where recording is switched on, call recordings.",
      "Call transcripts, summaries and structured fields extracted from the conversation, such as name, reason for calling, urgency, requested service, preferred date and time, and outcome.",
      "Caller details: the calling phone number, any name, email address, home or site address or postcode and property or vehicle details the caller chooses to give, and any booking reference.",
      "Call metadata: date, time, duration, call direction, call status, forwarding or transfer events, voicemail, and technical quality logs.",
      "Inferred or derived data created by the agent, such as intent, sentiment, a lead score or a “hot / warm / cold” label, and tags used to route the call. These are business notes, not decisions about legal rights (see section 10).",
      "Configuration data supplied by the client: opening hours, service areas, price guides, call scripts, FAQs, staff names and numbers for transfers, and calendar availability.",
      "Test calls made by us and the client during setup, which may include staff voices and test names.",
    ],
    closing: [
      "We do not build voice agents to identify callers by their voice (voice biometrics), to take payment card numbers by voice, or to handle emergency calls. Where a caller says something that sounds like an emergency, the agent is configured to tell them to hang up and call 999 or the relevant emergency service, or to transfer to a human where the client has set that up.",
    ],
  },
  {
    title: "Data We Collect: Business Automations",
    paragraphs: ["Automations connect forms, calls, email, calendars, spreadsheets and other business tools so that follow-up happens without manual work. Depending on the automation, the following data passes through or is stored by the workflow, again usually as the client’s processor:"],
    bullets: [
      "Trigger data: the contents of the webhook, form submission, call result, booking or message that starts the workflow, for example a patient booking, table reservation or property enquiry.",
      "Record data written to systems the client controls: rows in Google Sheets, events in Google Calendar, contacts and deals in a CRM, tickets, tasks and notes.",
      "Messages sent by the workflow: confirmation emails, reminders, alerts to staff, thank-you or nurture emails and, where enabled, SMS or WhatsApp messages. These contain the recipient’s name, contact details and the booking or enquiry details.",
      "Routing and scoring data: tags, categories and scores used to decide who is alerted or what happens next, for example allergy alert, large group, special occasion, hot, warm or cold lead.",
      "Workflow run logs held by the automation platform: timestamps, step results, error messages and, for a limited time, the input and output of each step. These can contain the personal data listed above.",
      "Credentials and tokens needed to let the workflow act in your accounts (see section 7). These are secrets, not personal data about your customers, but they are treated with the highest care.",
    ],
  },
  {
    title: "Access We May Request to Your Accounts and Systems",
    paragraphs: [
      "To build or connect things for you we may need access to some of your accounts. We ask only for the minimum access needed for the agreed work, and only for as long as we need it. Depending on the project, this can include the items below, and we handle all access under the principles that follow the table.",
    ],
    table: [
      ["Website and hosting", "WordPress administrator or editor user, hosting control panel, SFTP or SSH, a Netlify, Vercel or similar team invitation, a GitHub or GitLab repository, backups and staging environments."],
      ["Domain, DNS and email", "Domain registrar or DNS (for example Cloudflare) so we can point the domain, add SSL and set SPF, DKIM and DMARC records, and mailbox or Google Workspace admin access when we configure business email or sending."],
      ["Search and marketing", "Google Search Console, Google Analytics, Google Tag Manager and Google Business Profile manager or owner roles; Meta Business Suite for Facebook and Instagram when you ask us to connect them."],
      ["Phone and voice", "Your business phone number or a new number we provide, call-forwarding or porting authorisation, the telephony carrier or SIP account, caller-ID settings, business hours, and the voice agent platform account where the agent is run."],
      ["Calendars and bookings", "Google Calendar or Microsoft 365 calendar permissions to read availability and create events, and access to your booking, practice-management, table-reservation or estate-agency systems where an integration is needed."],
      ["Email and spreadsheets", "Permission to send email from a named business mailbox, and to read or write specific Google Sheets, so confirmations, alerts and logs can be sent and saved."],
      ["CRM and accounting", "API keys or user access for your CRM or job-management tool so records can be created and updated, and, only if asked, read-only access to accounting or payment tools to match invoices."],
      ["Automation and messaging", "API keys, webhook URLs and OAuth connections for the automation platform, SMS or WhatsApp Business providers, and any other app your workflow needs."],
    ],
    bullets: [
      "Least privilege: we ask for the lowest role that lets us do the job (for example an Editor or Manager role instead of Owner, or a named sheet instead of your whole Drive).",
      "Named accounts, not shared passwords: wherever possible you invite us as a separate user. If a credential must be shared it is sent through a password manager or secure link, never in plain text over chat or email.",
      "Two-factor authentication is used on our own accounts, and we ask you to keep it enabled on yours.",
      "OAuth and API tokens are stored in the encrypted credential vault of the relevant platform, not in code or documents. Where we connect to Google services, our use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy, including its Limited Use requirements.",
      "We only look at the content of mailboxes, sheets, calendars and recordings to the extent needed to build, test, fix or support the agreed workflow.",
      "When the project ends, or at your request, we remove our users, revoke tokens and API keys, and ask you to rotate any credentials we held. We aim to do this within 30 days.",
    ],
  },
  {
    title: "Data From Callers and Customers of Our Clients",
    paragraphs: [
      "When a member of the public calls, messages or books through a client’s voice agent, website or automation, the client is the controller and we are its processor. In that role:",
    ],
    bullets: [
      "We process the data only on the client’s documented instructions, set out in our written agreement and the configuration of the system.",
      "We keep the data confidential, restrict access to people who need it, and apply the security measures in section 18.",
      "We use sub-processors only as listed in section 13 and flow the same data protection obligations down to them.",
      "We help the client respond to access, deletion, correction and objection requests, and we tell the client promptly if we receive one directly. We will not respond on the client’s behalf unless instructed.",
      "We notify the client without undue delay, and in any event within 48 hours of confirmation, of a personal data breach affecting its data.",
      "At the end of the engagement we delete or return the data at the client’s choice, unless the law requires us to keep it.",
    ],
    closing: ["If you are a customer of one of our clients and want to exercise your rights, please contact that business directly. If you cannot identify it, email us and we will help."],
  },
  {
    title: "Lawful Bases for Our Own Processing",
    paragraphs: ["We only use personal data where UK GDPR gives us a lawful basis. For the data we control, the basis is as follows:"],
    table: [
      ["Answering your enquiry and discussing a project", "Legitimate interests (replying to people who contact us first) or steps taken at your request before entering a contract."],
      ["Quoting, building, hosting and supporting your website, voice agent or automation", "Performance of a contract with you."],
      ["Project communications, revisions, handover and support", "Performance of a contract."],
      ["Invoicing, payments and accounting records", "Performance of a contract and legal obligation (HMRC and company record-keeping)."],
      ["Securing our systems, preventing fraud and abuse, and keeping logs", "Legitimate interests."],
      ["Improving buildrweb.com and our services using aggregated or minimal technical data", "Legitimate interests."],
      ["Business-to-business outreach to people who may want our services", "Legitimate interests, subject to the rules in section 15."],
      ["Optional updates you asked to receive", "Consent, which you can withdraw at any time."],
      ["Handling requests to exercise your rights, and complaints", "Legal obligation and legitimate interests."],
    ],
    closing: ["We do not sell, rent or trade personal data."],
  },
  {
    title: "AI, Automated Processing and Decision-Making",
    paragraphs: [
      "Our voice agents and automations use artificial intelligence, including speech recognition, speech generation and large language models, to understand callers, reply, summarise conversations and, where configured, score leads. We want you to understand how this works:",
    ],
    bullets: [
      "Disclosure: voice agents are set up to tell callers at the start of the call that they are speaking with an AI assistant, and, where recording or transcription is on, that the call may be recorded. A caller can ask to speak to a person or to leave a message for one.",
      "Purpose limits: AI output is used to book, route, remind and summarise. It is not used for decisions that produce legal or similarly significant effects on someone, such as refusing a service on its own, credit, employment or insurance decisions.",
      "Lead scoring: where an automation labels an enquiry hot, warm or cold, the label only decides who is alerted first and how quickly the business follows up. A person at the business reviews and decides what to do.",
      "Human oversight: clients receive transcripts, summaries and alerts so that people review what the AI captured. We test every agent and workflow before go-live.",
      "Accuracy: speech recognition and language models can make mistakes, mishear names or numbers and misunderstand context. Agents are configured to confirm key details (for example phone numbers, dates and addresses) back to the caller.",
      "Model providers: transcripts and prompts are sent to the AI providers listed in section 13 to produce replies. Where the provider offers the setting, we choose options that do not use your data to train its general models. Providers’ own terms apply to what they do.",
      "We do not put customer personal data into general-purpose AI chat assistants for convenience. AI-assisted tools we use for design and code work are given project content and configuration, not your customers’ records.",
    ],
  },
  {
    title: "Call Recording, Transcription and Caller Notices",
    paragraphs: [
      "UK law requires callers to be told when their call is being recorded and why. We configure the voice agent so that this information is given at the start of every call, together with the fact that an AI is answering. The business we build the agent for decides whether recording is switched on, why (for example to confirm what was agreed, resolve disputes, train staff or improve the service), and how long recordings are kept within the limits in section 17.",
    ],
    bullets: [
      "Recordings and transcripts are accessible only to the people at the client who need them, and to us for support and troubleshooting.",
      "Callers can ask the business, or us, what has been recorded and ask for it to be deleted, subject to any legal duty to keep it.",
      "Where a client does not want recordings, we switch recording off and keep only the structured booking or message data and a short summary.",
      "Calls are not used to build voiceprints or to identify callers by voice.",
    ],
  },
  {
    title: "Special Category and Sensitive Data",
    paragraphs: [
      "Some of the businesses we work for handle information that UK GDPR treats as especially sensitive, and a caller may volunteer it even when not asked:",
    ],
    bullets: [
      "Dental and other healthcare-related clients: a caller may mention symptoms, pain, medication or treatment. Voice agents for these clients are configured to collect only what is needed to book an appointment or take a message, and not to give clinical advice.",
      "Restaurant clients: dietary requirements and allergies are health data. Allergy alert automations exist to protect guests, and the restaurant is responsible for having the right lawful basis and condition for handling this information.",
      "Estate agents and trades: callers may mention personal circumstances, security arrangements, access details or vulnerability. We configure agents not to ask for these unless the client requires them.",
    ],
    closing: [
      "We do not knowingly collect special category data for our own purposes, and we ask you not to send it to us unless it is necessary for a project. Where it is unavoidable, we treat it as confidential, limit access and apply the shorter retention periods in section 17.",
    ],
  },
  {
    title: "Apps and Service Providers We Use",
    paragraphs: [
      "We use a small number of reputable online services to operate. Each acts as our processor or as the client’s sub-processor, under its own data protection terms, and handles personal data only to provide its service. The list below shows what we currently use or may use depending on the project. It is not a promise that every service is used for every client, and we update it when it changes.",
    ],
    table: [
      ["Formspree", "Receives contact-form submissions on buildrweb.com (name, email, phone, service needed, trade, message, IP address, time) and emails them to us."],
      ["Netlify", "Hosts and delivers buildrweb.com and some client websites, and keeps standard request logs (IP address, user agent, URLs, time)."],
      ["WordPress, Elementor, plugins and the client’s chosen web host", "Run client websites built on WordPress. Store site content, user accounts and any form entries. The client holds the hosting account."],
      ["Domain registrars and DNS or CDN providers (for example Cloudflare)", "Resolve the domain, issue SSL and deliver the site. Process visitor IP addresses and request logs."],
      ["Activepieces", "Automation platform. Receives webhooks, runs workflow steps, delays and routing, and keeps run logs that may contain the data passing through a workflow."],
      ["Vapi and similar voice-agent platforms", "Run the AI voice agent: handle the live call, manage speech recognition and generation, store call audio, recordings, transcripts and structured results."],
      ["Telephony carriers and number providers (for example Twilio, Vonage, Telnyx or the carrier supplying a UK number)", "Provide the phone number, route calls and SMS, and keep call detail records (numbers, time, duration)."],
      ["Speech-to-text and text-to-speech providers", "Convert the caller’s speech to text and the agent’s replies to speech in real time. Audio is processed to provide the service."],
      ["AI model providers (for example OpenAI, Anthropic and Google)", "Receive transcripts and prompts so the agent can reply, summarise conversations and classify or score enquiries."],
      ["Google Workspace: Gmail, Google Sheets, Google Calendar, Google Drive and Docs", "Send confirmation and reminder emails, store bookings and leads in spreadsheets, create calendar events and share project files."],
      ["Google Search Console, Analytics, Tag Manager and Business Profile", "Used only where a client asks us to set up or review search visibility, tracking or local listings."],
      ["Zoho Mail", "Business email for hello@buildrweb.com, including message content and contact details."],
      ["WhatsApp, Instagram and Facebook (Meta)", "Messaging and social inboxes used to talk to clients and prospects, and, where the client requests, WhatsApp Business messaging in an automation."],
      ["Notion and similar workspace, CRM or project tools", "Hold our project notes, client records and outreach tracking, and client CRM records where we maintain them."],
      ["Apollo.io and similar business-data providers", "Provide publicly sourced business contact data used for our outreach (see section 15)."],
      ["Payment and invoicing services (bank transfer, PayPal, Stripe, Fiverr)", "Take or record payments and issue invoices. They process payment details under their own policies; we do not see or store card numbers."],
      ["AI-assisted design and development tools", "Used by us for layouts, code and copy. They are given project content and configuration, not your customers’ personal data."],
    ],
    closing: [
      "Fonts on buildrweb.com are served from our own server, not from Google Fonts. Social, WhatsApp and Instagram buttons are plain links and set no tracking of their own until you click through.",
    ],
  },
  {
    title: "International Data Transfers",
    paragraphs: [
      "Many of the services in section 13 are provided from, or store data in, countries outside the United Kingdom, most commonly the United States and the European Economic Area. Our own team also works from outside the UK, currently Pakistan, which the UK government has not recognised as providing adequate data protection. We therefore protect transfers as follows:",
    ],
    bullets: [
      "UK adequacy regulations, including the UK-US data bridge for US providers certified under the Data Privacy Framework, where they apply.",
      "The UK International Data Transfer Agreement or the UK Addendum to the EU Standard Contractual Clauses where a provider or we process data outside the UK without an adequacy decision. When we act as a processor for a UK client, our written agreement with the client includes these safeguards for our access from Pakistan.",
      "Data minimisation: we send only the data needed for the service and avoid storing personal data on our own devices. Where practical we work inside the client’s or provider’s system through a named login rather than downloading data.",
      "Encryption in transit and, where the provider offers it, at rest, and access controls that limit who can see the data.",
    ],
    closing: ["You can ask us for a copy of the safeguards we rely on by emailing hello@buildrweb.com."],
  },
  {
    title: "Business Outreach and Marketing",
    paragraphs: [
      "We find businesses that may benefit from our services and contact them. This section is the notice we give people whose details we obtain from other sources.",
    ],
    bullets: [
      "Who we contact: owners, directors and managers of UK trade and local service businesses.",
      "Where we get your details: publicly available business information such as company websites, Google Business Profile and Google Maps listings, trade body and directory listings, Companies House, and professional business-data providers such as Apollo.io.",
      "What we hold: business name, your name and role, business email address and phone number, website, location and the trade you work in, and a note of what we sent and any reply.",
      "Why: to tell relevant businesses about our services, on the basis of legitimate interests. We balance this against your rights and keep it targeted and relevant to your business.",
      "Email rules: we send outreach emails to the business addresses of limited companies, LLPs and other corporate subscribers. For sole traders and some partnerships, which the Privacy and Electronic Communications Regulations treat as individuals, we only email where you have consented or have an existing relationship with us, and otherwise use other lawful channels such as a message through your published contact form.",
      "Every email states who we are and includes a clear way to opt out. If you reply “stop” or “unsubscribe”, or email hello@buildrweb.com, we stop contacting you and keep only a suppression record so we do not contact you again.",
      "We do not make unsolicited marketing calls and we check numbers against the Telephone Preference Service before any call.",
      "Retention: prospect records are deleted twelve months after our last contact if there has been no reply, apart from the suppression record.",
    ],
  },
  {
    title: "Cookies and Similar Technologies",
    paragraphs: ["buildrweb.com is deliberately light on tracking. We do not set advertising or analytics cookies and do not use social media pixels or cross-site profiling."],
    bullets: [
      "Strictly necessary storage: minimal technical items needed for the site to render and work. These do not require consent.",
      "Fonts are hosted on our own server. No request is made to Google Fonts.",
      "Embedded or linked services: links to WhatsApp, Instagram and Facebook do not load their trackers until you click them.",
      "If we later add privacy-friendly analytics, we will update this policy and ask for consent first wherever the law requires it.",
    ],
    closing: ["You can control or delete cookies through your browser settings. Restricting strictly necessary storage may affect how the site displays. Websites we build for clients have their own cookie notices, which the client is responsible for."],
  },
  {
    title: "How Long We Keep Data",
    paragraphs: ["We keep personal data only as long as needed for the purpose it was collected, then securely delete or anonymise it. Where a client controls the data, the client’s instruction on retention prevails, within these default limits:"],
    table: [
      ["Enquiries that do not become projects", "Up to 12 months, so we can follow up if you return, then deleted."],
      ["Client project data (correspondence, files, deliverables)", "For the project, then up to 7 years to meet record-keeping rules and handle warranty or dispute matters."],
      ["Invoices and billing records", "At least 6 years, as required by UK tax law."],
      ["Voice agent call recordings", "30 days by default, up to a maximum of 90 days unless the client instructs otherwise in writing and the law allows it."],
      ["Voice agent transcripts, summaries and call metadata", "Up to 12 months, or the client’s shorter instruction."],
      ["Calls that touch health or allergy information", "Recordings 30 days or less where possible; transcripts only as long as the booking or safety purpose needs."],
      ["Automation run logs", "Up to 30 days in the automation platform. Business records written to sheets, calendars and CRMs stay under the client’s control."],
      ["Credentials, API keys and tokens we hold for a project", "Removed and revoked within 30 days after the engagement ends, or sooner if you ask."],
      ["Backups", "Up to 35 days before they are overwritten."],
      ["Server and CDN logs", "Typically 30 days or less, held by the hosting provider for security."],
      ["Outreach prospect records", "12 months after last contact if no reply. Opt-out suppression records are kept so we honour your request."],
      ["Marketing consent records", "Until you withdraw consent, plus a short suppression period."],
    ],
  },
  {
    title: "How We Protect Data",
    paragraphs: ["Operating remotely means security is central to how we work rather than something handled at an office door:"],
    bullets: [
      "Access to project data is limited to the people working on the project and the client’s own users.",
      "Devices used for client work use strong passwords, full-disk encryption, a lock screen and up-to-date security patches.",
      "We use password managers, two-factor authentication and unique credentials for each service.",
      "We use reputable cloud services with encryption in transit and at rest, and with access logging.",
      "Customer data is kept inside the client’s or provider’s systems wherever possible rather than being copied to local files or email attachments.",
      "Voice agents and automations are tested with dummy data before they go live, and we keep run logs only as long as needed to fix problems.",
      "We review our tools and access lists regularly and remove access that is no longer needed.",
      "If a personal data breach is likely to risk your rights, we will tell you and the Information Commissioner’s Office (ICO) as UK GDPR requires.",
    ],
  },
  {
    title: "Our Clients’ Responsibilities",
    paragraphs: ["When we build something for you, you remain responsible for how your business uses it. In particular, you agree to:"],
    bullets: [
      "Decide the lawful basis for processing your customers’ data, and publish your own privacy notice covering your website, forms, calls, recordings and automated messages.",
      "Make sure callers are told about AI answering and call recording, and agree the recording and retention settings with us in writing.",
      "Register with the ICO and pay the data protection fee if the law requires you to.",
      "Comply with the Privacy and Electronic Communications Regulations for any marketing emails, texts or calls sent from systems we build, including consent and Telephone Preference Service rules.",
      "Give us only the access and data needed, tell us promptly when someone leaves your business, and keep your own accounts secure.",
      "Tell us if you receive a data subject request, complaint or breach that involves a system we built.",
    ],
  },
  {
    title: "Children",
    paragraphs: ["Our services are for businesses. We do not knowingly collect personal data from anyone under 16 for our own purposes. If a child’s data reaches us through a client’s system, for example a family booking, we process it only on the client’s instructions. If you think a child has given us data directly, email hello@buildrweb.com and we will delete it."],
  },
  {
    title: "Your Rights Under UK GDPR",
    paragraphs: ["You have the following rights over personal data we control, free of charge:"],
    bullets: [
      "Access: ask for a copy of the personal data we hold about you.",
      "Rectification: ask us to correct data that is inaccurate or incomplete.",
      "Erasure: ask us to delete your data where there is no overriding reason to keep it.",
      "Restriction: ask us to pause using your data in certain circumstances.",
      "Objection: object to processing based on legitimate interests, including outreach, and we will stop unless we have compelling lawful grounds. You can object to direct marketing at any time and we will always stop.",
      "Portability: ask for data you gave us, held electronically, in a structured, commonly used format.",
      "Withdraw consent: where we rely on consent, you can withdraw it at any time.",
      "Automated decisions: ask for a person to review an outcome where a decision about you was made by automated means.",
      "Complain: tell us first, or go directly to the ICO (see section 23).",
    ],
    closing: ["To exercise a right, email hello@buildrweb.com. We will confirm receipt, verify your identity where necessary, and respond within one month. Requests are free, although we may refuse or charge for one that is manifestly unfounded or excessive. If your request concerns a client’s voice agent, website or automation, we will refer you to that client as the controller."],
  },
  {
    title: "Data Breaches",
    paragraphs: ["We keep a record of every personal data breach. If a breach affects personal data we control and is likely to result in a risk to people’s rights, we will report it to the ICO within 72 hours of becoming aware, and tell affected people without undue delay where the risk is high. If a breach affects a client’s data, we will tell the client without undue delay so it can meet its own duties."],
  },
  {
    title: "Complaints and the ICO",
    paragraphs: [
      "We would always rather fix a concern directly. Please contact hello@buildrweb.com first and we will work with you to put things right.",
      "You also have the right to complain to the Information Commissioner’s Office, the UK’s data protection authority:",
    ],
    bullets: ["Website: https://ico.org.uk/make-a-complaint", "Phone: 0303 123 1113", "Post: Information Commissioner’s Office, Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF"],
  },
  {
    title: "Changes to This Policy",
    paragraphs: ["We may update this policy as our services, tools or legal obligations change, for example when we add a new app or provider. The “last updated” date at the top of this page always shows the current version, and material changes will be highlighted here. Earlier versions are available on request."],
  },
  {
    title: "Contacting Us",
    paragraphs: ["For any question about this policy, your data, or to exercise your rights, contact us:"],
    bullets: ["Email: hello@buildrweb.com", "Phone: +44 7916 999893", "Web: https://buildrweb.com"],
    closing: ["Because we are a remote business, all contact and service delivery is handled digitally. We do not accept postal visitors at any premises, and the postal address above is the Information Commissioner’s Office’s address, for contacting the regulator only."],
  },
];
