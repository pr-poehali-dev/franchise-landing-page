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
  {
    icon: "TrendingUp",
    title: "Готовая бизнес-модель",
    desc: "Проверенная система управления операциями, которая работает с первого дня. Никаких экспериментов — только отточенные процессы.",
  },
  {
    icon: "Shield",
    title: "Технологическая платформа",
    desc: "Доступ к полному функционалу Квант: задачи, чек-листы, аналитика, уведомления. Обновления платформы — автоматически.",
  },
  {
    icon: "Users",
    title: "База клиентов",
    desc: "Передаём тёплых лидов из вашего региона. Маркетинговая поддержка и совместные рекламные кампании.",
  },
  {
    icon: "BookOpen",
    title: "Обучение команды",
    desc: "Полный курс по продажам и внедрению продукта. Доступ к базе знаний и закрытому сообществу партнёров.",
  },
  {
    icon: "Headphones",
    title: "Личный менеджер",
    desc: "Выделенный менеджер сопровождает на каждом этапе. Еженедельные созвоны, разбор кейсов, помощь в продажах.",
  },
  {
    icon: "BarChart2",
    title: "Прозрачная аналитика",
    desc: "Единый дашборд с метриками вашего партнёрства: выручка, клиенты, прогноз. Вы всегда видите полную картину.",
  },
];

const CASES = [
  {
    city: "Москва",
    name: "Алексей К.",
    role: "Партнёр с 2022 года",
    invest: "1 200 000 ₽",
    roi: "14 мес.",
    mrr: "480 000 ₽/мес",
    text: "Запустил за 3 месяца. Первые клиенты пришли через канал Кванта — не тратил бюджет на рекламу. Сейчас веду 18 компаний самостоятельно.",
  },
  {
    city: "Екатеринбург",
    name: "Марина В.",
    role: "Партнёр с 2023 года",
    invest: "800 000 ₽",
    roi: "11 мес.",
    mrr: "310 000 ₽/мес",
    text: "Пришла без опыта в IT. Обучение закрыло все вопросы. Продукт продаёт себя сам — рестораны и сети берут без долгих переговоров.",
  },
  {
    city: "Казань",
    name: "Дмитрий Н.",
    role: "Партнёр с 2023 года",
    invest: "1 000 000 ₽",
    roi: "13 мес.",
    mrr: "390 000 ₽/мес",
    text: "Работал в найме. Теперь своя команда из 3 человек, 22 активных клиента. Платформа позволяет масштабироваться без лишних затрат.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Какие инвестиции необходимы для старта?",
    a: "Паушальный взнос от 500 000 ₽ в зависимости от региона. В стоимость включены лицензия на платформу, обучение, маркетинговые материалы и поддержка на первые 6 месяцев.",
  },
  {
    q: "Какой прогнозируемый срок возврата инвестиций?",
    a: "Средний ROI по партнёрской сети — 12–14 месяцев. При активной работе и грамотном ведении клиентов ряд партнёров выходят в плюс за 9–10 месяцев.",
  },
  {
    q: "Нужен ли опыт в IT или управлении?",
    a: "Нет. Мы обучаем с нуля: продукт, переговоры, внедрение, работа с клиентами. Достаточно желания развиваться и базовых навыков работы с компьютером.",
  },
  {
    q: "Каков размер роялти?",
    a: "Роялти составляет 15% от ежемесячной выручки. Первые 3 месяца — льготный период с пониженной ставкой 8% для комфортного старта.",
  },
  {
    q: "Есть ли эксклюзив на территорию?",
    a: "Да. За каждым партнёром закрепляется эксклюзивная территория (город или регион) без права Кванта продавать напрямую в этой зоне.",
  },
  {
    q: "Как осуществляется поддержка после запуска?",
    a: "Личный менеджер, еженедельные созвоны, закрытый чат партнёров, квартальные очные встречи, доступ к базе знаний и совместные маркетинговые активности.",
  },
];

function useInView(threshold = 0.15) {
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
      className="border-b border-kvant-line cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between py-5 gap-4">
        <span className="text-kvant-white font-medium text-[15px] leading-snug">{q}</span>
        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-kvant-line text-kvant-gray transition-transform duration-300" style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}>
          <Icon name="Plus" size={14} />
        </span>
      </div>
      <div
        className="overflow-hidden transition-all duration-300 text-kvant-gray text-sm leading-relaxed"
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

  const heroSection = useInView(0.1);
  const advSection = useInView(0.1);
  const termsSection = useInView(0.1);
  const supportSection = useInView(0.1);
  const casesSection = useInView(0.1);
  const faqSection = useInView(0.1);
  const contactSection = useInView(0.1);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-kvant-dark font-sans text-kvant-white min-h-screen overflow-x-hidden">

      {/* NAV */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(10,14,26,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(30,42,61,0.8)" : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-kvant-blue rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs font-mono">К</span>
            </div>
            <span className="font-semibold text-kvant-white tracking-wide text-[15px]">Квант</span>
            <span className="text-kvant-gray text-[13px] ml-1 font-mono">/ франшиза</span>
          </div>

          <nav className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-[13px] text-kvant-gray hover:text-kvant-white transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollTo("#contacts")}
            className="hidden md:flex items-center gap-2 bg-kvant-blue hover:bg-blue-700 text-white text-[13px] font-medium px-4 py-2 rounded transition-colors duration-200"
          >
            Стать партнёром
          </button>

          <button
            className="md:hidden text-kvant-gray"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-kvant-navy border-t border-kvant-line px-6 py-4 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-left text-kvant-gray text-sm"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contacts")}
              className="bg-kvant-blue text-white text-sm font-medium px-4 py-2 rounded text-center"
            >
              Стать партнёром
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        ref={heroSection.ref}
        className="relative min-h-screen flex flex-col justify-center pt-24 pb-20 px-6"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(27,79,216,0.18) 0%, transparent 70%), #0A0E1A",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.5) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.5) 40px)`,
          }}
        />

        <div className="relative max-w-5xl mx-auto w-full">
          <div
            className="inline-flex items-center gap-2 border border-kvant-line rounded-full px-4 py-1.5 mb-8 text-[12px] font-mono text-kvant-gray"
            style={{ opacity: heroSection.inView ? 1 : 0, transition: "opacity 0.6s" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-kvant-blue-light animate-pulse" />
            Приём партнёров открыт · 2024
          </div>

          <h1
            className="text-[52px] md:text-[80px] lg:text-[96px] font-black leading-[0.95] tracking-tight text-kvant-white mb-6"
            style={{
              opacity: heroSection.inView ? 1 : 0,
              transform: heroSection.inView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s ease 0.1s",
            }}
          >
            Ваш бизнес<br />
            <span style={{ color: "#1B4FD8" }}>в порядке.</span><br />
            Каждый день.
          </h1>

          <p
            className="text-kvant-gray text-[17px] md:text-[19px] leading-relaxed max-w-xl mb-10"
            style={{
              opacity: heroSection.inView ? 1 : 0,
              transform: heroSection.inView ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease 0.25s",
            }}
          >
            Франшиза Квант — это готовый бизнес на платформе операционного менеджмента.
            Возврат инвестиций от <strong className="text-kvant-white">12 месяцев</strong>, прогнозируемая
            прибыль и полная поддержка на каждом этапе.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3"
            style={{
              opacity: heroSection.inView ? 1 : 0,
              transform: heroSection.inView ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease 0.4s",
            }}
          >
            <button
              onClick={() => scrollTo("#contacts")}
              className="bg-kvant-blue hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded text-[15px] transition-all duration-200 flex items-center gap-2"
            >
              Получить презентацию
              <Icon name="ArrowRight" size={16} />
            </button>
            <button
              onClick={() => scrollTo("#cases")}
              className="border border-kvant-line hover:border-kvant-gray text-kvant-gray hover:text-kvant-white font-medium px-8 py-4 rounded text-[15px] transition-all duration-200"
            >
              Смотреть кейсы
            </button>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-8 mt-20 pt-10 border-t border-kvant-line max-w-2xl"
            style={{
              opacity: heroSection.inView ? 1 : 0,
              transition: "opacity 0.8s ease 0.6s",
            }}
          >
            {[
              { val: "47+", label: "партнёров в сети" },
              { val: "12 мес", label: "средний ROI" },
              { val: "94%", label: "партнёров продлевают" },
            ].map((s) => (
              <div key={s.val}>
                <div className="text-[32px] md:text-[40px] font-black text-kvant-white leading-none mb-1">{s.val}</div>
                <div className="text-kvant-gray text-[13px]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" ref={advSection.ref} className="py-24 px-6 border-t border-kvant-line">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14" style={{ opacity: advSection.inView ? 1 : 0, transform: advSection.inView ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s" }}>
            <div className="text-kvant-blue text-[12px] font-mono uppercase tracking-widest mb-3">01 / Преимущества</div>
            <h2 className="text-[38px] md:text-[52px] font-black leading-tight text-kvant-white max-w-xl">
              Всё готово.<br />Работайте, не изобретая.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-kvant-line">
            {ADVANTAGES.map((adv, i) => (
              <div
                key={i}
                className="bg-kvant-dark p-8 hover:bg-kvant-navy transition-colors duration-300 group"
                style={{
                  opacity: advSection.inView ? 1 : 0,
                  transform: advSection.inView ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.5s ease ${0.1 * i}s`,
                }}
              >
                <div className="w-10 h-10 rounded border border-kvant-line flex items-center justify-center mb-5 group-hover:border-kvant-blue transition-colors duration-300">
                  <Icon name={adv.icon} fallback="Star" size={18} className="text-kvant-blue" />
                </div>
                <h3 className="text-kvant-white font-semibold text-[16px] mb-2">{adv.title}</h3>
                <p className="text-kvant-gray text-[14px] leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TERMS */}
      <section id="terms" ref={termsSection.ref} className="py-24 px-6 border-t border-kvant-line" style={{ background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(27,79,216,0.1) 0%, transparent 70%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div style={{ opacity: termsSection.inView ? 1 : 0, transform: termsSection.inView ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s" }}>
              <div className="text-kvant-blue text-[12px] font-mono uppercase tracking-widest mb-3">02 / Условия</div>
              <h2 className="text-[38px] md:text-[48px] font-black leading-tight text-kvant-white mb-6">
                Прозрачные<br />условия партнёрства
              </h2>
              <p className="text-kvant-gray text-[16px] leading-relaxed mb-8">
                Мы не скрываем детали. Все цифры, обязательства и ожидания —
                зафиксированы в договоре. Никаких скрытых платежей.
              </p>
              <button
                onClick={() => scrollTo("#contacts")}
                className="bg-kvant-blue hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded text-[14px] transition-all duration-200 flex items-center gap-2"
              >
                Получить полные условия
                <Icon name="ArrowRight" size={15} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4" style={{ opacity: termsSection.inView ? 1 : 0, transform: termsSection.inView ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease 0.2s" }}>
              {[
                { label: "Паушальный взнос", val: "от 500 000 ₽", note: "разово при подписании" },
                { label: "Роялти", val: "15%", note: "от ежемесячной выручки" },
                { label: "ROI", val: "12–14 мес", note: "средний по партнёрам" },
                { label: "Льготный период", val: "3 месяца", note: "роялти 8% на старте" },
                { label: "Срок договора", val: "3 года", note: "с правом продления" },
                { label: "Эксклюзив", val: "Ваш регион", note: "закрепляется за вами" },
              ].map((t, i) => (
                <div key={i} className="border border-kvant-line rounded p-5 hover:border-kvant-blue transition-colors duration-300">
                  <div className="text-kvant-gray text-[12px] mb-2">{t.label}</div>
                  <div className="text-kvant-white font-bold text-[20px] leading-none mb-1">{t.val}</div>
                  <div className="text-kvant-gray text-[11px] font-mono">{t.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROI HIGHLIGHT */}
      <section className="py-20 px-6 border-t border-kvant-line bg-kvant-navy">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-kvant-blue text-[12px] font-mono uppercase tracking-widest mb-3">Прогноз прибыли</div>
            <h2 className="text-[38px] md:text-[48px] font-black text-kvant-white">Считаем вместе с вами</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-px bg-kvant-line">
            {[
              { month: "Мес 1–3", title: "Запуск", desc: "Обучение, первые продажи, 3–5 клиентов", income: "90–150 тыс ₽/мес" },
              { month: "Мес 4–6", title: "Рост", desc: "8–12 активных клиентов, отработанные процессы", income: "240–360 тыс ₽/мес" },
              { month: "Мес 7–12", title: "Масштаб", desc: "15–20 клиентов, стабильная выручка", income: "450–600 тыс ₽/мес" },
              { month: "Год 2+", title: "Прибыль", desc: "Полный возврат инвестиций, чистая прибыль", income: "600 000+ ₽/мес" },
            ].map((stage, i) => (
              <div key={i} className="bg-kvant-navy p-7 hover:bg-[#0f1928] transition-colors">
                <div className="text-kvant-blue text-[11px] font-mono mb-3">{stage.month}</div>
                <div className="text-kvant-white font-bold text-[18px] mb-2">{stage.title}</div>
                <div className="text-kvant-gray text-[13px] leading-relaxed mb-4">{stage.desc}</div>
                <div className="text-kvant-white font-mono text-[14px] border-t border-kvant-line pt-3">{stage.income}</div>
              </div>
            ))}
          </div>
          <p className="text-kvant-gray text-[12px] font-mono mt-4 text-center">* Прогноз основан на медиане показателей действующих партнёров. Индивидуальные результаты могут отличаться.</p>
        </div>
      </section>

      {/* SUPPORT */}
      <section id="support" ref={supportSection.ref} className="py-24 px-6 border-t border-kvant-line">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" style={{ opacity: supportSection.inView ? 1 : 0, transform: supportSection.inView ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s" }}>
            <div className="text-kvant-blue text-[12px] font-mono uppercase tracking-widest mb-3">03 / Поддержка</div>
            <h2 className="text-[38px] md:text-[52px] font-black text-kvant-white">Вы не один</h2>
            <p className="text-kvant-gray mt-4 max-w-md mx-auto text-[16px]">Полное сопровождение на всех этапах — от первого звонка до сотого клиента.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "GraduationCap", title: "Обучение", items: ["Онлайн-курс по продукту", "Скрипты продаж", "Тренинг по внедрению", "Экзамен и сертификат"] },
              { icon: "Headphones", title: "Менеджер", items: ["Персональный куратор", "Еженедельные созвоны", "Разбор возражений", "Помощь в крупных сделках"] },
              { icon: "Megaphone", title: "Маркетинг", items: ["Брендбук и материалы", "Совместные кампании", "Тёплые лиды из канала", "Поддержка соцсетей"] },
              { icon: "Network", title: "Сообщество", items: ["Закрытый чат партнёров", "Квартальные встречи", "База лучших практик", "Мастер-майнды"] },
            ].map((s, i) => (
              <div
                key={i}
                className="border border-kvant-line rounded p-6"
                style={{ opacity: supportSection.inView ? 1 : 0, transform: supportSection.inView ? "translateY(0)" : "translateY(20px)", transition: `all 0.5s ease ${0.1 * i}s` }}
              >
                <div className="w-9 h-9 rounded border border-kvant-line flex items-center justify-center mb-5">
                  <Icon name={s.icon} fallback="Star" size={16} className="text-kvant-blue" />
                </div>
                <h3 className="text-kvant-white font-semibold text-[15px] mb-4">{s.title}</h3>
                <ul className="space-y-2">
                  {s.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-kvant-gray text-[13px]">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-kvant-blue flex-shrink-0" />
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
      <section id="cases" ref={casesSection.ref} className="py-24 px-6 border-t border-kvant-line bg-kvant-navy">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14" style={{ opacity: casesSection.inView ? 1 : 0, transform: casesSection.inView ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s" }}>
            <div className="text-kvant-blue text-[12px] font-mono uppercase tracking-widest mb-3">04 / Кейсы</div>
            <h2 className="text-[38px] md:text-[52px] font-black text-kvant-white">Реальные партнёры.<br />Реальные цифры.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {CASES.map((c, i) => (
              <div
                key={i}
                className="border border-kvant-line rounded p-7 hover:border-kvant-blue transition-colors duration-300"
                style={{ opacity: casesSection.inView ? 1 : 0, transform: casesSection.inView ? "translateY(0)" : "translateY(24px)", transition: `all 0.5s ease ${0.15 * i}s` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-kvant-blue flex items-center justify-center text-white font-bold text-[15px]">
                    {c.name[0]}
                  </div>
                  <div>
                    <div className="text-kvant-white font-semibold text-[14px]">{c.name}</div>
                    <div className="text-kvant-gray text-[12px]">{c.city} · {c.role}</div>
                  </div>
                </div>
                <p className="text-kvant-gray text-[14px] leading-relaxed mb-6 italic">"{c.text}"</p>
                <div className="grid grid-cols-3 gap-3 pt-5 border-t border-kvant-line">
                  {[
                    { label: "Инвестиции", val: c.invest },
                    { label: "ROI", val: c.roi },
                    { label: "Выручка", val: c.mrr },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className="text-kvant-gray text-[10px] font-mono mb-1">{m.label}</div>
                      <div className="text-kvant-white font-semibold text-[13px]">{m.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" ref={faqSection.ref} className="py-24 px-6 border-t border-kvant-line">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12" style={{ opacity: faqSection.inView ? 1 : 0, transform: faqSection.inView ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s" }}>
            <div className="text-kvant-blue text-[12px] font-mono uppercase tracking-widest mb-3">05 / FAQ</div>
            <h2 className="text-[38px] md:text-[48px] font-black text-kvant-white">Частые вопросы</h2>
          </div>
          <div style={{ opacity: faqSection.inView ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}>
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" ref={contactSection.ref} className="py-24 px-6 border-t border-kvant-line" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(27,79,216,0.15) 0%, transparent 70%)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <div
            style={{ opacity: contactSection.inView ? 1 : 0, transform: contactSection.inView ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s" }}
          >
            <div className="text-kvant-blue text-[12px] font-mono uppercase tracking-widest mb-3">06 / Контакты</div>
            <h2 className="text-[38px] md:text-[52px] font-black text-kvant-white mb-4">Начните сейчас</h2>
            <p className="text-kvant-gray text-[16px] mb-10">
              Оставьте заявку — менеджер свяжется в течение одного рабочего дня,
              ответит на вопросы и вышлет подробную презентацию.
            </p>
          </div>

          <form
            className="flex flex-col gap-4 text-left"
            style={{ opacity: contactSection.inView ? 1 : 0, transform: contactSection.inView ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease 0.2s" }}
            onSubmit={(e) => {
              e.preventDefault();
              const btn = e.currentTarget.querySelector("button[type=submit]") as HTMLButtonElement;
              if (btn) { btn.textContent = "Заявка отправлена ✓"; btn.disabled = true; }
            }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-kvant-gray text-[12px] font-mono mb-1.5 block">Имя</label>
                <input
                  required
                  type="text"
                  placeholder="Алексей"
                  className="w-full bg-kvant-navy border border-kvant-line rounded px-4 py-3 text-kvant-white text-[14px] placeholder:text-kvant-gray focus:outline-none focus:border-kvant-blue transition-colors"
                />
              </div>
              <div>
                <label className="text-kvant-gray text-[12px] font-mono mb-1.5 block">Телефон</label>
                <input
                  required
                  type="tel"
                  placeholder="+7 900 000 00 00"
                  className="w-full bg-kvant-navy border border-kvant-line rounded px-4 py-3 text-kvant-white text-[14px] placeholder:text-kvant-gray focus:outline-none focus:border-kvant-blue transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="text-kvant-gray text-[12px] font-mono mb-1.5 block">Город</label>
              <input
                type="text"
                placeholder="Ваш регион"
                className="w-full bg-kvant-navy border border-kvant-line rounded px-4 py-3 text-kvant-white text-[14px] placeholder:text-kvant-gray focus:outline-none focus:border-kvant-blue transition-colors"
              />
            </div>
            <div>
              <label className="text-kvant-gray text-[12px] font-mono mb-1.5 block">Вопрос или комментарий</label>
              <textarea
                rows={3}
                placeholder="Расскажите о вашем опыте или задайте вопрос..."
                className="w-full bg-kvant-navy border border-kvant-line rounded px-4 py-3 text-kvant-white text-[14px] placeholder:text-kvant-gray focus:outline-none focus:border-kvant-blue transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-kvant-blue hover:bg-blue-700 text-white font-semibold py-4 rounded text-[15px] transition-all duration-200 flex items-center justify-center gap-2"
            >
              Отправить заявку
              <Icon name="ArrowRight" size={16} />
            </button>
            <p className="text-kvant-gray text-[12px] font-mono text-center">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-kvant-line px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-kvant-blue rounded flex items-center justify-center">
              <span className="text-white font-bold text-[10px] font-mono">К</span>
            </div>
            <span className="text-kvant-gray text-[13px]">Квант · Партнёрская программа</span>
          </div>
          <div className="flex gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-kvant-gray text-[12px] hover:text-kvant-white transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="text-kvant-gray text-[12px] font-mono">© 2024 Квант</div>
        </div>
      </footer>
    </div>
  );
}