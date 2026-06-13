"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, ArrowUpRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("https://formspree.io/f/xgvznnrg", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 px-6"
      style={{ background: "#09090f" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <p
            className="text-xs uppercase tracking-[2.5px] mb-4 flex items-center justify-center gap-3"
            style={{
              fontFamily: "Inter, sans-serif",
              color: "rgba(110,231,247,0.7)",
            }}
          >
            <span
              style={{
                display: "block",
                width: 20,
                height: 1,
                background: "rgba(110,231,247,0.6)",
              }}
            />
            Contact
            <span
              style={{
                display: "block",
                width: 20,
                height: 1,
                background: "rgba(110,231,247,0.6)",
              }}
            />
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              letterSpacing: "-1.5px",
            }}
          >
            Let's work{" "}
            <span style={{ color: "rgba(255,255,255,0.2)", fontWeight: 300 }}>
              together
            </span>
          </h2>
          <p
            className="mt-4 text-sm max-w-xl mx-auto"
            style={{
              fontFamily: "Inter, sans-serif",
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.7,
            }}
          >
            Ready to bring your ideas to life? Get in touch and let's create
            something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8">
          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <ContactCard
              icon={<Mail size={18} />}
              label="Email"
              value="ezurikeodinaka@gmail.com"
              href="mailto:ezurikeodinaka@gmail.com"
              color="#6EE7F7"
            />
            <ContactCard
              icon={<Phone size={18} />}
              label="Phone"
              value="+(234) 703-008-5246"
              href="tel:+2347030085246"
              color="#34d399"
            />
            <ContactCard
              icon={<MapPin size={18} />}
              label="Location"
              value="Lagos, Nigeria"
              color="#a78bfa"
            />

            <div
              className="rounded-2xl p-6 mt-2 flex-1 flex flex-col justify-center"
              style={{
                background: "linear-gradient(160deg, #12121e 0%, #0c0c18 100%)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.8,
                }}
              >
                I'm always excited to work on new projects and collaborate with
                amazing people. Whether you need web development, design work,
                or virtual assistance, I'm here to help.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className="rounded-2xl relative overflow-hidden"
            style={{
              background: "linear-gradient(160deg, #12121e 0%, #0c0c18 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Top accent */}
            <div
              className="h-[3px] w-full"
              style={{
                background: "linear-gradient(90deg, #6EE7F7, transparent)",
              }}
            />

            <div className="p-6 sm:p-8">
              <h3
                className="text-white font-bold mb-1"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: 20,
                  letterSpacing: "-0.4px",
                }}
              >
                Send a message
              </h3>
              <p
                className="mb-6"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                Fill out the form below and I'll get back to you as soon as
                possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Name" required>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your full name"
                      className="rounded-xl h-12 px-4 text-[14px] bg-[#0c0c18] border-white/[0.08] text-white placeholder:text-white/20 transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[#6EE7F7]/30 focus-visible:border-[#6EE7F7]/50 hover:border-white/15"
                    />
                  </Field>
                  <Field label="Email" required>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      className="rounded-xl h-12 px-4 text-[14px] bg-[#0c0c18] border-white/[0.08] text-white placeholder:text-white/20 transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[#6EE7F7]/30 focus-visible:border-[#6EE7F7]/50 hover:border-white/15"
                    />
                  </Field>
                </div>

                <Field label="Subject">
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What's this about?"
                    className="rounded-xl h-12 px-4 text-[14px] bg-[#0c0c18] border-white/[0.08] text-white placeholder:text-white/20 transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[#6EE7F7]/30 focus-visible:border-[#6EE7F7]/50 hover:border-white/15"
                  />
                </Field>

                <Field label="Message" required>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project or how I can help you..."
                    className="rounded-xl resize-none px-4 py-3 text-[14px] bg-[#0c0c18] border-white/[0.08] text-white placeholder:text-white/20 transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[#6EE7F7]/30 focus-visible:border-[#6EE7F7]/50 hover:border-white/15"
                  />
                </Field>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl h-12 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:brightness-110 active:scale-[0.99]"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    color: "#09090f",
                    background: "#6EE7F7",
                    boxShadow: "0 8px 24px -8px #6EE7F766",
                  }}
                >
                  {isSubmitting ?
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#09090f]/25 border-t-[#09090f]" />
                      Sending...
                    </>
                  : <>
                      <Send size={15} />
                      Send message
                    </>
                  }
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="block mb-2.5"
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 12,
          fontWeight: 500,
          color: "rgba(255,255,255,0.45)",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
        }}
      >
        {label} {required && <span style={{ color: "#6EE7F7" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  color: string;
}) {
  const content = (
    <div
      className="rounded-2xl p-5 flex items-center gap-4 group transition-all duration-200"
      style={{
        background: "linear-gradient(160deg, #12121e 0%, #0c0c18 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="flex items-center justify-center rounded-xl flex-shrink-0"
        style={{
          width: 44,
          height: 44,
          color: color,
          background: color + "15",
          border: `1px solid ${color}30`,
        }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-[10px] uppercase tracking-[1.5px] mb-1"
          style={{
            fontFamily: "Inter, sans-serif",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          {label}
        </p>
        <p
          className="truncate"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          {value}
        </p>
      </div>
      {href && (
        <ArrowUpRight
          size={16}
          className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          style={{ color: "rgba(255,255,255,0.2)" }}
        />
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block" style={{ textDecoration: "none" }}>
        {content}
      </a>
    );
  }

  return content;
}
