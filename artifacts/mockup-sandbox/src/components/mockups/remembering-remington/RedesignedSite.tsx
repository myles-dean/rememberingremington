import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  HeartHandshake,
  Anchor,
  BookOpen,
  ArrowRight,
  ArrowUpRight,
  Quote,
  Mail,
  Instagram,
  Facebook,
  ShoppingBag,
  Feather,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const AMAZON_URL = "https://a.co/d/0auowAqD";

const palette = {
  ivory: "#F7F1E6",
  ivoryDeep: "#EFE6D3",
  cream: "#FBF7EE",
  ink: "#1F2A36",
  dusk: "#2E4053",
  dustyBlue: "#5C7891",
  sage: "#8AA08C",
  gold: "#B8924A",
  goldLight: "#D6B274",
};

const displayFont = `'Cormorant Garamond', 'Playfair Display', Georgia, serif`;
const bodyFont = `'Lora', 'Source Serif 4', Georgia, serif`;
const sansFont = `'Inter', system-ui, sans-serif`;

function FontLoader() {
  useEffect(() => {
    const id = "rr-redesign-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);
  return null;
}

function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="uppercase tracking-[0.32em] text-[11px]"
      style={{ fontFamily: sansFont, color: palette.gold, fontWeight: 500 }}
    >
      {children}
    </p>
  );
}

function SectionHeading({
  children,
  align = "left",
  light = false,
}: {
  children: React.ReactNode;
  align?: "left" | "center";
  light?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <h2
        ref={ref}
        className="text-4xl md:text-5xl leading-[1.1] tracking-tight"
        style={{
          fontFamily: displayFont,
          color: light ? palette.cream : palette.ink,
          fontWeight: 400,
        }}
      >
        {children}
      </h2>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{
          transformOrigin: align === "center" ? "center" : "left",
          background: `linear-gradient(90deg, transparent, ${palette.gold}, transparent)`,
        }}
        className={`h-px mt-5 ${
          align === "center" ? "mx-auto w-32" : "w-24"
        }`}
      />
    </div>
  );
}

function DustMotes() {
  const motes = Array.from({ length: 18 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {motes.map((_, i) => {
        const left = (i * 53) % 100;
        const top = (i * 37) % 100;
        const dur = 14 + (i % 6) * 3;
        const size = 2 + (i % 3);
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              y: [-10, -60],
              x: [0, (i % 2 ? 18 : -18)],
            }}
            transition={{
              duration: dur,
              repeat: Infinity,
              delay: (i * 0.7) % 8,
              ease: "easeInOut",
            }}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              background: "rgba(255, 240, 210, 0.7)",
              boxShadow: "0 0 6px rgba(255,230,180,0.6)",
            }}
          />
        );
      })}
    </div>
  );
}

function DriftingFeather({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40, y: -20, rotate: -20 }}
      whileInView={{
        opacity: [0, 0.5, 0.5, 0],
        x: [-40, 60, 140, 240],
        y: [-20, 10, 40, 80],
        rotate: [-20, -5, 10, 30],
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 8, delay, ease: "easeOut" }}
      className="absolute pointer-events-none"
      style={{ color: palette.goldLight, top: "20%", left: "8%" }}
    >
      <Feather size={28} strokeWidth={1} />
    </motion.div>
  );
}

function smoothScrollTo(href: string) {
  if (!href.startsWith("#")) return;
  const id = href.slice(1);
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (history.replaceState) history.replaceState(null, "", href);
  } else if (id === "home" || id === "") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function Nav() {
  const items = [
    ["The Book", "#book"],
    ["Chapters", "#chapters"],
    ["Author", "#author"],
    ["Gallery", "#gallery"],
    ["Contact", "#contact"],
  ];
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className="mx-4 md:mx-auto max-w-6xl mt-4 px-5 md:px-6 py-3 flex items-center justify-between rounded-full transition-all"
        style={{
          fontFamily: sansFont,
          background: scrolled
            ? "rgba(251,247,238,0.92)"
            : "rgba(251,247,238,0.55)",
          backdropFilter: "blur(14px)",
          border: `1px solid ${scrolled ? "rgba(184,146,74,0.25)" : "rgba(184,146,74,0.15)"}`,
          boxShadow: scrolled
            ? "0 10px 30px -18px rgba(31,42,54,0.25)"
            : "none",
        }}
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2"
          style={{ color: palette.ink }}
        >
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: palette.gold }}
          />
          <span
            style={{ fontFamily: displayFont, fontSize: 18, letterSpacing: 0.3 }}
          >
            Remembering Remington
          </span>
        </a>
        <ul className="hidden md:flex items-center gap-7 text-[13px]">
          {items.map(([label, href]) => (
            <li key={label}>
              <a
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo(href);
                }}
                className="relative transition-colors"
                style={{ color: palette.dusk, fontWeight: 400 }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={AMAZON_URL}
          target="_blank"
          rel="noreferrer"
          className="text-[12px] uppercase tracking-[0.18em] px-4 py-2 rounded-full transition-all hover:opacity-90"
          style={{
            background: palette.ink,
            color: palette.cream,
            fontWeight: 500,
          }}
        >
          Order
        </a>
      </div>
    </motion.nav>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const coverY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-[100vh] overflow-hidden"
      style={{ background: palette.ivory }}
    >
      {/* Ken Burns background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0"
      >
        <motion.img
          src="/images/bg.jpg"
          alt=""
          initial={{ scale: 1.05 }}
          animate={{ scale: 1.12 }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          className="w-full h-full object-cover"
          style={{ filter: "blur(2px) saturate(0.9)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(247,241,230,0.55) 0%, rgba(247,241,230,0.75) 60%, rgba(247,241,230,0.95) 100%)",
          }}
        />
      </motion.div>

      <DustMotes />
      <DriftingFeather delay={1.2} />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-28 sm:pt-36 lg:pt-28 lg:pb-24 lg:min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
        <motion.div style={{ y: textY }} className="lg:col-span-7">
          <Reveal>
            <p
              className="uppercase text-[11px] xl:text-[12px] tracking-[0.34em]"
              style={{ color: palette.dustyBlue, fontFamily: sansFont }}
            >
              Lylianne Vaughn Thompson
              <span style={{ color: palette.gold }}> · </span>
              <span style={{ opacity: 0.75 }}>
                with Hunter Thompson &amp; Jerry Drummonds
              </span>
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <h1
              className="mt-6 text-[clamp(52px,8.4vw,132px)] leading-[0.95] tracking-[-0.015em]"
              style={{
                fontFamily: displayFont,
                color: palette.ink,
                fontWeight: 400,
              }}
            >
              Remembering
              <br />
              <span style={{ fontStyle: "italic", color: palette.dusk }}>
                Remington
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.35}>
            <p
              className="mt-7 text-lg md:text-xl xl:text-[22px] max-w-xl xl:max-w-2xl leading-relaxed"
              style={{
                fontFamily: bodyFont,
                color: palette.dusk,
                opacity: 0.85,
              }}
            >
              A Parent&rsquo;s Story of Heartbreak Redeemed by the Love of
              Jesus.
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <div
              className="mt-10 flex flex-wrap items-center gap-4"
              style={{ fontFamily: sansFont }}
            >
              <a
                href={AMAZON_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm transition-all"
                style={{
                  background: palette.ink,
                  color: palette.cream,
                  letterSpacing: 0.2,
                  boxShadow: "0 14px 30px -18px rgba(31,42,54,0.6)",
                }}
              >
                <ShoppingBag size={16} strokeWidth={1.5} />
                Get the book on Amazon
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
              <a
                href="#book"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo("#book");
                }}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-sm transition-colors"
                style={{
                  border: `1px solid ${palette.gold}`,
                  color: palette.dusk,
                }}
              >
                Read an excerpt
                <ArrowUpRight size={16} />
              </a>
            </div>
          </Reveal>
        </motion.div>

        {/* Floating book cover */}
        <motion.div
          style={{ y: coverY }}
          className="lg:col-span-5 relative flex justify-center lg:justify-end"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="absolute -inset-8 rounded-2xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(214,178,116,0.35), transparent 70%)",
              }}
            />
            <motion.img
              src="/images/Remington-front.jpg"
              alt="Remembering Remington — book cover"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative h-auto rounded-sm"
              style={{
                width: "clamp(260px, 32vw, 460px)",
                boxShadow:
                  "0 30px 60px -25px rgba(31,42,54,0.5), 0 10px 25px -10px rgba(31,42,54,0.3)",
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ fontFamily: sansFont, color: palette.dusk }}>
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10"
          style={{ background: palette.gold }}
        />
        <span className="text-[10px] uppercase tracking-[0.3em] opacity-60">
          Scroll
        </span>
      </div>
    </section>
  );
}

function Memorial() {
  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: palette.cream }}
    >
      <DriftingFeather delay={0.4} />
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <Reveal className="md:col-span-5">
          <div className="relative">
            <div
              className="absolute -inset-3 rounded-sm"
              style={{ border: `1px solid ${palette.gold}`, opacity: 0.6 }}
            />
            <img
              src="/images/Remington-Photo.jpeg"
              alt="Remington Smith Thompson"
              className="relative w-full object-cover rounded-sm"
              style={{
                aspectRatio: "4/5",
                boxShadow: "0 40px 60px -40px rgba(31,42,54,0.4)",
                filter: "sepia(0.05) saturate(0.95)",
              }}
            />
          </div>
        </Reveal>

        <div className="md:col-span-7 md:pl-6">
          <Reveal>
            <SectionEyebrow>In Loving Memory</SectionEyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="mt-5 text-5xl md:text-6xl leading-[1.05]"
              style={{ fontFamily: displayFont, color: palette.ink }}
            >
              Remington
              <br />
              <span style={{ fontStyle: "italic", color: palette.dusk }}>
                Smith Thompson
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-6 flex items-center gap-4">
              <span
                className="h-px w-12"
                style={{ background: palette.gold }}
              />
              <span
                className="text-[12px] uppercase tracking-[0.3em]"
                style={{ color: palette.dustyBlue, fontFamily: sansFont }}
              >
                2022 &mdash; 2024 &nbsp;·&nbsp; Forever loved
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <p
              className="mt-8 text-xl leading-relaxed max-w-xl"
              style={{
                fontFamily: bodyFont,
                color: palette.dusk,
                fontStyle: "italic",
              }}
            >
              &ldquo;For our beloved son, Remington Smith Thompson, whose
              laughter filled our home and whose life forever changed ours.
              Though your time with us was brief, your impact is eternal.&rdquo;
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <p
              className="mt-6 text-base leading-relaxed max-w-xl"
              style={{ fontFamily: bodyFont, color: palette.dusk, opacity: 0.75 }}
            >
              You taught us what love truly means &mdash; not a love that ends,
              but one that continues, deepens, and reaches beyond this life into
              eternity.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function AboutBook() {
  const items = [
    {
      icon: HeartHandshake,
      title: "Honest grief",
      body: "No tidy answers — only the truth of a parent walking through loss.",
    },
    {
      icon: Anchor,
      title: "Anchored hope",
      body: "A faith that holds when nothing else can, rooted in the person of Jesus.",
    },
    {
      icon: BookOpen,
      title: "Eight chapters of tested faith",
      body: "Quiet, scripture-soaked reflections written from the valley itself.",
    },
  ];
  return (
    <section
      id="book"
      className="relative py-28"
      style={{ background: palette.ivory }}
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-14">
        <div className="lg:col-span-7">
          <Reveal>
            <SectionEyebrow>About the Book</SectionEyebrow>
          </Reveal>
          <div className="mt-5">
            <Reveal delay={0.1}>
              <SectionHeading>
                A testimony of faith forged in the deepest valley a parent can
                walk.
              </SectionHeading>
            </Reveal>
          </div>

          <Reveal delay={0.25}>
            <p
              className="mt-8 text-lg leading-[1.8]"
              style={{ fontFamily: bodyFont, color: palette.dusk }}
            >
              When Lylianne and Hunter Thompson lost their seventeen-month-old
              son, Remington, the world stopped turning.{" "}
              <em>Remembering Remington</em> is the honest, deeply personal
              account of how grief, faith, and the promises of God met them in
              their darkest moment &mdash; and carried them through.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <p
              className="mt-5 text-lg leading-[1.8]"
              style={{
                fontFamily: bodyFont,
                color: palette.dusk,
                opacity: 0.85,
              }}
            >
              If you are hurting, this book will steady you. If you are
              doubting, it will anchor you. If you are searching, it will point
              you to Christ.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-5">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={0.2 + i * 0.12}>
              <Card
                className="p-6 border-0 rounded-sm transition-all"
                style={{
                  background: palette.cream,
                  border: `1px solid ${palette.ivoryDeep}`,
                  boxShadow: "0 1px 0 rgba(184,146,74,0.1)",
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(184,146,74,0.12)",
                      color: palette.gold,
                    }}
                  >
                    <it.icon size={20} strokeWidth={1.4} />
                  </div>
                  <div>
                    <h4
                      className="text-lg"
                      style={{
                        fontFamily: displayFont,
                        color: palette.ink,
                        fontWeight: 500,
                      }}
                    >
                      {it.title}
                    </h4>
                    <p
                      className="mt-1.5 text-sm leading-relaxed"
                      style={{
                        fontFamily: bodyFont,
                        color: palette.dusk,
                        opacity: 0.8,
                      }}
                    >
                      {it.body}
                    </p>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PullQuote() {
  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{ background: palette.cream }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <Reveal>
          <Quote
            size={36}
            strokeWidth={1}
            className="mx-auto"
            style={{ color: palette.gold, opacity: 0.6 }}
          />
        </Reveal>
        <Reveal delay={0.15}>
          <blockquote
            className="mt-8 text-3xl md:text-5xl leading-[1.25]"
            style={{
              fontFamily: displayFont,
              fontStyle: "italic",
              color: palette.ink,
              fontWeight: 300,
            }}
          >
            &ldquo;Grief didn&rsquo;t take our faith away &mdash; it forced us
            to decide what it was built on.&rdquo;
          </blockquote>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex items-center justify-center gap-4">
            <span
              className="h-px w-16"
              style={{ background: palette.gold }}
            />
            <p
              className="text-[11px] uppercase tracking-[0.32em]"
              style={{ color: palette.dustyBlue, fontFamily: sansFont }}
            >
              Lylianne Vaughn Thompson
            </p>
            <span
              className="h-px w-16"
              style={{ background: palette.gold }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const CHAPTERS: { title: string; body: string }[] = [
  { title: "The First Choice", body: "Choosing God over resentment." },
  { title: "The Children of Heaven", body: "Child-like faith." },
  { title: "The Comfort", body: "Where true comfort is found." },
  {
    title: "Day by Day",
    body: "Moment-by-moment journey with Christ.",
  },
  {
    title: "The Continuum of Trust",
    body: "Deepening trust through doubt.",
  },
  {
    title: "The Narrow Road",
    body: "Letting God's purposes shape your story.",
  },
  {
    title: "Claiming Purpose Over Fear",
    body: "Finding meaning in loss.",
  },
  {
    title: "Until We See You Again",
    body: "The eternal hope of reunion.",
  },
];

function Chapters() {
  return (
    <section
      id="chapters"
      className="relative py-28"
      style={{ background: palette.ivory }}
    >
      <DriftingFeather delay={0.3} />
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal>
            <SectionEyebrow>Inside the Book</SectionEyebrow>
          </Reveal>
          <div className="mt-5">
            <Reveal delay={0.1}>
              <SectionHeading align="center">
                Eight chapters of tested faith
              </SectionHeading>
            </Reveal>
          </div>
          <Reveal delay={0.25}>
            <p
              className="mt-6 text-base leading-relaxed"
              style={{
                fontFamily: bodyFont,
                color: palette.dusk,
                opacity: 0.8,
              }}
            >
              Each chapter is a quiet station along the way &mdash; honest words
              for the wounded, written from the valley itself.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
          {CHAPTERS.map((c, i) => (
            <Reveal key={c.title} delay={(i % 4) * 0.08}>
              <ChapterCard index={i + 1} title={c.title} body={c.body} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChapterCard({
  index,
  title,
  body,
}: {
  index: number;
  title: string;
  body: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      animate={{ y: hover ? -4 : 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative p-7 rounded-sm group"
      style={{
        background: palette.cream,
        border: `1px solid ${
          hover ? "rgba(184,146,74,0.55)" : "rgba(31,42,54,0.08)"
        }`,
        boxShadow: hover
          ? "0 24px 50px -32px rgba(184,146,74,0.55), 0 0 0 1px rgba(184,146,74,0.05) inset"
          : "0 1px 0 rgba(31,42,54,0.03)",
      }}
    >
      <div className="flex items-start gap-6">
        <div
          className="text-5xl leading-none shrink-0"
          style={{
            fontFamily: displayFont,
            color: palette.gold,
            opacity: 0.75,
            fontStyle: "italic",
            fontWeight: 400,
          }}
        >
          {String(index).padStart(2, "0")}
        </div>
        <div className="pt-1">
          <h3
            className="text-2xl leading-tight"
            style={{
              fontFamily: displayFont,
              color: palette.ink,
              fontWeight: 500,
            }}
          >
            {title}
          </h3>
          <p
            className="mt-2 text-sm leading-relaxed"
            style={{
              fontFamily: bodyFont,
              color: palette.dusk,
              opacity: 0.78,
            }}
          >
            {body}
          </p>
        </div>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hover ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          transformOrigin: "left",
          background: `linear-gradient(90deg, ${palette.gold}, transparent)`,
        }}
        className="absolute bottom-0 left-0 right-0 h-px"
      />
    </motion.div>
  );
}

function Foreword() {
  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: palette.dusk }}
    >
      <div className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #fff 1px, transparent 1px), radial-gradient(circle at 70% 70%, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px, 60px 60px",
        }}
      />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <SectionEyebrow>From the Foreword</SectionEyebrow>
        </Reveal>
        <Reveal delay={0.15}>
          <p
            className="mt-8 text-2xl md:text-4xl leading-[1.35]"
            style={{
              fontFamily: displayFont,
              fontStyle: "italic",
              color: palette.cream,
              fontWeight: 300,
            }}
          >
            &ldquo;This is not merely a grief memoir. It is a testimony of the
            sustaining power of Jesus Christ in the darkest valley a parent can
            walk.&rdquo;
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 inline-flex flex-col items-center gap-2">
            <span
              className="h-px w-12"
              style={{ background: palette.goldLight }}
            />
            <p
              className="text-sm"
              style={{
                fontFamily: displayFont,
                color: palette.cream,
                fontStyle: "italic",
              }}
            >
              Jerry Drummonds
            </p>
            <p
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{
                fontFamily: sansFont,
                color: palette.goldLight,
                opacity: 0.85,
              }}
            >
              Great-Grandfather &amp; Minister
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Author() {
  return (
    <section
      id="author"
      className="relative py-28"
      style={{ background: palette.cream }}
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
        {/* Desktop photo composition */}
        <Reveal className="hidden lg:block lg:col-span-5">
          <div className="relative">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src="/images/Hunter-Lyanna-Lylianne--Family-Photo.jpeg"
                alt="The Thompson family"
                className="w-full object-cover rounded-sm"
                style={{
                  aspectRatio: "4/5",
                  boxShadow: "0 40px 60px -40px rgba(31,42,54,0.4)",
                }}
              />
            </motion.div>
            <motion.img
              src="/images/Lylianne-Thompson.PNG"
              alt="Lylianne Vaughn Thompson"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
              className="absolute -bottom-10 -right-6 w-44 h-44 object-cover rounded-sm"
              style={{
                border: `6px solid ${palette.cream}`,
                boxShadow: "0 30px 50px -30px rgba(31,42,54,0.5)",
              }}
            />
          </div>
        </Reveal>

        <div className="lg:col-span-7 lg:pl-6">
          <Reveal>
            <SectionEyebrow>About the Author</SectionEyebrow>
          </Reveal>
          <div className="mt-5">
            <Reveal delay={0.1}>
              <SectionHeading>
                Lylianne Vaughn Thompson
              </SectionHeading>
            </Reveal>
          </div>

          {/* Mobile-only: Lylianne portrait above the paragraph */}
          <Reveal delay={0.18} className="lg:hidden">
            <motion.img
              src="/images/Lylianne-Thompson.PNG"
              alt="Lylianne Vaughn Thompson"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="mt-7 w-full max-w-sm object-cover rounded-sm"
              style={{
                aspectRatio: "4/5",
                boxShadow: "0 30px 50px -30px rgba(31,42,54,0.4)",
              }}
            />
          </Reveal>

          <Reveal delay={0.25}>
            <p
              className="mt-7 text-lg leading-[1.85]"
              style={{ fontFamily: bodyFont, color: palette.dusk }}
            >
              Lylianne is a wife, a mother, and a daughter of God who never
              expected to write a book like this one. After losing her son
              Remington at seventeen months old, she found that the only way
              forward was the slow, daily surrender of her grief into the hands
              of Jesus.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <p
              className="mt-5 text-base leading-[1.85]"
              style={{
                fontFamily: bodyFont,
                color: palette.dusk,
                opacity: 0.85,
              }}
            >
              <em>Remembering Remington</em> was written alongside her husband{" "}
              <strong style={{ fontWeight: 500 }}>Hunter Thompson</strong>, who
              walked every step of the valley with her, and{" "}
              <strong style={{ fontWeight: 500 }}>Jerry Drummonds</strong>,
              Remington&rsquo;s great-grandfather and a minister, whose
              foreword frames the book as a quiet testimony rather than a
              tutorial in grief.
            </p>
          </Reveal>

          {/* Mobile-only: family photo below the paragraph */}
          <Reveal delay={0.5} className="lg:hidden">
            <img
              src="/images/Hunter-Lyanna-Lylianne--Family-Photo.jpeg"
              alt="The Thompson family"
              className="mt-8 w-full object-cover rounded-sm"
              style={{
                aspectRatio: "4/5",
                boxShadow: "0 30px 50px -30px rgba(31,42,54,0.4)",
              }}
            />
          </Reveal>

          <Reveal delay={0.55}>
            <div
              className="mt-8 flex items-center gap-4"
              style={{ fontFamily: sansFont }}
            >
              <Sparkles size={16} style={{ color: palette.gold }} />
              <span
                className="text-[11px] uppercase tracking-[0.3em]"
                style={{ color: palette.dustyBlue }}
              >
                Wife · Mother · Storyteller of grace
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Order() {
  return (
    <section
      id="order"
      className="relative py-28"
      style={{ background: palette.ivory }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <Card
            className="overflow-hidden border-0 rounded-sm"
            style={{
              background: palette.cream,
              border: `1px solid ${palette.ivoryDeep}`,
              boxShadow: "0 30px 60px -40px rgba(31,42,54,0.35)",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 items-center">
              <div className="md:col-span-5 p-8 md:p-12 flex justify-center"
                style={{ background: palette.ivoryDeep }}>
                <motion.img
                  src="/images/Remington-front.jpg"
                  alt="Remembering Remington — book cover"
                  whileHover={{ rotate: 0, y: -6 }}
                  initial={{ rotate: -3 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-44 md:w-56 rounded-sm"
                  style={{
                    boxShadow:
                      "0 30px 60px -25px rgba(31,42,54,0.45)",
                  }}
                />
              </div>
              <div className="md:col-span-7 p-8 md:p-12">
                <SectionEyebrow>Now Available</SectionEyebrow>
                <h3
                  className="mt-4 text-3xl md:text-4xl leading-[1.1]"
                  style={{
                    fontFamily: displayFont,
                    color: palette.ink,
                    fontWeight: 400,
                  }}
                >
                  Order <em>Remembering Remington</em>
                </h3>
                <p
                  className="mt-5 text-base leading-relaxed"
                  style={{
                    fontFamily: bodyFont,
                    color: palette.dusk,
                    opacity: 0.85,
                  }}
                >
                  Available in paperback and hardcover. A keepsake meant to
                  be read slowly, marked up, and shared with anyone walking
                  through loss.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <a
                    href={AMAZON_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm transition-all"
                    style={{
                      fontFamily: sansFont,
                      background: palette.ink,
                      color: palette.cream,
                      letterSpacing: 0.2,
                      boxShadow: "0 14px 30px -18px rgba(31,42,54,0.6)",
                    }}
                  >
                    <ShoppingBag size={16} strokeWidth={1.5} />
                    Order on Amazon
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </a>
                  <div
                    className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em]"
                    style={{ fontFamily: sansFont, color: palette.dustyBlue }}
                  >
                    <span>Paperback</span>
                    <span style={{ color: palette.gold }}>·</span>
                    <span>Hardcover</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

const REASON_OPTIONS = [
  "Looking for a guest speaker on this topic?",
  "Do you need this resource for your event?",
  "Questions about the book?",
  "General Inquiry",
];

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !reason || !subject || !message) return;
    setStatus("sending");
    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/info@rememberingremington.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            subject,
            reason,
            message,
            _subject: "[RR Inquiry] " + (reason || subject),
            _captcha: "false",
            _template: "table",
          }),
        }
      );
      if (!res.ok) throw new Error("bad response");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="relative py-28"
      style={{ background: palette.cream }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto">
          <Reveal>
            <SectionEyebrow>Inquiries</SectionEyebrow>
          </Reveal>
          <div className="mt-5">
            <Reveal delay={0.1}>
              <SectionHeading align="center">
                Reach out — we&rsquo;d love to hear from you.
              </SectionHeading>
            </Reveal>
          </div>
          <Reveal delay={0.25}>
            <p
              className="mt-5 text-base leading-relaxed"
              style={{
                fontFamily: bodyFont,
                color: palette.dusk,
                opacity: 0.8,
              }}
            >
              For speaking engagements, grief resources, or simply a kind word.
              We read every message.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.35}>
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 text-center px-8 py-16 rounded-sm"
              style={{
                background: "#fff",
                border: `1px solid ${palette.ivoryDeep}`,
                boxShadow: "0 30px 60px -40px rgba(31,42,54,0.25)",
              }}
            >
              <h3
                className="text-3xl"
                style={{
                  fontFamily: displayFont,
                  color: palette.ink,
                  fontWeight: 400,
                }}
              >
                Thank You
              </h3>
              <p
                className="mt-3 text-sm"
                style={{
                  fontFamily: bodyFont,
                  color: palette.dusk,
                  opacity: 0.7,
                }}
              >
                Your message has been received. We&rsquo;ll be in touch soon.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5"
              style={{ fontFamily: sansFont }}
            >
              <FormField label="Full Name">
                <Input
                  required
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="rounded-sm h-12 bg-white"
                  style={{
                    borderColor: "rgba(31,42,54,0.15)",
                    fontFamily: bodyFont,
                  }}
                />
              </FormField>
              <FormField label="Email Address">
                <Input
                  required
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="rounded-sm h-12 bg-white"
                  style={{
                    borderColor: "rgba(31,42,54,0.15)",
                    fontFamily: bodyFont,
                  }}
                />
              </FormField>
              <div className="md:col-span-2">
                <FormField label="Reason for Inquiry">
                  <Select value={reason} onValueChange={setReason}>
                    <SelectTrigger
                      className="rounded-sm h-12 bg-white"
                      style={{
                        borderColor: "rgba(31,42,54,0.15)",
                        fontFamily: bodyFont,
                      }}
                    >
                      <SelectValue placeholder="Select a reason…" />
                    </SelectTrigger>
                    <SelectContent>
                      {REASON_OPTIONS.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
              </div>
              <div className="md:col-span-2">
                <FormField label="Subject">
                  <Input
                    required
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief subject line"
                    className="rounded-sm h-12 bg-white"
                    style={{
                      borderColor: "rgba(31,42,54,0.15)",
                      fontFamily: bodyFont,
                    }}
                  />
                </FormField>
              </div>
              <div className="md:col-span-2">
                <FormField label="Message">
                  <Textarea
                    required
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="Tell us more about your inquiry…"
                    className="rounded-sm bg-white"
                    style={{
                      borderColor: "rgba(31,42,54,0.15)",
                      fontFamily: bodyFont,
                    }}
                  />
                </FormField>
              </div>
              <AnimatePresence>
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="md:col-span-2 text-sm"
                    style={{ color: "#c0392b", fontFamily: bodyFont }}
                  >
                    Something went wrong. Please try again or email us directly
                    at{" "}
                    <a
                      href="mailto:info@rememberingremington.com"
                      style={{ textDecoration: "underline" }}
                    >
                      info@rememberingremington.com
                    </a>
                    .
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="md:col-span-2 flex items-center justify-between gap-4 pt-2">
                <p
                  className="text-xs"
                  style={{ color: palette.dusk, opacity: 0.6 }}
                >
                  We&rsquo;ll never share your information.
                </p>
                <Button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-full px-7 py-6 text-sm"
                  style={{
                    background: palette.ink,
                    color: palette.cream,
                    letterSpacing: 0.2,
                  }}
                >
                  <Mail size={16} className="mr-2" strokeWidth={1.5} />
                  {status === "sending" ? "Sending…" : "Send Message"}
                </Button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span
        className="block text-[11px] uppercase tracking-[0.28em] mb-2"
        style={{ color: palette.dustyBlue, fontFamily: sansFont }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

const GALLERY_IMAGES = [
  "/images/IMG_3815_result.avif",
  "/images/IMG_4471_result.avif",
  "/images/IMG_4027_result.avif",
  "/images/IMG_4490_result.avif",
  "/images/FullSizeRender_result.avif",
  "/images/IMG_6015_result.avif",
  "/images/IMG_5615_result.avif",
  "/images/IMG_6154_result.avif",
  "/images/IMG_7827_result.avif",
  "/images/IMG_5423_result.avif",
  "/images/IMG_7733_result.avif",
  "/images/IMG_2044_result.avif",
];

function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight")
        setActive((i) => (i === null ? 0 : (i + 1) % GALLERY_IMAGES.length));
      if (e.key === "ArrowLeft")
        setActive((i) =>
          i === null
            ? 0
            : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
        );
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section
      id="gallery"
      className="relative py-28"
      style={{ background: palette.ivoryDeep }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal>
            <SectionEyebrow>In Memory</SectionEyebrow>
          </Reveal>
          <div className="mt-5">
            <Reveal delay={0.1}>
              <SectionHeading align="center">Remington</SectionHeading>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.35}>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {GALLERY_IMAGES.map((src, i) => (
              <motion.button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.7,
                  delay: (i % 8) * 0.04,
                  ease: "easeOut",
                }}
                whileHover={{ y: -3 }}
                className="group relative overflow-hidden rounded-sm bg-white"
                style={{
                  aspectRatio: "1/1",
                  boxShadow: "0 18px 30px -22px rgba(31,42,54,0.35)",
                }}
                aria-label={`Open photo ${i + 1}`}
              >
                <img
                  src={src}
                  alt={`Remington — photo ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(31,42,54,0) 60%, rgba(31,42,54,0.35) 100%)",
                  }}
                />
              </motion.button>
            ))}
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 cursor-zoom-out"
            style={{ background: "rgba(31,42,54,0.86)" }}
          >
            <motion.img
              key={GALLERY_IMAGES[active]}
              src={GALLERY_IMAGES[active]}
              alt={`Remington — photo ${active + 1}`}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[92vw] max-h-[88vh] object-contain rounded-sm cursor-default"
              style={{ boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6)" }}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActive(null);
              }}
              className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-xl"
              style={{
                background: "rgba(251,247,238,0.12)",
                color: palette.cream,
                border: "1px solid rgba(251,247,238,0.25)",
              }}
              aria-label="Close"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="relative pt-20 pb-10"
      style={{ background: palette.ink, color: palette.cream }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: palette.goldLight }}
              />
              <p
                className="text-xl"
                style={{ fontFamily: displayFont, letterSpacing: 0.3 }}
              >
                Remembering Remington
              </p>
            </div>
            <p
              className="mt-4 text-sm leading-relaxed max-w-xs"
              style={{
                fontFamily: bodyFont,
                color: "rgba(251,247,238,0.7)",
              }}
            >
              A quiet keepsake of grief redeemed by the love of Jesus.
            </p>
          </div>

          <div>
            <p
              className="text-[10px] uppercase tracking-[0.32em] mb-4"
              style={{ color: palette.goldLight, fontFamily: sansFont }}
            >
              Explore
            </p>
            <ul className="space-y-2 text-sm" style={{ fontFamily: bodyFont }}>
              {[
                ["The Book", "#book"],
                ["Chapters", "#chapters"],
                ["Author", "#author"],
                ["Order", "#order"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScrollTo(href);
                    }}
                    style={{ color: "rgba(251,247,238,0.85)" }}
                    className="hover:opacity-100 opacity-80 transition-opacity"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              className="text-[10px] uppercase tracking-[0.32em] mb-4"
              style={{ color: palette.goldLight, fontFamily: sansFont }}
            >
              Connect
            </p>
            <div className="flex items-center gap-3">
              {[Instagram, Facebook, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollTo("#contact");
                  }}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105"
                  style={{
                    border: `1px solid rgba(251,247,238,0.2)`,
                    color: palette.cream,
                  }}
                >
                  <Icon size={15} strokeWidth={1.4} />
                </a>
              ))}
            </div>
            <a
              href={AMAZON_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm"
              style={{ fontFamily: sansFont, color: palette.goldLight }}
            >
              Order on Amazon <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        <div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs"
          style={{ fontFamily: sansFont, color: "rgba(251,247,238,0.6)" }}
        >
          <p>&copy; {new Date().getFullYear()} Lylianne Vaughn Thompson. All rights reserved.</p>
          <p
            style={{
              fontFamily: displayFont,
              fontStyle: "italic",
              color: palette.goldLight,
              opacity: 0.95,
            }}
          >
            In memory of Remington Smith Thompson
          </p>
        </div>
      </div>
    </footer>
  );
}

export function RedesignedSite() {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: palette.ivory,
        color: palette.ink,
        fontFamily: bodyFont,
      }}
    >
      <FontLoader />
      <Nav />
      <Hero />
      <Memorial />
      <AboutBook />
      <PullQuote />
      <Chapters />
      <Foreword />
      <Author />
      <Order />
      <Contact />
      <Gallery />
      <Footer />
    </div>
  );
}

export default RedesignedSite;
