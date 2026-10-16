# Deployment and maintenance

Operational notes for this repository. Nothing here is needed to *read* the
page — it is the maintenance manual for whoever publishes it.

- Live site: <https://feilian-hash.github.io/>
- Repository: <https://github.com/FEILIAN-hash/feilian-hash.github.io>
- Pages source: branch `main`, folder `/ (root)`, `Jekyll` disabled by `.nojekyll`

## Publishing a change

```bash
git add -A && git commit -m "..." && git push
```

Pages rebuilds in about a minute. `git push` alone is enough once the upstream is
tracked; use `git push -u origin main` the first time.

There are no release tags and no version numbers for the page itself — what
carries versions is the submission, tracked in §3 of the page. Commits are the
history.

There is no build step. `index.html` is the site — structure, styles, scripts and
figures — and `content.js` is its prose; no external dependencies, no bundler, no
CDN. What you commit is what is served.

The live demonstration in §2 is inlined into that same file, so the page stays
self-contained: its stylesheet is scoped under `#demo` and its script is wrapped
in an IIFE, so neither can reach the rest of the page. The block is generated
from the standalone demo (`feilian-live-demo.html`) kept alongside the submission
workspace. Regenerate the whole `<section id="demo">` element together with its
inlined `<style>` and `<script>` if the demo core ever changes — the three are a
matched set, and hand-patching one in isolation will desynchronise them.

## Enabling Pages for the first time

1. **Settings → Pages → Build and deployment → Source: Deploy from a branch**
2. Branch `main`, folder `/ (root)`, **Save**

`github.com/feilian-hash/feilian-hash.github.io` is the repository; the
organisation name is mixed-case, GitHub URLs are case-insensitive, and the
site URL stays lowercase.

## Publishing a release package

`tools/make_downloads.py` copies a release package from the submission workspace
into `files/` and rewrites the manifest block in `index.html` with the real size
and checksum.

```bash
python tools/make_downloads.py                 # dry run — lists what would be published
python tools/make_downloads.py --publish       # copy files/ and patch index.html
```

It is a dry run by default. Copying the specification and the implementations
into a public repository is a disclosure decision, so it takes an explicit
`--publish` to write anything.

A **release package** is the unit the designers distribute: one archive per
revision, holding the specification, the erratum and every implementation. The
script copies it **verbatim, never repacked**, so the digest the page publishes is
the digest of the official artifact and can be checked against any other copy of
it — nothing here rebuilds an archive, and nothing here can make the digest drift.

Two tables at the top of the script drive it:

| Table | Published | Gets a download card |
|---|---|---|
| `PACKAGES` | yes, verbatim, plus a SHA-256 | yes — rendered by the manifest block |
| `ASSETS` | yes, verbatim, plus a SHA-256 | no — the page links it from the text |

`ASSETS` exists for documents the page opens directly instead of offering as a
card: they are published and checksummed exactly like a package but get no card.
Nothing uses it at present — the erratum used to be the case in point, linked
straight from §3 while living in `files/`, but it now travels inside the release
package alone. The table is kept because it is how such a document should be
published if the page ever links one directly: a same-origin `href` keeps working
from `file://`, from Pages and from any mirror, and survives a move to another
host — which a `raw.githubusercontent.com` or GitHub Releases URL would not. Put
the file in `files/` and give it an `ASSETS` row; do not link it from outside the
repository.

`files/` is reconciled to those two tables on every `--publish` — any file in
`files/` that no row names is deleted from it. Add a `PACKAGES` row to publish
another revision, an `ASSETS` row to publish another directly linked document.

| Flag | Effect |
|---|---|
| `--workspace DIR` | where the submission material lives (default: the parent directory of this repo) |
| `--package PATH` | publish this package instead of the built-in list; repeat for more than one, path relative to the workspace |
| `--out DIR` | stage the copy somewhere other than `files/` |
| `--no-patch` | publish the package but leave `index.html` alone |

## Verifying a release

```bash
python tools/verify_release.py
python tools/verify_release.py --url https://feilian-hash.github.io/
```

Checks that every digest in `files/SHA256SUMS.txt` matches the file on disk, that
every package the page links to exists — the download manifest and the documents
linked straight from the text are both covered — that each of those is
checksummed and that the text prints its digest, that the navigation anchors
resolve to real sections, that the tags balance, and that the release metadata is
present. With `--url` it also fetches the deployed page and every listed package
and document and compares the served bytes against the local copies. Exit status
is non-zero if anything fails.

## Where the downloads live, and why

| Route | URL shape | Loads in mainland China |
|---|---|---|
| **In this repository, served by Pages** | `/<repo>/files/x.zip` | ✅ `github.io` is reachable |
| GitHub Releases | `github.com/<owner>/<repo>/releases/...` | ❌ the URL *starts* at `github.com`, which is widely blocked |
| jsDelivr over this repo | `cdn.jsdelivr.net/gh/<owner>/<repo>@<tag>/files/x.zip` | ✅ but hard limit of 20 MB per file |
| A separate CDN or object store | your own domain | ✅ |

The Release route is the one that looks most "official" and is the one that fails
for the likely audience, so the artifacts are committed here instead. Note that
the HTML `download` attribute only forces a save dialog for **same-origin**
links; a cross-origin mirror just navigates to the file.

Limits to keep in mind: GitHub Pages allows about 1 GB per published site, no
single file in a git repository may exceed 100 MB, and **Pages does not serve Git
LFS objects** — commit the real bytes.

## Troubleshooting: `Connection was reset` when pushing

Git for Windows does **not** inherit the Windows system proxy. A browser that
reaches GitHub perfectly well therefore tells you nothing about whether `git
push` will work.

Diagnose, then route git through the proxy the browser is already using:

```bash
git ls-remote origin          # "Connection was reset" here means the path is blocked

git config --local  http.https://github.com.proxy http://127.0.0.1:7688
git config --global http.https://github.com.proxy http://127.0.0.1:7688   # all repos
```

The port comes from **Windows Settings → Network & Internet → Proxy**, or from
the Clash / v2ray dashboard. The scoped key applies to `github.com` only; other
remotes keep going direct. Undo with:

```bash
git config --unset http.https://github.com.proxy
```

**If credentials are not cached**, a push may block on an interactive login
prompt. To probe the network without that risk:

```bash
GIT_TERMINAL_PROMPT=0 GCM_INTERACTIVE=never git push -u origin main
```

**SSH alternative.** `ssh.github.com:443` is frequently reachable when
`github.com:443` is not:

```
# ~/.ssh/config
Host github.com
  HostName ssh.github.com
  Port 443
  User git
```

then switch the remote to `git@github.com:FEILIAN-hash/feilian-hash.github.io.git` and upload a
key. The HTTPS-plus-proxy route above is usually less trouble.

Note that `github.io` is normally reachable even when `github.com` is not, so a
Pages site keeps loading for readers in mainland China even while pushes need a
proxy. If the site itself ever becomes unreachable, Cloudflare Pages is the
fallback.

## Alternative hosts

The site is a single static file, so any static host works.

| Host | How |
|---|---|
| **Cloudflare Pages** | Create project → Direct Upload → drop the folder |
| **Netlify Drop** | Drag the folder onto <https://app.netlify.com/drop> |
| **Vercel** | `npx vercel` in this folder |
| **Any web server** | Copy `index.html`, `files/`, `LICENSE`, `NOTICE.md` |

## Custom domain

Optional; the `feilian-hash.github.io` URL works fine.

1. Add a `CNAME` file to this directory containing the bare domain, e.g.
   `feilian.example.org`, and commit it.
2. At your DNS provider add a `CNAME` record: `feilian` → `feilian-hash.github.io`.
3. **Settings → Pages → Custom domain**, confirm, and tick **Enforce HTTPS**.

Remember to update the `rel="canonical"` and `og:url` values in `index.html` if
the site moves.
