import { supabaseServer } from "@/lib/supabaseServer";

export async function fetchLegalMarkdown(fileName: string): Promise<string> {
    const filePath = `legal/${fileName}`;
    const { data, error } = await supabaseServer.storage
        .from("website")
        .download(filePath);

    if (error || !data) {
        throw new Error(`Unable to load ${filePath} from website bucket: ${error?.message ?? "Unknown error"}`);
    }

    return data.text();
}
