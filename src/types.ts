export interface ProjectIdea {
  id: number;
  titleArabic: string;
  titleEnglish: string;
  description: string;
  objectives: string[];
  techStack: string[];
  difficulty: 'سهل' | 'متوسط' | 'متقدم';
}

export interface Resource {
  id: number;
  name: string;
  type: 'موقع تفاعلي' | 'قناة يوتيوب' | 'منصة عربية' | 'توثيق رسمي';
  url: string;
  description: string;
  icon: string;
}

export interface RoadmapStep {
  id: number;
  phase: string;
  timeline: string;
  title: string;
  description: string;
  tasks: string[];
}

export interface DebugChallenge {
  id: number;
  language: string;
  title: string;
  description: string;
  brokenCode: string;
  fixedCode: string; // The correct exact code or key correction word
  hint: string;
  options: string[];
  explanation: string;
}
