const fs = require('fs');
const path = 'd:/mgn/mgn/supabase/schema.sql';
let sql = fs.readFileSync(path, 'utf8');
// Replace "CREATE TABLE " with "CREATE TABLE IF NOT EXISTS " where not already present
sql = sql.replace(/CREATE TABLE (?!(?:IF NOT EXISTS))/g, 'CREATE TABLE IF NOT EXISTS ');
fs.writeFileSync(path, sql, 'utf8');
console.log('Fixed schema.sql');
