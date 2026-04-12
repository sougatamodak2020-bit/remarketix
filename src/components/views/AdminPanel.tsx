"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useAppStore } from "@/store/appStore";
import {
  Plus, Edit2, Trash2, Save, X, LogOut, LayoutDashboard,
  Users, Home, Briefcase, BookOpen, DollarSign, MessageSquare,
  Info, Mail, Settings, ChevronRight, Shield, Database,
  TrendingUp, Star, Search, RefreshCw, AlertCircle, CheckCircle,
  Menu, Layers, Target, FileText,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Section =
  | "dashboard" | "home" | "services" | "casestudies" | "pricing"
  | "feedback"  | "about" | "contact" | "privacy" | "terms"
  | "users"     | "settings";

type Toast       = { id: string; message: string; type: "success" | "error" | "info" };
type AnyRecord   = Record<string, any>;
type FieldType   = "text" | "textarea" | "url" | "email" | "tel" | "number"
                 | "select" | "color-select" | "array" | "boolean";

interface FieldConfig {
  key: string; label: string; type: FieldType;
  placeholder?: string; options?: { value: string; label: string }[];
  required?: boolean; span?: "full" | "half"; rows?: number;
}

interface TableConfig {
  table: string; label: string; orderBy?: string;
  displayField: string; secondaryField?: string;
  readOnly?: boolean;
  fields: FieldConfig[];
}

// ─── Options ─────────────────────────────────────────────────────────────────

const COLOR_OPTIONS = [
  { value: "emerald", label: "Emerald" }, { value: "blue",   label: "Blue"   },
  { value: "violet",  label: "Violet"  }, { value: "cyan",   label: "Cyan"   },
  { value: "rose",    label: "Rose"    }, { value: "amber",  label: "Amber"  },
  { value: "pink",    label: "Pink"    }, { value: "teal",   label: "Teal"   },
  { value: "orange",  label: "Orange"  }, { value: "indigo", label: "Indigo" },
];

const GRADIENT_OPTIONS = [
  { value: "from-emerald-500 to-emerald-600", label: "Emerald" },
  { value: "from-blue-500 to-blue-600",       label: "Blue"    },
  { value: "from-violet-500 to-violet-600",   label: "Violet"  },
  { value: "from-cyan-500 to-cyan-600",       label: "Cyan"    },
  { value: "from-rose-500 to-rose-600",       label: "Rose"    },
  { value: "from-amber-500 to-amber-600",     label: "Amber"   },
  { value: "from-pink-500 to-pink-600",       label: "Pink"    },
  { value: "from-teal-500 to-teal-600",       label: "Teal"    },
];

const ARRAY_FIELDS: Record<string, string[]> = {
  case_studies:       ["tags", "solution", "services_used"],
  services:           ["features", "use_cases"],
  pricing_plans:      ["features"],
  team_members:       ["achievements"],
  about_values:       ["features"],
  home_capabilities:  ["items"],
  privacy_sections:   ["content"],
  terms_sections:     ["content"],
};

// ─── Section Configs ──────────────────────────────────────────────────────────

const SECTION_CONFIGS: Record<string, TableConfig[]> = {

  home: [
    {
      table: "home_hero", label: "Hero Section", displayField: "headline",
      fields: [
        { key: "headline",      label: "Main Headline",     type: "text",     required: true, span: "full" },
        { key: "subheadline",   label: "Sub Headline",      type: "text",     span: "full" },
        { key: "description",   label: "Description",       type: "textarea", rows: 3, span: "full" },
        { key: "cta_primary",   label: "Primary CTA Text",  type: "text",     placeholder: "Book Free Strategy Call" },
        { key: "cta_secondary", label: "Secondary CTA",     type: "text",     placeholder: "View Our Work" },
        { key: "badge_text",    label: "Badge Text",        type: "text",     placeholder: "Trusted by 200+ Businesses" },
      ],
    },
    {
      table: "home_stats", label: "Stats / Counters", displayField: "label",
      secondaryField: "value", orderBy: "order",
      fields: [
        { key: "value",       label: "Value",         type: "text",         required: true, placeholder: "500+" },
        { key: "label",       label: "Label",         type: "text",         required: true, placeholder: "Leads Generated" },
        { key: "description", label: "Description",   type: "text" },
        { key: "color",       label: "Color",         type: "color-select", options: COLOR_OPTIONS },
        { key: "order",       label: "Display Order", type: "number" },
      ],
    },
    {
      table: "home_capabilities", label: "Service Capabilities", displayField: "title", orderBy: "order",
      fields: [
        { key: "title",       label: "Title",                       type: "text",         required: true },
        { key: "subtitle",    label: "Subtitle",                    type: "text" },
        { key: "description", label: "Description",                 type: "textarea",     rows: 3, span: "full" },
        { key: "image",       label: "Image URL",                   type: "url",          span: "full" },
        { key: "gradient",    label: "Gradient",                    type: "select",       options: GRADIENT_OPTIONS },
        { key: "accent",      label: "Accent Color",                type: "color-select", options: COLOR_OPTIONS },
        { key: "items",       label: "Feature Items (one per line)",type: "array",        rows: 4, span: "full", placeholder: "B2B Lead Generation\nProspect Research" },
        { key: "order",       label: "Display Order",               type: "number" },
      ],
    },
    {
      table: "home_process_steps", label: "Process Steps", displayField: "title", orderBy: "step_number",
      fields: [
        { key: "step_number",  label: "Step Number",  type: "number",       required: true },
        { key: "title",        label: "Title",        type: "text",         required: true },
        { key: "description",  label: "Description",  type: "textarea",     rows: 3, span: "full" },
        { key: "color",        label: "Color",        type: "color-select", options: COLOR_OPTIONS },
      ],
    },
  ],

  services: [
    {
      table: "service_categories", label: "Service Categories",
      displayField: "title", secondaryField: "subtitle",
      fields: [
        { key: "id",       label: "ID Slug (e.g. data-lead-gen)", type: "text",         required: true, span: "full", placeholder: "data-lead-gen" },
        { key: "title",    label: "Title",                        type: "text",         required: true, span: "full" },
        { key: "subtitle", label: "Subtitle",                     type: "textarea",     rows: 2, span: "full" },
        { key: "color",    label: "Color",                        type: "color-select", options: COLOR_OPTIONS },
      ],
    },
    {
      table: "services", label: "Individual Services",
      displayField: "title", secondaryField: "subtitle",
      fields: [
        { key: "title",       label: "Title",                         type: "text",         required: true, span: "full" },
        { key: "subtitle",    label: "Subtitle",                      type: "text",         span: "full" },
        { key: "category_id", label: "Category ID",                   type: "text",         required: true, placeholder: "data-lead-gen" },
        { key: "color",       label: "Color",                         type: "color-select", options: COLOR_OPTIONS },
        { key: "short_desc",  label: "Short Description",             type: "textarea",     rows: 2, span: "full" },
        { key: "full_desc",   label: "Full Description",              type: "textarea",     rows: 4, span: "full" },
        { key: "features",    label: "Features (one per line)",       type: "array",        rows: 4, span: "full", placeholder: "B2B Lead Generation\nIndustry Prospecting" },
        { key: "use_cases",   label: "Use Cases (one per line)",      type: "array",        rows: 3, span: "full", placeholder: "New market entry\nEnterprise prospecting" },
      ],
    },
  ],

  casestudies: [
    {
      table: "case_studies", label: "Case Studies",
      displayField: "title", secondaryField: "category",
      fields: [
        { key: "title",         label: "Title",                          type: "text",         required: true, span: "full" },
        { key: "category",      label: "Category",                       type: "text",         required: true, placeholder: "Lead Generation" },
        { key: "service",       label: "Service",                        type: "text",         placeholder: "Lead Generation and Outreach" },
        { key: "client_type",   label: "Client Type",                    type: "text",         required: true, placeholder: "Event Management Company" },
        { key: "color",         label: "Color",                          type: "color-select", options: COLOR_OPTIONS },
        { key: "image",         label: "Image URL",                      type: "url",          span: "full" },
        { key: "short_desc",    label: "Short Description",              type: "textarea",     rows: 2, span: "full" },
        { key: "key_result",    label: "Key Result",                     type: "text",         required: true, span: "full", placeholder: "3x increase in qualified leads" },
        { key: "problem",       label: "Problem Statement",              type: "textarea",     rows: 3, span: "full" },
        { key: "tags",          label: "Tags (one per line)",            type: "array",        rows: 2, span: "full", placeholder: "Lead Generation\nOutreach" },
        { key: "solution",      label: "Solution Steps (one per line)",  type: "array",        rows: 4, span: "full", placeholder: "Built targeted database\nSet up campaigns" },
        { key: "services_used", label: "Services Used (one per line)",   type: "array",        rows: 2, span: "full", placeholder: "Lead Generation\nLinkedIn Outreach" },
      ],
    },
  ],

  pricing: [
    {
      table: "pricing_plans", label: "Pricing Plans",
      displayField: "name", secondaryField: "price", orderBy: "order",
      fields: [
        { key: "name",        label: "Plan Name",                    type: "text",         required: true },
        { key: "price",       label: "Price",                        type: "text",         required: true, placeholder: "$999/month" },
        { key: "badge",       label: "Badge Text",                   type: "text",         placeholder: "Most Popular" },
        { key: "color",       label: "Color",                        type: "color-select", options: COLOR_OPTIONS },
        { key: "description", label: "Description",                  type: "textarea",     rows: 2, span: "full" },
        { key: "features",    label: "Features (one per line)",      type: "array",        rows: 5, span: "full", placeholder: "Up to 2,000 leads/month\nAdvanced verification" },
        { key: "cta_text",    label: "CTA Button Text",              type: "text",         placeholder: "Get Started" },
        { key: "gradient",    label: "Gradient",                     type: "select",       options: GRADIENT_OPTIONS },
        { key: "is_featured", label: "Featured Plan",                type: "boolean" },
        { key: "order",       label: "Display Order",                type: "number" },
      ],
    },
  ],

  feedback: [
    {
      table: "testimonials", label: "Testimonials",
      displayField: "author", secondaryField: "role", orderBy: "order",
      fields: [
        { key: "quote",   label: "Quote",           type: "textarea",     rows: 3, required: true, span: "full" },
        { key: "author",  label: "Author Name",     type: "text",         required: true },
        { key: "role",    label: "Role / Title",    type: "text",         required: true },
        { key: "company", label: "Company",         type: "text" },
        { key: "color",   label: "Color",           type: "color-select", options: COLOR_OPTIONS },
        { key: "avatar",  label: "Avatar URL",      type: "url",          span: "full" },
        { key: "rating",  label: "Rating (1–5)",    type: "number",       placeholder: "5" },
        { key: "order",   label: "Display Order",   type: "number" },
      ],
    },
  ],

  about: [
    {
      table: "team_members", label: "Team Members",
      displayField: "name", secondaryField: "role", orderBy: "order",
      fields: [
        { key: "name",         label: "Full Name",                      type: "text",         required: true },
        { key: "role",         label: "Role / Title",                   type: "text",         required: true },
        { key: "color",        label: "Color",                          type: "color-select", options: COLOR_OPTIONS },
        { key: "image",        label: "Photo URL",                      type: "url",          span: "full" },
        { key: "bio",          label: "Bio",                            type: "textarea",     rows: 2, span: "full" },
        { key: "achievements", label: "Achievements (one per line)",    type: "array",        rows: 3, span: "full", placeholder: "500+ Projects\n12 Countries\n99% Success Rate" },
        { key: "linkedin",     label: "LinkedIn URL",                   type: "url" },
        { key: "twitter",      label: "Twitter URL",                    type: "url" },
        { key: "order",        label: "Display Order",                  type: "number" },
      ],
    },
    {
      table: "about_values", label: "Core Values",
      displayField: "title", secondaryField: "desc", orderBy: "order",
      fields: [
        { key: "title",     label: "Value Title",                    type: "text",         required: true },
        { key: "desc",      label: "Short Tagline",                  type: "text",         required: true, placeholder: "Data that targets real buyers" },
        { key: "color",     label: "Color",                          type: "color-select", options: COLOR_OPTIONS },
        { key: "gradient",  label: "Gradient",                       type: "select",       options: GRADIENT_OPTIONS },
        { key: "icon_name", label: "Icon Name (lucide)",             type: "text",         placeholder: "Crosshair" },
        { key: "features",  label: "Feature Points (one per line)",  type: "array",        rows: 3, span: "full", placeholder: "Triple-verified data\nICP alignment" },
        { key: "order",     label: "Display Order",                  type: "number" },
      ],
    },
    {
      table: "about_milestones", label: "Timeline / Milestones",
      displayField: "title", secondaryField: "year", orderBy: "order",
      fields: [
        { key: "year",  label: "Year",           type: "text",         required: true, placeholder: "2024" },
        { key: "title", label: "Milestone",      type: "text",         required: true, placeholder: "500+ Projects" },
        { key: "desc",  label: "Description",    type: "textarea",     rows: 2, span: "full" },
        { key: "color", label: "Color",          type: "color-select", options: COLOR_OPTIONS },
        { key: "order", label: "Display Order",  type: "number" },
      ],
    },
  ],

  contact: [
    {
      table: "contact_info", label: "Contact Info Cards",
      displayField: "title", orderBy: "order",
      fields: [
        { key: "title",    label: "Label",           type: "text",         required: true, placeholder: "Office" },
        { key: "content",  label: "Content",         type: "textarea",     rows: 2, required: true, span: "full", placeholder: "Ecospace Business Park\nKolkata, India" },
        { key: "href",     label: "Link (href)",     type: "text",         placeholder: "tel:+91…" },
        { key: "color",    label: "Color",           type: "color-select", options: COLOR_OPTIONS },
        { key: "gradient", label: "Gradient",        type: "select",       options: GRADIENT_OPTIONS },
        { key: "order",    label: "Display Order",   type: "number" },
      ],
    },
    {
      table: "contact_submissions", label: "Form Submissions",
      displayField: "first_name", secondaryField: "email",
      orderBy: "created_at", readOnly: true,
      fields: [
        { key: "first_name", label: "First Name",        type: "text" },
        { key: "last_name",  label: "Last Name",         type: "text" },
        { key: "email",      label: "Email",             type: "email",    span: "full" },
        { key: "company",    label: "Company / Website", type: "text" },
        { key: "message",    label: "Message",           type: "textarea", rows: 4, span: "full" },
        { key: "status",     label: "Status",            type: "select",   options: [
          { value: "new",         label: "New"         },
          { value: "in_progress", label: "In Progress" },
          { value: "resolved",    label: "Resolved"    },
        ]},
      ],
    },
  ],

  privacy: [
    {
      table: "privacy_sections", label: "Privacy Policy Sections",
      displayField: "title", orderBy: "order",
      fields: [
        { key: "title",     label: "Section Title",                  type: "text",         required: true, span: "full" },
        { key: "color",     label: "Color",                          type: "color-select", options: COLOR_OPTIONS },
        { key: "icon_name", label: "Icon Name (lucide)",             type: "text",         placeholder: "Shield" },
        { key: "content",   label: "Content Items (one per line)",   type: "array",        rows: 5, span: "full", placeholder: "We do not sell your data\nWe use secure storage" },
        { key: "order",     label: "Display Order",                  type: "number" },
      ],
    },
    {
      table: "privacy_meta", label: "Privacy Page Meta",
      displayField: "effective_date",
      fields: [
        { key: "effective_date", label: "Effective Date",       type: "text",     required: true, placeholder: "April 2025" },
        { key: "intro",          label: "Introduction",         type: "textarea", rows: 4, span: "full" },
        { key: "changes_text",   label: "Changes Policy Text", type: "textarea", rows: 3, span: "full" },
      ],
    },
  ],

  terms: [
    {
      table: "terms_sections", label: "Terms of Service Sections",
      displayField: "title", orderBy: "order",
      fields: [
        { key: "title",     label: "Section Title",                       type: "text",         required: true, span: "full" },
        { key: "color",     label: "Color",                               type: "color-select", options: COLOR_OPTIONS },
        { key: "icon_name", label: "Icon Name (lucide)",                  type: "text",         placeholder: "Briefcase" },
        { key: "content",   label: "Content Paragraphs (one per line)",   type: "array",        rows: 5, span: "full", placeholder: "Services are based on agreed scope\nAll deliverables subject to review" },
        { key: "order",     label: "Display Order",                       type: "number" },
      ],
    },
    {
      table: "terms_meta", label: "Terms Page Meta",
      displayField: "effective_date",
      fields: [
        { key: "effective_date", label: "Effective Date",       type: "text",     required: true, placeholder: "April 2025" },
        { key: "intro",          label: "Introduction",         type: "textarea", rows: 4, span: "full" },
        { key: "changes_text",   label: "Changes Policy Text", type: "textarea", rows: 3, span: "full" },
      ],
    },
  ],
};

// ─── Sidebar Nav ─────────────────────────────────────────────────────────────

const SECTION_NAV: { id: Section; label: string; icon: any; color: string }[] = [
  { id: "dashboard",   label: "Dashboard",         icon: LayoutDashboard, color: "emerald" },
  { id: "home",        label: "Home Page",          icon: Home,            color: "blue"    },
  { id: "services",    label: "Services",           icon: Briefcase,       color: "violet"  },
  { id: "casestudies", label: "Case Studies",       icon: BookOpen,        color: "amber"   },
  { id: "pricing",     label: "Pricing",            icon: DollarSign,      color: "rose"    },
  { id: "feedback",    label: "Feedback",           icon: MessageSquare,   color: "pink"    },
  { id: "about",       label: "About",              icon: Info,            color: "teal"    },
  { id: "contact",     label: "Contact",            icon: Mail,            color: "orange"  },
  { id: "privacy",     label: "Privacy Policy",     icon: Shield,          color: "cyan"    },
  { id: "terms",       label: "Terms of Service",   icon: FileText,        color: "indigo"  },
  { id: "users",       label: "User Management",    icon: Users,           color: "indigo"  },
  { id: "settings",    label: "Settings",           icon: Settings,        color: "slate"   },
];

// ─── Toast Hook ───────────────────────────────────────────────────────────────

function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const addToast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3000);
  }, []);
  return { toasts, addToast };
}

// ─── FormField ────────────────────────────────────────────────────────────────

function FormField({ field, value, onChange }: {
  field: FieldConfig; value: any; onChange: (v: any) => void;
}) {
  const base =
    "w-full px-3 md:px-3.5 py-2 md:py-2.5 text-sm rounded-xl bg-white/5 border border-white/10 text-white outline-none " +
    "focus:border-emerald-500/50 transition-all placeholder:text-white/25 touch-manipulation";

  if (field.type === "textarea") {
    return <textarea rows={field.rows || 3} value={value || ""} onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder} className={`${base} resize-none`} />;
  }

  if (field.type === "array") {
    const display = Array.isArray(value) ? value.join("\n") : (value || "");
    return <textarea rows={field.rows || 3} value={display} onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder} className={`${base} resize-none`} />;
  }

  if (field.type === "select" || field.type === "color-select") {
    return (
      <select value={value || ""} onChange={(e) => onChange(e.target.value)}
        className={`${base} cursor-pointer`} style={{ background: "#0d1117" }}>
        <option value="">Select…</option>
        {field.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    );
  }

  if (field.type === "boolean") {
    return (
      <div className="flex items-center gap-3 py-1">
        <button type="button" onClick={() => onChange(!value)}
          className={`relative w-10 h-6 rounded-full transition-colors duration-200 flex-shrink-0 touch-manipulation ${value ? "bg-emerald-500" : "bg-white/10"}`}>
          <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${value ? "translate-x-4" : "translate-x-0"}`} />
        </button>
        <span className="text-white/50 text-sm">{value ? "Yes" : "No"}</span>
      </div>
    );
  }

  const inputType = (["text","url","email","tel","number"] as string[]).includes(field.type)
    ? field.type as React.HTMLInputTypeAttribute : "text";

  return <input type={inputType} value={value || ""} onChange={(e) => onChange(e.target.value)}
    placeholder={field.placeholder} className={base} />;
}

// ─── CrudModal ────────────────────────────────────────────────────────────────

function CrudModal({ config, record, onClose, onSave }: {
  config: TableConfig; record: AnyRecord | null;
  onClose: () => void; onSave: (data: AnyRecord) => Promise<void>;
}) {
  const [form, setForm] = useState<AnyRecord>(record || {});
  const [saving, setSaving] = useState(false);
  const setField = (key: string, val: any) => setForm((p) => ({ ...p, [key]: val }));

  const handleSave = async () => { setSaving(true); await onSave(form); setSaving(false); };

  // Build rows: full-span fields sit alone; non-full fields pair up into two columns
  const buildRows = useMemo((): FieldConfig[][] => {
    const rows: FieldConfig[][] = [];
    let pair: FieldConfig[] = [];
    config.fields.forEach((f) => {
      if (f.span === "full") {
        if (pair.length) { rows.push([...pair]); pair = []; }
        rows.push([f]);
      } else {
        pair.push(f);
        if (pair.length === 2) { rows.push([...pair]); pair = []; }
      }
    });
    if (pair.length) rows.push([...pair]);
    return rows;
  }, [config.fields]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto p-3 md:p-4"
      style={{ paddingTop: "max(1rem, env(safe-area-inset-top))" }}
      onClick={onClose}
    >
      <div className="w-full max-w-2xl my-4 md:my-6" onClick={(e) => e.stopPropagation()}>
        <motion.div
          initial={{ scale: 0.96, y: 8 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 8 }}
          transition={{ duration: 0.2 }}
          className="w-full rounded-2xl border border-white/10 overflow-hidden"
          style={{
            background: "linear-gradient(160deg,rgba(13,17,23,0.99),rgba(14,18,28,0.99))",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 32px 80px rgba(0,0,0,0.8)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-white/10">
            <div className="min-w-0 flex-1 mr-2">
              <h3 className="text-sm md:text-base font-bold text-white truncate">
                {record?.id ? "Edit" : "Add New"} — {config.label}
              </h3>
              <p className="text-xs text-white/30 mt-0.5 font-mono truncate">{config.table}</p>
            </div>
            <button onClick={onClose} 
              className="p-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0 touch-manipulation">
              <X className="w-4 h-4 text-white/50" />
            </button>
          </div>

          {/* Fields */}
          <div className="px-4 md:px-6 py-4 md:py-5 space-y-3 md:space-y-4 max-h-[70vh] overflow-y-auto">
            {buildRows.map((row, ri) => (
              <div key={ri} className={`grid gap-3 md:gap-4 ${row.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
                {row.map((f) => (
                  <div key={f.key}>
                    <label className="block text-xs font-semibold text-white/40 mb-1.5 uppercase tracking-wider">
                      {f.label}{f.required && <span className="text-rose-400 ml-1">*</span>}
                    </label>
                    <FormField field={f} value={form[f.key]} onChange={(v) => setField(f.key, v)} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 border-t border-white/10">
            <button onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all touch-manipulation">
              Cancel
            </button>
            <button onClick={handleSave} disabled={saving}
              className="flex items-center gap-2 px-4 md:px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 disabled:opacity-50 transition-all touch-manipulation active:scale-95">
              {saving ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving…</>
              ) : (
                <><Save className="w-4 h-4" />Save</>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── DeleteConfirm ────────────────────────────────────────────────────────────

function DeleteConfirm({ label, onConfirm, onCancel }: {
  label: string; onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl border border-white/10 p-6 md:p-8 text-center"
        style={{ background: "rgba(13,17,23,0.99)", boxShadow: "0 25px 60px rgba(0,0,0,0.8)" }}>
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-6 h-6 md:w-7 md:h-7 text-rose-400" />
        </div>
        <h3 className="text-base md:text-lg font-bold text-white mb-2">Delete Record?</h3>
        <p className="text-white/50 text-sm mb-5 md:mb-6">
          <span className="text-white font-medium">&ldquo;{label}&rdquo;</span> will be permanently deleted.
        </p>
        <div className="flex gap-2 md:gap-3">
          <button onClick={onCancel} 
            className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white text-sm transition-colors touch-manipulation active:scale-95">
            Cancel
          </button>
          <button onClick={onConfirm} 
            className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-semibold text-sm transition-colors touch-manipulation active:scale-95">
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── CrudTable ────────────────────────────────────────────────────────────────

function CrudTable({ config, addToast }: {
  config: TableConfig; addToast: (msg: string, type?: Toast["type"]) => void;
}) {
  const [records, setRecords]   = useState<AnyRecord[]>([]);
  const [loading, setLoading]   = useState(true);
  const [editing, setEditing]   = useState<AnyRecord | null | "new">(null);
  const [deleting, setDeleting] = useState<AnyRecord | null>(null);
  const [search,   setSearch]   = useState("");

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      let q = supabase.from(config.table).select("*");
      if (config.orderBy) {
        q = q.order(config.orderBy, { ascending: config.orderBy !== "created_at" });
      }
      const { data, error } = await q;
      if (error) throw error;
      setRecords(data || []);
    } catch { setRecords([]); }
    finally { setLoading(false); }
  }, [config.table, config.orderBy]);

  useEffect(() => { fetchRecords(); }, [fetchRecords]);

  const serializeArrays = useCallback((form: AnyRecord): AnyRecord => {
    const keys = ARRAY_FIELDS[config.table] || [];
    if (!keys.length) return form;
    const out = { ...form };
    keys.forEach((k) => {
      if (typeof out[k] === "string") {
        out[k] = out[k].split("\n").map((s: string) => s.trim()).filter(Boolean);
      }
    });
    return out;
  }, [config.table]);

  const handleSave = async (form: AnyRecord) => {
    try {
      const payload = serializeArrays(form);
      if (payload.id) {
        const { error } = await supabase.from(config.table).update(payload).eq("id", payload.id);
        if (error) throw error;
        addToast("Updated successfully!");
      } else {
        const { error } = await supabase.from(config.table).insert([payload]);
        if (error) throw error;
        addToast("Created successfully!");
      }
      setEditing(null);
      fetchRecords();
    } catch (err: any) { addToast(err.message || "Failed to save", "error"); }
  };

  const handleDelete = async (rec: AnyRecord) => {
    try {
      const { error } = await supabase.from(config.table).delete().eq("id", rec.id);
      if (error) throw error;
      addToast("Deleted.");
      setDeleting(null);
      fetchRecords();
    } catch (err: any) { addToast(err.message || "Failed to delete", "error"); }
  };

  const filtered = useMemo(() => records.filter((r) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      String(r[config.displayField] || "").toLowerCase().includes(q) ||
      String(r[config.secondaryField || ""] || "").toLowerCase().includes(q)
    );
  }), [records, search, config.displayField, config.secondaryField]);

  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 md:gap-3 px-4 md:px-5 py-3 md:py-3.5 border-b border-white/10">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-semibold text-white text-sm">{config.label}</h3>
          <span className="px-1.5 md:px-2 py-0.5 rounded-full bg-white/5 text-white/40 text-xs">{records.length}</span>
          {config.readOnly && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs">View only</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-white/30 pointer-events-none" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search…"
              className="pl-7 pr-2 md:pr-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-emerald-500/40 w-24 md:w-32 placeholder:text-white/25 touch-manipulation" />
          </div>
          <button onClick={fetchRecords} 
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors touch-manipulation active:scale-95" 
            title="Refresh">
            <RefreshCw className="w-3.5 h-3.5 text-white/50" />
          </button>
          {!config.readOnly && (
            <button onClick={() => setEditing("new")}
              className="flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-colors touch-manipulation active:scale-95">
              <Plus className="w-3 h-3" />
              <span className="hidden sm:inline">Add</span>
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      {loading ? (
        <div className="flex items-center justify-center py-10">
          <div className="w-6 h-6 md:w-7 md:h-7 rounded-full border-2 border-white/10 border-t-emerald-400 animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center py-10 text-white/30 text-xs md:text-sm px-4">
          {search ? "No matching records" : "No records yet. Click Add to create one."}
        </p>
      ) : (
        <div className="divide-y divide-white/5">
          {filtered.map((record) => (
            <div key={record.id}
              className="flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2.5 md:py-3 hover:bg-white/[0.03] transition-colors group">
              <div className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <Database className="w-2.5 h-2.5 md:w-3 md:h-3 text-white/30" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm font-medium text-white truncate">{String(record[config.displayField] || "Untitled")}</p>
                {config.secondaryField && (
                  <p className="text-xs text-white/40 truncate mt-0.5">{String(record[config.secondaryField] || "")}</p>
                )}
              </div>
              {record.color && (
                <span className={`hidden sm:inline px-2 py-0.5 rounded-full text-xs bg-${record.color}-500/10 text-${record.color}-400 border border-${record.color}-500/20`}>
                  {record.color}
                </span>
              )}
              {record.status && (
                <span className={`hidden sm:inline px-2 py-0.5 rounded-full text-xs border ${
                  record.status === "new"         ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                  record.status === "in_progress" ? "bg-amber-500/10 text-amber-400 border-amber-500/20"     :
                                                    "bg-white/5 text-white/40 border-white/10"
                }`}>{record.status}</span>
              )}
              {record.is_featured && (
                <span className="hidden sm:inline px-2 py-0.5 rounded-full text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20">Featured</span>
              )}
              <div className="flex items-center gap-0.5 md:gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setEditing(record)}
                  className="p-1.5 rounded-lg hover:bg-blue-500/10 text-white/40 hover:text-blue-400 transition-all touch-manipulation active:scale-90">
                  <Edit2 className="w-3 h-3 md:w-3.5 md:h-3.5" />
                </button>
                <button onClick={() => setDeleting(record)}
                  className="p-1.5 rounded-lg hover:bg-rose-500/10 text-white/40 hover:text-rose-400 transition-all touch-manipulation active:scale-90">
                  <Trash2 className="w-3 h-3 md:w-3.5 md:h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {editing !== null && (
          <CrudModal config={config} record={editing === "new" ? null : editing}
            onClose={() => setEditing(null)} onSave={handleSave} />
        )}
        {deleting && (
          <DeleteConfirm label={String(deleting[config.displayField] || "this record")}
            onConfirm={() => handleDelete(deleting)} onCancel={() => setDeleting(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ setSection }: { setSection: (s: Section) => void }) {
  const [stats, setStats]   = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const tables = [
      "case_studies","testimonials","pricing_plans","services",
      "service_categories","contact_submissions","team_members","about_values",
    ];
    Promise.all(tables.map(async (t) => {
      try {
        const { count } = await supabase.from(t).select("*", { count: "exact", head: true });
        return [t, count || 0] as [string, number];
      } catch { return [t, 0] as [string, number]; }
    })).then((r) => { setStats(Object.fromEntries(r)); setLoading(false); });
  }, []);

  const cards = useMemo(() => [
    { label: "Case Studies",       value: stats.case_studies,        color: "violet",  icon: BookOpen,   section: "casestudies" as Section },
    { label: "Testimonials",       value: stats.testimonials,        color: "amber",   icon: Star,       section: "feedback"    as Section },
    { label: "Pricing Plans",      value: stats.pricing_plans,       color: "rose",    icon: DollarSign, section: "pricing"     as Section },
    { label: "Services",           value: stats.services,            color: "cyan",    icon: Briefcase,  section: "services"    as Section },
    { label: "Service Categories", value: stats.service_categories,  color: "teal",    icon: Layers,     section: "services"    as Section },
    { label: "Form Submissions",   value: stats.contact_submissions, color: "pink",    icon: Mail,       section: "contact"     as Section },
    { label: "Team Members",       value: stats.team_members,        color: "blue",    icon: Users,      section: "about"       as Section },
    { label: "Core Values",        value: stats.about_values,        color: "emerald", icon: Target,     section: "about"       as Section },
  ], [stats]);

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h2 className="text-lg md:text-xl font-bold text-white mb-1">Dashboard Overview</h2>
        <p className="text-white/40 text-xs md:text-sm">All content at a glance</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {cards.map((card, i) => (
          <motion.button key={card.label}
            initial={!prefersReducedMotion ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSection(card.section)}
            whileHover={!prefersReducedMotion ? { y: -4 } : {}}
            whileTap={{ scale: 0.95 }}
            className="text-left rounded-2xl border border-white/10 p-4 md:p-5 hover:border-white/20 transition-all group touch-manipulation"
            style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl bg-${card.color}-500/10 border border-${card.color}-500/20 flex items-center justify-center mb-3 md:mb-4`}>
              <card.icon className={`w-4 h-4 md:w-5 md:h-5 text-${card.color}-400`} />
            </div>
            {loading
              ? <div className="h-6 md:h-7 w-10 md:w-12 rounded bg-white/5 mb-1 animate-pulse" />
              : <div className={`text-xl md:text-2xl font-bold text-${card.color}-400 mb-1`}>{card.value ?? "—"}</div>
            }
            <div className="text-xs text-white/50 group-hover:text-white/70 transition-colors line-clamp-1">{card.label}</div>
          </motion.button>
        ))}
      </div>

      <div>
        <h3 className="text-xs md:text-sm font-semibold text-white/40 uppercase tracking-wider mb-3 md:mb-4">Quick Access</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
          {SECTION_NAV.filter((s) => s.id !== "dashboard" && s.id !== "settings" && s.id !== "users").map((nav) => (
            <button key={nav.id} onClick={() => setSection(nav.id)}
              className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-xl border border-white/10 hover:border-white/20 text-white/60 hover:text-white transition-all text-xs md:text-sm touch-manipulation active:scale-95"
              style={{ background: "rgba(255,255,255,0.02)" }}>
              <nav.icon className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
              <span className="truncate">{nav.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── User Management ──────────────────────────────────────────────────────────

function UserManagement({ addToast }: { addToast: (msg: string, type?: Toast["type"]) => void }) {
  const [users, setUsers]     = useState<AnyRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try { const { data } = await supabase.from("profiles").select("*").order("created_at"); setUsers(data || []); }
    catch { setUsers([]); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const updateRole = async (id: string, role: string) => {
    try {
      const { error } = await supabase.from("profiles").update({ role }).eq("id", id);
      if (error) throw error;
      addToast(`Role updated to ${role}`);
      fetchUsers();
    } catch (err: any) { addToast(err.message || "Failed to update role", "error"); }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-white mb-1">User Management</h2>
          <p className="text-white/40 text-xs md:text-sm">Manage roles and access</p>
        </div>
        <button onClick={fetchUsers} 
          className="p-2 rounded-lg hover:bg-white/10 transition-colors touch-manipulation active:scale-95">
          <RefreshCw className="w-4 h-4 text-white/50" />
        </button>
      </div>
      <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="px-4 md:px-5 py-3 md:py-3.5 border-b border-white/10 flex items-center justify-between">
          <span className="text-sm font-semibold text-white">All Users</span>
          <span className="text-xs text-white/30">{users.length} total</span>
        </div>
        {loading
          ? <div className="flex items-center justify-center py-12"><div className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-white/10 border-t-emerald-400 animate-spin" /></div>
          : users.length === 0
            ? <p className="text-center py-12 text-white/30 text-xs md:text-sm">No users found</p>
            : (
              <div className="divide-y divide-white/5">
                {users.map((u) => (
                  <div key={u.id} className="flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-3.5">
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center text-xs md:text-sm font-bold text-white/60 flex-shrink-0">
                      {String(u.email || "?")[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs md:text-sm text-white font-medium truncate">{u.email || u.id}</p>
                      <p className="text-xs text-white/30 truncate">{u.id?.slice(0, 16)}…</p>
                    </div>
                    <select value={u.role || "user"} onChange={(e) => updateRole(u.id, e.target.value)}
                      className="px-2 md:px-3 py-1.5 rounded-lg text-xs border border-white/10 text-white outline-none cursor-pointer touch-manipulation"
                      style={{ background: "#0d1117" }}>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                    </select>
                  </div>
                ))}
              </div>
            )
        }
      </div>
    </div>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────

function SettingsPanel({ addToast }: { addToast: (msg: string, type?: Toast["type"]) => void }) {
  const [siteName, setSiteName]   = useState("Remarketix");
  const [siteDesc, setSiteDesc]   = useState("");
  const [maint, setMaint]         = useState(false);
  const [saving, setSaving]       = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    addToast("Settings saved!");
    setSaving(false);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-lg md:text-xl font-bold text-white mb-1">Site Settings</h2>
        <p className="text-white/40 text-xs md:text-sm">Global configuration</p>
      </div>
      <div className="rounded-2xl border border-white/10 p-5 md:p-6 space-y-4 md:space-y-5" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div>
          <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Site Name</label>
          <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)}
            className="w-full px-3 md:px-4 py-2 md:py-2.5 text-sm rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-emerald-500/50 transition-all touch-manipulation" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Site Description</label>
          <textarea rows={3} value={siteDesc} onChange={(e) => setSiteDesc(e.target.value)}
            className="w-full px-3 md:px-4 py-2 md:py-2.5 text-sm rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-emerald-500/50 resize-none transition-all touch-manipulation" />
        </div>
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm text-white font-medium">Maintenance Mode</p>
            <p className="text-xs text-white/40">Show maintenance page to visitors</p>
          </div>
          <button onClick={() => setMaint((v) => !v)}
            className={`relative w-10 h-6 rounded-full transition-colors duration-200 touch-manipulation ${maint ? "bg-rose-500" : "bg-white/10"}`}>
            <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${maint ? "translate-x-4" : "translate-x-0"}`} />
          </button>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-5 md:px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 disabled:opacity-50 transition-all touch-manipulation active:scale-95">
          {saving
            ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving…</>
            : <><Save className="w-4 h-4" />Save Settings</>}
        </button>
      </div>
    </div>
  );
}

// ─── Section Content ──────────────────────────────────────────────────────────

function SectionContent({ section, setSection, addToast }: {
  section: Section; setSection: (s: Section) => void;
  addToast: (msg: string, type?: Toast["type"]) => void;
}) {
  if (section === "dashboard") return <Dashboard setSection={setSection} />;
  if (section === "users")     return <UserManagement addToast={addToast} />;
  if (section === "settings")  return <SettingsPanel addToast={addToast} />;

  const tables = SECTION_CONFIGS[section] || [];
  const nav    = SECTION_NAV.find((n) => n.id === section);
  const Icon   = nav?.icon || LayoutDashboard;

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex items-center gap-2 md:gap-3">
        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl bg-${nav?.color || "emerald"}-500/10 border border-${nav?.color || "emerald"}-500/20 flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-4 h-4 md:w-5 md:h-5 text-${nav?.color || "emerald"}-400`} />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg md:text-xl font-bold text-white truncate">{nav?.label}</h2>
          <p className="text-white/40 text-xs md:text-sm truncate">Manage all {nav?.label?.toLowerCase()} content</p>
        </div>
      </div>

      {tables.length === 0 ? (
        <div className="text-center py-16 md:py-20 rounded-2xl border border-white/10 space-y-3 px-4"
          style={{ background: "rgba(255,255,255,0.02)" }}>
          <Database className="w-8 h-8 md:w-10 md:h-10 mx-auto text-white/15" />
          <p className="text-white/50 font-semibold text-sm md:text-base">No database tables configured yet</p>
          <p className="text-white/30 text-xs md:text-sm max-w-sm mx-auto leading-relaxed">
            This section&apos;s content is currently hardcoded in the view file. Create the corresponding
            Supabase tables and add their configs to{" "}
            <code className="text-emerald-500/70 bg-emerald-500/10 px-1.5 py-0.5 rounded text-xs">SECTION_CONFIGS</code>{" "}
            in <code className="text-emerald-500/70 bg-emerald-500/10 px-1.5 py-0.5 rounded text-xs">AdminPanel.tsx</code>.
          </p>
        </div>
      ) : (
        tables.map((config) => <CrudTable key={config.table} config={config} addToast={addToast} />)
      )}
    </div>
  );
}

// ─── Main AdminPanel ──────────────────────────────────────────────────────────

export default function AdminPanel() {
  const { setView, setUser, setUserRole, user, userRole } = useAppStore();
  const [section, setSection]       = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toasts, addToast }        = useToasts();
  const prefersReducedMotion = useReducedMotion();

  // Close sidebar on section change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [section]);

  if (userRole !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <Shield className="w-10 h-10 md:w-12 md:h-12 text-rose-400 mx-auto mb-4" />
          <h2 className="text-lg md:text-xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-white/50 text-sm mb-6">You don&apos;t have admin privileges.</p>
          <button onClick={() => setView("home")}
            className="px-5 md:px-6 py-2.5 md:py-3 text-sm rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-colors touch-manipulation active:scale-95">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null); setUserRole(null); setView("home");
  };

  const activeNav = SECTION_NAV.find((n) => n.id === section);

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg-primary, #080c14)" }}>

      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 z-30 md:hidden" 
            onClick={() => setSidebarOpen(false)} />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 md:w-60 z-40 flex flex-col border-r border-white/10 transition-transform duration-300 md:static md:translate-x-0 md:z-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "linear-gradient(180deg,rgba(13,17,23,0.99),rgba(10,14,20,0.99))", boxShadow: "4px 0 24px rgba(0,0,0,0.4)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 md:px-5 py-3.5 md:py-4 border-b border-white/10 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-white truncate">Admin Panel</p>
            <p className="text-xs text-white/30 truncate">Remarketix</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-2 md:py-3 px-2 space-y-0.5 scrollbar-thin">
          {SECTION_NAV.map((nav) => {
            const Icon   = nav.icon;
            const active = section === nav.id;
            return (
              <button key={nav.id}
                onClick={() => setSection(nav.id)}
                className={`w-full flex items-center gap-2.5 md:gap-3 px-3 py-2 rounded-xl text-sm transition-all border touch-manipulation active:scale-95 ${
                  active
                    ? `bg-${nav.color}-500/10 border-${nav.color}-500/20 text-${nav.color}-400`
                    : "border-transparent text-white/50 hover:text-white hover:bg-white/5"
                }`}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium truncate flex-1 text-left">{nav.label}</span>
                {active && <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />}
              </button>
            );
          })}
        </nav>

        {/* User */}
        <div className="px-2 pb-3 md:pb-4 pt-2 border-t border-white/10 space-y-2 flex-shrink-0">
          <div className="flex items-center gap-2.5 md:gap-3 px-3 py-2 rounded-xl bg-white/[0.03]">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500/30 to-blue-500/30 border border-white/10 flex items-center justify-center text-xs font-bold text-emerald-400 flex-shrink-0">
              {user?.email?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{user?.email || "Admin"}</p>
              <p className="text-xs text-emerald-400 truncate">Administrator</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setView("home")}
              className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl text-xs text-white/50 hover:text-white hover:bg-white/5 transition-all touch-manipulation active:scale-95">
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Site</span>
            </button>
            <button onClick={handleSignOut}
              className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl text-xs text-rose-400/70 hover:text-rose-400 hover:bg-rose-500/10 transition-all touch-manipulation active:scale-95">
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex items-center gap-2 md:gap-3 px-4 md:px-5 py-3 md:py-3.5 border-b border-white/10 flex-shrink-0"
          style={{ background: "rgba(8,12,20,0.95)", backdropFilter: "blur(12px)" }}>
          <button onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors md:hidden flex-shrink-0 touch-manipulation active:scale-95">
            <Menu className="w-5 h-5 text-white/60" />
          </button>
          <div className="flex items-center gap-2 text-xs md:text-sm min-w-0 flex-1">
            <span className="text-white/30 flex-shrink-0">Admin</span>
            <ChevronRight className="w-3 h-3 md:w-3.5 md:h-3.5 text-white/20 flex-shrink-0" />
            <span className="text-white font-medium truncate">{activeNav?.label || "Dashboard"}</span>
          </div>
          <div className="flex-shrink-0">
            <div className="flex items-center gap-1.5 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400 font-medium">Live</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 md:p-5 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={section}
              initial={!prefersReducedMotion ? { opacity: 0, y: 10 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={!prefersReducedMotion ? { opacity: 0, y: -10 } : {}}
              transition={{ duration: 0.18 }}>
              <SectionContent section={section} setSection={setSection} addToast={addToast} />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Toasts */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-[calc(100vw-2rem)] md:max-w-sm">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div key={t.id}
              initial={{ opacity: 0, y: 16, scale: 0.9 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className={`flex items-center gap-2.5 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl border text-xs md:text-sm font-medium pointer-events-auto shadow-xl ${
                t.type === "error" ? "border-rose-500/20 text-rose-400 bg-rose-500/10"    :
                t.type === "info"  ? "border-blue-500/20 text-blue-400 bg-blue-500/10"   :
                                     "border-emerald-500/20 text-emerald-400 bg-emerald-500/10"
              }`}
              style={{ background: t.type === "error" ? "rgba(244,63,94,0.1)" : t.type === "info" ? "rgba(59,130,246,0.1)" : "rgba(16,185,129,0.1)" }}>
              {t.type === "error" ? <AlertCircle className="w-4 h-4 flex-shrink-0" /> : <CheckCircle className="w-4 h-4 flex-shrink-0" />}
              <span className="flex-1 break-words">{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}