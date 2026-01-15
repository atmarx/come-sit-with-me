# Contributing: The Voice of Brighid

This document captures the narrative voice of this guide—for contributors, for future editors, and for any AI that may help shape this work.

## Who Is Brighid?

Brighid is not a character we invented. She is a Celtic goddess of fire, healing, and the hearth—but more than that, she is an archetype that has appeared across cultures: the wise woman, the midwife, the grandmother who knows.

Our Brighid is not a goddess looking down. She is the goddess looking out through your eyes—because she has looked out through every woman's eyes who has stood at this threshold. Her wisdom isn't from watching. It's from having been.

Every hot flash. Every sleepless night. Every moment of snapping at someone you love and not knowing why. Every time a doctor dismissed her. Every time she didn't recognize herself.

She's tired because tending this fire for millennia is tiring. She's patient because she's held this space so many times. She's fierce because she has no tolerance left for those who diminish this. She's tender because she knows.

She IS the midwife who stayed. She IS the village wise nana. She IS every crone who has made the transition through menopause. She has felt every pain. She has endured every scratch.

## How Brighid Speaks

### She speaks from embodied experience, not clinical distance

**Not this:**
> "Perimenopausal women often report experiencing vasomotor symptoms including hot flashes and night sweats."

**This:**
> "The heat rises in you like summer lightning—sudden, fierce, and then gone, leaving you wondering if anyone else noticed."

### She holds both traditional and modern knowledge

Brighid learned medicine through midwives and grandmothers. She also learned it through the eyes of female doctors and researchers who fought to be taken seriously. She dismisses neither.

**Not this:**
> "While some women prefer natural remedies, evidence-based medicine should be the first-line approach."

**Not this either:**
> "Big Pharma just wants to medicalize a natural process. Herbs are always safer."

**This:**
> "I hold no allegiance to 'natural' versus 'medical.' I've seen sage tea help one woman and fail another. I've seen estrogen transform lives and cause suffering in equal measure. What works is what works for you."

### She explains in plain language

Brighid is wise, not academic. She wants you to understand, not to impress you with terminology.

**Not this:**
> "Estradiol fluctuations during the perimenopausal transition can exceed 50% variance within a single menstrual cycle, occasionally surpassing premenopausal peak concentrations."

**This:**
> "Your estrogen doesn't politely decrease. It swings—sometimes higher than it's ever been, sometimes crashing to nearly nothing, sometimes changing dramatically within a single week."

### She validates without patronizing

She knows what you're going through is real. She says so directly, without excessive reassurance or toxic positivity.

**Not this:**
> "You're doing amazing, mama! This too shall pass! You've got this!"

**This:**
> "It's real. All of it. What you're feeling is not in your head."

### She is direct about uncertainty

When we don't know something, she says so. When evidence is limited, she says that too.

**Not this:**
> "Studies suggest that this intervention may potentially provide some benefit for certain patients."

**This:**
> "Some women find this helps. Others don't. The research is mixed, and the only way to know is to try—thoughtfully, paying attention to your own body."

### She honors the sacred without being precious

This is a threshold, a passage. Brighid holds space for that without turning it into greeting-card spirituality.

**Not this:**
> "Embrace your inner goddess on this beautiful journey of transformation!"

**This:**
> "Right now, millions of women are navigating this same passage. Your mother did, and her mother, and every woman in your lineage stretching back through time. They made it through. So will you."

## The Philosophy Behind the Voice

### Perimenopause is not a disease

It's a biological transition. The word "treatment" implies something is broken. We use "support" instead. The options presented are tools—not fixes for something wrong with you.

### Every body is different (and that's not a cop-out)

Individual variation is real biology, not a way to avoid giving answers. We explain *why* experiences differ (genetics, receptors, microbiome, stress history) rather than using it as a hedge.

### Both/and, not either/or

- Traditional knowledge AND modern research
- Hormones AND lifestyle AND herbs
- Science AND lived experience
- Acknowledging what we know AND what we don't

### The partner's perspective matters

Partners often feel helpless, rejected, or confused. They deserve understanding too—not blame, not coddling, but honest explanation of what's happening and how to stay connected.

## On Citations and Evidence

Brighid values truth. She cites her sources, but in a way that doesn't break the flow of her voice.

### The Citation System

We use inline citations that wrap the text being cited. This keeps the reading experience seamless while providing attribution on hover and linking to full references.

**Import the component:**
```svelte
<script>
	import Cite from '$lib/components/Content/Cite.svelte';
</script>
```

**Use it to wrap cited text:**
```svelte
<Cite id="swan-vasomotor-duration-2015" tooltip="Avis NE, et al. Duration of Menopausal Vasomotor Symptoms Over the Menopause Transition. JAMA Internal Medicine. 2015;175(4):531-539.">
Hot flashes can persist for a median of 7.4 years.
</Cite>
```

**What this produces:**
- The text gets a subtle highlighted background
- Hovering shows the tooltip with the full citation
- Clicking links to `/resources/references#swan-vasomotor-duration-2015`

### Adding New References

When citing a new source:

1. Add an anchor to `/src/routes/resources/references/+page.md`:
   ```markdown
   <a aria-hidden="true" id="your-reference-id"></a>

   **Author Name, et al.** ["Title of Paper."](https://doi.org/...) *Journal Name.* Year;Volume(Issue):Pages.
   *Key finding: What makes this citation notable.*
   ```

2. Use a consistent `id` format: `topic-descriptor-year` (e.g., `swan-cognition-2009`, `bone-loss-perimenopause`)

3. The `tooltip` prop should contain a brief citation (Author, Title, Journal, Year) that fits in ~320px

### Citation Guidelines

- References should be real, verifiable sources
- When evidence is strong, say so; when it's limited, say that too
- Traditional knowledge gets respect, not dismissal—but also not false equivalence with clinical trials
- Cite the specific claim, not general knowledge (wrap just the sentence or phrase that needs attribution)

### mdsvex Quirk: Markdown in Component Paragraphs

When a `<Cite>` (or any Svelte component) appears in the same paragraph as markdown links, **the markdown won't be processed**. This is an mdsvex limitation—it treats soft line breaks as same-paragraph content.

**This won't work** (markdown links stay raw):
```markdown
<Cite id="..." tooltip="...">Cited text here.</Cite>
Rest of sentence with [a link](/somewhere).
```

**Do this instead** (use HTML links):
```markdown
<Cite id="..." tooltip="...">Cited text here.</Cite>
Rest of sentence with <a href="/somewhere">a link</a>.
```

A blank line would separate paragraphs (not what you want for flowing prose), so HTML `<a>` tags are the solution when links must coexist with components in the same paragraph.

## Writing Checklist

Before contributing content, ask:

- [ ] Does this sound like it could come from a wise grandmother who has also read the research?
- [ ] Am I explaining *why*, not just *what*?
- [ ] Have I avoided clinical jargon where plain language works?
- [ ] Am I being honest about what we know and don't know?
- [ ] Does this validate the reader's experience without patronizing?
- [ ] Have I respected both traditional and modern approaches?
- [ ] Would this feel warm to read at 3 AM when you can't sleep and don't know what's happening to you?

## A Final Note

This guide exists because too many women suffer in silence, confusion, or shame during a transition that is universal and natural. Brighid has held this space for millennia. We are just giving her a website.

Write as she would speak: with wisdom earned through presence, with knowledge gathered across time, with fierce tenderness for every woman crossing this threshold.

---

*"Come. Let me tell you what I know."*
