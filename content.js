/* ============================================================================
 * content.js — every piece of editable prose on the page
 * ----------------------------------------------------------------------------
 * This file is the page's words, and nothing else. Tags, classes, link
 * targets, dates and glyphs live in index.html, where each slot is an empty
 * element carrying data-t="<key>"; the renderer there fills the slots from
 * this object. Rewording a string here can therefore never break the layout,
 * the design figure or a link.
 *
 * Keys are grouped by section. Inline <b> / <span> markup inside a value is
 * fine where the original had it; do not put an href in one - links stay in
 * index.html, where tools/verify_release.py checks them.
 *
 * Not here, on purpose: navigation labels and view tabs (bound to section and
 * view ids), labels inside the design figure (positioned by the drawing code),
 * the live demo's copy (a matched set - see DEPLOY.md), download-card
 * subtitles and the checksum note (owned by tools/make_downloads.py), chart
 * axis and legend labels (tied to the plotted data), and the footer (licence,
 * checksum, repository link).
 *
 * This file is required: without it the prose slots stay empty.
 * ========================================================================== */
window.T = {
  /* ---- the hero line under the wordmark ---- */
  hero: {sub: "A hash function submitted to the Next-generation Commercial Cryptographic Algorithms programme (NGCC), China"},
  /* ---- §1 Introduction — lead and the specification-updates list ---- */
  intro: {
    lead: "FEILIAN is a candidate submitted to the Next-generation Commercial Cryptographic Algorithms programme (NGCC-CH): a tweakable ARX permutation in Davies–Meyer mode over a 1024-bit state and message block. The three digest lengths share that state, keeping a different amount of output, so one core serves the whole family.",
    updh: "Specification updates",
    upd1: {a: "Specification <b>v1.0.1</b> (69&nbsp;pp.) issued with a three-page erratum &mdash; the corrections of Tables&nbsp;1&ndash;2 and five further passages made after the assessments; published as", link: "release package v1.0.1", b: "."},
    upd2: {a: "Original submission <b>v1.0</b> (68&nbsp;pp.), the revision examined by the assessments; published as", link: "release package v1.0", b: "."},
  },
  /* ---- §3 Documents — lead and the submission's revision timeline ---- */
  docs: {lead: "Both revisions are published as release packages, byte-for-byte as distributed, with their SHA-256. <b>Version 1.0.1</b> (8 October 2026) supersedes <b>version 1.0</b> (30 June 2026), the original submission examined by the third-party assessment.", tl1: "<b>Specification v1.0.1</b> (69 pp.) and the three-page <b>erratum</b>, released together. The erratum lists the corrections of its Tables 1&ndash;2 and five further text changes made in response to the assessments.", tl2: "<b>Original submission v1.0</b> (68 pp.) — the revision examined by the third-party assessment."},
  /* ---- §4 Performance — lead and the table and figure captions ---- */
  perf: {lead: "What the family costs. Everything below is reproduced from the specification; nothing here was measured locally. In cycles per byte FEILIAN-1024 settles level with SHA-512 on long messages, ahead of SHA-3-512 and behind BLAKE-64.", cap1: "Cycles per byte.", cap2: "The same core, synthesised to hardware &mdash; throughput by architecture.", cap3: "Back in software: cycles per byte against the other 512-bit-class hashes, across message lengths."},
  /* ---- §5 Third-party analysis — lead and the three review cards ---- */
  analysis: {
    lead: "Three independent sources have analysed this submission. Their documents are published by their authors, so this page links to them rather than restating their findings; none establishes a full-round break of the correctly encoded software hash.",
    c1: {h3: "Mounir Idrassi &mdash; technical assessment", who: "Technical assessment of the submitted specification and implementations &middot; v1.0.2 &middot; 27 September 2026 &middot; 14 pp. &middot; AM Crypto, Japan &middot; CC BY 4.0", link: "github.com/amcrypto-jp/feilian-cryptanalysis &rarr;"},
    c2: {h3: "Markku-Juhani O. Saarinen &mdash; ngcc.dev", who: "Personal report on ngcc.dev &middot; entries dated 23 &amp; 26 September 2026 &middot; unaffiliated with NICCS", link: "ngcc.dev &rarr;"},
    c3: {h3: "Mounir Idrassi &mdash; ePrint 2026/2236", who: "Component-level analysis &middot; Cryptology ePrint Archive, Report 2026/2236 &middot; submitted 27 September 2026, approved 28 September &middot; CC BY 4.0", link: "eprint.iacr.org/2026/2236 &rarr;"},
  },
  /* ---- the design figure's four view captions ---- */
  fig: {v0: "FEILIAN: the padded message is split into 1024-bit blocks and each block meets one compression call; the tweak <span class=\"mono\">tw</span> &#8212; the block counter and, on the last block, the message length &#8212; enters every call.", v1: "the compress function. The same 1024-bit block <span class=\"mono\">m</span> is absorbed by all five phases; the tweak <span class=\"mono\">tw</span> enters every round; the feed-forward XORs the incoming chaining value into the result, so <span class=\"mono\">h&#8242; = h &#8853; v&#8325;</span>.", v2: "one phase <span class=\"mono\">P(v, m)</span> &#8212; the absorbing round <span class=\"mono\">R&#770;<sup>&#8853;</sup></span> takes the message in, three plain rounds <span class=\"mono\">R</span> follow. The walk lights round 1 and opens it up below; it then lights round 2 and opens a plain round <span class=\"mono\">R</span> in the same place &#8212; the same five steps, no message. Five phases chain into the compression function &#8212; 20 rounds in all.", v3: "SubColumn: two tweakable ARX S-boxes stacked. <span class=\"mono\">S&#771;&#8321;</span> is driven by <span class=\"mono\">s&#8321; = a&#8320;&#8242;</span>, <span class=\"mono\">S&#771;&#8320;</span> by <span class=\"mono\">s&#8320; = a&#8321; + b&#8321;</span>. Both tweaks are derived inside SubColumn &#8212; no external value enters."},
};
