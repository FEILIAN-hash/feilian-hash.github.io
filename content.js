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
 * the live demo's copy (a matched set - see DEPLOY.md), release-package
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
    updh: "Updates",
    upd1: {a: "Specification <b>v1.0.1</b> (69&nbsp;pp.) issued with a three-page erratum &mdash; the corrections of Tables&nbsp;1&ndash;2 and five further passages made after the assessments; published as", link: "release package v1.0.1", b: "."},
    upd2: {a: "Original submission <b>v1.0</b> (68&nbsp;pp.), the revision examined by the assessments; published as", link: "release package v1.0", b: "."},
  },
  /* ---- release packages — one lead line; the block is untitled and
   *      sits at the foot of the page ---- */
  docs: {lead: "Both revisions are published as release packages, byte-for-byte as distributed, with their SHA-256. <b>Version 1.0.1</b> (8 October 2026) supersedes <b>version 1.0</b> (30 June 2026), the original submission examined by the third-party assessment."},
  /* ---- §4 Performance — lead and the two captions ---- */
  perf: {lead: "What the family costs. The numbers below are the eBACS (SUPERCOP) measurements of the published implementations, not measurements taken on this page. Once a message fills one block, FEILIAN-1024 holds near 4.5 cycles per byte on x86 at every length, so its advantage sits at short inputs: at 1 KiB it is the cheapest of the four. On 64 KiB it gives up about 6% to SHA-512 and 3% to BLAKE-64, and stays 2.6 times ahead of SHA-3-512. On the ARM host SHA-512 is twice as fast on long messages.", cap1: "Cycles per byte at 64 KiB messages, from eBACS: feilian1024/timingleaks against sha512/constbranchindex, sha3512/constbranchindex and blake64/timingleaks. Lower is better; the published figures identify the hosts by architecture only.", cap3: "Across message lengths, on the eBACS x86 host. SHA-512 and BLAKE-64 fall steadily as their per-call setup is amortised; FEILIAN-1024 levels off near 4.5 from 128 bytes up, because each 1024-bit block carries 128 bytes at a fixed cost."},
  /* ---- §5 Third Party Analysis — lead and three dated lines.
   *      Each line is date / name / kind / link and nothing else; the
   *      documents themselves carry the detail. "who" here is the kind. ---- */
  analysis: {
    lead: "Three independent sources have analysed this submission. Their documents are published by their authors, so this page links to them rather than restating their findings; none establishes a full-round break of the correctly encoded software hash.",
    c1: {h3: "Mounir Idrassi", who: "technical assessment", link: "github.com/amcrypto-jp/feilian-cryptanalysis &rarr;"},
    c2: {h3: "Markku-Juhani O. Saarinen", who: "a personal report", link: "ngcc.dev &rarr;"},
    c3: {h3: "Mounir Idrassi", who: "ePrint 2026/2236", link: "eprint.iacr.org/2026/2236 &rarr;"},
  },
  /* ---- the design figure's four view captions ---- */
  fig: {v0: "FEILIAN: the padded message is split into 1024-bit blocks and each block meets one compression call; the tweak <span class=\"mono\">tw</span> &#8212; the block counter and, on the last block, the message length &#8212; enters every call.", v1: "the compress function. The same 1024-bit block <span class=\"mono\">m</span> is absorbed by all five phases; the tweak <span class=\"mono\">tw</span> enters every round; the feed-forward XORs the incoming chaining value into the result, so <span class=\"mono\">h&#8242; = h &#8853; v&#8325;</span>.", v2: "one phase <span class=\"mono\">P(v, m)</span> &#8212; the absorbing round <span class=\"mono\">R&#770;<sup>&#8853;</sup></span> takes the message in, three plain rounds <span class=\"mono\">R</span> follow. The walk lights round 1 and opens it up below; it then lights round 2 and opens a plain round <span class=\"mono\">R</span> in the same place &#8212; the same five steps, no message. Five phases chain into the compression function &#8212; 20 rounds in all.", v3: "SubColumn: two tweakable ARX S-boxes stacked. <span class=\"mono\">S&#771;&#8321;</span> is driven by <span class=\"mono\">s&#8321; = a&#8320;&#8242;</span>, <span class=\"mono\">S&#771;&#8320;</span> by <span class=\"mono\">s&#8320; = a&#8321; + b&#8321;</span>. Both tweaks are derived inside SubColumn &#8212; no external value enters."},
};
