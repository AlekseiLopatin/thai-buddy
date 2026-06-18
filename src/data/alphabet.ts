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
  // ----- the remaining consonants (less common; some appear mostly in formal/Pali words) -----
  { id: "c-kh3", char: "ฆ", name: "khaaw rá-khang", sound: "k", hint: "like 'k' in kite", exampleThai: "ระฆัง", exampleRoman: "rá-khang", exampleEn: "bell" },
  { id: "c-ch2", char: "ฉ", name: "chǒr chìng", sound: "ch", hint: "like 'ch' in chair", exampleThai: "ฉิ่ง", exampleRoman: "chìng", exampleEn: "small cymbals" },
  { id: "c-s2", char: "ซ", name: "sor sôo", sound: "s", hint: "like 's' in sun", exampleThai: "โซ่", exampleRoman: "sôo", exampleEn: "chain" },
  { id: "c-ch3", char: "ฌ", name: "chor cher", sound: "ch", hint: "like 'ch' in chair (rare)", exampleThai: "เฌอ", exampleRoman: "cher", exampleEn: "tree" },
  { id: "c-y2", char: "ญ", name: "yor yǐng", sound: "y", hint: "like 'y' in yes", exampleThai: "หญิง", exampleRoman: "yǐng", exampleEn: "woman" },
  { id: "c-d2", char: "ฎ", name: "dor chá-daa", sound: "d", hint: "like 'd' in dog", exampleThai: "ชฎา", exampleRoman: "chá-daa", exampleEn: "headdress" },
  { id: "c-dt2", char: "ฏ", name: "dtor bpà-dtàk", sound: "dt", hint: "like 't' in stop", exampleThai: "ปฏัก", exampleRoman: "bpà-dtàk", exampleEn: "goad" },
  { id: "c-th2", char: "ฐ", name: "thǒr thǎan", sound: "t", hint: "like 't' in top", exampleThai: "ฐาน", exampleRoman: "thǎan", exampleEn: "base" },
  { id: "c-th3", char: "ฑ", name: "thor monthoo", sound: "t", hint: "like 't' in top (rare)", exampleThai: "มณโฑ", exampleRoman: "monthoo", exampleEn: "Montho (name)" },
  { id: "c-th4", char: "ฒ", name: "thor phûu-thâo", sound: "t", hint: "like 't' in top", exampleThai: "ผู้เฒ่า", exampleRoman: "phûu-thâo", exampleEn: "elder" },
  { id: "c-n2", char: "ณ", name: "nor neen", sound: "n", hint: "like 'n' in no", exampleThai: "เณร", exampleRoman: "neen", exampleEn: "novice monk" },
  { id: "c-th5", char: "ถ", name: "thǒr thǔng", sound: "t", hint: "like 't' in top", exampleThai: "ถุง", exampleRoman: "thǔng", exampleEn: "bag" },
  { id: "c-th6", char: "ธ", name: "thor thong", sound: "t", hint: "like 't' in top", exampleThai: "ธง", exampleRoman: "thong", exampleEn: "flag" },
  { id: "c-ph2", char: "ผ", name: "phǒr phûeng", sound: "p", hint: "like 'p' in pan", exampleThai: "ผึ้ง", exampleRoman: "phûeng", exampleEn: "bee" },
  { id: "c-f2", char: "ฝ", name: "fǒr fǎa", sound: "f", hint: "like 'f' in fan", exampleThai: "ฝา", exampleRoman: "fǎa", exampleEn: "lid" },
  { id: "c-ph3", char: "ภ", name: "phor sǎm-phao", sound: "p", hint: "like 'p' in pan", exampleThai: "สำเภา", exampleRoman: "sǎm-phao", exampleEn: "sailing ship" },
  { id: "c-s3", char: "ศ", name: "sǒr sǎa-laa", sound: "s", hint: "like 's' in sun", exampleThai: "ศาลา", exampleRoman: "sǎa-laa", exampleEn: "pavilion" },
  { id: "c-s4", char: "ษ", name: "sǒr reu-sǐi", sound: "s", hint: "like 's' in sun", exampleThai: "ฤๅษี", exampleRoman: "reu-sǐi", exampleEn: "hermit" },
  { id: "c-l2", char: "ฬ", name: "lor jù-laa", sound: "l", hint: "like 'l' in lion", exampleThai: "จุฬา", exampleRoman: "jù-laa", exampleEn: "kite" },
  { id: "c-h2", char: "ฮ", name: "hor nók-hûuk", sound: "h", hint: "like 'h' in hat", exampleThai: "นกฮูก", exampleRoman: "nók-hûuk", exampleEn: "owl" },
  { id: "c-kh-ob1", char: "ฃ", name: "khǎaw khùat", sound: "k", hint: "obsolete — no longer used", exampleThai: "ขวด", exampleRoman: "khùat", exampleEn: "bottle" },
  { id: "c-kh-ob2", char: "ฅ", name: "khaaw khon", sound: "k", hint: "obsolete — no longer used", exampleThai: "คน", exampleRoman: "khon", exampleEn: "person" },
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
  { id: "v-eu", char: "อึ", name: "sàra ue", sound: "ue (short)", hint: "'oo' said with unrounded lips", exampleThai: "ขึ้น", exampleRoman: "khûen", exampleEn: "to go up" },
  { id: "v-euu", char: "อือ", name: "sàra uee", sound: "uee (long)", hint: "long unrounded 'oo'", exampleThai: "มือ", exampleRoman: "meu", exampleEn: "hand" },
  { id: "v-ia", char: "เอีย", name: "sàra ia", sound: "ia", hint: "like 'ea' in 'ear'", exampleThai: "เสีย", exampleRoman: "sǐa", exampleEn: "spoiled" },
  { id: "v-ua", char: "อัว", name: "sàra ua", sound: "ua", hint: "like 'ewe-a' run together", exampleThai: "บัว", exampleRoman: "bua", exampleEn: "lotus" },
  { id: "v-ai", char: "ไอ", name: "sàra ai", sound: "ai", hint: "like 'eye'", exampleThai: "ไป", exampleRoman: "bpai", exampleEn: "to go" },
  { id: "v-ao", char: "เอา", name: "sàra ao", sound: "ao", hint: "like 'ow' in 'cow'", exampleThai: "เอา", exampleRoman: "ao", exampleEn: "to want" },
  { id: "v-am", char: "อำ", name: "sàra am", sound: "am", hint: "like 'um' in 'rum'", exampleThai: "น้ำ", exampleRoman: "nám", exampleEn: "water" },
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
