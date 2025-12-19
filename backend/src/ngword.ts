import { supabase } from "./supabase";

export async function getNgWord() {
  const { data, error } = await supabase
    .from("ng_words")
    .select("word")
    .limit(1)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data.word;
}
