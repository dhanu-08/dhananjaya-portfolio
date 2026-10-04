import React, { useState, useEffect } from "react";
import {
  Share2,
  User,
  Mail,
  MessageSquare,
  Send,
} from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import Komentar from "../components/Commentar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false,
      duration: 800,
      easing: "ease-out-cubic",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: "Sending Message...",
      html: "Please wait while your message is being sent.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const formSubmitUrl =
        "https://formsubmit.co/dhananjayameherguddu@gmail.com";

      const submitData = new FormData();

      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("message", formData.message);
      submitData.append(
        "_subject",
        "New Message from Dhananjaya's Portfolio"
      );
      submitData.append("_captcha", "false");
      submitData.append("_template", "table");

      await axios.post(formSubmitUrl, submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        title: "Message Sent!",
        text: "Your message has been successfully sent.",
        icon: "success",
        confirmButtonColor: "#6366f1",
        timer: 2000,
        timerProgressBar: true,
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      if (error.request && error.request.status === 0) {
        Swal.fire({
          title: "Message Sent!",
          text: "Your message has been successfully sent.",
          icon: "success",
          confirmButtonColor: "#6366f1",
          timer: 2000,
          timerProgressBar: true,
        });

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        Swal.fire({
          title: "Failed!",
          text: "Something went wrong. Please try again later.",
          icon: "error",
          confirmButtonColor: "#6366f1",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="Contact"
      className="relative w-full px-[5%] lg:px-[8%] xl:px-[10%] pt-10 pb-20"
    >
      {/* ================= HEADER ================= */}
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
        <h2
          data-aos="fade-down"
          data-aos-duration="900"
          className="inline-block text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        >
          Contact Me
        </h2>

        <p
          data-aos="fade-up"
          data-aos-duration="1000"
          className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-3 leading-relaxed"
        >
          Have a question, opportunity, or simply want to connect?
          Feel free to send me a message. I'd love to hear from you.
        </p>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-10 items-start">

        {/* ================= LEFT COLUMN ================= */}
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          className="space-y-7"
        >
          {/* CONTACT FORM */}
          <div className="relative overflow-hidden bg-white/[0.045] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 md:p-9 shadow-2xl transition-all duration-500 hover:border-indigo-500/20 hover:shadow-indigo-500/5">

            {/* Decorative glow */}
            <div className="absolute -top-24 -right-24 w-52 h-52 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex items-start justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-1 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7]" />

                  <span className="text-xs uppercase tracking-[0.2em] text-indigo-400 font-semibold">
                    Get In Touch
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                  Let's Connect
                </h3>

                <p className="text-gray-400 text-sm md:text-base mt-3 leading-relaxed max-w-xl">
                  Have something to discuss? Send me a message and
                  let's start a conversation.
                </p>
              </div>

              <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 items-center justify-center shrink-0">
                <Share2 className="w-6 h-6 text-indigo-400" />
              </div>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="relative space-y-5"
            >
              {/* NAME */}
              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="relative group"
              >
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors duration-300 z-10" />

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full h-14 pl-12 pr-4 bg-white/[0.045] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all duration-300 hover:border-white/20 disabled:opacity-50"
                  required
                />
              </div>

              {/* EMAIL */}
              <div
                data-aos="fade-up"
                data-aos-delay="150"
                className="relative group"
              >
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors duration-300 z-10" />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full h-14 pl-12 pr-4 bg-white/[0.045] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all duration-300 hover:border-white/20 disabled:opacity-50"
                  required
                />
              </div>

              {/* MESSAGE */}
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="relative group"
              >
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors duration-300 z-10" />

                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full min-h-[175px] resize-none p-4 pl-12 bg-white/[0.045] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all duration-300 hover:border-white/20 disabled:opacity-50"
                  required
                />
              </div>

              {/* SEND BUTTON */}
              <button
                data-aos="fade-up"
                data-aos-delay="250"
                type="submit"
                disabled={isSubmitting}
                className="group w-full h-14 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-xl font-semibold transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-indigo-500/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />

                <span>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </span>
              </button>
            </form>
          </div>

          {/* SOCIAL LINKS */}
          <div
            data-aos="fade-up"
            data-aos-duration="900"
          >
            <SocialLinks />
          </div>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          className="relative overflow-hidden bg-white/[0.045] backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl transition-all duration-500 hover:border-indigo-500/20 hover:shadow-indigo-500/5"
        >
          {/* Decorative glow */}
          <div className="absolute -bottom-24 -right-24 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-1 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7]" />

              <span className="text-xs uppercase tracking-[0.2em] text-indigo-400 font-semibold">
                Community
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Leave a Message
            </h3>

            <p className="text-gray-400 text-sm md:text-base mt-2 leading-relaxed">
              Share your thoughts, feedback, or a message for others
              visiting my portfolio.
            </p>
          </div>

          <div className="relative">
            <Komentar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;