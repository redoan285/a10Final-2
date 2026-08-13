"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  FaXTwitter,
  FaFacebook,
  FaInstagram,
  FaGithub,
} from "react-icons/fa6";
import {
  ArrowRight,
  BookOpen,
  Heart,
  Mail,
  Check,
} from "lucide-react";

const socialLinks = [
  {
    name: "X (Twitter)",
    href: "https://x.com",
    icon: FaXTwitter,
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: FaFacebook,
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: FaInstagram,
  },
  {
    name: "GitHub",
    href: "https://github.com/redoan285",
    icon: FaGithub,
  },
];

const quickLinks = [
  {
    name: "About Us",
    href: "/about",
  },
  {
    name: "Browse Books",
    href: "/books",
  },
  {
    name: "Contact",
    href: "/contact",
  },
  {
    name: "Privacy Policy",
    href: "/privacy",
  },
  {
    name: "Terms of Service",
    href: "/terms",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function FooterClient() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setSubscribed(true);
    setEmail("");

    toast.success("You're successfully subscribed!");

    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  return (
    <footer className="relative overflow-hidden border-t border-neutral-200 bg-neutral-50 pt-16 text-neutral-900 transition-colors duration-300 dark:border-white/5 dark:bg-[#050505] dark:text-white">

      {/* Top Gradient Line */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />

      {/* Main Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[350px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[130px]" />

      {/* Decorative Background Glow */}
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-emerald-500/5 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-emerald-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">

        {/* =========================
            MAIN FOOTER CONTENT
        ========================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-50px",
          }}
          className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-12 lg:gap-16"
        >

          {/* =========================
              BRAND SECTION
          ========================== */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-6 text-center md:col-span-5 md:items-start md:text-left"
          >
            {/* Logo */}
            <Link
              href="/"
              aria-label="BiblioDrop Home"
              className="group flex items-center gap-3 transition-transform duration-300 active:scale-95"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-900/20 transition-all duration-300 group-hover:rotate-3 group-hover:scale-110 group-hover:shadow-emerald-500/30">
                <BookOpen
                  className="text-white"
                  size={23}
                  strokeWidth={2}
                />
              </div>

              <p className="text-2xl font-extrabold tracking-tight text-neutral-900 transition-colors dark:text-white">
                Biblio
                <span className="text-emerald-500">Drop</span>
              </p>
            </Link>

            {/* Description */}
            <p className="max-w-md text-sm leading-7 text-neutral-600 transition-colors dark:text-neutral-400">
              A community-driven platform connecting readers with local
              libraries and independent book owners. Democratizing access to
              literature, one delivery at a time.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    whileHover={{
                      y: -5,
                      scale: 1.08,
                    }}
                    whileTap={{
                      scale: 0.92,
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300 bg-neutral-200 text-neutral-500 transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/5 dark:text-neutral-400 dark:hover:border-emerald-500/30 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400 dark:focus-visible:ring-offset-black"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* =========================
              QUICK LINKS
          ========================== */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-6 md:col-span-3 md:items-start"
          >
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-neutral-900 dark:text-white">
              Quick Links
            </h3>

            <ul className="flex flex-col items-center gap-3 md:items-start">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-neutral-600 transition-all duration-300 hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-400"
                  >
                    <ArrowRight className="h-3.5 w-3.5 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* =========================
              NEWSLETTER
          ========================== */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-6 md:col-span-4 md:items-start"
          >
            <div className="text-center md:text-left">
              <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-neutral-900 dark:text-white">
                Stay in the loop
              </h3>

              <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                Get the latest updates on new arrivals, reading picks, and
                community news.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="w-full space-y-3"
            >
              {/* Email Input */}
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Mail className="h-4 w-4 text-neutral-400 transition-colors group-focus-within:text-emerald-500 dark:text-neutral-500" />
                </div>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  disabled={subscribed}
                  aria-label="Email address"
                  className="w-full rounded-xl border border-neutral-300 bg-white py-3.5 pl-11 pr-4 text-sm text-neutral-900 outline-none transition-all duration-300 placeholder:text-neutral-400 hover:border-emerald-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-neutral-500 dark:hover:border-emerald-500/50 dark:focus:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
                />
              </div>

              {/* Subscribe Button */}
              <motion.button
                type="submit"
                disabled={subscribed}
                whileTap={{
                  scale: subscribed ? 1 : 0.98,
                }}
                className={
                  subscribed
                    ? "flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-100 py-3.5 text-sm font-bold text-emerald-700 transition-all duration-300 dark:border-emerald-500/30 dark:bg-emerald-900/50 dark:text-emerald-400"
                    : "group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-transparent bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/20 transition-all duration-300 hover:bg-emerald-500 hover:shadow-emerald-500/20"
                }
              >
                {subscribed ? (
                  <>
                    <Check className="h-4 w-4" />
                    Subscribed Successfully
                  </>
                ) : (
                  <>
                    Subscribe Now
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>

        {/* =========================
            BOTTOM FOOTER
        ========================== */}
        <div className="flex flex-col items-center justify-between gap-5 border-t border-neutral-200 pt-8 transition-colors dark:border-white/10 md:flex-row">

          {/* Copyright */}
          <p className="text-center text-sm text-neutral-500 md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              BiblioDrop
            </span>
            . All rights reserved.
          </p>

          {/* Made With Love */}
          <motion.p
            whileHover={{
              scale: 1.02,
            }}
            className="flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-200 px-4 py-2 text-sm text-neutral-500 transition-colors dark:border-white/5 dark:bg-white/5"
          >
            Built with

            <motion.span
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              <Heart
                className="h-3.5 w-3.5 fill-emerald-500 text-emerald-500"
              />
            </motion.span>

            for readers everywhere
          </motion.p>
        </div>
      </div>
    </footer>
  );
}