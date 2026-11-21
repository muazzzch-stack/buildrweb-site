import { CalendarCheck, GitBranch, Hourglass, Mail, Sparkles, Table2, Webhook, type LucideIcon } from "lucide-react";

/**
 * Custom automation diagrams, redrawn from the original Activepieces flows.
 * Every diagram shares one canvas (W x H), one node size and one set of lanes, so the three cards
 * are identical in size and symmetrical around the centre line.
 * Animation hooks (used by Automations.tsx):  [data-fn] node, [data-fe] edge, [data-fp] pill, data-ord = reveal order.
 */
export type FlowKind = "dental" | "restaurant" | "realestate";

const W = 520;
const H = 672;
const CX = W / 2;
const NH = 50; // node height
const MW = 240; // main-column node width
const BW = 156; // branch node width
const LANES = [90, 260, 430] as const;
const R = 12; // corner radius for bus lines

type IconKey = "webhook" | "sheet" | "mail" | "wait" | "router" | "ai" | "calendar";
const ICONS: Record<IconKey, LucideIcon> = { webhook: Webhook, sheet: Table2, mail: Mail, wait: Hourglass, router: GitBranch, ai: Sparkles, calendar: CalendarCheck };

type Node = { x: number; y: number; w: number; title: string; app: string; step: string; icon: IconKey; ord: number; trigger?: boolean };
type Edge = { d: string; arrow?: string; ord: number };
type Pill = { x: number; y: number; label: string; ord: number };
type Flow = { nodes: Node[]; edges: Edge[]; pills: Pill[]; end: { y: number; ord: number } };

const arrow = (x: number, y: number) => `M ${x - 4.5} ${y - 6} L ${x} ${y} L ${x + 4.5} ${y - 6}`;
const down = (x: number, y1: number, y2: number, ord: number, head = true): Edge => ({ d: `M ${x} ${y1} V ${y2}`, ...(head ? { arrow: arrow(x, y2) } : {}), ord });
const END_Y = 618;

/** bus line: from a source point out to a lane, with rounded corners. */
function fan(fromX: number, fromY: number, busY: number, laneX: number, toY: number, ord: number): Edge {
  if (laneX === fromX) return down(fromX, fromY, toY, ord, false);
  const s = laneX < fromX ? -1 : 1;
  return { d: `M ${fromX} ${fromY} V ${busY - R} Q ${fromX} ${busY} ${fromX + s * R} ${busY} H ${laneX - s * R} Q ${laneX} ${busY} ${laneX} ${busY + R} V ${toY}`, ord };
}
/** merge line: from a lane back into the centre, down to the End node. */
function merge(laneX: number, fromY: number, mergeY: number, ord: number): Edge {
  if (laneX === CX) return { d: `M ${CX} ${fromY} V ${END_Y}`, ord };
  const s = laneX < CX ? 1 : -1;
  return { d: `M ${laneX} ${fromY} V ${mergeY - R} Q ${laneX} ${mergeY} ${laneX + s * R} ${mergeY} H ${CX - s * R} Q ${CX} ${mergeY} ${CX} ${mergeY + R} V ${END_Y}`, ord };
}

const main = (title: string, app: string, step: string, icon: IconKey, y: number, ord: number, trigger = false): Node => ({ x: CX, y, w: MW, title, app, step, icon, ord, ...(trigger ? { trigger } : {}) });
const branch = (lane: number, title: string, app: string, step: string, icon: IconKey, y: number, ord: number): Node => ({ x: lane, y, w: BW, title, app, step, icon, ord });
const ROWS = [40, 132, 224, 316, 408, 500];

function build(kind: FlowKind): Flow {
  if (kind === "dental") {
    const nodes = [
      main("Catch Webhook", "WEBHOOK", "01", "webhook", ROWS[0]!, 0, true),
      main("Save Patient Booking", "GOOGLE SHEETS", "02", "sheet", ROWS[1]!, 2),
      main("Send Confirmation", "GMAIL", "03", "mail", ROWS[2]!, 4),
      main("Alert Dentist", "GMAIL", "04", "mail", ROWS[3]!, 6),
      main("Wait 1 Day", "DELAY", "05", "wait", ROWS[4]!, 8),
      main("Send Reminder", "GMAIL", "06", "mail", ROWS[5]!, 10),
    ];
    const edges = ROWS.slice(0, -1).map((y, i) => down(CX, y + NH, ROWS[i + 1]!, i * 2 + 1));
    edges.push(down(CX, ROWS[5]! + NH, END_Y, 11));
    return { nodes, edges, pills: [], end: { y: END_Y, ord: 12 } };
  }

  const common: Node[] = [main("Catch Webhook", "WEBHOOK", "01", "webhook", ROWS[0]!, 0, true)];
  const edges: Edge[] = [down(CX, ROWS[0]! + NH, ROWS[1]!, 1), down(CX, ROWS[1]! + NH, ROWS[2]!, 3), down(CX, ROWS[2]! + NH, ROWS[3]!, 5)];
  const BUS = 392;
  const PILL_Y = 406;
  const PILL_H = 22;
  const ROUTER_BOTTOM = ROWS[3]! + NH;

  if (kind === "restaurant") {
    common.push(main("Save Booking", "GOOGLE SHEETS", "02", "sheet", ROWS[1]!, 2), main("Send Confirmation", "GMAIL", "03", "mail", ROWS[2]!, 4), main("Router", "ROUTER", "04", "router", ROWS[3]!, 6));
    const BT = 476;
    const labels = ["Allergy Alert", "Large Group", "Special Occasion"];
    const titles = ["Alert Chef", "Alert Events", "Notify Host"];
    const pills: Pill[] = [];
    const nodes = [...common];
    LANES.forEach((lane, i) => {
      edges.push(fan(CX, ROUTER_BOTTOM, BUS, lane, PILL_Y, 7));
      pills.push({ x: lane, y: PILL_Y, label: labels[i]!, ord: 8 });
      edges.push(down(lane, PILL_Y + PILL_H, BT, 9));
      nodes.push(branch(lane, titles[i]!, "GMAIL", String(5 + i).padStart(2, "0"), "mail", BT, 10));
      edges.push(merge(lane, BT + NH, 598, 11));
    });
    return { nodes, edges, pills, end: { y: END_Y, ord: 12 } };
  }

  // real estate
  common.push(main("Score Lead with AI", "AI", "02", "ai", ROWS[1]!, 2), main("Log Lead to Sheet", "GOOGLE SHEETS", "03", "sheet", ROWS[2]!, 4), main("Branch", "ROUTER", "04", "router", ROWS[3]!, 6));
  const nodes = [...common];
  const pills: Pill[] = [];
  const B1 = 452;
  const B2 = 526;
  const labels = ["HOT Lead", "WARM Lead", "COLD Lead"];
  const lanes: { first: Node; second?: Node }[] = [
    { first: branch(LANES[0], "Alert Agent", "GMAIL", "05", "mail", B1, 10), second: branch(LANES[0], "Book Viewing", "CALENDAR", "06", "calendar", B2, 12) },
    { first: branch(LANES[1], "Wait 1 Day", "DELAY", "07", "wait", B1, 10), second: branch(LANES[1], "Nurture Email", "GMAIL", "08", "mail", B2, 12) },
    { first: branch(LANES[2], "Thank You", "GMAIL", "09", "mail", B1, 10) },
  ];
  lanes.forEach(({ first, second }, i) => {
    const lane = LANES[i]!;
    edges.push(fan(CX, ROUTER_BOTTOM, BUS, lane, PILL_Y, 7));
    pills.push({ x: lane, y: PILL_Y, label: labels[i]!, ord: 8 });
    edges.push(down(lane, PILL_Y + PILL_H, B1, 9));
    nodes.push(first);
    if (second) { edges.push(down(lane, B1 + NH, B2, 11)); nodes.push(second); }
    edges.push(merge(lane, (second ? B2 : B1) + NH, 598, 13));
  });
  return { nodes, edges, pills, end: { y: END_Y, ord: 14 } };
}

const FLOWS: Record<FlowKind, Flow> = { dental: build("dental"), restaurant: build("restaurant"), realestate: build("realestate") };
export const FLOW_ASPECT = `${W} / ${H}`;

const display = { fontFamily: "var(--font-display)" } as const;
const mono = { fontFamily: "var(--font-mono)" } as const;

export function FlowDiagram({ kind, label, live = false, className = "" }: { kind: FlowKind; label: string; live?: boolean; className?: string }) {
  const flow = FLOWS[kind];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} className={className} data-flow-svg data-live={live ? "true" : "false"} preserveAspectRatio="xMidYMid meet" style={{ display: "block", overflow: "visible" }}>
      <title>{label}</title>
      {/* connectors first so nodes sit on top */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {flow.edges.map((edge, i) => (
          <path key={`e${i}`} data-fe data-ord={edge.ord} d={edge.d + (edge.arrow ? ` ${edge.arrow}` : "")} pathLength={1} strokeDasharray="1" strokeWidth={1.4} style={{ stroke: "var(--color-faint)", opacity: 0.7 }} />
        ))}
        {flow.edges.map((edge, i) => (
          <path key={`p${i}`} className="flow-pulse" d={edge.d} pathLength={1} strokeDasharray="0.06 0.94" strokeWidth={2} style={{ stroke: "var(--color-primary)", animationDelay: `${(edge.ord % 7) * 0.32}s` }} />
        ))}
      </g>

      {flow.pills.map((pill) => {
        const w = pill.label.length * 7.2 + 22;
        return (
          <g key={pill.label} data-fp data-ord={pill.ord}>
            <rect x={pill.x - w / 2} y={pill.y} width={w} height={22} fill="rgba(240,106,34,.10)" strokeWidth={1} style={{ stroke: "var(--color-primary)" }} />
            <text x={pill.x} y={pill.y + 15} textAnchor="middle" fontSize={11} letterSpacing={1} style={{ ...mono, fill: "var(--color-primary)", textTransform: "uppercase" }}>{pill.label}</text>
          </g>
        );
      })}

      {flow.nodes.map((node) => {
        const Icon = ICONS[node.icon];
        const left = node.x - node.w / 2;
        return (
          <g key={`${node.step}-${node.title}`} data-fn data-ord={node.ord}>
            {node.trigger ? (
              <g>
                <rect x={left} y={node.y - 19} width={82} height={19} strokeWidth={1} style={{ fill: "var(--color-card)", stroke: "var(--color-border)" }} />
                <circle cx={left + 11} cy={node.y - 9.5} r={2.4} style={{ fill: "var(--color-primary)" }} />
                <text x={left + 20} y={node.y - 6} fontSize={10} letterSpacing={1.1} style={{ ...mono, fill: "var(--color-muted-foreground)" }}>TRIGGER</text>
              </g>
            ) : null}
            <rect x={left} y={node.y} width={node.w} height={NH} strokeWidth={1} style={{ fill: "var(--color-card)", stroke: node.trigger ? "var(--color-primary)" : "var(--color-border)" }} />
            <rect x={left} y={node.y} width={2} height={NH} style={{ fill: "var(--color-primary)" }} />
            <rect x={left + 10} y={node.y + 11} width={28} height={28} fill="rgba(240,106,34,.10)" strokeWidth={1} style={{ stroke: "rgba(240,106,34,.45)" }} />
            <Icon x={left + 17} y={node.y + 18} width={14} height={14} strokeWidth={1.7} color="#f06a22" />
            <text x={left + 47} y={node.y + 22} fontSize={14.5} style={{ ...display, fill: "var(--color-foreground)", fontWeight: 500 }}>{node.title}</text>
            <text x={left + 47} y={node.y + 38} fontSize={10.5} letterSpacing={0.5} style={{ ...mono, fill: "var(--color-faint)" }}>{node.step} · {node.app}</text>
          </g>
        );
      })}

      <g data-fn data-ord={flow.end.ord}>
        <rect x={CX - 32} y={flow.end.y} width={64} height={24} strokeWidth={1} style={{ fill: "var(--color-card)", stroke: "var(--color-primary)" }} />
        <text x={CX} y={flow.end.y + 16} textAnchor="middle" fontSize={10} letterSpacing={2} style={{ ...mono, fill: "var(--color-primary)" }}>END</text>
      </g>
    </svg>
  );
}
