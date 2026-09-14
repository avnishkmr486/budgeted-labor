# Altametrics Back Office — static build

Plain HTML / CSS / JS. No build step, no framework, no network calls.
Open `index.html` in a browser (or serve the folder).

```
dist/
  index.html        document shell + all application markup (inside <template id="app-template">)
  styles.css        global resets + hover states lifted out of the markup
  app.js            template renderer (top ~140 lines) + application logic + boot
  vendor/ds/        Altametrics Back Office design-system token CSS
  assets/           module-button images, brand mark
```

## How it fits together

`index.html` holds the markup for every screen. Three conventions in it:

| In markup | Meaning |
|---|---|
| `{{ name }}` | value from the app's `renderVals()` (text or attribute) |
| `<sc-for list="{{ items }}" as="item">` | repeats children; `{{ item.x }}` and `{{ $index }}` in scope |
| `<sc-if value="{{ flag }}">` | includes children when truthy |
| `data-hov="h3"` | hover style, rule lives in `styles.css` |
| `onClick="{{ handler }}"` / `onChange="{{ handler }}"` | handler function from `renderVals()` |

`app.js` part 1 walks that template and builds DOM. Part 2 is the application:
a single `Component` class holding `state` (current route, grid data, edits,
pagination, matrices, schedule, uploads) and a `renderVals()` that returns every
value and handler the markup asks for. `setState` schedules a re-render;
focus and caret in text fields are preserved across renders.

Element styling is inline in the markup, matching the source design 1:1 — change
a screen's look by editing that element in `index.html`.

## Screens

My Workflow · Labor Service Matrix (+ detail tabs, Update by %) ·
Mass Labor Matrices Update · Weekly Schedule · Labor Budget Upload.
All routing is client-side state — no URLs, no server.
