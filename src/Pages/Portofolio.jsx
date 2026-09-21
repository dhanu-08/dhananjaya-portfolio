import React, { useEffect, useState, useCallback } from "react";

import { supabase } from "../supabase";

import PropTypes from "prop-types";

import SwipeableViews from "react-swipeable-views";

import { useTheme } from "@mui/material/styles";

import AppBar from "@mui/material/AppBar";

import Tabs from "@mui/material/Tabs";

import Tab from "@mui/material/Tab";

import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";

import CardProject from "../components/CardProject";

import AOS from "aos";

import "aos/dist/aos.css";

import Certificate from "../components/Certificate";

import { Code, Award, Boxes } from "lucide-react";

const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="relative mt-4 px-4 py-2 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 group"
  >
    <span>{isShowingMore ? "Show Less" : "Show More"}</span>

    <svg
      className={`w-4 h-4 inline-block ml-2 transition-transform duration-300 ${
        isShowingMore ? "rotate-180" : ""
      }`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline
        points={
          isShowingMore
            ? "18 15 12 9 6 15"
            : "6 9 12 15 18 9"
        }
      />
    </svg>

    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full" />
  </button>
);

ToggleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isShowingMore: PropTypes.bool.isRequired,
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function FullWidthTabs() {
  const theme = useTheme();

  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] =
    useState(false);

  const isMobile = window.innerWidth < 768;

  // =========================
  // FETCH PROJECTS
  // =========================

  const fetchProjects = useCallback(async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Projects fetch error:", error);
      return;
    }

    if (data) {
      console.log("Projects loaded:", data);
      setProjects(data);
    }
  }, []);

  // =========================
  // FETCH CERTIFICATES
  // =========================

  const fetchCertificates = useCallback(async () => {
    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Certificates fetch error:", error);
      return;
    }

    if (data) {
      setCertificates(data);
    }
  }, []);

  useEffect(() => {
    AOS.init({
      once: false,
      offset: 100,
    });

    fetchProjects();
    fetchCertificates();
  }, [fetchProjects, fetchCertificates]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const visibleProjects = showAllProjects
    ? projects
    : projects.slice(0, isMobile ? 2 : 6);

  const visibleCertificates = showAllCertificates
    ? certificates
    : certificates.slice(0, isMobile ? 2 : 6);

  return (
    <div
      className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-visible"
      id="Portofolio"
    >
      {/* HEADER */}
      <div className="text-center pb-1 -mt-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Portfolio Showcase
        </h2>

        <p className="text-slate-400 max-w-2xl mx-auto">
          Explore my projects, certifications, and interactive
          work in finance, banking, business analytics, and
          technology.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* TABS */}
        <AppBar
          position="static"
          sx={{
            background: "rgba(3, 0, 20, 0.75)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "none",
            overflow: "hidden",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            textColor="inherit"
            TabIndicatorProps={{
              style: {
                display: "none",
              },
            }}
            sx={{
              "& .MuiTab-root": {
                fontSize: {
                  xs: "0.9rem",
                  md: "1rem",
                },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition:
                  "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",

                "&:hover": {
                  color: "#ffffff",
                  backgroundColor:
                    "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                },

                "&.Mui-selected": {
                  color: "#fff",
                  background:
                    "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow:
                    "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                },
              },
            }}
          >
            <Tab
              icon={<Code size={20} />}
              label="Projects"
              id="full-width-tab-0"
              aria-controls="full-width-tabpanel-0"
            />

            <Tab
              icon={<Award size={20} />}
              label="Certificates"
              id="full-width-tab-1"
              aria-controls="full-width-tabpanel-1"
            />

            <Tab
              icon={<Boxes size={20} />}
              label="Interactive Lab"
              id="full-width-tab-2"
              aria-controls="full-width-tabpanel-2"
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          {/* =========================
              PROJECTS
          ========================= */}

          <TabPanel
            value={value}
            index={0}
            dir={theme.direction}
          >
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {visibleProjects.map((project, index) => (
                  <div
                    key={project.id || index}
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    <CardProject
                      Img={project.Img || ""}
                      Title={project.Title || "Untitled Project"}
                      Description={
                        project.Description ||
                        "No description available."
                      }
                      Link={project.Link || ""}
                      id={project.id}
                    />
                  </div>
                ))}
              </div>
            </div>

            {projects.length > (isMobile ? 2 : 6) && (
              <div className="flex justify-center pb-10">
                <ToggleButton
                  onClick={() =>
                    setShowAllProjects(!showAllProjects)
                  }
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          {/* =========================
              CERTIFICATES
          ========================= */}

          <TabPanel
            value={value}
            index={1}
            dir={theme.direction}
          >
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {visibleCertificates.map(
                  (certificate, index) => (
                    <div
                      key={certificate.id || index}
                      data-aos="fade-up"
                      data-aos-duration="1000"
                    >
                      <Certificate
                        ImgSertif={certificate.Img}
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            {certificates.length >
              (isMobile ? 2 : 6) && (
              <div className="flex justify-center pb-10">
                <ToggleButton
                  onClick={() =>
                    setShowAllCertificates(
                      !showAllCertificates
                    )
                  }
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          {/* =========================
              INTERACTIVE LAB
          ========================= */}

          <TabPanel
            value={value}
            index={2}
            dir={theme.direction}
          >
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/runner-game";
                }}
                className="group flex items-center justify-center bg-transparent border-0 p-0 outline-none"
                aria-label="Open Runner Game"
              >
                <img
  src="/Runner-game-logo.png"
  alt="Runner Game"
  className="w-40 h-40 object-contain transition-transform duration-300 group-hover:scale-110"
/>
              </button>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}