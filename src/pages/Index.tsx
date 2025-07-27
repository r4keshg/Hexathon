import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Laptop,
  Shield,
  BookOpen,
} from "lucide-react";

/* Inline SVG Icon Components for Updated Features Section */
const BookOpenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    stroke="#2563eb"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12L12 2l10 10" />
    <path d="M2 12v8a2 2 0 002 2h4" />
    <path d="M18 22h4a2 2 0 002-2v-8" />
  </svg>
);

const BrainIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    stroke="#2563eb"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12h8" />
    <path d="M12 8v8" />
  </svg>
);

const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    stroke="#2563eb"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="7" r="4" />
    <path d="M5.5 21a6.5 6.5 0 0113 0" />
  </svg>
);

export default function LandingPage() {
  return (
    <>
      {/* Global Inline Styles */}
      <style>{`
        /* Global button styling */
        .btn {
          display: inline-block;
          padding: 12px 24px;
          font-size: 18px;
          font-weight: 600;
          border-radius: 8px;
          background-color: #2563eb;
          color: white;
          text-decoration: none;
          transition: transform 0.3s;
        }
        .btn:hover {
          transform: scale(1.05);
        }
        /* Feature Card styling */
        .feature-card {
          padding: 24px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          background-color: white;
        }
        /* Responsive grid for features */
        @media (min-width: 768px) {
          .features-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 32px;
            max-width: 800px;
            margin: 0 auto;
          }
        }
      `}</style>

      <div style={{ position: "relative", overflowY: "auto" }}>
        {/* ========================================================= */}
        {/* Section 1 – Full-Screen Hero (Learn, Create, Conquer) */}
        {/* ========================================================= */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "56px 24px 0",
            minHeight: "100vh",
          }}
        >
          <div style={{ maxWidth: "768px", margin: "0 auto" }}>
            <h1
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                lineHeight: "1.2",
              }}
            >
              Learn, Create, Conquer
            </h1>
            <p
              style={{
                marginTop: "24px",
                fontSize: "18px",
                color: "#4b5563",
                maxWidth: "640px",
                margin: "24px auto",
              }}
            >
              Join a community of warriors in a gamified learning platform.
              Create courses, share insights, and level up your skills in our
              interactive Arena.
            </p>
            <div style={{ marginTop: "40px" }}>
              {/* Link now goes to the About page */}
              <Link to="/about" className="btn">
                Get Started
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* Section 2 – Updated Features Section */}
        {/* Contains Updated Features and Original Features Subsections */}
        {/* ========================================================= */}
        <section style={{ padding: "64px 0", backgroundColor: "#f9fafb" }}>
          <div
            style={{
              maxWidth: "1120px",
              padding: "0 24px",
              margin: "0 auto",
            }}
          >
            <h2
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "40px",
              }}
            >
              Discover Our Platform Features
            </h2>

            {/* 2a. Updated Features Subsection */}
            <div className="features-grid" style={{ display: "block", marginBottom: "48px" }}>
              {/* Feature 1: Smart Courses */}
              <div className="feature-card">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      backgroundColor: "#dbeafe",
                    }}
                  >
                    <BookOpenIcon />
                  </div>
                  <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
                    Smart Courses
                  </h3>
                </div>
                <p style={{ fontSize: "14px", color: "#4b5563" }}>
                  Experience AI-powered, adaptive courses tailored to your
                  learning style.
                </p>
              </div>

              {/* Feature 2: Real-Time Analytics */}
              <div className="feature-card">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      backgroundColor: "#dbeafe",
                    }}
                  >
                    <BrainIcon />
                  </div>
                  <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
                    Real-Time Analytics
                  </h3>
                </div>
                <p style={{ fontSize: "14px", color: "#4b5563" }}>
                  Monitor your progress with detailed insights and analytics in
                  real time.
                </p>
              </div>

              {/* Feature 3: Community Engagement */}
              <div className="feature-card">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      backgroundColor: "#dbeafe",
                    }}
                  >
                    <UsersIcon />
                  </div>
                  <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
                    Community Engagement
                  </h3>
                </div>
                <p style={{ fontSize: "14px", color: "#4b5563" }}>
                  Connect with peers, share insights, and collaborate to enhance
                  your learning journey.
                </p>
              </div>
            </div>

            {/* 2b. Original Features Subsection */}
            <div className="py-12 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    Everything you need to succeed
                  </h2>
                  <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                    101-School combines learning resources with community engagement
                  </p>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-500 text-white">
                      <Laptop className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 text-xl font-medium text-gray-900">
                      Expert-Led Courses
                    </h3>
                    <p className="mt-2 text-base text-gray-500 text-center">
                      Learn from industry professionals with courses designed for
                      practical skill development.
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-500 text-white">
                      <Users className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 text-xl font-medium text-gray-900">
                      Community Tribe
                    </h3>
                    <p className="mt-2 text-base text-gray-500 text-center">
                      Connect with like-minded learners, share knowledge, and grow
                      together in our Tribe.
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-500 text-white">
                      <Shield className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 text-xl font-medium text-gray-900">
                      Specialized Clans
                    </h3>
                    <p className="mt-2 text-base text-gray-500 text-center">
                      Join topic-specific clans to dive deeper into your areas of
                      interest with focused discussions.
                    </p>
                  </div>
                </div>
                <div className="mt-10 text-center">
                  <Link to="/Odyssey">
                    <Button variant="outline">
                      View All Courses
                      <BookOpen className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* Section 4 – Full-Screen Get Started Section */}
        {/* ========================================================= */}
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(to right, rgba(37, 99, 235, 0.1), rgba(37, 99, 235, 0.05))",
            textAlign: "center",
            padding: "24px",
          }}
        >
          {/* Subsection a: Call-to-Action */}
          <h2 style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "24px" }}>
             Learn Skills & Connect with Our Vibrant Community
          </h2>
          <p
            style={{
              fontSize: "24px",
              color: "#4b5563",
              maxWidth: "640px",
              margin: "0 auto 32px auto",
            }}
          >
            Engage with a community that shares your passion for growth.
          </p>
          <div style={{ marginTop: "40px" }}>
                  <Link to="/TribePage" className="btn">
                    Join our Tribe
                  </Link>
                </div>

          {/* Subsection b: Full-Width Hero */}
          <div style={{ marginTop: "80px", width: "100%" }}>
            <section
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "56px 24px 0",
                minHeight: "100vh",
                background: "linear-gradient(to bottom, white, #f9fafb)",
              }}
            >
              <div style={{ maxWidth: "768px", margin: "0 auto" }}>
                <h1
                  style={{
                    fontSize: "48px",
                    fontWeight: "bold",
                    lineHeight: "1.2",
                  }}
                >
                  Ready to Start Your Learning Journey?
                </h1>
                <p
                  style={{
                    marginTop: "24px",
                    fontSize: "18px",
                    color: "#4b5563",
                    maxWidth: "640px",
                    margin: "24px auto",
                  }}
                >
                  Join thousands of learners and start mastering new skills today.
                </p>
                {/* Button linking directly to external site https://101.school/ */}
          <a
            href="https://101.school/"
            className="btn"
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            Get Started at 101
          </a>
               
              </div>
            </section>
          </div>
        </section>
      </div>
    </>
  );
}
