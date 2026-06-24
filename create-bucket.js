require('dotenv').config({ path: '../mgn-api/.env' });
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log("Checking if 'documents' bucket exists...");
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  
  if (listError) {
    console.error("Error listing buckets:", listError);
    return;
  }

  const exists = buckets.some(b => b.name === 'documents');
  if (exists) {
    console.log("Bucket 'documents' already exists.");
  } else {
    console.log("Creating 'documents' bucket...");
    const { data, error } = await supabase.storage.createBucket('documents', {
      public: true,
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'],
      fileSizeLimit: 5242880 // 5MB
    });

    if (error) {
      console.error("Failed to create bucket:", error);
    } else {
      console.log("Successfully created 'documents' bucket:", data);
    }
  }
}

main();
