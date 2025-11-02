+++
title = "Signal Is the Bottleneck"
date = "2025-11-01T17:12:23+01:00"
description = "Context engineering is about extracting signal from noise. Signal is task-relevant information. Context is everything loaded. Agent performance depends on the signal-to-noise ratio."
draft = true
+++

<div class="tldr">
Context engineering is about extracting <mark>signal</mark> from noise. Signal is task-relevant information. Agent performance depends on the signal-to-noise ratio. Optimize for <mark>recall</mark> first, then <mark>precision</mark>. Focus on solving this first before adding architectural complexity.
</div>

> "Filling the context window with just the right information for the next step."
>
> — [Andrej Karpathy](https://x.com/karpathy/status/1937902205765607626?lang=en)

The bottleneck isn't context volume. It's <mark>signal</mark>. Context is everything loaded into the agent's window: history, tool outputs, prompts, etc.

Signal is the subset of context that's relevant to the current task, the specific information needed to make the right decision right now.

What we're solving is minimizing the context needed to succeed at a task. Think of it as an optimization problem. We want to minimize context tokens while maintaining task success. The loss function penalizes both missing signal (task failure) and excess noise (signal drowning).

$$
\text{Loss} = \alpha \cdot \text{Missing Signal} + \beta \cdot \text{Excess Context}
$$

Where $\alpha \gg \beta$ because missing critical information is catastrophic, but excess context also degrades performance by drowning signal in noise. This is why you optimize for <mark>recall</mark> first (capture all relevant signal), then <mark>precision</mark> (remove the noise). Missing signal breaks the agent immediately. Too much noise weakens it gradually.

You can have a 1M token context window, but if critical information never makes it in, or gets drowned in noise, the agent fails. The problem isn't context window size. It's ensuring signal is present and prominent at inference time.

Why is this so hard? Well... signal isn't static. What's relevant for "add authentication" becomes noise when the task shifts to "fix the login bug". The agent doesn't know what it doesn't know. It can't request information it's unaware exists. And dependencies often reveal themselves only after you need them.

## When Signal Fails

Poor signal extraction has root causes. <mark>Poisoning</mark> happens when bad information pollutes decisions. Outdated data stays loaded in context, and the agent acts on stale assumptions. <mark>Clash</mark> occurs when conflicting information causes confusion. Multiple sources in context define the same concept differently, and the agent picks wrong. <mark>Unknown unknowns</mark> emerge when the agent makes assumptions instead of asking or searching. Critical signal exists somewhere in the codebase but never makes it into context. <mark>Stale signal</mark> means information was true when loaded but changed. The codebase evolved, the context didn't. <mark>Signal bleed</mark> happens when information from previous tasks leaks into the current one. The agent carries forward irrelevant history that drowns out current signal.

These cause predictable symptoms. <mark>Hallucinations</mark> appear when the agent starts inventing things that don't exist. <mark>Repetition</mark> happens when the agent reinvents logic it can't see. <mark>Wrong scope</mark> emerges when the agent modifies the wrong files or functions.

> These aren't model failures. They're context engineering failures. The right signal never made it to the right place at the right time. Or it got buried under noise, like finding a needle in a haystack.

## We've Solved This Before

Context engineering isn't ~~new~~ novel. Lazy loading resources on-demand instead of bundling everything upfront. Caching hot paths in memory and evicting cold data. Compression algorithms that preserve information while reducing size. Index structures that narrow search space before linear scanning. Query optimization that filters early and projects only required columns.

> Context engineering is resource management. The resource is tokens instead of memory, but the principles are identical.

This is why maximizing signal is solvable. We already know how to optimize resource loading.

> Even specialized models trained with reinforcement learning don't escape this. Better models improve reasoning, not context management. The context window constraint remains. The signal extraction problem remains. You still need to decide what goes in, when it loads, and how to prune noise.

## The Stack

How do you maximize signal in context? Context engineering has three layers. <mark>Retrieval</mark> finds relevant code and documentation using semantic search. This is your first filter, narrowing down from thousands of files to dozens of candidates that might contain signal. <mark>Ranking</mark> orders candidates by relevance to the current task, considering recency, file importance, and dependency relationships. This surfaces high-signal content first. <mark>Pruning</mark> removes noise from context, cuts redundant information, and compresses where possible without losing signal.

When pruning, optimize for <mark>recall</mark> first, then <mark>precision</mark>. Why? Missing critical signal is catastrophic. The agent forgets a key decision and breaks the system. Including redundant context is annoying. The agent wastes tokens but *still* functions.

> Start by keeping everything that might matter. Then iterate to remove the obvious noise: tool call results deep in history, repeated error messages, intermediate state that led nowhere.

Better to carry extra context than lose the signal that breaks the task later. Each layer reduces tokens while preserving signal.

## The Timing Problem

When do you load context? Load too early, you waste tokens. Load too late, the agent operates blind. The answer depends on *certainty*.

<mark>Front-loading</mark> loads context upfront, before the agent acts. You have an open editor where the user is actively working in `AuthService.ts`. Front-load this file into context. Why? The agent will almost certainly need it. The user is signaling intent by having it open. This is high-probability context. Load it upfront.

> This is like warming up the engine before driving. You know you'll need it, so prepare it in advance.

Compare this to front-loading an entire module. The user opens `AuthService.ts`, so you load *every* file in the `auth/` directory: `AuthService.ts` (needed), `AuthMiddleware.ts` (maybe), `AuthConfig.ts` (maybe), `AuthTests.ts` (unlikely), `AuthMigrations.ts` (unlikely), `AuthHelpers.ts` (unlikely). You've drowned the LLM in noise. The signal gets buried.

<mark>Lazy loading</mark> loads context on-demand, as the agent requests it. The agent doesn't know what it needs until it starts working. User asks: "Why is authentication failing?" The agent reads the current file, finds where auth is called, *then* loads the auth implementation, *then* checks configuration, *then* examines error logs. Each step informs the next. Load lazily as questions arise. This is why <mark>ReAct prompting</mark> works so well. Reason about what you need, Act to retrieve it, repeat. Instead of front-loading everything, the agent pulls signal on-demand through tool use.

> Don't read the whole book upfront. Open it to a specific chapter only after you know what you're looking for.

[Claude Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) implements this exact pattern through <mark>progressive disclosure</mark>. Load skill metadata at startup (names, descriptions), load `SKILL.md` only when the skill is triggered, and load additional files (`forms.md`, `reference.md`) only when specific scenarios arise. This keeps the context window lean because information loads on-demand, not upfront.

How do you choose? Front-load when the user's current context is clear (open files, active selection), the cost of loading is low (small files, high relevance), and the probability of need is high. Lazy load when the task is exploratory (debugging, discovery), the search space is large (entire modules, codebases), and the probability of need is uncertain. The best agents mix both. Front-load the obvious, lazy-load the rest through tool use.

## Start Simple

Remember when everyone rushed to containerize everything? Kubernetes for a three-service app. Microservices for a monolith that worked *fine*. We're seeing the same pattern with multi-agent systems. "Agentic frameworks" are everywhere. The promise? Orchestrate dozens of specialized agents, each handling a specific task, coordinating to solve ~~complex problems~~ everything.

The reality? The best coding agents today are simple `while(tool_use)` loops with exceptional context engineering. Claude Code, Codex, Cline, Amp Code. They win on context, not coordination. Their engineering decisions are context-first. Every design choice optimizes for what goes into the window and when. Architecture, retrieval strategy, caching, all built around maximizing signal per token.

> Multi-agent systems introduce *real* complexity. Coordination overhead, cascading failures, state synchronization. Most problems don't need this.

When do multi-agents actually help? When the problem is genuinely decomposable and the coordination cost is justified.

What's the difference between multi-agent orchestration and sub-agent architectures? Multi-agent systems coordinate multiple independent agents that run simultaneously, sharing state and communicating through complex protocols. Sub-agent architectures spawn isolated forks of the main agent for specific tasks.

Why does this matter for coding agents? Sub-agents are frequently used to manage context windows. A fork of the main agent performs a task in isolation, then provides a clean summary back to the main agent. The context window stays pristine. No accumulated state, no coordination overhead.

- A sub-agent for context management? Sure.
- A fleet of 10 agents for a code change? *Overkill*.

Multi-agent systems don't solve context engineering. They multiply it. Each agent still needs signal extraction. Now you also need agent-to-agent communication protocols, shared state management, conflict resolution, and orchestration logic. With single agents or sub-agents, the only lever is context engineering. With multi-agents, you add coordination overhead, message passing complexity, and distributed state problems on top of the context engineering you still have to solve.

Context engineering scales linearly. Better retrieval, better signal extraction, better results. Multi-agent systems scale ~~linearly~~ exponentially. More agents, exponentially more interaction patterns to manage. <mark>Start simple</mark>. Master context engineering first. Add coordination only when you've exhausted single-agent optimization.

## Signal Wins

Signal isn't optional. It's the driving factor that determines whether AI agents fail or succeed. Every hallucination, every wrong turn, every wasted token traces back to poor signal extraction through context engineering.

The agents that win won't be the ones with fancier architectures. They'll be the ones that master extracting <mark>signal</mark> from context. They'll load less but understand more. They'll know when to front-load, when to lazy-load, and when to prune ruthlessly.

Context engineering scales linearly while architectural complexity explodes exponentially. Better retrieval, better ranking, better pruning. These are the levers that maximize signal and multiply agent effectiveness.
