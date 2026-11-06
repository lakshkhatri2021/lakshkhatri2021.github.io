// ============================================================
// CONTENT
// Edit the text in this section to update the site.
// ============================================================

const GITHUB = "https://github.com/lakshkhatri2021";
const WRITEUPS = GITHUB + "/security-writeups";

const projects = [
  {
    id: "honeytrap",
    type: "Defensive · Detection",
    title: "HoneyTrap",
    subtitle: "Honeytoken-based deception and detection platform",
    summary: "Plants realistic-looking fake credentials across a system, then logs, scores and alerts the moment anyone touches them.",
    tags: ["Detection", "Deception", "FastAPI", "Docker"],
    what: "A backend security platform that generates bait (a leaked-looking .env file, a fake API key and a planted database row), then detects, scores and alerts on any interaction with it. It covers the full deception lifecycle: generate the bait, plant it, catch the trigger, score it and support the investigation.",
    why: "A honeytoken is something no legitimate user ever has a reason to touch, so any interaction with one is a high-confidence sign of an intruder or insider, with almost no false positives. The aim was to build the detection side of an attack end to end, not just the attack itself.",
    objective: "Build one working system that shows an attacker exploiting a vulnerability, stealing planted bait without realising it, and getting caught the moment they use it.",
    tools: ["Python", "FastAPI", "SQLAlchemy", "Pydantic", "SQLite", "Streamlit", "Docker", "pytest", "Discord webhooks"],
    did: [
      "Built generators for three bait types: a fake .env file with database credentials, a fake API key, and a honeytoken account hidden inside user data.",
      "Disguised each trigger URL to match its cover story (a fake account recovery link looks like an account recovery route), because an obvious /trigger/ path would tip off an attacker.",
      "Stored tokens and trigger events in separate tables, so repeated use of the same stolen credential is kept for investigation instead of collapsing into a single flag.",
      "Wrote severity scoring that escalates when the same token is used repeatedly, since one hit can be incidental but several mean active exploitation.",
      "Added real-time Discord alerts, a live Streamlit dashboard and an investigation API for querying events.",
      "Containerised the platform with Docker and covered the core detection and API behaviour with pytest.",
      "Built a deliberately vulnerable SQL injection endpoint (in the spirit of DVWA) to demonstrate a realistic attacker path that ends in detection."
    ],
    skills: ["Detection engineering", "Deception design", "API design", "Alerting pipelines", "Data modelling", "Containerisation", "Automated testing"],
    outcome: "A working end-to-end demo. Exploiting the vulnerable search endpoint dumps the user table, including a planted admin account with a fake recovery link. Visiting that link logs a security event, escalates severity on repeat access and fires a Discord alert in real time, all visible on the live dashboard.",
    relevance: "Real defensive teams use deception (canary tokens, honey accounts in Active Directory) because it catches attackers who have already got past perimeter controls. It's one of the few detection methods where an alert almost always means something real.",
    evidence: [
      { label: "GitHub repository", url: GITHUB + "/honeytrap" }
    ]
  },
  {
    id: "recon",
    type: "Offensive · Recon",
    title: "Attack Surface Recon Tool",
    subtitle: "Automated external recon pipeline, developed during my Visit Health internship",
    summary: "Give it a domain and it maps subdomains, live hosts, open ports, TLS, lookalike domains, email security and known vulnerabilities in one run.",
    tags: ["Recon", "Python", "nuclei", "ffuf"],
    what: "A Python tool that chains eight open-source recon tools into a single pipeline and writes a timestamped, stage-by-stage report with a summary at the end.",
    why: "Mapping an organisation's external exposure by hand means running and stitching together many separate tools. Automating it makes the process repeatable and gives one report to act on.",
    objective: "Turn an existing recon script into a reliable tool, then validate it against a target that explicitly permits scanning and write up what it found.",
    tools: ["Python", "subfinder", "httpx", "naabu", "tlsx", "dnstwist", "checkdmarc", "nuclei", "ffuf"],
    did: [
      "Rewrote the original script: removed a hardcoded local path and wrapped every stage in its own error handling, so one failing tool no longer stops the whole run.",
      "Fixed a shell-injection issue in how subdomain lists were passed to httpx and nuclei.",
      "Extended port scanning to cover discovered subdomains, not just the root domain.",
      "Added ffuf as an eighth stage for directory and file discovery.",
      "Ran the pipeline against scanme.nmap.org, the Nmap project's public test host, verified the results by hand and wrote up every finding with recommended fixes."
    ],
    skills: ["Attack surface mapping", "Vulnerability triage", "Email security (SPF, DMARC)", "Secure scripting", "Technical reporting"],
    outcome: "Findings included CVE-2023-48795 (Terrapin) on an outdated OpenSSH, weak SSH ciphers and key exchange, an outdated Apache version, missing security headers and no SPF or DMARC records. I checked each ffuf hit manually and confirmed the 403 responses meant protected files, not exposed ones.",
    relevance: "External attack surface mapping is where both attackers and security teams start, because you can't protect what you don't know is exposed. Missing SPF and DMARC alone lets anyone spoof email from a domain.",
    note: "scanme.nmap.org is provided by the Nmap project for scan testing. The tool should only be run against domains you own or have permission to test.",
    evidence: [
      { label: "GitHub repository", url: GITHUB + "/recon-tool" },
      { label: "Write-up", url: WRITEUPS + "/blob/main/internship/recon-tool.md" },
      { label: "Sample report", url: GITHUB + "/recon-tool/blob/main/scanme.nmap.org_report.txt" }
    ]
  },
  {
    id: "insider",
    type: "Defensive · SOC",
    title: "Insider Threat Detection Simulator",
    subtitle: "Rule-based, SIEM-style detection of suspicious internal user behaviour",
    summary: "Generates simulated activity logs, runs detection rules over them and outputs severity-rated alerts the way a SOC tool would.",
    tags: ["SOC", "Detection rules", "Python", "Streamlit"],
    what: "A lightweight monitoring tool that ingests user activity logs, applies detection rules for suspicious insider behaviour, rates each alert by severity and writes the results out in formats a SOC team could use.",
    why: "Insider threats are hard to catch because the user already has legitimate access. Building the pipeline from scratch was a way to understand how a SIEM actually turns raw logs into alerts: ingestion, correlation, rules and severity.",
    objective: "Build the full flow from log generation to alert output, with rules that are configurable instead of hardcoded.",
    tools: ["Python", "Pandas", "Streamlit", "JSON config", "CSV"],
    did: [
      "Wrote a log generator that creates simulated user activity (users, roles, actions, resources, timestamps) and deliberately injects suspicious behaviour to detect.",
      "Built a detection engine with three rules: access outside working hours, excessive activity that could indicate data exfiltration, and resource access not permitted for the user's role.",
      "Moved working hours, activity thresholds and role permissions into a config file, so rules can be tuned without touching the code.",
      "Classified every alert as high, medium or low severity, with colour-coded terminal output.",
      "Produced three outputs: a readable alert log for investigation, a CSV for tools like Excel, Power BI or Grafana, and a JSON summary of totals and flagged users.",
      "Added an optional Streamlit dashboard with severity charts, summary metrics and an incident table."
    ],
    skills: ["Log analysis", "Detection rule design", "Alert triage", "SOC workflows", "Data handling with Pandas"],
    outcome: "A working detector that catches all three behaviours in the sample data, for example an intern account opening payroll.zip at 02:47, which triggers a high severity role violation. A sample run produced five alerts across two flagged users.",
    relevance: "This is the same logic behind user behaviour analytics in commercial SIEMs like Splunk and Microsoft Sentinel. Understanding how rules, thresholds and severity interact is what lets an analyst tune out noise without missing real incidents.",
    evidence: [
      { label: "GitHub repository", url: GITHUB + "/insider-threat-detection-simulator" }
    ]
  },
  {
    id: "vps",
    type: "Infrastructure · OPSEC",
    title: "Recon From a Cloud VPS",
    subtitle: "Running the recon pipeline on resource-constrained AWS infrastructure",
    summary: "Deploying the full toolchain on a free-tier AWS server, and diagnosing the disk and memory failures that came with it.",
    tags: ["AWS EC2", "Linux", "Troubleshooting"],
    what: "Deploying the recon toolchain on a free-tier AWS EC2 instance in the London region, so all scan traffic came from the server's IP rather than my own network.",
    why: "Part of the OPSEC fundamentals covered during my internship: keeping testing traffic separate from personal infrastructure.",
    objective: "Get the full toolchain installed and running natively on the smallest free-tier instance available.",
    tools: ["AWS EC2", "EBS", "Ubuntu", "Go toolchain", "growpart", "resize2fs", "Linux swap"],
    did: [
      "Diagnosed a silent build failure: compiling five Go tools from source filled the 8 GB root disk to 92%, and a separate /tmp partition hit its own limit with a different error message.",
      "Cleared the Go build cache as a stopgap, then resized the EBS volume to 20 GB and extended the filesystem with growpart and resize2fs.",
      "Traced the next failure (signal: killed) to the kernel's out-of-memory killer on a roughly 900 MB instance, and added swap, increasing it from 512 MB to 2 GB.",
      "Switched strategy to prebuilt release binaries, which removed both failure modes at once.",
      "Scoped nuclei to critical and high severity templates so scans could finish on a single CPU."
    ],
    skills: ["Linux troubleshooting", "Cloud infrastructure", "Root cause analysis", "OPSEC fundamentals"],
    outcome: "The full pipeline ran natively from the VPS. The main lesson was that the same \"ran out of room\" error had two different root causes depending on where it appeared, so finding the real bottleneck mattered more than any single fix.",
    relevance: "Security work often runs on remote, limited infrastructure, from jump boxes to cloud scanners. Diagnosing disk, memory and compute limits quickly is a practical skill on any operations or testing team.",
    evidence: [
      { label: "Write-up", url: WRITEUPS + "/blob/main/internship/recon-tool.md#part-2-running-the-pipeline-from-a-foreign-vps" }
    ]
  },
  {
    id: "sqli",
    type: "Offensive · Web security",
    title: "SQL Injection Lab Series",
    subtitle: "Every SQL injection lab on PortSwigger's Web Security Academy",
    summary: "From basic WHERE clause bypasses to blind, time-based, out-of-band and filter-bypass injection, with a write-up for each.",
    tags: ["Web security", "SQLi", "Burp Suite"],
    what: "Fourteen write-ups covering all 15 labs in PortSwigger's SQL injection topic, each showing the vulnerable query, the payload, why it works and what went wrong along the way.",
    why: "SQL injection is still one of the most damaging web vulnerabilities. Working through every variant shows how the technique has to adapt as the application gives less and less feedback.",
    objective: "Complete the full topic and document each lab clearly enough that someone else could follow the reasoning, not just copy the payload.",
    tools: ["Burp Suite (Proxy, Repeater, Intruder)", "SQL", "URL and XML encoding"],
    did: [
      "Retrieved hidden data and bypassed a login by breaking out of the WHERE clause.",
      "Used UNION attacks to find column counts and text columns, fingerprint the database version and enumerate the full schema.",
      "Extracted an administrator password through blind injection using conditional responses, conditional errors and time delays.",
      "Bypassed a filter by encoding the payload as XML entities.",
      "Documented real problems along the way, such as Burp Community throttling Intruder and an expired session turning every response into a 302."
    ],
    skills: ["Web application testing", "SQL", "Burp Suite", "Blind exploitation", "Technical writing"],
    outcome: "Completed the full SQL injection topic, with every lab written up in a public repository.",
    relevance: "Knowing each injection variant is what lets a tester confirm a finding, and lets a developer see why parameterised queries are the real fix rather than input filtering.",
    evidence: [
      { label: "Write-ups", url: WRITEUPS + "/tree/main/sql-injection" }
    ]
  }
];

const learning = [
  {
    platform: "TryHackMe",
    title: "Rooms and learning paths",
    items: ["Ranked in the top 15% of TryHackMe users", "Pre Security learning path (networking, web, Linux, Windows, cryptography)", "Active Directory Basics"],
    links: [
      { label: "TryHackMe profile", url: "https://tryhackme.com/p/lakshkhatri2021" },
      { label: "Pre Security write-up", url: WRITEUPS + "/blob/main/THM/pre-security.md" }
    ]
  },
  {
    platform: "PortSwigger Web Security Academy",
    title: "SQL injection topic, all 15 labs",
    items: ["UNION-based, error-based and blind injection", "Time-based and out-of-band techniques", "Filter bypass with XML encoding"],
    links: [
      { label: "Write-ups", url: WRITEUPS + "/tree/main/sql-injection" }
    ]
  },
  {
    platform: "Forage",
    title: "Cybersecurity job simulations",
    items: ["Deloitte Australia cybersecurity job simulation", "Mastercard cybersecurity job simulation", "PwC cybersecurity consulting job simulation"],
    links: []
  },
  {
    platform: "AWS Academy",
    title: "Cloud Foundations",
    items: ["20-hour training course, badge issued October 2026", "Core AWS services, security and the shared responsibility model"],
    links: []
  }
];

const certifications = [
  {
    badge: "Sec+",
    name: "CompTIA Security+ (SY0-701)",
    meta: "Passed September 2026 · Valid until September 2029",
    link: { label: "Verify on Credly", url: "https://www.credly.com/badges/a1a08fb2-6f64-49ee-9de6-7d901639a7b9" },
    why: "A broad, vendor-neutral foundation across the whole field, from attacks and vulnerabilities to architecture, operations and governance.",
    areas: ["General security concepts", "Threats and mitigations", "Security architecture", "Security operations", "Program management and GRC"]
  },
  {
    badge: "Cisco",
    name: "Introduction to Cybersecurity, Cisco Networking Academy",
    meta: "Completed January 2026",
    why: "My first structured course in the field, covering the basics before moving on to hands-on labs.",
    areas: ["Threats and attacks", "Protecting data and devices", "Network security basics", "Careers in cybersecurity"]
  }
];

// ============================================================
// RENDERING (no need to edit below this line)
// ============================================================

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function tagList(items, neutral) {
  return '<div class="tags">' + items.map(t => '<span class="tag' + (neutral ? " neutral" : "") + '">' + t + "</span>").join("") + "</div>";
}

function linkButton(item) {
  return '<a class="btn" href="' + item.url + '" target="_blank" rel="noopener">' + item.label + " ↗</a>";
}

// Project cards
const grid = document.getElementById("project-grid");
projects.forEach(p => {
  const card = el("button", "project-card reveal");
  card.type = "button";
  card.setAttribute("aria-label", "Open details for " + p.title);
  card.innerHTML =
    '<div class="card-top"><span class="card-type">' + p.type + '</span><span class="card-arrow">→</span></div>' +
    "<h3>" + p.title + "</h3>" +
    '<p class="card-subtitle">' + p.subtitle + "</p>" +
    '<p class="card-summary">' + p.summary + "</p>" +
    tagList(p.tags);
  card.addEventListener("click", () => openProject(p.id, card));
  grid.appendChild(card);
});

// Learning cards
const learningGrid = document.getElementById("learning-grid");
learning.forEach(l => {
  const card = el("div", "learning-card reveal");
  card.innerHTML =
    '<span class="platform">' + l.platform + "</span>" +
    "<h3>" + l.title + "</h3>" +
    "<ul>" + l.items.map(i => "<li>" + i + "</li>").join("") + "</ul>" +
    (l.links.length
      ? '<div class="link-row">' + l.links.map(k => '<a class="text-link" href="' + k.url + '" target="_blank" rel="noopener">' + k.label + " ↗</a>").join("") + "</div>"
      : "");
  learningGrid.appendChild(card);
});

// Certifications
const certList = document.getElementById("cert-list");
certifications.forEach(c => {
  const card = el("div", "cert reveal");
  card.innerHTML =
    '<div class="cert-badge">' + c.badge + "</div>" +
    "<div>" +
      "<h3>" + c.name + "</h3>" +
      '<p class="cert-meta">' + c.meta + "</p>" +
      "<p>" + c.why + "</p>" +
      tagList(c.areas, true) +
      (c.link ? '<p class="cert-link"><a class="text-link" href="' + c.link.url + '" target="_blank" rel="noopener">' + c.link.label + " ↗</a></p>" : "") +
    "</div>";
  certList.appendChild(card);
});

// Project detail view
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const modalPanel = modal.querySelector(".modal-panel");
let lastFocused = null;

function block(title, body) {
  return '<div class="detail-block"><h4>' + title + "</h4>" + body + "</div>";
}

function openProject(id, trigger) {
  const p = projects.find(x => x.id === id);
  if (!p) return;
  lastFocused = trigger || null;

  modalContent.innerHTML =
    '<div class="detail-head">' +
      '<span class="card-type">' + p.type + "</span>" +
      '<h2 id="modal-title">' + p.title + "</h2>" +
      '<p class="card-subtitle">' + p.subtitle + "</p>" +
    "</div>" +
    block("What the project is", "<p>" + p.what + "</p>") +
    '<div class="detail-two">' +
      block("Why I did it", "<p>" + p.why + "</p>") +
      block("Objective", "<p>" + p.objective + "</p>") +
    "</div>" +
    block("Tools and technologies", tagList(p.tools, true)) +
    block("What I actually did", "<ol>" + p.did.map(d => "<li>" + d + "</li>").join("") + "</ol>") +
    block("Skills developed", tagList(p.skills)) +
    block("Outcome", "<p>" + p.outcome + "</p>") +
    block("Real-world relevance", "<p>" + p.relevance + "</p>") +
    block("Evidence",
      '<div class="evidence">' + p.evidence.map(linkButton).join("") + "</div>" +
      (p.note ? '<p class="note">' + p.note + "</p>" : ""));

  modal.hidden = false;
  document.body.classList.add("no-scroll");
  modal.scrollTop = 0;
  modalPanel.focus();
  history.replaceState(null, "", "#project-" + id);
}

function closeProject() {
  modal.hidden = true;
  document.body.classList.remove("no-scroll");
  history.replaceState(null, "", window.location.pathname);
  if (lastFocused) lastFocused.focus();
}

modal.addEventListener("click", e => {
  if (e.target.closest("[data-close]")) closeProject();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !modal.hidden) closeProject();
});

// Open a project directly from a shared link, e.g. yoursite/#project-honeytrap
if (window.location.hash.startsWith("#project-")) {
  openProject(window.location.hash.replace("#project-", ""));
}

// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// Fade sections in as they scroll into view
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(node => observer.observe(node));

// Terminal typing effect in the hero
const lines = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: "laksh khatri, cybersecurity student @ VIT Vellore" },
  { type: "cmd", text: "cat focus.txt" },
  { type: "out", text: "web security · attack surface recon · detection" },
  { type: "cmd", text: "ls projects/" },
  { type: "out", text: "honeytrap  recon-tool  insider-threat-sim  sqli-labs" },
  { type: "cmd", text: "ls certs/" },
  { type: "out", text: "comptia-security-plus" }
];

const terminal = document.getElementById("terminal-body");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function showAllLines() {
  terminal.innerHTML = lines.map(l => '<div class="' + l.type + '">' + l.text + "</div>").join("") +
    '<div class="cmd"><span class="cursor"></span></div>';
}

function typeLines(index) {
  if (index >= lines.length) {
    const end = el("div", "cmd");
    end.innerHTML = '<span class="cursor"></span>';
    terminal.appendChild(end);
    return;
  }
  const line = lines[index];
  const row = el("div", line.type);
  terminal.appendChild(row);

  if (line.type === "out") {
    row.textContent = line.text;
    setTimeout(() => typeLines(index + 1), 250);
    return;
  }
  let i = 0;
  const timer = setInterval(() => {
    row.textContent = line.text.slice(0, ++i);
    if (i >= line.text.length) {
      clearInterval(timer);
      setTimeout(() => typeLines(index + 1), 300);
    }
  }, 55);
}

if (reduceMotion) showAllLines();
else setTimeout(() => typeLines(0), 400);

document.getElementById("year").textContent = new Date().getFullYear();
