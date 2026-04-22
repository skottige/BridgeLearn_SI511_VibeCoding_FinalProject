export interface ProjectAction {
  label: string;
  hint?: string;
}

export interface ProjectStep {
  title: string;
  description: string;
  icon: string;
  actions: ProjectAction[];
}

export interface ProjectStepsData {
  steps: ProjectStep[];
  totalPoints: number;
}

export const projectStepsMap: Record<string, ProjectStepsData> = {
  "Build a Personal Website": {
    totalPoints: 100,
    steps: [
      {
        title: "Plan Your Website",
        description: "Great projects start with a plan. Research, sketch, and decide what your site will look like.",
        icon: "📋",
        actions: [
          { label: "Research 3 portfolio websites for inspiration", hint: "Look at sites like dribbble.com or awwwards.com for ideas" },
          { label: "Sketch a wireframe of your layout on paper", hint: "Draw boxes for header, hero, about, projects, and footer sections" },
          { label: "Choose a color palette (3–4 colors)", hint: "Try coolors.co to generate a palette that matches your personality" },
          { label: "Write a list of sections you want to include", hint: "Common sections: Hero, About Me, Projects, Skills, Contact" },
        ],
      },
      {
        title: "Build the Structure (HTML)",
        description: "Create the skeleton of your website using HTML — the language that structures every web page.",
        icon: "🏗️",
        actions: [
          { label: "Create index.html with basic HTML boilerplate", hint: "Use <!DOCTYPE html>, <html>, <head>, and <body> tags" },
          { label: "Add a header with your name and navigation links", hint: "Use <header>, <nav>, and <a> tags" },
          { label: "Create an 'About Me' section with a short bio", hint: "Use <section> and <p> tags — keep it 2–3 sentences" },
          { label: "Add a 'Projects' section with placeholder cards", hint: "Use <div> cards with a title, image placeholder, and description" },
          { label: "Add a footer with contact info or social links", hint: "Use <footer> with links to email, GitHub, or LinkedIn" },
        ],
      },
      {
        title: "Style It Up (CSS)",
        description: "Make your website beautiful with CSS — colors, fonts, spacing, and visual flair.",
        icon: "🎨",
        actions: [
          { label: "Create and link a styles.css file", hint: "Use <link rel='stylesheet' href='styles.css'> in your <head>" },
          { label: "Add Google Fonts for headings and body text", hint: "Visit fonts.google.com — try Poppins, Inter, or Space Grotesk" },
          { label: "Style your header and navigation bar", hint: "Use flexbox (display: flex) to align items horizontally" },
          { label: "Add spacing, colors, and backgrounds to sections", hint: "Use padding, margin, and background-color properties" },
          { label: "Add hover effects to links and buttons", hint: "Use :hover pseudo-class, e.g. a:hover { color: #3B82F6; }" },
        ],
      },
      {
        title: "Make It Responsive",
        description: "Ensure your site looks great on phones, tablets, and desktops.",
        icon: "📱",
        actions: [
          { label: "Add a viewport meta tag to <head>", hint: '<meta name="viewport" content="width=device-width, initial-scale=1.0">' },
          { label: "Write media queries for screens under 768px", hint: "Use @media (max-width: 768px) { ... } to adjust layouts" },
          { label: "Stack navigation links vertically on mobile", hint: "Change flex-direction to column inside your media query" },
          { label: "Test on 3 different screen sizes", hint: "Use browser DevTools (F12) to toggle device toolbar" },
        ],
      },
      {
        title: "Polish & Share",
        description: "Final touches! Review everything, deploy your site, and share it with the world.",
        icon: "🚀",
        actions: [
          { label: "Review all content for typos and broken links", hint: "Read every section out loud — it helps catch errors" },
          { label: "Add your real photo or a fun avatar", hint: "Use a square image and style it with border-radius: 50%" },
          { label: "Deploy using GitHub Pages or Netlify", hint: "GitHub Pages: push to a repo and enable Pages in Settings" },
          { label: "Share the link with a friend and get feedback", hint: "Ask them: What's clear? What's confusing? What would you add?" },
        ],
      },
    ],
  },
  "Design a Logo": {
    totalPoints: 100,
    steps: [
      {
        title: "Research & Brainstorm",
        description: "Great logos start with understanding the brand. Research, explore, and gather inspiration.",
        icon: "🔍",
        actions: [
          { label: "Define the brand — what values and personality should the logo convey?", hint: "Think of 3–5 adjectives: e.g. playful, bold, minimal, elegant, techy" },
          { label: "Research 5 logos you admire and note what makes them work", hint: "Check logolounge.com, dribbble.com, or brands you use daily" },
          { label: "Create a mood board with colors, fonts, and styles you like", hint: "Use Pinterest, Milanote, or just collect screenshots in a folder" },
          { label: "Sketch at least 5 rough logo concepts on paper", hint: "Don't aim for perfection — quick thumbnail sketches help explore ideas fast" },
        ],
      },
      {
        title: "Choose Your Tools",
        description: "Pick a design tool and set up your workspace. Free tools work great for this project!",
        icon: "🛠️",
        actions: [
          { label: "Sign up for Canva, Figma, or another free design tool", hint: "Canva is easiest for beginners; Figma gives more control" },
          { label: "Set up an artboard (1000×1000px is a good starting size)", hint: "In Canva, choose 'Custom size'; in Figma, press F to create a frame" },
          { label: "Pick your color palette (2–3 primary colors)", hint: "Use coolors.co or color.adobe.com to generate harmonious palettes" },
          { label: "Choose 1–2 fonts that match your brand personality", hint: "Try Google Fonts — pair a bold display font with a clean sans-serif" },
        ],
      },
      {
        title: "Design Your Logo",
        description: "Time to create! Build your logo digitally using shapes, text, and your creative vision.",
        icon: "🎨",
        actions: [
          { label: "Create the icon/symbol portion of your logo using basic shapes", hint: "Combine circles, rectangles, and lines — simplicity is key in logo design" },
          { label: "Add your brand name in your chosen font", hint: "Try different weights (bold, regular) and letter-spacing" },
          { label: "Experiment with at least 3 layout variations (stacked, side-by-side, icon-only)", hint: "Logos need to work at different sizes and in different contexts" },
          { label: "Apply your color palette and test on light and dark backgrounds", hint: "A good logo works in full color, black, and white" },
        ],
      },
      {
        title: "Refine & Polish",
        description: "Details matter. Refine spacing, alignment, and ensure your logo is pixel-perfect.",
        icon: "✨",
        actions: [
          { label: "Align all elements precisely — check spacing is consistent", hint: "Use alignment guides and snap-to-grid features in your design tool" },
          { label: "Test your logo at small sizes (favicon, 32×32px) and large sizes", hint: "If it's not readable at small sizes, simplify!" },
          { label: "Create a black-and-white version of your logo", hint: "This ensures it works for faxes, stamps, and single-color printing" },
          { label: "Get feedback from 2 people and make one improvement based on it", hint: "Ask: 'What brand does this make you think of? What feeling does it give?'" },
        ],
      },
      {
        title: "Export & Present",
        description: "Finalize your logo in multiple formats and create a mini brand guide.",
        icon: "🚀",
        actions: [
          { label: "Export your logo in PNG format (transparent background)", hint: "In Canva: Download → PNG → Transparent. In Figma: Export → PNG 2x" },
          { label: "Export an SVG version if your tool supports it", hint: "SVG is vector-based and scales perfectly to any size" },
          { label: "Write a short design rationale (3–4 sentences explaining your choices)", hint: "Cover: why this symbol, why these colors, why this font, and what it communicates" },
          { label: "Create a simple brand card showing your logo on a business card or social media mockup", hint: "Canva has free mockup templates — search 'business card mockup'" },
        ],
      },
    ],
  },
};
