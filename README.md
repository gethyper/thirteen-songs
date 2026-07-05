# Mixtapes

A simple static site that displays my weekly mixtapes — **13 songs, every Sunday**, organized by volume.

No build tools. Just HTML, CSS, and vanilla JS reading from a JSON file.

## Adding a new volume

Edit [`data/mixtapes.json`](data/mixtapes.json) and add an object to the array:

```json
{
  "volume": 2,
  "date": "2025-07-13",
  "title": "Your Title Here",
  "cover": "covers/vol2.jpg",
  "tracks": [
    { "track": 1, "title": "Song", "artist": "Artist" }
    // ... 13 total
  ]
}
```

- `volume` — the volume number (integer)
- `date` — the Sunday, in `YYYY-MM-DD` format
- `title` — the mixtape's title/theme
- `cover` — optional path to an image in `covers/` (leave `""` to show a volume badge instead)
- `tracks` — the 13 songs, each with `track`, `title`, `artist`

## Viewing it

Because it loads a JSON file with `fetch`, open it via a local server (not `file://`):

```bash
cd mixtapes
python3 -m http.server
# then visit http://localhost:8000
```

## Cover art

Drop image files into the `covers/` folder and reference them in the `cover` field.
