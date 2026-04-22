import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PointsBadge } from "@/components/PointsBadge";
import { Clock, CheckCircle2, Sparkles, ListChecks, Target } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { projectStepsMap } from "@/data/projectStepsData";

interface Project {
  id: string;
  title: string;
  description: string;
  points: number;
  duration: string;
  difficulty: string;
  career: string;
}

interface ProjectDetailModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  completed?: boolean;
  onComplete?: () => void;
}

const diffColors: Record<string, string> = {
  Beginner: "bg-lime/20 text-lime-foreground",
  Intermediate: "bg-tangerine/20 text-tangerine-foreground",
  Advanced: "bg-coral/20 text-coral-foreground",
};

const projectDetails: Record<string, { steps: string[]; skills: string[]; outcome: string }> = {
  "Build a Personal Website": {
    steps: [
      "Plan your layout and choose a color scheme",
      "Write HTML structure with header, about, and projects sections",
      "Style with CSS — fonts, colors, spacing, and responsiveness",
    ],
    skills: ["HTML", "CSS", "Responsive Design"],
    outcome: "A live portfolio page you can share with friends, teachers, or future employers.",
  },
  "Build a Simple App": {
    steps: [
      "Design the calculator UI with buttons and a display",
      "Add JavaScript event listeners for button clicks",
      "Implement arithmetic logic and display results",
    ],
    skills: ["JavaScript", "DOM Manipulation", "Problem Solving"],
    outcome: "A working calculator app that handles basic math operations.",
  },
  "Design a Logo": {
    steps: [
      "Research brand values and sketch 3 concept ideas",
      "Use Canva or Figma to create a digital version",
      "Export in multiple formats and present your design rationale",
    ],
    skills: ["Graphic Design", "Branding", "Visual Communication"],
    outcome: "A professional logo with a design brief explaining your creative choices.",
  },
  "Social Media Campaign": {
    steps: [
      "Choose a cause and define your target audience",
      "Create 3 social media posts with visuals and captions",
      "Write a short strategy brief outlining your campaign goals",
    ],
    skills: ["Marketing Strategy", "Copywriting", "Visual Design"],
    outcome: "A complete campaign kit ready to launch on any social platform.",
  },
  "Analyze Survey Data": {
    steps: [
      "Import the dataset into a spreadsheet",
      "Clean the data and create pivot tables",
      "Build charts to visualize key findings and write a summary",
    ],
    skills: ["Data Analysis", "Spreadsheets", "Data Visualization"],
    outcome: "A data report with charts that tell a clear story from raw numbers.",
  },
  "Create a Budget Plan": {
    steps: [
      "List income sources and expense categories",
      "Set up formulas to track totals and savings goals",
      "Add charts to visualize spending patterns",
    ],
    skills: ["Financial Literacy", "Spreadsheets", "Planning"],
    outcome: "A reusable budget template you can use for real personal finances.",
  },
  "Machine Learning Basics": {
    steps: [
      "Learn the difference between training and test data",
      "Use a pre-built model to classify sample images",
      "Evaluate accuracy and tweak parameters to improve results",
    ],
    skills: ["Machine Learning", "Python", "Critical Thinking"],
    outcome: "A trained image classifier with documented accuracy results.",
  },
  "Write a Press Release": {
    steps: [
      "Research press release format and structure",
      "Write a compelling headline and lead paragraph",
      "Complete the body with quotes, details, and a boilerplate",
    ],
    skills: ["Professional Writing", "Communication", "PR"],
    outcome: "A polished press release ready for a fictional product launch.",
  },
  "3D Print a Prototype": {
    steps: [
      "Sketch your product idea and define dimensions",
      "Model it in TinkerCAD or a similar 3D tool",
      "Export as STL and learn about materials and print settings",
    ],
    skills: ["3D Modeling", "Engineering Design", "Prototyping"],
    outcome: "A 3D model file ready for printing with a design document.",
  },
  "Video Storyboard": {
    steps: [
      "Choose a topic and outline your documentary structure",
      "Sketch scene-by-scene frames with camera angles and notes",
      "Add narration scripts and timing for each scene",
    ],
    skills: ["Storytelling", "Visual Planning", "Media Production"],
    outcome: "A complete storyboard that could guide a real video production.",
  },
  "Lab Report Analysis": {
    steps: [
      "Read the lab data and identify the hypothesis being tested",
      "Create tables and graphs to display results",
      "Write a conclusion connecting findings to the hypothesis",
    ],
    skills: ["Scientific Method", "Data Interpretation", "Technical Writing"],
    outcome: "A professional lab report with clear analysis and conclusions.",
  },
  "Design a Patient Form": {
    steps: [
      "Research what information a clinic needs from patients",
      "Design a clean, accessible digital form layout",
      "Add validation and organize sections logically",
    ],
    skills: ["UX Design", "Healthcare Basics", "Form Design"],
    outcome: "A user-friendly digital intake form ready for a clinic setting.",
  },
};

const fallbackDetails = {
  steps: [
    "Review the project brief and gather resources",
    "Complete the main deliverable step by step",
    "Review, polish, and submit your work",
  ],
  skills: ["Critical Thinking", "Creativity", "Communication"],
  outcome: "A completed project showcasing your skills in this career area.",
};

export function ProjectDetailModal({ project, open, onOpenChange, completed, onComplete }: ProjectDetailModalProps) {
  if (!project) return null;

  const details = projectDetails[project.title] || fallbackDetails;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${diffColors[project.difficulty] || ""}`}>
              {project.difficulty}
            </span>
            <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded-full">{project.career}</span>
          </div>
          <DialogTitle className="text-xl">{project.title}</DialogTitle>
          <DialogDescription>{project.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-5 mt-2">
          {/* Meta row */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{project.duration}</span>
            <PointsBadge points={project.points} size="sm" />
          </div>

          {/* Steps */}
          <div>
            <h4 className="font-semibold text-sm flex items-center gap-1.5 mb-2">
              <ListChecks className="w-4 h-4 text-primary" /> What you'll do
            </h4>
            <ol className="space-y-2">
              {details.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Skills */}
          <div>
            <h4 className="font-semibold text-sm flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-sunshine-foreground" /> Skills you'll build
            </h4>
            <div className="flex flex-wrap gap-2">
              {details.skills.map((skill) => (
                <span key={skill} className="text-xs font-medium px-2.5 py-1 rounded-full bg-sky/15 text-sky-foreground">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Outcome */}
          <div>
            <h4 className="font-semibold text-sm flex items-center gap-1.5 mb-2">
              <Target className="w-4 h-4 text-lime-foreground" /> What you'll walk away with
            </h4>
            <p className="text-sm text-muted-foreground">{details.outcome}</p>
          </div>

          {/* Action */}
          {completed ? (
            <div className="flex items-center gap-2 text-lime-foreground font-semibold text-sm pt-2">
              <CheckCircle2 className="w-5 h-5" /> You've completed this project!
            </div>
          ) : projectStepsMap[project.title] ? (
            <Link to="/project/$projectId" params={{ projectId: project.id }} onClick={() => onOpenChange(false)}>
              <Button variant="lavender" className="w-full">
                Start Step-by-Step Guide — Earn {project.points} pts
              </Button>
            </Link>
          ) : (
            <Button
              variant="lavender"
              className="w-full"
              onClick={() => {
                onComplete?.();
                onOpenChange(false);
              }}
            >
              Start Project — Earn {project.points} pts
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
