+++
title = "Context Engineering: The Stack"
date = "2025-11-02T11:00:00+01:00"
description = "How to maximize signal in context through retrieval, ranking, and pruning. Learn when to front-load versus lazy-load, and how progressive disclosure keeps context lean."
draft = false
+++

<div class="tldr">
<strong>TLDR:</strong> Context engineering has three layers: <mark>retrieval</mark> (find relevant content), <mark>ranking</mark> (surface high-signal content first), and <mark>pruning</mark> (remove noise). Load context based on certainty. <mark>Front-load</mark> when probability is high, <mark>lazy-load</mark> when uncertain. <mark>ReAct prompting</mark> succeeds because it lazy-loads signal on-demand.
</div>

> This is part 2 of a series on context engineering. Start with [Signal Is the Bottleneck](/thoughts/signal-is-the-bottleneck/) or jump to [Start Simple: Why Single Agents Win](/thoughts/start-simple-single-agents/).

Context engineering is about extracting <mark>signal</mark> from noise. Signal is task-relevant information. Context is everything loaded into the agent's window.

In the [previous post](/thoughts/signal-is-the-bottleneck/), we established that signal is the bottleneck. Now let's explore how to maximize it.

## The Stack

How do you maximize signal in context? Context engineering has three layers. <mark>Retrieval</mark> finds relevant code and documentation using semantic search. This is your first filter, narrowing down from thousands of files to dozens of candidates that might contain signal. <mark>Ranking</mark> orders candidates by relevance to the current task, considering recency, file importance, and dependency relationships. This surfaces high-signal content first. <mark>Pruning</mark> removes noise from context, cuts redundant information, and compresses where possible without losing signal.

When pruning, optimize for <mark>recall</mark> first, then <mark>precision</mark>. Why? Missing critical signal is catastrophic. The agent forgets a key decision and breaks the system. Including redundant context is annoying. The agent wastes tokens but *still* functions.

> Start by keeping everything that might matter. Then iterate to remove the obvious noise: tool call results deep in history, repeated error messages, intermediate state that led nowhere.

Better to carry extra context than lose the signal that breaks the task later. Each layer reduces tokens while preserving signal.

## The Timing Problem

When do you load context? Load too early, you waste tokens. Load too late, the agent operates blind. The answer depends on *certainty*.

<mark>Front-loading</mark> loads context upfront, before the agent acts. You have an open editor where the user is actively working in `AuthService.ts`. Front-load this file into context. Why? The agent will almost certainly need it. The user is signaling intent by having it open. This is high-probability context. Load it upfront.

> This is like warming up the engine before driving. You know you'll need it, so prepare it in advance.

Compare this to front-loading an entire module. The user opens `AuthService.ts`, so you load *every* file in the `auth/` directory: `AuthService.ts` (needed), `AuthService.test.ts` (unlikely), `AuthMiddleware.ts` (maybe), `AuthConfig.ts` (maybe), `auth.types.ts` (noise), `AuthMigrations.ts` (unlikely), `AuthHelpers.ts` (unlikely), `package.json` (noise), `README.md` (noise), `.env.example` (noise). You've drowned the LLM in noise. The signal gets buried under test files, type definitions, configuration boilerplate, and documentation.

<mark>Lazy loading</mark> loads context on-demand, as the agent requests it. The agent doesn't know what it needs until it starts working. User asks: "Why is authentication failing?" The agent reads the current file, finds where auth is called, *then* loads the auth implementation, *then* checks configuration, *then* examines error logs. Each step informs the next. Load lazily as questions arise. This is why <mark>ReAct prompting</mark> works so well. Reason about what you need, Act to retrieve it, repeat. Instead of front-loading everything, the agent pulls signal on-demand through tool use.

> Don't read the whole book upfront. Open it to a specific chapter only after you know what you're looking for.

[Claude Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) implements this exact pattern through <mark>progressive disclosure</mark>. Load skill metadata at startup (names, descriptions), load `SKILL.md` only when the skill is triggered, and load additional files (`forms.md`, `reference.md`) only when specific scenarios arise. This keeps the context window lean because information loads on-demand, not upfront.

How do you choose? Front-load when the user's current context is clear (open files, active selection), the cost of loading is low (small files, high relevance), and the probability of need is high. Lazy load when the task is exploratory (debugging, discovery), the search space is large (entire modules, codebases), and the probability of need is uncertain. The best agents mix both. Front-load the obvious, lazy-load the rest through tool use.

## What This Looks Like in Practice

How does this work in a real IDE? When a user asks to "add authentication":

1. **Retrieve**: search for auth-related files, middleware patterns, config files
2. **Rank**: prioritize current auth implementation over examples from docs
3. **Prune**: show function signatures instead of full implementations for context

The agent sees exactly what it needs. Nothing more.

> This is why coding agents in IDEs work better than standalone tools. The IDE already knows the project structure, dependencies, and active files.

## Context Engineering Scales

Context engineering scales linearly. Better retrieval, better ranking, better pruning means better signal extraction and better results. The levers are clear. Improve semantic search, tune ranking weights, refine pruning heuristics.

But what about architectural complexity? That's where things get interesting.

In [Start Simple: Why Single Agents Win](/thoughts/start-simple-single-agents/), we'll explore why simple architectures with exceptional context engineering beat complex multi-agent systems, and when coordination complexity is actually justified.

