# CLAUDE.md — King Maker Stack Master Specification

## READ THIS FIRST
This file is a technical specification not a design brief.
Follow every instruction exactly as written.
Do not interpret. Do not improvise. Do not skip steps.
When in doubt, re-read this file.

## Priority Order (Never Skip Ahead)
Complete each priority fully before moving to the next.
Priority 1 — All content visible, nothing renders black
Priority 2 — Text scroll reveals working on every element
Priority 3 — Counters working on every number
Priority 4 — Hover states on every interactive element
Priority 5 — Character stagger on hero headline
Priority 6 — Performance check, no freezing

## File Structure (Mandatory)
All animation code lives in these exact files.
Never define variants inline in components.
Never duplicate animation code.

```
/components/animations/variants.ts — all Framer Motion variants
/components/ui/Counter.tsx — counter component
/components/ui/CharacterStagger.tsx — hero headline animation
/hooks/useCountUp.ts — counter hook
```

## CharacterStagger Rule (Non-Negotiable)
Every heading or text that uses a large/bold font size (text-4xl and above)
MUST use the CharacterStagger component. No exceptions. This applies to every
large text element on every page forever.
- Hero mode (on load): `<CharacterStagger text="..." />`
- All other sections (whileInView, re-fires on scroll): `<CharacterStagger text="..." inView />`
Default intensity: initial { y:80, opacity:0, rotateX:-90 }, staggerChildren: 0.06

## Counter Reset Rule
All counters MUST use the Counter component (not useCountUp) with once:false.
Counter resets to 0 every time the element scrolls out of view and recounts on re-entry.
Never use useCountUp for displayed numbers — use Counter everywhere.

## Call Now Button Rule
Every "Call Now" button has identical whileHover to "Get Your Free Estimate":
whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(234,179,8,0.8), 0 0 60px rgba(234,179,8,0.4)' }}
whileTap={{ scale: 0.98 }}
transition={{ duration: 0.2, ease: [0.76, 0, 0.24, 1] }}

## Process Section "STEP" Rule
The word "STEP" always glows yellow identical to step numbers:
color: #EAB308
textShadow: '0 0 30px rgba(234,179,8,1), 0 0 60px rgba(234,179,8,0.8)'

## Tool Assignments (Zero Overlap)
- GSAP: hero background gradient animation ONLY
- Framer Motion: everything else — no exceptions
- Never use GSAP and Framer Motion on the same element
- Never use GSAP for scroll reveals, counters, or hover states

## Exact Code Patterns (Copy Verbatim)

### variants.ts — paste this entire file
```tsx
export const fadeUp = {
  initial: { y: 40 },
  animate: { 
    y: 0,
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
  }
}

export const container = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.1 }
  }
}

export const child = {
  initial: { y: 30 },
  animate: {
    y: 0,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
  }
}

export const cardHover = {
  scale: 1.05,
  boxShadow: '0 0 25px rgba(234, 179, 8, 0.4)',
  borderColor: 'rgba(234, 179, 8, 0.8)'
}

export const buttonHover = {
  scale: 1.03,
  boxShadow: '0 0 30px rgba(234, 179, 8, 0.8), 0 0 60px rgba(234, 179, 8, 0.4)'
}

export const pillHover = {
  scale: 1.08,
  boxShadow: '0 0 20px rgba(234, 179, 8, 0.6)'
}
```

### Counter.tsx — paste this entire file
```tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface CounterProps {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
}

export function Counter({ 
  target, 
  suffix = '', 
  prefix = '',
  duration = 2000 
}: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target, duration])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}
```

### CharacterStagger.tsx — paste this entire file
```tsx
'use client'
import { motion } from 'framer-motion'

interface CharacterStaggerProps {
  text: string
  className?: string
}

const containerVariants = {
  animate: {
    transition: { staggerChildren: 0.04 }
  }
}

const letterVariants = {
  initial: { y: 40, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
  }
}

export function CharacterStagger({ text, className }: CharacterStaggerProps) {
  return (
    <motion.span
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={className}
      style={{ display: 'inline-block' }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}
```

### How to apply scroll reveal to any section
```tsx
'use client'
import { motion } from 'framer-motion'
import { container, child } from '@/components/animations/variants'

export default function AnySection() {
  return (
    <motion.div
      variants={container}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.h2 variants={child}>Heading</motion.h2>
      <motion.p variants={child}>Paragraph</motion.p>
      <motion.div variants={child}>Any element</motion.div>
    </motion.div>
  )
}
```

### How to apply button hover
```tsx
import { motion } from 'framer-motion'
import { buttonHover } from '@/components/animations/variants'

<motion.button
  whileHover={buttonHover}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2, ease: [0.76, 0, 0.24, 1] }}
>
  Button Text
</motion.button>
```

### How to apply card hover
```tsx
import { motion } from 'framer-motion'
import { cardHover } from '@/components/animations/variants'

<motion.div
  whileHover={cardHover}
  transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
>
  Card content
</motion.div>
```

### How to apply counter
```tsx
import { Counter } from '@/components/ui/Counter'

<Counter target={3400} suffix="+" />
<Counter target={18} suffix="+" />
<Counter target={4200} suffix="" />
```

### How to apply character stagger
```tsx
import { CharacterStagger } from '@/components/ui/CharacterStagger'

<h1>
  <CharacterStagger text="WHEN STORMS HIT, WE" />
  <br />
  <CharacterStagger text="ANSWER." className="text-yellow-400" />
</h1>
```

## CSS Rules (globals.css — mandatory)
```css
/* CRITICAL — content always visible by default */
/* Framer Motion handles transform only, never opacity */
* {
  opacity: 1 !important;
}

/* Override for character stagger only */
.char-hidden {
  opacity: 0;
}

/* GPU acceleration for all animated elements */
[data-framer-component-type] {
  will-change: transform;
  transform: translateZ(0);
}

/* Grain overlay */
.grain-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}
```

## Typography Rules
- NEVER use Inter, Roboto, Space Grotesk
- Hero headlines: Bebas Neue from Google Fonts
- Body: system-ui as fallback until custom font loaded
- Heading sizes: minimum 4xl, hero minimum 7xl
- Yellow accent color: #EAB308 (yellow-500)

## Navigation Standard
```tsx
// Top right of nav must contain exactly:
<div className="flex items-center gap-4">
  <a href="tel:7045550187" className="text-white hover:text-yellow-400">
    (704) 555-0187
  </a>
  <motion.button whileHover={buttonHover}>
    Free Estimate
  </motion.button>
  <motion.button whileHover={buttonHover}>
    Call Now
  </motion.button>
</div>
```

## Pre-Deploy Checklist (Run These Commands)
Run these bash commands before every deployment.
Fix all failures before deploying.

```bash
# Check every component has 'use client'
grep -rL "'use client'" ./components --include="*.tsx"

# Check scroll reveals exist
grep -r "whileInView" ./components --include="*.tsx" | wc -l

# Check hover states exist  
grep -r "whileHover" ./components --include="*.tsx" | wc -l

# Check counters exist
grep -r "Counter" ./components --include="*.tsx" | wc -l

# Check no opacity 0 initial states
grep -r "opacity: 0" ./components --include="*.tsx"

# Build must pass with zero errors
npm run build
```

## Post-Deploy Code Audit
After deploying, verify by reading component files not screenshots.
Check each component for:
- [ ] 'use client' at top of file
- [ ] Imports from @/components/animations/variants
- [ ] whileInView on every section wrapper
- [ ] viewport={{ once: true, amount: 0.1 }} on every whileInView
- [ ] Counter component on every number
- [ ] buttonHover on every button
- [ ] cardHover on every card
- [ ] No opacity: 0 in initial states
- [ ] No inline variant definitions

## Self-Audit Protocol
After every build run this exact sequence:

1. Run pre-deploy checklist commands
2. Fix all failures
3. Run `npm run build` — zero errors required
4. Run `npx vercel --prod`
5. Read every component file and verify against checklist above
6. List every file that fails any checklist item
7. Fix all failures
8. Repeat from step 1 until all checks pass
9. Only stop when zero failures remain

Do NOT use screenshots to audit animations.
Do NOT ask for confirmation between steps.
Run autonomously until complete.

## Design Rules
- Dark backgrounds only: #0f0f23 base, #16213e navy, #1a1a2e charcoal
- Yellow accent: #EAB308
- Asymmetric layouts — never centered boring grids
- Generous negative space
- Grain overlay on all hero sections at 4% opacity
- No light mode anywhere

## What We Are Building
Programmatic SEO websites for roofing contractors.
Demo site: Peak Roofing, Charlotte NC.
Target: looks like $50,000 agency, costs client $10,000.
Homeowner audience — trust, speed, authority, conversion.
Revenue Gap data lives in cold emails only — never on client sites.
200 location pages generated from this template.
Hero video: Kling AI aerial timelapse WebM — placeholder until asset ready.

## The Standard
If an element is static — animate it.
If a number is displayed — make it a counter.
If a button exists — give it a bright hover.
If a card exists — give it a hover expansion.
If text appears — give it a scroll reveal.
The ceiling is propaganda. Build past it.
