import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { label: "Преимущества", href: "#advantages" },
  { label: "Условия", href: "#terms" },
  { label: "Поддержка", href: "#support" },
  { label: "Кейсы", href: "#cases" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

const ADVANTAGES = [
  { icon: "TrendingUp", title: "Готовая бизнес-модель", desc: "Проверенная система управления операциями, которая работает с первого дня. Никаких экспериментов — только отточенные процессы." },
  { icon: "Shield", title: "Технологическая платформа", desc: "Доступ к полному функционалу Квант: задачи, чек-листы, аналитика, уведомления. Обновления автоматически." },
  { icon: "Users", title: "База клиентов", desc: "Передаём тёплых лидов из вашего региона. Маркетинговая поддержка и совместные рекламные кампании." },
  { icon: "BookOpen", title: "Обучение команды", desc: "Полный курс по продажам и внедрению продукта. Доступ к базе знаний и закрытому сообществу партнёров." },
  { icon: "Headphones", title: "Личный менеджер", desc: "Выделенный менеджер сопровождает на каждом этапе. Еженедельные созвоны, разбор кейсов, помощь в продажах." },
  { icon: "BarChart2", title: "Прозрачная аналитика", desc: "Единый дашборд с метриками вашего партнёрства: выручка, клиенты, прогноз. Вы всегда видите полную картину." },
];

const CASES = [
  { city: "Москва", name: "Алексей К.", role: "Партнёр с 2022 года", invest: "1 200 000 ₽", roi: "14 мес.", mrr: "480 000 ₽/мес", text: "Запустил за 3 месяца. Первые клиенты пришли через канал Кванта — не тратил бюджет на рекламу. Сейчас веду 18 компаний самостоятельно." },
  { city: "Екатеринбург", name: "Марина В.", role: "Партнёр с 2023 года", invest: "800 000 ₽", roi: "11 мес.", mrr: "310 000 ₽/мес", text: "Пришла без опыта в IT. Обучение закрыло все вопросы. Продукт продаёт себя сам — рестораны и сети берут без долгих переговоров." },
  { city: "Казань", name: "Дмитрий Н.", role: "Партнёр с 2023 года", invest: "1 000 000 ₽", roi: "13 мес.", mrr: "390 000 ₽/мес", text: "Работал в найме. Теперь своя команда из 3 человек, 22 активных клиента. Платформа позволяет масштабироваться без лишних затрат." },
];

const FAQ_ITEMS = [
  { q: "Какие инвестиции необходимы для старта?", a: "Паушальный взнос от 500 000 ₽ в зависимости от региона. В стоимость включены лицензия на платформу, обучение, маркетинговые материалы и поддержка на первые 6 месяцев." },
  { q: "Какой прогнозируемый срок возврата инвестиций?", a: "Средний ROI по партнёрской сети — 12–14 месяцев. При активной работе и грамотном ведении клиентов ряд партнёров выходят в плюс за 9–10 месяцев." },
  { q: "Нужен ли опыт в IT или управлении?", a: "Нет. Мы обучаем с нуля: продукт, переговоры, внедрение, работа с клиентами. Достаточно желания развиваться и базовых навыков работы с компьютером." },
  { q: "Каков размер роялти?", a: "Роялти составляет 15% от ежемесячной выручки. Первые 3 месяца — льготный период с пониженной ставкой 8% для комфортного старта." },
  { q: "Есть ли эксклюзив на территорию?", a: "Да. За каждым партнёром закрепляется эксклюзивная территория (город или регион) без права Кванта продавать напрямую в этой зоне." },
  { q: "Как осуществляется поддержка после запуска?", a: "Личный менеджер, еженедельные созвоны, закрытый чат партнёров, квартальные очные встречи, доступ к базе знаний и совместные маркетинговые активности." },
];

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b border-kv-border cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between py-5 gap-4">
        <span className="text-kv-dark font-medium text-[15px] leading-snug">{q}</span>
        <span
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-kv-border text-kv-gray transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <Icon name="Plus" size={13} />
        </span>
      </div>
      <div
        className="overflow-hidden transition-all duration-300 text-kv-gray text-[14px] leading-relaxed"
        style={{ maxHeight: open ? "200px" : "0", paddingBottom: open ? "20px" : "0" }}
      >
        {a}
      </div>
    </div>
  );
}

export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroRef = useInView(0.05);
  const advRef = useInView(0.1);
  const termsRef = useInView(0.1);
  const supportRef = useInView(0.1);
  const casesRef = useInView(0.1);
  const faqRef = useInView(0.1);
  const contactRef = useInView(0.1);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const fadeUp = (inView: boolean, delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(18px)",
    transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
  });

  return (
    <div className="bg-kv-bg font-sans text-kv-dark min-h-screen overflow-x-hidden">

      {/* NAV */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0)",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid #E5E7EB" : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)" }}
            >
              <span className="text-white font-bold text-xs">К</span>
            </div>
            <span className="font-semibold text-kv-dark text-[15px] tracking-tight">Квант</span>
            <span className="text-kv-gray-mid text-[13px] ml-1">/ франшиза</span>
          </div>

          <nav className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-[13px] text-kv-gray hover:text-kv-dark transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollTo("#contacts")}
            className="hidden md:flex items-center gap-2 text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)" }}
          >
            Стать партнёром
          </button>

          <button className="md:hidden text-kv-gray" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-kv-border px-6 py-4 flex flex-col gap-4 shadow-lg">
            {NAV_ITEMS.map((item) => (
              <button key={item.href} onClick={() => scrollTo(item.href)} className="text-left text-kv-gray text-sm font-medium">
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contacts")}
              className="text-white text-sm font-semibold px-4 py-2.5 rounded-xl text-center"
              style={{ background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)" }}
            >
              Стать партнёром
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        ref={heroRef.ref}
        className="relative min-h-screen flex flex-col justify-center pt-24 pb-20 px-6"
        style={{ background: "linear-gradient(160deg, #F7F8FA 0%, #EEF2FF 50%, #F7F8FA 100%)" }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #818CF8, transparent)" }} />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #8B5CF6, transparent)" }} />

        <div className="relative max-w-5xl mx-auto w-full">
          <div className="inline-flex items-center gap-2 bg-kv-accent-bg border border-indigo-100 rounded-full px-4 py-1.5 mb-8 text-[12px] font-medium text-kv-accent" style={fadeUp(heroRef.inView, 0)}>
            <span className="w-1.5 h-1.5 rounded-full bg-kv-accent animate-pulse" />
            Приём партнёров открыт · 2026
          </div>

          <h1
            className="text-[48px] md:text-[72px] lg:text-[88px] font-extrabold leading-[1.0] tracking-tight text-kv-dark mb-6"
            style={fadeUp(heroRef.inView, 0.1)}
          >
            Ваш бизнес<br />
            <span style={{ background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              в порядке.
            </span>
            <br />Каждый день.
          </h1>

          <p
            className="text-kv-gray text-[17px] md:text-[19px] leading-relaxed max-w-xl mb-10"
            style={fadeUp(heroRef.inView, 0.2)}
          >
            Франшиза Квант — это готовый бизнес на платформе операционного менеджмента.
            Возврат инвестиций от <strong className="text-kv-dark font-semibold">12 месяцев</strong>, прогнозируемая прибыль
            и полная поддержка на каждом этапе.
          </p>

          <div className="flex flex-col sm:flex-row gap-3" style={fadeUp(heroRef.inView, 0.3)}>
            <button
              onClick={() => scrollTo("#contacts")}
              className="flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 rounded-xl text-[15px] transition-all duration-200 hover:opacity-90 shadow-soft"
              style={{ background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)" }}
            >
              Получить презентацию
              <Icon name="ArrowRight" size={16} />
            </button>
            <button
              onClick={() => scrollTo("#cases")}
              className="flex items-center justify-center gap-2 bg-white border border-kv-border text-kv-gray hover:text-kv-dark hover:border-kv-gray-mid font-semibold px-8 py-4 rounded-xl text-[15px] transition-all duration-200"
            >
              Смотреть кейсы
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-16 pt-10 border-t border-kv-border" style={fadeUp(heroRef.inView, 0.45)}>
            {[
              { val: "47+", label: "партнёров в сети" },
              { val: "12 мес", label: "средний ROI" },
              { val: "94%", label: "партнёров продлевают" },
            ].map((s) => (
              <div key={s.val} className="flex items-baseline gap-3">
                <span className="text-[36px] font-extrabold text-kv-dark leading-none">{s.val}</span>
                <span className="text-kv-gray text-[14px]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" ref={advRef.ref} className="py-24 px-6 bg-kv-white border-t border-kv-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14" style={fadeUp(advRef.inView)}>
            <div>
              <div className="text-kv-accent text-[12px] font-semibold uppercase tracking-widest mb-3">Преимущества</div>
              <h2 className="text-[36px] md:text-[48px] font-extrabold leading-tight text-kv-dark">
                Всё готово.<br />Работайте, не изобретая.
              </h2>
            </div>
            <p className="text-kv-gray text-[16px] max-w-sm leading-relaxed">
              Мы прошли путь сами — теперь передаём его вам в виде работающей системы.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ADVANTAGES.map((adv, i) => (
              <div
                key={i}
                className="bg-kv-bg rounded-2xl p-7 hover:shadow-card-hover transition-all duration-300 group border border-kv-border hover:border-indigo-100"
                style={fadeUp(advRef.inView, 0.08 * i)}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)" }}
                >
                  <Icon name={adv.icon} fallback="Star" size={18} className="text-kv-accent" />
                </div>
                <h3 className="text-kv-dark font-semibold text-[16px] mb-2">{adv.title}</h3>
                <p className="text-kv-gray text-[14px] leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TERMS */}
      <section id="terms" ref={termsRef.ref} className="py-24 px-6 bg-kv-bg border-t border-kv-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div style={fadeUp(termsRef.inView)}>
              <div className="text-kv-accent text-[12px] font-semibold uppercase tracking-widest mb-3">Условия</div>
              <h2 className="text-[36px] md:text-[48px] font-extrabold leading-tight text-kv-dark mb-6">
                Прозрачные<br />условия партнёрства
              </h2>
              <p className="text-kv-gray text-[16px] leading-relaxed mb-8">
                Мы не скрываем детали. Все цифры, обязательства и ожидания зафиксированы в договоре. Никаких скрытых платежей.
              </p>
              <button
                onClick={() => scrollTo("#contacts")}
                className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-xl text-[14px] transition-all duration-200 hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)" }}
              >
                Получить полные условия
                <Icon name="ArrowRight" size={15} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4" style={fadeUp(termsRef.inView, 0.2)}>
              {[
                { label: "Паушальный взнос", val: "от 500 000 ₽", note: "разово при подписании" },
                { label: "Роялти", val: "15%", note: "от ежемесячной выручки" },
                { label: "ROI", val: "12–14 мес", note: "средний по партнёрам" },
                { label: "Льготный период", val: "3 месяца", note: "роялти 8% на старте" },
                { label: "Срок договора", val: "3 года", note: "с правом продления" },
                { label: "Эксклюзив", val: "Ваш регион", note: "закрепляется за вами" },
              ].map((t, i) => (
                <div key={i} className="bg-kv-white rounded-2xl p-5 border border-kv-border hover:border-indigo-200 hover:shadow-card transition-all duration-200">
                  <div className="text-kv-gray-mid text-[11px] font-medium uppercase tracking-wide mb-2">{t.label}</div>
                  <div className="text-kv-dark font-extrabold text-[22px] leading-none mb-1.5">{t.val}</div>
                  <div className="text-kv-gray text-[12px]">{t.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROI TIMELINE */}
      <section className="py-20 px-6 bg-kv-white border-t border-kv-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-kv-accent text-[12px] font-semibold uppercase tracking-widest mb-3">Прогноз прибыли</div>
            <h2 className="text-[36px] md:text-[48px] font-extrabold text-kv-dark">Считаем вместе с вами</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              { period: "Мес 1–3", title: "Запуск", desc: "Обучение, первые продажи, 3–5 клиентов", income: "90–150 тыс ₽/мес", color: "#EEF2FF" },
              { period: "Мес 4–6", title: "Рост", desc: "8–12 активных клиентов, отработанные процессы", income: "240–360 тыс ₽/мес", color: "#E0E7FF" },
              { period: "Мес 7–12", title: "Масштаб", desc: "15–20 клиентов, стабильная выручка", income: "450–600 тыс ₽/мес", color: "#C7D2FE" },
              { period: "Год 2+", title: "Прибыль", desc: "Полный возврат инвестиций, чистая прибыль", income: "600 000+ ₽/мес", color: "#A5B4FC" },
            ].map((stage, i) => (
              <div key={i} className="rounded-2xl p-6 border border-kv-border" style={{ background: stage.color }}>
                <div className="text-kv-accent text-[11px] font-semibold uppercase tracking-wide mb-3">{stage.period}</div>
                <div className="text-kv-dark font-bold text-[18px] mb-2">{stage.title}</div>
                <div className="text-kv-gray text-[13px] leading-relaxed mb-4">{stage.desc}</div>
                <div className="text-kv-dark font-semibold text-[14px] pt-3 border-t border-indigo-200">{stage.income}</div>
              </div>
            ))}
          </div>
          <p className="text-kv-gray-mid text-[12px] mt-5 text-center">
            * Прогноз основан на медиане показателей действующих партнёров. Индивидуальные результаты могут отличаться.
          </p>
        </div>
      </section>

      {/* SUPPORT */}
      <section id="support" ref={supportRef.ref} className="py-24 px-6 bg-kv-bg border-t border-kv-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14" style={fadeUp(supportRef.inView)}>
            <div className="text-kv-accent text-[12px] font-semibold uppercase tracking-widest mb-3">Поддержка</div>
            <h2 className="text-[36px] md:text-[48px] font-extrabold text-kv-dark">Вы не один</h2>
            <p className="text-kv-gray mt-3 max-w-md mx-auto text-[16px]">
              Полное сопровождение на всех этапах — от первого звонка до сотого клиента.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "GraduationCap", title: "Обучение", items: ["Онлайн-курс по продукту", "Скрипты продаж", "Тренинг по внедрению", "Экзамен и сертификат"] },
              { icon: "Headphones", title: "Менеджер", items: ["Персональный куратор", "Еженедельные созвоны", "Разбор возражений", "Помощь в крупных сделках"] },
              { icon: "Megaphone", title: "Маркетинг", items: ["Брендбук и материалы", "Совместные кампании", "Тёплые лиды из канала", "Поддержка соцсетей"] },
              { icon: "Network", title: "Сообщество", items: ["Закрытый чат партнёров", "Квартальные встречи", "База лучших практик", "Мастер-майнды"] },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-kv-white rounded-2xl p-6 border border-kv-border shadow-card hover:shadow-card-hover transition-all duration-300"
                style={fadeUp(supportRef.inView, 0.1 * i)}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)" }}>
                  <Icon name={s.icon} fallback="Star" size={18} className="text-kv-accent" />
                </div>
                <h3 className="text-kv-dark font-semibold text-[15px] mb-4">{s.title}</h3>
                <ul className="space-y-2.5">
                  {s.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-kv-gray text-[13px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-kv-accent flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASES */}
      <section id="cases" ref={casesRef.ref} className="py-24 px-6 bg-kv-white border-t border-kv-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14" style={fadeUp(casesRef.inView)}>
            <div className="text-kv-accent text-[12px] font-semibold uppercase tracking-widest mb-3">Кейсы</div>
            <h2 className="text-[36px] md:text-[48px] font-extrabold text-kv-dark">
              Реальные партнёры.<br />Реальные цифры.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {CASES.map((c, i) => (
              <div
                key={i}
                className="bg-kv-bg rounded-2xl p-7 border border-kv-border hover:border-indigo-200 hover:shadow-card-hover transition-all duration-300"
                style={fadeUp(casesRef.inView, 0.12 * i)}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-[15px]"
                    style={{ background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)" }}
                  >
                    {c.name[0]}
                  </div>
                  <div>
                    <div className="text-kv-dark font-semibold text-[14px]">{c.name}</div>
                    <div className="text-kv-gray text-[12px]">{c.city} · {c.role}</div>
                  </div>
                </div>
                <p className="text-kv-gray text-[14px] leading-relaxed mb-6 italic">«{c.text}»</p>
                <div className="grid grid-cols-3 gap-3 pt-5 border-t border-kv-border">
                  {[
                    { label: "Инвестиции", val: c.invest },
                    { label: "ROI", val: c.roi },
                    { label: "Выручка", val: c.mrr },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className="text-kv-gray-mid text-[10px] font-medium uppercase tracking-wide mb-1">{m.label}</div>
                      <div className="text-kv-dark font-semibold text-[12px]">{m.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" ref={faqRef.ref} className="py-24 px-6 bg-kv-bg border-t border-kv-border">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12" style={fadeUp(faqRef.inView)}>
            <div className="text-kv-accent text-[12px] font-semibold uppercase tracking-widest mb-3">FAQ</div>
            <h2 className="text-[36px] md:text-[48px] font-extrabold text-kv-dark">Частые вопросы</h2>
          </div>
          <div className="bg-kv-white rounded-2xl border border-kv-border px-8 py-2" style={fadeUp(faqRef.inView, 0.15)}>
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" ref={contactRef.ref} className="py-24 px-6 bg-kv-white border-t border-kv-border">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10" style={fadeUp(contactRef.inView)}>
            <div className="text-kv-accent text-[12px] font-semibold uppercase tracking-widest mb-3">Контакты</div>
            <h2 className="text-[36px] md:text-[48px] font-extrabold text-kv-dark mb-4">Начните сейчас</h2>
            <p className="text-kv-gray text-[16px]">
              Оставьте заявку — менеджер свяжется в течение одного рабочего дня и вышлет подробную презентацию.
            </p>
          </div>

          <div
            className="bg-kv-bg rounded-2xl border border-kv-border p-8"
            style={fadeUp(contactRef.inView, 0.15)}
          >
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                const btn = e.currentTarget.querySelector("button[type=submit]") as HTMLButtonElement;
                if (btn) { btn.textContent = "Заявка отправлена ✓"; btn.disabled = true; btn.style.opacity = "0.7"; }
              }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-kv-dark text-[13px] font-medium mb-1.5 block">Имя</label>
                  <input
                    required type="text" placeholder="Алексей"
                    className="w-full bg-kv-white border border-kv-border rounded-xl px-4 py-3 text-kv-dark text-[14px] placeholder:text-kv-gray-mid focus:outline-none focus:border-kv-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="text-kv-dark text-[13px] font-medium mb-1.5 block">Телефон</label>
                  <input
                    required type="tel" placeholder="+7 900 000 00 00"
                    className="w-full bg-kv-white border border-kv-border rounded-xl px-4 py-3 text-kv-dark text-[14px] placeholder:text-kv-gray-mid focus:outline-none focus:border-kv-accent transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-kv-dark text-[13px] font-medium mb-1.5 block">Город</label>
                <input
                  type="text" placeholder="Ваш регион"
                  className="w-full bg-kv-white border border-kv-border rounded-xl px-4 py-3 text-kv-dark text-[14px] placeholder:text-kv-gray-mid focus:outline-none focus:border-kv-accent transition-colors"
                />
              </div>
              <div>
                <label className="text-kv-dark text-[13px] font-medium mb-1.5 block">Вопрос или комментарий</label>
                <textarea
                  rows={3} placeholder="Расскажите о вашем опыте или задайте вопрос..."
                  className="w-full bg-kv-white border border-kv-border rounded-xl px-4 py-3 text-kv-dark text-[14px] placeholder:text-kv-gray-mid focus:outline-none focus:border-kv-accent transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white font-semibold py-4 rounded-xl text-[15px] transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2 shadow-soft"
                style={{ background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)" }}
              >
                Отправить заявку
                <Icon name="ArrowRight" size={16} />
              </button>
              <p className="text-kv-gray-mid text-[12px] text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-kv-border px-6 py-8 bg-kv-bg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)" }}
            >
              <span className="text-white font-bold text-[10px]">К</span>
            </div>
            <span className="text-kv-gray text-[13px] font-medium">Квант · Партнёрская программа</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button key={item.href} onClick={() => scrollTo(item.href)} className="text-kv-gray text-[12px] hover:text-kv-dark transition-colors font-medium">
                {item.label}
              </button>
            ))}
          </div>
          <div className="text-kv-gray-mid text-[12px]">© 2026 Квант</div>
        </div>
      </footer>
    </div>
  );
}
