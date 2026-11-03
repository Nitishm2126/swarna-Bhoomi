-- ============================================================
-- SWARNA BHOOMI RESIDENTIAL TOWNSHIP — SEED DATA
-- Verified project foundation and plot area statements
-- ============================================================

-- 1. Insert Project
INSERT INTO projects (
    id, name, slug, descriptor, tagline, description, location, village, taluk, district, state, corridor, contact_phone, whatsapp_number
) VALUES (
    'a1b2c3d4-e5f6-7890-1234-56789abcdef0',
    'Swarna Bhoomi',
    'swarna-bhoomi-krishnapuram',
    'Premium Residential Plots',
    'Discover a Place Where Life Finds Its Finest Destination',
    'Thoughtfully planned residential living at Krishnapuram, near Thiruvallur, along the Chennai–Tirupati National Highway corridor.',
    'Krishnapuram, Near Thiruvallur, Chennai–Tirupati National Highway',
    'Krishnapuram',
    'Thiruvallur',
    'Thiruvallur',
    'Tamil Nadu',
    'Chennai–Tirupati National Highway (NH 716)',
    '+91 7339652776',
    '917339652776'
) ON CONFLICT (slug) DO NOTHING;

-- 2. Insert Phases
INSERT INTO phases (id, project_id, phase_name, phase_number, total_plots) VALUES
('b1b2c3d4-e5f6-7890-1234-56789abcdef1', 'a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'Phase 1 — Royal Enclave', 1, 24),
('b1b2c3d4-e5f6-7890-1234-56789abcdef2', 'a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'Phase 2 — Golden Meadows', 2, 28),
('b1b2c3d4-e5f6-7890-1234-56789abcdef3', 'a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'Phase 3 — Emerald Greens', 3, 20)
ON CONFLICT (project_id, phase_number) DO NOTHING;

-- 3. Insert Plots with realistic coordinates for SVG layout simulator
-- Note: layout_x and layout_y match the interactive layout coordinate space (1000 x 600)
INSERT INTO plots (
    project_id, phase_id, plot_number, area_sqft, facing, width_feet, length_feet, availability, layout_x, layout_y, layout_width, layout_height, is_corner
) VALUES
-- Phase 1 (West Wing, near entrance road)
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef1', '1', 600, 'North', 20, 30, 'Sold', 120, 140, 50, 40, true),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef1', '2', 600, 'North', 20, 30, 'Available', 175, 140, 50, 40, false),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef1', '3', 700, 'North', 20, 35, 'Available', 230, 140, 50, 40, false),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef1', '4', 700, 'North', 20, 35, 'Reserved', 285, 140, 50, 40, false),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef1', '5', 800, 'North', 25, 32, 'Available', 340, 140, 55, 40, false),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef1', '6', 1000, 'North', 25, 40, 'Available', 400, 140, 60, 40, true),

('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef1', '7', 1000, 'South', 25, 40, 'Available', 120, 210, 50, 40, true),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef1', '8', 800, 'South', 25, 32, 'Available', 175, 210, 50, 40, false),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef1', '9', 700, 'South', 20, 35, 'Available', 230, 210, 50, 40, false),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef1', '10', 600, 'South', 20, 30, 'Sold', 285, 210, 50, 40, false),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef1', '11', 517, 'South', 18, 29, 'Available', 340, 210, 55, 40, false),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef1', '12', 650, 'South', 20, 32.5, 'Available', 400, 210, 60, 40, true),

-- Phase 2 (Central Township Avenue, includes Plot 42 requested in prompt)
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef2', '41', 650, 'East', 20, 32.5, 'Available', 500, 140, 50, 40, true),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef2', '42', 700, 'East', 20, 35, 'Available', 555, 140, 50, 40, false),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef2', '43', 700, 'East', 20, 35, 'Available', 610, 140, 50, 40, false),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef2', '44', 720, 'East', 20, 36, 'Available', 665, 140, 50, 40, false),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef2', '45', 750, 'East', 25, 30, 'Reserved', 720, 140, 50, 40, false),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef2', '46', 800, 'East', 20, 40, 'Available', 775, 140, 55, 40, false),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef2', '47', 900, 'East', 25, 36, 'Available', 835, 140, 55, 40, true),

('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef2', '48', 900, 'West', 25, 36, 'Available', 500, 210, 50, 40, true),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef2', '49', 800, 'West', 20, 40, 'Sold', 555, 210, 50, 40, false),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef2', '50', 700, 'West', 20, 35, 'Available', 610, 210, 50, 40, false),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef2', '51', 700, 'West', 20, 35, 'Available', 665, 210, 50, 40, false),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef2', '52', 680, 'West', 20, 34, 'Available', 720, 210, 50, 40, false),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef2', '53', 600, 'West', 20, 30, 'Available', 775, 210, 55, 40, false),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef2', '54', 600, 'West', 20, 30, 'Reserved', 835, 210, 55, 40, true),

-- Phase 3 (South Wing & Garden / Farmland Vista, includes Stone 85 discovered in audit)
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef3', '81', 1200, 'North', 30, 40, 'Available', 120, 380, 70, 50, true),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef3', '82', 1200, 'North', 30, 40, 'Available', 195, 380, 70, 50, false),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef3', '83', 1200, 'North', 30, 40, 'Sold', 270, 380, 70, 50, false),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef3', '84', 1500, 'North', 30, 50, 'Available', 345, 380, 85, 50, false),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef3', '85', 1600, 'North', 32, 50, 'Available', 435, 380, 90, 50, true),

('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef3', '86', 1500, 'South', 30, 50, 'Available', 560, 380, 85, 50, true),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef3', '87', 1200, 'South', 30, 40, 'Available', 650, 380, 70, 50, false),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef3', '88', 1000, 'South', 25, 40, 'Available', 725, 380, 65, 50, false),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef3', '89', 800, 'South', 20, 40, 'Reserved', 795, 380, 60, 50, false),
('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'b1b2c3d4-e5f6-7890-1234-56789abcdef3', '90', 800, 'South', 20, 40, 'Sold', 860, 380, 60, 50, true)
ON CONFLICT (phase_id, plot_number) DO NOTHING;
