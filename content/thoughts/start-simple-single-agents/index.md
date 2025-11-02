+++
title = "Start Simple: Why Single Agents Win"
date = "2025-11-02T12:00:00+01:00"
description = "Simple architectures with exceptional context engineering beat complex multi-agent systems. Learn when to use single agents, sub-agents, and when multi-agent coordination is actually justified."
draft = false
+++

<div class="tldr">
<strong>TLDR:</strong> The best coding agents are simple `while(tool_use)` loops with exceptional context engineering. Multi-agent systems introduce coordination overhead, cascading failures, and state synchronization problems. <mark>Start simple</mark>. Master context engineering first. Add coordination only when you've exhausted single-agent optimization.
</div>

> This is part 3 of a series on context engineering. Start with [Signal Is the Bottleneck](/thoughts/signal-is-the-bottleneck/) or read [Context Engineering: The Stack](/thoughts/context-engineering-stack/) first.

Context engineering is about extracting <mark>signal</mark> from noise. We've covered [why signal is the bottleneck](/thoughts/signal-is-the-bottleneck/) and [how to maximize it through retrieval, ranking, and pruning](/thoughts/context-engineering-stack/).

Now let's talk about why simple architectures win.

## The Complexity Trap

Remember when everyone rushed to containerize everything? Kubernetes for a three-service app. Microservices for a monolith that worked *fine*. We're seeing the same pattern with multi-agent systems. "Agentic frameworks" are everywhere. The promise? Orchestrate dozens of specialized agents, each handling a specific task, coordinating to solve ~~complex problems~~ everything.

The reality? The best coding agents today are simple `while(tool_use)` loops with exceptional context engineering. Claude Code, Codex, Cline, Amp Code. They win on context, not coordination. Their engineering decisions are context-first. Every design choice optimizes for what goes into the window and when. Architecture, retrieval strategy, caching, all built around maximizing signal per token.

> Multi-agent systems introduce *real* complexity. Coordination overhead, cascading failures, state synchronization. Most problems don't need this.

## When Multi-Agents Actually Help

When do multi-agents actually help? When the problem is genuinely decomposable and the coordination cost is justified.

What's the difference between multi-agent orchestration and sub-agent architectures? Multi-agent systems coordinate multiple independent agents that run simultaneously, sharing state and communicating through complex protocols. Sub-agent architectures spawn isolated forks of the main agent for specific tasks.

Why does this matter for coding agents? Sub-agents are frequently used to manage context windows. A fork of the main agent performs a task in isolation, then provides a clean summary back to the main agent. The context window stays pristine. No accumulated state, no coordination overhead.

- A sub-agent for context management? Sure.
- A fleet of 10 agents for a code change? *Overkill*.

## The Coordination Tax

Multi-agent systems don't solve context engineering. They multiply it. Each agent still needs signal extraction. Now you also need agent-to-agent communication protocols, shared state management, conflict resolution, and orchestration logic. With single agents or sub-agents, the only lever is context engineering. With multi-agents, you add coordination overhead, message passing complexity, and distributed state problems on top of the context engineering you still have to solve.

Context engineering scales linearly. Better retrieval, better signal extraction, better results. Multi-agent systems scale ~~linearly~~ exponentially. More agents, exponentially more interaction patterns to manage. <mark>Start simple</mark>. Master context engineering first. Add coordination only when you've exhausted single-agent optimization.

## The Winning Pattern

The agents that win won't be the ones with fancier architectures. They'll be the ones that master extracting <mark>signal</mark> from context. They'll load less but understand more. They'll know when to front-load, when to lazy-load, and when to prune ruthlessly.

Context engineering scales linearly while architectural complexity explodes exponentially. Better retrieval, better ranking, better pruning. These are the levers that maximize signal and multiply agent effectiveness.

Signal isn't optional. It's the driving factor that determines whether AI agents fail or succeed. Every hallucination, every wrong turn, every wasted token traces back to poor signal extraction through context engineering.

Start simple. Master signal first.

---
</br>

*This concludes the series on context engineering. Start with [Signal Is the Bottleneck](/thoughts/signal-is-the-bottleneck/) or explore [Context Engineering: The Stack](/thoughts/context-engineering-stack/).*
