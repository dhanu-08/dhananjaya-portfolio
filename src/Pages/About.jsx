import React, { useEffect, useState, memo, useMemo } from "react";
import {
  FileText,
  Code,
  Award,
  Globe,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { supabase } from "../supabase";

// =========================
// HEADER
// =========================
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>

    <p
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-purple-400" />
      Exploring the intersection of Finance, FinTech & Technology
      <Sparkles className="w-5 h-5 text-purple-400" />
    </p>
  </div>
));

// =========================
// PROFILE IMAGE
// =========================
const ProfileImage = memo(() => (
  <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
    <div
      className="relative group"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />

        <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />

        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-2xl animate-float opacity-50" />
      </div>

      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />

          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />

          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />

          <img
            src="/profile.png"
            alt="Dhananjaya Meher"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            loading="lazy"
          />

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 delay-100" />

            <div className="absolute inset-0 rounded-full border-8 border-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-slow" />
          </div>
        </div>
      </div>
    </div>
  </div>
));

// =========================
// STAT CARD
// =========================
const StatCard = memo(
  ({
    icon: Icon,
    color,
    value,
    label,
    description,
    animation,
    onClick,
  }) => {
    const clickable = Boolean(onClick);

    return (
      <div
        data-aos={animation}
        data-aos-duration={1000}
        className={`relative group w-full ${
          clickable ? "cursor-pointer" : "cursor-default"
        }`}
        onClick={onClick}
        onKeyDown={(e) => {
          if (
            clickable &&
            (e.key === "Enter" || e.key === " ")
          ) {
            e.preventDefault();
            onClick();
          }
        }}
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
        aria-label={
          clickable
            ? `Open ${label}`
            : undefined
        }
      >
        <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl h-full flex flex-col justify-between">
          <div
            className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
          />

          <div className="flex items-center justify-between mb-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
              <Icon className="w-8 h-8 text-white" />
            </div>

            <span className="text-4xl font-bold text-white">
              {value}
            </span>
          </div>

          <div>
            <p className="text-sm uppercase tracking-wider text-gray-300 mb-2">
              {label}
            </p>

            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-400">
                {description}
              </p>

              <ArrowUpRight
                className={`w-4 h-4 text-white/50 transition-colors ${
                  clickable
                    ? "group-hover:text-white"
                    : ""
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

// =========================
// ABOUT PAGE
// =========================
const AboutPage = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalCertificates: 0,
    YearExperience: 0,
  });

  // =========================
  // FETCH STATS FROM SUPABASE
  // =========================
  useEffect(() => {
    const updateStats = async () => {
      const {
        count: projectCount,
        error: projectError,
      } = await supabase
        .from("projects")
        .select("*", {
          count: "exact",
          head: true,
        });

      const {
        count: certificateCount,
        error: certificateError,
      } = await supabase
        .from("certificates")
        .select("*", {
          count: "exact",
          head: true,
        });

      if (projectError) {
        console.error(
          "Project count error:",
          projectError
        );
      }

      if (certificateError) {
        console.error(
          "Certificate count error:",
          certificateError
        );
      }

      // =========================
      // YEARS OF EXPERIENCE
      // =========================
      const experience = 1;

      setStats({
        totalProjects: projectCount || 0,
        totalCertificates: certificateCount || 0,
        YearExperience: Math.max(0, experience),
      });
    };

    updateStats();
  }, []);

  // =========================
  // AOS
  // =========================
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: false,
        duration: 1000,
        offset: 80,
      });
    };

    initAOS();

    let resizeTimer;

    const handleResize = () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        initAOS();
      }, 250);
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );

      clearTimeout(resizeTimer);
    };
  }, []);

  // =========================
  // OPEN PORTFOLIO TAB
  // =========================
  const openPortfolioTab = (tabIndex) => {
    // Scroll to Portfolio section
    const portfolio =
      document.getElementById("Portofolio");

    if (portfolio) {
      portfolio.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.location.hash = "Portofolio";
    }

    // Give the Portfolio section time to render
    setTimeout(() => {
      const tab = document.getElementById(
        `full-width-tab-${tabIndex}`
      );

      if (tab) {
        tab.click();
      }
    }, 500);
  };

  // =========================
  // STATS DATA
  // =========================
  const statsData = useMemo(
    () => [
      {
        icon: Code,
        color:
          "from-[#6366f1] to-[#a855f7]",
        value: stats.totalProjects,
        label: "Total Projects",
        description:
          "Innovative web solutions crafted",
        animation: "fade-up",

        // Projects tab
        onClick: () =>
          openPortfolioTab(0),
      },

      {
        icon: Award,
        color:
          "from-[#a855f7] to-[#6366f1]",
        value: stats.totalCertificates,
        label: "Certificates",
        description:
          "Professional skills validated",
        animation: "fade-up",

        // Certificates tab
        onClick: () =>
          openPortfolioTab(1),
      },

      {
        icon: Globe,
        color:
          "from-[#6366f1] to-[#a855f7]",
        value: stats.YearExperience,
        label: "Years of Experience",
        description:
          "Continuous learning journey",
        animation: "fade-up",

        // No onClick here
      },
    ],
    [
      stats.totalProjects,
      stats.totalCertificates,
      stats.YearExperience,
    ]
  );

  return (
    <div
      className="h-auto pb-[10%] text-white overflow-x-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm:mt-0"
      id="About"
      itemScope
      itemType="https://schema.org/Person"
    >
      {/* HEADER */}
      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        {/* =========================
            ABOUT CONTENT
        ========================= */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* TEXT */}
          <div className="space-y-6 text-center lg:text-left w-full">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Hello, I'm
              </span>

              <span
                className="block mt-2 text-gray-200"
                data-aos="fade-up"
                data-aos-duration="1200"
                itemProp="name"
              >
                Dhananjaya Meher
              </span>
            </h2>

            <p
              className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-justify pb-4 sm:pb-0"
              data-aos="fade-up"
              data-aos-duration="1400"
            >
              I am passionate about building a
              career in the banking and financial
              services sector. I enjoy working with
              financial information, analyzing
              business situations, and developing
              practical solutions. I continuously
              work on strengthening my knowledge of
              finance, banking operations, and
              analytical tools.
            </p>

            {/* QUOTE */}
            <div
              className="relative bg-gradient-to-br from-[#6366f1]/5 via-transparent to-[#a855f7]/5 border border-[#6366f1]/30 rounded-2xl p-4 my-6 backdrop-blur-md shadow-2xl overflow-hidden"
              data-aos="fade-up"
              data-aos-duration="1600"
            >
              <div className="absolute top-2 right-4 w-16 h-16 bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 rounded-full blur-xl" />

              <div className="absolute -bottom-4 -left-2 w-12 h-12 bg-gradient-to-r from-[#a855f7]/20 to-[#6366f1]/20 rounded-full blur-lg" />

              <div className="absolute top-3 left-4 text-[#6366f1] opacity-30">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
              </div>

              <blockquote className="text-gray-300 text-center lg:text-left italic font-medium text-sm relative z-10 pl-6">
                "Turning financial knowledge into
                practical business solutions."
              </blockquote>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:px-0 w-full">
              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full lg:w-auto"
              >
                <button
                  data-aos="fade-up"
                  data-aos-duration="800"
                  className="w-full lg:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <FileText className="w-5 h-5" />
                  Download CV
                </button>
              </a>

              <a
                href="#Portofolio"
                className="w-full lg:w-auto"
              >
                <button
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  className="w-full lg:w-auto px-6 py-3 rounded-lg border border-[#a855f7]/50 text-[#a855f7] font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 hover:bg-[#a855f7]/10"
                >
                  <Code className="w-5 h-5" />
                  View Projects
                </button>
              </a>
            </div>
          </div>

          {/* PROFILE IMAGE */}
          <ProfileImage />
        </div>

        {/* =========================
            STATS
        ========================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 mb-20 w-full">
          {statsData.map((stat) => (
            <StatCard
              key={stat.label}
              {...stat}
            />
          ))}
        </div>
      </div>

      {/* =========================
          ANIMATIONS
      ========================= */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes spin-slower {
          to {
            transform: rotate(360deg);
          }
        }

        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }

        .animate-spin-slower {
          animation: spin-slower 8s linear infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(AboutPage);