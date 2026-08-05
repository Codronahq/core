# Attribution

Codrona is built on data and research published by others. This file records every
source considered, the terms it is used under, and the conditions those terms place
on us.

**This file is generated.** Edit `packages/attribution/src/attribution.json` instead;
CI regenerates this file and fails if the two diverge. The same data is exported by
`@codrona/attribution` and rendered by every user-facing surface, so what appears here
and what appears in the product cannot drift apart.

Dispositions and the full reasoning are recorded in [LEGAL.md](https://github.com/codronahq/docs/blob/main/LEGAL.md).

## Sources used

### IBM Project CodeNet

Contains information from IBM Project CodeNet, made available by IBM Research under the Community Data License Agreement – Permissive – Version 2.0.

- **Rights holder:** IBM Research
- **Terms:** [CDLA-Permissive-2.0](https://cdla.dev/permissive-2-0/)
- **Source:** <https://developer.ibm.com/exchanges/data/all/project-codenet/>
- **Role:** Training corpus — submissions and problems from Aizu Online Judge and AtCoder

### Codeforces

Problem, contest and submission metadata retrieved from the official Codeforces API. Codeforces is operated by CODEFORCES GLOBAL - FZCO and is not affiliated with Codrona.

- **Rights holder:** CODEFORCES GLOBAL - FZCO
- **Terms:** [No licence stated; site Terms govern](https://codeforces.com/terms)
- **Source:** <https://codeforces.com/apiHelp>
- **Role:** Training corpus and live integration — submission metadata via the official API

Conditions we hold ourselves to:

- Problem statements and editorials are never stored or served; every problem reference links to codeforces.com.
- Requests are rate-limited to one per two seconds through a single shared limiter.

### CodeContests

Contains materials from CodeContests by Google DeepMind, used under the Creative Commons Attribution 4.0 International licence. CodeContests is not an official Google product.

- **Rights holder:** Google DeepMind
- **Terms:** [Apache-2.0 (code), CC BY 4.0 (non-code materials)](https://github.com/google-deepmind/code_contests/blob/main/LICENSE)
- **Source:** <https://github.com/google-deepmind/code_contests>
- **Role:** Problem statements, test cases and human solutions — CodeNet-sourced problems only
- **Citation:** Li et al., "Competition-level code generation with AlphaCode", Science 378(6624), 1092–1097, 2022. doi:10.1126/science.abq1158

Conditions we hold ourselves to:

- Only problems sourced from IBM Project CodeNet (Aizu, AtCoder) are used.
- Codeforces-sourced and description2code-sourced problems are excluded.

### LeetCode problem difficulty estimates

LeetCode problem difficulty estimates by Shuxin Chen (zerotrac), used under the MIT licence. Copyright (c) 2021 Shuxin Chen.

- **Rights holder:** Shuxin Chen (zerotrac)
- **Terms:** [MIT](https://github.com/zerotrac/leetcode_problem_rating/blob/main/LICENSE)
- **Source:** <https://github.com/zerotrac/leetcode_problem_rating>
- **Role:** LeetCode problem-difficulty mapping

Conditions we hold ourselves to:

- These are community estimates computed by Elo and maximum likelihood estimation, not official LeetCode difficulty, and are labelled as such wherever displayed.
- Weekly contests 1–62 carry no estimate; Codrona's own model is used instead.

## Sources deliberately not used

Recorded because a decision not to use something is part of the provenance record,
not an absence of one.

### AtCoder

AtCoder submission data is not ingested by Codrona. AtCoder Inc. licenses submission data directly to third parties, and the bulk community mirrors carry no AI-training opt-out signal. AtCoder problems reach Codrona only through IBM Project CodeNet, under that dataset's own licence.

- **Rights holder:** AtCoder Inc.
- **Terms:** [Terms of Use, revised 2026-06-29](https://atcoder.jp/tos)
- **Source:** <https://atcoder.jp>
- **Role:** Not used as a training corpus

### AtCoder Problems

The AtCoder Problems bulk submission dataset is not ingested by Codrona. Where a user connects their own AtCoder handle, their public submission list may be read through this unofficial API at no more than one request per second, as profile data only.

- **Rights holder:** kenkoooo
- **Terms:** [MIT (application code only; no licence stated for data)](https://github.com/kenkoooo/AtCoderProblems)
- **Source:** <https://github.com/kenkoooo/AtCoderProblems/blob/master/doc/api.md>
- **Role:** Not used as a training corpus

---

Codrona is not affiliated with, endorsed by, or sponsored by any of the platforms named
above.
