# Research notes

## Sources consulted

1. Pro-Gamer.gg — "GTA 6 Trophy & Achievement Guide: All 55 PS5 Trophies, Xbox 1,000G List & How to Unlock the Platinum"
   URL: https://pro-gamer.gg/gta-6-trophy-achievement-guide-all-55-ps5-trophies-xbox-1000g-list-platinum
   Supports: per-trophy "How to unlock" steps, missable warning (Lucia balcony meditation in Chapter 1), roadmap (story -> 100% -> strangers), 100% checklist counts, hidden trophy list, vehicle/animal scan counts.

2. GTABase — "GTA 6 Trophy Guide & Achievements List (PS5 & Xbox Series X|S)"
   URL: https://www.gtabase.com/articles/gta-6/gta-6-achievements-trophies-list-ps5-xbox-series
   Supports: official 55 trophy names/descriptions/grades, secret trophy count (28), 100% completion requirements, missable note.

3. Rockstar Games — Grand Theft Auto VI official page
   URL: https://www.rockstargames.com/VI
   Supports: official game context; official trophy names/descriptions are taken from the kit's starter list (Exophase/PSNProfiles agreement).

## Key decisions

- Trophy names, descriptions, grades, and ids are kept byte-for-byte from the starter's app/data/trophies.json (kit house guide #2), which the gate compares against.
- Extended each item with: guide (paraphrased, own words), sources, kind, missable + missable_reason, roadmap_stage, steps, hidden.
- Only one trophy is flagged missable: "Positive Mental Attitude" (Lucia's balcony meditation, Chapter 1). All others remain available in post-story free roam per Pro-Gamer.gg.
- Kind values: story, missable, collectible, activity (no online trophies exist in this list).
- Roadmap stages: 1 story chapters/missions, 2 stranger questlines, 3 missables, 4 collectibles, 5 activities/combat/money/easter eggs, 6 100% completion, 7 platinum.
- Every guide cites at least one named source with URL, shown beside the guide in the UI. No source text is copied; facts are paraphrased.
- Where a guide repeats only the official description, it was expanded with steps derived from the cited guide.
