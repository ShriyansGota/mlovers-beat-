# MLovers Beat — Ringtone Download Website

Pink/crimson themed ringtone-download website template, inspired by the
mobcup-style layout you shared (trending grid → ringtone detail page →
"5-second timer, then direct download" page). Pure HTML/CSS/JS — no
backend, no build step. Open `index.html` in a browser and it works.

## What's inside
```
index.html        → homepage (trending grid, search, tag filters)
ringtone.html      → single ringtone page (preview player, 2 download buttons)
download.html      → the 5-second countdown gate → "Download Now" → real file download
css/style.css       → the whole pink/red design system
js/data.js          → the ringtone catalogue (EDIT THIS to add your own tracks)
js/main.js          → renders the grid + detail page, search/filter logic
js/download.js      → the countdown timer + triggers the real download
assets/audio/        → 6 short ORIGINAL placeholder tones, already wired up
                        end‑to‑end so you can test the full flow right now
```

## Try it right now
Just double‑click `index.html`, or run a tiny local server (recommended,
some browsers block audio/downloads on `file://`):
```
cd mloversbeat
python3 -m http.server 8000
```
Open `http://localhost:8000`, click any ringtone → click **Download** →
watch the 5‑second ring fill → click **Download Now** → the file actually
downloads. That part is fully working already.

## ⚠️ Important: about the sample audio & copyright
The 6 tracks in `assets/audio/` are **plain generated tones I created for
this template** — not real songs, not Bollywood/film audio, no copyright
on them. I named them things like "Dil Ki Dhadkan Beat" instead of using
the actual movie-song titles from your screenshots on purpose: hosting
copyrighted film songs (Bhojpuri/Bollywood tracks, etc.) as free ringtone
downloads without a license is copyright infringement, regardless of how
the site is monetized.

This matters for your AdSense goal too — **Google AdSense's policies
prohibit ads on pages with copyright‑infringing content**, and sites built
mainly around pirated film audio routinely get their AdSense applications
rejected or accounts banned later. So before you go live:
- Replace the sample files with **your own original recordings**, audio
  you've **licensed**, or tracks from **royalty‑free libraries** (e.g.
  Pixabay Audio, Free Music Archive's CC‑licensed tracks, your own
  remixes/edits you have rights to).
- Update the titles/tags in `js/data.js` to match.
- Keep a record of where each file's rights come from — you'll want that
  if AdSense or a copyright holder ever asks.

## Adding your own ringtones
Open `js/data.js` and add an object to the `RINGTONES` array:
```js
{
  id: "my-new-ringtone",                 // used in the URL, no spaces
  title: "My New Ringtone",
  artist: "Your Name / Studio",
  duration: "20 Sec",
  plays: 0,
  tags: ["New", "Trending", "2026"],
  gradient: ["#ff6a88", "#d81b60"],      // cover-art colour
  mp3: "assets/audio/my-new-ringtone.mp3",
  m4r: "assets/audio/my-new-ringtone.m4r"
}
```
Drop the matching `.mp3` (Android) and `.m4r` (iPhone) files into
`assets/audio/`. No database needed — it's just a JS array.

## Turning on real Google AdSense
The ad slots are already placed (top banner, mid‑feed, ringtone page, and
right on the download‑timer page — the highest‑traffic spot). To make
them serve real ads:
1. Apply at **adsense.google.com** with your live domain (AdSense needs a
   real, deployed site with original content — not `localhost`).
2. Once approved, Google gives you a publisher ID like `ca-pub-1234567890123456`.
3. In every HTML file, replace every `ca-pub-XXXXXXXXXXXXXXXX` with your
   real ID (it's in the `<script>` tag in `<head>`, used 3 times total).
4. In each `.ad-slot` `<div>`, delete the placeholder text and **uncomment**
   the `<ins class="adsbygoogle">…</ins>` block already sitting right below
   it, filling in your real `data-ad-slot` IDs from the AdSense dashboard.
5. Add the `ads.txt` file AdSense gives you to your site's root folder.

I can't generate a working publisher ID for you — that only exists after
Google reviews and approves your actual site, so there's no way to fake
"real working AdSense" without going through that approval first.

## Deploying it for real
Any static host works since there's no backend:
- **Netlify** or **Vercel**: drag‑and‑drop the `mloversbeat` folder.
- **GitHub Pages**: push the folder to a repo, enable Pages.
- Your own hosting/cPanel: upload everything into `public_html`.
Point your domain (e.g. `mloversbeat.com`) at whichever host you pick.

## Customizing
- Colours/fonts: all in the `:root { … }` block at the top of `css/style.css`.
- Brand name/logo: edit the `<a class="logo">` block in each HTML file.
- Nav links, footer links, legal pages: currently placeholders (`#`) —
  swap in real Terms/Privacy/DMCA pages before you launch, especially
  since you're running ads and accepting user uploads.

## Scope note
This is a static front‑end (no login backend, no user upload system, no
database). If you also want visitors to **create accounts and upload
their own ringtones** (like the "Login / Sign up / Upload" menu items in
your screenshots), that needs a real backend + database + file storage —
happy to help with that as a separate build if you want it.
