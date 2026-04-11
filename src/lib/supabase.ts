import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          role: 'user' | 'admin';
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          role?: 'user' | 'admin';
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: 'user' | 'admin';
          created_at?: string;
        };
      };
      lead_projects: {
        Row: {
          id: string;
          title: string;
          image: string;
          desc: string;
          focus: string;
          stats: string;
          color: string;
          order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          image: string;
          desc: string;
          focus: string;
          stats: string;
          color: string;
          order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          image?: string;
          desc?: string;
          focus?: string;
          stats?: string;
          color?: string;
          order?: number;
          created_at?: string;
        };
      };
      smm_projects: {
        Row: {
          id: string;
          title: string;
          image: string;
          stat: string;
          label: string;
          color: string;
          gradient: string;
          order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          image: string;
          stat: string;
          label: string;
          color: string;
          gradient: string;
          order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          image?: string;
          stat?: string;
          label?: string;
          color?: string;
          gradient?: string;
          order?: number;
          created_at?: string;
        };
      };
    };
  };
};