import { Word } from "@/lib/types";

/**
 * Seed vocabulary. The "picture" for each word is an emoji glyph (or, for numbers,
 * the numeral itself) — an open, non-AI-generated set that renders everywhere.
 * Every picture is always shown together with its English label in the UI.
 * Aimed at expats living in Thailand: practical, real-life vocabulary.
 */
export const WORDS: Word[] = [
  // ---------- Level 1 — Absolute Beginner ----------
  // Greetings & basics
  { id: "hello", thai: "สวัสดี", roman: "sà-wàt-dii", en: "hello", emoji: "👋", category: "Greetings", level: 1 },
  { id: "thanks", thai: "ขอบคุณ", roman: "khàawp-khun", en: "thank you", emoji: "🙏", category: "Greetings", level: 1 },
  { id: "yes", thai: "ใช่", roman: "châi", en: "yes", emoji: "✅", category: "Greetings", level: 1 },
  { id: "no", thai: "ไม่", roman: "mâi", en: "no", emoji: "❌", category: "Greetings", level: 1 },
  { id: "bye", thai: "ลาก่อน", roman: "laa-gàawn", en: "goodbye", emoji: "🚶", category: "Greetings", level: 1 },
  { id: "sorry", thai: "ขอโทษ", roman: "khǎaw-thôot", en: "sorry", emoji: "😔", category: "Greetings", level: 1 },

  // Numbers — ones
  { id: "n1", thai: "หนึ่ง", roman: "nèung", en: "one", emoji: "1", category: "Numbers", level: 1 },
  { id: "n2", thai: "สอง", roman: "sǎawng", en: "two", emoji: "2", category: "Numbers", level: 1 },
  { id: "n3", thai: "สาม", roman: "sǎam", en: "three", emoji: "3", category: "Numbers", level: 1 },
  { id: "n4", thai: "สี่", roman: "sìi", en: "four", emoji: "4", category: "Numbers", level: 1 },
  { id: "n5", thai: "ห้า", roman: "hâa", en: "five", emoji: "5", category: "Numbers", level: 1 },
  { id: "n6", thai: "หก", roman: "hòk", en: "six", emoji: "6", category: "Numbers", level: 1 },
  { id: "n7", thai: "เจ็ด", roman: "jèt", en: "seven", emoji: "7", category: "Numbers", level: 1 },
  { id: "n8", thai: "แปด", roman: "bpàaet", en: "eight", emoji: "8", category: "Numbers", level: 1 },
  { id: "n9", thai: "เก้า", roman: "gâao", en: "nine", emoji: "9", category: "Numbers", level: 1 },
  { id: "n10", thai: "สิบ", roman: "sìp", en: "ten", emoji: "10", category: "Numbers", level: 1 },
  // Numbers — tens
  { id: "n20", thai: "ยี่สิบ", roman: "yîi-sìp", en: "twenty", emoji: "20", category: "Numbers", level: 1 },
  { id: "n30", thai: "สามสิบ", roman: "sǎam-sìp", en: "thirty", emoji: "30", category: "Numbers", level: 1 },
  { id: "n50", thai: "ห้าสิบ", roman: "hâa-sìp", en: "fifty", emoji: "50", category: "Numbers", level: 1 },
  // Numbers — big
  { id: "n100", thai: "ร้อย", roman: "ráauy", en: "hundred", emoji: "100", category: "Numbers", level: 1 },
  { id: "n1000", thai: "พัน", roman: "phan", en: "thousand", emoji: "1,000", category: "Numbers", level: 1 },
  { id: "n10000", thai: "หมื่น", roman: "mèun", en: "ten thousand", emoji: "10,000", category: "Numbers", level: 1 },
  { id: "n100000", thai: "แสน", roman: "sǎaen", en: "hundred thousand", emoji: "100,000", category: "Numbers", level: 1 },
  { id: "n1000000", thai: "ล้าน", roman: "láan", en: "million", emoji: "1,000,000", category: "Numbers", level: 1 },

  // Colors
  { id: "red", thai: "แดง", roman: "daaeng", en: "red", emoji: "🔴", category: "Colors", level: 1 },
  { id: "blue", thai: "น้ำเงิน", roman: "nám-ngern", en: "blue", emoji: "🔵", category: "Colors", level: 1 },
  { id: "green", thai: "เขียว", roman: "khǐao", en: "green", emoji: "🟢", category: "Colors", level: 1 },
  { id: "yellow", thai: "เหลือง", roman: "lěuang", en: "yellow", emoji: "🟡", category: "Colors", level: 1 },
  { id: "black", thai: "ดำ", roman: "dam", en: "black", emoji: "⚫", category: "Colors", level: 1 },
  { id: "white", thai: "ขาว", roman: "khǎao", en: "white", emoji: "⚪", category: "Colors", level: 1 },

  // ---------- Level 2 — Newcomer ----------
  // Food & drink
  { id: "rice", thai: "ข้าว", roman: "khâao", en: "rice", emoji: "🍚", category: "Food", level: 2 },
  { id: "water", thai: "น้ำ", roman: "nám", en: "water", emoji: "💧", category: "Food", level: 2 },
  { id: "coffee", thai: "กาแฟ", roman: "gaa-faae", en: "coffee", emoji: "☕", category: "Food", level: 2 },
  { id: "egg", thai: "ไข่", roman: "khài", en: "egg", emoji: "🥚", category: "Food", level: 2 },
  { id: "noodles", thai: "ก๋วยเตี๋ยว", roman: "gǔay-dtǐao", en: "noodles", emoji: "🍜", category: "Food", level: 2 },
  { id: "chicken_food", thai: "ไก่", roman: "gài", en: "chicken", emoji: "🍗", category: "Food", level: 2 },

  // Fruits
  { id: "banana", thai: "กล้วย", roman: "glûuay", en: "banana", emoji: "🍌", category: "Fruits", level: 2 },
  { id: "orange", thai: "ส้ม", roman: "sôm", en: "orange", emoji: "🍊", category: "Fruits", level: 2 },
  { id: "mango", thai: "มะม่วง", roman: "má-mûang", en: "mango", emoji: "🥭", category: "Fruits", level: 2 },
  { id: "watermelon", thai: "แตงโม", roman: "dtaaeng-moo", en: "watermelon", emoji: "🍉", category: "Fruits", level: 2 },
  { id: "pineapple", thai: "สับปะรด", roman: "sàp-bpà-rót", en: "pineapple", emoji: "🍍", category: "Fruits", level: 2 },
  { id: "coconut", thai: "มะพร้าว", roman: "má-phráao", en: "coconut", emoji: "🥥", category: "Fruits", level: 2 },
  { id: "grapes", thai: "องุ่น", roman: "à-ngùn", en: "grapes", emoji: "🍇", category: "Fruits", level: 2 },
  { id: "apple", thai: "แอปเปิ้ล", roman: "áaep-bpêrn", en: "apple", emoji: "🍎", category: "Fruits", level: 2 },

  // Vegetables
  { id: "vegetable", thai: "ผัก", roman: "phàk", en: "vegetable", emoji: "🥬", category: "Vegetables", level: 2 },
  { id: "tomato", thai: "มะเขือเทศ", roman: "má-khěua-thêet", en: "tomato", emoji: "🍅", category: "Vegetables", level: 2 },
  { id: "carrot", thai: "แครอท", roman: "khaae-ràawt", en: "carrot", emoji: "🥕", category: "Vegetables", level: 2 },
  { id: "chili", thai: "พริก", roman: "phrík", en: "chili", emoji: "🌶️", category: "Vegetables", level: 2 },
  { id: "garlic", thai: "กระเทียม", roman: "grà-thiam", en: "garlic", emoji: "🧄", category: "Vegetables", level: 2 },
  { id: "onion", thai: "หอม", roman: "hǎawm", en: "onion", emoji: "🧅", category: "Vegetables", level: 2 },
  { id: "mushroom", thai: "เห็ด", roman: "hèt", en: "mushroom", emoji: "🍄", category: "Vegetables", level: 2 },
  { id: "corn", thai: "ข้าวโพด", roman: "khâao-phôot", en: "corn", emoji: "🌽", category: "Vegetables", level: 2 },

  // Family & people
  { id: "mother", thai: "แม่", roman: "mâae", en: "mother", emoji: "👩", category: "Family", level: 2 },
  { id: "father", thai: "พ่อ", roman: "phâaw", en: "father", emoji: "👨", category: "Family", level: 2 },
  { id: "older_sib", thai: "พี่", roman: "phîi", en: "older sibling", emoji: "🧑", category: "Family", level: 2 },
  { id: "younger_sib", thai: "น้อง", roman: "náawng", en: "younger sibling", emoji: "🧒", category: "Family", level: 2 },
  { id: "friend", thai: "เพื่อน", roman: "phêuan", en: "friend", emoji: "👫", category: "Family", level: 2 },

  // Animals
  { id: "dog", thai: "หมา", roman: "mǎa", en: "dog", emoji: "🐶", category: "Animals", level: 2 },
  { id: "cat", thai: "แมว", roman: "maaeo", en: "cat", emoji: "🐱", category: "Animals", level: 2 },
  { id: "elephant", thai: "ช้าง", roman: "cháang", en: "elephant", emoji: "🐘", category: "Animals", level: 2 },
  { id: "bird", thai: "นก", roman: "nók", en: "bird", emoji: "🐦", category: "Animals", level: 2 },
  { id: "fish_animal", thai: "ปลา", roman: "bplaa", en: "fish", emoji: "🐟", category: "Animals", level: 2 },

  // ---------- Level 3 — Elementary ----------
  // Market & shopping (combines numbers + food in real life)
  { id: "price", thai: "ราคา", roman: "raa-khaa", en: "price", emoji: "🏷️", category: "Market", level: 3 },
  { id: "howmuch", thai: "เท่าไหร่", roman: "thâo-rài", en: "how much", emoji: "❓", category: "Market", level: 3 },
  { id: "baht", thai: "บาท", roman: "bàat", en: "baht", emoji: "💵", category: "Market", level: 3 },
  { id: "expensive", thai: "แพง", roman: "phaaeng", en: "expensive", emoji: "💸", category: "Market", level: 3 },
  { id: "cheap", thai: "ถูก", roman: "thùuk", en: "cheap", emoji: "🪙", category: "Market", level: 3 },
  { id: "want", thai: "เอา", roman: "ao", en: "to want / take", emoji: "🤲", category: "Market", level: 3 },
  { id: "delicious", thai: "อร่อย", roman: "à-ràuy", en: "delicious", emoji: "😋", category: "Market", level: 3 },
  { id: "money", thai: "เงิน", roman: "ngern", en: "money", emoji: "💰", category: "Market", level: 3 },

  // Places
  { id: "house", thai: "บ้าน", roman: "bâan", en: "house", emoji: "🏠", category: "Places", level: 3 },
  { id: "school", thai: "โรงเรียน", roman: "roong-rian", en: "school", emoji: "🏫", category: "Places", level: 3 },
  { id: "market", thai: "ตลาด", roman: "dtà-làat", en: "market", emoji: "🏪", category: "Places", level: 3 },
  { id: "hospital", thai: "โรงพยาบาล", roman: "roong-phá-yaa-baan", en: "hospital", emoji: "🏥", category: "Places", level: 3 },
  { id: "restaurant", thai: "ร้านอาหาร", roman: "ráan-aa-hǎan", en: "restaurant", emoji: "🍽️", category: "Places", level: 3 },

  // Transport
  { id: "car", thai: "รถ", roman: "rót", en: "car", emoji: "🚗", category: "Transport", level: 3 },
  { id: "train", thai: "รถไฟ", roman: "rót-fai", en: "train", emoji: "🚆", category: "Transport", level: 3 },
  { id: "airplane", thai: "เครื่องบิน", roman: "khrêuang-bin", en: "airplane", emoji: "✈️", category: "Transport", level: 3 },
  { id: "boat", thai: "เรือ", roman: "reua", en: "boat", emoji: "⛵", category: "Transport", level: 3 },
  { id: "motorbike", thai: "มอเตอร์ไซค์", roman: "maaw-dter-sai", en: "motorbike", emoji: "🏍️", category: "Transport", level: 3 },

  // ---------- Level 4 — Intermediate ----------
  // Feelings
  { id: "happy", thai: "มีความสุข", roman: "mii-khwaam-sùk", en: "happy", emoji: "😊", category: "Feelings", level: 4 },
  { id: "sad", thai: "เศร้า", roman: "sâo", en: "sad", emoji: "😢", category: "Feelings", level: 4 },
  { id: "angry", thai: "โกรธ", roman: "gròot", en: "angry", emoji: "😠", category: "Feelings", level: 4 },
  { id: "tired", thai: "เหนื่อย", roman: "nèuay", en: "tired", emoji: "😫", category: "Feelings", level: 4 },
  { id: "hungry", thai: "หิว", roman: "hǐu", en: "hungry", emoji: "🍽️", category: "Feelings", level: 4 },

  // Verbs
  { id: "eat", thai: "กิน", roman: "gin", en: "to eat", emoji: "🍴", category: "Verbs", level: 4 },
  { id: "drink", thai: "ดื่ม", roman: "dèum", en: "to drink", emoji: "🥤", category: "Verbs", level: 4 },
  { id: "sleep", thai: "นอน", roman: "naawn", en: "to sleep", emoji: "😴", category: "Verbs", level: 4 },
  { id: "walk", thai: "เดิน", roman: "dern", en: "to walk", emoji: "🚶", category: "Verbs", level: 4 },
  { id: "run", thai: "วิ่ง", roman: "wîng", en: "to run", emoji: "🏃", category: "Verbs", level: 4 },

  // ---------- Level 5 — Advanced ----------
  { id: "time", thai: "เวลา", roman: "wee-laa", en: "time", emoji: "⏰", category: "Concepts", level: 5 },
  { id: "work", thai: "งาน", roman: "ngaan", en: "work", emoji: "💼", category: "Concepts", level: 5 },
  { id: "love", thai: "ความรัก", roman: "khwaam-rák", en: "love", emoji: "❤️", category: "Concepts", level: 5 },
  { id: "country", thai: "ประเทศ", roman: "bprà-thêet", en: "country", emoji: "🌍", category: "Concepts", level: 5 },
  { id: "language", thai: "ภาษา", roman: "phaa-sǎa", en: "language", emoji: "💬", category: "Concepts", level: 5 },
  { id: "book", thai: "หนังสือ", roman: "nǎng-sěu", en: "book", emoji: "📚", category: "Concepts", level: 5 },
  { id: "phone", thai: "โทรศัพท์", roman: "thoo-rá-sàp", en: "phone", emoji: "📱", category: "Concepts", level: 5 },
];

export const WORD_BY_ID: Record<string, Word> = Object.fromEntries(
  WORDS.map((w) => [w.id, w]),
);
