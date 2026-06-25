# Task Board

A simple task board app built with plain HTML, CSS, and JavaScript. It runs entirely in the browser, no backend, no build tools, no installation needed.

## How to run

1. Download or clone this repository.
2. Open `index.html` in any web browser (Chrome, Firefox, Safari, Microsoft Edge).

That's it. No server, no `npm install`, no build step.

## Features

### Core features
- **Add a task** — type a title and click Add (or press Enter).
- **View tasks** — all tasks appear in a list.
- **Mark done / not done** — click the checkbox to toggle. Done tasks get a strikethrough.
- **Delete a task** — click the Delete button on any task.
- **Open task counter** — shows how many tasks are still not done.

### Quality
- **Empty state** — shows a friendly message when there are no tasks.
- **Input validation** — empty or whitespace-only input is blocked with a hint.
- **Clean layout** — works on a normal laptop screen.
- **No console errors** — verified during testing.

### Stretch features (implemented)
- **Responsive** — adapts to phone-width screens.
- **Filter** — All / Open / Done buttons to filter the list.
- **Keyboard support** — press Enter to add a task.
- **Persistence** — tasks are saved in localStorage and survive a page refresh.

## Tech stack

| Item | Choice |
|------|--------|
| HTML | Plain HTML5 |
| CSS | Plain CSS (no framework) |
| JavaScript | Vanilla JS (no libraries) |
| Storage | Browser localStorage |
| Build tools | None — just open the file |

I chose plain HTML/CSS/JS because it is simple, has no dependencies, and is easy to understand and explain.

## Project structure

```
task-board/
├── index.html    ← The page structure (HTML elements)
├── styles.css    ← All styling (colors, layout, responsive)
├── app.js        ← All logic (add, delete, toggle, filter, save)
├── QA.md         ← Test plan and spec review
└── README.md     ← This file
```

## What I skipped

Nothing. All core features, quality requirements, and stretch features are implemented.

## AI assistance

I used an AI tool (ChatGPT) to help with the following:

- **Writing the app code** (index.html, styles.css, app.js): I developed the initial codebase myself and used AI assistance to refine, optimize, and improve parts of the implementation. I reviewed and understood all modifications before submission.
- **Writing the QA.md**: I generated the initial QA documentation myself and used AI assistance to help improve the wording, structure, and clarity of the test cases and observations. I reviewed and validated all documented findings before submission.

I understand all the code I submitted and can explain any part of it in a follow-up conversation.

## Time spent

Approximately 5–6 hours total:
- Building the app: ~3 hours (including review and testing).
- Writing the QA.md (test plan + spec review): ~2 hours.
- README and final review: ~45 minutes.

## Testing

See `QA.md` for the full test plan (15 test cases) and the login form spec review.
