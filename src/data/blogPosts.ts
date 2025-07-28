export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "fourier-transforms-intuition",
    title: "Building Intuition for Fourier Transforms",
    excerpt: "Exploring the mathematical beauty behind one of the most powerful tools in signal processing, from first principles to practical applications.",
    content: `
# Building Intuition for Fourier Transforms

The Fourier transform is one of those mathematical tools that seems almost magical when you first encounter it. How can we decompose any signal into a sum of sines and cosines? Let's build some intuition.

## The Big Picture

At its core, the Fourier transform answers a simple question: "What frequencies are present in this signal?" It's like having a mathematical prism that breaks down complex waveforms into their constituent frequencies.

## Starting Simple: Periodic Functions

Let's start with a simple periodic function. Consider:

\`\`\`
f(t) = sin(2πt) + 0.5*sin(4πt)
\`\`\`

This function is clearly the sum of two sine waves:
- One with frequency 1 Hz
- Another with frequency 2 Hz and half the amplitude

The Fourier transform will reveal exactly these two frequency components.

## The Mathematics

The continuous Fourier transform is defined as:

\`\`\`
F(ω) = ∫_{-∞}^{∞} f(t) e^{-iωt} dt
\`\`\`

That complex exponential e^{-iωt} is the key. Using Euler's formula:

\`\`\`
e^{-iωt} = cos(ωt) - i*sin(ωt)
\`\`\`

We're essentially correlating our signal with complex sinusoids at different frequencies.

## Practical Applications

Fourier transforms are everywhere:

1. **Audio processing**: Analyzing frequency content of music
2. **Image processing**: JPEG compression uses DCT (a cousin of FFT)
3. **Communication**: Modulation and demodulation
4. **Quantum mechanics**: Wave-particle duality

## Implementation Notes

When implementing FFTs, remember:
- Input size should be a power of 2 for optimal performance
- Windowing reduces spectral leakage
- Zero-padding can improve frequency resolution

The beauty of Fourier transforms lies in their universality. Whether you're analyzing brain signals, compressing images, or solving differential equations, this mathematical tool keeps showing up.

*Next time: We'll explore the discrete Fourier transform and dive into some Python implementations.*
    `,
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["mathematics", "signal-processing", "fourier"],
    category: "math"
  },
  {
    slug: "rust-memory-safety",
    title: "Why Rust's Ownership Model Makes Memory Safety Elegant",
    excerpt: "Diving deep into Rust's ownership system and how it eliminates entire classes of bugs at compile time without sacrificing performance.",
    content: `
# Why Rust's Ownership Model Makes Memory Safety Elegant

Coming from languages like C++ or Python, Rust's ownership model can feel restrictive at first. But once you understand the elegance behind it, you'll appreciate how it eliminates entire classes of bugs while maintaining zero-cost abstractions.

## The Problem with Manual Memory Management

In C++, we constantly juggle pointers and worry about:
- Use after free
- Double free
- Memory leaks
- Data races in concurrent code

Garbage collected languages solve this but introduce runtime overhead and unpredictable pauses.

## Rust's Solution: Ownership

Rust introduces three core concepts:

### 1. Ownership
Every value has exactly one owner. When the owner goes out of scope, the value is dropped.

\`\`\`rust
fn main() {
    let s = String::from("hello");  // s owns the string
    println!("{}", s);
}  // s goes out of scope, string is dropped
\`\`\`

### 2. Borrowing
You can borrow a reference without taking ownership:

\`\`\`rust
fn print_length(s: &String) {  // borrowing, not owning
    println!("Length: {}", s.len());
}

fn main() {
    let s = String::from("hello");
    print_length(&s);  // borrow s
    println!("{}", s);  // s is still valid!
}
\`\`\`

### 3. Lifetimes
The compiler ensures references don't outlive the data they point to:

\`\`\`rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
\`\`\`

## Zero-Cost Abstractions

The beauty is that all these checks happen at compile time. The generated assembly is as efficient as hand-optimized C, but with mathematical guarantees about memory safety.

## Real-World Impact

I've been using Rust for systems programming for two years now. The number of segfaults and memory-related bugs I encounter is essentially zero. The compiler catches these issues before they become runtime problems.

This shift in mindset—from debugging memory issues to designing with ownership in mind—has made me a better programmer overall.

*Want to learn more? Check out the Rust Book and try implementing some data structures from scratch.*
    `,
    date: "2024-01-08",
    readTime: "6 min read",
    tags: ["rust", "systems-programming", "memory-safety"],
    category: "tech"
  },
  {
    slug: "jazz-harmony-mathematics",
    title: "The Mathematics Behind Jazz Harmony",
    excerpt: "Exploring how mathematical concepts like group theory and modular arithmetic appear naturally in jazz chord progressions and improvisation.",
    content: `
# The Mathematics Behind Jazz Harmony

Jazz and mathematics share a surprising amount of common ground. From the physics of sound waves to the abstract algebra of chord progressions, mathematical concepts permeate every aspect of jazz harmony.

## Frequency Ratios and Consonance

At the most fundamental level, harmony is about frequency ratios. When we hear two notes as consonant (pleasant together), their frequencies often form simple ratios:

- Octave: 2:1
- Perfect fifth: 3:2  
- Major third: 5:4

These ratios create reinforcement patterns in the harmonic series, which our ears perceive as stability.

## The Circle of Fifths as Modular Arithmetic

The circle of fifths is essentially arithmetic modulo 12. Moving by perfect fifths:

\`\`\`
C → G → D → A → E → B → F# → C# → G# → D# → A# → F → C
\`\`\`

This is equivalent to repeatedly adding 7 (semitones) modulo 12:

\`\`\`
0 → 7 → 2 → 9 → 4 → 11 → 6 → 1 → 8 → 3 → 10 → 5 → 0
\`\`\`

## Group Theory in Chord Substitutions

Jazz chord substitutions often follow group-theoretic principles. The tritone substitution, for example, works because:

1. Dominant 7th chords contain a tritone (diminished 5th)
2. Two chords a tritone apart share the same tritone interval
3. This creates a symmetry that sounds harmonically logical

For G7 → C, we can substitute D♭7 → C because:
- G7 contains B and F (tritone)
- D♭7 contains C and F♯ (enharmonically the same tritone)

## Modal Interchange and Parallel Universes

When jazz musicians use modal interchange, they're essentially exploring parallel harmonic universes. Each mode represents a different "rotation" of the same interval pattern:

- Ionian: W-W-H-W-W-W-H
- Dorian: W-H-W-W-W-H-W
- Phrygian: H-W-W-W-H-W-W

This systematic exploration of related but distinct harmonic spaces mirrors how mathematicians study different geometric spaces with similar underlying structures.

## Improvisation as Constraint Satisfaction

Jazz improvisation can be viewed as a real-time constraint satisfaction problem:

- **Harmonic constraints**: Notes must fit the current chord
- **Melodic constraints**: Lines should have coherent direction
- **Rhythmic constraints**: Phrases must align with the meter
- **Stylistic constraints**: Must sound like jazz!

Master improvisers internalize these constraints so deeply that they can navigate them intuitively while maintaining creative expression.

## Fractal Patterns in Bebop

Bebop lines often exhibit self-similar patterns at different scales—a hallmark of fractals. Charlie Parker's lines contain motivic fragments that repeat and transform across multiple octaves and chord changes.

The mathematics doesn't diminish the art; it reveals the deep structural beauty that makes jazz so compelling to both performers and listeners.

*Next: I'll explore how computers can analyze jazz solos using machine learning...*
    `,
    date: "2024-01-02",
    readTime: "7 min read",
    tags: ["music", "mathematics", "jazz", "harmony"],
    category: "music"
  },
  {
    slug: "building-habit-tracker",
    title: "Building a Habit Tracker: Design Decisions and Trade-offs",
    excerpt: "Documenting the journey of building a simple but effective habit tracking app, including the technical choices and UX considerations.",
    content: `
# Building a Habit Tracker: Design Decisions and Trade-offs

I recently built a habit tracker app and wanted to document the key decisions and trade-offs I encountered. Sometimes the most valuable lessons come from the small, seemingly mundane choices.

## The Core Problem

Habit tracking apps are deceptively simple on the surface but involve interesting challenges:

1. **Data persistence**: How to store streak information reliably
2. **Motivation mechanics**: Visual feedback without gamification overload  
3. **Flexibility vs. simplicity**: Supporting different habit types without complexity bloat

## Technical Architecture

I chose a progressive web app (PWA) approach:

\`\`\`
Frontend: React + TypeScript + Vite
Storage: IndexedDB (via Dexie.js)
Deployment: GitHub Pages
Offline: Service Worker for caching
\`\`\`

### Why PWA over Native?

- **Cross-platform**: Works on iOS, Android, desktop
- **No app store friction**: Install directly from browser
- **Offline-first**: Critical for habit tracking consistency
- **Lightweight**: No heavy framework overhead

## Data Model Challenges

The trickiest part was modeling habit completion:

\`\`\`typescript
interface HabitCompletion {
  habitId: string;
  date: string;  // ISO date string
  completed: boolean;
  notes?: string;
}
\`\`\`

Key decisions:

1. **Explicit vs. implicit tracking**: I chose explicit—you must mark habits as complete rather than assuming completion after a time window.

2. **Timezone handling**: Store dates as local date strings, not UTC timestamps. A habit completed at 11 PM should count for "today," not tomorrow in UTC.

3. **Partial completion**: Initially supported partial completion (0-100%), but removed it for simplicity. Binary completion reduces decision fatigue.

## UX Lessons

### Visual Design
- **Minimal color palette**: Green for completed, gray for pending, red for missed
- **Clear streaks**: Current streak number prominently displayed
- **Calendar view**: Monthly grid shows patterns at a glance

### Interaction Design
- **One-tap completion**: Primary action should be effortless
- **Undo functionality**: Easy to accidentally tap; undo must be obvious
- **Bulk editing**: Sometimes you need to backfill multiple days

## The Streak Problem

Calculating streaks involves subtle edge cases:

\`\`\`typescript
function calculateStreak(completions: HabitCompletion[]): number {
  const sortedDates = completions
    .filter(c => c.completed)
    .map(c => c.date)
    .sort()
    .reverse();

  let streak = 0;
  let currentDate = new Date();
  
  for (const dateStr of sortedDates) {
    const date = new Date(dateStr);
    const daysDiff = Math.floor(
      (currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    if (daysDiff === streak) {
      streak++;
      currentDate = date;
    } else {
      break;
    }
  }
  
  return streak;
}
\`\`\`

Edge cases to consider:
- What if today isn't completed yet?
- How to handle different time zones?
- Should weekends count for "weekday only" habits?

## Performance Considerations

With IndexedDB storing thousands of completion records:

1. **Lazy loading**: Only load current month by default
2. **Debounced writes**: Don't save on every keystroke
3. **Cached calculations**: Memoize streak calculations
4. **Efficient queries**: Index by habitId and date

## What I'd Do Differently

1. **More user testing**: My assumptions about "simple" weren't always correct
2. **Better onboarding**: The app needs guided first-use experience
3. **Data export**: Users want to own their data
4. **Habit templates**: Common habits (exercise, reading) should have presets

## The Surprising Parts

- **Motivation mechanics**: Simple streak counters were more motivating than complex point systems
- **Timing matters**: When notifications fire dramatically affects engagement
- **Social features**: Users wanted private tracking, not social comparison

Building a habit tracker taught me that the hardest problems in software aren't always technical—they're understanding human behavior and motivation.

*Code is available on GitHub, and the app is deployed at habittracker.dev*
    `,
    date: "2023-12-28",
    readTime: "9 min read",
    tags: ["project", "web-development", "ux", "pwa"],
    category: "misc"
  }
];

export const getPostsByCategory = (category: string): BlogPost[] => {
  if (category === "all") return blogPosts;
  return blogPosts.filter(post => post.category === category);
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};