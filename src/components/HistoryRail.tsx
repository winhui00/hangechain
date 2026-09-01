import { useLayoutEffect, useMemo, useRef, useState } from 'react'

export type HistoryEvent = {
  date: string
  text: string
}

type Laid = {
  event: HistoryEvent
  x: number
  y: number
  side: 'left' | 'right'
  labelX: number
  maxWidth: number
  tickX: number
}

type Pt = { x: number; y: number }

function eventKey(date: string) {
  const m = String(date || '').match(/((?:19|20)\d{2})(?:[./-](\d{1,2}))?(?:[./-](\d{1,2}))?/)
  if (!m) return 0
  return Number(m[1]) * 10000 + Number(m[2] || 0) * 100 + Number(m[3] || 0)
}

function displayDate(date: string) {
  const m = String(date || '').match(/(?:19|20)\d{2}(?:[./-]\d{1,2}){0,2}/)
  return m ? m[0] : date
}

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n))
}

/** Large bends with a small bay on each lobe — explicit knots, not a single sine. */
const RIVER_KNOTS: [number, number][] = [
  [0, 0.14],
  [0.08, 0.88],
  [0.14, 0.52],
  [0.2, 0.78],
  [0.27, 0.02],
  [0.34, -0.9],
  [0.4, -0.5],
  [0.46, -0.8],
  [0.54, 0.1],
  [0.61, 0.9],
  [0.67, 0.46],
  [0.73, 0.76],
  [0.8, -0.1],
  [0.87, -0.88],
  [0.93, -0.48],
  [1, -0.22],
]

function riverOffset(u: number) {
  const k = RIVER_KNOTS
  const t = clamp(u, 0, 1)
  if (t <= k[0][0]) return k[0][1]
  if (t >= k[k.length - 1][0]) return k[k.length - 1][1]
  let i = 1
  while (i < k.length && k[i][0] < t) i += 1
  const p0 = k[Math.max(0, i - 2)]
  const p1 = k[i - 1]
  const p2 = k[i]
  const p3 = k[Math.min(k.length - 1, i + 1)]
  const s = (t - p1[0]) / Math.max(1e-6, p2[0] - p1[0])
  const s2 = s * s
  const s3 = s2 * s
  return (
    0.5 *
    (2 * p1[1] +
      (-p0[1] + p2[1]) * s +
      (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * s2 +
      (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * s3)
  )
}

function riverX(t: number, mid: number, amp: number) {
  return mid + amp * riverOffset(t)
}

function yToT(y: number, h: number) {
  return clamp((y - 8) / Math.max(1, h - 16), 0, 1)
}

/** Inner side of the local bend: the concave pocket, toward the centerline. */
function inwardOf(x: number, mid: number, amp: number, prev: -1 | 1): -1 | 1 {
  if (Math.abs(x - mid) < amp * 0.1) return prev
  return x >= mid ? -1 : 1
}

function evenYs(n: number, fillH: number) {
  const top = 44
  const bot = Math.max(top + 48, fillH - 44)
  if (n <= 1) return [(top + bot) / 2]
  const step = Math.max(48, (bot - top) / (n - 1))
  return Array.from({ length: n }, (_, i) => top + i * step)
}

function smoothPath(pts: Pt[]) {
  if (pts.length === 0) return ''
  if (pts.length === 1) return `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
  if (pts.length === 2) {
    return `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)} L ${pts[1].x.toFixed(1)} ${pts[1].y.toFixed(1)}`
  }
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? { x: pts[0].x, y: pts[0].y - (pts[1].y - pts[0].y) }
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? { x: p2.x, y: p2.y + (p2.y - p1.y) }
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  return d
}

function sampleRiver(h: number, mid: number, amp: number, lo: number, hi: number) {
  const n = 96
  const pts: Pt[] = []
  for (let i = 0; i <= n; i++) {
    const t = i / n
    pts.push({
      x: clamp(riverX(t, mid, amp), lo, hi),
      y: 8 + t * (h - 16),
    })
  }
  return pts
}

function buildRail(w: number, h: number, items: HistoryEvent[]) {
  const pad = 18
  const lo = pad + 8
  const hi = w - pad - 8
  const mid = (lo + hi) / 2
  const amp = Math.max(22, ((hi - lo) / 2) * 0.74)
  const spine = sampleRiver(h, mid, amp, lo, hi)
  const laid: Laid[] = []

  if (!items.length) {
    return { d: smoothPath(spine), laid }
  }

  const ys = evenYs(items.length, h)
  let prev: -1 | 1 = -1
  const sides = ys.map((y) => {
    const s = inwardOf(riverX(yToT(y, h), mid, amp), mid, amp, prev)
    prev = s
    return s
  })
  const gap = 16

  items.forEach((event, i) => {
    const y = ys[i]
    const x = clamp(riverX(yToT(y, h), mid, amp), lo, hi)
    const inward = sides[i]
    const side: 'left' | 'right' = inward < 0 ? 'left' : 'right'
    const labelX = x + inward * gap
    const room =
      inward < 0 ? Math.max(72, x - gap - pad) : Math.max(72, w - pad - (x + gap))
    laid.push({
      event,
      x,
      y,
      side,
      labelX,
      maxWidth: Math.min(168, room),
      tickX: x + inward * 8,
    })
  })

  return { d: smoothPath(spine), laid }
}

export function HistoryRail({ events }: { events: readonly HistoryEvent[] }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [box, setBox] = useState({ w: 280, h: 480 })
  const items = useMemo(
    () =>
      events
        .map((event, i) => ({ event, i }))
        .filter(({ event }) => event.date || event.text)
        .sort((a, b) => {
          const ka = eventKey(a.event.date)
          const kb = eventKey(b.event.date)
          if (ka !== kb) return ka - kb
          return a.i - b.i
        })
        .map(({ event }) => event),
    [events],
  )

  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return
    const measure = () => {
      const next = { w: Math.max(220, el.clientWidth), h: Math.max(240, el.clientHeight) }
      setBox((prev) => (prev.w === next.w && prev.h === next.h ? prev : next))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const { d, laid } = useMemo(() => buildRail(box.w, box.h, items), [box.h, box.w, items])

  return (
    <div
      className="history-rail"
      ref={rootRef}
      aria-label="时间轴"
      style={{ minHeight: Math.max(520, items.length * 54 + 100) }}
    >
      <svg className="history-rail-svg" viewBox={`0 0 ${box.w} ${box.h}`} preserveAspectRatio="none">
        <path d={d} fill="none" className="history-rail-path" />
        {laid.map((node, i) => (
          <g key={`${i}-${node.event.date}-${node.event.text}`}>
            <line className="history-rail-tick" x1={node.x} y1={node.y} x2={node.tickX} y2={node.y} />
            <circle className="history-rail-dot" cx={node.x} cy={node.y} r="3.8" />
          </g>
        ))}
      </svg>
      {laid.map((node, i) => (
        <article
          className={`history-event is-${node.side}`}
          key={`${i}-${node.event.date}-${node.event.text}-card`}
          style={{
            top: node.y,
            left: node.labelX,
            maxWidth: node.maxWidth,
          }}
        >
          {node.event.date ? <p className="history-event-date">{displayDate(node.event.date)}</p> : null}
          {node.event.text ? <p className="history-event-text">{node.event.text}</p> : null}
        </article>
      ))}
    </div>
  )
}
