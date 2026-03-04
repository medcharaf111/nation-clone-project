import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, CheckCircle2, Shield, Sparkles, Languages, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

const TermsAgreement = () => {
  const [agreed, setAgreed] = useState(false);
  const [fullName, setFullName] = useState("");
  const [university, setUniversity] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useState<"en" | "ar">("en");
  const isAr = lang === "ar";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || !fullName.trim() || !university.trim()) return;
    setLoading(true);
    setError(null);
    const { error: dbError } = await supabase
      .from("signatures")
      .insert({
        full_name: fullName.trim(),
        university: university.trim(),
        signed_at: new Date().toISOString(),
      });
    setLoading(false);
    if (dbError) {
      setError(isAr ? "حدث خطأ أثناء الحفظ. يرجى المحاولة مجدداً." : "An error occurred while saving. Please try again.");
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="glass-strong shadow-xl shadow-primary/5 border-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none" />
        <CardContent className="relative py-20 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-emerald-500 shadow-lg shadow-accent/30 mx-auto animate-fade-in-scale">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">{isAr ? `شكراً لك، ${fullName}!` : `Thank you, ${fullName}!`}</h2>
            <p className="text-muted-foreground">{isAr ? "تم تسجيل موافقتك بنجاح." : "Your agreement has been recorded successfully."}</p>
          </div>
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground bg-muted/60 px-4 py-2 rounded-full">
            <Shield className="w-3.5 h-3.5" />
            {isAr ? "مشفّر ومخزّن بشكل آمن" : "Encrypted and securely stored"}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" dir={isAr ? "rtl" : "ltr"}>
      {/* Language toggle — fixed position */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setLang(lang === "en" ? "ar" : "en")}
        className="fixed top-4 z-50 gap-2 rounded-full px-4 h-9 text-xs font-medium border-border/50 hover:border-primary/40 hover:bg-primary/5 bg-background/80 backdrop-blur-sm shadow-md transition-all duration-200"
        style={{ right: "1rem", left: "auto" }}
        dir="ltr"
      >
        <Languages className="w-4 h-4" />
        {lang === "en" ? "العربية" : "English"}
      </Button>

      {/* Section header */}
      <div className="text-center space-y-3 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          {isAr ? (<>راجع واقبل <span className="text-gradient">الشروط</span></>) : (<>Review & Accept <span className="text-gradient">Terms</span></>)}
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          {isAr ? "يرجى قراءة الشروط التالية بعناية قبل توقيع اتفاقيتك الرقمية." : "Please read the following terms carefully before signing your digital agreement."}
        </p>
      </div>

      {/* Terms card */}
      <Card className="glass-strong shadow-xl shadow-primary/5 border-0 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.03] pointer-events-none" />
        <CardHeader className="relative pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shadow-md shadow-primary/20">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">{isAr ? "الشروط والأحكام — المشاركة التطوعية" : "Terms and Conditions — Voluntary Participation"}</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">{isAr ? "آخر تحديث — مارس 2026" : "Last updated — March 2026"}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <ScrollArea className="h-[400px] w-full rounded-xl border border-border/50 bg-muted/30 p-5">
            <div className={`space-y-5 text-sm text-muted-foreground leading-relaxed ${isAr ? "pl-4 text-right" : "pr-4"}`}>
              <p className="font-medium text-foreground text-base">
                {isAr
                  ? "شروط وأحكام المشاركة التطوعية — NativeOS (منصة الشعب)"
                  : "Terms and Conditions of Voluntary Participation — NativeOS (منصة الشعب)"}
              </p>
              <p className="italic text-muted-foreground/80">
                {isAr
                  ? "تاريخ السريان: مارس 2026 | الجهة المسؤولة: Book Journey (حاملة علامة شركة ناشئة، تونس)"
                  : "Effective Date: March 2026 \u00a0|\u00a0 Governing Entity: Book Journey (Startup Label Holder, Tunisia)"}
              </p>

              {/* Section 1 */}
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">{isAr ? "1. التمهيد والرسالة" : "1. Preamble & Mission"}</h3>
                {isAr ? (
                  <>
                    <p>
                      NativeOS — المعروفة أيضاً بـ <span className="font-medium text-foreground">منصة الشعب</span> — هي مبادرة تونسية في مجال تكنولوجيا التعليم تهدف إلى تحويل المنظومة التربوية الوطنية. تسعى المنصة لخدمة <span className="font-medium text-foreground">2,325,443 تلميذ</span> و<span className="font-medium text-foreground">160,000 أستاذ</span> و<span className="font-medium text-foreground">6,164 مؤسسة تربوية</span> عبر كامل الـ 24 ولاية في تونس.
                    </p>
                    <p>
                      تم اختبار هذه المبادرة عبر محاكاة <span className="font-medium text-foreground">10 ملايين تلميذ</span> باستخدام بيانات اصطناعية — أي أكثر من 4 أضعاف عدد التلاميذ الفعلي — مما يثبت قابلية التوسّع قبل الإطلاق. المنصة مبنية كحلّ تونسي 100%: لا بيداغوجيا مستوردة، لا مناهج أجنبية. المتفقدون التونسيون والمناهج الرسمية هم المرجع الوحيد.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      NativeOS — also known as <span className="font-medium text-foreground">منصة الشعب</span> (Manasset El Chaab) — is a Tunisian-born educational technology initiative created to transform the national education system. The platform aims to serve <span className="font-medium text-foreground">2,325,443 students</span>, <span className="font-medium text-foreground">160,000 teachers</span>, and <span className="font-medium text-foreground">6,164 schools and establishments</span> across all 24 governorates of Tunisia.
                    </p>
                    <p>
                      This initiative was stress-tested through a simulation of <span className="font-medium text-foreground">10 million students</span> using synthetic data — more than 4× the entire national student body — proving scalability before deployment. The platform is built as a 100% Tunisian solution: no imported pedagogy, no foreign frameworks. Tunisian inspectors and official curricula (modules and tomes) are the sole guiding references.
                    </p>
                  </>
                )}
              </div>

              {/* Section 2 */}
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">{isAr ? "2. طبيعة المشاركة" : "2. Nature of Participation"}</h3>
                <p>
                  {isAr
                    ? "بتوقيعك على هذه الاتفاقية، أنت — بصفتك طالب جامعي في تونس — تعلن طوعياً عن استعدادك لدعم مشروع NativeOS والمساهمة فيه والترويج له كجزء من رسالته الأوسع لتطوير التعليم في تونس."
                    : "By signing this agreement, you — as a university student based in Tunisia — voluntarily declare your willingness to support, promote, and contribute to the NativeOS project as part of its broader mission to advance education in Tunisia."}
                </p>
                <p>{isAr ? "قد يشمل دورك، على سبيل المثال لا الحصر:" : "Your role may include, but is not limited to:"}</p>
                <ul className={`list-disc space-y-1 ${isAr ? "list-inside pr-2" : "list-inside pl-2"}`}>
                  <li>{isAr ? "المساهمة بمهارات تقنية (تطوير، تصميم، اختبار، DevOps، ذكاء اصطناعي، علم بيانات، إلخ)." : "Contributing technical skills (development, design, testing, DevOps, AI/ML, data science, etc.)."}</li>
                  <li>{isAr ? "تقديم خبرة بيداغوجية أو معرفية تتعلق بالمحتوى التعليمي للمنصة." : "Providing pedagogical or subject-matter expertise relevant to the platform's educational content."}</li>
                  <li>{isAr ? "المشاركة في حملات التوعية والتواصل المجتمعي داخل الحرم الجامعي وعبر الإنترنت." : "Participating in outreach, awareness campaigns, and community engagement activities on campus and online."}</li>
                  <li>{isAr ? "تقديم ملاحظات واختبار المستخدمين وضمان الجودة على ميزات المنصة." : "Offering feedback, user testing, and quality assurance on platform features."}</li>
                  <li>{isAr ? "تمثيل المشروع في الأوساط الجامعية والمنظمات الطلابية والأحداث التعليمية." : "Representing the project in university settings, student organisations, and educational events."}</li>
                </ul>
                <p className="font-bold text-foreground">
                  {isAr
                    ? "الطالب غير ملزم أو مقيّد بأي شكل من الأشكال بالمشاركة، حتى بعد التوقيع على هذه الاتفاقية. المشاركة تبقى اختيارية تماماً في جميع الأوقات."
                    : "The student is not obliged or restrained by any means to participate, even after signing this agreement. Participation remains entirely optional at all times."}
                </p>
              </div>

              {/* Section 3 */}
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">{isAr ? "3. التزام تطوعي بدون مقابل" : "3. Voluntary & Unpaid Commitment"}</h3>
                <p>
                  {isAr ? (
                    <><span className="font-semibold text-foreground">هذه المشاركة تطوعية بالكامل ولا تتضمن أي تعويض مالي مهما كان نوعه.</span> بموافقتك على هذه الشروط، تُقرّ وتقبل ما يلي:</>
                  ) : (
                    <><span className="font-semibold text-foreground">This participation is entirely voluntary and carries no financial compensation whatsoever.</span> By agreeing to these terms, you acknowledge and accept the following:</>
                  )}
                </p>
                <ul className={`list-disc space-y-1 ${isAr ? "list-inside pr-2" : "list-inside pl-2"}`}>
                  {isAr ? (
                    <>
                      <li>لن تتلقى أي دفع نقدي أو راتب أو منحة أو مكافأة أو عمولة أو أي شكل آخر من أشكال التعويض المادي مقابل مساهماتك.</li>
                      <li>لن يكون لك الحق في أي أسهم أو حصص ملكية أو خيارات أسهم أو نسبة من القيمة في Book Journey أو NativeOS أو أي كيان تابع — حالياً أو مستقبلاً.</li>
                      <li>لن تكتسب أي حقوق ملكية فكرية أو حقوق ترخيص أو مصلحة تجارية في المنصة أو كودها أو بياناتها أو علامتها التجارية نتيجة مشاركتك.</li>
                      <li>لن تتلقى أي شكل من أشكال المنفعة المادية أو تقاسم الأرباح أو العائدات المالية — مباشرة أو غير مباشرة — مرتبطة بنجاح المشروع أو نموه أو بيعه أو دمجه أو تسويقه.</li>
                      <li>تُعتبر مساهماتك <span className="font-semibold text-foreground">عملاً وطنياً ومدنياً وتعليمياً من حسن النية</span> لصالح تطوير المنظومة التربوية التونسية.</li>
                    </>
                  ) : (
                    <>
                      <li>You will <span className="font-semibold text-foreground">not</span> receive any monetary payment, salary, stipend, bonus, commission, or any other form of cash compensation for your contributions.</li>
                      <li>You will <span className="font-semibold text-foreground">not</span> be entitled to any equity, shares, stock options, ownership stake, or percentage of value in Book Journey, NativeOS, or any affiliated entity — now or in the future.</li>
                      <li>You will <span className="font-semibold text-foreground">not</span> acquire any intellectual property rights, licensing rights, or commercial interest in the platform, its codebase, its data, or its brand as a result of your participation.</li>
                      <li>You will <span className="font-semibold text-foreground">not</span> receive any form of material benefit, acquisition interest, revenue sharing, profit distribution, or financial return — direct or indirect — linked to the success, growth, sale, merger, or commercialisation of the project.</li>
                      <li>Your contributions are considered a <span className="font-semibold text-foreground">patriotic, civic, and educational act of goodwill</span> toward the advancement of Tunisia's educational system.</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Section 4 */}
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">{isAr ? "4. الملكية الفكرية" : "4. Intellectual Property"}</h3>
                <p>
                  {isAr
                    ? <>جميع المساهمات المقدّمة في إطار مشاركتك هي ملك لـ <span className="font-medium text-foreground">© Book Journey / NativeOS</span>. المكونات مفتوحة المصدر تبقى خاضعة لتراخيصها الخاصة.</>
                    : <>All contributions made through your participation are the property of <span className="font-medium text-foreground">© Book Journey / NativeOS</span>. Open-source components retain their respective licences.</>}
                </p>
              </div>

              {/* Section 5 */}
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">{isAr ? "5. خصوصية البيانات والسيادة" : "5. Data Privacy & Sovereignty"}</h3>
                <p>
                  {isAr
                    ? <><span className="font-semibold text-foreground">كل بيانات التلاميذ التوانسة تبقى في تونس. بدون استثناء.</span> تلتزم NativeOS بحماية جميع البيانات الشخصية والتعليمية.</>
                    : <>NativeOS is committed to the protection of all personal and educational data. <span className="font-semibold text-foreground">All Tunisian student data stays in Tunisia — no exceptions.</span></>}
                </p>
                <p>
                  {isAr
                    ? "بياناتك الشخصية (الاسم، الانتماء الجامعي، والتوقيع الرقمي) المجمّعة عبر هذه الاتفاقية ستكون:"
                    : "Your personal data (name, university affiliation, and digital signature) collected through this agreement will be:"}
                </p>
                <ul className={`list-disc space-y-1 ${isAr ? "list-inside pr-2" : "list-inside pl-2"}`}>
                  {isAr ? (
                    <>
                      <li>مخزّنة بشكل آمن على خوادم موجودة داخل تونس.</li>
                      <li>مستخدمة حصرياً لأغراض التحقق من المتطوعين والتنسيق وإعداد التقارير (مثل إثبات الدعم المجتمعي للشركاء المؤسسيين كـ CNTE).</li>
                      <li>لن تُباع أو تُشارك مع أطراف ثالثة لأغراض تجارية أو تُنقل خارج الولاية القضائية التونسية.</li>
                    </>
                  ) : (
                    <>
                      <li>Stored securely on servers located within Tunisia.</li>
                      <li>Used solely for the purposes of volunteer verification, coordination, and project reporting (e.g., demonstrating community support to institutional partners such as CNTE).</li>
                      <li>Never sold, shared with third parties for commercial purposes, or transferred outside Tunisian jurisdiction.</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Section 6 */}
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">{isAr ? "6. ميثاق السلوك" : "6. Code of Conduct"}</h3>
                <p>{isAr ? "بصفتك مشاركاً في مبادرة NativeOS، توافق على:" : "As a participant in the NativeOS initiative, you agree to:"}</p>
                <ul className={`list-disc space-y-1 ${isAr ? "list-inside pr-2" : "list-inside pl-2"}`}>
                  {isAr ? (
                    <>
                      <li>التصرف بنزاهة واحترام ومهنية في جميع التعاملات المتعلقة بالمشروع.</li>
                      <li>الامتناع عن تحريف دورك أو وضع المشروع أو الإدلاء بتصريحات عامة غير مصرّح بها باسم NativeOS أو Book Journey.</li>
                      <li>احترام سرّية البيانات الداخلية للمشروع والاتصالات والاستراتيجيات.</li>
                      <li>الامتناع عن أي فعل قد يضرّ بسمعة المشروع أو عملياته أو رسالته.</li>
                      <li>التعاون البنّاء مع زملائك المتطوعين وقادة الفرق ومنسقي المشروع.</li>
                    </>
                  ) : (
                    <>
                      <li>Act with integrity, respect, and professionalism in all interactions related to the project.</li>
                      <li>Refrain from misrepresenting your role, the project's status, or making unauthorised public statements on behalf of NativeOS or Book Journey.</li>
                      <li>Respect the confidentiality of internal project data, communications, and strategies.</li>
                      <li>Refrain from any action that could harm the reputation, operations, or mission of the project.</li>
                      <li>Collaborate constructively with fellow volunteers, team leads, and project coordinators.</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Section 7 */}
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">{isAr ? "7. المدة والانسحاب" : "7. Duration & Withdrawal"}</h3>
                {isAr ? (
                  <>
                    <p>تبقى هذه الاتفاقية سارية المفعول من تاريخ توقيعك لمدة غير محددة، أو حتى تختار الانسحاب. يمكنك الانسحاب في أي وقت عبر إخطار فريق المشروع كتابياً. الانسحاب لا يمنحك أي حق في تعويض بأثر رجعي أو مطالبة بالملكية أو استرداد من أي نوع.</p>
                    <p>تحتفظ Book Journey بالحق في إنهاء مشاركة أي متطوع إذا كان سلوكه ينتهك هذه الشروط أو ميثاق السلوك الخاص بالمشروع.</p>
                  </>
                ) : (
                  <>
                    <p>This agreement remains in effect from the date of your signature for an indefinite period, or until you choose to withdraw. You may withdraw your participation at any time by notifying the project team in writing. Withdrawal does not entitle you to any retroactive compensation, ownership claim, or restitution of any kind.</p>
                    <p>Book Journey reserves the right to terminate any volunteer's participation if their conduct violates these terms or the project's code of conduct.</p>
                  </>
                )}
              </div>

              {/* Section 8 */}
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">{isAr ? "8. عدم وجود علاقة عمل" : "8. No Employment Relationship"}</h3>
                <p>
                  {isAr
                    ? "لا يُفسّر أي شيء في هذه الاتفاقية على أنه ينشئ علاقة عمل أو شراكة أو مشروع مشترك أو أي شكل من أشكال الوكالة بينك وبين Book Journey. أنت متطوع مستقل. لست موظفاً أو متعاقداً أو مستشاراً أو وكيلاً لـ Book Journey، ولا يجوز لك تقديم نفسك على هذا الأساس."
                    : "Nothing in this agreement shall be construed as creating an employment relationship, a partnership, a joint venture, or any form of agency between you and Book Journey. You are an independent volunteer. You are not an employee, contractor, consultant, or agent of Book Journey, and you shall not represent yourself as such."}
                </p>
              </div>

              {/* Section 9 */}
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">{isAr ? "9. تحديد المسؤولية" : "9. Limitation of Liability"}</h3>
                <p>
                  {isAr
                    ? "لا تتحمل Book Journey أو NativeOS أو قادة فرقها أي مسؤولية عن أي خسارة شخصية أو ضرر أو إصابة ناتجة عن مشاركتك التطوعية. أنت تشارك بمحض إرادتك وعلى مسؤوليتك الخاصة."
                    : "Book Journey, NativeOS, and its team leads shall not be held liable for any personal loss, damage, or injury arising from your voluntary participation. You participate entirely at your own discretion and risk."}
                </p>
              </div>

              {/* Section 10 */}
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">{isAr ? "10. القانون الحاكم" : "10. Governing Law"}</h3>
                <p>
                  {isAr
                    ? "تخضع هذه الاتفاقية لقوانين الجمهورية التونسية وتُفسّر وفقاً لها. أي نزاعات ناشئة عن هذه الاتفاقية أو متعلقة بها تخضع للاختصاص الحصري للمحاكم المختصة في تونس العاصمة."
                    : "This agreement is governed by and shall be construed in accordance with the laws of the Republic of Tunisia. Any disputes arising from or related to this agreement shall be subject to the exclusive jurisdiction of the competent courts in Tunis, Tunisia."}
                </p>
              </div>

              {/* Section 11 */}
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">{isAr ? "11. الإقرار" : "11. Acknowledgement"}</h3>
                <p>
                  {isAr
                    ? "بإدخال اسمك الكامل والتحقق من مربع القبول أدناه، تؤكد أنك:"
                    : "By entering your full name and checking the acceptance box below, you confirm that:"}
                </p>
                <ul className={`list-disc space-y-1 ${isAr ? "list-inside pr-2" : "list-inside pl-2"}`}>
                  {isAr ? (
                    <>
                      <li>طالب جامعي مسجّل حالياً في مؤسسة تعليم عالي تونسية.</li>
                      <li>قرأت وفهمت ووافقت على جميع الشروط والأحكام المذكورة في هذه الوثيقة.</li>
                      <li>تشارك بمحض إرادتك، دون إكراه أو ضغط أو توقع لأي شكل من أشكال التعويض أو الملكية.</li>
                      <li>تفهم أن توقيعك الرقمي أدناه يشكّل قبولاً ملزماً قانونياً لهذه الشروط.</li>
                      <li>ملتزم بدعم NativeOS كحركة — ليس من أجل مكسب شخصي، بل من أجل مستقبل التعليم في تونس.</li>
                    </>
                  ) : (
                    <>
                      <li>You are a university student currently enrolled in a Tunisian institution of higher education.</li>
                      <li>You have read, understood, and agree to all the terms and conditions outlined in this document.</li>
                      <li>You are participating of your own free will, without coercion, pressure, or expectation of any form of compensation or ownership.</li>
                      <li>You understand that your digital signature below constitutes a legally binding acceptance of these terms.</li>
                      <li>You are committed to supporting NativeOS as a movement — not for personal gain, but for the future of education in Tunisia.</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="pt-2 border-t border-border/40">
                <p className="text-xs text-muted-foreground/70 italic">
                  منصة الشعب — 2,001 متطوع — 10 ملايين تلميذ مُحاكى
                </p>
                <p className="text-xs text-muted-foreground/70 italic mt-1">
                  NativeOS is a project of Book Journey — Startup Label Holder — Republic of Tunisia.
                </p>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Signature card */}
      <Card className="glass-strong shadow-xl shadow-primary/5 border-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] via-transparent to-primary/[0.03] pointer-events-none" />
        <CardContent className="relative pt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium flex items-center gap-2">
              {isAr ? "الاسم الكامل" : "Full Name"}
              <span className="text-xs text-muted-foreground font-normal">{isAr ? "(كما يظهر في الوثائق الرسمية)" : "(as it appears on official documents)"}</span>
            </Label>
            <Input
              id="fullName"
              placeholder={isAr ? "أدخل اسمك الكامل" : "Enter your full name"}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              maxLength={100}
              className="h-12 bg-muted/40 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-xl transition-all duration-200 placeholder:text-muted-foreground/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="university" className="text-sm font-medium flex items-center gap-2">
              {isAr ? "الانتماء الجامعي" : "University Affiliation"}
              <span className="text-xs text-muted-foreground font-normal">{isAr ? "(جامعتك أو معهدك الحالي)" : "(your current university or institute)"}</span>
            </Label>
            <Input
              id="university"
              placeholder={isAr ? "مثال: ENIT، INSAT، FST، ISET شرقية…" : "e.g. ENIT, INSAT, FST, ISET Charguia…"}
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              required
              maxLength={150}
              className="h-12 bg-muted/40 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-xl transition-all duration-200 placeholder:text-muted-foreground/50"
            />
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/40 border border-border/50 hover:border-primary/30 transition-colors duration-200">
            <Checkbox
              id="agree"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked === true)}
              className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <Label htmlFor="agree" className="cursor-pointer text-sm leading-relaxed">
              {isAr
                ? "لقد قرأت وأوافق بالكامل على شروط وأحكام المشاركة التطوعية في NativeOS (منصة الشعب). أؤكد أنني لا أتوقع أي تعويض مالي أو أسهم أو ملكية من أي نوع."
                : "I have read and fully agree to the Terms and Conditions of Voluntary Participation in NativeOS (منصة الشعب). I confirm that I expect no financial compensation, equity, or ownership of any kind."}
            </Label>
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <Button
            type="submit"
            disabled={!agreed || !fullName.trim() || !university.trim() || loading}
            className="w-full h-12 rounded-xl text-base font-semibold bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-600/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 disabled:opacity-40 disabled:shadow-none"
          >
            {loading ? (
              <Loader2 className={`w-5 h-5 animate-spin ${isAr ? "ml-2" : "mr-2"}`} />
            ) : (
              <CheckCircle2 className={`w-5 h-5 ${isAr ? "ml-2" : "mr-2"}`} />
            )}
            {loading
              ? (isAr ? "جارٍ الحفظ…" : "Saving…")
              : (isAr ? "توقيع الاتفاقية" : "Sign Agreement")}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default TermsAgreement;
