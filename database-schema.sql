-- Database Schema for Malawi Shades

-- ==========================================
-- LOCATION TABLES
-- ==========================================

-- Regions table
CREATE TABLE regions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Districts table
CREATE TABLE districts (
    id SERIAL PRIMARY KEY,
    region_id INTEGER NOT NULL REFERENCES regions(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- MEDIA TABLES
-- ==========================================

-- Media table for images, videos, etc.
CREATE TABLE media (
    id SERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) NOT NULL, -- image, video, document, etc.
    mime_type VARCHAR(100),
    size INTEGER, -- in bytes
    width INTEGER, -- for images
    height INTEGER, -- for images
    duration INTEGER, -- for videos/audio (in seconds)
    alt_text VARCHAR(255),
    title VARCHAR(255),
    description TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- ACCOMMODATION TABLES
-- ==========================================

-- Accommodation types
CREATE TABLE accommodation_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(100), -- Icon name or path
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Amenities table
CREATE TABLE amenities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(100), -- Icon name or path
    category VARCHAR(100), -- e.g., 'basic', 'luxury', 'outdoor', etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Accommodations table
CREATE TABLE accommodations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    type_id INTEGER NOT NULL REFERENCES accommodation_types(id),
    district_id INTEGER NOT NULL REFERENCES districts(id),
    address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    description TEXT,
    short_description VARCHAR(500),
    price_per_night DECIMAL(10, 2),
    currency VARCHAR(3) DEFAULT 'USD',
    max_guests INTEGER,
    bedrooms INTEGER,
    bathrooms INTEGER,
    size VARCHAR(50), -- e.g., '85 sq m'
    check_in_time TIME,
    check_out_time TIME,
    min_stay INTEGER DEFAULT 1, -- minimum nights
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Accommodation amenities (many-to-many)
CREATE TABLE accommodation_amenities (
    accommodation_id INTEGER NOT NULL REFERENCES accommodations(id) ON DELETE CASCADE,
    amenity_id INTEGER NOT NULL REFERENCES amenities(id) ON DELETE CASCADE,
    PRIMARY KEY (accommodation_id, amenity_id)
);

-- Accommodation media (many-to-many)
CREATE TABLE accommodation_media (
    accommodation_id INTEGER NOT NULL REFERENCES accommodations(id) ON DELETE CASCADE,
    media_id INTEGER NOT NULL REFERENCES media(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (accommodation_id, media_id)
);

-- Accommodation availability
CREATE TABLE accommodation_availability (
    id SERIAL PRIMARY KEY,
    accommodation_id INTEGER NOT NULL REFERENCES accommodations(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    price_override DECIMAL(10, 2), -- Special pricing for specific dates
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (accommodation_id, date)
);

-- ==========================================
-- TOURISM SITE TABLES
-- ==========================================

-- Tourism site categories
CREATE TABLE tourism_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(100), -- Icon name or path
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tourism sites
CREATE TABLE tourism_sites (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category_id INTEGER NOT NULL REFERENCES tourism_categories(id),
    district_id INTEGER NOT NULL REFERENCES districts(id),
    address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    description TEXT,
    short_description VARCHAR(500),
    duration VARCHAR(100), -- e.g., 'Full day', '2-3 hours'
    price DECIMAL(10, 2),
    currency VARCHAR(3) DEFAULT 'USD',
    opening_hours TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tourism site media (many-to-many)
CREATE TABLE tourism_site_media (
    tourism_site_id INTEGER NOT NULL REFERENCES tourism_sites(id) ON DELETE CASCADE,
    media_id INTEGER NOT NULL REFERENCES media(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (tourism_site_id, media_id)
);

-- ==========================================
-- EXPERIENCE TABLES
-- ==========================================

-- Experience categories
CREATE TABLE experience_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(100), -- Icon name or path
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Experiences
CREATE TABLE experiences (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category_id INTEGER NOT NULL REFERENCES experience_categories(id),
    district_id INTEGER NOT NULL REFERENCES districts(id),
    address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    description TEXT,
    short_description VARCHAR(500),
    duration VARCHAR(100), -- e.g., '2 hours', 'Half day'
    price DECIMAL(10, 2),
    currency VARCHAR(3) DEFAULT 'USD',
    max_participants INTEGER,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Experience media (many-to-many)
CREATE TABLE experience_media (
    experience_id INTEGER NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
    media_id INTEGER NOT NULL REFERENCES media(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (experience_id, media_id)
);

-- Experience availability
CREATE TABLE experience_availability (
    id SERIAL PRIMARY KEY,
    experience_id INTEGER NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    available_spots INTEGER NOT NULL,
    price_override DECIMAL(10, 2), -- Special pricing for specific dates
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- USER TABLES
-- ==========================================

-- User roles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(50),
    profile_image_id INTEGER REFERENCES media(id),
    role_id INTEGER NOT NULL REFERENCES roles(id),
    email_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User addresses
CREATE TABLE user_addresses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- BOOKING TABLES
-- ==========================================

-- Booking statuses
CREATE TABLE booking_statuses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Accommodation bookings
CREATE TABLE accommodation_bookings (
    id SERIAL PRIMARY KEY,
    booking_number VARCHAR(50) NOT NULL UNIQUE,
    user_id INTEGER NOT NULL REFERENCES users(id),
    accommodation_id INTEGER NOT NULL REFERENCES accommodations(id),
    status_id INTEGER NOT NULL REFERENCES booking_statuses(id),
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    guests INTEGER NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    special_requests TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tourism site bookings
CREATE TABLE tourism_site_bookings (
    id SERIAL PRIMARY KEY,
    booking_number VARCHAR(50) NOT NULL UNIQUE,
    user_id INTEGER NOT NULL REFERENCES users(id),
    tourism_site_id INTEGER NOT NULL REFERENCES tourism_sites(id),
    status_id INTEGER NOT NULL REFERENCES booking_statuses(id),
    visit_date DATE NOT NULL,
    participants INTEGER NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    special_requests TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Experience bookings
CREATE TABLE experience_bookings (
    id SERIAL PRIMARY KEY,
    booking_number VARCHAR(50) NOT NULL UNIQUE,
    user_id INTEGER NOT NULL REFERENCES users(id),
    experience_id INTEGER NOT NULL REFERENCES experiences(id),
    experience_availability_id INTEGER NOT NULL REFERENCES experience_availability(id),
    status_id INTEGER NOT NULL REFERENCES booking_statuses(id),
    participants INTEGER NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    special_requests TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- PAYMENT TABLES
-- ==========================================

-- Payment methods
CREATE TABLE payment_methods (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Payment statuses
CREATE TABLE payment_statuses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Payments
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    payment_number VARCHAR(50) NOT NULL UNIQUE,
    user_id INTEGER NOT NULL REFERENCES users(id),
    booking_type VARCHAR(50) NOT NULL, -- 'accommodation', 'tourism_site', 'experience'
    booking_id INTEGER NOT NULL, -- References the respective booking table
    payment_method_id INTEGER NOT NULL REFERENCES payment_methods(id),
    status_id INTEGER NOT NULL REFERENCES payment_statuses(id),
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    transaction_id VARCHAR(255), -- External payment processor transaction ID
    payment_date TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- REVIEW TABLES
-- ==========================================

-- Reviews
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    review_type VARCHAR(50) NOT NULL, -- 'accommodation', 'tourism_site', 'experience'
    item_id INTEGER NOT NULL, -- References the respective item table
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title VARCHAR(255),
    content TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Review media (many-to-many)
CREATE TABLE review_media (
    review_id INTEGER NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    media_id INTEGER NOT NULL REFERENCES media(id) ON DELETE CASCADE,
    PRIMARY KEY (review_id, media_id)
);

-- ==========================================
-- CONTENT MANAGEMENT TABLES
-- ==========================================

-- Page categories
CREATE TABLE page_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Pages
CREATE TABLE pages (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category_id INTEGER REFERENCES page_categories(id),
    content TEXT,
    meta_title VARCHAR(255),
    meta_description TEXT,
    featured_image_id INTEGER REFERENCES media(id),
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_by INTEGER NOT NULL REFERENCES users(id),
    updated_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Blog categories
CREATE TABLE blog_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Blog posts
CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    content TEXT,
    excerpt TEXT,
    featured_image_id INTEGER REFERENCES media(id),
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_by INTEGER NOT NULL REFERENCES users(id),
    updated_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Blog post categories (many-to-many)
CREATE TABLE blog_post_categories (
    blog_post_id INTEGER NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES blog_categories(id) ON DELETE CASCADE,
    PRIMARY KEY (blog_post_id, category_id)
);

-- ==========================================
-- ADVERTISING TABLES
-- ==========================================

-- Advertising packages
CREATE TABLE advertising_packages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    duration_days INTEGER NOT NULL, -- How long the ad runs
    max_listings INTEGER, -- Number of property listings allowed
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Advertising features (e.g., "Featured placement", "Advanced analytics")
CREATE TABLE advertising_features (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Package features (many-to-many)
CREATE TABLE package_features (
    package_id INTEGER NOT NULL REFERENCES advertising_packages(id) ON DELETE CASCADE,
    feature_id INTEGER NOT NULL REFERENCES advertising_features(id) ON DELETE CASCADE,
    PRIMARY KEY (package_id, feature_id)
);

-- Advertisements
CREATE TABLE advertisements (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    package_id INTEGER NOT NULL REFERENCES advertising_packages(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    url VARCHAR(255),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Advertisement media (many-to-many)
CREATE TABLE advertisement_media (
    advertisement_id INTEGER NOT NULL REFERENCES advertisements(id) ON DELETE CASCADE,
    media_id INTEGER NOT NULL REFERENCES media(id) ON DELETE CASCADE,
    PRIMARY KEY (advertisement_id, media_id)
);

-- ==========================================
-- NEWSLETTER AND CONTACT TABLES
-- ==========================================

-- Newsletter subscribers
CREATE TABLE newsletter_subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Contact messages
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- ADMIN PANEL TABLES
-- ==========================================

-- Permissions
CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Role permissions (many-to-many)
CREATE TABLE role_permissions (
    role_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id INTEGER NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- Admin activity log
CREATE TABLE admin_activity_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    action VARCHAR(255) NOT NULL,
    entity_type VARCHAR(100), -- e.g., 'accommodation', 'user', 'booking'
    entity_id INTEGER,
    details TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- System settings
CREATE TABLE system_settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    setting_group VARCHAR(100),
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- INITIAL DATA
-- ==========================================

-- Insert regions
INSERT INTO regions (name, slug, description) VALUES
('Northern Region', 'northern-region', 'The Northern Region of Malawi includes districts like Mzimba, Rumphi, and Karonga.'),
('Central Region', 'central-region', 'The Central Region of Malawi includes the capital city Lilongwe and districts like Kasungu and Nkhotakota.'),
('Southern Region', 'southern-region', 'The Southern Region of Malawi includes commercial hub Blantyre and districts like Mangochi and Zomba.');

-- Insert districts
INSERT INTO districts (region_id, name, slug) VALUES
-- Northern Region
(1, 'Chitipa', 'chitipa'),
(1, 'Karonga', 'karonga'),
(1, 'Likoma', 'likoma'),
(1, 'Mzimba', 'mzimba'),
(1, 'Nkhata Bay', 'nkhata-bay'),
(1, 'Rumphi', 'rumphi'),
-- Central Region
(2, 'Dedza', 'dedza'),
(2, 'Dowa', 'dowa'),
(2, 'Kasungu', 'kasungu'),
(2, 'Lilongwe', 'lilongwe'),
(2, 'Mchinji', 'mchinji'),
(2, 'Nkhotakota', 'nkhotakota'),
(2, 'Ntcheu', 'ntcheu'),
(2, 'Ntchisi', 'ntchisi'),
(2, 'Salima', 'salima'),
-- Southern Region
(3, 'Balaka', 'balaka'),
(3, 'Blantyre', 'blantyre'),
(3, 'Chikwawa', 'chikwawa'),
(3, 'Chiradzulu', 'chiradzulu'),
(3, 'Machinga', 'machinga'),
(3, 'Mangochi', 'mangochi'),
(3, 'Mulanje', 'mulanje'),
(3, 'Mwanza', 'mwanza'),
(3, 'Nsanje', 'nsanje'),
(3, 'Thyolo', 'thyolo'),
(3, 'Phalombe', 'phalombe'),
(3, 'Zomba', 'zomba'),
(3, 'Neno', 'neno');

-- Insert accommodation types
INSERT INTO accommodation_types (name, slug, description) VALUES
('Villas', 'villas', 'Exclusive private villas with stunning views and premium amenities'),
('Resorts', 'resorts', 'All-inclusive resorts offering the ultimate relaxation experience'),
('Apartments', 'apartments', 'Fully furnished apartments for short and long-term stays'),
('Lodges', 'lodges', 'Authentic lodges immersed in Malawi''s natural beauty');

-- Insert amenities
INSERT INTO amenities (name, slug, icon, category) VALUES
('Wi-Fi', 'wifi', 'wifi', 'basic'),
('Pool', 'pool', 'pool', 'luxury'),
('Restaurant', 'restaurant', 'utensils', 'dining'),
('Bar', 'bar', 'glass', 'dining'),
('Spa', 'spa', 'spa', 'luxury'),
('Gym', 'gym', 'dumbbell', 'fitness'),
('Air Conditioning', 'air-conditioning', 'wind', 'comfort'),
('Beach Access', 'beach-access', 'beach', 'outdoor'),
('Parking', 'parking', 'car', 'basic'),
('Room Service', 'room-service', 'room-service', 'service'),
('Laundry', 'laundry', 'washing-machine', 'service'),
('Safari Tours', 'safari-tours', 'binoculars', 'activities');

-- Insert tourism categories
INSERT INTO tourism_categories (name, slug, icon) VALUES
('National Parks', 'national-parks', 'tree'),
('Lakes', 'lakes', 'droplet'),
('Mountains', 'mountains', 'mountain'),
('Cultural Sites', 'cultural-sites', 'landmark'),
('Wildlife Reserves', 'wildlife-reserves', 'paw');

-- Insert experience categories
INSERT INTO experience_categories (name, slug, icon) VALUES
('Water Activities', 'water-activities', 'anchor'),
('Cultural Experiences', 'cultural-experiences', 'users'),
('Adventure', 'adventure', 'compass'),
('Food & Drink', 'food-drink', 'utensils'),
('Wellness', 'wellness', 'heart');

-- Insert roles
INSERT INTO roles (name, description) VALUES
('admin', 'Full access to all system features'),
('manager', 'Can manage content but not system settings'),
('editor', 'Can edit content but not publish'),
('customer', 'Regular user who can make bookings');

-- Insert booking statuses
INSERT INTO booking_statuses (name) VALUES
('pending'),
('confirmed'),
('cancelled'),
('completed'),
('no-show');

-- Insert payment methods
INSERT INTO payment_methods (name) VALUES
('Credit Card'),
('PayPal'),
('Bank Transfer'),
('Mobile Money');

-- Insert payment statuses
INSERT INTO payment_statuses (name) VALUES
('pending'),
('processing'),
('completed'),
('failed'),
('refunded');

-- Insert permissions
INSERT INTO permissions (name, description) VALUES
('manage_users', 'Create, update, and delete users'),
('manage_accommodations', 'Create, update, and delete accommodations'),
('manage_tourism_sites', 'Create, update, and delete tourism sites'),
('manage_experiences', 'Create, update, and delete experiences'),
('manage_bookings', 'View and update bookings'),
('manage_payments', 'Process and refund payments'),
('manage_content', 'Create, update, and delete content pages and blog posts'),
('manage_settings', 'Update system settings'),
('view_reports', 'View system reports and analytics');

-- Insert role permissions
INSERT INTO role_permissions (role_id, permission_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), -- Admin has all permissions
(2, 2), (2, 3), (2, 4), (2, 5), (2, 7), (2, 9), -- Manager permissions
(3, 7); -- Editor can only manage content

-- Insert system settings
INSERT INTO system_settings (setting_key, setting_value, setting_group, is_public) VALUES
('site_name', 'Malawi Shades', 'general', TRUE),
('site_description', 'Your premier platform for finding accommodations and tourism experiences in Malawi', 'general', TRUE),
('contact_email', 'info@malawishades.com', 'contact', TRUE),
('contact_phone', '+265 1234 5678', 'contact', TRUE),
('currency', 'USD', 'payment', TRUE),
('booking_fee_percentage', '5', 'payment', FALSE),
('google_analytics_id', 'UA-XXXXXXXX-X', 'analytics', FALSE),
('maintenance_mode', 'false', 'system', TRUE);

