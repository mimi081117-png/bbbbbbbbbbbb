import { useState, useMemo } from 'react';
import { 
  Code, 
  Play, 
  ExternalLink, 
  BookOpen, 
  Lightbulb, 
  CheckCircle2, 
  Copy, 
  RefreshCw, 
  Bookmark, 
  Terminal, 
  Layers
} from 'lucide-react';

interface HTMLStep {
  id: number;
  title: string;
  concept: string;
  explanation: string;
  bestPractice: string;
  defaultCode: string;
}

export default function HTMLGuide() {
  const steps: HTMLStep[] = [
    {
      id: 1,
      title: "الخطوة 1: الهيكل الأساسي والمستند (HTML Skeleton)",
      concept: "الهيكل العظمي للموقع",
      explanation: "تبدأ جميع صفحات الإنترنت بتعريف نوع المستند <!DOCTYPE html> متبوعاً بالوسم الرئيسي <html>. ينقسم هذا الوسم بشكل عام إلى جزأين أساسيين وهما: <head> (رأس الصفحة الذي يحتوي على معلومات غير مرئية مثل العنوان والترمز الافتراضي)، و <body> (جسم الصفحة الذي يحتوي على كل النصوص والصور والأزرار المرئية للزوار).",
      bestPractice: "احرص دائماً على كتابة dir=\"rtl\" داخل وسم html للغات التي تكتب من اليمين إلى اليسار كالعربية للتأكد من تنسيق النصوص ومواقعها الافتراضية بشكل احترافي متجاوب.",
      defaultCode: `<!DOCTYPE html>
<html dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>صفحتي الأولى خطوة بخطوة</title>
</head>
<body style="font-family: sans-serif; padding: 20px; background-color: #f8fafc; color: #1e293b;">
  <h1 style="color: #0284c7;">مرحباً بك في عالم الويب الحقيقي!</h1>
  <p>هذا هو الهيكل الأساسي الأول الذي قمت بكتابته وتجربته بنجاح.</p>
</body>
</html>`
    },
    {
      id: 2,
      title: "الخطوة 2: العناوين والفقرات (Headings & Paragraphs)",
      concept: "تنظيم محتوى النصوص والجرائد",
      explanation: "لكتابة العناوين في لغة HTML نستخدم وسوم العناوين المخصصة من <h1> (العنوان الأهم والأكبر) تنازلياً إلى <h6> (العنوان الفرعي الأصغر). أما الفقرات والنصوص العادية فنقوم دوماً بوضعها بداخل وسم الفقرة المنفصلة <p> للتأكد من تباعدها منطقياً وفهم الهيكلية من قبل محركات البحث.",
      bestPractice: "في كل صفحة ويب، تذكر أن تستخدم وسم <h1> مرة واحدة فقط للتعبير عن العنوان الرئيسي لتتوافق مع قواعد تهيئة المواقع لمحركات البحث (SEO).",
      defaultCode: `<h1 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">تعلم كتابة كود HTML بكل سهولة</h1>
<p style="font-size: 16px; line-height: 1.6; color: #334155;">
  لغة الـ HTML ليست لغة برمجة معقدة، بل هي لغة ترميز بسيطة ووظيفتها هي إخبار المتصفح بكيفية هيكلة وتصميم العناصر على الشاشة.
</p>

<h2 style="color: #1e3a8a; margin-top: 20px;">لماذا العناوين الفرعية هامة؟</h2>
<p style="font-size: 14px; line-height: 1.5; color: #475569;">
  تساعد العناوين الفرعية القراء ومحركات البحث في قراءة المقال وفهم الأفكار المتفرعة منه بسهولة فائقة دون شعور بالملل.
</p>`
    },
    {
      id: 3,
      title: "الخطوة 3: الروابط والصور التفاعلية (Links & Images)",
      concept: "ربط الإنترنت وإظهار المتعة البصرية",
      explanation: "يتم إنشاء الروابط التشعبية باستخدام الوسم <a> مع خاصية href التي تحدد الرابط وهدف النقرة. أما الصور فيتم عرضها باستخدام الوسم الذكي السريع <img> مع خاصية src لتحديد مسار الصورة، وخاصية alt لوصف محتوى الصورة في حال تعذر التحميل. انتبه: وسم الصورة <img> هو وسم مغلق ذاتياً ولا يحتاج لوسم إغلاق منتهي!",
      bestPractice: "أضف دائماً الخاصية target=\"_blank\" للروابط الخارجية لتفتح في تبويب جديد تماماً دون أن يغادر الزائر موقعك ومحتواك الأصلي.",
      defaultCode: `<p style="font-size: 15px; color: #1e293b;">انقر على الرابط التالي لزيارة كنز البرمجيات:</p>
<a href="https://elzero.org" target="_blank" style="display: inline-block; padding: 10px 18px; background-color: #0284c7; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-family: sans-serif;">مدرسة الزيرو ويب سكول ✦</a>

<p style="margin-top: 25px; color: #64748b; font-size: 13px;">مثال لعرض صورة حية من الويب:</p>
<img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80" alt="رمز البرمجة على الشاشة" style="width: 100%; max-width: 450px; border-radius: 12px; border: 1px solid #cbd5e1; box-shadow: 0 4px 12px rgba(0,0,0,0.05);" />`
    },
    {
      id: 4,
      title: "الخطوة 4: القوائم وتخطيط البيانات (HTML Lists)",
      concept: "صنع قوائم النقط والأرقام",
      explanation: "توفر لغة الـ HTML طريقتين أساسيتين لصنع القوائم: القوائم غير المرتبة (Unordered List) باستخدام الوسم <ul> والتي تعرض العناصر بنقاط دائرية ممتعة، والقوائم المرتبة (Ordered List) باستخدام الوسم <ol> والتي تعرض العناصر بأرقام متسلسلة تلقائياً. بداخل كل منهما، نضع العناصر بداخل وسم عنصر القائمة (List Item) وهو <li>.",
      bestPractice: "تجنب تماماً استخدام الرموز النصية مثل (-) أو (*) يدوياً لصنع قائمة؛ القوائم المبنية هيكلياً عبر وسوم الـ HTML تفهمها متصفحات القراءة الآلية للمكفوفين بشكل سليم.",
      defaultCode: `<h3 style="color: #334155; font-family: sans-serif;">ثلاثة مسارات مجانية رائدة لتعلم البرمجة:</h3>
<ul style="padding-right: 20px; line-height: 1.8; color: #0f172a;">
  <li>منصة <strong style="color: #0284c7;">freeCodeCamp</strong> التفاعلية والمجانية بالكامل.</li>
  <li>منصة <strong style="color: #0284c7;">مدرسة الزيرو (Elzero)</strong> مع التمارين والتوجيهات.</li>
  <li>دورة <strong style="color: #0284c7;">CS50</strong> الشهيرة من جامعة هارفارد العريقة.</li>
</ul>

<h3 style="color: #334155; margin-top: 20px; font-family: sans-serif;">ترتيب خطوات تعلم الويب للمبتدئ:</h3>
<ol style="padding-right: 20px; line-height: 1.8; color: #0f172a;">
  <li>تعلم وإتقان لغة الترميز الأساسية <strong>HTML</strong>.</li>
  <li>تعلم لغة تنسيق وتجميل الصفحات والمظهر المتجاوب <strong>CSS</strong>.</li>
  <li>تعلم لغة التفاعل والتحكم بالبيانات وحركة الواجهة <strong>JavaScript</strong>.</li>
</ol>`
    },
    {
      id: 5,
      title: "الخطوة 5: حقول المدخلات والتفاعل (Inputs & Interactive Buttons)",
      concept: "بناء النماذج واستقبال البيانات",
      explanation: "من أهم ركائز مواقع الويب التفاعلية هي قدرة المستخدم على إرسال بريده الإلكتروني أو اسمه أو الضغط على الأزرار للتنبيه أو المشاركة. نقوم بكتابة حقول الإدخال عبر الوسم <input> مع تحديد نوع المدخل بواسطة الخاصية type (مثل text, email, password) بينما نحدد الأزرار الذكية التفاعلية بوسم الزر <button>.",
      bestPractice: "استخدم دائماً الخاصية placeholder لإعطاء تلميحة نصية خفيفة بداخل حقل الإدخال توضح للمستخدم طبيعة البيانات المطلوبة منه بأسلوب مريح.",
      defaultCode: `<div style="background-color: #f1f5f9; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px; max-width: 400px; font-family: sans-serif;">
  <h4 style="margin-top: 0; color: #1e293b; margin-bottom: 8px;">سجل بريدك الإلكتروني الآن</h4>
  <p style="font-size: 12px; color: #64748b; margin-bottom: 16px;">سوف نرسل لك كبسولة تدريب الـ HTML المجانية خطوة بخطوة.</p>
  
  <input type="email" placeholder="أدخل عنوان بريدك مجاناً..." style="width: 100%; box-sizing: border-box; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px; margin-bottom: 12px; outline: none;" />
  
  <button style="width: 100%; padding: 10px; background-color: #0284c7; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; transition: background-color 0.2s;" onclick="alert('أحسنت! هذا التنبيه تم برمجته وتجربته بنجاح!')">
    اشترك لمعرفة خطوات البرمجة مجاناً
  </button>
</div>`
    }
  ];

  const freeCourses = [
    {
      title: "مسار تصميم الويب المتجاوب (Responsive Web Design)",
      source: "منصة freeCodeCamp العالمية التفاعلية",
      features: "تطبيق تفاعلي حي بداخل المتصفح، بناء أكثر من 5 مشاريع كاملة للحصول على الشهادة الاحترافية مجاناً بالكامل.",
      url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
      btnText: "ابدأ التعلم التفاعلي مجاناً",
      language: "اللغة: معرب جزئياً بالترجمة وتحت إدارة مجتمعية عالمية"
    },
    {
      title: "قائمة تشغيل إتقان HTML & HTML5 من الصفر",
      source: "أكاديمية الزيرو ويب سكول (Elzero Web School)",
      features: "أقوى وأمتع دورة عربية بالصوت والصورة، تشمل 37 درساً مدعماً بالتكليفات والتمارين التطبيقية والمنطق ومراجعة الأكواد.",
      url: "https://www.youtube.com/playlist?list=PLDoPjvoNmBAw_t_TXrAn3GL415sFi8ZTo",
      btnText: "شاهد الدورة المجانية على يوتيوب",
      language: "اللغة: العربية الفصحى المبسطة"
    },
    {
      title: "دورة الويب الشاملة للمبتدئين من الصفر",
      source: "قناة كودزيلا (Codezilla)",
      features: "تفتيت ممتاز وشرح مرئي ممتع للغاية لصناعة أول موقع برمجي لك وفهم علاقة الـ HTML بكل من الـ CSS والـ JS.",
      url: "https://www.youtube.com/playlist?list=PL2N4V6E2gIAnZulP8Z0gYitF5kLiaAL-A",
      btnText: "شاهد السلسلة البصرية مجاناً",
      language: "اللغة: العربية"
    },
    {
      title: "مرجع وتوثيق لغة HTML الكامل والتطبيقي",
      source: "مكتبة W3Schools العالمية",
      features: "المرجع التوثيقي رقم 1 في الكوكب لتجربة وفحص الأوسمة والخواص والأمثلة الحية بنقرة واحدة وفي ثوانٍ معدودة.",
      url: "https://www.w3schools.com/html/",
      btnText: "تصفح المرجع واختبر معلوماتك",
      language: "اللغة: الإنجليزية (يمكن ترجمتها للعربية بسهولة)"
    },
    {
      title: "توثيق موسوعة حسوب البرمجية الكامل لـ HTML",
      source: "مؤسسة حسوب (Hsoub Wiki)",
      features: "توثيق موسوعي مكتوب باحترافية وتدقيق لغوي عربي كامل؛ يمنحك التفسير السليم لجميع أوسمة وجمل لغة الـ HTML بالأمثلة.",
      url: "https://wiki.hsoub.com/HTML",
      btnText: "تصفح التوثيق العربي مجاناً",
      language: "اللغة: العربية بالكامل"
    }
  ];

  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [sandboxCode, setSandboxCode] = useState(steps[0].defaultCode);
  const [copiedCodeSuccessfully, setCopiedCodeSuccessfully] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  // When step changes, update sandbox code with default template of that specific step
  const handleSelectStep = (idx: number) => {
    setActiveStepIdx(idx);
    setSandboxCode(steps[idx].defaultCode);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(sandboxCode);
      setCopiedCodeSuccessfully(true);
      setTimeout(() => setCopiedCodeSuccessfully(false), 2500);
    } catch {
      // Fallback
      const secText = document.createElement('textarea');
      secText.value = sandboxCode;
      document.body.appendChild(secText);
      secText.select();
      document.execCommand('copy');
      document.body.removeChild(secText);
      setCopiedCodeSuccessfully(true);
      setTimeout(() => setCopiedCodeSuccessfully(false), 2500);
    }
  };

  const handleCheckStepToggle = (stepId: number) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const totalCompletedHTMLSteps = Object.values(completedSteps).filter(Boolean).length;

  return (
    <div className="space-y-8 animate-fade-in text-right">
      
      {/* Intro Hero Banner */}
      <div className="bg-gradient-to-tr from-indigo-950/40 via-slate-900/40 to-cyan-950/30 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="absolute left-0 bottom-0 translate-y-4 -translate-x-4 text-cyan-800/10 opacity-20 transform scale-150 pointer-events-none">
          <Code className="w-40 h-40" />
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
              <span className="text-xs font-bold text-cyan-400 font-sans uppercase tracking-wider">مجمع تعليم لغة الـ HTML التفاعلي</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-100 leading-tight">
              تعلم كتابة كود الـ HTML خطوة بخطوة بالكامل
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
              لقد قمنا بإعداد هذا المختبر التفاعلي والمجمع التعليمي خصيصاً لأجلك لتتعلم أساسيات الهيكلة وتصميم الواجهات بنفسك. اقرأ الشروحات المبسطة، تصفّح الخطوات الخمس الأساسية، جرّب كسب الأكواد في المحاكي، وشاهد النتيجة الحية فورياً بالمجان!
            </p>
          </div>

          {/* Steps count completed */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 px-6 text-center shrink-0">
            <span className="text-[10px] text-slate-400 block font-semibold leading-none font-sans">محطات الهام المفتوحة</span>
            <span className="text-xl font-black text-white block mt-1.5 font-mono">{totalCompletedHTMLSteps} / 5 مكتمل</span>
            <div className="w-24 bg-slate-900 h-1.5 rounded-full overflow-hidden mt-2">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-300" 
                style={{ width: `${(totalCompletedHTMLSteps / 5) * 100}%` }} 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Steps Picker & Explanations (Grid Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/30 border border-slate-800 p-5 rounded-3xl shadow-xl font-sans">
            <span className="text-[11px] font-bold text-cyan-400 block mb-4 uppercase flex items-center gap-1.5 leading-none">
              <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
              منهج الخطوات الخمس الذاتي المباشر
            </span>
            
            {/* Step Selection Accordion-like Buttons */}
            <div className="space-y-2.5">
              {steps.map((st, idx) => {
                const isActive = activeStepIdx === idx;
                const isChecked = !!completedSteps[st.id];

                return (
                  <div 
                    key={st.id}
                    className={`p-3 rounded-2xl transition-all duration-200 border cursor-pointer select-none text-right ${
                      isActive 
                        ? 'bg-gradient-to-br from-indigo-950/40 via-slate-900/55 to-slate-950 border-indigo-500/40 shadow-inner' 
                        : 'bg-slate-950/80 border-slate-900 hover:border-slate-850 hover:bg-slate-900/40'
                    }`}
                    onClick={() => handleSelectStep(idx)}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`w-6 h-6 flex items-center justify-center rounded-lg text-[11px] font-bold shrink-0 ${
                          isActive 
                            ? 'bg-cyan-500 text-slate-950' 
                            : 'bg-slate-900 text-slate-400 border border-slate-850'
                        }`}>
                          {st.id}
                        </span>
                        <h4 className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}>
                          {st.title.replace(/الخطوة \d+: /g, '')}
                        </h4>
                      </div>

                      {/* Manual checkbox completion */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCheckStepToggle(st.id);
                        }}
                        className={`p-1 rounded-md shrink-0 border cursor-pointer transition-colors ${
                          isChecked 
                            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/80' 
                            : 'bg-slate-900 text-slate-600 border-slate-800 hover:border-cyan-500 hover:text-cyan-400'
                        }`}
                        title="علم كـ مكتمل"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Collapsible Content Inside Step */}
                    {isActive && (
                      <div className="mt-3.5 pt-3 border-t border-slate-900 animate-fade-in space-y-3 font-sans">
                        <div className="p-2.5 bg-slate-950 border border-slate-900 rounded-xl">
                          <span className="text-[10px] text-slate-500 font-bold block mb-1">الفكرة الأساسية:</span>
                          <span className="text-[11px] text-cyan-400 font-bold">{st.concept}</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">{st.explanation}</p>
                        
                        <div className="p-3 bg-indigo-950/30 border border-indigo-900/40 text-indigo-200 text-xs rounded-xl flex items-start gap-2 leading-relaxed">
                          <Lightbulb className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                          <div>
                            <strong className="text-white">نصيحة ذهبية:</strong> {st.bestPractice}
                          </div>
                        </div>

                        <div className="pt-1 flex items-center justify-end">
                          <span className="text-[10px] text-slate-500 font-medium">* تم تحميل كود الخطوة تلقائياً في المحاكي المباشر.</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Static informational tips */}
          <div className="bg-slate-900/30 border border-slate-800 p-5 rounded-3xl shadow-xl font-sans space-y-3 text-xs leading-relaxed text-slate-300">
            <h4 className="font-bold text-white flex items-center gap-1.5 mb-2 text-sm">
              <Terminal className="w-4 h-4 text-cyan-400" />
              كيف تتمرن وتتعلم بمثالية؟
            </h4>
            <p>1. <strong>جرّب التغيير:</strong> لا تنسخ الكؤود الجاهز بشكل أعمى؛ قم بتعديل العناوين، غيّر ألوان الخلفية، وغيّر نصوص الفقرات لترى كف يمتثل الكود لأوامرك.</p>
            <p>2. <strong>اقرأ خطأك:</strong> في حال لم تظهر الصورة أو لم يعمل الرابط فاحرص على إعادة مراجعة كتابة الحروف والتأكد من إغلاق الوسم.</p>
            <p>3. <strong>الاستمرار التدريجي:</strong> هذه أساسيات الترميز؛ بعد إنهائها يمكنك التوجه مباشرة لإحدى الدورات الأقوى المعروضة أدناه لبدء مشاريع متقدمة.</p>
          </div>
        </div>

        {/* Right Side: Interactive Sandbox and Iframe Live Preview (Grid Col 7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900/30 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            
            {/* Sandbox Header with helper buttons */}
            <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-950 border border-indigo-900 text-indigo-400 rounded-lg">
                  <Code className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">محاكي الأكواد التدريبي الحي (HTML Live Sandbox)</h4>
                  <p className="text-[10px] text-slate-400 font-medium">عدّل الكود البرمجي أدناه ثم عاين التغييرات المباشرة بلمحة بصر</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[11px] font-bold rounded-lg cursor-pointer flex items-center gap-1.5 transition-colors"
                  title="نسخ كود المحرر بالكامل"
                >
                  {copiedCodeSuccessfully ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>تم النسخ!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>نسخ كود التمرين</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setSandboxCode(steps[activeStepIdx].defaultCode)}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 text-[11px] font-bold rounded-lg cursor-pointer flex items-center gap-1.5 transition-colors"
                  title="إعادة الكود للوضع الافتراضي لهذه الخطوة"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>تصفير الكود</span>
                </button>
              </div>
            </div>

            {/* Simulated Live Editor textarea */}
            <div className="relative">
              <textarea
                value={sandboxCode}
                onChange={(e) => setSandboxCode(e.target.value)}
                rows={10}
                className="w-full bg-slate-950 font-mono text-[11px] sm:text-xs leading-relaxed text-cyan-400/90 p-4 sm:p-5 outline-hidden focus:ring-1 focus:ring-cyan-500/30 border-b border-slate-900 resize-y"
                dir="ltr"
                placeholder="<!-- اكتب كود HTML التفاعلي هنا... -->"
              />
              <div className="absolute right-3.5 bottom-3.5 bg-slate-900/80 px-2 py-1 border border-slate-800 rounded-md text-[9px] font-mono text-slate-400 pointer-events-none uppercase">
                HTML Editor Area (editable)
              </div>
            </div>

            {/* Simulated Live Browser Viewport */}
            <div className="bg-slate-950 p-4 border-t border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-900 mb-3 text-xs flex-wrap gap-2">
                <span className="text-[10px] text-slate-400 font-semibold font-sans flex items-center gap-1.2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mb-0.5" />
                  معاينة المتصفح الفورية (Browser Render Output)
                </span>
                <span className="text-[9px] font-mono text-slate-500">Render Pipeline: Chrome Simulator</span>
              </div>

              {/* Secure sandbox rendered via srcDoc */}
              <div className="w-full bg-white rounded-xl overflow-hidden border border-slate-900 min-h-[220px] flex flex-col">
                <div className="bg-slate-100 p-2 px-3 border-b border-slate-200 text-slate-500 text-[10px] font-mono flex items-center justify-between pointer-events-none" dir="ltr">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block" />
                  </div>
                  <div className="bg-white rounded-sm px-2 py-0.5 text-[9px] text-slate-400 w-44 truncate text-center border border-slate-200">
                    http://localhost/sandbox_preview.html
                  </div>
                  <div className="w-10"></div>
                </div>
                <iframe
                  title="HTML Sandbox Live Rendering Output"
                  srcDoc={sandboxCode}
                  className="w-full flex-grow border-none min-h-[180px] bg-white text-slate-900"
                  sandbox="allow-scripts"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Free Global & Arabic HTML Courses & Tutorials Section */}
      <div className="space-y-6">
        <div className="border-t border-slate-850 pt-8 flex items-center gap-3">
          <Layers className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base sm:text-lg font-bold text-white">دليل الدورات والتمارين المجانية بالكامل (100% Free)</h3>
          <span className="text-[10px] bg-indigo-950 text-indigo-400 px-2 py-0.5 font-bold rounded-md border border-indigo-900/60 font-sans">
            دورات معتمدة ومفتوحة المصدر
          </span>
        </div>

        <p className="text-xs text-slate-400 leading-normal font-sans">
          لتدشين رحلتك البرمجية، قمنا بتنظيم وتدقيق أفضل المنصات والمناهج العالمية المتخصصة في الـ HTML والويب. كلها مجانية وخالية من الرسوم الخفية وتعتمد على تدريب رصين وممتاز للمبتدئين:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freeCourses.map((course, cIdx) => (
            <div 
              key={cIdx} 
              className="bg-slate-900/20 backdrop-blur-md border border-slate-850 p-5 shadow-xl hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] hover:border-slate-700/80 rounded-3xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Category Indicator Badge */}
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                    {course.source}
                  </span>
                  <span className="text-[9px] text-slate-500 font-mono">مسار مجاني</span>
                </div>

                <h4 className="font-bold text-white text-xs sm:text-sm leading-normal">{course.title}</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed font-sans min-h-[46px]">{course.features}</p>
              </div>

              {/* Footer and Navigation */}
              <div className="mt-4 pt-4 border-t border-slate-850/60 font-sans space-y-2.5">
                <div className="text-[10px] text-slate-400 font-medium">{course.language}</div>
                <a 
                  href={course.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-400 hover:text-cyan-300 text-[11px] font-bold rounded-xl cursor-pointer flex items-center justify-center gap-1.5 transition-colors text-center"
                >
                  <span>{course.btnText}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
