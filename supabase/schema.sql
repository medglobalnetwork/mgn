-- ==========================================
-- MGN SUPABASE SCHEMA v2.0 (Clean, No Duplicates)
-- Enterprise Healthcare Professional Network
-- ==========================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================================
-- HELPER FUNCTIONS
-- ==========================================

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_username()
RETURNS VARCHAR(255) AS $$
BEGIN
    RETURN 'user_' || substr(encode(gen_random_bytes(6), 'hex'), 1, 12);
END;
$$ LANGUAGE plpgsql VOLATILE;

-- ==========================================
-- PHASE 0: FOUNDATION ENGINES
-- ==========================================

-- Permission Engine: Roles
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Permission Engine: Permissions
CREATE TABLE IF NOT EXISTS permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Permission Engine: Role ↔ Permission mapping
CREATE TABLE IF NOT EXISTS role_permissions (
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- Permission Engine: User ↔ Role mapping
CREATE TABLE IF NOT EXISTS user_roles (
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    assigned_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, role_id)
);

-- Feature Flag Engine
CREATE TABLE IF NOT EXISTS feature_flags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_enabled BOOLEAN DEFAULT false,
    rules JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Background Jobs Engine
CREATE TABLE IF NOT EXISTS job_queue (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_type VARCHAR(100) NOT NULL,
    payload JSONB NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    priority INTEGER DEFAULT 0,
    attempts INTEGER DEFAULT 0,
    max_attempts INTEGER DEFAULT 3,
    last_error TEXT,
    run_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Audit Engine (single, authoritative)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL,
    target_type VARCHAR(100),
    target_id UUID,
    old_value JSONB,
    new_value JSONB,
    ip_address VARCHAR(50),
    user_agent TEXT,
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Media Engine
CREATE TABLE IF NOT EXISTS media_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    uploader_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    asset_type VARCHAR(50) NOT NULL,
    original_filename TEXT NOT NULL,
    storage_url TEXT NOT NULL,
    cdn_url TEXT,
    thumbnail_url TEXT,
    mime_type VARCHAR(100),
    size_bytes BIGINT,
    metadata_json JSONB,
    virus_scan_status VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Consent Engine
CREATE TABLE IF NOT EXISTS consent_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    consent_type VARCHAR(100) NOT NULL,
    is_granted BOOLEAN DEFAULT false,
    ip_address VARCHAR(50),
    user_agent TEXT,
    version VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- PHASE 1: IDENTITY & PROFILE ENGINE
-- ==========================================

-- MGN Internal User (separate from Supabase auth)
CREATE TABLE IF NOT EXISTS mgn_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20) UNIQUE,
    password_hash TEXT,
    auth_provider VARCHAR(50) DEFAULT 'email',
    role VARCHAR(50) DEFAULT 'guest',
    status VARCHAR(50) DEFAULT 'active',
    two_factor_enabled BOOLEAN DEFAULT false,
    two_factor_method VARCHAR(50),
    two_factor_secret TEXT,
    recovery_email VARCHAR(255),
    recovery_phone VARCHAR(20),
    backup_codes TEXT[],
    last_login_at TIMESTAMP WITH TIME ZONE,
    password_changed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sessions
CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES mgn_users(id) ON DELETE CASCADE,
    refresh_token_hash TEXT NOT NULL,
    device_name VARCHAR(255),
    device_fingerprint VARCHAR(255),
    browser VARCHAR(100),
    os VARCHAR(100),
    ip VARCHAR(45),
    country VARCHAR(100),
    city VARCHAR(100),
    is_current BOOLEAN DEFAULT false,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    revoked_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_active_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Login History
CREATE TABLE IF NOT EXISTS login_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES mgn_users(id) ON DELETE CASCADE,
    ip VARCHAR(45),
    device TEXT,
    browser VARCHAR(100),
    country VARCHAR(100),
    city VARCHAR(100),
    success BOOLEAN,
    failure_reason VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Profiles (Public Identity)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    mgn_user_id UUID REFERENCES mgn_users(id) ON DELETE SET NULL,
    firebase_uid VARCHAR(255) UNIQUE,
    username VARCHAR(255) UNIQUE,
    full_name VARCHAR(200),
    preferred_name VARCHAR(100),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20) UNIQUE,
    role VARCHAR(50) DEFAULT 'user',
    account_type VARCHAR(50),
    provider VARCHAR(50),
    verified BOOLEAN DEFAULT false,
    profile_completed BOOLEAN DEFAULT false,
    photo TEXT,
    cover_photo TEXT,
    bio TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    timezone VARCHAR(100) DEFAULT 'UTC',
    headline VARCHAR(255),
    interests TEXT[],
    primary_category VARCHAR(100),
    sub_category VARCHAR(100),
    professional_type VARCHAR(100),
    department VARCHAR(150),
    specialization VARCHAR(150),
    experience_years INTEGER,
    registration_number VARCHAR(100),
    license_status VARCHAR(50),
    profile_score INTEGER DEFAULT 0,
    professional_score INTEGER DEFAULT 0,
    completion_pct INTEGER DEFAULT 0,
    badge_color VARCHAR(50) DEFAULT 'gray',
    secondary_roles JSONB DEFAULT '[]'::jsonb,
    status VARCHAR(50) DEFAULT 'active',
    onboarding_score INTEGER DEFAULT 0,
    deactivation_reason TEXT,
    deactivation_at TIMESTAMP WITH TIME ZONE,
    deletion_scheduled_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Professional Identities (Category Selection)
CREATE TABLE IF NOT EXISTS professional_identities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    identity_type VARCHAR(100) NOT NULL,
    license_number VARCHAR(100),
    council_name VARCHAR(150),
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Education
CREATE TABLE IF NOT EXISTS education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    institution_name VARCHAR(255) NOT NULL,
    degree VARCHAR(100),
    field_of_study VARCHAR(100),
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT false,
    grade VARCHAR(20),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Experience
CREATE TABLE IF NOT EXISTS experience (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    title VARCHAR(100) NOT NULL,
    employment_type VARCHAR(50),
    location VARCHAR(150),
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT false,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Profile Photos
CREATE TABLE IF NOT EXISTS profile_photos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    is_cover BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Qualifications
CREATE TABLE IF NOT EXISTS qualifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    qualification VARCHAR(255) NOT NULL,
    university VARCHAR(255),
    year INTEGER,
    document_url TEXT,
    verification_status VARCHAR(50) DEFAULT 'NOT_STARTED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Licenses
CREATE TABLE IF NOT EXISTS licenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    license_number VARCHAR(100) NOT NULL,
    authority VARCHAR(255),
    country VARCHAR(100),
    state VARCHAR(100),
    issue_date DATE,
    expiry_date DATE,
    document_url TEXT,
    visibility VARCHAR(50) DEFAULT 'PUBLIC',
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Skills
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    category VARCHAR(100),
    name VARCHAR(100) NOT NULL
);

-- Certifications
CREATE TABLE IF NOT EXISTS certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    organization VARCHAR(255),
    issue_date DATE,
    expiry_date DATE,
    credential_id VARCHAR(100),
    credential_url TEXT,
    file_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Research
CREATE TABLE IF NOT EXISTS research (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    abstract TEXT,
    journal VARCHAR(255),
    doi VARCHAR(100),
    status VARCHAR(50),
    file_url TEXT,
    co_authors TEXT[],
    published_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Publications
CREATE TABLE IF NOT EXISTS publications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    type VARCHAR(100),
    title VARCHAR(255) NOT NULL,
    authors TEXT,
    journal VARCHAR(255),
    year INTEGER,
    doi VARCHAR(100),
    file_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Achievements
CREATE TABLE IF NOT EXISTS achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    organization VARCHAR(255),
    date DATE,
    description TEXT,
    media_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Languages Spoken
CREATE TABLE IF NOT EXISTS languages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    language VARCHAR(100) NOT NULL,
    reading_level VARCHAR(50),
    writing_level VARCHAR(50),
    speaking_level VARCHAR(50)
);

-- Profile Privacy (field-level visibility)
CREATE TABLE IF NOT EXISTS profile_privacy (
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    field_name VARCHAR(100) NOT NULL,
    visibility_scope VARCHAR(50) DEFAULT 'PUBLIC',
    PRIMARY KEY (profile_id, field_name)
);

-- Profile Views
CREATE TABLE IF NOT EXISTS profile_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    viewer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    viewed_profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- PHASE 2: RELATIONSHIP ENGINE
-- ==========================================

CREATE TABLE IF NOT EXISTS relationships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    from_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    to_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    relationship_type VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(from_user_id, to_user_id, relationship_type)
);

CREATE TABLE IF NOT EXISTS circles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(50),
    color VARCHAR(50),
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS circle_members (
    circle_id UUID REFERENCES circles(id) ON DELETE CASCADE,
    relationship_id UUID REFERENCES relationships(id) ON DELETE CASCADE,
    PRIMARY KEY (circle_id, relationship_id)
);

CREATE TABLE IF NOT EXISTS relationship_notes (
    relationship_id UUID REFERENCES relationships(id) ON DELETE CASCADE,
    owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    note TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (relationship_id, owner_id)
);

-- Connections (backward compat)
CREATE TABLE IF NOT EXISTS connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requester_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(requester_id, receiver_id)
);

-- ==========================================
-- PHASE 3: CONTENT & FEED ENGINE
-- ==========================================

CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    content_type VARCHAR(50) DEFAULT 'TEXT',
    visibility VARCHAR(50) DEFAULT 'PUBLIC',
    media_url TEXT,
    category VARCHAR(100),
    tags TEXT[],
    view_count INTEGER DEFAULT 0,
    is_pinned BOOLEAN DEFAULT false,
    is_hidden BOOLEAN DEFAULT false,
    hidden_reason TEXT,
    hidden_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS post_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    media_url TEXT NOT NULL,
    media_type VARCHAR(50),
    order_idx INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_hidden BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(post_id, user_id)
);

CREATE TABLE IF NOT EXISTS reactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    target_type VARCHAR(50) NOT NULL,
    target_id UUID NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    reaction_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(target_type, target_id, user_id)
);

CREATE TABLE IF NOT EXISTS mentions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    target_type VARCHAR(50) NOT NULL,
    target_id UUID NOT NULL,
    mentioned_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, post_id)
);

-- ==========================================
-- PHASE 4: SEARCH ENGINE
-- ==========================================

CREATE TABLE IF NOT EXISTS search_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    query VARCHAR(255) NOT NULL,
    filters JSONB,
    result_count INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS saved_searches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    query_json JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS search_index (
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    indexed_text TEXT,
    ts_vector TSVECTOR,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (entity_type, entity_id)
);

CREATE TABLE IF NOT EXISTS popular_queries (
    query VARCHAR(255) PRIMARY KEY,
    count INTEGER DEFAULT 1,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- PHASE 5: COMMUNICATION ENGINE
-- ==========================================

CREATE TABLE IF NOT EXISTS notification_preferences (
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,
    channel VARCHAR(50) NOT NULL,
    frequency VARCHAR(50) DEFAULT 'REALTIME',
    is_enabled BOOLEAN DEFAULT true,
    quiet_hours_start TIME,
    quiet_hours_end TIME,
    PRIMARY KEY (user_id, category, channel)
);

CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    category VARCHAR(50),
    title VARCHAR(255),
    content TEXT NOT NULL,
    action_url TEXT,
    is_read BOOLEAN DEFAULT false,
    related_id UUID,
    related_type VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(50) NOT NULL,
    name VARCHAR(255),
    status VARCHAR(50) DEFAULT 'ACTIVE',
    last_message_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS conversation_members (
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'MEMBER',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    muted BOOLEAN DEFAULT false,
    archived BOOLEAN DEFAULT false,
    pinned BOOLEAN DEFAULT false,
    last_read_at TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    type VARCHAR(50) DEFAULT 'TEXT',
    body TEXT,
    status VARCHAR(50) DEFAULT 'SENT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    edited_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS message_attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
    media_url TEXT NOT NULL,
    media_type VARCHAR(50),
    file_name VARCHAR(255),
    file_size BIGINT
);

CREATE TABLE IF NOT EXISTS message_reads (
    message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    read_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (message_id, user_id)
);

CREATE TABLE IF NOT EXISTS message_reactions (
    message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    reaction_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (message_id, user_id, reaction_type)
);

CREATE TABLE IF NOT EXISTS message_drafts (
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    body TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (conversation_id, user_id)
);

-- ==========================================
-- PHASE 6: TRUST & VERIFICATION ENGINE
-- ==========================================

CREATE TABLE IF NOT EXISTS verification_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    verification_type VARCHAR(100) NOT NULL,
    document_type VARCHAR(100) NOT NULL,
    document_url TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS verification_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID REFERENCES verification_requests(id) ON DELETE CASCADE,
    doc_type VARCHAR(100) NOT NULL,
    file_url TEXT NOT NULL,
    ocr_data_json JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS verification_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID REFERENCES verification_requests(id) ON DELETE CASCADE,
    reviewer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    decision VARCHAR(50) NOT NULL,
    reason TEXT,
    internal_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS verification_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    badge_type VARCHAR(100) NOT NULL,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS trust_scores (
    user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    identity_score INTEGER DEFAULT 0,
    qualification_score INTEGER DEFAULT 0,
    license_score INTEGER DEFAULT 0,
    organization_score INTEGER DEFAULT 0,
    community_score INTEGER DEFAULT 0,
    research_score INTEGER DEFAULT 0,
    activity_score INTEGER DEFAULT 0,
    total_score INTEGER DEFAULT 0,
    trust_level VARCHAR(50) DEFAULT 'NEW',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS trust_timeline (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL,
    description TEXT,
    score_change INTEGER DEFAULT 0,
    occurred_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- PHASE 7: SETTINGS & SECURITY
-- ==========================================

CREATE TABLE IF NOT EXISTS user_preferences (
    user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    theme VARCHAR(50) DEFAULT 'system',
    language VARCHAR(50) DEFAULT 'en',
    timezone VARCHAR(100) DEFAULT 'UTC',
    date_format VARCHAR(50) DEFAULT 'DD/MM/YYYY',
    accessibility_json JSONB,
    email_digest VARCHAR(50) DEFAULT 'DAILY',
    quiet_hours_enabled BOOLEAN DEFAULT false,
    quiet_hours_start TIME DEFAULT '22:00',
    quiet_hours_end TIME DEFAULT '08:00',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS security_settings (
    user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    two_factor_enabled BOOLEAN DEFAULT false,
    two_factor_method VARCHAR(50),
    recovery_email VARCHAR(255),
    recovery_phone VARCHAR(20),
    backup_codes_generated_at TIMESTAMP WITH TIME ZONE,
    password_strength VARCHAR(50) DEFAULT 'WEAK',
    password_changed_at TIMESTAMP WITH TIME ZONE,
    login_alerts_enabled BOOLEAN DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS privacy_settings (
    user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    profile_visibility VARCHAR(50) DEFAULT 'PUBLIC',
    contact_visibility VARCHAR(50) DEFAULT 'CONNECTIONS',
    activity_visibility VARCHAR(50) DEFAULT 'PUBLIC',
    allow_messages_from VARCHAR(50) DEFAULT 'EVERYONE',
    show_in_search BOOLEAN DEFAULT true,
    allow_profile_recommendations BOOLEAN DEFAULT true,
    allow_ai_recommendations BOOLEAN DEFAULT true,
    show_online_status BOOLEAN DEFAULT true,
    show_read_receipts BOOLEAN DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS connected_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL,
    provider_user_id VARCHAR(255) NOT NULL,
    provider_email VARCHAR(255),
    is_primary BOOLEAN DEFAULT false,
    connected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, provider)
);

CREATE TABLE IF NOT EXISTS active_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
    device_name VARCHAR(255),
    browser VARCHAR(100),
    os VARCHAR(100),
    ip_address VARCHAR(50),
    country VARCHAR(100),
    city VARCHAR(100),
    is_current BOOLEAN DEFAULT false,
    last_active TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS data_exports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    export_type VARCHAR(50) DEFAULT 'FULL',
    status VARCHAR(50) DEFAULT 'PENDING',
    file_url TEXT,
    file_size_bytes BIGINT,
    download_url TEXT,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- PHASE 8: ORGANIZATIONS
-- ==========================================

CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    slug VARCHAR(255) UNIQUE,
    logo_url TEXT,
    cover_url TEXT,
    description TEXT,
    website VARCHAR(500),
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    employee_count_range VARCHAR(50),
    specialties TEXT[],
    verification_status VARCHAR(50) DEFAULT 'UNVERIFIED',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS organization_members (
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'MEMBER',
    department VARCHAR(100),
    title VARCHAR(150),
    is_admin BOOLEAN DEFAULT false,
    invited_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (organization_id, user_id)
);

CREATE TABLE IF NOT EXISTS organization_verification (
    organization_id UUID PRIMARY KEY REFERENCES organizations(id) ON DELETE CASCADE,
    document_url TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- PHASE 9: JOBS & LEARNING
-- ==========================================

CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT,
    location VARCHAR(150),
    type VARCHAR(50),
    experience_level VARCHAR(50),
    salary_min DECIMAL(12,2),
    salary_max DECIMAL(12,2),
    salary_currency VARCHAR(10) DEFAULT 'INR',
    specialty VARCHAR(100),
    is_remote BOOLEAN DEFAULT false,
    status VARCHAR(50) DEFAULT 'open',
    applications_count INTEGER DEFAULT 0,
    closes_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    applicant_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    resume_url TEXT,
    cover_letter TEXT,
    status VARCHAR(50) DEFAULT 'applied',
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(job_id, applicant_id)
);

CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    instructor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    level VARCHAR(50),
    price DECIMAL(10,2) DEFAULT 0.00,
    currency VARCHAR(10) DEFAULT 'INR',
    thumbnail_url TEXT,
    duration_hours DECIMAL(5,1),
    enrollment_count INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.00,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    video_url TEXT,
    content TEXT,
    duration_minutes INTEGER,
    order_index INTEGER,
    is_preview BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    progress DECIMAL(5,2) DEFAULT 0.00,
    completed_at TIMESTAMP WITH TIME ZONE,
    certificate_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(course_id, user_id)
);

-- ==========================================
-- PHASE 10: MARKETPLACE
-- ==========================================

CREATE TABLE IF NOT EXISTS vendors (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    company_name VARCHAR(200) NOT NULL,
    description TEXT,
    rating DECIMAL(3,2),
    total_products INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    stock INTEGER DEFAULT 0,
    category VARCHAR(100),
    images TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    buyer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    vendor_id UUID REFERENCES vendors(id) ON DELETE SET NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    status VARCHAR(50) DEFAULT 'pending',
    shipping_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- PHASE 11: ADMIN & MODERATION
-- ==========================================

CREATE TABLE IF NOT EXISTS admin_users (
    user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    admin_role VARCHAR(100) NOT NULL,
    permissions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS moderation_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    moderator_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    content_type VARCHAR(50) NOT NULL,
    content_id UUID NOT NULL,
    action VARCHAR(100) NOT NULL,
    reason TEXT,
    ai_spam_score DECIMAL(5,4),
    ai_toxicity_score DECIMAL(5,4),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    target_type VARCHAR(50) NOT NULL,
    target_id UUID NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'PENDING',
    priority VARCHAR(50) DEFAULT 'NORMAL',
    assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
    resolution TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS report_evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
    file_url TEXT NOT NULL,
    file_type VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appeals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    reviewer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    decision TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS system_announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'INFO',
    priority VARCHAR(50) DEFAULT 'NORMAL',
    target_roles TEXT[],
    starts_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ends_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- PHASE 12: PLATFORM OPERATIONS
-- ==========================================

CREATE TABLE IF NOT EXISTS platform_health_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_name VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    response_time_ms INTEGER,
    metric_json JSONB,
    checked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS incident_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    severity VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'OPEN',
    affected_services TEXT[],
    assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
    resolved_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP WITH TIME ZONE,
    post_mortem TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- PHASE 13: EVENTS ENGINE
-- ==========================================

CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organizer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_type VARCHAR(100) NOT NULL,
    category VARCHAR(100),
    thumbnail_url TEXT,
    starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ends_at TIMESTAMP WITH TIME ZONE NOT NULL,
    location VARCHAR(255),
    is_online BOOLEAN DEFAULT false,
    meeting_url TEXT,
    capacity INTEGER,
    registered_count INTEGER DEFAULT 0,
    is_free BOOLEAN DEFAULT true,
    price DECIMAL(10,2) DEFAULT 0.00,
    status VARCHAR(50) DEFAULT 'UPCOMING',
    cme_credits DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS event_registrations (
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'REGISTERED',
    attended BOOLEAN DEFAULT false,
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (event_id, user_id)
);

-- ==========================================
-- SAFE SCHEMA UPGRADES (No Data Loss)
-- ==========================================

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS mgn_user_id UUID REFERENCES mgn_users(id) ON DELETE SET NULL;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS preferred_name VARCHAR(100);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS cover_photo TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS state VARCHAR(100);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS timezone VARCHAR(100) DEFAULT 'UTC';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS professional_type VARCHAR(100);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS department VARCHAR(150);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS specialization VARCHAR(150);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS experience_years INTEGER;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS registration_number VARCHAR(100);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS license_status VARCHAR(50);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS professional_score INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS completion_pct INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS deactivation_reason TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS deactivation_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS deletion_scheduled_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE sessions ADD COLUMN IF NOT EXISTS refresh_token_hash TEXT;
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS device_name VARCHAR(255);
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS device_fingerprint VARCHAR(255);
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS browser VARCHAR(100);
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS os VARCHAR(100);
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS ip VARCHAR(45);
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS country VARCHAR(100);
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS city VARCHAR(100);
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS is_current BOOLEAN DEFAULT false;
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS revoked_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE education ADD COLUMN IF NOT EXISTS grade VARCHAR(20);
ALTER TABLE education ADD COLUMN IF NOT EXISTS description TEXT;

ALTER TABLE experience ADD COLUMN IF NOT EXISTS employment_type VARCHAR(50);

ALTER TABLE posts ADD COLUMN IF NOT EXISTS content_type VARCHAR(50) DEFAULT 'TEXT';
ALTER TABLE posts ADD COLUMN IF NOT EXISTS visibility VARCHAR(50) DEFAULT 'PUBLIC';
ALTER TABLE posts ADD COLUMN IF NOT EXISTS category VARCHAR(100);
ALTER TABLE posts ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE posts ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS is_pinned BOOLEAN DEFAULT false;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS is_hidden BOOLEAN DEFAULT false;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS hidden_reason TEXT;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS hidden_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE comments ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES comments(id) ON DELETE CASCADE;
ALTER TABLE comments ADD COLUMN IF NOT EXISTS is_hidden BOOLEAN DEFAULT false;
ALTER TABLE comments ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE notifications ADD COLUMN IF NOT EXISTS category VARCHAR(50);
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS title VARCHAR(255);
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS action_url TEXT;
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS related_type VARCHAR(50);

ALTER TABLE conversations ADD COLUMN IF NOT EXISTS name VARCHAR(255);
ALTER TABLE conversations ADD COLUMN IF NOT EXISTS last_message_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE messages ADD COLUMN IF NOT EXISTS edited_at TIMESTAMP WITH TIME ZONE;

-- Check if message_media exists before altering to avoid error if it hasn't been created yet
DO $$ 
BEGIN 
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'message_media') THEN 
    ALTER TABLE message_media ADD COLUMN IF NOT EXISTS file_name VARCHAR(255); 
    ALTER TABLE message_media ADD COLUMN IF NOT EXISTS file_size BIGINT; 
  END IF; 
END $$;

ALTER TABLE data_exports ADD COLUMN IF NOT EXISTS export_type VARCHAR(50) DEFAULT 'FULL';
ALTER TABLE data_exports ADD COLUMN IF NOT EXISTS file_size_bytes BIGINT;
ALTER TABLE data_exports ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE;

-- Check search tables
DO $$ 
BEGIN 
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'search_history') THEN 
    ALTER TABLE search_history ADD COLUMN IF NOT EXISTS filters JSONB;
    ALTER TABLE search_history ADD COLUMN IF NOT EXISTS result_count INTEGER;
  END IF; 
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'search_index') THEN 
    ALTER TABLE search_index ADD COLUMN IF NOT EXISTS ts_vector TSVECTOR;
  END IF; 
END $$;

-- Check notification preferences
DO $$ 
BEGIN 
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'notification_preferences') THEN 
    ALTER TABLE notification_preferences ADD COLUMN IF NOT EXISTS is_enabled BOOLEAN DEFAULT true;
  END IF; 
END $$;

-- Check reports and admin tables
DO $$ 
BEGIN 
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'reports') THEN 
    ALTER TABLE reports ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'PENDING';
    ALTER TABLE reports ADD COLUMN IF NOT EXISTS description TEXT;
    ALTER TABLE reports ADD COLUMN IF NOT EXISTS priority VARCHAR(50) DEFAULT 'NORMAL';
    ALTER TABLE reports ADD COLUMN IF NOT EXISTS assigned_to UUID;
    ALTER TABLE reports ADD COLUMN IF NOT EXISTS resolution TEXT;
    ALTER TABLE reports ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE;
  END IF; 
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'report_evidence') THEN 
    ALTER TABLE report_evidence ADD COLUMN IF NOT EXISTS file_type VARCHAR(50);
  END IF; 
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'appeals') THEN 
    ALTER TABLE appeals ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'PENDING';
    ALTER TABLE appeals ADD COLUMN IF NOT EXISTS reviewer_id UUID;
    ALTER TABLE appeals ADD COLUMN IF NOT EXISTS decision TEXT;
    ALTER TABLE appeals ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMP WITH TIME ZONE;
  END IF; 
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'incident_logs') THEN 
    ALTER TABLE incident_logs ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'OPEN';
    ALTER TABLE incident_logs ADD COLUMN IF NOT EXISTS affected_services TEXT[];
    ALTER TABLE incident_logs ADD COLUMN IF NOT EXISTS assigned_to UUID;
    ALTER TABLE incident_logs ADD COLUMN IF NOT EXISTS resolved_by UUID;
    ALTER TABLE incident_logs ADD COLUMN IF NOT EXISTS started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
    ALTER TABLE incident_logs ADD COLUMN IF NOT EXISTS post_mortem TEXT;
  END IF; 
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'system_announcements') THEN 
    ALTER TABLE system_announcements ADD COLUMN IF NOT EXISTS type VARCHAR(50) DEFAULT 'INFO';
    ALTER TABLE system_announcements ADD COLUMN IF NOT EXISTS target_roles TEXT[];
    ALTER TABLE system_announcements ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
    ALTER TABLE system_announcements ADD COLUMN IF NOT EXISTS created_by UUID;
  END IF; 
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'platform_health_logs') THEN 
    ALTER TABLE platform_health_logs ADD COLUMN IF NOT EXISTS status VARCHAR(50) NOT NULL DEFAULT 'OK';
  END IF;
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'feature_flags') THEN 
    ALTER TABLE feature_flags ADD COLUMN IF NOT EXISTS is_enabled BOOLEAN DEFAULT false;
    ALTER TABLE feature_flags ADD COLUMN IF NOT EXISTS rules JSONB;
    ALTER TABLE feature_flags ADD COLUMN IF NOT EXISTS description TEXT;
  END IF;
  
  -- Catch-all for status columns that might be missing on existing tables
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles') THEN 
    ALTER TABLE profiles ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'active';
  END IF;
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'mgn_users') THEN 
    ALTER TABLE mgn_users ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'active';
  END IF;
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'relationships') THEN 
    ALTER TABLE relationships ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'PENDING';
  END IF;
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'verification_requests') THEN 
    ALTER TABLE verification_requests ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'Pending';
  END IF;
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'job_queue') THEN 
    ALTER TABLE job_queue ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'PENDING';
  END IF;
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'jobs') THEN 
    ALTER TABLE jobs ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'open';
  END IF;
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'events') THEN 
    ALTER TABLE events ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'UPCOMING';
  END IF;
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'data_exports') THEN 
    ALTER TABLE data_exports ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'PENDING';
  END IF;
END $$;

-- Check organizations
DO $$ 
BEGIN 
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'organizations') THEN 
    ALTER TABLE organizations ADD COLUMN IF NOT EXISTS slug VARCHAR(255);
    ALTER TABLE organizations ADD COLUMN IF NOT EXISTS cover_url TEXT;
    ALTER TABLE organizations ADD COLUMN IF NOT EXISTS website VARCHAR(500);
    ALTER TABLE organizations ADD COLUMN IF NOT EXISTS email VARCHAR(255);
    ALTER TABLE organizations ADD COLUMN IF NOT EXISTS phone VARCHAR(20);
    ALTER TABLE organizations ADD COLUMN IF NOT EXISTS address TEXT;
    ALTER TABLE organizations ADD COLUMN IF NOT EXISTS city VARCHAR(100);
    ALTER TABLE organizations ADD COLUMN IF NOT EXISTS state VARCHAR(100);
    ALTER TABLE organizations ADD COLUMN IF NOT EXISTS country VARCHAR(100);
    ALTER TABLE organizations ADD COLUMN IF NOT EXISTS employee_count_range VARCHAR(50);
    ALTER TABLE organizations ADD COLUMN IF NOT EXISTS specialties TEXT[];
    ALTER TABLE organizations ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
  END IF; 
END $$;

DO $$ 
BEGIN 
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'organization_members') THEN 
    ALTER TABLE organization_members ADD COLUMN IF NOT EXISTS title VARCHAR(150);
    ALTER TABLE organization_members ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;
    ALTER TABLE organization_members ADD COLUMN IF NOT EXISTS invited_by UUID;
  END IF; 
END $$;

-- Check verification_badges 
DO $$ 
BEGIN 
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'verification_badges') THEN 
    ALTER TABLE verification_badges ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE;
  END IF; 
END $$;

-- ==========================================
-- INDEXES
-- ==========================================

CREATE INDEX IF NOT EXISTS idx_profiles_auth_id ON profiles(auth_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_account_type ON profiles(account_type);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON profiles(status);
CREATE INDEX IF NOT EXISTS idx_profiles_primary_category ON profiles(primary_category);
CREATE INDEX IF NOT EXISTS idx_profiles_verified ON profiles(verified);
CREATE INDEX IF NOT EXISTS idx_profiles_country ON profiles(country);

CREATE INDEX IF NOT EXISTS idx_mgn_users_email ON mgn_users(email);
CREATE INDEX IF NOT EXISTS idx_mgn_users_phone ON mgn_users(phone);
CREATE INDEX IF NOT EXISTS idx_mgn_users_status ON mgn_users(status);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);

CREATE INDEX IF NOT EXISTS idx_login_history_user_id ON login_history(user_id);
CREATE INDEX IF NOT EXISTS idx_login_history_created ON login_history(created_at);

CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_visibility ON posts(visibility);
CREATE INDEX IF NOT EXISTS idx_posts_created ON posts(created_at);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_content_type ON posts(content_type);

CREATE INDEX IF NOT EXISTS idx_comments_post ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_author ON comments(author_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent ON comments(parent_id);

CREATE INDEX IF NOT EXISTS idx_reactions_target ON reactions(target_type, target_id);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(created_at);

CREATE INDEX IF NOT EXISTS idx_conversations_type ON conversations(type);
CREATE INDEX IF NOT EXISTS idx_conversation_members_user ON conversation_members(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at);

CREATE INDEX IF NOT EXISTS idx_relationships_from ON relationships(from_user_id);
CREATE INDEX IF NOT EXISTS idx_relationships_to ON relationships(to_user_id);
CREATE INDEX IF NOT EXISTS idx_relationships_status ON relationships(status);

CREATE INDEX IF NOT EXISTS idx_connections_requester ON connections(requester_id);
CREATE INDEX IF NOT EXISTS idx_connections_receiver ON connections(receiver_id);

CREATE INDEX IF NOT EXISTS idx_verification_requests_user ON verification_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_verification_requests_status ON verification_requests(status);

CREATE INDEX IF NOT EXISTS idx_trust_scores_level ON trust_scores(trust_level);

CREATE INDEX IF NOT EXISTS idx_search_history_user ON search_history(user_id);

CREATE INDEX IF NOT EXISTS idx_search_index_ts ON search_index USING GIN(ts_vector);

CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_target ON audit_logs(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at);

CREATE INDEX IF NOT EXISTS idx_job_queue_status ON job_queue(status);
CREATE INDEX IF NOT EXISTS idx_job_queue_run_at ON job_queue(run_at);
CREATE INDEX IF NOT EXISTS idx_job_queue_type ON job_queue(job_type);

CREATE INDEX IF NOT EXISTS idx_media_assets_uploader ON media_assets(uploader_id);
CREATE INDEX IF NOT EXISTS idx_media_assets_type ON media_assets(asset_type);

CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_employer ON jobs(employer_id);

CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_assigned ON reports(assigned_to);

CREATE INDEX IF NOT EXISTS idx_events_starts ON events(starts_at);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(event_type);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);

CREATE INDEX IF NOT EXISTS idx_organizations_slug ON organizations(slug);
CREATE INDEX IF NOT EXISTS idx_organizations_type ON organizations(type);
CREATE INDEX IF NOT EXISTS idx_organizations_verification ON organizations(verification_status);

CREATE INDEX IF NOT EXISTS idx_data_exports_user ON data_exports(user_id);
CREATE INDEX IF NOT EXISTS idx_data_exports_status ON data_exports(status);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE trust_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE privacy_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE connected_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE active_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_exports ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read all, update own
DROP POLICY IF EXISTS "Profiles are publicly readable" ON profiles;
CREATE POLICY "Profiles are publicly readable" ON profiles FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = auth_id);
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = auth_id);

-- Posts: read public posts, write own
DROP POLICY IF EXISTS "Public posts are readable" ON posts;
CREATE POLICY "Public posts are readable" ON posts FOR SELECT USING (visibility = 'PUBLIC' OR author_id IN (SELECT auth_id FROM profiles WHERE id = (SELECT requester_id FROM connections WHERE receiver_id = (SELECT id FROM profiles WHERE auth_id = auth.uid()) AND status = 'accepted')) OR author_id = (SELECT auth_id FROM profiles WHERE id = posts.author_id));
DROP POLICY IF EXISTS "Users can create posts" ON posts;
CREATE POLICY "Users can create posts" ON posts FOR INSERT WITH CHECK (auth.uid() = (SELECT auth_id FROM profiles WHERE id = author_id));
DROP POLICY IF EXISTS "Authors can update own posts" ON posts;
CREATE POLICY "Authors can update own posts" ON posts FOR UPDATE USING (auth.uid() = (SELECT auth_id FROM profiles WHERE id = author_id));
DROP POLICY IF EXISTS "Authors can delete own posts" ON posts;
CREATE POLICY "Authors can delete own posts" ON posts FOR DELETE USING (auth.uid() = (SELECT auth_id FROM profiles WHERE id = author_id));

-- Comments: readable, own CRUD
DROP POLICY IF EXISTS "Comments are readable" ON comments;
CREATE POLICY "Comments are readable" ON comments FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can create comments" ON comments;
CREATE POLICY "Users can create comments" ON comments FOR INSERT WITH CHECK (auth.uid() = (SELECT auth_id FROM profiles WHERE id = author_id));

-- Messages: only conversation members
DROP POLICY IF EXISTS "Members can view messages" ON messages;
CREATE POLICY "Members can view messages" ON messages FOR SELECT USING (conversation_id IN (SELECT conversation_id FROM conversation_members WHERE user_id = (SELECT id FROM profiles WHERE auth_id = auth.uid())));
DROP POLICY IF EXISTS "Members can send messages" ON messages;
CREATE POLICY "Members can send messages" ON messages FOR INSERT WITH CHECK (conversation_id IN (SELECT conversation_id FROM conversation_members WHERE user_id = (SELECT id FROM profiles WHERE auth_id = auth.uid())));

-- Notifications: own only
DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (user_id = (SELECT id FROM profiles WHERE auth_id = auth.uid()));
DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (user_id = (SELECT id FROM profiles WHERE auth_id = auth.uid()));

-- Settings: own only
DROP POLICY IF EXISTS "Users can view own preferences" ON user_preferences;
CREATE POLICY "Users can view own preferences" ON user_preferences FOR SELECT USING (user_id = (SELECT id FROM profiles WHERE auth_id = auth.uid()));
DROP POLICY IF EXISTS "Users can update own preferences" ON user_preferences;
CREATE POLICY "Users can update own preferences" ON user_preferences FOR UPDATE USING (user_id = (SELECT id FROM profiles WHERE auth_id = auth.uid()));
DROP POLICY IF EXISTS "Users can view own security" ON security_settings;
CREATE POLICY "Users can view own security" ON security_settings FOR SELECT USING (user_id = (SELECT id FROM profiles WHERE auth_id = auth.uid()));
DROP POLICY IF EXISTS "Users can update own security" ON security_settings;
CREATE POLICY "Users can update own security" ON security_settings FOR UPDATE USING (user_id = (SELECT id FROM profiles WHERE auth_id = auth.uid()));
DROP POLICY IF EXISTS "Users can view own privacy" ON privacy_settings;
CREATE POLICY "Users can view own privacy" ON privacy_settings FOR SELECT USING (user_id = (SELECT id FROM profiles WHERE auth_id = auth.uid()));
DROP POLICY IF EXISTS "Users can update own privacy" ON privacy_settings;
CREATE POLICY "Users can update own privacy" ON privacy_settings FOR UPDATE USING (user_id = (SELECT id FROM profiles WHERE auth_id = auth.uid()));

-- ==========================================
-- TRIGGERS
-- ==========================================

DROP TRIGGER IF EXISTS update_profiles_modtime ON profiles;
CREATE TRIGGER update_profiles_modtime BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_modified_column();
DROP TRIGGER IF EXISTS update_verifications_modtime ON verification_requests;
CREATE TRIGGER update_verifications_modtime BEFORE UPDATE ON verification_requests FOR EACH ROW EXECUTE FUNCTION update_modified_column();
DROP TRIGGER IF EXISTS update_posts_modtime ON posts;
CREATE TRIGGER update_posts_modtime BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_modified_column();
DROP TRIGGER IF EXISTS update_jobs_modtime ON jobs;
CREATE TRIGGER update_jobs_modtime BEFORE UPDATE ON jobs FOR EACH ROW EXECUTE FUNCTION update_modified_column();
DROP TRIGGER IF EXISTS update_courses_modtime ON courses;
CREATE TRIGGER update_courses_modtime BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_modified_column();
DROP TRIGGER IF EXISTS update_products_modtime ON products;
CREATE TRIGGER update_products_modtime BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_modified_column();
DROP TRIGGER IF EXISTS update_organizations_modtime ON organizations;
CREATE TRIGGER update_organizations_modtime BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_modified_column();
DROP TRIGGER IF EXISTS update_user_prefs_modtime ON user_preferences;
CREATE TRIGGER update_user_prefs_modtime BEFORE UPDATE ON user_preferences FOR EACH ROW EXECUTE FUNCTION update_modified_column();
DROP TRIGGER IF EXISTS update_security_settings_modtime ON security_settings;
CREATE TRIGGER update_security_settings_modtime BEFORE UPDATE ON security_settings FOR EACH ROW EXECUTE FUNCTION update_modified_column();
DROP TRIGGER IF EXISTS update_privacy_settings_modtime ON privacy_settings;
CREATE TRIGGER update_privacy_settings_modtime BEFORE UPDATE ON privacy_settings FOR EACH ROW EXECUTE FUNCTION update_modified_column();
DROP TRIGGER IF EXISTS update_mgn_users_modtime ON mgn_users;
CREATE TRIGGER update_mgn_users_modtime BEFORE UPDATE ON mgn_users FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- Auto-generate username on profile creation
CREATE OR REPLACE FUNCTION handle_new_profile()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.username IS NULL THEN
        NEW.username := generate_username();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_username_on_insert ON profiles;
CREATE TRIGGER set_username_on_insert BEFORE INSERT ON profiles FOR EACH ROW EXECUTE FUNCTION handle_new_profile();

-- Auto-create trust_scores row when profile created
CREATE OR REPLACE FUNCTION handle_new_profile_trust()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO trust_scores (user_id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
    INSERT INTO user_preferences (user_id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
    INSERT INTO security_settings (user_id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
    INSERT INTO privacy_settings (user_id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ==========================================
-- STORAGE BUCKETS (Run in Supabase SQL Editor)
-- ==========================================
-- INSERT INTO storage.buckets (id, name, public) VALUES
--   ('profiles', 'profiles', true),
--   ('posts', 'posts', true),
--   ('verification', 'verification', false),
--   ('research', 'research', false),
--   ('certificates', 'certificates', false),
--   ('organizations', 'organizations', true),
--   ('events', 'events', true),
--   ('marketplace', 'marketplace', true),
--   ('messages', 'messages', false);

-- ==========================================
-- SEED DATA: Roles & Permissions
-- ==========================================

INSERT INTO roles (id, name, description) VALUES
    ('a0000000-0000-0000-0000-000000000001', 'guest', 'Unauthenticated visitor'),
    ('a0000000-0000-0000-0000-000000000002', 'student', 'Student member'),
    ('a0000000-0000-0000-0000-000000000003', 'professional', 'Professional member'),
    ('a0000000-0000-0000-0000-000000000004', 'verified_professional', 'Verified healthcare professional'),
    ('a0000000-0000-0000-0000-000000000005', 'faculty', 'Faculty/academic member'),
    ('a0000000-0000-0000-0000-000000000006', 'researcher', 'Researcher member'),
    ('a0000000-0000-0000-0000-000000000007', 'org_staff', 'Organization staff'),
    ('a0000000-0000-0000-0000-000000000008', 'org_admin', 'Organization administrator'),
    ('a0000000-0000-0000-0000-000000000009', 'moderator', 'Content moderator'),
    ('a0000000-0000-0000-0000-000000000010', 'trust_reviewer', 'Trust & verification reviewer'),
    ('a0000000-0000-0000-0000-000000000011', 'support', 'Support staff'),
    ('a0000000-0000-0000-0000-000000000012', 'platform_admin', 'Platform administrator'),
    ('a0000000-0000-0000-0000-000000000013', 'super_admin', 'Super administrator')
ON CONFLICT (name) DO NOTHING;

INSERT INTO permissions (id, key, name, category) VALUES
    ('b0000000-0000-0000-0000-000000000001', 'post.create', 'Create Posts', 'content'),
    ('b0000000-0000-0000-0000-000000000002', 'post.edit', 'Edit Own Posts', 'content'),
    ('b0000000-0000-0000-0000-000000000003', 'post.delete', 'Delete Own Posts', 'content'),
    ('b0000000-0000-0000-0000-000000000004', 'comment.create', 'Create Comments', 'content'),
    ('b0000000-0000-0000-0000-000000000005', 'research.publish', 'Publish Research', 'content'),
    ('b0000000-0000-0000-0000-000000000006', 'message.send', 'Send Messages', 'communication'),
    ('b0000000-0000-0000-0000-000000000007', 'verification.submit', 'Submit Verification', 'trust'),
    ('b0000000-0000-0000-0000-000000000008', 'verification.review', 'Review Verifications', 'trust'),
    ('b0000000-0000-0000-0000-000000000009', 'organization.manage', 'Manage Organization', 'organization'),
    ('b0000000-0000-0000-0000-000000000010', 'analytics.view', 'View Analytics', 'analytics'),
    ('b0000000-0000-0000-0000-000000000011', 'admin.dashboard', 'Access Admin Dashboard', 'admin'),
    ('b0000000-0000-0000-0000-000000000012', 'admin.manage_users', 'Manage Users', 'admin'),
    ('b0000000-0000-0000-0000-000000000013', 'admin.moderate', 'Moderate Content', 'admin'),
    ('b0000000-0000-0000-0000-000000000014', 'admin.reports', 'Handle Reports', 'admin'),
    ('b0000000-0000-0000-0000-000000000015', 'system.configure', 'Configure System', 'system'),
    ('b0000000-0000-0000-0000-000000000016', 'job.post', 'Post Jobs', 'jobs'),
    ('b0000000-0000-0000-0000-000000000017', 'course.create', 'Create Courses', 'learning'),
    ('b0000000-0000-0000-0000-000000000018', 'event.create', 'Create Events', 'events'),
    ('b0000000-0000-0000-0000-000000000019', 'marketplace.sell', 'Sell on Marketplace', 'marketplace'),
    ('b0000000-0000-0000-0000-000000000020', 'media.upload', 'Upload Media', 'media')
ON CONFLICT (key) DO NOTHING;

-- Role ↔ Permission mappings
INSERT INTO role_permissions (role_id, permission_id) VALUES
    ('a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001'),
    ('a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000004'),
    ('a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000006'),
    ('a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000007'),
    ('a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000020'),
    ('a0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000001'),
    ('a0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000002'),
    ('a0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000004'),
    ('a0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000005'),
    ('a0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000006'),
    ('a0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000007'),
    ('a0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000016'),
    ('a0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000018'),
    ('a0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000020'),
    ('a0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000001'),
    ('a0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000002'),
    ('a0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000003'),
    ('a0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000004'),
    ('a0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000005'),
    ('a0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000006'),
    ('a0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000007'),
    ('a0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000016'),
    ('a0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000017'),
    ('a0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000018'),
    ('a0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000019'),
    ('a0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000020'),
    ('a0000000-0000-0000-0000-000000000008', 'b0000000-0000-0000-0000-000000000009'),
    ('a0000000-0000-0000-0000-000000000009', 'b0000000-0000-0000-0000-000000000013'),
    ('a0000000-0000-0000-0000-000000000010', 'b0000000-0000-0000-0000-000000000008'),
    ('a0000000-0000-0000-0000-000000000012', 'b0000000-0000-0000-0000-000000000010'),
    ('a0000000-0000-0000-0000-000000000012', 'b0000000-0000-0000-0000-000000000011'),
    ('a0000000-0000-0000-0000-000000000012', 'b0000000-0000-0000-0000-000000000012'),
    ('a0000000-0000-0000-0000-000000000012', 'b0000000-0000-0000-0000-000000000013'),
    ('a0000000-0000-0000-0000-000000000012', 'b0000000-0000-0000-0000-000000000014'),
    ('a0000000-0000-0000-0000-000000000013', 'b0000000-0000-0000-0000-000000000010'),
    ('a0000000-0000-0000-0000-000000000013', 'b0000000-0000-0000-0000-000000000011'),
    ('a0000000-0000-0000-0000-000000000013', 'b0000000-0000-0000-0000-000000000012'),
    ('a0000000-0000-0000-0000-000000000013', 'b0000000-0000-0000-0000-000000000013'),
    ('a0000000-0000-0000-0000-000000000013', 'b0000000-0000-0000-0000-000000000014'),
    ('a0000000-0000-0000-0000-000000000013', 'b0000000-0000-0000-0000-000000000015')
ON CONFLICT DO NOTHING;

-- Feature Flags seed
INSERT INTO feature_flags (key, name, is_enabled, rules) VALUES
    ('ai_search', 'AI-Powered Search', false, '{"beta_users": true}'),
    ('ai_moderation', 'AI Content Moderation', false, '{"enabled_for": ["moderator"]}'),
    ('marketplace', 'Marketplace', true, '{}'),
    ('events', 'Events & CME', true, '{}'),
    ('dark_mode', 'Dark Mode', true, '{}'),
    ('video_calls', 'Video Calls', false, '{"beta_users": true}'),
    ('ai_recommendations', 'AI Recommendations', true, '{}')
ON CONFLICT (key) DO NOTHING;
