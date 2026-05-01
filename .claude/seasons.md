# Seasons

Each season ("mùa") of Nguyệt Quế Đỏ has its own wiki page and image folder. New seasons follow Roman-numeral suffixes.

## Inventory

| Season | File | Year | Image folder |
| --- | --- | --- | --- |
| I    | `wiki/nguyet-que-do-i.html`   | 2018 | `images/nqd-i/` |
| II   | `wiki/nguyet-que-do-ii.html`  | 2019 | `images/nqd-ii/` |
| III  | `wiki/nguyet-que-do-iii.html` | 2021 | `images/nqd-iii/` |
| IV   | `wiki/nguyet-que-do-iv.html`  | 2022 | `images/nqd-iv/` |
| V    | `wiki/nguyet-que-do-v.html`   | 2023 | `images/nqd-v/` |
| VI   | `wiki/nguyet-que-do-vi.html`  | 2024 | `images/nqd-vi/` |
| VII  | `wiki/nguyet-que-do-vii.html` | 2025 | `images/nqd-vii/` |

(The 2020 gap is because of COVID-19 — there was no Season III in 2020; III ran in 2021.)

`wiki/nguyet-que-do.html` is the **overview** wiki page (not a season). It lists all seasons and contains the master Olympia-contestants table.

## Wiki page conventions

Wiki pages use `wiki.css` and the `wiki-script.js` + `wiki-season-script.js` pair. Their `<head>` and asset paths are nearly identical across seasons — when adding a new season, copy the most recent existing season page (currently `nguyet-que-do-vii.html`) as the starting template.

Season-specific assets:

- Images go in `images/nqd-{roman}/` and are referenced as `../images/nqd-{roman}/...` from the wiki page.
- Each season's page typically contains: hero section, organizer info, contestant lineup, results, and photos.

## Navbar wiki dropdown

`components/navbar.html` has an explicit `<li>` for every season. Add a new `<li>` when launching a new season; remove only with explicit instruction (history matters).

## Slug convention

Filename = navbar `data-page` value = URL segment (no extension).

```
wiki/nguyet-que-do-vii.html → /wiki/nguyet-que-do-vii → data-page="nguyet-que-do-vii"
```

The current-page highlight in `components.js` extracts the slug from the URL via the regex `/\/wiki\/([^\/\.]+)/`.
