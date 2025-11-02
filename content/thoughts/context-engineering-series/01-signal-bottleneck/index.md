+++
title = "Signal Is the Bottleneck"
date = "2025-11-02T10:00:00+01:00"
description = "Context engineering is about extracting signal from noise. The problem isn't context window size. It's ensuring signal is present and prominent when the agent needs it."
series_order = 1
+++

<div class="tldr">
<strong>TLDR:</strong> Context engineering is about extracting <mark>signal</mark> from noise. Signal is task-relevant information. The problem isn't context window size. It's ensuring signal is present and prominent at inference time. Optimize for <mark>recall</mark> first, then <mark>precision</mark>.
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

Why is this so hard? Signal isn't static. What's relevant for "add authentication" becomes noise when the task shifts to "fix the login bug". The agent doesn't know what it doesn't know. It can't request information it's unaware exists. And dependencies often reveal themselves only after you need them.

## When Signal Fails

Poor signal extraction has root causes. <mark>Poisoning</mark> happens when bad information pollutes decisions. Outdated data stays loaded in context, and the agent acts on stale assumptions. <mark>Clash</mark> occurs when conflicting information causes confusion. Multiple sources in context define the same concept differently, and the agent picks wrong. <mark>Unknown unknowns</mark> emerge when the agent makes assumptions instead of asking or searching. Critical signal exists somewhere in the codebase but never makes it into context. <mark>Stale signal</mark> means information was true when loaded but changed. The codebase evolved, the context didn't. <mark>Signal bleed</mark> happens when information from previous tasks leaks into the current one. The agent carries forward irrelevant history that drowns out current signal.

These cause predictable symptoms. <mark>Hallucinations</mark> appear when the agent starts inventing things that don't exist. <mark>Repetition</mark> happens when the agent reinvents logic it can't see. <mark>Wrong scope</mark> emerges when the agent modifies the wrong files or functions.

> These aren't model failures. They're context engineering failures. The right signal never made it to the right place at the right time. Or it got buried under noise, like finding a needle in a haystack.

## We've Solved This Before

Context engineering isn't ~~new~~ novel. Lazy loading resources on-demand instead of bundling everything upfront. Caching hot paths in memory and evicting cold data. Compression algorithms that preserve information while reducing size. Index structures that narrow search space before linear scanning. Query optimization that filters early and projects only required columns.

> Context engineering is resource management. The resource is tokens instead of memory, but the principles are identical.

This is why maximizing signal is solvable. We already know how to optimize resource loading.

Even specialized models trained with reinforcement learning don't escape this. Better models improve reasoning, not context management. The context window constraint remains. The signal extraction problem remains. You still need to decide what goes in, when it loads, and how to prune noise.

## What's Next

Signal is the bottleneck. But how do you extract it? That's where context engineering comes in.

In [The Stack](/thoughts/context-engineering-series/02-the-stack/), we'll explore the three layers that maximize signal: retrieval, ranking, and pruning. We'll cover when to front-load context versus lazy-load it, and how to implement progressive disclosure in practice.

Then in [Why Single Agents Win](/thoughts/context-engineering-series/03-start-simple/), we'll look at why simple architectures beat complex multi-agent systems when context engineering is done right.
