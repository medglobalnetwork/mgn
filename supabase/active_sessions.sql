-- ==========================================
-- ACTIVE SESSIONS (Device Limit: 1 Mobile, 1 Tablet, 1 Desktop)
-- Run this in Supabase SQL Editor
-- ==========================================

-- 1. Pehle purani cheezein hatao (safe)
DROP FUNCTION IF EXISTS register_session(UUID, VARCHAR, TEXT, TEXT, INET);
DROP FUNCTION IF EXISTS remove_session(UUID, TEXT);
DROP FUNCTION IF EXISTS check_session(UUID, VARCHAR, TEXT);
DROP FUNCTION IF EXISTS cleanup_old_sessions();
DROP TABLE IF EXISTS active_sessions;

-- 2. Table banao
CREATE TABLE active_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    device_type VARCHAR(20) NOT NULL,
    device_info TEXT,
    session_token TEXT NOT NULL,
    ip_address INET,
    last_active_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_device_type CHECK (device_type IN ('mobile', 'tablet', 'desktop')),
    CONSTRAINT unique_user_device UNIQUE (user_id, device_type)
);

-- 3. Indexes
CREATE INDEX idx_active_sessions_user ON active_sessions(user_id);
CREATE INDEX idx_active_sessions_token ON active_sessions(session_token);

-- 4. Register session function (upsert - one per device type)
CREATE OR REPLACE FUNCTION register_session(
    p_user_id UUID,
    p_device_type VARCHAR,
    p_session_token TEXT,
    p_device_info TEXT DEFAULT NULL,
    p_ip_address INET DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    existing RECORD;
BEGIN
    -- Check existing session on this device type
    SELECT id, session_token INTO existing
    FROM active_sessions
    WHERE user_id = p_user_id AND device_type = p_device_type;

    IF existing IS NOT NULL THEN
        -- Same session token = same device, just update
        IF existing.session_token = p_session_token THEN
            UPDATE active_sessions
            SET last_active_at = NOW(), ip_address = p_ip_address
            WHERE id = existing.id;
            RETURN jsonb_build_object('allowed', true, 'message', 'Session updated');
        END IF;

        -- Different session on same device type = kick old, allow new
        DELETE FROM active_sessions
        WHERE user_id = p_user_id AND device_type = p_device_type;
    END IF;

    -- If already 3 devices, kick oldest
    IF (SELECT count(*) FROM active_sessions WHERE user_id = p_user_id) >= 3 THEN
        DELETE FROM active_sessions
        WHERE id = (
            SELECT id FROM active_sessions
            WHERE user_id = p_user_id
            ORDER BY last_active_at ASC
            LIMIT 1
        );
    END IF;

    -- Insert new session
    INSERT INTO active_sessions (user_id, device_type, session_token, device_info, ip_address)
    VALUES (p_user_id, p_device_type, p_session_token, p_device_info, p_ip_address);

    RETURN jsonb_build_object('allowed', true, 'message', 'New session registered');
END;
$$;

-- 5. Remove session (logout)
CREATE OR REPLACE FUNCTION remove_session(
    p_user_id UUID,
    p_session_token TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    DELETE FROM active_sessions
    WHERE user_id = p_user_id AND session_token = p_session_token;
END;
$$;

-- 6. Check session validity
CREATE OR REPLACE FUNCTION check_session(
    p_user_id UUID,
    p_device_type VARCHAR,
    p_session_token TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    existing RECORD;
BEGIN
    SELECT session_token INTO existing
    FROM active_sessions
    WHERE user_id = p_user_id AND device_type = p_device_type;

    IF existing IS NULL THEN
        RETURN jsonb_build_object('valid', false, 'message', 'No session found');
    END IF;

    IF existing.session_token = p_session_token THEN
        UPDATE active_sessions SET last_active_at = NOW()
        WHERE user_id = p_user_id AND device_type = p_device_type;
        RETURN jsonb_build_object('valid', true, 'message', 'Session valid');
    END IF;

    RETURN jsonb_build_object('valid', false, 'message', 'Session taken over by another device');
END;
$$;

-- 7. Cleanup old sessions (30 days)
CREATE OR REPLACE FUNCTION cleanup_old_sessions()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    DELETE FROM active_sessions
    WHERE last_active_at < NOW() - INTERVAL '30 days';
END;
$$;

-- 8. RLS Policies
ALTER TABLE active_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sessions"
    ON active_sessions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions"
    ON active_sessions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions"
    ON active_sessions FOR DELETE
    USING (auth.uid() = user_id);
