
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Manually load env vars
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars: Record<string, string> = {};

envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^["']|["']$/g, ''); // Remove quotes
        envVars[key] = value;
    }
});

const supabaseUrl = envVars['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = envVars['NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY'];

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function debug() {
    console.log("--- Debugging Supabase Storage ---");

    const parkingId = 126;

    // Check 'parking_media' bucket
    console.log("\nChecking bucket: 'parking_media'");
    const { data: pmData, error: pmError } = await supabase.storage.from('parking_media').list(`parking_${parkingId}/images`);
    if (pmError) console.log("Error listing 'parking_media':", pmError.message);
    else {
        console.log(`Found ${pmData?.length} files in 'parking_media/parking_${parkingId}/images'`);
        if (pmData && pmData.length > 0) console.log(pmData);
    }

    // Check 'uploads' bucket
    console.log("\nChecking bucket: 'uploads'");
    // Try path: parking_media/parking_126/images
    const path1 = `parking_media/parking_${parkingId}/images`;
    const { data: upData1, error: upError1 } = await supabase.storage.from('uploads').list(path1);
    if (upError1) console.log(`Error listing 'uploads/${path1}':`, upError1.message);
    else {
        console.log(`Found ${upData1?.length} files in 'uploads/${path1}'`);
        if (upData1 && upData1.length > 0) console.log(upData1);
    }

    // Try path: parking_126/images
    const path2 = `parking_${parkingId}/images`;
    const { data: upData2, error: upError2 } = await supabase.storage.from('uploads').list(path2);
    if (upError2) console.log(`Error listing 'uploads/${path2}':`, upError2.message);
    else {
        console.log(`Found ${upData2?.length} files in 'uploads/${path2}'`);
        if (upData2 && upData2.length > 0) console.log(upData2);
    }
}

debug();
