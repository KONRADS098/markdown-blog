# Writing Style Guide

## Voice & Tone

### Direct & Concise

- Get to the point immediately
- No fluff, no filler words
- Every sentence should add value
- Avoid marketing speak or hype
- Be precise with technical terms

**Good:**

```
Context engineering is the bottleneck. Here's how to solve it.
```

**Bad:**

```
In today's rapidly evolving landscape of AI development, we're beginning to see that context engineering might possibly be one of the most significant challenges that we face...
```

## Markdown Features

### Blockquotes for Externalized Thoughts

Use `>` blockquotes to externalize concepts, add depth, or provide meta-commentary on the main text. This separates tangential thoughts from the primary narrative.

**Example:**

```markdown
The key is to load only relevant context into the agent's window.

> Think of it like packing a suitcase—you don't bring everything you own,
> just what you need for the trip.

This means aggressive filtering at the retrieval layer.
```

**When to use blockquotes:**

- To add a parallel example or analogy
- To externalize a thought that adds depth but isn't critical to the main flow
- To provide a "why this matters" moment
- To share a personal observation or aside
- To draw connections to broader concepts

**Don't use blockquotes for:**

- Important warnings or critical information (use bold or regular text)
- Code examples (use code blocks)
- Long, continuous explanations (keep them in main text)

### Questions & Answers Pattern

Frame concepts as Q&A to illustrate purpose and guide understanding. This makes complex topics approachable.

**Example:**

```markdown
Why does context size matter?

Because agents can only "see" what fits in their context window.
If critical information is missing, they hallucinate or fail.

What's the solution?

Smart retrieval. Load only what's needed, when it's needed.
```

**Structure:**

1. Ask the question readers are thinking
2. Answer directly and concisely
3. Optional: Add a blockquote for deeper insight
4. Move to the next question

**Good questions:**

- Why does X matter?
- What's the problem with Y?
- How do we solve Z?
- When should you use A instead of B?

**Bad questions:**

- Have you ever wondered about...? (too casual)
- What if I told you...? (marketing-speak)
- Isn't it interesting that...? (not direct)

### Advanced Text Styling

Use markdown formatting to add personality and capture spoken thought patterns.

#### Strikethrough for Course Corrections

Use `~~strikethrough~~` to show real-time thinking—when you catch yourself and pivot to a better way of saying something.

**Example:**

```markdown
The solution is ~~complex~~ actually pretty simple: load less, load smarter.

Multi-agent systems add ~~sophistication~~ complexity. Most of the time, they add more problems than they solve.
```

**When to use:**

- To show a thought correction in real-time
- To contrast a common misconception with reality
- To add a "wait, let me reframe that" moment
- To emphasize the difference between expectation and truth

**Don't overuse:** One or two per post maximum. Too many feels gimmicky.

#### Italics for Emphasis and Sarcasm

Use `*italics*` for:

1. **Sarcastic or ironic tone**
2. **Emphasis on unexpected words**
3. **Internal thoughts or asides**

**Examples:**

```markdown
Sure, you _could_ load the entire codebase into context. If you enjoy hallucinations.

The "solution" here is to add more agents. _Brilliant._

This isn't a retrieval problem. It's a _relevance_ problem.
```

**When to use:**

- To signal sarcasm or irony (rare, but effective)
- To stress an unexpected word in a sentence
- To add a conversational aside or internal reaction
- To highlight the real issue vs. the surface issue

**Don't use for:**

- Quotes (use "quotes" instead)
- Long phrases (keep it to 1-3 words)
- Technical terms (stay precise, not dramatic)

#### Bold for Key Concepts

Use `**bold**` for terms and concepts that matter, not for emphasis.

**Good:**

```markdown
The **recall-first** approach means casting a wide net initially.
```

**Bad:**

```markdown
This is **really** important to understand.
```

Bold is for _signal_, not _volume_.

#### Combining Styles

You can layer these techniques, but don't go overboard.

**Example:**

```markdown
The best agents aren't using ~~elaborate multi-agent orchestration~~ _fancy_ architectures.
They're using `while(tool_use)` loops with exceptional context engineering.
```

Use sparingly. The goal is personality, not chaos.

## Content Structure

### Opening

- Start with the core insight or problem
- No long introductions
- Hook immediately

### Body

- One idea per paragraph
- Use questions to transition between concepts
- Externalize tangential thoughts to blockquotes
- Keep paragraphs short (2-4 sentences)

### Closing

- End with action or implication
- No summaries of what was just said
- Leave readers with something to think about

## Technical Writing

### Code Examples

- Show real, working code
- No pseudocode unless absolutely necessary
- Add inline comments only when non-obvious
- Use syntax highlighting

### Terminology

- Be precise with technical terms
- Don't oversimplify for beginners
- Define terms once, then use them consistently
- Link to references for deep dives

## Examples

### ✅ Good Style

```markdown
# Context Engineering for AI Agents

The problem is simple: agents need the right information at the right time.

Why is this hard?

Context windows are limited. You can't load everything.
You need to choose what matters.

> This is like search, but harder—you don't know what you're
> looking for until the agent needs it.

The solution has three parts:

1. **Semantic retrieval** — Find relevant code/docs
2. **Ranking** — Order by importance
3. **Pruning** — Remove noise

Each step filters information. The goal: maximum signal, minimum tokens.
```

### ❌ Bad Style

```markdown
# An Introduction to Context Engineering for AI Agents

In this blog post, I'm going to talk about context engineering, which is
really interesting and important for building better AI agents. Let me start
by explaining what context engineering is...

As we all know, AI agents are becoming more and more popular these days,
and with that comes a lot of challenges. One of the biggest challenges
(in my humble opinion) is definitely context engineering.

So what exactly is context engineering? Well, let me break it down for you...
```

## Checklist Before Publishing

- [ ] Every paragraph has a clear purpose
- [ ] Removed all filler words (just, really, very, actually, basically)
- [ ] Used blockquotes for externalized thoughts
- [ ] Questions are direct and answered immediately
- [ ] No marketing speak or hype
- [ ] Code examples are real and tested
- [ ] Title is specific and accurate
- [ ] Opening sentence hooks immediately
- [ ] Strikethrough used sparingly (max 1-2 times)
- [ ] Italics used for emphasis/sarcasm, not overused
- [ ] Bold used for concepts, not emphasis

## Voice Examples

**Instead of:** "I think maybe we could consider..."  
**Write:** "Use X."

**Instead of:** "It's really important to understand that..."  
**Write:** "Context size determines performance."

**Instead of:** "This is just my opinion, but..."  
**Write:** "The right approach is..."

**Instead of:** "Let me explain why this matters..."  
**Write:** "Why does this matter? [answer]"

---

Remember: **Direct thoughts, zero fluff.**
