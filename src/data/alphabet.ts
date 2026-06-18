/**
 * Thai script reference for the Letters tab. Each consonant/vowel pairs the Thai
 * glyph with an English-sound equivalent and an example word, and each tone is
 * taught with the classic minimal set so the sound contrast is clear.
 */

export interface Letter {
  id: string;
  char: string; // the Thai glyph (vowels shown with the ‑อ placeholder carrier)
  name: string; // how the letter is read aloud
  sound: string; // short English-equivalent sound
  hint: string; // fuller "like X in word" explanation
  exampleThai: string;
  exampleRoman: string;
  exampleEn: string;
}

export const CONSONANTS: Letter[] = [
  { id: "c-g", char: "ก", name: "gor gài", sound: "g", hint: "like 'g' in go", exampleThai: "ไก่", exampleRoman: "gài", exampleEn: "chicken" },
  { id: "c-kh", char: "ข", name: "khǎaw khài", sound: "k", hint: "like 'k' in kite", exampleThai: "ไข่", exampleRoman: "khài", exampleEn: "egg" },
  { id: "c-kh2", char: "ค", name: "khaaw khwaai", sound: "k", hint: "like 'k' in kite", exampleThai: "ควาย", exampleRoman: "khwaai", exampleEn: "buffalo" },
  { id: "c-ng", char: "ง", name: "ngor nguu", sound: "ng", hint: "like 'ng' in sing", exampleThai: "งู", exampleRoman: "nguu", exampleEn: "snake" },
  { id: "c-j", char: "จ", name: "jor jaan", sound: "j", hint: "like 'j' in jar", exampleThai: "จาน", exampleRoman: "jaan", exampleEn: "plate" },
  { id: "c-ch", char: "ช", name: "chor cháang", sound: "ch", hint: "like 'ch' in chair", exampleThai: "ช้าง", exampleRoman: "cháang", exampleEn: "elephant" },
  { id: "c-d", char: "ด", name: "dor dèk", sound: "d", hint: "like 'd' in dog", exampleThai: "เด็ก", exampleRoman: "dèk", exampleEn: "child" },
  { id: "c-dt", char: "ต", name: "dtor dtào", sound: "dt", hint: "like 't' in stop", exampleThai: "เต่า", exampleRoman: "dtào", exampleEn: "turtle" },
  { id: "c-th", char: "ท", name: "thor thá-hǎan", sound: "t", hint: "like 't' in top", exampleThai: "ทหาร", exampleRoman: "thá-hǎan", exampleEn: "soldier" },
  { id: "c-n", char: "น", name: "nor nǔu", sound: "n", hint: "like 'n' in no", exampleThai: "หนู", exampleRoman: "nǔu", exampleEn: "mouse" },
  { id: "c-b", char: "บ", name: "bor bai-máai", sound: "b", hint: "like 'b' in boy", exampleThai: "ใบไม้", exampleRoman: "bai-máai", exampleEn: "leaf" },
  { id: "c-bp", char: "ป", name: "bpor bplaa", sound: "bp", hint: "like 'p' in spin", exampleThai: "ปลา", exampleRoman: "bplaa", exampleEn: "fish" },
  { id: "c-ph", char: "พ", name: "phor phaan", sound: "p", hint: "like 'p' in pan", exampleThai: "พาน", exampleRoman: "phaan", exampleEn: "tray" },
  { id: "c-f", char: "ฟ", name: "for fan", sound: "f", hint: "like 'f' in fan", exampleThai: "ฟัน", exampleRoman: "fan", exampleEn: "teeth" },
  { id: "c-m", char: "ม", name: "mor máa", sound: "m", hint: "like 'm' in man", exampleThai: "ม้า", exampleRoman: "máa", exampleEn: "horse" },
  { id: "c-y", char: "ย", name: "yor yák", sound: "y", hint: "like 'y' in yes", exampleThai: "ยักษ์", exampleRoman: "yák", exampleEn: "giant" },
  { id: "c-r", char: "ร", name: "ror reua", sound: "r", hint: "rolled 'r', like in Spanish", exampleThai: "เรือ", exampleRoman: "reua", exampleEn: "boat" },
  { id: "c-l", char: "ล", name: "lor ling", sound: "l", hint: "like 'l' in lion", exampleThai: "ลิง", exampleRoman: "ling", exampleEn: "monkey" },
  { id: "c-w", char: "ว", name: "wor wǎaen", sound: "w", hint: "like 'w' in way", exampleThai: "แหวน", exampleRoman: "wǎaen", exampleEn: "ring" },
  { id: "c-s", char: "ส", name: "sor sǔua", sound: "s", hint: "like 's' in sun", exampleThai: "เสือ", exampleRoman: "sǔua", exampleEn: "tiger" },
  { id: "c-h", char: "ห", name: "hor hìip", sound: "h", hint: "like 'h' in hat", exampleThai: "หีบ", exampleRoman: "hìip", exampleEn: "box" },
  { id: "c-o", char: "อ", name: "or àang", sound: "ʔ / vowel carrier", hint: "silent holder for vowels", exampleThai: "อ่าง", exampleRoman: "àang", exampleEn: "basin" },
];

export const VOWELS: Letter[] = [
  { id: "v-a", char: "อะ", name: "sàra a", sound: "a (short)", hint: "like 'a' in 'ah', cut short", exampleThai: "จะ", exampleRoman: "jà", exampleEn: "will" },
  { id: "v-aa", char: "อา", name: "sàra aa", sound: "aa (long)", hint: "like 'a' in father", exampleThai: "มา", exampleRoman: "maa", exampleEn: "come" },
  { id: "v-i", char: "อิ", name: "sàra i", sound: "i (short)", hint: "like 'i' in bit", exampleThai: "กิน", exampleRoman: "gin", exampleEn: "eat" },
  { id: "v-ii", char: "อี", name: "sàra ii", sound: "ee (long)", hint: "like 'ee' in see", exampleThai: "ดี", exampleRoman: "dii", exampleEn: "good" },
  { id: "v-u", char: "อุ", name: "sàra u", sound: "u (short)", hint: "like 'u' in put", exampleThai: "ดุ", exampleRoman: "dù", exampleEn: "fierce" },
  { id: "v-uu", char: "อู", name: "sàra uu", sound: "oo (long)", hint: "like 'oo' in food", exampleThai: "หมู", exampleRoman: "mǔu", exampleEn: "pig" },
  { id: "v-e", char: "เอ", name: "sàra e", sound: "ay (long)", hint: "like 'a' in café", exampleThai: "เท", exampleRoman: "thee", exampleEn: "pour" },
  { id: "v-ae", char: "แอ", name: "sàra ae", sound: "ae", hint: "like 'a' in cat", exampleThai: "แกะ", exampleRoman: "gàe", exampleEn: "sheep" },
  { id: "v-o", char: "โอ", name: "sàra o", sound: "oh (long)", hint: "like 'o' in go", exampleThai: "โต", exampleRoman: "dtoo", exampleEn: "big" },
  { id: "v-aw", char: "ออ", name: "sàra aaw", sound: "aw (long)", hint: "like 'aw' in saw", exampleThai: "พอ", exampleRoman: "phaaw", exampleEn: "enough" },
];

export interface Tone {
  id: string;
  name: string; // English tone name
  thaiName: string;
  mark: string; // contour description
  exampleThai: string;
  exampleRoman: string;
  exampleEn: string;
}

// Classic five-tone minimal set on the syllable "khaa".
export const TONES: Tone[] = [
  { id: "t-mid", name: "Mid", thaiName: "สามัญ", mark: "flat, steady — no rise or fall", exampleThai: "คา", exampleRoman: "khaa", exampleEn: "to be stuck" },
  { id: "t-low", name: "Low", thaiName: "เอก", mark: "low and flat", exampleThai: "ข่า", exampleRoman: "khàa", exampleEn: "galangal" },
  { id: "t-falling", name: "Falling", thaiName: "โท", mark: "starts high, drops down ↘", exampleThai: "ข้า", exampleRoman: "khâa", exampleEn: "I / servant" },
  { id: "t-high", name: "High", thaiName: "ตรี", mark: "high, pushed up ↗", exampleThai: "ค้า", exampleRoman: "kháa", exampleEn: "to trade" },
  { id: "t-rising", name: "Rising", thaiName: "จัตวา", mark: "dips then rises ↘↗", exampleThai: "ขา", exampleRoman: "khǎa", exampleEn: "leg" },
];
