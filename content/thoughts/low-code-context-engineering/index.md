---
title: "Context Engineering in Low-Code Platforms"
date: 2025-11-02T10:00:00Z
tags: ["ai", "low-code", "context-engineering", "llms"]
draft: true
---

<div class="tldr">
<strong>TLDR:</strong> Low-code platforms create interconnected webs of abstractions that traditional text-based AI approaches can't navigate—pages connect to domain models, microflows call APIs, workflows trigger UI components. The context engineering challenge becomes teaching LLMs to understand <mark>rich relationships</mark> and <mark>collective behavior</mark> in representational spaces they weren't trained on.
</div>

Why is context engineering fundamentally harder in low-code environments? Because all the different abstractions are interconnected, creating a natural web of rich relationships that collectively build an app. Traditional text-based approaches simply don't apply to this space.

In programming, you write functions with code. In low-code, you orchestrate 50+ abstractions to create equivalent functionality. Pages connect to domain models, microflows call APIs, workflows trigger UI components, data sources feed configuration panels—everything interrelates through complex dependency chains and data bindings.

The biggest difference? LLMs have seen massive amounts of code, so the bottleneck for traditional coding assistants isn't generating code—it's all the context engineering around it. But in low-code, the abstractions and their relationships are unknown territory for LLMs. This knowledge gap needs to be bridged to achieve comparable results.

Traditional AI coding assistants operate in a text-to-text paradigm: their input (tool calls) is text, their output (code generation) is text. They work within the same latent problem space. Low-code operates in a completely different paradigm—interconnected abstractions with rich relationships that LLMs weren't trained on.

Under the hood, these abstractions have underlying representations that manipulations are made out of. LLMs don't generate "visual" things; they work with these representational structures. But the problem is understanding how they interconnect and relate.

This creates unique context engineering challenges:

- **Interconnected abstractions**: How do you represent the web of relationships between pages, domain models, microflows, APIs, and workflows as tokens?
- **Rich relationships**: Configuration matters as much as code, but it's expressed through dependency chains, data bindings, and cross-artifact references
- **Collective behavior**: An app emerges from how all these abstractions work together—traditional retrieval can't capture this emergent complexity

Traditional text-based retrieval doesn't work. You need semantic understanding of interconnected abstractions, relationship hierarchies, and collective behavior. The context engineering problem becomes: how do you teach an LLM to navigate a web of abstractions?

Why does this matter? Because low-code platforms represent the future of application development for most organizations. If AI agents can't effectively work in these environments, they'll be limited to a shrinking niche of traditional coding. The winners will be those who crack the code on context engineering for interconnected abstractions.
