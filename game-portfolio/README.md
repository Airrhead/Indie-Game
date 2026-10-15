# Ride the Wind: Indie Game Dev Simulator

Open `index.html` to play offline. Upload this entire folder to a static host to embed or link it in a portfolio.

This standalone game was extracted from `INDIEGAMEDEVELOPER/index.html`. The latest update centers the game vertically and translates its visible text into concise English. Original buttons, slide sequence, event reveal order, sound, replay behavior and calculations are retained. Game and developer names without established English names use romanization or descriptive translations.

## Files
- `index.html`: the four original game screens, with English text layers.
- `css/english.css`: vertical centering and English text sizing.
- `js/game.js`: original game logic; English button image paths and cross-fade rendering enabled to prevent transparent backgrounds exposing previous slides.
- `js/data.js`: 29 translated events; all event values and 10,960 game records unchanged.
- `images/intro-background.png`: the complete text-free opening image supplied by the author, with a separate HTML English title. No title-area patch is used on this screen.
- `images/*-en.png`: text-removal backgrounds for the remaining English screens.
- `images/button*-en.svg`: English versions of the original image buttons.

The original project folders remain unchanged. Sample game titles in the underlying dataset are preserved as identifiers; they are not displayed by this game.

## Dataset and methodological credit

The simulator contains **10,960 game records**, starting with *Valheim* and *New World*. This is distinct from the report's **1,695 Chinese indie games**, used for the separate analyses of pricing and self-publishing. Do not describe the simulator's sample as “1,695 Chinese indie games.”

The project account supplied by the author attributes the estimation approach to **Yaheng (亚恒), developer of LoveChoice (拣爱)**, and identifies the dataset as games released on Steam in 2021, collected through SteamDB. The described video is *拿数据说话！做独立游戏的死亡率有多高？【亚恒说】*. A [matching video listing](https://m.acfun.cn/v/?ac=33135948) was located, but its full contents and download attachment were not independently verified during this check.

Evidence status:

- **Verified in this repository:** 10,960 records; each stores a title, positive reviews and negative reviews. The model uses review count × 30 and retains 65% of estimated gross revenue. The report separately discusses 1,695 Chinese indie games.
- **Strong numerical corroboration:** the embedded data reproduce all three numerical examples in the supplied account; see below.
- **Pending source confirmation:** whether the team scraped the records or imported Yaheng's shared spreadsheet; the original video URL/file, data snapshot date, release-year filter and completeness of coverage. The records themselves have no release-date or acquisition-source fields, so “all games released in 2021” cannot be independently established from this array alone.

According to the supplied account, 0.65 represents revenue after Steam's 30% share and an allowance for refunds, before publisher fees. The script implements only the combined multiplier; it does not model these deductions separately. The 30× review multiplier is a heuristic, not a universally validated sales conversion rate.

## Contribution and portfolio wording

The project turns fixed development scenarios into a reader-controlled newsgame, adds developer-experience events with source attributions, and places the interaction within a data journalism narrative. Credit the underlying estimation approach separately from the interactive implementation. Avoid claiming original data collection until the acquisition history is confirmed.

Suggested description, with methodological attribution based on the author's supplied account:

> Adapting a back-of-the-envelope model from indie developer Yaheng, this newsgame lets readers set price, team size, salary and development time. Using an embedded dataset of 10,960 Steam games, it estimates the share of games meeting a review-count threshold whose modeled revenue would not exceed the selected labor budget. Developer-experience events connect the simulation to the wider reporting.

The threshold clause matters: the percentage is calculated over the filtered sample, not all 10,960 records. Add the 2021 release-year description once the source dataset is confirmed.

## Calculation rules
1. Labor cost = monthly salary in thousands of CNY × 1,000 × team size × months.
2. Draw three distinct events from 29. Eighteen have value −1 and eleven have value +1.
3. Review threshold = 100 + the three event values: 97, 99, 101 or 103.
4. Include only games whose positive + negative review count reaches that threshold.
5. Estimated revenue = total reviews × 30 × the selected price × 0.65.
6. A game survives if revenue strictly exceeds labor cost. The failure rate is the proportion of included games that do not pass this test.
7. Below 50% displays the survival ending; otherwise the failure ending.

Default settings: CNY 28, four people, CNY 5,000 per month, 18 months. Cost: CNY 360,000. Depending on events, the original model returns 64.2%–65.2%.

Event text mentions progress, funding and promotion, but the code only changes the sample threshold. Thus events are **sample-selection inputs**, not direct changes to cost, time or sales. At the default settings, thresholds 97 and 103 yield 65.2% and 64.2% failure rates: a difference of about one percentage point. Their effect is small in this scenario, but not zero or necessarily equally small under all parameter choices.

All included games are evaluated at the same user-selected price and budget. Positive and negative reviews both count toward estimated sales. Costs include salaries only, excluding premises and taxes; the dataset includes non-indie games. This is a conditional historical-sample calculation, not a validated personal failure probability. Revenue exactly equal to cost counts as failure in the original code.

## Reproducing the supplied video examples

Using this repository's data, salary CNY 5,000/month × one person × 18 months gives a CNY 90,000 budget. With a CNY 45 price, the results are:

| Minimum reviews | Included records | Failed to exceed budget | Failure rate | Survival rate |
| --- | ---: | ---: | ---: | ---: |
| 0 | 10,960 | 9,051 | 82.6% | 17.4% |
| 10 | 6,254 | 4,345 | 69.5% | 30.5% |
| 50 | 2,728 | 819 | 30.0% | 70.0% |
| 100 | 1,935 | 26 | 1.3% | 98.7% |

These are direct recalculations with controlled thresholds, not new controls in the game. The playable version still uses 100 plus the three event values. Matching these examples strongly supports the supplied explanation but does not establish who collected the data.

## Verification
English titles, parameters, event cards, both endings and replay were checked in desktop and 390-pixel-wide browser views. Vertical margins match and the narrow viewport has no horizontal page overflow. Data and event values were compared with the originals; the game script changes English button asset paths and enables cross-fade so inactive slides become fully transparent. Calculations and interaction order are unchanged.


## Extracted scroll comparison

The section below the simulator uses `fabu-text-en.svg` and `banhao-text-en.svg`. Each embeds the original PNG unchanged and replaces only title, quarter-label and source-text areas with English vector text. The original transparency, borders, shadows, numeric stamps and layout remain in place. The generated full-image English variants are no longer used. `js/release-comparison.js` is an unchanged copy of the original `myscroll.js`, using local ScrollMagic, TweenMax and the GSAP bridge. The chart stays in place while scrolling; crossing the second trigger fades from Steam releases to domestic approvals, and scrolling back reverses the transition. Layout styles are scoped to avoid changing the game.

These are two different populations, not an approval rate for the same games:

- **Steam chart:** Chinese indie releases, coded by the reporting team from public Steam store data, according to the original image credit.
- **Approvals chart:** client-game approvals published by China's National Press and Publication Administration (NPPA), according to the original image credit. It is not labeled as an indie-only series.

| Year | Steam Q1 | Q2 | Q3 | Q4 | Approvals Q1 | Q2 | Q3 | Q4 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 2022 | 52 | 51 | 58 | 63 | — | 5 | 12 | 19 |
| 2021 | 69 | 63 | 40 | 58 | 9 | 8 | 5 | — |
| 2020 | 56 | 69 | 63 | 18 | 19 | 14 | 19 | 10 |

Numbers above are transcribed from the original chart images. “—” preserves a blank cell in the artwork rather than asserting a separately verified zero. The underlying chart-level collection files and coding rules have not been independently audited here. These counts are separate from the simulator's 10,960-record array and from the report's broader 1,695-game analysis.
