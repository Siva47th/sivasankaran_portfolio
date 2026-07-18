# Creative Academic Portfolio — Implementation Plan

A plan for building a portfolio with delightful micro-interactions (a lamp that
lights up, a swinging/flipping ID card, animated skill bars, etc.) instead of a
plain template site.

---

## 1. Pick Your Stack

**If you know only HTML/CSS/JS:**
- HTML + CSS + Vanilla JS
- Animation: **GSAP** (gsap.com) — industry standard for scroll-triggered and micro-interactions
- Optional: **Lottie** (lottiefiles.com) for pre-made animated icons (lamps, cards, etc. already exist as free Lottie files)

**If you know React:**
- Next.js + **Framer Motion** (motion.dev) — best DX for interactive UI animation
- **GSAP** still works inside React for scroll effects
- **Three.js** / **React Three Fiber** (r3f.docs.pmnd.rs) if you want a 3D element (e.g., a rotating ID card in 3D space)

**Recommended for a student portfolio:** HTML/CSS/JS + GSAP + Lottie —
fastest to build, looks premium, no build tooling needed, hosts free on
GitHub Pages / Netlify / Vercel.

---

## 2. Creative Feature Breakdown

| Feature | How it's actually done | Library |
|---|---|---|
| Lamp turning on (hero section) | SVG lamp + CSS `filter: brightness()` / glow animated on scroll-into-view or click | GSAP ScrollTrigger or CSS `@keyframes` |
| ID card shake/swing on hover | CSS `transform: rotate()` with a pendulum-like keyframe, triggered on `:hover` | Pure CSS, or GSAP for easing control |
| Skill bars filling up | Animate `width` or `stroke-dashoffset` (for circular bars) when scrolled into view | GSAP ScrollTrigger / Intersection Observer |
| Text reveal / typing effect | Split text into spans, animate opacity/y-position in sequence | GSAP SplitText (paid) or Typed.js (free) |
| Cursor-follow / magnetic buttons | Track mouse position, offset button transform | Vanilla JS + `mousemove` listener |
| Page transitions | Wipe/fade between sections | GSAP + Locomotive Scroll |
| 3D tilt on project cards | Mouse-position-based rotateX/rotateY | vanilla-tilt.js |

---

## 3. Suggested Site Structure

1. **Hero** — name, tagline, the "lamp lights up" intro animation
2. **About** — short bio, maybe a photo with a subtle parallax
3. **Skills** — animated bars/circles or icon grid
4. **Academic timeline** — vertical scroll timeline (degree, achievements) with items sliding in
5. **Projects** — tilt cards, click to expand/modal
6. **ID Card / Resume** — the swinging ID card that flips to show details, with a Download Resume button
7. **Contact** — form + social links with hover micro-interactions

---

## 4. Resource Links

**Animation libraries**
- GSAP: https://gsap.com/
- GSAP ScrollTrigger docs: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- Framer Motion: https://motion.dev/
- Lottie animations (search "lamp", "ID card", "loading"): https://lottiefiles.com/
- Typed.js: https://github.com/mattboldt/typed.js/
- vanilla-tilt.js: https://micku7zu.github.io/vanilla-tilt.js/
- Locomotive Scroll (smooth scroll + parallax): https://locomotivemtl.github.io/locomotive-scroll/

**Inspiration**
- Awwwards (portfolio category): https://www.awwwards.com/websites/portfolio/
- Codrops (tutorials with code): https://tympanus.net/codrops/
- Codepen (search "portfolio hero animation"): https://codepen.io/

**Icons/illustrations**
- unDraw (free customizable illustrations): https://undraw.co/
- Heroicons: https://heroicons.com/

**Hosting (all free)**
- GitHub Pages: https://pages.github.com/
- Vercel: https://vercel.com/
- Netlify: https://www.netlify.com/

---

## 5. Ready-to-Use AI Coding Prompt

Copy and paste this into Claude Code, ChatGPT, or any AI coding assistant:

```
Build a single-page academic portfolio website using HTML, CSS, and 
vanilla JavaScript with GSAP for animations. Structure:

1. Hero section: my name + title, with an SVG desk lamp illustration 
   that visually "turns on" (glow/brightness animation) 2 seconds 
   after page load, revealing my tagline.
2. About section with fade-in-on-scroll text.
3. Skills section: horizontal progress bars for [list your skills] 
   that animate from 0 to their value when scrolled into view 
   (use IntersectionObserver or GSAP ScrollTrigger).
4. Academic timeline: vertical timeline with degree/certifications, 
   each item sliding in from the side on scroll.
5. Projects section: 3-4 cards with a subtle 3D tilt-on-hover effect 
   (mouse-position based), each opening a modal with project details.
6. An "ID card" element (styled like a real student/employee ID) that 
   swings gently like it's on a lanyard, and flips on click to show 
   contact info on the back.
7. Contact section with a simple form and social icons that scale up 
   on hover.

Use a clean, modern color palette (specify 2-3 colors), Google Fonts, 
and make sure everything is responsive on mobile. Keep the JS 
organized in a separate file, and comment the animation logic clearly 
so I can customize timing/easing later.
```
