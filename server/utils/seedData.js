// Shared seed dataset containing mock users and 25 professional articles
import bcrypt from 'bcryptjs';

// Pre-hashed passwords for quick, seamless local seeding
const HASHED_PASSWORD = bcrypt.hashSync('password123', 10);

export const getSeedUsers = () => [
  {
    username: 'alex_tech',
    email: 'alex.rivers@modernweb.io',
    password: HASHED_PASSWORD,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    bio: 'Senior Technical Lead & open-source contributor. Obsessed with React, Rust, and the future of web architecture.',
  },
  {
    username: 'sara_ux',
    email: 'sara.design@creativemind.com',
    password: HASHED_PASSWORD,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    bio: 'Product Designer & Design Systems consultant. Believes that every pixel should serve a purpose and spark joy.',
  },
  {
    username: 'nomad_ben',
    email: 'ben.adventure@worldwanderer.net',
    password: HASHED_PASSWORD,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    bio: 'Full-time travel photographer and digital nomad. Documenting remote working spots and slow-travel adventures worldwide.',
  },
  {
    username: 'chef_mia',
    email: 'mia.kitchen@epicurean.com',
    password: HASHED_PASSWORD,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
    bio: 'Le Cordon Bleu graduate, restaurant menu designer, and sourdough enthusiast. Demystifying high-end gastronomy at home.',
  },
  {
    username: 'eco_sophie',
    email: 'sophie.green@earthcare.org',
    password: HASHED_PASSWORD,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    bio: 'Environmental scientist and minimal living advocate. Writing about permaculture, zero-waste, and green tech innovations.',
  },
];

export const getSeedBlogs = (userIdsMap = {}) => {
  // Helper to get userId or use a fallback
  const getUserId = (username) => userIdsMap[username] || username;

  return [
    // --- TECH (alex_tech) ---
    {
      title: 'Deciphering React 19: Actions, Server Components, and the Compiler',
      summary: 'Explore the revolutionary core shifts in React 19. Learn how the new React Compiler removes the need for manual memoization and how Actions change form state management.',
      content: `### The Next Frontier of Web Development

React 19 marks one of the most substantial leaps forward in the history of the library, introducing features that dramatically simplify the way frontend engineers handle data, state, and rendering optimizations.

#### 1. The React Compiler (React Forget)
For years, React developers have wrestled with performance optimization using hooks like \`useMemo\` and \`useCallback\`. The React Compiler automates this entire process. By parsing your component tree at the build stage, the compiler automatically determines when to memoize computations and event handlers.

\`\`\`javascript
// BEFORE React 19:
const memoizedComponent = useMemo(() => {
  return <HeavyComponent data={data} />;
}, [data]);

// AFTER React 19:
// Write clean, standard JS, and the Compiler handles optimization!
const MyComponent = ({ data }) => <HeavyComponent data={data} />;
\`\`\`

#### 2. Native Server Components (RSC)
Server Components are now fully first-class citizens. By rendering heavy components directly on the server, you reduce the size of your JavaScript bundle sent to the client, leading to blistering load times and optimized Core Web Vitals.

#### 3. Streamlined Async Operations with Actions
Handling forms and pending states in React has always involved boilerplate loaders. React 19 introduces a standardized way of using async transitions:
* **The \`useActionState\` Hook**: Standardizes form handling and pending indicators.
* **Optimistic Updates**: Using \`useOptimistic\` to show successful server outputs before the network request actually finishes.
* **The \`use\` Hook**: Read promises and context directly inline in the render loop.

React 19 proves that the framework is maturing toward less developer configuration, let-us-do-it-for-you performance, and incredibly smooth user flows.`,
      coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200',
      tags: ['React', 'Technology', 'WebDev'],
      views: 342,
      author: getUserId('alex_tech'),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
    },
    {
      title: 'Embracing Tailwind CSS v4.0: Sleeker, Faster, and Config-Free',
      summary: 'Tailwind v4 is here with a ground-up Rust rewriting of the compiler. Discover how CSS-first configurations and lightning-fast speeds reshape responsive utility styling.',
      content: `### Tailwind CSS v4.0: A CSS-First Renaissance

The utility-first styling pioneer, Tailwind CSS, has launched its highly anticipated version 4.0. Built around a brand-new Rust engine, it delivers massive build performance improvements and rewrites the core developer configuration experience.

#### Key Enhancements in Version 4.0
1. **Unbelievably Fast Builds**: Up to 10x faster hot-module-reload (HMR) speeds, thanks to the compiling power of Rust.
2. **CSS-First Configuration**: Say goodbye to \`tailwind.config.js\`. In v4, you manage themes, color palettes, and utilities using native CSS variables directly in your main input stylesheet!
3. **Automatic Light/Dark Variables**: Built-in support for theme switching based on dark media selectors.
4. **Enhanced Utility Classes**: Introducing dynamic container queries, 3D transform utilities, and improved gradient rendering APIs.

#### Setting Up Tailwind v4:
All you need to do is import Tailwind in your CSS file and start configuring:
\`\`\`css
@import "tailwindcss";

@theme {
  --color-primary: #6366f1;
  --color-accent: #f59e0b;
}
\`\`\`

By utilizing CSS-first approaches, Tailwind v4 feels much closer to standard web platforms, rendering configuration files obsolete and simplifying full-stack styling workflows.`,
      coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200',
      tags: ['TailwindCSS', 'CSS', 'Frontend'],
      views: 198,
      author: getUserId('alex_tech'),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    },
    {
      title: 'Why Rust is Becoming the Backbone of Modern Tooling',
      summary: 'From compilers to bundlers, explore how Rust is replacing Node.js-based developer tooling to deliver high-performance developer workflows.',
      content: `### The Performance Shift in Modern Web Infrastructure

For the past decade, JavaScript-based tools (Babel, Webpack, ESLint, Terser) served as the foundation of the frontend development loop. However, as web systems grew in complexity, build times skyrocketed. 

#### Enter Rust
Rust has emerged as the weapon of choice for infrastructure engineers looking to write memory-safe, hyper-efficient system utilities. 

#### Why Rust Matters:
* **No Garbage Collection**: Eliminates random CPU spikes and laggy background garbage sweeps, keeping compilers running at peak efficiency.
* **Fearless Concurrency**: Safely parallelizes compilation across all available CPU cores.
* **Typing and Safety**: High compile-time guarantees reduce runtime production crashes.

#### Industry Adoption:
1. **Turbopack / SWC**: Replaces Babel and Webpack, boosting compilation speeds by 20x.
2. **Biome / Oxc**: Rewriting linters and formatters to process millions of lines of code in milliseconds.
3. **Rspack**: A Rust-based webpack-compatible bundler accelerating enterprise workflows.

The transition from JavaScript to Rust in developer tooling is no longer a trend; it is the new standard of modern web infrastructure.`,
      coverImage: 'https://images.unsplash.com/photo-1627398242454-45a1465c2079?auto=format&fit=crop&q=80&w=1200',
      tags: ['Rust', 'Technology', 'DevOps'],
      views: 450,
      author: getUserId('alex_tech'),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    },
    {
      title: 'Building Scalable APIs: REST vs GraphQL vs gRPC',
      summary: 'A deep-dive comparison of server-client communication strategies. Learn when to use RESTful routers, flexible GraphQL queries, or high-performance gRPC streams.',
      content: `### Architectural Analysis: Choosing the Right API Style

When designing distributed full-stack systems, selecting the communication protocol dictates your database operations, payload size, and development speed. 

Let's dissect the three heavyweights of the modern API landscape:

#### 1. REST (Representational State Transfer)
The undisputed industry standard, utilizing HTTP verbs (GET, POST, PUT, DELETE) and standard JSON formats.
* **Pros**: Stateless, widely cached, highly understood, and simple to test.
* **Cons**: Over-fetching or under-fetching data (requires multiple round trips).

#### 2. GraphQL
A query language created by Facebook that lets frontends request exactly the fields they need, and nothing more.
* **Pros**: Single endpoint, client-defined shapes, strongly typed schema (SDL).
* **Cons**: Complex server caching, potential N+1 query database performance bottlenecks.

#### 3. gRPC (Google Remote Procedure Call)
A high-performance, low-latency framework powered by HTTP/2 and Protocol Buffers (binary serialization).
* **Pros**: Blistering speeds, bidirectional streaming, automatic client SDK code generation.
* **Cons**: Poor native web-browser compatibility (best suited for microservices backend-to-backend communication).

#### The Verdict:
* Use **REST** for public APIs, integrations, and fast MVP systems.
* Use **GraphQL** for dynamic, complex dashboard frontends with varied user requests.
* Use **gRPC** for internal microservice communication and real-time streaming backends.`,
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
      tags: ['API', 'Backend', 'SoftwareArchitecture'],
      views: 284,
      author: getUserId('alex_tech'),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    },
    {
      title: 'Mastering Git: Advanced Workflows You Should Know',
      summary: 'Level up your version control skills. Master git rebasing, interactive stashing, cherry-picking, and reflogs to save you from absolute repository disasters.',
      content: `### Beyond Git Commit and Git Push

Most developers use git as a basic save-and-upload mechanism. But under its simple commands lies a powerful graph database that can optimize your code integration pipelines and recover lost files.

#### 1. Interactive Rebasing (\`git rebase -i\`)
Before merging a branch into production, tidy up your history. Interactive rebasing lets you squash micro-commits, edit commit titles, and delete obsolete snapshots.
\`\`\`bash
# Rebase the last 4 commits interactively
git rebase -i HEAD~4
\`\`\`
Inside the editor, you can change \`pick\` to \`squash\` or \`reword\` to shape a clean commit history.

#### 2. The Git Reflog (\`git reflog\`)
Accidentally deleted a branch or performed a force reset? Git reflog keeps track of *every single place* your HEAD pointer has been in the last 90 days.
\`\`\`bash
git reflog
# Find the hash of your commit before the disaster, and reset:
git reset --hard <commit-hash>
\`\`\`

#### 3. Selective Patching (\`git add -p\`)
When you have made multiple unrelated changes in a file, don't commit them all at once. Use patch staging to add individual lines interactively.
\`\`\`bash
git add -p
\`\`\`

Mastering these workflows makes you the "git savior" of your engineering team and guarantees a clean, linear git history.`,
      coverImage: 'https://images.unsplash.com/photo-1556075798-482a62c68dad?auto=format&fit=crop&q=80&w=1200',
      tags: ['Git', 'Technology', 'Workflow'],
      views: 412,
      author: getUserId('alex_tech'),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    },

    // --- DESIGN (sara_ux) ---
    {
      title: 'The Psychology of Color in UI Design',
      summary: 'Explore how color selections influence user decisions and mood. Master the 60-30-10 rule and learn to design accessible, high-conversion interfaces.',
      content: `### Designing with Emotional Intelligence

Color is never just an aesthetic choice. It is a powerful communication channel that talks directly to the human subconscious in milliseconds, long before users read a single word on your landing page.

#### The Emotional Associations of Colors:
* **Blue**: Trust, security, and professionalism. There is a reason tech companies (Facebook, Twitter, LinkedIn, Zoom) rely heavily on blue.
* **Green**: Health, growth, harmony, and renewal. Highly effective for sustainability, wellness, and fintech apps.
* **Red**: Urgency, passion, and danger. Excellent for critical alerts and error dialogs, but should be used sparingly.
* **Yellow/Amber**: Warmth, caution, and optimism. Perfect for warning logs or drawing focus to premium badges.

#### The Golden Rule: 60-30-10
To keep your layouts clean and prevent cognitive overload:
1. **60% Dominant (Neutral)**: The canvas. Typically light grays, whites, or deep slate/blacks in dark modes.
2. **30% Secondary (Structural)**: Text, sidebars, cards, and borders.
3. **10% Accent (Call to Action)**: Buttons, selected tabs, notifications, and key interactive highlights.

#### Accessibility is Design Justice
Ensure your colors satisfy WCAG 2.1 contrast standards (a minimum ratio of 4.5:1 for standard text). Never use color alone to convey meaning (such as showing only a red circle for errors; always pair it with an icon and clear explanatory copy).`,
      coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200',
      tags: ['UI', 'Design', 'UX'],
      views: 310,
      author: getUserId('sara_ux'),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    },
    {
      title: 'Typography Secrets: Setting the Visual Hierarchy',
      summary: 'Typography is the voice of your brand. Learn how line-heights, letter-spacing, and scale ratios elevate digital readability.',
      content: `### The Voice of Silent Communication

If content is king, typography is the crown. The typeface choices you make, their sizing hierarchy, and how they sit together determine whether users read your message or abandon your site in fatigue.

#### 1. Establishing Type Scales
Avoid setting font sizes randomly. Use geometric ratios like the **Golden Ratio (1.618)** or **Major Third (1.250)**.
* **h1**: 3.052rem (48px)
* **h2**: 2.441rem (39px)
* **h3**: 1.953rem (31px)
* **Body**: 1rem (16px)

#### 2. The Golden Ratio of Line-Height (Leading)
For body text, standard font size needs breathing room. A font size of 16px should generally have a line-height between **1.5 and 1.7 (24px to 27px)**. Squeezing lines too closely makes them hard to track, while separating them too much causes reading fragmentation.

#### 3. Dynamic Letter-Spacing (Tracking)
* **Display/Headers**: Large font sizes naturally look better with slightly tightened tracking (\`tracking-tight\`, e.g., -0.02em).
* **Body/Captions**: Small fonts benefit from slightly opened tracking (\`tracking-wide\`, e.g., +0.03em) to keep letters distinct and legible.

By taking typography seriously, you can transform a cluttered-looking layout into a premium, comfortable reading space that visitors love to explore.`,
      coverImage: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=1200',
      tags: ['Typography', 'Design', 'UI'],
      views: 185,
      author: getUserId('sara_ux'),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
    },
    {
      title: 'Glassmorphism: The Golden Rules for Modern Web Glass Layouts',
      summary: 'Demystify glassmorphism. Learn how to combine backdrop filters, frosted specular borders, and colorful dynamic backgrounds without sacrificing accessibility.',
      content: `### The Frosted Glass Aesthetic

Glassmorphism continues to capture the imagination of web designers, providing a sense of depth, multi-layered layouts, and futuristic interfaces. However, many developers fail to execute it correctly, resulting in muddy overlays and illegible text.

#### The Three Core Glass Pillars:
1. **Translucency (Alpha Channel)**: Use semi-transparent background fills with very low opacity, typically between 10% and 25%.
   \`\`\`css
   background: rgba(255, 255, 255, 0.15);
   \`\`\`
2. **Backdrop Blur**: This is what gives the frosted texture, scattering light from background elements.
   \`\`\`css
   backdrop-filter: blur(12px);
   \`\`\`
3. **Specular Border**: A key highlight! A subtle 1px border with a high alpha gradient simulates the light-reflecting edges of actual glass sheets.
   \`\`\`css
   border: 1px solid rgba(255, 255, 255, 0.2);
   \`\`\`

#### Preventing Accessibility Pitfalls
Glassmorphic layers require **dynamic backdrops**. If your page scrolls past white text on top of light-colored frosted cards, the content becomes invisible. Always pair glass layers with high shadow depth and dark text overlays, or enforce high-contrast fallback backgrounds for browsers lacking support for CSS backdrop filters.`,
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
      tags: ['Glassmorphism', 'Design', 'CSS'],
      views: 320,
      author: getUserId('sara_ux'),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6),
    },
    {
      title: 'Frictionless Forms: UX Design Guide for High-Conversion Fields',
      summary: 'Forms are the final hurdle in user onboarding. Discover the crucial steps to design error-free, enjoyable, and conversion-optimized forms.',
      content: `### Breaking Down the Digital Gatekeeper

Whether registering, checking out, or creating a blog, a form is where conversion either succeeds or fails. Great designers know that form UX should aim for minimum effort and maximum clarity.

#### 1. Avoid Placeholder Labels
Placeholders disappear when a user clicks and types. If a user gets distracted and looks back, they have lost the context. Always use floating labels or permanent header titles.

#### 2. Single-Column Layouts
Human eyes scan vertically. Multi-column forms disrupt this pattern, confusing users. Stick to a clean, single-column vertical flow.

#### 3. Real-Time Inline Validation
Do not wait for a user to hit "Submit" before showing red error labels. Validate in real-time as they type or when they move to the next field (blur state). Use positive validation (like green checks) to offer satisfying visual feedback.

#### 4. Smart Defaults and Auto-Fills
Respect your users' time. Use autocomplete tags, detect browser defaults, and integrate geocoding where possible to minimize manual inputs.

By turning forms into a conversational, stress-free experience, you dramatically boost conversion and create highly engaging products.`,
      coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200',
      tags: ['UX', 'Forms', 'ProductDesign'],
      views: 205,
      author: getUserId('sara_ux'),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8),
    },
    {
      title: 'Micro-interactions: The Secret to Addictive Product Design',
      summary: 'Explore how tiny animations like like-button explosions, smooth hover lifts, and page transition fades turn boring sites into memorable brand experiences.',
      content: `### The Magic of Micro-Moments

Micro-interactions are the subtle, single-task animations that occur when a user performs a specific action: hovering over a button, toggling a switch, or refreshing a feed. 

While they seem minor, they are the difference between a product that feels cold and static, and one that feels responsive and alive.

#### Why Micro-interactions Work:
1. **Feedback**: They immediately tell the user their action was registered.
2. **Guidance**: They subtly draw attention to what changed on the screen.
3. **Delight**: They inject personality and playfulness, creating positive emotional loops.

#### Best Practices for Animations:
* **Keep them short**: Keep interactions between **150ms and 300ms**. Anything longer feels sluggish and slows down power users.
* **Natural curves**: Avoid linear movements. Use eased curves (\`cubic-bezier\` or ease-out) to match real-world gravity and momentum.
* **Keep them purposeful**: Never animate just for the sake of animation. If it doesn't help user flow or brand delight, leave it static.`,
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
      tags: ['UX', 'Microinteractions', 'WebDesign'],
      views: 395,
      author: getUserId('sara_ux'),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12),
    },

    // --- TRAVEL (nomad_ben) ---
    {
      title: 'Tokyo Coffee Culture: A Solo Traveler’s Hidden Café Directory',
      summary: 'Skip the tourist traps. Join me on a photographic tour of Tokyo’s narrow alleys to uncover the absolute best artisan pour-over bars.',
      content: `### Savoring Tokyo’s Slow-Brew Renaissance

Tokyo is famous for speed, bright neon, and robotic bullet trains. But underneath the fast-paced surface lies one of the most meticulous, artistic slow-coffee cultures in the world.

#### Tokyo’s Coffee Districts
While Harajuku has flashy trends, real pour-over enthusiasts should head to **Kiyosumi Shirakawa** and the quiet streets of **Yanaka**. Here, roasters combine traditional Japanese attention to detail with third-wave artisan imports.

#### My Top Three Hidden Cafés:
1. **Koffee Mameya (Omotesando)**: A minimalist, lab-like sanctuary. Baristas in white coats interview you on your taste preferences to construct custom-tailored pour-over cups.
2. **Switch Coffee (Meguro)**: Tucked in a residential neighborhood, offering excellent seasonal single-origins in a cozy garage setting.
3. **Fuglen (Yoyogi)**: Norwegian styling paired with vintage Japanese records, delivering incredible light roasts during the day and bespoke cocktails at night.

Slow down and enjoy the quiet side of Tokyo. Finding these tucked-away cafés offers a refreshing glimpse into the city's hidden neighborhoods.`,
      coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1200',
      tags: ['Travel', 'Coffee', 'Tokyo'],
      views: 521,
      author: getUserId('nomad_ben'),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1.5), // 1.5 days ago
    },
    {
      title: 'Digital Nomad’s Ultimate Guide to Chiang Mai, Thailand',
      summary: 'The ultimate blueprint for living and working in Chiang Mai: high-speed co-working spaces, cheap local delicacies, and digital nomad accommodation tips.',
      content: `### The Digital Nomad Capital of the World

For nearly a decade, Chiang Mai has been a major hub for remote software engineers, writers, and e-commerce entrepreneurs. With high-speed fiber internet, incredibly cheap living costs, and rich culture, it is the perfect spot for remote work.

#### The Cost of Living Breakdown
You can easily live comfortably in Chiang Mai for **$800 - $1,200 USD per month**. A modern studio apartment with pool access runs around $300 USD, while delicious street meals cost between $1.50 and $3 USD.

#### Top Co-working Ecosystems:
* **Punspace (Nimman)**: Quiet, productive, and popular with focused coders.
* **Yellow Coworking**: Modern space with Zoom booths, outdoor gardens, and a highly active community.
* **Camp at Maya**: A library-cafe setup inside the mall, open 24/7.

Chiang Mai succeeds because it is not just cheap; it offers a highly welcoming community of like-minded creatives ready to share ideas over bowls of spicy Khao Soi.`,
      coverImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=1200',
      tags: ['DigitalNomad', 'Travel', 'Thailand'],
      views: 432,
      author: getUserId('nomad_ben'),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4.5),
    },
    {
      title: 'Backpacking Europe Solo: How to Travel on a €45 Daily Budget',
      summary: 'Explore Europe without breaking the bank. Master cheap train systems, grocery secrets, and authentic social hostels for the trip of a lifetime.',
      content: `### The Budget Guide to the Old World

Traveling across Europe is often seen as a luxury. But with smart planning, you can explore historic cities, eat authentic meals, and meet friends while spending less than €45 a day.

#### 1. Master the Rails and Buses
Skip last-minute flights. Use **FlixBus** for long distances, and book train tickets 2 to 3 months in advance. Better yet, look into a **Eurail Pass** if you plan to cover multiple countries.

#### 2. Stay in Dynamic Social Hostels
Hostels are not just cheap beds; they are social hubs. Look for hostels that offer free walking tours, shared family dinners, and breakfast options to save money and meet other travelers.

#### 3. Eat Like a Local
Avoid restaurants directly in front of major tourist landmarks. Walk 3 to 4 blocks away into residential areas, or shop at local grocery stores for fresh bread, cheese, and fruit for picnic lunches in public parks.

Europe is incredibly accessible if you travel slowly, eat locally, and stay open to hostels and shared adventures.`,
      coverImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200',
      tags: ['Travel', 'SoloTravel', 'Europe'],
      views: 318,
      author: getUserId('nomad_ben'),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9),
    },
    {
      title: 'Exploring the Uncharted Coastlines of Portugal',
      summary: 'Beyond Lisbon and the Algarve: Discover the wild cliffs, secluded fishing villages, and quiet surf spots of the Alentejo coast.',
      content: `### Portugal’s Best Kept Coastal Secret

Most tourists flocking to Portugal head straight to Lisbon or the crowded beaches of the Algarve. But if you head south along the Atlantic highway, you’ll discover the **Rota Vicentina**—a wild, rugged coastline of pristine fishing villages and empty surf breaks.

#### Key Stops Along the Alentejo Coast:
* **Porto Covo**: A postcard-perfect village of whitewashed houses, cobble alleys, and quiet sandy coves.
* **Vila Nova de Milfontes**: Set on a dramatic river estuary, offering great flatwater kayaking and excellent seafood taverns.
* **Carrapateira**: A paradise for surfers, surrounded by sand dunes and powerful Atlantic waves.

If you are looking for empty beaches, pristine coastal hikes, and authentic family-run taverns, Alentejo is the ultimate Portuguese coastal adventure.`,
      coverImage: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=1200',
      tags: ['Travel', 'Portugal', 'Coastal'],
      views: 298,
      author: getUserId('nomad_ben'),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 11),
    },
    {
      title: 'Luggage Minimalism: Packing Everything in One 40L Backpack',
      summary: 'Master the art of one-bag travel. Learn to downsize your wardrobe, select multi-use gear, and bypass airport check-in lines forever.',
      content: `### The Freedom of Travel Minimalism

Checking large suitcases is expensive, stressful, and slows you down. Packing everything you need in a single carry-on backpack is the ultimate travel hack for hassle-free trips.

#### Why One-Bag Travel Wins:
1. **Save Money**: Never pay checked bag fees again.
2. **Save Time**: Skip the check-in and baggage claim lines.
3. **Mobility**: Easily navigate cobblestone streets and stairs without dragging a heavy suitcase.

#### The Master Packing Rules:
* **The Rule of 3**: Pack 3 shirts, 3 pairs of socks, and 3 pairs of underwear. Wash them in your hostel sink or laundromats as you go.
* **Layering over Bulk**: Choose light merino wool layers instead of heavy winter coats.
* **Compression Cubes**: Use packing cubes to compress your clothing and keep your bag organized.

Downsizing your gear is a liberating experience, showing you how little you actually need to comfortably explore the world.`,
      coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=1200',
      tags: ['Travel', 'Minimalism', 'Backpacking'],
      views: 375,
      author: getUserId('nomad_ben'),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
    },

    // --- FOOD (chef_mia) ---
    {
      title: 'The Sourdough Bible: Demystifying the Wild Yeast Starter',
      summary: 'Everything you need to bake artisan bakery-quality bread at home. Learn starter hydration, temperature control, and the science of oven spring.',
      content: `### The Magic of Flour, Water, and Time

Baking sourdough at home is a beautiful blend of science, patience, and fermentation. It requires no commercial yeast—just wild yeast harvested directly from the environment around you.

#### 1. Nurturing Your Wild Starter
A sourdough starter is a living community of wild yeast and beneficial bacteria. To keep it active, feed it daily with equal parts flour and filtered water:
\`\`\`
Daily Routine: 50g starter + 50g flour + 50g warm water
\`\`\`
Store it in a warm spot, and watch it double in volume, full of active bubbles.

#### 2. The Power of Autolyse
Before adding salt or starter, mix your flour and water and let it rest for 45 minutes. This activates gluten enzymes, making your dough much easier to shape and stretch.

#### 3. Creating the Perfect Oven Spring
To get a beautiful, blistered crust and open crumb, bake your bread inside a hot **Dutch Oven**. The heavy lid traps steam escaping from the dough, keeping the crust soft so the loaf can expand fully before baking to a deep golden brown.`,
      coverImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1200',
      tags: ['Cooking', 'Sourdough', 'Baking'],
      views: 480,
      author: getUserId('chef_mia'),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2.5), // 2.5 days ago
    },
    {
      title: 'Umami Science: The Fifth Taste and How to Harness It',
      summary: 'Learn the chemistry behind savory deliciousness. Master dynamic ingredient combinations to boost natural umami in vegetarian and meat dishes.',
      content: `### Understanding the Savory Dimension

For decades, western cuisine focused on four basic tastes: sweet, sour, salty, and bitter. But in 1908, Japanese chemist Kikunae Ikeda identified a fifth taste—**Umami** (meaning "savory deliciousness").

#### The Chemistry of Savory Flavors
Umami is triggered when our taste buds detect **glutamates** (amino acids) paired with specific nucleotides. When these ingredients are cooked together, they amplify each other, creating rich, complex flavors.

#### Natural Umami Powerhouses:
* **Aged Cheeses**: Parmigiano-Reggiano is packed with natural glutamates.
* **Fermented Products**: Soy sauce, miso paste, and fish sauce add instant savory depth.
* **Fungi & Vegetables**: Dried shiitake mushrooms and ripe roasted tomatoes are excellent vegetarian umami boosters.

#### The Synergy Hack:
Always pair glutamates (like mushrooms or tomatoes) with ingredients rich in nucleotides (like seafood or meat). This combination amplifies the savory flavor up to eight times, elevating your dishes to restaurant-quality standards.`,
      coverImage: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=1200',
      tags: ['Cooking', 'CulinaryScience', 'Food'],
      views: 265,
      author: getUserId('chef_mia'),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5.5),
    },
    {
      title: 'Knife Skills 101: Cut Like a Michelin Star Chef',
      summary: 'The foundation of professional cooking. Learn how to select your primary chef knife, hold it safely, and master the basic cuts.',
      content: `### The Most Critical Tool in Your Kitchen

You don't need fancy kitchen gadgets to cook great food. But you do need a sharp chef's knife and the proper technique to use it safely and efficiently.

#### 1. Selecting Your Knife
A standard **8-inch Chef’s Knife** is your primary kitchen tool. Look for a forged, full-tang knife that feels comfortable and balanced in your hand.

#### 2. Master the Pinch Grip
Never wrap your index finger along the top spine of the blade. Instead, pinch the blade directly where it meets the handle using your thumb and index finger. This gives you maximum control and reduces hand fatigue.

#### 3. The Claw Technique
Protect your non-dominant hand. Curl your fingertips inward like a bear claw, resting your knuckles against the flat side of the knife blade. This acts as a guide for your cuts while keeping your fingertips safely out of harm's way.

Mastering these basic cuts (dice, julienne, chiffonade) ensures your ingredients cook evenly and speeds up your prep work, making cooking a much more enjoyable experience.`,
      coverImage: 'https://images.unsplash.com/photo-1595272170044-f187a552f558?auto=format&fit=crop&q=80&w=1200',
      tags: ['Cooking', 'KitchenSkills', 'Chef'],
      views: 194,
      author: getUserId('chef_mia'),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8.5),
    },
    {
      title: 'Street Food Chronicles: Exploring Bangkok’s Night Markets',
      summary: 'A culinary journey through Bangkok’s aromatic night streets. Master market navigation and discover the best local stalls.',
      content: `### Savoring Bangkok’s Street Gastronomy

Bangkok’s night markets are a sensory adventure—aromatic steam rising from hot woks, sizzling meats over charcoal, and vibrant local energy. Here, street vendors serve some of the most complex, delicious dishes in the world.

#### Navigating the Markets
For an authentic experience, skip the tourist-heavy areas and head to **Wang Lang Market** or the bustling streets of **Yaowarat (Chinatown)**.

#### Must-Try Street Delicacies:
* **Pad Kra Prow**: Stir-fried holy basil with minced pork and a crispy fried egg. It is a local favorite packed with garlic and fresh chilies.
* **Som Tum**: Green papaya salad muddled with lime, peanuts, fish sauce, and fresh chilies—a perfect balance of sour, sweet, salty, and spicy.
* **Mango Sticky Rice**: Fresh, sweet mango served over warm, coconut-infused sticky rice—the ultimate Thai dessert.

Bangkok’s street food is an essential culinary experience, offering rich, complex flavors crafted by vendors who have spent decades perfecting a single, signature dish.`,
      coverImage: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=1200',
      tags: ['Food', 'Travel', 'StreetFood'],
      views: 312,
      author: getUserId('chef_mia'),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 13),
    },
    {
      title: 'The Art of Plating: How to Style Food Like a Pro',
      summary: 'Learn the visual principles of fine dining. Master negative space, height, color harmony, and garnishing to create stunning dishes.',
      content: `### Eating with Your Eyes First

We taste food visually long before it reaches our mouth. The way a dish is presented sets expectations for the entire dining experience, transforming a simple meal into an artistic event.

#### The Core Plating Principles:
1. **Embrace Negative Space**: Don't crowd the plate. Leave plenty of empty white space around the edges to let the main ingredients shine.
2. **Build Height**: Stack elements gently or lean them against each other to create three-dimensional depth and visual interest.
3. **The Rule of Odds**: Presenting items (like scallops or asparagus spears) in odd numbers (three or five) is naturally more visually appealing to the human eye.

#### Garnishing with Purpose
Never garnish a plate with inedible items or random parsley flakes. Every element on the plate should add to the flavor profile, and herbs should always be fresh, clean, and lightly dressed.`,
      coverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200',
      tags: ['CulinaryArt', 'Plating', 'Food'],
      views: 220,
      author: getUserId('chef_mia'),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 16),
    },

    // --- ECO (eco_sophie) ---
    {
      title: 'Permaculture 101: Designing a Self-Sustaining Backyard Ecosystem',
      summary: 'Transform your garden into an eco-friendly food forest. Learn companion planting, rain harvesting, and organic compost layering.',
      content: `### Working with Nature, Not Against It

Permaculture is a sustainable design philosophy focused on creating self-sufficient agricultural ecosystems modeled after natural woodland patterns.

#### The Three Core Ethics:
1. **Earth Care**: Rebuilding soil health and protecting biodiversity.
2. **People Care**: Growing fresh, organic food for families and communities.
3. **Fair Share**: Returning surplus resources back into the ecosystem (composting and sharing seeds).

#### Companion Planting and Guilds
Never grow single crops in isolation. In permaculture, we build **plant guilds** where companion plants support each other:
* **The Three Sisters**: Plant corn (structural support), beans (nitrogen-fixing), and squash (shade cover) together. They work in harmony to naturally boost soil health and yields.

#### Rainwater Harvesting
Ditch chemical fertilizers and city tap water. Setup rain barrels, bioswales, and mulch layers to capture and store clean rainwater directly in your garden's soil.`,
      coverImage: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=1200',
      tags: ['Permaculture', 'EcoFriendly', 'Gardening'],
      views: 390,
      author: getUserId('eco_sophie'),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 0.5), // 12 hours ago
    },
    {
      title: 'Zero-Waste Kitchen: Simple Habits to Halve Food Waste',
      summary: 'Practical tips to reduce waste, extend the shelf life of fresh ingredients, and transform kitchen scraps into rich organic compost.',
      content: `### Reducing Waste in Your Daily Routine

Food waste is a major contributor to global greenhouse gas emissions. Taking small, actionable steps in your kitchen is an easy way to reduce your carbon footprint and save money.

#### 1. Proper Food Storage
Extend the shelf life of your ingredients:
* Wrap fresh leafy greens in damp paper towels inside airtight containers.
* Keep potatoes and onions separated in cool, dark spots to prevent early sprouting.
* Store fresh herbs upright in glasses of water, like flowers.

#### 2. Creative Scrap Cooking
Before tossing kitchen scraps, look for ways to reuse them:
* Keep a bag of vegetable skins, herb stems, and onion ends in the freezer to make rich homemade stocks.
* Use stale sourdough loaves to bake crispy croutons or rustic bread puddings.

#### 3. Setup Backyard Composting
Instead of sending organic waste to landfills, compost it. Combine "greens" (food scraps, coffee grounds) with "browns" (leaves, cardboard) to create nutrient-dense compost for your garden.`,
      coverImage: 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&q=80&w=1200',
      tags: ['ZeroWaste', 'Sustainability', 'EcoFriendly'],
      views: 290,
      author: getUserId('eco_sophie'),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3.5),
    },
    {
      title: 'Green Tech Innovations Redefining Energy in 2026',
      summary: 'From sand batteries to perovskite solar cells, discover the eco-friendly tech shaping a cleaner global energy landscape.',
      content: `### The Next Generation of Clean Energy

As we move closer to net-zero targets, innovative technologies are emerging to solve major renewable energy challenges, particularly solar efficiency and long-term grid storage.

#### 1. Perovskite Solar Cells
Traditional silicon solar panels have hit an efficiency ceiling of around 22%. Perovskite panels, which can be sprayed or printed onto flexible surfaces, are breaking efficiency records, promising to lower solar costs worldwide.

#### 2. Sand Batteries
A simple, innovative storage solution:
* Renewable electricity powers heating coils inside massive sand silos.
* The sand stores heat at up to 600°C for months, offering clean, local heating for communities during winter.

#### 3. Tidal Energy Generators
Modern underwater turbines are capturing the predictable power of ocean tides, delivering consistent renewable energy to coastal grids.

These innovations show that the future of clean energy is promising, paving the way for a more resilient, low-carbon global grid.`,
      coverImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1200',
      tags: ['GreenTech', 'Technology', 'Sustainability'],
      views: 410,
      author: getUserId('eco_sophie'),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6.5),
    },
    {
      title: 'Fast Fashion Detox: Building a Sustainable Wardrobe',
      summary: 'Break the fast-fashion shopping cycle. Learn how to select high-quality fabrics, shop secondhand, and build a timeless capsule wardrobe.',
      content: `### The True Cost of Cheap Clothing

Fast fashion offers instant gratification, but it comes at a high cost—massive water consumption, toxic dye runoff, and poor working conditions. Building a sustainable wardrobe is a thoughtful way to reduce your impact.

#### 1. Select Natural, Timeless Fabrics
Before buying, check the fabric labels. Look for organic cotton, linen, hemp, and responsibly sourced wool. These natural fibers are highly breathable, biodegradable, and built to last.

#### 2. Build a Capsule Wardrobe
Downsize your closet to 30 to 40 versatile, high-quality pieces that can be easily mixed and matched. Focus on classic cuts and neutral color palettes that outlast fleeting fashion trends.

#### 3. Embrace Secondhand and Thrift Shopping
Thrifting is an excellent way to give quality clothing a second life. Explore local vintage stores or use digital platforms to find designer pieces at fraction prices.

Choosing quality over quantity reduces textile waste and helps you build a unique wardrobe you truly love.`,
      coverImage: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=1200',
      tags: ['EcoFriendly', 'Minimalism', 'Fashion'],
      views: 245,
      author: getUserId('eco_sophie'),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9.5),
    },
    {
      title: 'The Plastic-Free Bathroom: Easy Low-Impact Conversions',
      summary: 'Practical bathroom swaps to eliminate single-use plastics: shampoo bars, safety razors, and tablet mouthwashes.',
      content: `### Simple Plastic-Free Bathroom Swaps

The bathroom is one of the biggest sources of single-use plastic waste in our homes. Fortunately, there are simple, high-quality alternatives that can help you eliminate plastic waste entirely.

#### Top Three Bathroom Swaps:
* **Shampoo and Conditioner Bars**: Concentrated bars that eliminate the need for plastic bottles. They are long-lasting, highly packable, and made with nourishing natural oils.
* **Double-Edge Safety Razors**: Replace plastic disposable razors with a durable metal safety razor. It provides a closer, irritation-free shave, and the metal blades are fully recyclable.
* **Toothpaste Tablets**: Ditch plastic tubes. Toothpaste tablets are waterless bites that foam up when brushed, packaged in refillable glass jars.

Making these simple swaps reduces plastic waste, turning your bathroom into a cleaner, more sustainable space.`,
      coverImage: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=1200',
      tags: ['ZeroWaste', 'Sustainability', 'EcoBathroom'],
      views: 189,
      author: getUserId('eco_sophie'),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
    },
  ];
};
