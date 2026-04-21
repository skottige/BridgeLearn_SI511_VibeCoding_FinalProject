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
};
