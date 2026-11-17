# Ride the Wind: Indie Game Dev Simulator

A newsgame about the economics of indie game development. Choose a price, team size, salary and development time, draw three random events from real developers' experiences, then see what share of comparable Steam games would not have earned back your budget.

**Play:** open `index.html` in any browser. It runs offline, with no installation or server needed.
**Full report:** [original Chinese version](https://airrhead.github.io/Indie-Game/INDIEGAMEDEVELOPER/index.html)

## How it works

1. **Budget.** Labour cost = monthly salary × team size × months.
2. **Random events.** Three of 29 events are drawn, each taken from the team's interviews with independent developers and shown with its source. Each event has one effect that matches its story:
   - **Schedule** (bugs, redesigns, disputes, outside help): development time changes by −2 to +3 months.
   - **Funding** (an Unreal MegaGrant, family support): costs fall by CNY 50,000–100,000.
   - **Market** (promotion, word of mouth, poor localisation, a bad publishing deal): estimated revenue changes by −25% to +30%.
3. **Comparison sample.** Of the 10,960 games in the dataset, the 1,935 with at least 100 reviews (positive + negative) are included.
4. **Estimated revenue.** Total reviews × 30 × your price × 0.65, adjusted by any market events.
5. **Result.** A game "survives" if its estimated revenue exceeds your adjusted budget. The failure rate is the share of included games that do not. Below 50% unlocks the survival ending; otherwise you get the failure ending.

With the defaults (CNY 28, four people, CNY 5,000 a month, 18 months, giving a budget of CNY 360,000), the failure rate is 64.7% before events. Across every possible combination of three events, it ranges from 43.4% to 78.4%.

## Data and credit

**Revenue model.** The estimate follows indie developer **Yaheng (亚恒)**, creator of *LoveChoice (拣爱)*, which sold more than 10,000 copies on Steam within three weeks of release. In his video [*Letting the Data Speak: How High Is the Death Rate of Indie Games?*](https://www.bilibili.com/video/BV17a411B7gF/) (拿数据说话！做独立游戏的死亡率有多高？【亚恒说】, Bilibili, January 2022), he estimates copies sold as total reviews × 30 and takes 65% of gross revenue as the developer's share after Steam's 30% cut and refunds. Estimating sales from review counts is an established rule of thumb in the games industry, known as the [Boxleiter method](https://www.gamedeveloper.com/business/how-to-estimate-steam-video-game-sales-in-2021-).

**Events.** All 29 events come from the team's own interviews with independent developers; each card names the developer and game it comes from.

**Dataset.** The simulator draws on 10,960 Steam games, each with its positive and negative review counts. We use this broader sample rather than Chinese titles alone because, as Yaheng notes, Chinese and international games on Steam show broadly similar patterns. Chinese indie games also compete with international titles in the same global market, and a larger sample makes the estimates more stable. The main report draws on a separate, original dataset of 1,695 Chinese indie games on Steam, which the team identified and collected title by title.

## Method and limitations

The model is deliberately simple. It applies one price and one budget to every game, counts salaries only, and does not restrict the sample to indie titles. The ×30 multiplier is an average; the true ratio varies by genre, price and release year. Event effect sizes are illustrative, set by the team rather than estimated from data. The result shows what share of comparable games would not have earned back a budget like yours.

## Steam releases vs domestic approvals

Below the simulator, a scroll-triggered chart switches from Chinese indie releases on Steam (2020–2022), coded by the team from public store data, to all client-game approvals published by China's National Press and Publication Administration (NPPA), which are not limited to indie titles. Even so, approvals fall far short of releases: in both 2021 and 2022, the year's total approvals were fewer than the Chinese indie games released on Steam in any single quarter.

| Year | Steam Q1 | Q2 | Q3 | Q4 | Approvals Q1 | Q2 | Q3 | Q4 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 2022 | 52 | 51 | 58 | 63 | — | 5 | 12 | 19 |
| 2021 | 69 | 63 | 40 | 58 | 9 | 8 | 5 | — |
| 2020 | 56 | 69 | 63 | 18 | 19 | 14 | 19 | 10 |

## Files

- `index.html`: the game and the release comparison
- `js/game.js`: game logic
- `js/data.js`: the 29 events (with their schedule, cost and revenue effects) and the 10,960-game dataset
- `js/release-comparison.js`: scroll animation (ScrollMagic and GSAP)
- `css/`, `images/`: styles, backgrounds and buttons