import { useState, useMemo, useEffect } from 'react';
import { 
  BookOpen, 
  Award, 
  CheckSquare, 
  Code, 
  Copy, 
  ExternalLink, 
  FileCode2, 
  Globe, 
  HelpCircle, 
  Info, 
  ListTodo, 
  Play, 
  Search, 
  Terminal, 
  ThumbsUp, 
  Timer, 
  ChevronDown, 
  AlertCircle, 
  CheckCircle2, 
  Bookmark,
  RefreshCw,
  Lightbulb,
  Laptop,
  Smartphone,
  Layers,
  Settings,
  Headphones,
  Sparkles
} from 'lucide-react';
import HTMLGuide from './components/HTMLGuide';
import { RAW_CONTENT_HTML, ROADMAP_STEPS, RESOURCES_LIST, STARTER_PROJECTS, DEBUG_CHALLENGES } from './content';
import boardroomHero from './assets/images/boardroom_hero_1781446489559.jpg';

export default function App() {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'showcase' | 'article' | 'interactive' | 'learn-html' | 'resources' | 'projects' | 'challenges'>('showcase');
  
  // Track selection for custom path customization
  const [selectedTrack, setSelectedTrack] = useState<'web' | 'mobile' | 'data' | 'ai'>('web');

  // Resource Hub States
  const [searchResource, setSearchResource] = useState('');
  const [resourceFilter, setResourceFilter] = useState<string>('all');

  // Task Tracking state (Tasks in Roadmap Phases)
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('cs_mentor_checked_tasks');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Project checklist tracking state
  const [completedProjects, setCompletedProjects] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('cs_mentor_completed_projects');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Debugger Challenge States
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answeredChallenges, setAnsweredChallenges] = useState<Record<number, { success: boolean; answer: string }>>({});
  const [showExplanation, setShowExplanation] = useState(false);

  // SEO HTML Customizer state
  const [seoTitle, setSeoTitle] = useState('خارطة طريق تعلم البرمجة من الصفر حتى الاحتراف: دليل شامل للمبتدئين');
  const [seoKeywords, setSeoKeywords] = useState('تعلم البرمجة من الصفر, كيف تصبح مبرمجاً محترفاً, خارطة طريق تعلم البرمجة, مصادر تعلم البرمجة مجانا, تعلم علوم الحاسب');
  const [seoDescription, setSeoDescription] = useState('خارطة طريق متكاملة تنطلق بك من الصفر المطلق إلى المبرمج المحترف القادر على تسويق مهاراته والعمل في كبرى الشركات، شاملة المشاريع والمصادر المجانية.');
  const [copiedHTMLSuccessfully, setCopiedHTMLSuccessfully] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Save states to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('cs_mentor_checked_tasks', JSON.stringify(checkedTasks));
    } catch (e) {
      console.warn('Unable to write to localStorage:', e);
    }
  }, [checkedTasks]);

  useEffect(() => {
    try {
      localStorage.setItem('cs_mentor_completed_projects', JSON.stringify(completedProjects));
    } catch (e) {
      console.warn('Unable to write to localStorage:', e);
    }
  }, [completedProjects]);

  // Generate dynamic customized HTML for copy
  const generatedSEO_HTML = useMemo(() => {
    let replaced = RAW_CONTENT_HTML;
    
    // Replace the main header text dynamically if user customized it
    if (seoTitle) {
      replaced = replaced.replace(
        /<h1[^>]*>([\s\S]*?)<\/h1>/i, 
        `<h1 style="font-size: 2.25rem; font-weight: 800; color: #111827; margin-bottom: 1.5rem; text-align: right; line-height: 1.3;">${seoTitle}</h1>`
      );
    }

    // Wrap the article with complete HTML skeleton suitable for bloggers or direct embedding
    return `<!-- 
  ==============================================================
  مقالة سيو احترافية: خارطة طريق تعلم البرمجة من الصفر
  تم إعدادها وتصميمها بواسطة Computer Science Mentor Portal
  الكلمات المفتاحية المستهدفة: ${seoKeywords}
  الوصف السيو المقترح: ${seoDescription}
  ==============================================================
-->
<meta name="title" content="${seoTitle}">
<meta name="description" content="${seoDescription}">
<meta name="keywords" content="${seoKeywords}">
<meta name="robots" content="index, follow">

${replaced}`;
  }, [seoTitle, seoKeywords, seoDescription]);

  // Copy HTML mechanism
  const handleCopyHTML = async () => {
    try {
      setCopyError(null);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(generatedSEO_HTML);
      } else {
        // Fallback for some restricted browsers or standard inside frames
        const textArea = document.createElement('textarea');
        textArea.value = generatedSEO_HTML;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedHTMLSuccessfully(true);
      setTimeout(() => setCopiedHTMLSuccessfully(false), 3000);
    } catch (err) {
      setCopyError('حدث خطأ أثناء النسخ التلقائي، يرجى تظليل الأكواد ونسخها يدوياً من المعاينة أدناه.');
      setTimeout(() => setCopyError(null), 6000);
    }
  };

  // Toggle checklist tasks
  const handleToggleTask = (stepId: number, taskIndex: number) => {
    const key = `${stepId}-${taskIndex}`;
    setCheckedTasks(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Total Task Completion Metrics
  const totalRoadmapTasks = useMemo(() => {
    return ROADMAP_STEPS.reduce((acc, step) => acc + step.tasks.length, 0);
  }, []);

  const completedRoadmapTasksCount = useMemo(() => {
    return Object.values(checkedTasks).filter(Boolean).length;
  }, [checkedTasks]);

  const roadmapProgressPercent = useMemo(() => {
    if (totalRoadmapTasks === 0) return 0;
    return Math.round((completedRoadmapTasksCount / totalRoadmapTasks) * 100);
  }, [completedRoadmapTasksCount, totalRoadmapTasks]);

  // Project progress metric
  const completedProjectsCount = useMemo(() => {
    return Object.values(completedProjects).filter(Boolean).length;
  }, [completedProjects]);

  const projectsProgressPercent = useMemo(() => {
    return Math.round((completedProjectsCount / 5) * 100);
  }, [completedProjectsCount]);

  // Mentor custom advice generator based on progress
  const mentorGreetingMessage = useMemo(() => {
    const completed = roadmapProgressPercent;
    if (completed === 0) {
      return {
        title: "خطوتك الأولى في التغيير بدأت الآن!",
        text: "مرحباً بك يا بطل البرمجة الجديد. أنا مرشدك الأكاديمي. هذه الخارطة صُممت خصيصاً لتوجه خطواتك دون تشتت. ابدأ الرحلة فوراً وحوّل دفتك من مستهلك للتكنولوجيا إلى صانع ومبتكر لها. تصفح الأقسام وحدد أهدافك اليوم الكبيرة!",
        badge: "مستعد ومتحمس",
        color: "bg-emerald-50 border-emerald-300 text-emerald-800"
      };
    } else if (completed < 30) {
      return {
        title: "بداية ممتازة، أنت تبني الأساس الآن!",
        text: "عمل رائع! لقد بدأت باجتياز حجر الأساس الأهم؛ ركّز حالياً على كتابة كود بسيط يومياً. لا تقلق إن لم تفهم كل شيء من المرة الأولى، التكرار والتدريب المبرمج هما مفتاح الحل.",
        badge: "مستكشف نشط",
        color: "bg-blue-50 border-blue-200 text-blue-800"
      };
    } else if (completed < 70) {
      return {
        title: "رائع جداً! أنت الآن في وسط النهر البرمجي!",
        text: "نصف المسافة تقريباً! لقد انتقلت رسمياً إلى مرحلة التخصص التقني. تأكد من بناء مشاريع عملية مع كل تقنية تدرسها، وشارك أكوادك مع الآخرين على جيت هاب لتثبيت الأفكار.",
        badge: "مبرمج مجتهد",
        color: "bg-amber-50 border-amber-200 text-amber-800"
      };
    } else if (completed < 100) {
      return {
        title: "رائحة الاحتراف تلوح في الأفق! شارك أعمالك!",
        text: "أنت على مشارف الانتهاء من الخارطة! مرحلتك الحالية تتطلب التركيز على تنظيف الأكواد وكتابة ملفات شرح README ممتازة لمشاريعك الخمسة. أنت كفؤ ومستعد وبورفوليو أعمالك ينمو باضطراد.",
        badge: "مطوّر واعد",
        color: "bg-violet-50 border-violet-200 text-violet-800"
      };
    } else {
      return {
        title: "تهانينا الحارة! لقد أكملت خارطة طريق مبرمجي القرن!",
        text: "فخور جداً بك مستواك يتحدث عنك. أنت الآن مجهز بأسس متينة ومشاريع فخمة قادرة على كسب ثقة الشركات والبدء في التقدم لأولى الوظائف أو استلام مشاريع العمل الحر. استمر في التطور اليومي ولا تتوقف أبداً!",
        badge: "مبرمج محترف جاهز للعمل!",
        color: "bg-teal-50 border-teal-300 text-teal-900"
      };
    }
  }, [roadmapProgressPercent]);

  // Filtered and Searched resources
  const filteredResources = useMemo(() => {
    return RESOURCES_LIST.filter(res => {
      const matchesSearch = res.name.toLowerCase().includes(searchResource.toLowerCase()) || 
                            res.description.toLowerCase().includes(searchResource.toLowerCase());
      if (resourceFilter === 'all') return matchesSearch;
      return matchesSearch && res.type === resourceFilter;
    });
  }, [searchResource, resourceFilter]);

  // Handles options clicking in challenge game
  const handleOptionSelect = (option: string) => {
    setSelectedAnswer(option);
    setShowExplanation(true);
    const challenge = DEBUG_CHALLENGES[activeChallengeIdx];
    const isCorrect = option === challenge.fixedCode;
    
    setAnsweredChallenges(prev => ({
      ...prev,
      [challenge.id]: {
        success: isCorrect,
        answer: option
      }
    }));
  };

  // Skip / Reset Quiz 
  const handleResetChallenge = () => {
    setAnsweredChallenges({});
    setActiveChallengeIdx(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  // Total correct challenge score
  const quizScore = useMemo(() => {
    return Object.values(answeredChallenges).filter((ans: any) => ans?.success).length;
  }, [answeredChallenges]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/20 selection:text-cyan-300 pb-16 relative overflow-hidden" dir="rtl">
      
      {/* Neo-cybernetic ambient glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Upper Navigation & Premium Header */}
      <header className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
            
            {/* Branding Logo & Mentor Icon */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 text-white rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center">
                <Laptop className="w-6 h-6" id="logo-icon" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-100 flex items-center gap-1.5 leading-none">
                  <span>مرشد علوم الحاسب</span>
                  <span className="text-[10px] px-2 py-0.5 bg-cyan-950 border border-cyan-800 text-cyan-400 font-semibold rounded-full">Roadmap Tool</span>
                </h1>
                <p className="text-xs text-slate-400 mt-1">بناء خوارزميات المستقبل وتعلم البرمجة من الصفر كالمحترفين</p>
              </div>
            </div>

            {/* Quick Progress Indicator on Header */}
            <div className="flex items-center gap-4 bg-slate-950/60 border border-slate-800 px-4 py-2 rounded-xl">
              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-medium">إنجاز الخارطة الشاملة</div>
                <div className="text-xs font-bold text-slate-200">{roadmapProgressPercent}% للأساسيات | {projectsProgressPercent}% للمشاريع</div>
              </div>
              <div className="w-16 bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 h-full transition-all duration-500 rounded-full" 
                  style={{ width: `${(roadmapProgressPercent + projectsProgressPercent) / 2}%` }}
                />
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Main App Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Mentor dynamic notification bubble */}
        <div className={`p-6 rounded-3xl border border-slate-800/80 shadow-2xl mb-8 transition-all duration-500 relative overflow-hidden backdrop-blur-md bg-slate-900/40`}>
          <div className="absolute left-0 bottom-0 translate-y-3 -translate-x-3 text-slate-800/20 opacity-25 transform scale-150">
            <Award className="w-32 h-32" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="p-3 bg-slate-950/80 rounded-2xl max-w-max text-slate-100 shadow-xl border border-slate-800 flex items-center justify-center shrink-0">
              <span className="text-2xl">💡</span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h4 className="font-bold text-base md:text-lg text-white">{mentorGreetingMessage.title}</h4>
                <span className="text-[10px] font-bold px-2.5 py-0.5 bg-slate-950/90 text-cyan-400 rounded-full border border-slate-800">
                  {mentorGreetingMessage.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed max-w-4xl text-slate-300">{mentorGreetingMessage.text}</p>
            </div>
          </div>
        </div>

        {/* Tab switcher buttons */}
        <div className="bg-slate-900/60 backdrop-blur-md p-1.5 rounded-3xl border border-slate-800/85 overflow-x-auto scrollbar-none flex gap-1.5 mb-8">
          <button
            id="tab-showcase-btn"
            onClick={() => setActiveTab('showcase')}
            className={`flex items-center gap-2 px-5 py-3.5 text-xs font-semibold rounded-2xl transition-all whitespace-nowrap cursor-pointer border border-transparent ${
              activeTab === 'showcase'
                ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white font-bold shadow-[0_0_20px_rgba(59,130,246,0.25)] border-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
            }`}
          >
            <Laptop className="w-4 h-4 text-cyan-400 shrink-0" />
            البوابة والحلول والأثر 🌟
          </button>

          <button
            id="tab-article-btn"
            onClick={() => setActiveTab('article')}
            className={`flex items-center gap-2 px-5 py-3.5 text-xs font-semibold rounded-2xl transition-all whitespace-nowrap cursor-pointer border border-transparent ${
              activeTab === 'article'
                ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white font-bold shadow-[0_0_20px_rgba(59,130,246,0.25)] border-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
            }`}
          >
            <BookOpen className="w-4 h-4 text-indigo-400 shrink-0" />
            المسودة والمقال الجاهز (SEO)
          </button>
          
          <button
            id="tab-interactive-btn"
            onClick={() => setActiveTab('interactive')}
            className={`flex items-center gap-2 px-5 py-3.5 text-xs font-semibold rounded-2xl transition-all whitespace-nowrap cursor-pointer border border-transparent ${
              activeTab === 'interactive'
                ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white font-bold shadow-[0_0_20px_rgba(59,130,246,0.25)] border-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
            }`}
          >
            <Timer className="w-4 h-4 text-amber-400 shrink-0" />
            الجدول الزمني التفاعلي
          </button>

          <button
            id="tab-learnhtml-btn"
            onClick={() => setActiveTab('learn-html')}
            className={`flex items-center gap-2 px-5 py-3.5 text-xs font-semibold rounded-2xl transition-all whitespace-nowrap cursor-pointer border border-transparent ${
              activeTab === 'learn-html'
                ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white font-bold shadow-[0_0_20px_rgba(59,130,246,0.25)] border-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
            }`}
          >
            <FileCode2 className="w-4 h-4 text-cyan-400 shrink-0" />
            تعلم HTML خطوة بخطوة 🌟
          </button>

          <button
            id="tab-projects-btn"
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-5 py-3.5 text-xs font-semibold rounded-2xl transition-all whitespace-nowrap cursor-pointer border border-transparent ${
              activeTab === 'projects'
                ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white font-bold shadow-[0_0_20px_rgba(59,130,246,0.25)] border-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
            }`}
          >
            <Code className="w-4 h-4 text-violet-400 shrink-0" />
            الحقيبة العملية (5 مشاريع مبتكر)
          </button>

          <button
            id="tab-resources-btn"
            onClick={() => setActiveTab('resources')}
            className={`flex items-center gap-2 px-5 py-3.5 text-xs font-semibold rounded-2xl transition-all whitespace-nowrap cursor-pointer border border-transparent ${
              activeTab === 'resources'
                ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white font-bold shadow-[0_0_20px_rgba(59,130,246,0.25)] border-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
            }`}
          >
            <Globe className="w-4 h-4 text-sky-400 shrink-0" />
            مجمع المصادر المجانية العالمي
          </button>

          <button
            id="tab-challenges-btn"
            onClick={() => setActiveTab('challenges')}
            className={`flex items-center gap-2 px-5 py-3.5 text-xs font-semibold rounded-2xl transition-all whitespace-nowrap cursor-pointer border border-transparent ${
              activeTab === 'challenges'
                ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white font-bold shadow-[0_0_20px_rgba(59,130,246,0.25)] border-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
            }`}
          >
            <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
            مخبر المطور وتحدي الأخطاء
          </button>
        </div>

        {/* Tab: Digital Future Showcase & Portal */}
        {activeTab === 'showcase' && (
          <div className="space-y-12 animate-fade-in text-right" dir="rtl">
            
            {/* Split Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-b from-[#091122] to-[#040914] border border-slate-800/60 p-6 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden backdrop-blur-md">
              {/* Decorative dynamic neon glow effects */}
              <div className="absolute right-10 top-0 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute left-0 bottom-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

              {/* Right Side: Heavy display Arabic typography (matches exact screenshot text) */}
              <div className="lg:col-span-6 space-y-6 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-950/40 border border-blue-900/50 text-blue-300 rounded-full text-[11px] font-bold">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>حلول رقمية متكاملة لنمو أعمالك التقنية</span>
                </div>
                
                <h2 className="text-3xl sm:text-5xl font-black text-white leading-[1.2] tracking-tight">
                  نحو المستقبل <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">نُطوّر أفكارك</span> <br />
                  لنصنع الفرق.
                </h2>

                <p className="text-slate-350 text-sm sm:text-base leading-relaxed max-w-xl font-light">
                  نقدم حلولا رقمية تساعد الشركات على النمو والتطور في عالم رقمي متسارع. اختر أيًا من خدماتنا وبواباتنا التدريبية أدناه لتبدأ رحلتك التفاعلية معنا مجاناً بالكامل!
                </p>

                {/* Micro CTA and action guide */}
                <div className="pt-4 flex flex-wrap gap-4 text-xs">
                  <span className="px-3.5 py-2 bg-slate-900/80 rounded-xl border border-slate-800 text-slate-400 font-sans">
                    📚 متكامل كلياً مع كاشف الأخطاء ومحاكي الأكواد
                  </span>
                </div>
              </div>

              {/* Left Side: Arched/Curved boardroom visual panels to match the screenshot precisely */}
              <div className="lg:col-span-6 relative min-h-[300px] flex items-center justify-center">
                <div className="grid grid-cols-3 gap-3 w-full max-w-md relative z-10">
                  {/* Arch Panel 1 - left slice */}
                  <div 
                    className="rounded-t-full h-[260px] bg-cover bg-left border border-slate-700/30 shadow-2xl overflow-hidden relative group transition-transform duration-500 hover:scale-[1.03]"
                    style={{ backgroundImage: `url(${boardroomHero})` }}
                  >
                    <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-colors" />
                  </div>

                  {/* Arch Panel 2 - center/tallest slice */}
                  <div 
                    className="rounded-t-full h-[310px] bg-cover bg-center border border-cyan-500/20 shadow-2xl overflow-hidden relative -translate-y-4 group transition-transform duration-500 hover:scale-[1.03]"
                    style={{ backgroundImage: `url(${boardroomHero})` }}
                  >
                    <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-colors" />
                    <div className="absolute inset-x-0 bottom-4 text-center">
                      <span className="px-2 py-0.5 bg-cyan-950/80 border border-cyan-500/40 text-[9px] font-bold text-cyan-400 rounded-full">
                        FUTURE
                      </span>
                    </div>
                  </div>

                  {/* Arch Panel 3 - right slice */}
                  <div 
                    className="rounded-t-full h-[240px] bg-cover bg-right border border-slate-700/30 shadow-2xl overflow-hidden relative group transition-transform duration-500 hover:scale-[1.03]"
                    style={{ backgroundImage: `url(${boardroomHero})` }}
                  >
                    <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-colors" />
                  </div>
                </div>

                {/* Arched backdrop glow */}
                <div className="absolute w-80 h-80 bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-cyan-500/20 rounded-tl-3xl pointer-events-none" />
                <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b border-r border-indigo-500/20 rounded-br-3xl pointer-events-none" />
              </div>
            </div>

            {/* The 6-Card Bento Grid (Exactly as sent in physical screenshot) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Card 01 - تطوير المواقع الإلكترونية */}
              <div 
                onClick={() => {
                  setActiveTab('learn-html');
                  const el = document.getElementById('tab-learnhtml-btn');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#091223]/90 backdrop-blur-md border border-[#19273c] p-6 rounded-2xl shadow-xl hover:border-cyan-500/40 transition-all duration-300 cursor-pointer group relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 left-0 w-20 h-20 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 rounded-xl group-hover:scale-105 transition-transform">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-slate-500 font-mono">01</span>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">تطوير المواقع الإلكترونية</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      تصميم وتطوير مواقع ويب احترافية سريعة، آمنة ومتجاوبة مع جميع الأجهزة.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 02 - تصميم واجهات وتجربة المستخدم */}
              <div 
                onClick={() => {
                  setActiveTab('article');
                  const el = document.getElementById('tab-article-btn');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#091223]/90 backdrop-blur-md border border-[#19273c] p-6 rounded-2xl shadow-xl hover:border-indigo-500/40 transition-all duration-300 cursor-pointer group relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 left-0 w-20 h-20 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-indigo-950/60 border border-indigo-800/40 text-indigo-400 rounded-xl group-hover:scale-105 transition-transform">
                      <Layers className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-slate-500 font-mono">02</span>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-bold text-white text-base group-hover:text-indigo-300 transition-colors">تصميم واجهات وتجربة المستخدم</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      تصاميم عصرية تركز على تجربة المستخدم باستخدام أفضل الممارسات.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 03 - تطوير تطبيقات الموبايل */}
              <div 
                onClick={() => {
                  setSelectedTrack('mobile');
                  setActiveTab('interactive');
                  const el = document.getElementById('tab-interactive-btn');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#091223]/90 backdrop-blur-md border border-[#19273c] p-6 rounded-2xl shadow-xl hover:border-blue-500/40 transition-all duration-300 cursor-pointer group relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 left-0 w-20 h-20 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-blue-950/60 border border-blue-800/40 text-blue-400 rounded-xl group-hover:scale-105 transition-transform">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-slate-500 font-mono">03</span>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-bold text-white text-base group-hover:text-blue-300 transition-colors">تطوير تطبيقات الموبايل</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      تطوير تطبيقات أصلية عالية الجودة لمنصتي Android و iOS.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 04 - أتمتة وبرامج الإدارة */}
              <div 
                onClick={() => {
                  setActiveTab('projects');
                  const el = document.getElementById('tab-projects-btn');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#091223]/90 backdrop-blur-md border border-[#19273c] p-6 rounded-2xl shadow-xl hover:border-violet-500/40 transition-all duration-300 cursor-pointer group relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 left-0 w-20 h-20 bg-violet-500/5 rounded-full blur-xl pointer-events-none" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-violet-950/60 border border-violet-800/40 text-violet-400 rounded-xl group-hover:scale-105 transition-transform">
                      <Settings className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-slate-500 font-mono">04</span>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-bold text-white text-base group-hover:text-violet-300 transition-colors">أتمتة وبرامج الإدارة</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      تطوير أنظمة مخصصة لإدارة العمليات وزيادة الكفاءة وتقليل التكاليف.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 05 - حل المشاكل */}
              <div 
                onClick={() => {
                  setActiveTab('challenges');
                  const el = document.getElementById('tab-challenges-btn');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#091223]/90 backdrop-blur-md border border-[#19273c] p-6 rounded-2xl shadow-xl hover:border-rose-500/40 transition-all duration-300 cursor-pointer group relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 left-0 w-20 h-20 bg-rose-500/5 rounded-full blur-xl pointer-events-none" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-rose-950/60 border border-rose-800/40 text-rose-400 rounded-xl group-hover:scale-105 transition-transform">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-slate-500 font-mono">05</span>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-bold text-white text-base group-hover:text-rose-300 transition-colors">حل المشاكل</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      حل مشكلات البرمجيات وتحسين الأداء وتقديم استشارات تقنية فعالة.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 06 - أدوات الذكاء الاصطناعي */}
              <div 
                onClick={() => {
                  setSelectedTrack('ai');
                  setActiveTab('interactive');
                  const el = document.getElementById('tab-interactive-btn');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#091223]/90 backdrop-blur-md border border-[#19273c] p-6 rounded-2xl shadow-xl hover:border-sky-500/40 transition-all duration-300 cursor-pointer group relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 left-0 w-20 h-20 bg-sky-500/5 rounded-full blur-xl pointer-events-none" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-sky-950/60 border border-sky-850/40 text-sky-400 rounded-xl group-hover:scale-105 transition-transform">
                      <Sparkles className="w-5 h-5 text-sky-400" />
                    </div>
                    <span className="text-sm font-bold text-slate-500 font-mono">06</span>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-bold text-white text-base group-hover:text-sky-300 transition-colors">أدوات الذكاء الاصطناعي</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      أدوات ذكية تعتمد على الذكاء الاصطناعي لتحليل البيانات واتخاذ قرارات أفضل.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom 4 Horizontal Pillar Items (Matches physical photo exactly, RTL ordered) */}
            <div className="p-6 bg-[#081222]/60 rounded-2xl border border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 tracking-wide relative overflow-hidden">
              
              {/* Item 4: دعم فني متواصل */}
              <div className="flex items-center gap-4 justify-start p-2 leading-relaxed">
                <div className="p-3 bg-indigo-950/60 border border-indigo-900/60 text-indigo-400 rounded-xl shadow-md">
                  <Headphones className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-sm font-bold text-white">دعم فني متواصل</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">متابعة ومساعدة على مدار الساعة</p>
                </div>
              </div>

              {/* Item 3: جودة عالية وإتقان */}
              <div className="flex items-center gap-4 justify-start p-2 border-t sm:border-t-0 sm:border-r border-slate-800/40 lg:pr-6 leading-relaxed">
                <div className="p-3 bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 rounded-xl shadow-md">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-sm font-bold text-white">جودة عالية وإتقان</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">تنفيذ متميز وفقًا للمواصفات والأفضل دائمًا</p>
                </div>
              </div>

              {/* Item 2: التزام بالمواعيد والدقة */}
              <div className="flex items-center gap-4 justify-start p-2 border-t lg:border-t-0 lg:border-r border-slate-800/40 lg:pr-6 leading-relaxed">
                <div className="p-3 bg-amber-950/60 border border-amber-900/60 text-amber-450 rounded-xl shadow-md">
                  <Timer className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-sm font-bold text-white">التزام بالمواعيد والدقة</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">تسليم سريع وضمان العمل في وقته المدرج</p>
                </div>
              </div>

              {/* Item 1: حلول مبتكرة نتائج أفضل */}
              <div className="flex items-center gap-4 justify-start p-2 border-t lg:border-t-0 lg:border-r border-slate-800/40 lg:pr-6 leading-relaxed">
                <div className="p-3 bg-emerald-950/60 border border-emerald-900/60 text-emerald-400 rounded-xl shadow-md">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-sm font-bold text-white">حلول مبتكرة نتائج أفضل</span>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-light">تطوير مستدام يزيد الكفاءة الكلية</p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab 1: Formatted Article & SEO HTML Copier */}
        {activeTab === 'article' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left/Main Column - Read/View Content */}
            <div className="lg:col-span-8 space-y-6 animate-fade-in">
              
              <div className="bg-slate-900/30 backdrop-blur-md rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl overflow-hidden hover:border-slate-700/80 transition-all duration-300">
                
                {/* Meta SEO Status indicator */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800 flex-wrap gap-4">
                  <span className="text-xs px-2.5 py-1 bg-cyan-950/40 text-cyan-400 border border-cyan-800/60 rounded-md font-medium">عربي فصحى - متوافق مع محركات البحث (SEO)</span>
                  <div className="text-slate-400 text-xs flex items-center gap-1.5 font-medium">
                    <Timer className="w-3.5 h-3.5 text-cyan-400" />
                    <span>وقت القراءة: 6 دقائق</span>
                  </div>
                </div>

                {/* Article Rendering */}
                <div className="prose max-w-none select-text text-slate-300">
                  <h1 className="text-2xl sm:text-3.5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-100 leading-tight mb-6">
                    {seoTitle}
                  </h1>

                  <div className="p-4.5 bg-slate-950/80 rounded-2xl text-xs sm:text-sm text-slate-300 mb-8 border border-slate-800/80 leading-relaxed font-sans flex items-start gap-3">
                    <Info className="w-5.5 h-5.5 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <strong>دليل التصدير الفوري:</strong> تم تهيئة هذا المقال للنسخ السريع لتنزيله في مدونات الـ WordPress، المواقع الشخصية، أو CMS. استخدم التبويب الجانبي لتعديل مدخلات السيو ونسخ كود HTML الخام بنقرة زر واحدة!
                    </div>
                  </div>

                  <p className="text-base sm:text-lg leading-relaxed text-slate-200 mb-6 font-light">
                    في عصر التحول الرقمي المتسارع، لم تعد البرمجة مجرد مهارة تقنية ثانوية؛ بل أصبحت لغة العصر والقوة الدافعة خلف كل ابتكار يحيط بنا. من الهواتف الذكية والتطبيقات السحابية إلى أنظمة الذكاء الاصطناعي والثورة البيولوجية الرقمية، تشكل البرمجة الأساس الذي تُبنى عليه حلول الغد. إن <strong className="text-white font-bold">تعلم البرمجة من الصفر</strong> لا يمنحك فقط فرصة للحصول على وظائف مرموقة برواتب مجزية، بل يغير طريقة تفكيرك تماماً؛ حيث يدرب عقلك على حل المشكلات المعقدة وتفكيكها إلى عناصر بسيطة، ويفتح لك آفاقاً لا حصر لها لتحويل أفكارك الريادية إلى مشاريع رقمية حقيقية تؤثر في حياة الملايين.
                  </p>

                  <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 mt-10 mb-4 pb-2 border-b border-slate-800/40">لماذا يجب عليك أن تبدأ رحلتك في تعلم البرمجة اليوم؟</h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-6 font-sans">
                    الطلب العالمي على المهنة هو الأكثر نمواً واستقراراً. سواء كنت تطمح لتغيير مسارك المهني بالكامل، أو تريد بناء عملك المستقل، أو تسعى لفهم كيف تدار التكنولوجيا الحديثة، فإن المبادرة بوضع قدمك على الطريق هي الخطوة الأهم. الجميل في عالم اليوم هو أن التطور التقني والإنترنت وفرا لك تعليماً عالي الجودة بالمجان وبشكل مرن بالكامل. كل ما تحتاجه هو الشغف، الاستمرارية، و <strong className="text-white font-bold">خارطة طريق تعلم البرمجة</strong> واضحة وعملية ترشدك خطوة بخطوة وتجنبك التشتت لكي تدرك <strong className="text-white font-bold">كيف تصبح مبرمجاً محترفاً</strong>.
                  </p>

                  <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 mt-10 mb-4 pb-2 border-b border-slate-800/40">المسارات الأساسية في عالم البرمجة: اختر وجهتك بحكمة</h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-6">
                    قبل أن تبدأ بكتابة الأكواد، من المهم أن تتعرف على المجالات الرئيسية وتختار المسار الذي يثير فضولك ويتلاءم مع أهدافك المهنية:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <div className="p-5 bg-slate-950/70 rounded-2xl border border-slate-800/80 hover:border-slate-700 hover:bg-slate-950 transition-all">
                      <h3 className="text-base font-bold text-white flex items-center gap-2 mb-2">
                        <span className="w-6 h-6 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-xs font-bold">1</span>
                        تطوير الويب (Web Dev)
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                        تصميم وبناء كل ما يتعلق بالمواقع الإلكترونية والمتصفحات. ينقسم لواجهات أمامية (Frontend) باستخدام (CSS, HTML, JS) وخلفية (Backend) تهتم بالسيرفرات والبيانات.
                      </p>
                    </div>
                    <div className="p-5 bg-slate-950/70 rounded-2xl border border-slate-800/80 hover:border-slate-700 hover:bg-slate-950 transition-all">
                      <h3 className="text-base font-bold text-white flex items-center gap-2 mb-2">
                        <span className="w-6 h-6 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-xs font-bold">2</span>
                        تطبيقات الهواتف ذكية
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                        تطوير التطبيقات الرائعة للهواتف بنمطين: أصلية (iOS بـ Swift، أندرويد بـ Kotlin)، أو ممتدة ومتعددة المنصات مثل Flutter لخدمة النظامين بكود موحد.
                      </p>
                    </div>
                    <div className="p-5 bg-slate-950/70 rounded-2xl border border-slate-800/80 hover:border-slate-700 hover:bg-slate-950 transition-all">
                      <h3 className="text-base font-bold text-white flex items-center gap-2 mb-2">
                        <span className="w-6 h-6 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-xs font-bold">3</span>
                        علوم البيانات وتحليلها
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                        نفط العصر الرقمي! يهدف لاستخراج الإشارات والمؤشرات الإستراتيجية لمساعدة الكينات على اتخاذ القرارات مبنياً على أرقام بلغة بايثون و NumPy.
                      </p>
                    </div>
                    <div className="p-5 bg-slate-950/70 rounded-2xl border border-slate-800/80 hover:border-slate-700 hover:bg-slate-950 transition-all">
                      <h3 className="text-base font-bold text-white flex items-center gap-2 mb-2">
                        <span className="w-6 h-6 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-xs font-bold">4</span>
                        الذكاء الاصطناعي وتعلم الآلة
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                        المجال الأكثر إثارة اليوم. يتضمن تدريب الأنظمة وتغذيتها بمكتبات بايثون لتوقع الأنماط وتطوير نماذج ذكية قادرة على الأتمتة وصنع ردود الأفعال.
                      </p>
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 mt-10 mb-4 pb-2 border-b border-slate-800/40">الجدول الزمني المقترح لمعرفة كيف تصبح مبرمجاً محترفاً</h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-4">
                    الاحتراف لا يحدث في ليلة وضحاها، فهو كعلم ينمو بالتدرج العقلي المنظم والمصاحب للاستدامة والتجربة الحقيقية:
                  </p>
                  <div className="space-y-4 mb-6">
                    <div className="flex gap-3 items-start">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed"><strong className="text-white">الأشهر 1 - 3 (مرحلة الأساسيات الصلبة):</strong> ركز بالكامل على مفاهيم البرمجة الكبرى مثل الحلقات والشرط والمتغيرات بلغة بايثون أو أساسيات المتصفح لتصقل عقليتك لحل المشكلات بالشكل التجريدي السليم.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.7)]" />
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed"><strong className="text-white">الأشهر 4 - 6 (الغوص الفكري والتخصص المتوجه):</strong> تفريد الأدوات، دراسة وفهم البرمجة كائنية التوجه (OOP) وطرق التعامل مع قواعد البيانات الشائعة والبدء بتركيب إطارات العمل.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.7)]" />
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed"><strong className="text-white">الأشهر 7 - 9 (غرس الأكواد وبورتفوليو منوع):</strong> الابتعاد الكامل عن المشاهدة دون تطبيق! تأسيس ما لا يقل عن 5 مشاريع كاملة وصقل أكوادك ورفعها على GitHub لتصدير أعمالك للعالم أجمع بملفات README فخمة.</p>
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 mt-10 mb-4 pb-2 border-b border-slate-800/40">أفضل المصادر التعليمية العالمية والمجانية لبدء رحلتك</h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-4">
                    يمكنك تلقي أفضل تجربة أكاديمية برمجية في العالم دون دفع فلس واحد. إليك هذه المنصات الأقوى عالمياً لرحلة رصينة:
                  </p>
                  
                  <h3 className="text-base sm:text-lg font-bold text-white mt-4 mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-cyan-400 rounded-xs" />
                    المواقع والمنصات التفاعلية العالمية:
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-300 pr-1">
                      <span className="text-cyan-400">✦</span>
                      <p><strong className="text-white">freeCodeCamp:</strong> المنصة التفاعلية المتربعة على عرش تعليم الويب بالمشاريع الفورية مع تقديم مسوغات التخرج والشهادات المعتمدة.</p>
                    </div>
                    <div className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-300 pr-1">
                      <span className="text-cyan-400">✦</span>
                      <p><strong className="text-white">Harvard CS50:</strong> الكورس الأسطوري المقدم من هارفارد لتعلم أساسيات الكمبيوتر والمنطق بأسلوب تفاعلي ممتع وعالمي.</p>
                    </div>
                    <div className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-300 pr-1">
                      <span className="text-cyan-400">✦</span>
                      <p><strong className="text-white">W3Schools & MDN Docs:</strong> كبسولات مراجع المبرمج السريعة في تصميم وتخطيط الويب وميزات المبرمج اليومية.</p>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mt-4 mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-indigo-500 rounded-xs" />
                    قنوات يوتيوب ومنصات عربية رائدة:
                  </h3>
                  <div className="space-y-2 mb-6">
                    <div className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-300 pr-1">
                      <span className="text-indigo-400">✦</span>
                      <p><strong className="text-white">أكاديمية الزيرو ويب سكول (أشرف وأثمن المسارات):</strong> الذهب الخالص في تعليم الويب وتحديات جافا سكريبت العملية مع كوتشينغ كامل.</p>
                    </div>
                    <div className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-300 pr-1">
                      <span className="text-indigo-400">✦</span>
                      <p><strong className="text-white">قناة كودزيلا (عمرو سليمان):</strong> النقاء البصري في تفتيت أعقد المواضيع وشرح أسس بايثون بسلاسة المبتدئين.</p>
                    </div>
                    <div className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-300 pr-1">
                      <span className="text-indigo-400">✦</span>
                      <p><strong className="text-white">منصة سطر (Satr.co):</strong> فلو وتدريب عربي تفاعلي شيق وسلس متصل بالواجهات الحية.</p>
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 mt-10 mb-4 pb-2 border-b border-slate-800/40">نصائح ذهبية لتجاوز "عقبات المبتدئين" والاستمرار في الطريق</h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-4">
                    عندما تبدأ طريقاً كبيراً، تحصّن دوماً بأمور وتكتيكات تضمن لك تخطي لحظات الإحباط الطبيعية:
                  </p>
                  <div className="space-y-3.5 mb-6">
                    <div className="flex gap-3 items-start">
                      <div className="w-6 h-6 rounded-md bg-slate-800/80 text-cyan-400 text-xs font-mono font-bold flex items-center justify-center shrink-0 border border-slate-700/50 mt-0.5">1</div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed"><strong className="text-white">اجعل الأخطاء البرمجية (Debugging) رفيقاً لك:</strong> ظهور شاشات برمجية حمراء لا يعني أنك مبرمج سيء، بل هنا مكمن التعلم. ابدأ بتدبر رسالة الخطأ ونسخها في مجتمعات البرمجة، فالطريق للحل يجعلك ذكياً.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="w-6 h-6 rounded-md bg-slate-800/80 text-cyan-400 text-xs font-mono font-bold flex items-center justify-center shrink-0 border border-slate-700/50 mt-0.5">2</div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed"><strong className="text-white">أوقف متلازمة Tutorial Hell مبهراً:</strong> لا تكثر من المشاهدة بشكل مجرد. إذا شاهدت نصف ساعة تدرب عليها 3 ساعات لتجعل مخازن الكود تستوعب المكونات وطريق الحركة الصحيح.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="w-6 h-6 rounded-md bg-slate-800/80 text-cyan-400 text-xs font-mono font-bold flex items-center justify-center shrink-0 border border-slate-700/50 mt-0.5">3</div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed"><strong className="text-white">افهم قيمة المشاريع الصغيرة:</strong> بناء آلة حاسبة ناجحة ومستقرة تفخر به وتنشره يساهم بـ 70% من تهيئة حالتك النفسية والمعرفية لطلب الوظائف مقارنة بتكديس شهادات نظرية.</p>
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 mt-10 mb-4 pb-2 border-b border-slate-800/40">5 مشاريع برمجية بسيطة وأساسية يجب على كل مبتدئ تنفيذها</h2>
                  <div className="space-y-2 pr-1 text-slate-300">
                    <div className="flex gap-2.5 items-center text-xs sm:text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      <p><strong className="text-white">تطبيق To-Do List التفاعلي:</strong> حجر الزاوية لجداول الكرود (CRUD logic).</p>
                    </div>
                    <div className="flex gap-2.5 items-center text-xs sm:text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      <p><strong className="text-white">آلة حاسبة ذكية ومتجاوبة:</strong> تدريب رياضي وفحص منطقي للتعامل مع العمليات وتجنب الأخطاء والمشاكل.</p>
                    </div>
                    <div className="flex gap-2.5 items-center text-xs sm:text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      <p><strong className="text-white">تطبيق أحوال الجو والطقس (Weather API):</strong> استدعاء ومعالجة كائنات الجيسون JSON المتغيرة لكسر حاجز الخوف من الخوادم.</p>
                    </div>
                    <div className="flex gap-2.5 items-center text-xs sm:text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      <p><strong className="text-white">البورتفوليو والمعرض الشخصي (Portfolio):</strong> هويتك الحية لتأمين تواصل أصحاب العمل والعملاء المستقلين معك.</p>
                    </div>
                    <div className="flex gap-2.5 items-center text-xs sm:text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      <p><strong className="text-white">لعبة كلاسيكية X-O أو Snake:</strong> الملاذ الممتع لتطبيق المصفوفات وفك شفرات الفوز بأسهل المخرجات.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-slate-800 text-center">
                  <span className="text-cyan-400 font-bold block mb-1">💡 خطوتك الأولى تبدأ بخطة محكمة وكود حقيقي!</span>
                  <p className="text-slate-500 text-[10px] sm:text-xs">تمت الصياغة والتبسيط لتلائم غايات السيو SEO وقابلية النسخ الكامل.</p>
                </div>

              </div>

            </div>

            {/* Right Column - SEO HTML Customizer & Copy Panel */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-slate-900/30 backdrop-blur-md rounded-3xl border border-slate-800 p-5 sticky top-24 shadow-2xl hover:border-slate-700/60 transition-all duration-300">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800/60">
                  <FileCode2 className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-bold text-white text-sm md:text-base">تخصيص كود الـ HTML والـ SEO</h3>
                </div>
                
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  قم بتغيير إعدادات العنوان، الكلمات الدلالية، والوصف للمقال لتوليد كود وبنية HTML جاهزة للنسخ والنشر الفوري في موقعك.
                </p>

                {/* Form Controls */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">عنوان المقالة الرئيسي (H1)</label>
                    <input 
                      type="text" 
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      placeholder="عنوان المقال المستهدف"
                      className="w-full text-xs px-3.5 py-2.5 border border-slate-800 rounded-xl focus:outline-hidden focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 bg-slate-950 text-slate-200 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">الكلمات المفتاحية المستهدفة (SEO Keywords)</label>
                    <textarea 
                      rows={2}
                      value={seoKeywords}
                      onChange={(e) => setSeoKeywords(e.target.value)}
                      placeholder="كلمات دلالية تفصلها فاصلة"
                      className="w-full text-xs px-3.5 py-2 border border-slate-800 rounded-xl focus:outline-hidden focus:border-cyan-500 bg-slate-950 text-slate-200 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">وصف الميتا للمقالة (Meta Description)</label>
                    <textarea 
                      rows={3}
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                      placeholder="موجز جذاب لمحركات البحث"
                      className="w-full text-xs px-3.5 py-2 border border-slate-800 rounded-xl focus:outline-hidden focus:border-cyan-500 bg-slate-950 text-slate-200 transition-all"
                    />
                  </div>
                </div>

                {/* Simulated Google Search Result Preview */}
                <div className="mt-5 p-4 bg-slate-950 border border-slate-800 rounded-2xl shadow-inner">
                  <div className="text-[10px] text-slate-500 font-mono tracking-wider mb-2 flex items-center gap-1.5 leading-none">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Google SEO Snippet Preview</span>
                  </div>
                  <div className="text-blue-400 text-xs font-semibold hover:underline truncate block">
                    {seoTitle}
                  </div>
                  <div className="text-cyan-500 text-[10px] truncate mb-1.5 block font-mono">
                    mysite.com › categories › learn-programming
                  </div>
                  <p className="text-slate-400 text-[10px] leading-relaxed line-clamp-2">
                    {seoDescription}
                  </p>
                </div>

                {/* Generate & Quick Copy Button */}
                <div className="mt-5 space-y-2">
                  <button
                    onClick={handleCopyHTML}
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white hover:opacity-90 active:scale-[0.98] font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
                  >
                    {copiedHTMLSuccessfully ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        تم نسخ كود المقال بنجاح!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 cursor-pointer" />
                        نسخ كود الـ HTML والميتا بالكامل
                      </>
                    )}
                  </button>
                  {copyError && (
                    <div className="p-3 bg-rose-950/40 border border-rose-900/40 text-rose-300 text-[11px] rounded-xl font-medium leading-relaxed text-right animate-fade-in flex items-start gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-rose-450" />
                      <span>{copyError}</span>
                    </div>
                  )}
                  <p className="text-[10px] text-center text-slate-500 font-medium">
                    * ينسخ الكود بكامل الهيكلية والوسوم المخصصة للأرشفة.
                  </p>
                </div>

                {/* Code Preview Box details collapsed */}
                <div className="mt-4 border-t border-slate-800 pt-4">
                  <details className="group">
                    <summary className="flex items-center justify-between text-xs font-semibold text-slate-400 cursor-pointer list-none select-none">
                      <span className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        معاينة الكود المولد للأرشفة
                      </span>
                      <ChevronDown className="w-4 h-4 group-open:rotate-180 text-slate-500 transition-transform" />
                    </summary>
                    <div className="mt-3 text-[10px] bg-slate-950 text-slate-300 rounded-xl p-4 border border-slate-800 font-mono overflow-x-auto max-h-48 overflow-y-auto leading-relaxed" dir="ltr">
                      <pre className="whitespace-pre">{generatedSEO_HTML}</pre>
                    </div>
                  </details>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Interactive Dynamic Roadmap Phases / Schedule Picker */}
        {activeTab === 'interactive' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Top Interactive Configuration bar */}
            <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-3xl shadow-2xl backdrop-blur-md">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">الجدول الزمني التفاعلي والمهام الأساسية</h3>
                  <p className="text-xs text-slate-400">قم بتتبع تقدمك الشخصي عبر مراحل الدراسة المقترحة البالغة 9 أشهر، وتحدّ مهاراتك اليومية بتسجيل المهام التي أنجزتها.</p>
                </div>
                
                {/* Track Selector buttons */}
                <div className="flex flex-wrap gap-2 animate-fade-in">
                  <button 
                    onClick={() => setSelectedTrack('web')} 
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      selectedTrack === 'web' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.25)] border-blue-500/20' 
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border-slate-850 hover:bg-slate-900/60'
                    }`}
                  >
                    🕸️ تطوير الويب
                  </button>
                  <button 
                    onClick={() => setSelectedTrack('mobile')} 
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      selectedTrack === 'mobile' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.25)] border-blue-500/20' 
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border-slate-850 hover:bg-slate-900/60'
                    }`}
                  >
                    📱 تطبيقات هاتف
                  </button>
                  <button 
                    onClick={() => setSelectedTrack('data')} 
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      selectedTrack === 'data' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.25)] border-blue-500/20' 
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border-slate-850 hover:bg-slate-900/60'
                    }`}
                  >
                    📊 علوم بيانات
                  </button>
                  <button 
                    onClick={() => setSelectedTrack('ai')} 
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      selectedTrack === 'ai' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.25)] border-blue-500/20' 
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border-slate-850 hover:bg-slate-900/60'
                    }`}
                  >
                    🤖 ذكاء اصطناعي
                  </button>
                </div>
              </div>

              {/* Progress metrics detailed bar inside tab */}
              <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div>
                  <span className="text-xs text-slate-400 font-medium font-sans">المهام المنجزة بالخارطة:</span>
                  <div className="text-base sm:text-lg font-black text-white mt-1">{completedRoadmapTasksCount} من أصل {totalRoadmapTasks} مهمة حاسمة</div>
                </div>
                
                <div className="md:col-span-2">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-semibold text-cyan-400">معدل التعلم الحالي: {roadmapProgressPercent}%</span>
                    <span className="text-slate-500">متبقي {totalRoadmapTasks - completedRoadmapTasksCount} مهارة</span>
                  </div>
                  <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800/80">
                    <div 
                      className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 h-full transition-all duration-500 rounded-full" 
                      style={{ width: `${roadmapProgressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Timelines Cards */}
            <div className="grid grid-cols-1 gap-6">
              {ROADMAP_STEPS.map((step, idx) => {
                // Calculate completion internal to this specific step
                const stepTasksInStore = step.tasks.map((_, tIdx) => checkedTasks[`${step.id}-${tIdx}`]);
                const stepCompletedCount = stepTasksInStore.filter(Boolean).length;
                const stepPercent = Math.round((stepCompletedCount / step.tasks.length) * 100);

                return (
                  <div key={step.id} className="bg-slate-900/20 backdrop-blur-md rounded-3xl border border-slate-800 hover:border-slate-700/80 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-[0_0_25px_rgba(59,130,246,0.08)]">
                    
                    {/* Step Card Header */}
                    <div className="p-5 border-b border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="p-2.5 bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-xl shadow-md flex items-center justify-center shrink-0 w-11 h-11">
                          {idx === 0 && <span className="text-lg font-black">1</span>}
                          {idx === 1 && <span className="text-lg font-black">2</span>}
                          {idx === 2 && <span className="text-lg font-black">3</span>}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded-md border border-cyan-800/60">{step.timeline}</span>
                            <span className="text-[11px] text-slate-400 font-bold">{step.phase}</span>
                          </div>
                          <h4 className="text-sm sm:text-base font-bold text-white mt-1">{step.title}</h4>
                        </div>
                      </div>

                      {/* Step Progress Percentage badge */}
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-300 bg-slate-950 px-3 py-1.5 rounded-full border border-slate-800/80 font-mono">
                          إكمال المرحلة: {stepPercent}%
                        </span>
                      </div>
                    </div>

                    {/* Step Description */}
                    <div className="p-5 bg-transparent border-b border-slate-800/60">
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">{step.description}</p>
                    </div>

                    {/* Checkboxes tasks */}
                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {step.tasks.map((task, tIdx) => {
                        const isTaskChecked = !!checkedTasks[`${step.id}-${tIdx}`];
                        return (
                          <div 
                            key={tIdx} 
                            onClick={() => handleToggleTask(step.id, tIdx)}
                            className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer select-none transition-all ${
                              isTaskChecked 
                                ? 'bg-cyan-950/20 border-cyan-800/80 text-white shadow-[inset_0_0_12px_rgba(6,182,212,0.05)]' 
                                : 'bg-slate-950 border-slate-850 text-slate-300 hover:bg-slate-900/60 hover:text-white'
                            }`}
                          >
                            <input 
                              type="checkbox" 
                              checked={isTaskChecked}
                              onChange={() => {}} // handled in parent click safely with pointer-events-none to prevent double clicks
                              className="accent-cyan-500 h-4.5 w-4.5 rounded-md border-slate-800 mt-0.5 shrink-0 pointer-events-none"
                            />
                            <div className="text-[11px] sm:text-xs leading-relaxed font-sans">
                              {/* Inject customized details for specific tracks */}
                              {step.id === 2 && tIdx === 0 ? (
                                <span>
                                  <strong className="text-white">اختيار مسار {selectedTrack === 'web' ? 'تطوير الويب' : selectedTrack === 'mobile' ? 'تطوير تطبيقات الموبايل' : selectedTrack === 'data' ? 'علوم البيانات المتقدمة' : 'الذكاء الاصطناعي وتعلم الآلة'}</strong> والمواظبة اليومية فيه.
                                </span>
                              ) : step.id === 2 && tIdx === 4 ? (
                                <span>
                                  التعرف على إطاره المختار (أمثلة: {selectedTrack === 'web' ? 'React.js أو Next.js' : selectedTrack === 'mobile' ? 'Flutter / Dart' : selectedTrack === 'data' ? 'Pandas & NumPy' : 'PyTorch / Tensorflow'}).
                                </span>
                              ) : (
                                <span>{task}</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Dynamic Encouragement in Card Footer */}
                    {stepPercent === 100 && (
                      <div className="bg-emerald-950/30 p-4 px-5 flex items-center gap-3 text-xs text-emerald-300 border-t border-emerald-900/60 animate-fade-in">
                        <Award className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                        <span><strong>عمل مذهل بالكامل!</strong> لقد تمكنت من إتمام متطلبات وقائمة مهام {step.timeline} بنجاح ساحق. استمر نحو التحدي القادم.</span>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

            {/* Quick reset button */}
            <div className="flex justify-end pt-4">
              {showResetConfirm ? (
                <div className="flex items-center gap-3 animate-fade-in text-xs">
                  <span className="text-rose-400 font-bold font-sans">تصفير كل الإنجاز نهائياً؟</span>
                  <button 
                    onClick={() => {
                      setCheckedTasks({});
                      setShowResetConfirm(false);
                    }}
                    className="px-3.5 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold rounded-xl cursor-pointer transition-all shadow-md"
                  >
                    نعم، متأكد
                  </button>
                  <button 
                    onClick={() => setShowResetConfirm(false)}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold rounded-xl cursor-pointer transition-all border border-slate-800"
                  >
                    تراجع
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowResetConfirm(true)}
                  className="text-xs text-slate-500 hover:text-rose-450 font-semibold font-sans flex items-center gap-1.5 p-1 bg-transparent cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  تصفير بيانات التقدم السابقة والبدء من جديد
                </button>
              )}
            </div>

          </div>
        )}

        {/* Tab 3: Simple 5 Projects portfolio sandbox */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-fade-in">
            
            <div className="bg-slate-900/30 backdrop-blur-md rounded-3xl border border-slate-800 p-6 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">الحقيبة الفنية: 5 مشاريع مبتكرّة لبناء معرض أعمالك</h3>
                <p className="text-xs text-slate-400 font-medium">خطط ونفّذ خمسة من أهم المشاريع التطبيقية المقترحة من قبل المرشد، لتثبت مهاراتك بشكل ملموس لأصحاب الأعمال.</p>
              </div>

              {/* Counter projects completed */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 px-6 text-center shrink-0">
                <span className="text-[10px] text-slate-400 block font-semibold leading-none font-sans">إنجاز المشاريع الخمسة</span>
                <span className="text-2xl font-black text-white block mt-1.5 font-mono">{completedProjectsCount} / 5</span>
                <div className="w-24 bg-slate-900 h-1.5 rounded-full overflow-hidden mt-2">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-300" style={{ width: `${projectsProgressPercent}%` }} />
                </div>
              </div>
            </div>

            {/* Grid of Projects */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {STARTER_PROJECTS.map((project, index) => {
                const isProjectDone = !!completedProjects[project.id];
                return (
                  <div key={project.id} className={`rounded-3xl border transition-all duration-300 overflow-hidden shadow-xl ${
                    isProjectDone 
                      ? 'border-emerald-500/40 bg-emerald-950/10 shadow-[0_0_20px_rgba(16,185,129,0.05)]' 
                      : 'border-slate-850 bg-slate-900/10 hover:border-slate-700'
                  }`}>
                    
                    {/* Project Header */}
                    <div className="p-5 border-b border-slate-850 bg-slate-950/40 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                            index < 2 
                              ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60' 
                              : index < 4 
                              ? 'bg-blue-950/60 text-blue-400 border-blue-800/60' 
                              : 'bg-violet-950/60 text-violet-400 border-violet-800/60'
                          }`}>
                            المشروع #{project.id}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-900 text-slate-400 rounded-md border border-slate-800">
                            صعوبة: {project.difficulty}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-white text-sm sm:text-base flex items-center gap-1.5">
                          <span>{project.titleArabic}</span>
                          <span className="text-xs text-slate-500 font-mono">({project.titleEnglish})</span>
                        </h4>
                      </div>
                      
                      {/* Interactive toggle Completion for portfolio */}
                      <button 
                        onClick={() => {
                          setCompletedProjects(prev => ({
                            ...prev,
                            [project.id]: !prev[project.id]
                          }));
                        }}
                        className={`text-[11px] px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer border select-none transition-all ${
                          isProjectDone 
                            ? 'bg-emerald-600 hover:bg-emerald-700 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.25)]' 
                            : 'bg-slate-950 hover:bg-slate-900 border-slate-800 text-slate-300'
                        }`}
                      >
                        <CheckSquare className="w-3.5 h-3.5" />
                        <span>{isProjectDone ? 'مكتمل ومرفوع!' : 'حفظ كـ مكتمل'}</span>
                      </button>
                    </div>

                    {/* Project body */}
                    <div className="p-5 space-y-4">
                      <div>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">{project.description}</p>
                      </div>

                      {/* Objectives checklist */}
                      <div className="bg-slate-950/60 rounded-2xl p-4 border border-slate-850">
                        <span className="text-[11px] font-bold text-slate-200 block mb-2 px-0.5 flex items-center gap-1.5">
                          <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
                          المتطلبات الأساسية للتنفيذ (Core Requirements)
                        </span>
                        <ul className="space-y-1.5">
                          {project.objectives.map((obj, oIdx) => (
                            <li key={oIdx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                              <span className="text-cyan-400/80 shrink-0 mt-1 select-none">✦</span>
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Project Tech Stack */}
                      <div>
                        <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">التقنيات والمكتبات الموصى بها:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack.map((tech, tIdx) => (
                            <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 bg-slate-950 text-slate-300 rounded-md border border-slate-850 hover:border-cyan-500 hover:text-white transition-colors duration-200">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>

            {/* Simulated CV Badge */}
            {completedProjectsCount > 0 && (
              <div className="bg-gradient-to-r from-blue-950/40 via-indigo-950/40 to-cyan-950/40 border border-slate-800/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mt-8 animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-2xl shadow-xl flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-white text-sm md:text-base">معرض أعمالك الاحترافي قيد التأسيس!</h5>
                    <p className="text-xs text-slate-300 mt-1.5 font-sans leading-relaxed">لقد أنجزت بنجاح {completedProjectsCount} من أصل 5 مشاريع مبتدئة. هذه الخطوة هامة جداً لإثبات قدرتك البرمجية الحقيقية على أرض الواقع.</p>
                  </div>
                </div>
                <div className="bg-indigo-600 text-white font-bold text-xs px-4.5 py-2.5 rounded-xl border border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.25)] shrink-0">
                  باقي {5 - completedProjectsCount} مشاريع للاحتراف المعرضي!
                </div>
              </div>
            )}

          </div>
        )}

        {/* Tab: Learn HTML Step-by-Step */}
        {activeTab === 'learn-html' && (
          <HTMLGuide />
        )}

        {/* Tab 4: Free Interactive Resources Search Hub */}
        {activeTab === 'resources' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Resources Introduction Card */}
            <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-3xl shadow-2xl backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-1">مكتبة المصادر المجانية الرائدة برمجياً</h3>
              <p className="text-xs text-slate-400 leading-normal">
                لتوفير مئات الدولارات من الكورسات مجهولة القيمة، قمنا بتدقيق هذه المصادر التفاعلية وقنوات اليوتيوب المصنفة خصيصاً لمساعدتك على الإبحار بنقرة بسيطة وسلسة.
              </p>

              {/* Filters Box */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between pt-5 border-t border-slate-800/60 gap-4">
                
                {/* Search resource bar */}
                <div className="relative w-full sm:max-w-xs">
                  <span className="absolute right-3 top-3 text-slate-500">
                    <Search className="w-4 h-4" />
                  </span>
                  <input 
                    type="text" 
                    value={searchResource}
                    onChange={(e) => setSearchResource(e.target.value)}
                    placeholder="ابحث باسم المصدر أو مجاله..."
                    className="w-full text-xs pr-9 pl-3.5 py-2.5 border border-slate-800 rounded-xl focus:outline-hidden focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 bg-slate-950 text-slate-200 transition-all font-sans"
                  />
                </div>

                {/* Filter buttons */}
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setResourceFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all border ${
                      resourceFilter === 'all' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.25)] border-blue-500/20' 
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border-slate-850 hover:bg-slate-900/60'
                    }`}
                  >
                    عرض الكل
                  </button>
                  <button
                    onClick={() => setResourceFilter('موقع تفاعلي')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all border ${
                      resourceFilter === 'موقع تفاعلي' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.25)] border-blue-500/20' 
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border-slate-850 hover:bg-slate-900/60'
                    }`}
                  >
                    مواقع تفاعلية
                  </button>
                  <button
                    onClick={() => setResourceFilter('قناة يوتيوب')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all border ${
                      resourceFilter === 'قناة يوتيوب' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.25)] border-blue-500/20' 
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border-slate-850 hover:bg-slate-900/60'
                    }`}
                  >
                    قنوات يوتيوب
                  </button>
                  <button
                    onClick={() => setResourceFilter('منصة عربية')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all border ${
                      resourceFilter === 'منصة عربية' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.25)] border-blue-500/20' 
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border-slate-850 hover:bg-slate-900/60'
                    }`}
                  >
                    منصات عربية
                  </button>
                </div>

              </div>
            </div>

            {/* Resource Hub Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((res) => (
                <div key={res.id} className="bg-slate-900/20 backdrop-blur-md border border-slate-850 p-5 shadow-xl hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] hover:border-slate-700/80 rounded-3xl transition-all duration-300 flex flex-col justify-between">
                  <div>
                    
                    {/* Badge Category */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                        res.type === 'موقع تفاعلي' 
                          ? 'bg-blue-950/60 text-blue-400 border-blue-800/60' 
                          : res.type === 'قناة يوتيوب' 
                          ? 'bg-red-950/60 text-red-400 border-red-800/60' 
                          : res.type === 'منصة عربية' 
                          ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60' 
                          : 'bg-indigo-950/60 text-indigo-400 border-indigo-800/60'
                      }`}>
                        {res.type}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">ID: res-{res.id}</span>
                    </div>

                    {/* Title */}
                    <h4 className="font-bold text-white text-sm md:text-base">{res.name}</h4>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed font-sans min-h-[40px]">{res.description}</p>
                  </div>

                  {/* External Resource Link */}
                  <div className="mt-4 pt-4 border-t border-slate-850 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-mono">انقر للذهاب للمصدر الرئيسي</span>
                    <a 
                      href={res.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <span>زيارة الآن</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>
              ))}

              {filteredResources.length === 0 && (
                <div className="col-span-full py-12 text-center bg-slate-900/30 backdrop-blur-md rounded-3xl border border-slate-850">
                  <div className="text-3xl mb-2">🔍</div>
                  <p className="text-sm font-bold text-slate-300">لم نجد أي مصادر تماشي بحثك الحالي</p>
                  <p className="text-xs text-slate-500 mt-1">تأكد من اختيار "عرض الكل" أو كتابة كلمة مفتاحية أبسط.</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* Tab 5: Gamified Beginner Debugger Playground */}
        {activeTab === 'challenges' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            
            {/* Left side: Active coding challenge container */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="bg-slate-900/30 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 relative overflow-hidden hover:border-slate-700/85 transition-all duration-300">
                
                {/* Header indicators */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-cyan-400 animate-pulse" />
                    <span className="text-xs font-bold text-slate-400 font-sans">
                      بمثابة محاكي الأخطاء البرمجية (Debugging Sandbox)
                    </span>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 bg-slate-950 text-cyan-400 border border-slate-850 rounded-lg font-mono">
                    التحدي {activeChallengeIdx + 1} من {DEBUG_CHALLENGES.length}
                  </span>
                </div>

                {/* Challenge Info */}
                <div className="space-y-3 mb-6">
                  <span className="text-xs font-bold text-slate-400 font-mono">لغة اللغز البرمجي: <strong className="text-white">{DEBUG_CHALLENGES[activeChallengeIdx].language}</strong></span>
                  <h4 className="text-base sm:text-lg font-semibold text-white">{DEBUG_CHALLENGES[activeChallengeIdx].title}</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">{DEBUG_CHALLENGES[activeChallengeIdx].description}</p>
                </div>

                {/* Editor Box */}
                <div className="bg-slate-950 rounded-2xl border border-slate-900 overflow-hidden mb-6">
                  <div className="p-3 bg-slate-950 border-b border-slate-900 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-red-500 rounded-full inline-block" />
                      <span className="w-3 h-3 bg-yellow-500 rounded-full inline-block" />
                      <span className="w-3 h-3 bg-green-500 rounded-full inline-block" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">mentor_debug_challenge.{DEBUG_CHALLENGES[activeChallengeIdx].language === 'JavaScript' ? 'js' : DEBUG_CHALLENGES[activeChallengeIdx].language === 'Python' ? 'py' : 'html'}</span>
                  </div>

                  {/* Broken Code view */}
                  <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-cyan-400/90 bg-slate-950">
                    <pre className="whitespace-pre">{DEBUG_CHALLENGES[activeChallengeIdx].brokenCode}</pre>
                  </div>
                </div>

                {/* Hint Toggle */}
                <div className="p-4 bg-slate-950/40 rounded-2xl border border-slate-850 mb-6 text-xs text-slate-300 flex items-start gap-2.5 leading-relaxed">
                  <Lightbulb className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>تلميحة المرشد المباشرة:</strong> {DEBUG_CHALLENGES[activeChallengeIdx].hint}
                  </div>
                </div>

                {/* Choices Selector */}
                <div>
                  <span className="text-xs font-bold text-slate-300 block mb-3">اختر الكود الصحيح لإصلاح موضع الخلل:</span>
                  <div className="grid grid-cols-2 gap-3">
                    {DEBUG_CHALLENGES[activeChallengeIdx].options.map((opt) => {
                      const isOptionSelected = selectedAnswer === opt;
                      const hasChosenCorrectly = answeredChallenges[DEBUG_CHALLENGES[activeChallengeIdx].id]?.success;
                      const isThisOriginalCorrect = opt === DEBUG_CHALLENGES[activeChallengeIdx].fixedCode;

                      return (
                        <button
                          key={opt}
                          disabled={selectedAnswer !== null}
                          onClick={() => handleOptionSelect(opt)}
                          className={`p-3.5 rounded-xl border text-xs font-mono font-bold transition-all text-center cursor-pointer ${
                            selectedAnswer === null 
                              ? 'bg-slate-950 border-slate-850 text-slate-300 hover:bg-slate-900 hover:border-slate-750 hover:text-white' 
                              : isOptionSelected 
                              ? isThisOriginalCorrect 
                                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300' 
                                : 'bg-red-950/40 border-red-500 text-red-300'
                              : isThisOriginalCorrect && showExplanation
                              ? 'bg-emerald-950/60 border-emerald-800 text-emerald-400'
                              : 'bg-slate-950 border-slate-900 text-slate-600 opacity-60'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Question Feedback explanation */}
                {showExplanation && (
                  <div className={`mt-6 p-4 rounded-xl border leading-relaxed text-xs sm:text-sm animate-fade-in ${
                    answeredChallenges[DEBUG_CHALLENGES[activeChallengeIdx].id]?.success
                      ? 'bg-emerald-950/30 border-emerald-900/60 text-emerald-300'
                      : 'bg-red-950/30 border-red-900/50 text-red-300'
                  }`}>
                    <div className="font-bold flex items-center gap-1.5 mb-1.5">
                      {answeredChallenges[DEBUG_CHALLENGES[activeChallengeIdx].id]?.success ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>إيجاد بطل! تفسير رائع ومقرّب:</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-red-400" />
                          <span>لم تصب هذه المرة، تمعن التوضيح البرمجي:</span>
                        </>
                      )}
                    </div>
                    <p className="font-sans text-xs">{DEBUG_CHALLENGES[activeChallengeIdx].explanation}</p>
                    
                    {/* Next challenge button or final score */}
                    <div className="mt-4 flex justify-end">
                      {activeChallengeIdx < DEBUG_CHALLENGES.length - 1 ? (
                        <button
                          onClick={() => {
                            setActiveChallengeIdx(prev => prev + 1);
                            setSelectedAnswer(null);
                            setShowExplanation(false);
                          }}
                          className="px-4.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>الذهاب للتحدي التالي</span>
                          <Play className="w-3 h-3 transform rotate-180" />
                        </button>
                      ) : (
                        <span className="text-xs text-amber-400 font-semibold">لقد أتممت جميع الألغاز البرمجية المقترحة!</span>
                      )}
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* Right side: Score & Certification Board */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Score panel */}
              <div className="bg-slate-900/30 backdrop-blur-md rounded-3xl border border-slate-800 p-5 shadow-2xl hover:border-slate-700/60 transition-all duration-300 text-center">
                <h4 className="font-bold text-white text-sm md:text-base mb-3">لوحة نقاط محاكي الأخطاء</h4>
                
                <div className="py-6 bg-slate-950 rounded-2xl border border-slate-850 mb-4 inline-block w-full">
                  <span className="text-4xl font-extrabold text-white block leading-none font-mono">{quizScore} / {DEBUG_CHALLENGES.length}</span>
                  <span className="text-xs text-slate-400 font-semibold block mt-2">الأخطاء المحسومة بنجاح</span>
                </div>

                <div className="text-xs text-slate-400 mb-4 text-right leading-relaxed font-sans">
                  تجاوز الأخطاء البرمجية وإصلاح أخطاء الآخرين هي أثمن ميزة للمطور المحترف. كل تحدي تجتازه يثبت قدرتك الفنية.
                </div>

                <div className="space-y-2.5 text-right font-sans">
                  {DEBUG_CHALLENGES.map((ch, oIdx) => {
                    const ans = answeredChallenges[ch.id];
                    return (
                      <div key={ch.id} className="flex items-center justify-between text-xs p-2.5 bg-slate-950 rounded-xl border border-slate-850">
                        <span className="font-medium text-slate-300">التحدي {oIdx + 1}: {ch.language}</span>
                        <span>
                          {ans === undefined ? (
                            <span className="text-slate-500 text-[10px]">بانتظار المحاولة</span>
                          ) : ans.success ? (
                            <span className="text-emerald-400 font-bold flex items-center gap-0.5 font-mono">مكتمل <CheckCircle2 className="w-3.5 h-3.5" /></span>
                          ) : (
                            <span className="text-red-400 font-bold flex items-center gap-0.5 font-mono">خطأ <AlertCircle className="w-3.5 h-3.5 animate-pulse" /></span>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Reset entire quiz challenge button */}
                <button
                  onClick={handleResetChallenge}
                  className="w-full mt-4 py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-850 text-slate-300 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  إعادة المحاولة للأكواد
                </button>
              </div>

              {/* Developer certification banner inside */}
              {quizScore === DEBUG_CHALLENGES.length && (
                <div className="bg-gradient-to-br from-indigo-950/40 via-purple-950/40 to-slate-900/30 border border-slate-800 rounded-3xl p-5 text-center shadow-xl animate-fade-in">
                  <div className="text-amber-400 text-3xl mb-2 flex items-center justify-center">🎓</div>
                  <h5 className="font-extrabold text-white text-sm mb-1">شهادة فك شفرات الأخطاء</h5>
                  <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                    لقد أكملت جميع سيناريوهات تصحيح الأخطاء. تفكيرك المنطقي الآن متوازن وقادر على فهم رسائل الأخطاء الشائعة للمبتدئين بنجاح!
                  </p>
                </div>
              )}

            </div>

          </div>
        )}

      </main>

      {/* Elegant minimalist footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-850">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400">
          <p className="text-xs text-slate-500">مرشد علوم الحاسب - {new Date().getFullYear() || "2026"}. جميع الحقوق محفوظة لطالب العلم والمستفيد.</p>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="text-slate-500 text-[11px]">تم الإعداد والتوجيه بلغة عربية فصحى نقية لتخدم أرشفة السيو SEO بالهيكلية الشجرية الكاملة.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
