"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useAppStore } from "@/store/appStore";
import {
  Plus, Edit2, Trash2, Save, X, LogOut, LayoutDashboard,
  BarChart3, Users, Image as ImageIcon, ArrowLeft, Home,
  Briefcase, FolderOpen, BookOpen, DollarSign, MessageSquare,
  Info, Mail, Settings, ChevronDown, ChevronRight, Eye,
  Shield, Database, TrendingUp, Star, Award, Search,
  RefreshCw, AlertCircle, CheckCircle, Bell, Menu, Globe,
  Layers, Package, FileText, Hash, Link, Phone, MapPin,
  Clock, Zap, Target, Palette, Upload, Filter, SortAsc,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Section =
  | "dashboard"
  | "home"
  | "services"
  | "projects"
  | "casestudies"
  | "pricing"
  | "feedback"
  | "about"
  | "contact"
  | "users"
  | "settings";

type Toast = { id: string; message: string; type: "success" | "error" | "info" };

// Generic record type
type AnyRecord = Record<string, any>;

// ─── Field Config for Dynamic Forms ──────────────────────────────────────────

type FieldType = "text" | "textarea" | "url" | "email" | "tel" | "number" | "select" | "color-select" | "array" | "boolean";

interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  span?: "full" | "half";
  rows?: number;
}

// ─── Table / Section Config ───────────────────────────────────────────────────

interface TableConfig {
  table: string;
  label: string;
  orderBy?: string;
  displayField: string;
  secondaryField?: string;
  fields: FieldConfig[];
}

const COLOR_OPTIONS = [
  { value: "emerald", label: "Emerald" },
  { value: "blue", label: "Blue" },
  { value: "violet", label: "Violet" },
  { value: "cyan", label: "Cyan" },
  { value: "rose", label: "Rose" },
  { value: "amber", label: "Amber" },
  { value: "pink", label: "Pink" },
  { value: "teal", label: "Teal" },
  { value: "orange", label: "Orange" },
  { value: "indigo", label: "Indigo" },
];

const GRADIENT_OPTIONS = [
  { value: "from-emerald-500 to-emerald-600", label: "Emerald" },
  { value: "from-blue-500 to-blue-600", label: "Blue" },
  { value: "from-violet-500 to-violet-600", label: "Violet" },
  { value: "from-cyan-500 to-cyan-600", label: "Cyan" },
  { value: "from-rose-500 to-rose-600", label: "Rose" },
  { value: "from-amber-500 to-amber-600", label: "Amber" },
  { value: "from-pink-500 to-pink-600", label: "Pink" },
  { value: "from-teal-500 to-teal-600", label: "Teal" },
];

// ─── Array field helper — stored as PostgreSQL TEXT[] ─────────────────────────
// We edit them as newline-separated strings and convert on save/load in CrudTable.
// Fields with type "array" are serialised as text for the textarea but converted
// to/from string[] before hitting Supabase.

const ARRAY_FIELDS: Record<string, string[]> = {
  case_studies: ["tags", "solution", "services_used"],
  services: ["features", "use_cases"],
  pricing_plans: ["features"],
};

const SECTION_CONFIGS: Record<string, TableConfig[]> = {
  // ── Home: no tables in the current schema; kept as future placeholders ─────
  home: [
    // The home page is currently hardcoded in HomeView.tsx.
    // Add tables here (e.g. home_hero, home_stats) once you create them in Supabase.
  ],

  // ── Services ──────────────────────────────────────────────────────────────
  services: [
    {
      // PK is TEXT (e.g. "data-lead-gen"), not UUID — handled specially below
      table: "service_categories",
      label: "Service Categories",
      displayField: "title",
      secondaryField: "subtitle",
      fields: [
        {
          key: "id",
          label: "ID (slug, e.g. data-lead-gen)",
          type: "text",
          required: true,
          placeholder: "data-lead-gen",
          span: "full",
        },
        { key: "title", label: "Title", type: "text", required: true, span: "full" },
        { key: "subtitle", label: "Subtitle", type: "textarea", rows: 2, span: "full" },
        { key: "color", label: "Color", type: "color-select", options: COLOR_OPTIONS },
      ],
    },
    {
      table: "services",
      label: "Individual Services",
      displayField: "title",
      secondaryField: "subtitle",
      fields: [
        { key: "title", label: "Title", type: "text", required: true, span: "full" },
        { key: "subtitle", label: "Subtitle", type: "text", span: "full" },
        {
          key: "category_id",
          label: "Category ID",
          type: "text",
          required: true,
          placeholder: "data-lead-gen",
        },
        { key: "color", label: "Color", type: "color-select", options: COLOR_OPTIONS },
        { key: "short_desc", label: "Short Description", type: "textarea", rows: 2, span: "full" },
        { key: "full_desc", label: "Full Description", type: "textarea", rows: 4, span: "full" },
        {
          key: "features",
          label: "Features (one per line)",
          type: "array",
          rows: 4,
          span: "full",
          placeholder: "B2B Lead Generation\nIndustry Prospecting",
        },
        {
          key: "use_cases",
          label: "Use Cases (one per line)",
          type: "array",
          rows: 3,
          span: "full",
          placeholder: "New market entry\nEnterprise prospecting",
        },
      ],
    },
  ],

  // ── Projects ──────────────────────────────────────────────────────────────
  projects: [
    {
      table: "lead_projects",
      label: "Lead Generation Projects",
      displayField: "title",
      orderBy: "order",
      fields: [
        { key: "title", label: "Project Title", type: "text", required: true, span: "full" },
        { key: "image", label: "Image URL", type: "url", span: "full" },
        { key: "desc", label: "Description", type: "textarea", rows: 3, span: "full" },
        { key: "focus", label: "Focus Area", type: "text", placeholder: "CMOs & Heads of Sales" },
        { key: "stats", label: "Stats", type: "text", placeholder: "2,400+ contacts" },
        { key: "color", label: "Color", type: "color-select", options: COLOR_OPTIONS },
        { key: "order", label: "Display Order", type: "number" },
      ],
    },
    {
      table: "smm_projects",
      label: "SMM Projects",
      displayField: "title",
      orderBy: "order",
      fields: [
        { key: "title", label: "Project Title", type: "text", required: true, span: "full" },
        { key: "image", label: "Image URL", type: "url", span: "full" },
        { key: "stat", label: "Stat Value", type: "text", placeholder: "210%" },
        { key: "label", label: "Stat Label", type: "text", placeholder: "Profile Views Increase" },
        { key: "color", label: "Color", type: "color-select", options: COLOR_OPTIONS },
        { key: "gradient", label: "Gradient", type: "select", options: GRADIENT_OPTIONS },
        { key: "order", label: "Display Order", type: "number" },
      ],
    },
  ],

  // ── Case Studies ──────────────────────────────────────────────────────────
  casestudies: [
    {
      table: "case_studies",
      label: "Case Studies",
      displayField: "title",
      secondaryField: "category",
      fields: [
        { key: "title", label: "Case Study Title", type: "text", required: true, span: "full" },
        { key: "category", label: "Category", type: "text", required: true, placeholder: "Lead Generation" },
        { key: "service", label: "Service", type: "text", placeholder: "Lead Generation and Outreach" },
        { key: "client_type", label: "Client Type", type: "text", required: true, placeholder: "Event Management Company" },
        { key: "image", label: "Image URL", type: "url", span: "full" },
        { key: "short_desc", label: "Short Description", type: "textarea", rows: 2, span: "full" },
        { key: "key_result", label: "Key Result", type: "text", required: true, placeholder: "3x increase in qualified leads", span: "full" },
        { key: "problem", label: "Problem Statement", type: "textarea", rows: 3, span: "full" },
        {
          key: "tags",
          label: "Tags (one per line)",
          type: "array",
          rows: 2,
          span: "full",
          placeholder: "Lead Generation\nOutreach",
        },
        {
          key: "solution",
          label: "Solution Steps (one per line)",
          type: "array",
          rows: 4,
          span: "full",
          placeholder: "Built targeted database\nSet up LinkedIn campaigns",
        },
        {
          key: "services_used",
          label: "Services Used (one per line)",
          type: "array",
          rows: 2,
          span: "full",
          placeholder: "Lead Generation\nLinkedIn Outreach",
        },
        { key: "color", label: "Color", type: "color-select", options: COLOR_OPTIONS },
      ],
    },
  ],

  // ── Pricing ───────────────────────────────────────────────────────────────
  pricing: [
    {
      table: "pricing_plans",
      label: "Pricing Plans",
      displayField: "name",
      secondaryField: "price",
      orderBy: "order",
      fields: [
        { key: "name", label: "Plan Name", type: "text", required: true },
        { key: "price", label: "Price", type: "text", required: true, placeholder: "$999/month" },
        { key: "description", label: "Description", type: "textarea", rows: 2, span: "full" },
        { key: "badge", label: "Badge Text", type: "text", placeholder: "Most Popular" },
        {
          key: "features",
          label: "Features (one per line)",
          type: "array",
          rows: 5,
          span: "full",
          placeholder: "Up to 2,000 leads/month\nAdvanced verification",
        },
        { key: "cta_text", label: "CTA Button Text", type: "text", placeholder: "Get Started" },
        { key: "color", label: "Color", type: "color-select", options: COLOR_OPTIONS },
        { key: "gradient", label: "Gradient", type: "select", options: GRADIENT_OPTIONS },
        { key: "is_featured", label: "Featured Plan", type: "boolean" },
        { key: "order", label: "Display Order", type: "number" },
      ],
    },
  ],

  // ── Feedback / Testimonials ───────────────────────────────────────────────
  feedback: [
    {
      table: "testimonials",
      label: "Testimonials",
      displayField: "author",
      secondaryField: "role",
      orderBy: "order",
      fields: [
        { key: "quote", label: "Quote", type: "textarea", rows: 3, required: true, span: "full" },
        { key: "author", label: "Author Name", type: "text", required: true },
        { key: "role", label: "Role / Title", type: "text", required: true },
        { key: "company", label: "Company", type: "text" },
        { key: "avatar", label: "Avatar URL", type: "url", span: "full" },
        { key: "rating", label: "Rating (1–5)", type: "number", placeholder: "5" },
        { key: "color", label: "Color", type: "color-select", options: COLOR_OPTIONS },
        { key: "order", label: "Display Order", type: "number" },
      ],
    },
  ],

  // ── About: no tables in the current schema ────────────────────────────────
  about: [
    // Add tables (e.g. team_members, about_values) once you create them in Supabase.
  ],

  // ── Contact ───────────────────────────────────────────────────────────────
  contact: [
    {
      table: "contact_submissions",
      label: "Contact Form Submissions",
      displayField: "first_name",
      secondaryField: "email",
      orderBy: "created_at",
      fields: [
        { key: "first_name", label: "First Name", type: "text" },
        { key: "last_name", label: "Last Name", type: "text" },
        { key: "email", label: "Email", type: "email", span: "full" },
        { key: "company", label: "Company / Website", type: "text" },
        { key: "message", label: "Message", type: "textarea", rows: 4, span: "full" },
        {
          key: "status",
          label: "Status",
          type: "select",
          options: [
            { value: "new", label: "New" },
            { value: "in_progress", label: "In Progress" },
            { value: "resolved", label: "Resolved" },
          ],
        },
      ],
    },
  ],
};

const SECTION_NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, color: "emerald" },
  { id: "home", label: "Home Page", icon: Home, color: "blue" },
  { id: "services", label: "Services", icon: Briefcase, color: "violet" },
  { id: "projects", label: "Projects", icon: FolderOpen, color: "cyan" },
  { id: "casestudies", label: "Case Studies", icon: BookOpen, color: "amber" },
  { id: "pricing", label: "Pricing", icon: DollarSign, color: "rose" },
  { id: "feedback", label: "Feedback", icon: MessageSquare, color: "pink" },
  { id: "about", label: "About", icon: Info, color: "teal" },
  { id: "contact", label: "Contact", icon: Mail, color: "orange" },
  { id: "users", label: "User Management", icon: Users, color: "indigo" },
  { id: "settings", label: "Settings", icon: Settings, color: "slate" },
];

// ─── Toast Hook ───────────────────────────────────────────────────────────────

function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  return { toasts, addToast };
}

// ─── Helper: Input Field ──────────────────────────────────────────────────────

function FormField({
  field,
  value,
  onChange,
}: {
  field: FieldConfig;
  value: any;
  onChange: (val: any) => void;
}) {
  const baseClass =
    "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-emerald-500/50 transition-all placeholder:text-white/30 text-sm";

  if (field.type === "textarea") {
    return (
      <textarea
        rows={field.rows || 3}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className={`${baseClass} resize-none`}
      />
    );
  }

  // Arrays (TEXT[] in Postgres) shown as newline-separated strings
  if (field.type === "array") {
    const displayValue = Array.isArray(value) ? value.join("\n") : (value || "");
    return (
      <textarea
        rows={field.rows || 3}
        value={displayValue}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className={`${baseClass} resize-none`}
      />
    );
  }

  if (field.type === "select" || field.type === "color-select") {
    return (
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className={baseClass}
        style={{ background: "#0d1117" }}
      >
        <option value="">Select…</option>
        {field.options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "boolean") {
    return (
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => onChange(!value)}
          className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
            value ? "bg-emerald-500" : "bg-white/10"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
              value ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
        <span className="text-white/60 text-sm">{value ? "Yes" : "No"}</span>
      </div>
    );
  }

  // At this point field.type is one of: "text" | "url" | "email" | "tel" | "number" | "array"
  // All are valid HTML input types except "array" — normalise that to "text".
  const inputType = (
    field.type === "text" ||
    field.type === "url" ||
    field.type === "email" ||
    field.type === "tel" ||
    field.type === "number"
  ) ? field.type : "text";

  return (
    <input
      type={inputType}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      className={baseClass}
    />
  );
}

// ─── CRUD Modal ───────────────────────────────────────────────────────────────

function CrudModal({
  config,
  record,
  onClose,
  onSave,
}: {
  config: TableConfig;
  record: AnyRecord | null; // null = new
  onClose: () => void;
  onSave: (data: AnyRecord) => Promise<void>;
}) {
  const [form, setForm] = useState<AnyRecord>(record || {});
  const [saving, setSaving] = useState(false);

  const setField = (key: string, val: any) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSave = async () => {
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0d1117]"
        style={{
          background: "linear-gradient(135deg,rgba(13,17,23,0.98),rgba(16,20,30,0.98))",
          boxShadow: "0 0 60px rgba(16,185,129,0.08), 0 0 120px rgba(0,0,0,0.6)",
        }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <h3 className="text-lg font-bold text-white">
              {record?.id ? "Edit" : "Add"} {config.label.replace(/s$/, "")}
            </h3>
            <p className="text-xs text-white/40 mt-0.5">{config.table}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Fields */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            {config.fields.map((field) => (
              <div
                key={field.key}
                className={field.span === "full" ? "col-span-2" : "col-span-1 max-sm:col-span-2"}
              >
                <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">
                  {field.label}
                  {field.required && <span className="text-rose-400 ml-1">*</span>}
                </label>
                <FormField
                  field={field}
                  value={form[field.key]}
                  onChange={(val) => setField(field.key, val)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all"
          >
            Cancel
          </button>
          <motion.button
            onClick={handleSave}
            disabled={saving}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 transition-all disabled:opacity-50"
          >
            {saving ? (
              <>
                <motion.div
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
                Saving…
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Delete Confirm ───────────────────────────────────────────────────────────

function DeleteConfirm({
  label,
  onConfirm,
  onCancel,
}: {
  label: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0d1117] p-8 text-center"
      >
        <div className="w-14 h-14 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-7 h-7 text-rose-400" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Delete Record?</h3>
        <p className="text-white/50 text-sm mb-6">
          <span className="text-white font-medium">&ldquo;{label}&rdquo;</span> will be permanently deleted.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white text-sm transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-semibold text-sm transition-colors">
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── CRUD Table ───────────────────────────────────────────────────────────────

function CrudTable({
  config,
  addToast,
}: {
  config: TableConfig;
  addToast: (msg: string, type?: Toast["type"]) => void;
}) {
  const [records, setRecords] = useState<AnyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<AnyRecord | null | "new">(null);
  const [deleting, setDeleting] = useState<AnyRecord | null>(null);
  const [search, setSearch] = useState("");

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase.from(config.table).select("*");
      if (config.orderBy) query = query.order(config.orderBy);
      const { data, error } = await query;
      if (error) throw error;
      setRecords(data || []);
    } catch (err: any) {
      // Table might not exist yet — show empty
      setRecords([]);
    } finally {
      setLoading(false);
    }
  }, [config.table, config.orderBy]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  // Convert newline-separated strings back to TEXT[] for array fields before saving
  const serializeArrayFields = (form: AnyRecord): AnyRecord => {
    const arrayKeys = ARRAY_FIELDS[config.table] || [];
    if (arrayKeys.length === 0) return form;
    const out = { ...form };
    for (const key of arrayKeys) {
      if (typeof out[key] === "string") {
        out[key] = out[key]
          .split("\n")
          .map((s: string) => s.trim())
          .filter(Boolean);
      }
    }
    return out;
  };

  const handleSave = async (form: AnyRecord) => {
    try {
      const payload = serializeArrayFields(form);
      if (payload.id) {
        const { error } = await supabase
          .from(config.table)
          .update(payload)
          .eq("id", payload.id);
        if (error) throw error;
        addToast("Record updated successfully!");
      } else {
        const { error } = await supabase.from(config.table).insert([payload]);
        if (error) throw error;
        addToast("Record created successfully!");
      }
      setEditing(null);
      fetchRecords();
    } catch (err: any) {
      addToast(err.message || "Failed to save record", "error");
    }
  };

  const handleDelete = async (record: AnyRecord) => {
    try {
      const { error } = await supabase.from(config.table).delete().eq("id", record.id);
      if (error) throw error;
      addToast("Record deleted.");
      setDeleting(null);
      fetchRecords();
    } catch (err: any) {
      addToast(err.message || "Failed to delete", "error");
    }
  };

  const filtered = records.filter((r) => {
    if (!search) return true;
    const display = String(r[config.displayField] || "").toLowerCase();
    const secondary = String(r[config.secondaryField || ""] || "").toLowerCase();
    return display.includes(search.toLowerCase()) || secondary.includes(search.toLowerCase());
  });

  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
      {/* Table Header */}
      <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-white text-sm">{config.label}</h3>
          <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/40 text-xs">
            {records.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
              className="pl-8 pr-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-emerald-500/40 w-36 placeholder:text-white/30"
            />
          </div>
          <button
            onClick={fetchRecords}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-3.5 h-3.5 text-white/50" />
          </button>
          <button
            onClick={() => setEditing("new")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>

      {/* Table Body */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <motion.div
            className="w-8 h-8 rounded-full border-2 border-white/10 border-t-emerald-400"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-white/30 text-sm">
          {search ? "No matching records" : "No records yet. Click Add to create one."}
        </div>
      ) : (
        <div className="divide-y divide-white/5">
          {filtered.map((record) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.03] transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <Database className="w-3.5 h-3.5 text-white/30" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {String(record[config.displayField] || "Untitled")}
                </p>
                {config.secondaryField && (
                  <p className="text-xs text-white/40 truncate mt-0.5">
                    {String(record[config.secondaryField] || "")}
                  </p>
                )}
              </div>
              {record.color && (
                <span className={`px-2 py-0.5 rounded-full text-xs bg-${record.color}-500/10 text-${record.color}-400 border border-${record.color}-500/20`}>
                  {record.color}
                </span>
              )}
              {record.order !== undefined && (
                <span className="text-xs text-white/20 tabular-nums">#{record.order}</span>
              )}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setEditing(record)}
                  className="p-2 rounded-lg hover:bg-blue-500/10 text-white/40 hover:text-blue-400 transition-all"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleting(record)}
                  className="p-2 rounded-lg hover:bg-rose-500/10 text-white/40 hover:text-rose-400 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {editing !== null && (
          <CrudModal
            config={config}
            record={editing === "new" ? null : editing}
            onClose={() => setEditing(null)}
            onSave={handleSave}
          />
        )}
        {deleting && (
          <DeleteConfirm
            label={String(deleting[config.displayField] || "this record")}
            onConfirm={() => handleDelete(deleting)}
            onCancel={() => setDeleting(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Dashboard Overview ───────────────────────────────────────────────────────

function Dashboard({ setSection }: { setSection: (s: Section) => void }) {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      // Only tables that exist in the current Supabase schema
      const tables = [
        "lead_projects", "smm_projects", "case_studies", "testimonials",
        "pricing_plans", "services", "service_categories", "contact_submissions",
      ];
      const results: Record<string, number> = {};
      await Promise.all(
        tables.map(async (t) => {
          try {
            const { count } = await supabase.from(t).select("*", { count: "exact", head: true });
            results[t] = count || 0;
          } catch {
            results[t] = 0;
          }
        })
      );
      setStats(results);
      setLoading(false);
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Lead Projects",      value: stats.lead_projects,       color: "emerald", icon: Target,    section: "projects"    as Section },
    { label: "SMM Projects",       value: stats.smm_projects,        color: "blue",    icon: TrendingUp, section: "projects"    as Section },
    { label: "Case Studies",       value: stats.case_studies,        color: "violet",  icon: BookOpen,  section: "casestudies" as Section },
    { label: "Testimonials",       value: stats.testimonials,        color: "amber",   icon: Star,      section: "feedback"    as Section },
    { label: "Pricing Plans",      value: stats.pricing_plans,       color: "rose",    icon: DollarSign, section: "pricing"    as Section },
    { label: "Services",           value: stats.services,            color: "cyan",    icon: Briefcase, section: "services"    as Section },
    { label: "Service Categories", value: stats.service_categories,  color: "teal",    icon: Layers,    section: "services"    as Section },
    { label: "Form Submissions",   value: stats.contact_submissions, color: "pink",    icon: Mail,      section: "contact"     as Section },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Dashboard Overview</h2>
        <p className="text-white/40 text-sm">All content at a glance</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <motion.button
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSection(card.section)}
            className="text-left rounded-2xl border border-white/10 p-5 hover:border-white/20 transition-all group"
            style={{ background: "rgba(255,255,255,0.02)" }}
            whileHover={{ y: -4 }}
          >
            <div className={`w-10 h-10 rounded-xl bg-${card.color}-500/10 border border-${card.color}-500/20 flex items-center justify-center mb-4`}>
              <card.icon className={`w-5 h-5 text-${card.color}-400`} />
            </div>
            {loading ? (
              <div className="h-7 w-12 rounded bg-white/5 mb-1" />
            ) : (
              <div className={`text-2xl font-bold text-${card.color}-400 mb-1`}>
                {card.value ?? "—"}
              </div>
            )}
            <div className="text-xs text-white/50 group-hover:text-white/70 transition-colors">{card.label}</div>
          </motion.button>
        ))}
      </div>

      {/* Quick Access */}
      <div>
        <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Quick Access</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {SECTION_NAV.filter((s) => s.id !== "dashboard" && s.id !== "settings").map((nav) => (
            <button
              key={nav.id}
              onClick={() => setSection(nav.id as Section)}
              className="flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-white/20 text-white/60 hover:text-white transition-all text-sm"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <nav.icon className="w-4 h-4" />
              {nav.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── User Management ──────────────────────────────────────────────────────────

function UserManagement({ addToast }: { addToast: (msg: string, type?: Toast["type"]) => void }) {
  const [users, setUsers] = useState<AnyRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("profiles").select("*").order("created_at");
      if (error) throw error;
      setUsers(data || []);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const updateRole = async (userId: string, role: string) => {
    try {
      const { error } = await supabase.from("profiles").update({ role }).eq("id", userId);
      if (error) throw error;
      addToast(`Role updated to ${role}`);
      fetchUsers();
    } catch (err: any) {
      addToast(err.message || "Failed to update role", "error");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">User Management</h2>
          <p className="text-white/40 text-sm">Manage roles and access</p>
        </div>
        <button onClick={fetchUsers} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
          <RefreshCw className="w-4 h-4 text-white/50" />
        </button>
      </div>

      <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between">
          <span className="text-sm font-semibold text-white">All Users</span>
          <span className="text-xs text-white/30">{users.length} total</span>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <motion.div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-emerald-400" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
          </div>
        ) : users.length === 0 ? (
          <p className="text-center py-12 text-white/30 text-sm">No users found in profiles table</p>
        ) : (
          <div className="divide-y divide-white/5">
            {users.map((u) => (
              <div key={u.id} className="flex items-center gap-4 px-5 py-3.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center text-sm font-bold text-white/60">
                  {String(u.email || u.id || "?")[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate">{u.email || u.id}</p>
                  <p className="text-xs text-white/30">{u.id?.slice(0, 16)}…</p>
                </div>
                <select
                  value={u.role || "user"}
                  onChange={(e) => updateRole(u.id, e.target.value)}
                  className="px-3 py-1.5 rounded-lg text-xs border border-white/10 text-white outline-none transition-colors"
                  style={{ background: "#0d1117" }}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Settings Panel ───────────────────────────────────────────────────────────

function SettingsPanel({ addToast }: { addToast: (msg: string, type?: Toast["type"]) => void }) {
  const [siteName, setSiteName] = useState("Remarketix");
  const [siteDescription, setSiteDescription] = useState("");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Simulate save — in real use, persist to a `site_settings` table
    await new Promise((r) => setTimeout(r, 800));
    addToast("Settings saved!");
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Site Settings</h2>
        <p className="text-white/40 text-sm">Global configuration</p>
      </div>

      <div className="rounded-2xl border border-white/10 p-6 space-y-5" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div>
          <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Site Name</label>
          <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-emerald-500/50 transition-all" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Site Description</label>
          <textarea rows={3} value={siteDescription} onChange={(e) => setSiteDescription(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-emerald-500/50 resize-none transition-all" />
        </div>
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm text-white font-medium">Maintenance Mode</p>
            <p className="text-xs text-white/40">Show maintenance page to visitors</p>
          </div>
          <button
            onClick={() => setMaintenanceMode((v) => !v)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${maintenanceMode ? "bg-rose-500" : "bg-white/10"}`}
          >
            <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${maintenanceMode ? "translate-x-6" : "translate-x-0"}`} />
          </button>
        </div>
        <motion.button
          onClick={handleSave}
          disabled={saving}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 transition-all disabled:opacity-50"
        >
          {saving ? (
            <>
              <motion.div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
              Saving…
            </>
          ) : (
            <><Save className="w-4 h-4" />Save Settings</>
          )}
        </motion.button>
      </div>
    </div>
  );
}

// ─── Section Content ──────────────────────────────────────────────────────────

function SectionContent({
  section,
  setSection,
  addToast,
}: {
  section: Section;
  setSection: (s: Section) => void;
  addToast: (msg: string, type?: Toast["type"]) => void;
}) {
  if (section === "dashboard") return <Dashboard setSection={setSection} />;
  if (section === "users") return <UserManagement addToast={addToast} />;
  if (section === "settings") return <SettingsPanel addToast={addToast} />;

  const tables = SECTION_CONFIGS[section];
  const noTables = !tables || tables.length === 0;
  if (noTables) return (
    <div className="text-center py-20 text-white/30">
      <Database className="w-10 h-10 mx-auto mb-4 opacity-30" />
      <p className="text-white/50 font-medium mb-2">No database tables configured yet</p>
      <p className="text-sm max-w-sm mx-auto">
        This section&apos;s content is currently hardcoded. Create the corresponding
        Supabase tables and add their configs to <code className="text-emerald-500/60">SECTION_CONFIGS</code> to manage them here.
      </p>
    </div>
  );

  const nav = SECTION_NAV.find((n) => n.id === section);
  const NavIcon = nav?.icon || LayoutDashboard;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl bg-${nav?.color || "emerald"}-500/10 border border-${nav?.color || "emerald"}-500/20 flex items-center justify-center`}>
          <NavIcon className={`w-5 h-5 text-${nav?.color || "emerald"}-400`} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{nav?.label}</h2>
          <p className="text-white/40 text-sm">Manage all {nav?.label.toLowerCase()} content</p>
        </div>
      </div>
      {tables.map((config) => (
        <CrudTable key={config.table} config={config} addToast={addToast} />
      ))}
    </div>
  );
}

// ─── Main Admin Panel ─────────────────────────────────────────────────────────

export default function AdminPanel() {
  const { setView, setUser, setUserRole, user, userRole } = useAppStore();
  const [section, setSection] = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toasts, addToast } = useToasts();

  // Guard: Only admin
  if (userRole !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-12 h-12 text-rose-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-white/50 mb-6">You don&apos;t have admin privileges.</p>
          <button onClick={() => setView("home")} className="px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-colors">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserRole(null);
    setView("home");
  };

  const activeNav = SECTION_NAV.find((n) => n.id === section);

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg-primary, #080c14)" }}>
      {/* ── Sidebar ── */}
      <AnimatePresence>
        {(sidebarOpen || true) && (
          <>
            {/* Mobile overlay */}
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-30 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            <motion.aside
              className={`fixed top-0 left-0 h-screen w-64 z-40 flex flex-col border-r border-white/10 transition-transform duration-300 md:translate-x-0 md:static md:z-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
              style={{
                background: "linear-gradient(180deg,rgba(13,17,23,0.98),rgba(10,14,20,0.98))",
                boxShadow: "4px 0 24px rgba(0,0,0,0.4)",
              }}
            >
              {/* Logo */}
              <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Admin Panel</p>
                  <p className="text-xs text-white/30">Remarketix</p>
                </div>
              </div>

              {/* Nav */}
              <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {SECTION_NAV.map((nav) => {
                  const Icon = nav.icon;
                  const active = section === nav.id;
                  return (
                    <button
                      key={nav.id}
                      onClick={() => { setSection(nav.id as Section); setSidebarOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                        active
                          ? `bg-${nav.color}-500/10 border border-${nav.color}-500/20 text-${nav.color}-400`
                          : "text-white/50 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="font-medium">{nav.label}</span>
                      {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
                    </button>
                  );
                })}
              </nav>

              {/* User & Sign Out */}
              <div className="px-3 pb-4 pt-2 border-t border-white/10 space-y-2">
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.03]">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500/30 to-blue-500/30 border border-white/10 flex items-center justify-center text-xs font-bold text-emerald-400">
                    {user?.email?.[0]?.toUpperCase() || "A"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white truncate">{user?.email || "Admin"}</p>
                    <p className="text-xs text-emerald-400">Administrator</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setView("home")}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs text-white/50 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <Home className="w-3.5 h-3.5" />
                    Site
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-400/70 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex items-center gap-4 px-6 py-4 border-b border-white/10"
          style={{ background: "rgba(8,12,20,0.95)", backdropFilter: "blur(12px)" }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors md:hidden"
          >
            <Menu className="w-5 h-5 text-white/60" />
          </button>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-white/30">Admin</span>
            <ChevronRight className="w-3.5 h-3.5 text-white/20" />
            <span className="text-white font-medium">{activeNav?.label || "Dashboard"}</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <motion.div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs text-emerald-400 font-medium">Live</span>
            </motion.div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <SectionContent section={section} setSection={setSection} addToast={addToast} />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* ── Toast Notifications ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.9 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium pointer-events-auto shadow-xl ${
                toast.type === "error"
                  ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                  : toast.type === "info"
                  ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                  : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              }`}
              style={{ background: "rgba(8,12,20,0.96)" }}
            >
              {toast.type === "error" ? (
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
              ) : (
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
              )}
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}