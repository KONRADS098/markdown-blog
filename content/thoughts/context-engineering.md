+++
title = "Context Is the Bottleneck"
date = "2025-11-01T17:12:23+01:00"
description = "Why context engineering fails and how to solve it."
draft = true
+++

> "Filling the context window with just the right information for the next step."
>
> — [Andrej Karpathy](https://x.com/karpathy/status/1937902205765607626?lang=en)

By now, you know what context engineering is.

But why is it so hard in practice?

**Relevance is dynamic**: what matters changes as the task evolves. Critical context becomes noise when the goal shifts.

**Signal-to-noise ratio**: ~~more~~ *better* context wins. Volume doesn't help if the critical piece is buried.

**The agent doesn't know what it doesn't know**: it can't ask for context it's unaware exists. Dependencies reveal themselves only after you need them.

The goal isn't maximum context. It's maximum *signal*: the relevant information that drives correct decisions, not the noise that drowns it out.

## When It Breaks

Context failures have root causes:

**Poisoning**: bad context pollutes subsequent decisions. Outdated information stays loaded, the agent acts on stale assumptions.

**Clash**: conflicting information causes confusion. Multiple sources define the same concept differently, the agent picks wrong.

**Unknown unknowns**: the agent makes assumptions instead of asking. It doesn't know critical context exists, so it guesses.

**Stale context**: information was true at load time but changed. The codebase evolved, the context didn't.

**Context bleed**: information from previous tasks leaks into the current one. The agent carries forward irrelevant history.

These cause predictable symptoms:

**Hallucinations**: agent invents APIs that don't exist.

**Repetition**: agent rewrites logic it can't see.

**Wrong scope**: agent modifies the wrong files.

> These aren't model failures. They're context failures.

## This Is Just Software Engineering

Context engineering isn't ~~new~~ novel.

**Lazy loading**? We’ve been loading resources on demand for decades.

**Caching**? Load frequently-accessed data upfront.

**Pruning**? That's pagination and filtering.

> Context engineering is resource management. The resource is tokens instead of memory, but the principles are identical.

This is why context engineering is solvable. We already know how to optimize resource loading.

## The Solution Framework

How do you engineer better context?

The stack has three layers:

### 1. Retrieval

Find relevant code and documentation using semantic search. This is your first filter: narrow down from thousands of files to dozens of candidates.

### 2. Ranking

Order candidates by relevance to the current task. Consider recency, file importance, and dependency relationships.

### 3. Pruning

Remove noise. Cut redundant information. Compress where possible without losing meaning.

When pruning, optimize for **recall** first, then **precision**.

Why?

Missing critical context is catastrophic. The agent forgets a key decision and breaks the system.

Including redundant context is annoying. The agent wastes tokens but *still* functions.

> Start by keeping everything that might matter. Then iterate to remove the obvious noise: tool call results deep in history, repeated error messages, intermediate state that led nowhere.

Better to carry extra weight than lose the detail that breaks the task later.

Each layer reduces tokens while preserving signal.

## The Timing Problem

When do you load context?

Load too early, you waste tokens. Load too late, the agent operates blind.

**Front-loading**: load context upfront, before the agent acts.

**Lazy loading**: load context on-demand, as the agent requests it.

Neither is always right. The answer depends on *certainty*.

### When Front-Loading Works

You have an open editor. The user is actively working in `AuthService.ts`.

Front-load this file into context.

Why?

The agent will almost certainly need it. The user is signaling intent by having it open. This is high-probability context: load it upfront.

> This is like warming up the engine before driving. You know you'll need it, so prepare it in advance.

Compare this to front-loading an entire module.

The user opens `AuthService.ts`, so you load *every* file in the `auth/` directory. Now the agent sees:

- `AuthService.ts` (needed)
- `AuthMiddleware.ts` (maybe)
- `AuthConfig.ts` (maybe)
- `AuthTests.ts` (unlikely)
- `AuthMigrations.ts` (unlikely)
- `AuthHelpers.ts` (unlikely)

You've drowned the LLM in noise. The signal gets buried.

### When Lazy Loading Works

The agent doesn't know what it needs until it starts working.

User asks: "Why is authentication failing?"

The agent needs to:

1. Read the current file
2. Find where auth is called
3. **Then** load the auth implementation
4. **Then** check configuration
5. **Then** examine error logs

Each step informs the next. Load lazily as questions arise.

> This is like opening a book to a specific chapter only after you know what you're looking for. Don't read the whole book upfront.

[Claude Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) implements this exact pattern through **progressive disclosure**:

1. Load skill metadata at startup (names, descriptions)
2. Load `SKILL.md` only when the skill is triggered
3. Load additional files (`forms.md`, `reference.md`) only when specific scenarios arise

The PDF skill bundles form-filling instructions in a separate file. Claude reads it only when filling out a form, not every time the skill is active.

This is lazy loading applied to agent capabilities. The context window stays lean because information loads on-demand, not upfront.

### The Balance

How do you choose?

**Front-load** when:

- The user's current context is clear (open files, active selection)
- The cost of loading is low (small files, high relevance)
- The probability of need is high (>80%)

**Lazy load** when:

- The task is exploratory (debugging, discovery)
- The search space is large (entire modules, codebases)
- The probability of need is uncertain (<50%)

The best agents mix both. Front-load the obvious, lazy-load the rest.

## What This Looks Like in Practice

How does this work in a real IDE?

When a user asks to "add authentication":

1. Retrieve: search for auth-related files, middleware patterns, config files
2. Rank: prioritize current auth implementation over examples from docs
3. Prune: show function signatures instead of full implementations for context

The agent sees exactly what it needs. Nothing more.

> This is why coding agents in IDEs work better than standalone tools: the IDE already knows the project structure, dependencies, and active files.

## The Low-Code Challenge

Why is this harder in low-code environments?

Low-code platforms add ~~complexity~~ interesting challenges:

- **Visual models**: how do you represent a flowchart as tokens?
- **Metadata layers**: configuration matters as much as code
- **Cross-artifact dependencies**: a microflow might depend on domain models, pages, and APIs

Traditional text-based retrieval doesn't work. You need semantic understanding of visual constructs.

## The Multi-Agent Hype

Remember when everyone rushed to containerize everything? Kubernetes for a three-service app. Microservices for a monolith that worked *fine*.

We're seeing the same pattern with multi-agent systems.

"Agentic frameworks" are everywhere. The promise: orchestrate dozens of specialized agents, each handling a specific task, coordinating to solve ~~complex problems~~ everything.

The reality?

The best coding agents today are simple `while(tool_use)` loops with exceptional context engineering. Claude Code, Codex, Cline, Amp Code: they win on context, not coordination.

Their engineering decisions are **context-first**. Every design choice optimizes for what goes into the window and when. Architecture, retrieval strategy, caching: all built around maximizing signal per token.

> Multi-agent systems introduce *real* complexity: coordination overhead, cascading failures, state synchronization. Most problems don't need this.

When do multi-agents actually help?

When the problem is genuinely decomposable and the coordination cost is justified. A sub-agent for context management? Sure. A fleet of 10 agents for a code change? *Overkill*.

Context engineering scales linearly. Better retrieval, better results.

Multi-agent systems scale ~~linearly~~ exponentially. More agents, exponentially more interaction patterns to manage.

Start simple. Master context engineering first. Add coordination only when you've exhausted single-agent optimization.

## What's Next

Context engineering is evolving from static to adaptive.

Today, context is loaded at query time. Tomorrow, it evolves as the task progresses: adding relevant information as the agent learns what matters.

Multi-modal retrieval will combine text, visual models, execution traces, and user behavior into a unified context stream.

The agents that win will master context engineering first.

---

This is what I'm working on at [Mendix](https://www.mendix.com/platform/ai/aiad/): solving context engineering for AI agents in low-code IDEs.
