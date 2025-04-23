import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
    // eslint-disable-next-line no-undef
    process.env.SUPABASE_URL,
    // eslint-disable-next-line no-undef
    process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default supabase;

