# FEILIAN — Submission Overview

**The overview page for FEILIAN**, the hash function submitted to the NGCC-CH programme of the
Institute of Commercial Cryptography Standards (ICCS), China.

**Live site — <https://feilian-hash.github.io/>**

The page is organised as five chapters: an **introduction** to the design, closing with a short
**Updates** list whose dated lines link to the release packages; a **design animation**, the
four-view interactive figure (the FEILIAN iteration, the compress function, one phase with two of
its rounds drawn out inside it, and SubColumn); **live hashing**, which computes digests in the
browser; the **performance** the specification reports; and the **third party analysis** — one
dated line per source, each linked to its own document. The **release packages** close the page in
an untitled block: both revisions, each checksummed, holding the specification, the erratum and
every implementation. Detailed specification tables are deliberately kept out of the page and left to
the PDF. The palette is deliberately plain — one accent colour and neutral greys — and every figure
keeps its own proportions rather than being stretched to the width of the card.

The third-party material cited is the technical assessment by Mounir Idrassi (findings R1–R8),
the ngcc.dev report by Markku-Juhani O. Saarinen, and the component-level analysis in Cryptology
ePrint 2026/2236 — each linked to its own document. None of them establishes a full-round
cryptanalytic break, and the page states that boundary as plainly as they do.

It is one HTML file plus one copy file (`content.js`), with **no build step, no framework and no external dependencies**. Every figure
is inline SVG or plain JavaScript, and the live demo's hash core is inlined into the same file, so
the page renders and the demo runs identically offline, from `file://`, and from any static host.

---

## Contents

| § | Section | What it covers |
|---|---|---|
| 1 | Introduction | The design in brief — 1024-bit state and block, the tweakable ARX permutation, Davies–Meyer — closing with a short **Updates** list: one dated line per release, each linking to its package at the foot of the page |
| 2 | Design Animation | The **four-view interactive figure**: the FEILIAN iteration (message blocks, chaining value, tweak), the compress function (five phases, the tweak, the feed-forward), one phase (four rounds, with round 1 and round 2 opened up underneath), and SubColumn |
| 3 | Live Hashing | A JavaScript port of the compression function running in the page: text / hex / bit-string input, 512 / 768 / 1024 output, a known-answer self-test against the Appendix B vectors, and the timings it measures itself |
| 4 | Performance | The cost the specification reports: software benchmarks on three platforms, and cycles per byte against BLAKE-64 / SHA-512 / SHA-3-512 |
| 5 | Third Party Analysis | The three independent sources, one dated line each, each linked to its own document. Their findings are not reproduced on the page |
| — | Release packages (untitled) | Both **release packages** — **v1.0.1** (specification, erratum and all implementations in one archive) and the original **v1.0** — each with its SHA-256 |

---

## Downloads

| Artifact | File | Contents | Size |
|---|---|---|---|
| Release package v1.0.1 | [`files/FEILIAN-v1.0.1.zip`](files/FEILIAN-v1.0.1.zip) | the whole of version 1.0.1 in one archive — specification (69 pp.), the three-page erratum from v1.0, the reference, optimized (AVX2/NEON) and RTL implementations, and the implementations README | 856 KB |
| Release package v1.0 | [`files/FEILIAN-v1.0.zip`](files/FEILIAN-v1.0.zip) | the original submission of 30 June 2026, as distributed — specification (68 pp.), the same implementations, the test vectors and the intellectual-property statements | 44.3 MB |
| Checksums | [`files/SHA256SUMS.txt`](files/SHA256SUMS.txt) | `sha256sum -c` compatible | — |

```
23d3e6721563a27b15b39b14a3e3042b9c5da6925fb3d540464d85206de05d5c  FEILIAN-v1.0.1.zip
876082a40ecf3b25d8b19478cbfeab4bd5f96ff7a293aacc5b57a9f73c2ff26c  FEILIAN-v1.0.zip
```

The erratum has no file of its own any more: it travels inside the release package, and the page
does not link it separately.

[`files/SHA256SUMS.txt`](files/SHA256SUMS.txt) is the canonical list of digests; the
copy above is for convenience and is regenerated together with the artifacts.

Packages are published **byte-for-byte as distributed**, never repacked, so their digests are the
digests of the official artifacts and can be checked against any other copy of them. The SHA-256 of the
specification PDF *inside* the package is
`2d14bcf877eb9fbdb79fe573be078923445aec373270a16676ebd494ffabf0db`; the erratum inside it is the
three-page document of that revision.

---

## Verifying a release

```bash
python tools/verify_release.py
python tools/verify_release.py --url https://feilian-hash.github.io/
```

The first form checks every digest against the files on disk, that each artifact the page links to
exists — both those in the download manifest and the documents linked straight from the text — that
the navigation and in-page anchors resolve — to sections, and to the download cards the update lines jump to — that the tags balance, and that the release metadata
is present. The second additionally fetches the deployed page and every artifact
and compares the served bytes against the local copies. Exit status is non-zero if anything fails.

To verify a download by hand:

```bash
sha256sum -c SHA256SUMS.txt
```

---

## Running it locally

Open `index.html` in any browser — no server required. If you prefer one:

```bash
python -m http.server 8000     # then visit http://localhost:8000/
```

---

## Editing the page copy

Every piece of prose on the page — the leads, the specification-updates lines, the
revision timeline, the table and figure captions, the review cards and the design
figure's four view captions — lives in **`content.js`**, one object keyed by
section. Reword a string there, commit, and GitHub Pages publishes it in a minute
or two. **No other file needs to change to edit the words.**

The rule that keeps this safe: `content.js` holds *words only*. Tags, classes,
link targets, dates and glyphs stay in `index.html`, where each slot is an empty
element carrying a `data-t` key. Editing copy therefore cannot break the layout,
the design figure or a link — every `href` and every `id` is still in the HTML,
and `tools/verify_release.py` checks them exactly as before. Inline `<b>` /
`<span>` markup inside a value is fine where the original had it; do not put an
`href` in one.

Deliberately not in `content.js`:

| Text | Where it lives | Why |
|---|---|---|
| Navigation labels, view tabs and their tooltips | `index.html` | bound to section and view ids |
| Labels inside the design figure (IV, block 0, round 1 of 4 …) | `index.html`, figure script | positioned by the drawing code |
| The live demo's own copy | `index.html` §3 | a matched set, regenerated as one — see `DEPLOY.md` |
| Download-card subtitles and the checksum note | manifest block / page script | owned by `tools/make_downloads.py` |
| Chart axis and legend labels | the chart scripts | tied to the plotted data |
| Footer — licence, checksum, repository link | `index.html` | legal and provenance text |

Workflow: a copy edit goes straight to `main`. Anything that changes structure,
styling, the figure or the demo goes through a pull request, verified locally
first — `python tools/verify_release.py` (24 checks) and a look at the rendered
page.

---

## Repository layout

```
index.html                    the site: structure, styles, scripts, figures
content.js                    every piece of editable prose (words only)
files/                        the published release packages and their checksums
  FEILIAN-v1.0.1.zip
  FEILIAN-v1.0.zip
  SHA256SUMS.txt
tools/
  make_downloads.py           copy a release package into files/ and rewrite the page's manifest
  verify_release.py           checksums, links, page structure, deployed bytes
README.md                     this file
DEPLOY.md                     publishing and maintenance
NOTICE.md                     provenance, authorship and rights
CHANGELOG.md                  frozen at v1.6.5 — how the page was built
LICENSE                       CC BY 4.0 (compendium only)
```

The download section of the page is generated from a manifest embedded between
`/* DOWNLOADS:BEGIN */` and `/* DOWNLOADS:END */` in `index.html`.
`tools/make_downloads.py` copies a release package into `files/`, records its digest and rewrites
that block, so the page can never advertise a package that has not been published — an
unpublished entry renders as a disabled button rather than a dead link.

Documents that the text links directly rather than offering as a card would be published by the same
script from its `ASSETS` table and covered by the same checksums, so the link stays same-origin
wherever the page is served from. Nothing is published that way at present: the erratum now travels
inside the release package alone, and the checksum list is written by the script itself.

---

## Provenance, authorship and licensing

This page is **part of the submission**. It is the entry point published for the submission:
the release packages — specification, erratum and implementations — and the third-party analyses the submission has received. Every parameter, test vector and measurement on the page is taken from the
sources listed above; where the page and the specification disagree, the specification prevails.

**The specification is by** Lei Wang, Ling Song, Yaobin Shen, Kaixuan Wang, Zicheng Shi and Xin Yi
(Shanghai Jiao Tong University; Jinan University; Xiamen University).

**The component analysis of §5 is by** Mounir Idrassi (AM Crypto, Japan), Cryptology ePrint Archive,
Report 2026/2236, distributed under CC BY 4.0. **The technical assessment of §5 is by** the same
author, version 1.0.2, 27 September 2026, also CC BY 4.0. **The ngcc.dev report** is by
Markku-Juhani O. Saarinen; ngcc.dev is his personal site and states that it is unaffiliated with
NICCS — its identifiers and editorial labels belong to that site and are not official competition
assessments.

Licensing is split, because the repository contains two kinds of material:

| Material | Terms |
|---|---|
| This page — `index.html`, the documentation, `tools/` | **CC BY 4.0** — see [`LICENSE`](LICENSE) |
| `files/FEILIAN-v1.0.1.zip` | the submission material, published as distributed; all rights remain with the designers; **no licence granted** |
| `files/FEILIAN-v1.0.zip` | the original submission material, published as distributed; all rights remain with the designers; **no licence granted** |
| `files/SHA256SUMS.txt` | checksums — copy freely |

See [`NOTICE.md`](NOTICE.md) for the full statement. If you are a rights holder and want any file
withdrawn, open an issue and it will be removed promptly.

---

## How to cite

The specification:

> Lei Wang, Ling Song, Yaobin Shen, Kaixuan Wang, Zicheng Shi and Xin Yi.
> *FEILIAN: A Hash Function Proposal.* Submitted to the Next-generation Cryptographic Algorithms
> Program (NGCC-CH), Institute of Commercial Cryptography Standards, China. Version 1.0.1, 8 October
> 2026, 69 pp. (Erratum from v1.0 released with it.)

The component analysis:

> Mounir Idrassi. *A Complete Classification of Whole-Output Linear Structures in FEILIAN-Type
> Components.* Cryptology ePrint Archive, Report 2026/2236, 2026.
> <https://eprint.iacr.org/2026/2236>

The submission's overview page, if you need to point at it:

> *FEILIAN — Submission Overview*, <https://feilian-hash.github.io/>

---

## Corrections

Errors in the presentation are the responsibility of this repository. Please open an issue for any
discrepancy — a wrong constant, a mistyped vector, a misattributed figure — and it will be fixed.

## Change history

The page carries no version numbers of its own: a change is committed to `main`,
GitHub Pages publishes it, and the git history is the record.
[`CHANGELOG.md`](CHANGELOG.md) is frozen at v1.6.5 and kept as the account of how
the page was built. The revision history of the submission itself — its
specification releases — is the update log in the Introduction and the
release list at the foot of the page.
