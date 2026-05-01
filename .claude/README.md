# .claude/

Topical context for Claude Code. The root `CLAUDE.md` is the entry point and stays compact; load files here on demand for the task at hand.

| File | Read when… |
| --- | --- |
| [architecture.md](architecture.md) | You need the repo layout, page tiers, asset-loading model, or component-loader internals. |
| [html-conventions.md](html-conventions.md) | You're authoring or editing HTML — page templates, sections, meta tags, navbar wiring. |
| [css-conventions.md](css-conventions.md) | You're touching styles — variables, breakpoints, utility classes. |
| [js-conventions.md](js-conventions.md) | You're writing JavaScript — jQuery, components loader, animations, JSON loading. |
| [data.md](data.md) | You're editing `jsons/timeline.json` or `jsons/testimonials.json`. |
| [images.md](images.md) | You're adding/replacing/organizing images. |
| [workflows.md](workflows.md) | You're doing a recurring task: new page, new season, new sponsor, new testimonial, etc. |
| [seasons.md](seasons.md) | You're working with wiki/season pages. |
| [gotchas.md](gotchas.md) | **Read before "fixing" anything that looks broken or redundant.** Captures intentional weirdness. |
| [commit-style.md](commit-style.md) | The user asks you to commit. |

Keep files focused — if a workflow touches multiple areas, the workflow file should reference the convention files rather than duplicate them.
