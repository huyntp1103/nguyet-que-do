# Commit Style

Conventional Commits, one-line subject in English, lowercase after the type. No body unless asked.

## Observed prefixes

| Prefix | Meaning | Examples from history |
| --- | --- | --- |
| `feat:` | New feature or content addition | `feat: update season VII`, `feat: refactor navbar and footer` |
| `feat(scope):` | Scoped feature | `feat(ads): disable ads` |
| `fix:` | Bug or layout fix | `fix: scroll behavior`, `fix: navbar`, `fix: image size` |

## Conventions

- Subject in lowercase after the prefix (`feat: update ...`, not `feat: Update ...`).
- Imperative mood (`update`, `add`, `fix`, `refactor`).
- Subject under ~70 chars; no trailing period.
- No body unless the change really needs explanation. The author historically keeps commits compact.
- Prefer **multiple small commits** over one big one when changes are independent (e.g., a content update + a navbar fix should be two commits).

## Examples to mirror

```
feat: update season VII
feat: refactor navbar and footer
feat(ads): disable ads
fix: scroll behavior
fix: image size
fix: redundant h1 tag
```

## When asked to commit

Only commit when the user explicitly asks. Stage specific files (avoid `git add -A`). Don't push unless asked. Don't amend prior commits. Use a HEREDOC for multi-line messages if a body is requested.
