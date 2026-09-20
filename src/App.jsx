import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";

import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import RunnerGame from "./components/RunnerGame";
import AnimatedBackground from "./components/Background";
import Footer from "./components/Footer";


import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import { AnimatePresence } from "framer-motion";

const Portofolio = lazy(() => import("./Pages/Portofolio"));
const ContactPage = lazy(() => import("./Pages/Contact"));
const ProjectDetails = lazy(() => import("./components/ProjectDetail"));
const WelcomeScreen = lazy(() => import("./Pages/WelcomeScreen"));
const NotFoundPage = lazy(() => import("./Pages/404"));

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <Suspense fallback={null}>
            <WelcomeScreen
              onLoadingComplete={() => setShowWelcome(false)}
            />
          </Suspense>
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <Navbar />

          <Home />
          <About />

          <Suspense fallback={<div className="h-20" />}>
            <Portofolio />
            <ContactPage />
          </Suspense>

          <Footer />
        </>
      )}
    </>
  );
};
const RunnerGamePage = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#030014] pt-28 pb-16 px-[5%]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              🎮 Dhanu Runner
            </h1>

            <p className="text-slate-400 mt-3">
              Test your reflexes, avoid obstacles and collect coins.
            </p>
          </div>

          <RunnerGame />
        </div>
      </main>

      <Footer />
    </>
  );
};

const ProjectPageLayout = () => {
  return (
    <>
      <Suspense fallback={<div className="min-h-screen" />}>
        <ProjectDetails />
      </Suspense>

      <Footer />
    </>
  );
};

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <HelmetProvider>
      <div className="pointer-events-none">
        <AnimatedBackground />
      </div>

      <BrowserRouter>
        <Routes>

          {/* PUBLIC */}
          <Route
            path="/"
            element={
              <LandingPage
                showWelcome={showWelcome}
                setShowWelcome={setShowWelcome}
              />
            }
          />
<Route
  path="/runner-game"
  element={<RunnerGamePage />}
/>

          {/* PROJECT DETAILS */}
          <Route
            path="/project/:slug"
            element={<ProjectPageLayout />}
          />

          {/* LOGIN */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* ADMIN DASHBOARD */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <Suspense fallback={null}>
                <NotFoundPage />
              </Suspense>
            }
          />

        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;