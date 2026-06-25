const fs = require('fs');
let sql = fs.readFileSync('supabase/schema.sql', 'utf8');
sql = sql.replace(/^CREATE POLICY ("[^"]+") ON ([a-zA-Z0-9_]+)/gm, 'DROP POLICY IF EXISTS $1 ON $2;\nCREATE POLICY $1 ON $2');
fs.writeFileSync('supabase/schema.sql', sql);
