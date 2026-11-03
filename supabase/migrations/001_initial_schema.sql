-- ============================================================
-- SWARNA BHOOMI RESIDENTIAL TOWNSHIP — INITIAL DATABASE SCHEMA
-- PostgreSQL & Supabase Migration
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUMS & DOMAINS
DO $$ BEGIN
    CREATE TYPE plot_facing AS ENUM ('North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE plot_availability_status AS ENUM ('Available', 'Reserved', 'Sold');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'manager', 'viewer');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    descriptor TEXT NOT NULL DEFAULT 'Premium Residential Plots',
    tagline TEXT DEFAULT 'Discover a Place Where Life Finds Its Finest Destination',
    description TEXT,
    location TEXT NOT NULL,
    village TEXT NOT NULL DEFAULT 'Krishnapuram',
    taluk TEXT NOT NULL DEFAULT 'Thiruvallur',
    state TEXT NOT NULL DEFAULT 'Tamil Nadu',
    corridor TEXT NOT NULL DEFAULT 'Chennai–Tirupati National Highway (NH 716)',
    contact_phone TEXT NOT NULL DEFAULT '+91 7339652776',
    whatsapp_number TEXT NOT NULL DEFAULT '917339652776',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. PHASES TABLE
CREATE TABLE IF NOT EXISTS phases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    phase_name TEXT NOT NULL,
    phase_number INTEGER NOT NULL,
    layout_image_path TEXT,
    total_plots INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_project_phase UNIQUE (project_id, phase_number)
);

-- 4. PLOTS TABLE
CREATE TABLE IF NOT EXISTS plots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    phase_id UUID NOT NULL REFERENCES phases(id) ON DELETE CASCADE,
    plot_number TEXT NOT NULL,
    area_sqft NUMERIC(8, 2) NOT NULL CHECK (area_sqft > 0),
    facing plot_facing,
    width_feet NUMERIC(6, 2) CHECK (width_feet IS NULL OR width_feet > 0),
    length_feet NUMERIC(6, 2) CHECK (length_feet IS NULL OR length_feet > 0),
    availability plot_availability_status NOT NULL DEFAULT 'Available',
    -- Layout simulator coordinates & dimensions (in SVG coordinate space)
    layout_x NUMERIC(8, 2),
    layout_y NUMERIC(8, 2),
    layout_width NUMERIC(8, 2),
    layout_height NUMERIC(8, 2),
    layout_rotation NUMERIC(5, 2) DEFAULT 0,
    is_corner BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    -- Enforce uniqueness of plot number within a specific phase
    CONSTRAINT unique_phase_plot_number UNIQUE (phase_id, plot_number)
);

-- Performance Indexes for Plot Queries
CREATE INDEX IF NOT EXISTS idx_plots_area ON plots(area_sqft);
CREATE INDEX IF NOT EXISTS idx_plots_availability ON plots(availability);
CREATE INDEX IF NOT EXISTS idx_plots_facing ON plots(facing);
CREATE INDEX IF NOT EXISTS idx_plots_phase_id ON plots(phase_id);
CREATE INDEX IF NOT EXISTS idx_plots_search_composite ON plots(phase_id, availability, area_sqft);

-- 5. ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plot_id UUID REFERENCES plots(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    preferred_plot_size TEXT,
    enquiry_type TEXT NOT NULL DEFAULT 'price_and_availability',
    message TEXT,
    source TEXT NOT NULL DEFAULT 'web_form',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries(created_at DESC);

-- 6. PROFILES TABLE (Supabase Auth Integration)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    role user_role NOT NULL DEFAULT 'viewer',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE plots ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Public can read projects, phases, and plots
CREATE POLICY "Public can view projects" ON projects
    FOR SELECT TO public USING (true);

CREATE POLICY "Public can view phases" ON phases
    FOR SELECT TO public USING (true);

CREATE POLICY "Public can view plots" ON plots
    FOR SELECT TO public USING (true);

-- Public can insert enquiries through validated lead actions
CREATE POLICY "Public can submit enquiries" ON enquiries
    FOR INSERT TO public WITH CHECK (true);

-- Only authenticated users with admin role in profiles can read enquiries
CREATE POLICY "Admins can view enquiries" ON enquiries
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

-- Admins have full access to manage plots
CREATE POLICY "Admins can insert plots" ON plots
    FOR INSERT TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Admins can update plots" ON plots
    FOR UPDATE TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Admins can delete plots" ON plots
    FOR DELETE TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

-- Profiles policy: users can read their own profile; admins can read all
CREATE POLICY "Users can read own profile" ON profiles
    FOR SELECT TO authenticated
    USING (id = auth.uid());

CREATE POLICY "Admins can manage profiles" ON profiles
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );
