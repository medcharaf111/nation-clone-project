import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import MapPoster from "./MapPoster";

/* ═══════ PROPS ═══════ */
interface ArabicLandingProps {
  onContinue: () => void;
}

/* ═══════ MOTION HELPERS ═══════ */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.07 } },
};

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ═══════ TICKER DATA ═══════ */
const tickerItems = [
  { val: "6,164", label: "مؤسسة تربوية في الخريطة التفاعلية" },
  { val: "2,001", label: "متطوع ملتزم" },
  { val: "500", label: "مطور · 1,500 معلّم" },
  { val: "10M", label: "تلميذ مُحاكى Oasis AI" },
  { val: "<500KB", label: "حجم الجلسة متوافق مع 2G" },
  { val: "24", label: "ولاية تغطية وطنية كاملة" },
  { val: "87/100", label: "التقييم الذاتي معايير CNTE" },
];

/* ═══════ ROLES ═══════ */
const roles = [
  {
    id: "teacher",
    tab: "للمعلم والأستاذ",
    title: "جذاذتك جاهزة.",
    accent: "أوامر صوتية، توليد تلقائي.",
    desc: "تخطيط الدروس، الجدول، الأعداد، التواصل مع الأولياء",
  },
  {
    id: "student",
    tab: "للتلميذ",
    title: "تعلّم بالسرعة متاعك.",
    accent: "يوم بيوم.",
    desc: "تمارين مكيّفة، مساعد ذكي، متابعة يومية",
  },
  {
    id: "parent",
    tab: "لولي الأمر",
    title: "تابع ابنك كل يوم.",
    accent: "ليس كل ثلاثي.",
    desc: "النتائج، الحضور، تقرير يومي",
  },
  {
    id: "director",
    tab: "لمدير المؤسسة",
    title: "مدرستك في لوحة واحدة.",
    accent: "",
    desc: "المعلمون، التلاميذ، التقارير، مؤشرات الأداء",
  },
  {
    id: "inspector",
    tab: "للمتفقد",
    title: "كل المؤسسات قدامك.",
    accent: "",
    desc: "جدولة الزيارات، تقييم المعلمين، تقارير التفقد",
  },
];

/* ═══════ FEATURES ═══════ */
const features = [
  { title: "تخطيط الدروس", desc: "جدول أسبوعي تفاعلي بالسحب والإفلات", tag: "للمعلمين", emoji: "📋" },
  { title: "أوامر صوتية", desc: "حضّر درس الرياضيات... والجذاذة جاهزة", tag: "جميع الأدوار", emoji: "🎙️" },
  { title: "خريطة 6,164 مؤسسة", desc: "خريطة تفاعلية لكل مدرسة في تونس", tag: "للإدارة", emoji: "🗺️" },
  { title: "ذكاء اصطناعي تكيّفي", desc: "Knowledge Tracing يتتبّع مستوى كل تلميذ", tag: "AI", emoji: "🧠" },
  { title: "متابعة الأولياء", desc: "تقرير يومي: اليوم ابنك تعلّم...", tag: "للأولياء", emoji: "👁️" },
  { title: "8 لوحات تحكم", desc: "كل دور بلوحة مخصصة وصلاحيات", tag: "متعدد الأدوار", emoji: "📊" },
  { title: "يعمل دون إنترنت", desc: "500 كيلوبايت للجلسة، متوافق مع 2G", tag: "بنية تحتية", emoji: "📶" },
  { title: "دعم ذوي الاحتياجات", desc: "واجهات مكيّفة للتوحد وصعوبات التعلّم", tag: "شمولية", emoji: "♿" },
  { title: "تنبؤات الباكالوريا", desc: "نماذج تعلم آلي تتنبأ بنسبة النجاح بدقة 82%", tag: "AI", emoji: "📈" },
];

/* ═══════ DOSSIER ═══════ */
const dossier = [
  {
    cat: "الوثائق الإدارية",
    n: 2,
    docs: [
      { num: "01", title: "مضمون السجل الوطني للمؤسسات (RNE)", sub: "نسخة محيّنة صادرة بأقل من 3 أشهر", type: "PDF" },
      { num: "02", title: "شهادة علامة المؤسسة الناشئة", sub: "صادرة عن صندوق الودائع والأمانات | Startup Act", type: "PDF" },
    ],
  },
  {
    cat: "العرض التقني والتربوي",
    n: 3,
    docs: [
      { num: "03", title: "العرض التقني المفصّل", sub: "الرؤية، الهندسة، الابتكار، خارطة الطريق", type: "استعراض" },
      { num: "04", title: "هندسة التجربة التفاعلية", sub: "سيكولوجيا التقييم، التصميم العصبي", type: "استعراض" },
      { num: "05", title: "المرجع الشامل للمنظومة التربوية", sub: "170 رتبة، 22 سلك، 6,164 مؤسسة", type: "استعراض" },
    ],
  },
  {
    cat: "الفريق والكفاءات",
    n: 4,
    docs: [
      { num: "06", title: "قائمة الفريق التطوعي", sub: "500 مطور + 1,500 معلّم بإمضاءات إلكترونية", type: "استعراض" },
      { num: "07", title: "السيَر الذاتية للفريق الرئيسي", sub: "كفاءات تقنية + بيداغوجية + إدارية", type: "استعراض" },
      { num: "08", title: "الهيكل التنظيمي وحوكمة المشروع", sub: "مخطط Gantt + توزيع المسؤوليات", type: "استعراض" },
      { num: "09", title: "ملف الإمضاءات الإلكترونية", sub: "إمضاءات 2,001 متطوع مع تعهداتهم", type: "استعراض" },
    ],
  },
  {
    cat: "المرجعيات والشراكات",
    n: 2,
    docs: [
      { num: "10", title: "الجوائز والشراكات السابقة", sub: "جوائز Smarty.tn + شراكات مؤسساتية", type: "استعراض" },
      { num: "11", title: "خطة البرنامج التجريبي", sub: "3 مدارس ابتدائية، 200 تلميذ، 6 أشهر", type: "استعراض" },
    ],
  },
  {
    cat: "الموارد التقنية الملحقة",
    n: 3,
    docs: [
      { num: "12", title: "العرض التجريبي التفاعلي", sub: "لوحة تحكم + خريطة + محاكاة", type: "استعراض مباشر" },
      { num: "13", title: "تقرير المحاكاة Oasis AI", sub: "بيانات مولّدة لـ 10 مليون تلميذ", type: "استعراض" },
      { num: "14", title: "فيديو تقديمي (3 دقائق)", sub: "سيناريو استخدام حقيقي", type: "قريبا" },
    ],
  },
];

const scores = [
  { k: "وضوح وفعالية الحل", v: "9/10" },
  { k: "النضج التقني", v: "8/10" },
  { k: "قابلية التوسع", v: "9/10" },
  { k: "التجديد التكنولوجي", v: "9/10" },
  { k: "تحسين الممارسات", v: "9/10" },
  { k: "تكامل الكفاءات", v: "9/10" },
  { k: "الحوكمة", v: "9/10" },
  { k: "المشاريع السابقة", v: "7/10" },
  { k: "الشراكات المؤسساتية", v: "4/5" },
  { k: "التوافق الاستراتيجي", v: "9/10" },
  { k: "التطوير المشترك", v: "5/5" },
];

/* ═══════ ANIMATED COUNTER ═══════ */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = Math.max(1, Math.floor(to / 60));
    const id = setInterval(() => {
      cur = Math.min(cur + step, to);
      setVal(cur);
      if (cur >= to) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [inView, to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
const ArabicLanding = ({ onContinue }: ArabicLandingProps) => {
  const [activeRole, setActiveRole] = useState(0);
  const { scrollY } = useScroll();
  const heroParallax1 = useTransform(scrollY, [0, 600], [0, 50]);
  const heroParallax2 = useTransform(scrollY, [0, 600], [0, -30]);
  const navBg = useTransform(scrollY, [0, 100], ["rgba(5,7,15,0.5)", "rgba(5,7,15,0.92)"]);

  return (
    <div dir="rtl" className="relative min-h-screen bg-[#05070f] text-white overflow-x-clip selection:bg-indigo-500/30">
      {/* ═══════ GLOBAL DOT GRID ═══════ */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle,rgba(255,255,255,.7) 1px,transparent 1px)", backgroundSize: "28px 28px", position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
      />

      {/* ═══════ NAVBAR ═══════ */}
      <motion.nav
        style={{ backgroundColor: navBg }}
        className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-10 flex h-14 items-center justify-between">
          <a href="#" className="text-lg font-extrabold tracking-tight select-none">
            منصة <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">الشعب</span>
          </a>
          <div className="hidden md:flex items-center gap-7 text-[13px] text-white/45 font-medium">
            <a href="#roles" className="hover:text-white transition">الأدوار</a>
            <a href="#features" className="hover:text-white transition">المميزات</a>
            <a href="#dossier" className="hover:text-white transition">ملف الترشح</a>
            <a href="#map-section" className="hover:text-white transition">الخريطة</a>
          </div>
          <button
            onClick={onContinue}
            className="h-8 px-4 rounded-full bg-white text-[#05070f] text-[13px] font-semibold hover:bg-white/90 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            ادخل المنصة
          </button>
        </div>
      </motion.nav>

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-screen flex flex-col justify-center pt-14">
        {/* BG orbs */}
        <motion.div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <motion.div
            style={{ y: heroParallax1 }}
            className="absolute -top-[20%] -right-[12%] w-[700px] h-[700px] rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 2 }}
          >
            <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(99,102,241,.28)_0%,transparent_70%)]" />
          </motion.div>
          <motion.div
            style={{ y: heroParallax2 }}
            className="absolute -bottom-[15%] -left-[10%] w-[550px] h-[550px] rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 2, delay: 0.3 }}
          >
            <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(16,185,129,.22)_0%,transparent_70%)]" />
          </motion.div>
        </motion.div>

        <div className="max-w-5xl mx-auto px-5 lg:px-10 relative z-10 text-center space-y-7">
          {/* CNTE badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 text-[11px] text-white/50 bg-white/[0.04] border border-white/[0.07] rounded-full px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            شراكة مع المركز الوطني للتكنولوجيات في التربية | CNTE · وزارة التربية · 24 مندوبية جهوية
          </motion.div>

          {/* BIG headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-[clamp(2.6rem,7vw,5.5rem)] font-black leading-[1.05] tracking-tight"
          >
            <span className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">6,164 مؤسسة.</span>
            <br />
            <span className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">2,001 متطوع.</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">صفر دينار.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-base md:text-lg text-white/40 leading-relaxed max-w-xl mx-auto"
          >
            منظومة تعليمية رقمية للمدرسة التونسية.
            <br className="hidden sm:block" />
            تعمل على 2G، بالبيداغوجيا التونسية حصرياً.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-wrap gap-3 justify-center"
          >
            <button
              onClick={onContinue}
              className="h-11 px-7 rounded-full bg-white text-[#05070f] text-sm font-semibold shadow-lg shadow-white/[0.04] hover:bg-white/90 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              استعرض ملف الترشح
            </button>
            <button
              onClick={onContinue}
              className="h-11 px-7 rounded-full bg-white/[0.05] border border-white/[0.08] text-sm font-semibold text-white hover:bg-white/[0.08] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              ادخل المنصة ←
            </button>
          </motion.div>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={4} className="text-[11px] text-white/25">
            Smarty.tn · مؤسسة ناشئة معتمدة · Startup Act
          </motion.p>
        </div>

        {/* scroll cue */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/15 z-10"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 8l5 5 5-5"/></svg>
        </motion.div>
      </section>

      {/* ═══════ TICKER ═══════ */}
      <div className="border-y border-white/[0.05] bg-white/[0.015] overflow-hidden relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap py-2.5"
        >
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 px-6 text-[13px] shrink-0">
              <span className="font-bold text-white">{t.val}</span>
              <span className="text-white/35">{t.label}</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ═══════ COMMUNITY ═══════ */}
      <Section className="py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 text-center max-w-3xl space-y-5">
          <motion.h2 variants={fadeUp} custom={0} className="text-2xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-snug">
            2,001 تونسي قرروا أن{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              مستقبل التعليم لا ينتظر
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-white/35 text-base">
            500 مطور · 1,500 معلّم · 24 ولاية · إمضاءات إلكترونية
          </motion.p>
          <motion.p variants={fadeUp} custom={2} className="text-white/45 max-w-lg mx-auto leading-relaxed text-[15px]">
            أكبر مبادرة تطوعية في مجال التعليم الرقمي في تاريخ تونس
          </motion.p>
        </div>
      </Section>

      {/* ═══════ ROLES ═══════ */}
      <Section id="roles" className="py-24 lg:py-32 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-indigo-500/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 lg:px-10 relative z-10">
          <div className="text-center mb-14 space-y-3">
            <motion.h2 variants={fadeUp} custom={0} className="text-2xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-snug">
              منصة لكل فاعل{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">في المنظومة</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-white/35 text-sm">من الوزارة إلى القسم</motion.p>
          </div>

          {/* Pills */}
          <motion.div variants={fadeUp} custom={2} className="flex flex-wrap justify-center gap-2 mb-10">
            {roles.map((r, i) => (
              <button
                key={r.id}
                onClick={() => setActiveRole(i)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300 ${
                  activeRole === i
                    ? "bg-white text-[#05070f] shadow-lg shadow-white/[0.06]"
                    : "bg-white/[0.04] text-white/40 border border-white/[0.06] hover:bg-white/[0.07] hover:text-white/60"
                }`}
              >
                {r.tab}
              </button>
            ))}
          </motion.div>

          {/* Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={roles[activeRole].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              className="max-w-2xl mx-auto rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-md p-8 md:p-12"
            >
              <h3 className="text-xl md:text-3xl font-extrabold leading-tight mb-1">
                {roles[activeRole].title}
                {roles[activeRole].accent && (
                  <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">{roles[activeRole].accent}</span>
                )}
              </h3>
              <p className="text-white/35 mt-3 text-[15px] leading-relaxed">{roles[activeRole].desc}</p>
              <button
                onClick={onContinue}
                className="mt-6 h-9 px-5 rounded-full bg-white/[0.06] text-[13px] font-medium border border-white/[0.08] text-white/70 hover:bg-white/[0.1] hover:text-white transition-all duration-200"
              >
                اكتشف ←
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </Section>

      {/* ═══════ FEATURES ═══════ */}
      <Section id="features" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <motion.h2 variants={fadeUp} custom={0} className="text-center text-2xl md:text-4xl lg:text-[2.75rem] font-extrabold mb-14">
            ما تقدّمه <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">المنصة</span>
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-400 hover:-translate-y-0.5"
              >
                <span className="inline-block text-[10px] font-medium text-white/30 bg-white/[0.05] px-2 py-0.5 rounded-full mb-3">
                  {f.tag}
                </span>
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-0.5 grayscale group-hover:grayscale-0 transition-all duration-300">{f.emoji}</span>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-0.5">{f.title}</h3>
                    <p className="text-white/35 text-[13px] leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════ DOSSIER ═══════ */}
      <Section id="dossier" className="py-24 lg:py-32 relative">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.012]"
          style={{ backgroundImage: "radial-gradient(circle,rgba(255,255,255,.7) 1px,transparent 1px)", backgroundSize: "22px 22px" }}
        />
        <div className="max-w-7xl mx-auto px-5 lg:px-10 relative z-10">
          {/* Header area */}
          <div className="text-center mb-5 space-y-3">
            <motion.h2 variants={fadeUp} custom={0} className="text-2xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-snug">
              الملف الكامل للشراكة مع الـ{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">CNTE</span>
            </motion.h2>
          </div>

          {/* Intro */}
          <motion.div variants={fadeUp} custom={1} className="max-w-3xl mx-auto text-center mb-14 space-y-5">
            <p className="text-white/35 text-sm">15 وثيقة. اضغط لاستعراض أي وثيقة</p>

            <div className="text-center space-y-3">
              <p className="text-lg md:text-xl text-white/55 leading-relaxed">
                في كل مدرسة تونسية يوجد هاتف جوال واحد على الأقل.
                <br />
                <span className="text-white/75 font-medium">هذا كل ما نحتاجه.</span>
              </p>
              <p className="text-white/25 text-sm">منصة الشعب تبدأ من هناك.</p>
              <p className="text-white/15 text-[11px]">Smarty.tn | فيفري 2026</p>
            </div>

            {/* Quick badges */}
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              {[
                { v: "15", l: "وثيقة" },
                { v: "87/100", l: "تقييم ذاتي" },
                { v: "جاهز", l: "للمراجعة" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-1.5 text-[12px]">
                  <span className="font-bold text-white">{b.v}</span>
                  <span className="text-white/30">{b.l}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Document list */}
          <div className="max-w-3xl mx-auto space-y-8">
            {dossier.map((cat, ci) => (
              <motion.div key={ci} variants={fadeUp} custom={ci + 2}>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-1 h-6 rounded-full bg-gradient-to-b from-indigo-500 to-violet-500" />
                  <h3 className="text-[15px] font-bold text-white">{cat.cat}</h3>
                  <span className="text-[10px] text-white/25 bg-white/[0.04] px-2 py-0.5 rounded-full">{cat.n} وثائق</span>
                </div>
                <div className="space-y-1.5">
                  {cat.docs.map((doc, di) => (
                    <div
                      key={di}
                      className="group flex items-start gap-3 rounded-lg border border-white/[0.05] bg-white/[0.015] px-4 py-3.5 hover:bg-white/[0.03] hover:border-white/[0.09] transition-all duration-300 cursor-pointer"
                    >
                      <span className="text-xl font-black text-white/[0.07] font-mono leading-none mt-0.5 shrink-0">{doc.num}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[13px] font-bold text-white group-hover:text-indigo-300 transition-colors">{doc.title}</h4>
                        <p className="text-[11px] text-white/25 mt-0.5">{doc.sub}</p>
                      </div>
                      <span className="text-[10px] text-white/20 bg-white/[0.04] px-2 py-0.5 rounded-full shrink-0 self-center group-hover:text-white/40 transition-colors">
                        {doc.type}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Self-assessment */}
          <motion.div variants={fadeUp} custom={8} className="max-w-3xl mx-auto mt-16 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent leading-none">87/100</div>
              <p className="text-white/30 text-sm mt-1">التقييم الذاتي</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {scores.map((s, i) => (
                <div key={i} className="bg-white/[0.025] border border-white/[0.05] rounded-lg px-3 py-2.5 text-center hover:bg-white/[0.04] transition-colors">
                  <div className="text-sm font-bold text-white">{s.v}</div>
                  <div className="text-[10px] text-white/25 mt-0.5 leading-snug">{s.k}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ═══════ MAP ═══════ */}
      <Section id="map-section" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-10 space-y-3">
            <motion.h2 variants={fadeUp} custom={0} className="text-2xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-snug">
              6,164 مؤسسة تربوية على{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">خريطة واحدة</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-white/35 text-sm">
              ابتدائية، إعدادية، معهد، تقنية. ألوان حسب النوع.
            </motion.p>
          </div>

          <motion.div variants={fadeUp} custom={2} className="max-w-4xl mx-auto">
            {/* Real interactive map */}
            <MapPoster />

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-5">
              {[
                { c: "bg-indigo-500", l: "ابتدائية" },
                { c: "bg-violet-500", l: "إعدادية" },
                { c: "bg-emerald-500", l: "معهد" },
                { c: "bg-amber-500", l: "تقنية" },
              ].map((x, i) => (
                <span key={i} className="flex items-center gap-1.5 text-[11px] text-white/30">
                  <span className={`w-2 h-2 rounded-full ${x.c}`} />
                  {x.l}
                </span>
              ))}
            </div>
            <p className="text-center text-white/15 text-[11px] mt-3">
              خطأ في البيانات؟ المعلمون والمتفقدون يصحّحون البيانات مباشرة.
            </p>

            {/* Explore button */}
            <div className="text-center mt-6">
              <button className="h-9 px-5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[13px] text-white/40 hover:bg-white/[0.07] hover:text-white/60 transition-all duration-200">
                استكشف الخريطة الكاملة →
              </button>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ═══════ FINAL CTA ═══════ */}
      <Section className="py-32 lg:py-44 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-[#05070f]" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.12]"
            style={{ background: "radial-gradient(circle,rgba(99,102,241,.2) 0%,transparent 60%)" }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 relative z-10 text-center space-y-7">
          <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            مستقبل التعليم في تونس{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">يبدأ هنا.</span>
          </motion.h2>
          <motion.div variants={fadeUp} custom={1} className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={onContinue}
              className="h-11 px-7 rounded-full bg-white text-[#05070f] text-sm font-semibold shadow-lg shadow-white/[0.04] hover:bg-white/90 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              ادخل المنصة
            </button>
            <button
              onClick={onContinue}
              className="h-11 px-7 rounded-full bg-white/[0.05] border border-white/[0.08] text-sm font-semibold text-white hover:bg-white/[0.08] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              استعرض ملف الترشح
            </button>
          </motion.div>
          <motion.p variants={fadeUp} custom={2} className="text-[11px] text-white/20">
            Smarty.tn · Startup Act · 2026
          </motion.p>
        </div>
      </Section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="border-t border-white/[0.05] py-6">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] text-white/20">
          <p>© 2026 منصة الشعب | Smarty.tn</p>
          <p>2,001 متطوع · 6,164 مؤسسة · 24 ولاية</p>
        </div>
      </footer>
    </div>
  );
};

export default ArabicLanding;
