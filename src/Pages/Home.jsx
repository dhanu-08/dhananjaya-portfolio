
import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
  Sparkles,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const StatusBadge = memo(function StatusBadge() {
  return (
    <div
      className="inline-block lg:mx-0 mt-4 sm:mt-0"
      data-aos="zoom-in"
      data-aos-delay="400"
    >
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000" />
        <div className="relative px-3 sm:px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
          <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
            <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-blue-400" />
            Ready to Innovate
          </span>
        </div>
      </div>
    </div>
  );
});

const MainTitle = memo(function MainTitle() {
  return (
    <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
      <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
        <span className="relative inline-block">
          <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20" />
          <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            MBA Finance
          </span>
        </span>
        <br />
        <span className="relative inline-block mt-2">
          <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20" />
          <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
            Student
          </span>
        </span>
      </h1>
    </div>
  );
});

const TechStack = memo(function TechStack({ tech }) {
  return (
    <div className="px-4 py-2 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors">
      {tech}
    </div>
  );
});

TechStack.propTypes = {
  tech: PropTypes.string.isRequired,
};

const CTAButton = memo(function CTAButton({ href, text, icon: Icon }) {
  return (
    <a
      href={href}
      className="group relative inline-flex w-[160px] h-11 items-center justify-center rounded-lg"
    >
      <span className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700" />
      <span className="absolute inset-0 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
        <span className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20" />
      </span>
      <span className="relative flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
        <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
          {text}
        </span>
        <Icon
          aria-hidden="true"
          className={`w-4 h-4 text-gray-200 ${
            text === "Contact"
              ? "group-hover:translate-x-1"
              : "group-hover:rotate-45"
          } transform transition-all duration-300 z-10`}
        />
      </span>
    </a>
  );
});

CTAButton.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};

const SocialLink = memo(function SocialLink({ icon: Icon, link, label }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative inline-flex p-3"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300" />
      <span className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon
          aria-hidden="true"
          className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
        />
      </span>
    </a>
  );
});

SocialLink.propTypes = {
  icon: PropTypes.elementType.isRequired,
  link: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;

const WORDS = [
  "Banking & Financial Services",
  "Financial Analysis Enthusiast",
  "BFSI Professional",
];

const TECH_STACK = ["Financial Analysis", "Ms Excel", "BFSI", "NISM"];

const SOCIAL_LINKS = [
  {
    icon: Github,
    link: "https://github.com/dhanu-08",
    label: "GitHub Profile",
  },
  {
    icon: Linkedin,
    link: "https://www.linkedin.com/in/dhananjayameher/",
    label: "LinkedIn Profile",
  },
  {
    icon: Instagram,
    link: "https://www.instagram.com/_itz.guddu/",
    label: "Instagram Profile",
  },
];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    AOS.init({
      once: true,
      offset: 10,
    });

    const handleResize = () => AOS.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Typing animation with a single managed timeout.
  useEffect(() => {
    const currentWord = WORDS[wordIndex];

    const delay =
      isTyping && charIndex >= currentWord.length
        ? PAUSE_DURATION
        : isTyping
          ? TYPING_SPEED
          : ERASING_SPEED;

    const timeout = window.setTimeout(() => {
      if (isTyping) {
        if (charIndex < currentWord.length) {
          const nextCharIndex = charIndex + 1;
          setText(currentWord.slice(0, nextCharIndex));
          setCharIndex(nextCharIndex);
        } else {
          setIsTyping(false);
        }
      } else if (charIndex > 0) {
        const nextCharIndex = charIndex - 1;
        setText(currentWord.slice(0, nextCharIndex));
        setCharIndex(nextCharIndex);
      } else {
        setWordIndex((currentIndex) => (currentIndex + 1) % WORDS.length);
        setIsTyping(true);
      }
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [charIndex, isTyping, wordIndex]);

  return (
    <>
      <Helmet>
        <title>Dhananjaya Meher — MBA Finance</title>
        <meta
          name="description"
          content="Website resmi Dhananjaya Meher, MBA Finance. Saya berfokus pada penciptaan pengalaman digital yang menarik dan selalu berupaya memberikan solusi terbaik dalam setiap proyek yang saya kerjakan."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://dhananjayameher.com"
        />
        <meta
          property="og:title"
          content="Dhananjaya Meher — MBA Finance"
        />
        <meta
          property="og:description"
          content="Website resmi dan portofolio Dhananjaya Meher, MBA Finance."
        />
        <meta
          property="og:url"
          content="https://dhananjayameher.com"
        />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Dhananjaya Meher",
            jobTitle: "MBA Finance",
            url: "https://dhananjayameher.com",
            sameAs: [
              "https://github.com/dhanu-08/dhananjaya-meher-portfolio",
              "https://www.linkedin.com/in/dhananjayameher/",
              "https://www.instagram.com/_itz.guddu/",
            ],
          })}
        </script>
      </Helmet>

      <div
        className="min-h-screen bg-[#030014] overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] pt-10"
        id="Home"
      >
        <div
          className={`relative z-10 transition-all duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="container mx-auto min-h-screen">
            <div className="flex flex-col lg:flex-row items-center justify-center h-screen md:justify-between gap-0 sm:gap-12 lg:gap-20">
              {/* Left Column */}
              <div
                className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left lg:text-left order-1 lg:order-1 lg:mt-0"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <div className="space-y-4 sm:space-y-6">
                  <StatusBadge />
                  <MainTitle />

                  {/* Typing Effect */}
                  <div
                    className="h-8 flex items-center"
                    data-aos="fade-up"
                    data-aos-delay="800"
                  >
                    <span className="text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                      {text}
                    </span>
                    <span className="w-[3px] h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink" />
                  </div>

                  {/* Description */}
                  <p
                    className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed font-light"
                    data-aos="fade-up"
                    data-aos-delay="1000"
                  >
                    MBA Finance student with a strong interest in banking,
                    financial services, financial analysis, and business
                    analytics. I focus on developing practical financial
                    knowledge and delivering effective solutions through
                    analytical thinking and continuous learning.
                  </p>

                  {/* Tech Stack */}
                  <div
                    className="flex flex-wrap gap-3 justify-start"
                    data-aos="fade-up"
                    data-aos-delay="1200"
                  >
                    {TECH_STACK.map((tech) => (
                      <TechStack key={tech} tech={tech} />
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div
                    className="flex flex-row flex-wrap gap-3 w-full justify-start"
                    data-aos="fade-up"
                    data-aos-delay="1400"
                  >
                    <CTAButton
                      href="#Portofolio"
                      text="Projects"
                      icon={ExternalLink}
                    />
                    <CTAButton
                      href="#Contact"
                      text="Contact"
                      icon={Mail}
                    />
                  </div>

                  {/* Social Links */}
                  <div
                    className="hidden sm:flex gap-4 justify-start"
                    data-aos="fade-up"
                    data-aos-delay="1600"
                  >
                    {SOCIAL_LINKS.map((social) => (
                      <SocialLink key={social.label} {...social} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Existing animation */}
              <div
                className="w-full py-0 md:py-[10%] sm:py-0 lg:w-1/2 h-[260px] sm:h-[400px] lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-2 lg:order-2 mt-5 sm:mt-0"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                data-aos="fade-left"
                data-aos-delay="600"
              >
                <div className="relative w-full opacity-90">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${
                      isHovering
                        ? "opacity-50 scale-105"
                        : "opacity-20 scale-100"
                    }`}
                  />

                  <div
                    className={`relative lg:left-12 z-10 w-full opacity-90 transform transition-transform duration-500 ${
                      isHovering ? "scale-105" : "scale-100"
                    }`}
                  >
                    <img
                      src="/Animation1.gif"
                      alt="Developer animation"
                      className={`w-full h-full object-contain transition-all duration-500 ${
                        isHovering
                          ? "scale-[95%] sm:scale-[90%] md:scale-[90%] lg:scale-[90%] rotate-2"
                          : "scale-[90%] sm:scale-[80%] md:scale-[80%] lg:scale-[80%]"
                      }`}
                    />
                  </div>

                  <div
                    className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
                      isHovering ? "opacity-50" : "opacity-20"
                    }`}
                  >
                    <div
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700 ${
                        isHovering ? "scale-110" : "scale-100"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Home.displayName = "Home";

export default memo(Home);
