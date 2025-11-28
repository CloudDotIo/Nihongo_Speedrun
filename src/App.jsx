import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Trophy,
  Flame,
  ChevronRight,
  Check,
  X,
  Volume2,
  Home,
  Brain,
  RefreshCw,
  Star,
  Clock,
  Moon,
  Sun,
  Library,
  Search,
  Lock,
  Type,
  Zap,
  Stamp,
} from 'lucide-react';

// --- Curriculum Data ---
// MASSIVELY EXPANDED: Designed to actually fill 30 minutes of intense study.
// Includes drill-like repetition and vocabulary combinations.
// REFACTORED: Separated 'characters' (Kana) from 'vocabulary' (Words).
// UPDATED: Added 'kanji' field to vocabulary for Dictionary reference.

const CURRICULUM = [
  {
    id: 'day_1',
    title: 'Tag 1: Die Basis (A-Sa)',
    type: 'kana',
    time: '30 Min',
    description: 'Hiragana Zeilen A, Ka, Sa + Basis-Vokabeln.',
    characters: [
      { jp: 'あ', romaji: 'a', type: 'hiragana' },
      { jp: 'い', romaji: 'i', type: 'hiragana' },
      { jp: 'う', romaji: 'u', type: 'hiragana' },
      { jp: 'え', romaji: 'e', type: 'hiragana' },
      { jp: 'お', romaji: 'o', type: 'hiragana' },
      { jp: 'か', romaji: 'ka', type: 'hiragana' },
      { jp: 'き', romaji: 'ki', type: 'hiragana' },
      { jp: 'く', romaji: 'ku', type: 'hiragana' },
      { jp: 'け', romaji: 'ke', type: 'hiragana' },
      { jp: 'こ', romaji: 'ko', type: 'hiragana' },
      { jp: 'さ', romaji: 'sa', type: 'hiragana' },
      { jp: 'し', romaji: 'shi', type: 'hiragana' },
      { jp: 'す', romaji: 'su', type: 'hiragana' },
      { jp: 'せ', romaji: 'se', type: 'hiragana' },
      { jp: 'そ', romaji: 'so', type: 'hiragana' },
    ],
    vocabulary: [
      { jp: 'あか', kanji: '赤', romaji: 'aka', de: 'Rot' },
      { jp: 'あお', kanji: '青', romaji: 'ao', de: 'Blau' },
      { jp: 'かお', kanji: '顔', romaji: 'kao', de: 'Gesicht' },
      { jp: 'すし', kanji: '寿司', romaji: 'sushi', de: 'Sushi' },
    ],
    content: [
      // A-Row
      { char: 'あ', romaji: 'a', type: 'choice' },
      { char: 'い', romaji: 'i', type: 'choice' },
      { char: 'う', romaji: 'u', type: 'choice' },
      { char: 'え', romaji: 'e', type: 'choice' },
      { char: 'お', romaji: 'o', type: 'choice' },
      // K-Row
      { char: 'か', romaji: 'ka', type: 'choice' },
      { char: 'き', romaji: 'ki', type: 'choice' },
      { char: 'く', romaji: 'ku', type: 'choice' },
      { char: 'け', romaji: 'ke', type: 'choice' },
      { char: 'こ', romaji: 'ko', type: 'choice' },
      // S-Row (Irregular Shi)
      { char: 'さ', romaji: 'sa', type: 'choice' },
      { char: 'し', romaji: 'shi', type: 'choice' },
      { char: 'す', romaji: 'su', type: 'choice' },
      { char: 'せ', romaji: 'se', type: 'choice' },
      { char: 'そ', romaji: 'so', type: 'choice' },
      // Real Words Practice (Kana Reading)
      { char: 'あか', romaji: 'aka', type: 'choice', hint: 'Rot' }, // Red
      { char: 'あお', romaji: 'ao', type: 'choice', hint: 'Blau' }, // Blue
      { char: 'かお', romaji: 'kao', type: 'choice', hint: 'Gesicht' }, // Face
      { char: 'すし', romaji: 'sushi', type: 'choice', hint: 'Sushi' }, // Sushi
    ],
  },
  {
    id: 'day_2',
    title: 'Tag 2: Identität & Verneinung',
    type: 'sentence',
    time: '30 Min',
    description: 'X ist Y. X ist NICHT Y. Und Fragen stellen.',
    vocabulary: [
      { jp: 'わたし', kanji: '私', romaji: 'watashi', de: 'Ich' },
      { jp: 'がくせい', kanji: '学生', romaji: 'gakusei', de: 'Student' },
      { jp: 'せんせい', kanji: '先生', romaji: 'sensei', de: 'Lehrer' },
      { jp: 'これ', kanji: '', romaji: 'kore', de: 'Das hier' },
      { jp: 'にほん', kanji: '日本', romaji: 'nihon', de: 'Japan' },
      { jp: 'あなた', kanji: '', romaji: 'anata', de: 'Du' },
      {
        jp: 'アメリカじん',
        kanji: 'アメリカ人',
        romaji: 'amerikajin',
        de: 'Amerikaner',
      },
    ],
    content: [
      {
        question: 'Ich bin Student.',
        japanese: 'わたし は がくせい です',
        romaji: 'Watashi wa gakusei desu',
        blocks: ['わたし', 'は', 'がくせい', 'です', 'いぬ', 'アメリカ'],
        solution: ['わたし', 'は', 'がくせい', 'です'],
        meaning: 'I am a student',
      },
      {
        question: 'Ich bin kein Lehrer.', // Intro to Negative
        japanese: 'わたし は せんせい じゃありません',
        romaji: 'Watashi wa sensei ja arimasen',
        blocks: [
          'わたし',
          'は',
          'せんせい',
          'じゃありません',
          'です',
          'がくせい',
        ],
        solution: ['わたし', 'は', 'せんせい', 'じゃありません'],
        meaning: 'I am not a teacher',
      },
      {
        question: 'Das ist Japan.',
        japanese: 'これ は にほん です',
        romaji: 'Kore wa Nihon desu',
        blocks: ['これ', 'は', 'にほん', 'です', 'それ', 'あ'],
        solution: ['これ', 'は', 'にほん', 'です'],
        meaning: 'This is Japan',
      },
      {
        question: 'Bist du Amerikaner?', // Intro to Question Particle Ka
        japanese: 'あなた は アメリカじん です か',
        romaji: 'Anata wa amerikajin desu ka',
        blocks: ['あなた', 'は', 'アメリカじん', 'です', 'か', 'にほん'],
        solution: ['あなた', 'は', 'アメリカじん', 'です', 'か'],
        meaning: 'Are you American?',
      },
    ],
  },
  {
    id: 'day_3',
    title: 'Tag 3: Adjektive & Meinung',
    type: 'flashcard',
    time: '30 Min',
    description: 'Dinge beschreiben (i-Adjektive).',
    vocabulary: [
      { jp: 'おいしい', kanji: '美味しい', romaji: 'oishii', de: 'Lecker' },
      { jp: 'たのしい', kanji: '楽しい', romaji: 'tanoshii', de: 'Spaßig' },
      { jp: 'あつい', kanji: '暑い', romaji: 'atsui', de: 'Heiß' },
      { jp: 'さむい', kanji: '寒い', romaji: 'samui', de: 'Kalt' },
      { jp: 'たかい', kanji: '高い', romaji: 'takai', de: 'Teuer/Hoch' },
      { jp: 'やすい', kanji: '安い', romaji: 'yasui', de: 'Billig' },
      { jp: 'いい', kanji: '良い', romaji: 'ii', de: 'Gut' },
      { jp: 'わるい', kanji: '悪い', romaji: 'warui', de: 'Schlecht' },
    ],
    content: [
      { front: 'おいしい', back: 'Oishii (Lecker)', reading: 'おいしい' },
      { front: 'たのしい', back: 'Tanoshii (Spaßig)', reading: 'たのしい' },
      { front: 'あつい', back: 'Atsui (Heiß)', reading: 'あつい' },
      { front: 'さむい', back: 'Samui (Kalt)', reading: 'さむい' },
      { front: 'たかい', back: 'Takai (Teuer/Hoch)', reading: 'たかい' },
      { front: 'やすい', back: 'Yasui (Billig)', reading: 'やすい' },
      { front: 'いい', back: 'Ii (Gut)', reading: 'いい' },
      { front: 'わるい', back: 'Warui (Schlecht)', reading: 'わるい' },
    ],
  },
  {
    id: 'day_4',
    title: 'Tag 4: Alltag (Verben)',
    type: 'sentence',
    time: '30 Min',
    description: 'Essen, Trinken, Sehen, Tun (Masu-Form).',
    vocabulary: [
      { jp: 'たべます', kanji: '食べます', romaji: 'tabemasu', de: 'Essen' },
      { jp: 'のみます', kanji: '飲みます', romaji: 'nomimasu', de: 'Trinken' },
      { jp: 'みます', kanji: '見ます', romaji: 'mimasu', de: 'Sehen' },
      {
        jp: 'べんきょうします',
        kanji: '勉強します',
        romaji: 'benkyoushimasu',
        de: 'Lernen',
      },
      { jp: 'コーヒー', kanji: '珈琲', romaji: 'koohii', de: 'Kaffee' }, // Kanji for coffee is rare but cool trivia
      { jp: 'えいが', kanji: '映画', romaji: 'eiga', de: 'Film' },
      { jp: 'にほんご', kanji: '日本語', romaji: 'nihongo', de: 'Japanisch' },
    ],
    content: [
      {
        question: 'Ich esse Sushi.',
        japanese: 'わたし は すし を たべます',
        romaji: 'Watashi wa sushi o tabemasu',
        blocks: ['わたし', 'は', 'すし', 'を', 'たべます', 'のみます'],
        solution: ['わたし', 'は', 'すし', 'を', 'たべます'],
        meaning: 'I eat sushi',
      },
      {
        question: 'Ich trinke keinen Kaffee.', // Negative Verb
        japanese: 'わたし は コーヒー を のみません',
        romaji: 'Watashi wa koohii o nomimasen',
        blocks: [
          'わたし',
          'は',
          'コーヒー',
          'を',
          'のみません',
          'のみます',
          'みず',
        ],
        solution: ['わたし', 'は', 'コーヒー', 'を', 'のみません'],
        meaning: 'I do not drink coffee',
      },
      {
        question: 'Ich sehe einen Film.',
        japanese: 'わたし は えいが を みます',
        romaji: 'Watashi wa eiga o mimasu',
        blocks: ['わたし', 'は', 'えいが', 'を', 'みます', 'たべます', '本'],
        solution: ['わたし', 'は', 'えいが', 'を', 'みます'],
        meaning: 'I watch a movie',
      },
      {
        question: 'Ich lerne Japanisch.',
        japanese: 'わたし は にほんご を べんきょうします',
        romaji: 'Watashi wa nihongo o benkyoushimasu',
        blocks: [
          'わたし',
          'は',
          'にほんご',
          'を',
          'べんきょうします',
          'みます',
          'えいご',
        ],
        solution: ['わたし', 'は', 'にほんご', 'を', 'べんきょうします'],
        meaning: 'I study Japanese',
      },
    ],
  },
  {
    id: 'day_5',
    title: 'Tag 5: Zeit & Ort',
    type: 'sentence',
    time: '30 Min',
    description: 'Wann, Wohin, Womit? (Ni, De, To Partikel).',
    vocabulary: [
      { jp: 'きょう', kanji: '今日', romaji: 'kyou', de: 'Heute' },
      { jp: 'いきます', kanji: '行きます', romaji: 'ikimasu', de: 'Gehen' },
      { jp: 'うち', kanji: '家', romaji: 'uchi', de: 'Zuhause' },
      { jp: 'ともだち', kanji: '友達', romaji: 'tomodachi', de: 'Freund' },
      {
        jp: 'はなします',
        kanji: '話します',
        romaji: 'hanashimasu',
        de: 'Sprechen',
      },
    ],
    content: [
      {
        question: 'Ich gehe heute nach Japan.', // Adding Time "Kyou"
        japanese: 'わたし は きょう にほん に いきます',
        romaji: 'Watashi wa kyou nihon ni ikimasu',
        blocks: [
          'わたし',
          'は',
          'きょう',
          'にほん',
          'に',
          'いきます',
          'あした',
          'を',
        ],
        solution: ['わたし', 'は', 'きょう', 'にほん', 'に', 'いきます'],
        meaning: 'I go to Japan today',
      },
      {
        question: 'Ich esse zu Hause.', // Place of Action (De)
        japanese: 'わたし は うち で たべます',
        romaji: 'Watashi wa uchi de tabemasu',
        blocks: ['わたし', 'は', 'うち', 'で', 'たべます', 'に', 'いきます'],
        solution: ['わたし', 'は', 'うち', 'で', 'たべます'],
        meaning: 'I eat at home',
      },
      {
        question: 'Ich spreche mit einem Freund.', // Companion (To)
        japanese: 'わたし は ともだち と はなします',
        romaji: 'Watashi wa tomodachi to hanashimasu',
        blocks: [
          'わたし',
          'は',
          'ともだち',
          'と',
          'はなします',
          'で',
          'みます',
        ],
        solution: ['わたし', 'は', 'ともだち', 'と', 'はなします'],
        meaning: 'I speak with a friend',
      },
    ],
  },
  {
    id: 'day_6',
    title: 'Tag 6: Katakana & Loanwords',
    type: 'kana',
    time: '30 Min',
    description: 'Für Fremdwörter. A, K, S Reihen.',
    characters: [
      { jp: 'ア', romaji: 'a', type: 'katakana' },
      { jp: 'イ', romaji: 'i', type: 'katakana' },
      { jp: 'カ', romaji: 'ka', type: 'katakana' },
      { jp: 'キ', romaji: 'ki', type: 'katakana' },
      { jp: 'サ', romaji: 'sa', type: 'katakana' },
      { jp: 'シ', romaji: 'shi', type: 'katakana' },
    ],
    vocabulary: [
      { jp: 'カメラ', kanji: '', romaji: 'kamera', de: 'Kamera' },
      { jp: 'スキー', kanji: '', romaji: 'sukii', de: 'Ski' },
    ],
    content: [
      { char: 'ア', romaji: 'a', type: 'choice' },
      { char: 'イ', romaji: 'i', type: 'choice' },
      { char: 'カ', romaji: 'ka', type: 'choice' },
      { char: 'キ', romaji: 'ki', type: 'choice' },
      { char: 'サ', romaji: 'sa', type: 'choice' },
      { char: 'シ', romaji: 'shi', type: 'choice' },
      { char: 'カメラ', romaji: 'kamera', type: 'choice', hint: 'Kamera' },
      { char: 'スキー', romaji: 'sukii', type: 'choice', hint: 'Ski' },
    ],
  },
  {
    id: 'day_7',
    title: 'Tag 7: Der erste Boss',
    type: 'boss',
    time: '45 Min',
    description: 'Verbinde Sätze mit "Soshite" (Und dann).',
    vocabulary: [
      { jp: 'とうきょう', kanji: '東京', romaji: 'toukyou', de: 'Tokio' },
      { jp: 'そして', kanji: '', romaji: 'soshite', de: 'Und dann' },
    ],
    content: [
      {
        question: 'Das Sushi ist lecker.',
        japanese: 'すし は おいしい です',
        romaji: 'Sushi wa oishii desu',
        blocks: ['すし', 'は', 'おいしい', 'です', 'まずい'],
        solution: ['すし', 'は', 'おいしい', 'です'],
        meaning: 'Sushi is delicious',
      },
      {
        question: 'Ich gehe nach Tokio und esse Sushi.',
        japanese: 'とうきょう に いきます。 そして すし を たべます。',
        romaji: 'Toukyou ni ikimasu. Soshite sushi o tabemasu.',
        blocks: [
          'とうきょう',
          'に',
          'いきます',
          'そして',
          'すし',
          'を',
          'たべます',
          'が',
          'か',
        ],
        solution: [
          'とうきょう',
          'に',
          'いきます',
          'そして',
          'すし',
          'を',
          'たべます',
        ],
        meaning: 'I go to Tokyo. And then I eat Sushi.',
      },
    ],
  },
  {
    id: 'day_30',
    title: 'Tag 30: Kanji & Transport',
    type: 'sentence',
    time: '30 Min',
    description: 'Kanji-Debüt: Mit dem Zug zur Arbeit.',
    vocabulary: [
      { jp: '電車', kanji: '電車', romaji: 'densha', de: 'Zug' },
      { jp: '学校', kanji: '学校', romaji: 'gakkou', de: 'Schule' },
      {
        jp: '行きます',
        kanji: '行きます',
        romaji: 'ikimasu',
        de: 'Gehen (höflich)',
      },
      { jp: 'で', kanji: '', romaji: 'de', de: 'Mit (Transportmittel)' },
    ],
    content: [
      {
        question: 'Ich gehe zur Schule.',
        japanese: '学校 に 行きます',
        romaji: 'Gakkou ni ikimasu',
        blocks: ['学校', 'に', '行きます', '電車', 'へ'],
        solution: ['学校', 'に', '行きます'],
        meaning: 'I go to school.',
      },
      {
        question: 'Ich fahre mit dem Zug.',
        japanese: '電車 で 行きます',
        romaji: 'Densha de ikimasu',
        blocks: ['電車', 'で', '行きます', '学校', 'に'],
        solution: ['電車', 'で', '行きます'],
        meaning: 'I go by train.',
      },
      {
        question: 'Ich fahre mit dem Zug zur Schule.',
        japanese: '電車 で 学校 に 行きます',
        romaji: 'Densha de gakkou ni ikimasu',
        blocks: ['電車', 'で', '学校', 'に', '行きます', 'へ', 'を'],
        solution: ['電車', 'で', '学校', 'に', '行きます'],
        meaning: 'I go to school by train.',
      },
    ],
  },
];

// --- KANJI DECKS Data ---
const KANJI_DECKS = [
  {
    id: 'n5_numbers',
    title: 'JLPT N5: Zahlen',
    description: 'Eins bis Zehn & Hundert. Absolut essenziell.',
    cards: [
      {
        kanji: '一',
        onyomi: 'イチ (ichi)',
        kunyomi: 'ひと (hito)',
        meaning: 'Eins',
        examples: '一つ (Hitotsu - 1 Ding)',
      },
      {
        kanji: '二',
        onyomi: 'ニ (ni)',
        kunyomi: 'ふた (futa)',
        meaning: 'Zwei',
        examples: '二月 (Nigatsu - Februar)',
      },
      {
        kanji: '三',
        onyomi: 'サン (san)',
        kunyomi: 'みっ (mi)',
        meaning: 'Drei',
        examples: '三日 (Mikka - 3. Tag)',
      },
      {
        kanji: '四',
        onyomi: 'シ (shi)',
        kunyomi: 'よん (yon)',
        meaning: 'Vier',
        examples: '四年 (Yonen - 4 Jahre)',
      },
      {
        kanji: '五',
        onyomi: 'ゴ (go)',
        kunyomi: 'いつ (itsu)',
        meaning: 'Fünf',
        examples: '五円 (Goen - 5 Yen)',
      },
      {
        kanji: '六',
        onyomi: 'ロク (roku)',
        kunyomi: 'むっ (mu)',
        meaning: 'Sechs',
        examples: '六本 (Roppon - 6 Stifte)',
      },
      {
        kanji: '七',
        onyomi: 'シチ (shichi)',
        kunyomi: 'なな (nana)',
        meaning: 'Sieben',
        examples: '七月 (Shichigatsu - Juli)',
      },
      {
        kanji: '八',
        onyomi: 'ハチ (hachi)',
        kunyomi: 'やっ (ya)',
        meaning: 'Acht',
        examples: '八百屋 (Yaoya - Gemüseladen)',
      },
      {
        kanji: '九',
        onyomi: 'キュウ (kyuu)',
        kunyomi: 'ここの (kokono)',
        meaning: 'Neun',
        examples: '九時 (Kuji - 9 Uhr)',
      },
      {
        kanji: '十',
        onyomi: 'ジュウ (juu)',
        kunyomi: 'とお (too)',
        meaning: 'Zehn',
        examples: '十分 (Juppun - 10 Min)',
      },
    ],
  },
  {
    id: 'n5_time',
    title: 'JLPT N5: Zeit',
    description: 'Tag, Monat, Jahr, Zeitspanne.',
    cards: [
      {
        kanji: '日',
        onyomi: 'ニチ (nichi)',
        kunyomi: 'ひ (hi)',
        meaning: 'Tag / Sonne',
        examples: '日曜日 (Nichiyoubi - Sonntag)',
      },
      {
        kanji: '月',
        onyomi: 'ガツ (gatsu)',
        kunyomi: 'つき (tsuki)',
        meaning: 'Monat / Mond',
        examples: '一月 (Ichigatsu - Januar)',
      },
      {
        kanji: '年',
        onyomi: 'ネン (nen)',
        kunyomi: 'とし (toshi)',
        meaning: 'Jahr',
        examples: '去年 (Kyonen - Letztes Jahr)',
      },
      {
        kanji: '時',
        onyomi: 'ジ (ji)',
        kunyomi: 'とき (toki)',
        meaning: 'Zeit / Uhr',
        examples: '時間 (Jikan - Zeitspanne)',
      },
      {
        kanji: '分',
        onyomi: 'フン (fun)',
        kunyomi: 'わ (wa)',
        meaning: 'Minute / Teil',
        examples: '半分 (Hanbun - Hälfte)',
      },
    ],
  },
  {
    id: 'n5_nature',
    title: 'JLPT N5: Natur',
    description: 'Elemente: Feuer, Wasser, Baum, Berg.',
    cards: [
      {
        kanji: '木',
        onyomi: 'モク (moku)',
        kunyomi: 'き (ki)',
        meaning: 'Baum / Holz',
        examples: '木曜日 (Mokuyoubi - Donnerstag)',
      },
      {
        kanji: '山',
        onyomi: 'サン (san)',
        kunyomi: 'やま (yama)',
        meaning: 'Berg',
        examples: '富士山 (Fujisan - Mt. Fuji)',
      },
      {
        kanji: '川',
        onyomi: 'セン (sen)',
        kunyomi: 'かわ (kawa)',
        meaning: 'Fluss',
        examples: '川口 (Kawaguchi - Ortsname)',
      },
      {
        kanji: '田',
        onyomi: 'デン (den)',
        kunyomi: 'た (ta)',
        meaning: 'Reisfeld',
        examples: '田中 (Tanaka - Name)',
      },
      {
        kanji: '人',
        onyomi: 'ジン (jin)',
        kunyomi: 'ひと (hito)',
        meaning: 'Mensch',
        examples: '日本人 (Nihonjin - Japaner)',
      },
    ],
  },
];

// Full Reference Arrays
const ALL_HIRAGANA = [
  { jp: 'あ', romaji: 'a' },
  { jp: 'い', romaji: 'i' },
  { jp: 'う', romaji: 'u' },
  { jp: 'え', romaji: 'e' },
  { jp: 'お', romaji: 'o' },
  { jp: 'か', romaji: 'ka' },
  { jp: 'き', romaji: 'ki' },
  { jp: 'く', romaji: 'ku' },
  { jp: 'け', romaji: 'ke' },
  { jp: 'こ', romaji: 'ko' },
  { jp: 'さ', romaji: 'sa' },
  { jp: 'し', romaji: 'shi' },
  { jp: 'す', romaji: 'su' },
  { jp: 'せ', romaji: 'se' },
  { jp: 'そ', romaji: 'so' },
  { jp: 'た', romaji: 'ta' },
  { jp: 'ち', romaji: 'chi' },
  { jp: 'つ', romaji: 'tsu' },
  { jp: 'て', romaji: 'te' },
  { jp: 'と', romaji: 'to' },
  { jp: 'な', romaji: 'na' },
  { jp: 'に', romaji: 'ni' },
  { jp: 'ぬ', romaji: 'nu' },
  { jp: 'ね', romaji: 'ne' },
  { jp: 'の', romaji: 'no' },
  { jp: 'は', romaji: 'ha' },
  { jp: 'ひ', romaji: 'hi' },
  { jp: 'ふ', romaji: 'fu' },
  { jp: 'へ', romaji: 'he' },
  { jp: 'ほ', romaji: 'ho' },
  { jp: 'ま', romaji: 'ma' },
  { jp: 'み', romaji: 'mi' },
  { jp: 'む', romaji: 'mu' },
  { jp: 'め', romaji: 'me' },
  { jp: 'も', romaji: 'mo' },
  { jp: 'や', romaji: 'ya' },
  { jp: '', romaji: '' },
  { jp: 'ゆ', romaji: 'yu' },
  { jp: '', romaji: '' },
  { jp: 'よ', romaji: 'yo' },
  { jp: 'ら', romaji: 'ra' },
  { jp: 'り', romaji: 'ri' },
  { jp: 'る', romaji: 'ru' },
  { jp: 'れ', romaji: 're' },
  { jp: 'ろ', romaji: 'ro' },
  { jp: 'わ', romaji: 'wa' },
  { jp: '', romaji: '' },
  { jp: 'を', romaji: 'wo' },
  { jp: '', romaji: '' },
  { jp: 'ん', romaji: 'n' },
];

const ALL_KATAKANA = [
  { jp: 'ア', romaji: 'a' },
  { jp: 'イ', romaji: 'i' },
  { jp: 'ウ', romaji: 'u' },
  { jp: 'エ', romaji: 'e' },
  { jp: 'オ', romaji: 'o' },
  { jp: 'カ', romaji: 'ka' },
  { jp: 'キ', romaji: 'ki' },
  { jp: 'ク', romaji: 'ku' },
  { jp: 'ケ', romaji: 'ke' },
  { jp: 'コ', romaji: 'ko' },
  { jp: 'サ', romaji: 'sa' },
  { jp: 'シ', romaji: 'shi' },
  { jp: 'ス', romaji: 'su' },
  { jp: 'セ', romaji: 'se' },
  { jp: 'ソ', romaji: 'so' },
  { jp: 'タ', romaji: 'ta' },
  { jp: 'チ', romaji: 'chi' },
  { jp: 'ツ', romaji: 'tsu' },
  { jp: 'テ', romaji: 'te' },
  { jp: 'ト', romaji: 'to' },
  { jp: 'ナ', romaji: 'na' },
  { jp: 'ニ', romaji: 'ni' },
  { jp: 'ヌ', romaji: 'nu' },
  { jp: 'ネ', romaji: 'ne' },
  { jp: 'ノ', romaji: 'no' },
  { jp: 'ハ', romaji: 'ha' },
  { jp: 'ヒ', romaji: 'hi' },
  { jp: 'フ', romaji: 'fu' },
  { jp: 'ヘ', romaji: 'he' },
  { jp: 'ホ', romaji: 'ho' },
  { jp: 'マ', romaji: 'ma' },
  { jp: 'ミ', romaji: 'mi' },
  { jp: 'ム', romaji: 'mu' },
  { jp: 'メ', romaji: 'me' },
  { jp: 'モ', romaji: 'mo' },
  { jp: 'ヤ', romaji: 'ya' },
  { jp: '', romaji: '' },
  { jp: 'ユ', romaji: 'yu' },
  { jp: '', romaji: '' },
  { jp: 'ヨ', romaji: 'yo' },
  { jp: 'ラ', romaji: 'ra' },
  { jp: 'リ', romaji: 'ri' },
  { jp: 'ル', romaji: 'ru' },
  { jp: 'レ', romaji: 're' },
  { jp: 'ロ', romaji: 'ro' },
  { jp: 'ワ', romaji: 'wa' },
  { jp: '', romaji: '' },
  { jp: 'ヲ', romaji: 'wo' },
  { jp: '', romaji: '' },
  { jp: 'ン', romaji: 'n' },
];

// --- Utilities ---

const speak = (text) => {
  if (!window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
};

// --- Components ---

const ProgressBar = ({ current, total }) => (
  <div className="w-full bg-slate-700 rounded-full h-2.5 mb-6">
    <div
      className="bg-rose-500 h-2.5 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(244,63,94,0.5)]"
      style={{ width: `${(current / total) * 100}%` }}
    ></div>
  </div>
);

// --- Main App ---

export default function JapaneseApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [completedLessons, setCompletedLessons] = useState([]);
  const [xp, setXP] = useState(1250);
  const [streak, setStreak] = useState(3);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Lesson State
  const [lessonIndex, setLessonIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState([]);
  const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect', null
  const [isFlipped, setIsFlipped] = useState(false); // For flashcards

  // Kanji Practice State
  const [kanjiSession, setKanjiSession] = useState(null); // { deckId: string, queue: array }
  const [currentKanjiIndex, setCurrentKanjiIndex] = useState(0);
  const [isKanjiFlipped, setIsKanjiFlipped] = useState(false);

  // --- Logic ---

  const startLesson = (lesson) => {
    setCurrentLesson(lesson);
    setLessonIndex(0);
    setUserAnswer([]);
    setFeedback(null);
    setIsFlipped(false);
  };

  const handleKanaChoice = (choice) => {
    const currentTask = currentLesson.content[lessonIndex];
    const correct = choice === currentTask.romaji;

    if (correct) {
      setFeedback('correct');
      speak(currentTask.char);
      playSuccess();
    } else {
      setFeedback('incorrect');
      playError();
    }
  };

  const handleBlockClick = (block) => {
    if (feedback) return;
    setUserAnswer([...userAnswer, block]);
    speak(block);
  };

  const removeBlock = (index) => {
    if (feedback) return;
    const newAns = [...userAnswer];
    newAns.splice(index, 1);
    setUserAnswer(newAns);
  };

  const checkSentence = () => {
    const currentTask = currentLesson.content[lessonIndex];
    const isCorrect =
      JSON.stringify(userAnswer) === JSON.stringify(currentTask.solution);

    if (isCorrect) {
      setFeedback('correct');
      speak(currentTask.japanese);
      playSuccess();
    } else {
      setFeedback('incorrect');
      playError();
    }
  };

  const nextTask = () => {
    if (lessonIndex < currentLesson.content.length - 1) {
      setLessonIndex(lessonIndex + 1);
      setUserAnswer([]);
      setFeedback(null);
      setIsFlipped(false);
    } else {
      completeLesson();
    }
  };

  const completeLesson = () => {
    if (!completedLessons.includes(currentLesson.id)) {
      setCompletedLessons([...completedLessons, currentLesson.id]);
      setXP(xp + 150);
    }
    setCurrentLesson(null);
  };

  // --- Kanji Session Logic ---
  const startKanjiSession = (deck) => {
    // Shuffle deck for the session
    const shuffledQueue = [...deck.cards].sort(() => 0.5 - Math.random());
    setKanjiSession({
      deckId: deck.id,
      title: deck.title,
      queue: shuffledQueue,
    });
    setCurrentKanjiIndex(0);
    setIsKanjiFlipped(false);
  };

  const handleKanjiResponse = (difficulty) => {
    // Logic: If 'hard' (again), push to end of queue. If 'good' or 'easy', move to next.
    const currentCard = kanjiSession.queue[currentKanjiIndex];
    let newQueue = [...kanjiSession.queue];

    if (difficulty === 'again') {
      newQueue.push(currentCard); // Re-queue at end
    }

    // Move forward
    if (currentKanjiIndex < newQueue.length - 1) {
      setKanjiSession({ ...kanjiSession, queue: newQueue }); // Update queue if it changed
      setCurrentKanjiIndex(currentKanjiIndex + 1);
      setIsKanjiFlipped(false);
    } else {
      // Session Complete
      setKanjiSession(null);
      setXP(xp + 100);
      // Optional: Show celebration
    }
  };

  const playSuccess = () => {};
  const playError = () => {};

  // --- Sub-Components for Views ---

  const renderHome = () => (
    <div className="space-y-6 pb-24 animate-fade-in">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-rose-600 via-rose-500 to-orange-500 p-6 rounded-3xl text-white shadow-lg shadow-rose-900/50 border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Brain size={120} />
        </div>
        <h2 className="text-2xl font-bold mb-1 relative z-10">
          Dein 30-Min Plan
        </h2>
        <p className="opacity-90 relative z-10">
          Konsistenz schlägt Intensität.
        </p>

        <div className="mt-6 flex gap-4 relative z-10">
          <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-3 flex-1 flex items-center gap-3 border border-white/10">
            <div className="bg-white/10 p-2 rounded-xl">
              <Clock className="text-white" size={18} />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider opacity-75 font-bold">
                Heute
              </div>
              <div className="font-bold text-sm">0 / 30 Min</div>
            </div>
          </div>
          <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-3 flex-1 flex items-center gap-3 border border-white/10">
            <div className="bg-orange-500/20 p-2 rounded-xl">
              <Flame
                className="text-orange-400"
                size={18}
                fill="currentColor"
              />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider opacity-75 font-bold">
                Streak
              </div>
              <div className="font-bold text-sm">{streak} Tage</div>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum List */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-400 text-sm uppercase tracking-wider px-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]"></span>
          Woche 1
        </h3>
        {CURRICULUM.map((lesson, idx) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isLocked = false;
          const isPreview = lesson.id === 'day_30';

          return (
            <button
              key={lesson.id}
              onClick={() => !isLocked && startLesson(lesson)}
              disabled={isLocked}
              className={`w-full text-left group relative overflow-hidden rounded-2xl border transition-all duration-300
                ${
                  isLocked
                    ? 'border-slate-800 bg-slate-900/50 opacity-40 cursor-not-allowed'
                    : isCompleted
                    ? 'border-green-500/30 bg-green-500/10 hover:bg-green-500/20'
                    : isPreview
                    ? 'border-yellow-500/30 bg-yellow-500/5 hover:border-yellow-500/50'
                    : 'border-slate-700 bg-slate-800 hover:border-rose-500/50 hover:bg-slate-750 hover:translate-x-1'
                }
              `}
            >
              <div className="p-4 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  {/* Icon Box */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg shrink-0 transition-colors
                    ${
                      isCompleted
                        ? 'bg-green-500 text-slate-900'
                        : isLocked
                        ? 'bg-slate-800 text-slate-600'
                        : isPreview
                        ? 'bg-yellow-500/20 text-yellow-500'
                        : 'bg-slate-700 text-rose-400 group-hover:bg-rose-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                    }
                  `}
                  >
                    {isCompleted ? (
                      <Check size={20} strokeWidth={3} />
                    ) : isPreview ? (
                      <Zap size={20} fill="currentColor" />
                    ) : (
                      idx + 1
                    )}
                  </div>

                  {/* Text Content */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4
                        className={`font-bold ${
                          isLocked
                            ? 'text-slate-500'
                            : 'text-slate-200 group-hover:text-white'
                        }`}
                      >
                        {lesson.title}
                      </h4>
                      {!isLocked && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 border rounded-md ${
                            isPreview
                              ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500'
                              : 'bg-slate-700 border-slate-600 text-slate-300'
                          }`}
                        >
                          {lesson.time}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1 group-hover:text-slate-300">
                      {lesson.description}
                    </p>
                  </div>
                </div>

                {/* Right Arrow */}
                {!isLocked && (
                  <div className="text-slate-600 group-hover:text-rose-500 group-hover:translate-x-1 transition-all">
                    {isCompleted ? (
                      <RefreshCw size={18} />
                    ) : (
                      <ChevronRight size={20} />
                    )}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderActiveLesson = () => {
    const task = currentLesson.content[lessonIndex];
    const progress = (lessonIndex / currentLesson.content.length) * 100;

    return (
      <div className="flex flex-col h-full">
        {/* Lesson Header */}
        <div className="flex items-center gap-4 mb-6 pt-2">
          <button
            onClick={() => setCurrentLesson(null)}
            className="p-2 -ml-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
          <div className="flex-1">
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div
                className="bg-rose-500 h-2 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(244,63,94,0.5)]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Lesson Content Area */}
        <div className="flex-1 flex flex-col justify-center items-center relative overflow-y-auto pb-32 no-scrollbar">
          {/* ... existing lesson content ... */}
          {/* Note: I am collapsing this part to focus on Kanji implementation, assuming the lesson logic remains similar. 
              The actual implementation requires the full switch case as before. */}
          {/* KANA TYPE LESSON */}
          {currentLesson.type === 'kana' && (
            <div className="text-center w-full max-w-sm animate-fade-in">
              <div className="text-slate-400 mb-6 text-xs font-bold tracking-[0.2em] uppercase">
                Wie liest man das?
              </div>
              <div className="bg-slate-800 rounded-3xl border border-slate-700 p-12 mb-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-8xl font-black text-white relative z-10">
                  {task.char}
                </span>
                {task.hint && (
                  <div className="absolute bottom-4 left-0 right-0 text-slate-500 text-sm font-bold">
                    {task.hint}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                {(() => {
                  const pool = [
                    'a',
                    'i',
                    'u',
                    'e',
                    'o',
                    'ka',
                    'ki',
                    'ku',
                    'ke',
                    'ko',
                    'sa',
                    'shi',
                    'su',
                    'se',
                    'so',
                    'ta',
                    'chi',
                    'tsu',
                    'te',
                    'to',
                    'na',
                    'ni',
                    'nu',
                    'ne',
                    'no',
                    'hallo',
                    'rot',
                    'blau',
                    'sushi',
                    'kamera',
                  ];
                  const wrong = pool
                    .filter((p) => p !== task.romaji)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3);
                  const choices = [...wrong, task.romaji].sort(
                    () => 0.5 - Math.random()
                  );

                  return choices.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleKanaChoice(opt)}
                      disabled={feedback !== null}
                      className={`p-6 rounded-2xl text-2xl font-bold border-b-4 transition-all active:border-b-0 active:translate-y-1 overflow-hidden text-ellipsis whitespace-nowrap
                          ${
                            feedback === 'correct' && opt === task.romaji
                              ? 'bg-green-500 border-green-700 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                              : feedback === 'incorrect' && opt !== task.romaji
                              ? 'bg-slate-800 border-slate-700 text-slate-600 opacity-50'
                              : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-slate-600'
                          }
                        `}
                    >
                      {opt}
                    </button>
                  ));
                })()}
              </div>
            </div>
          )}

          {/* FLASHCARD TYPE LESSON */}
          {currentLesson.type === 'flashcard' && (
            <div className="w-full max-w-sm animate-fade-in">
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="cursor-pointer perspective-1000 w-full h-96 relative group"
              >
                <div
                  className={`w-full h-full absolute transition-all duration-500 preserve-3d rounded-3xl shadow-2xl border border-slate-700 bg-slate-800 flex flex-col items-center justify-center p-6 ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  <div className="absolute backface-hidden flex flex-col items-center gap-6 w-full h-full justify-center">
                    <span className="text-7xl font-black text-white">
                      {task.front}
                    </span>
                    <p className="text-rose-400 text-xs font-bold uppercase tracking-widest border border-rose-500/30 px-3 py-1 rounded-full bg-rose-500/10">
                      Tap to flip
                    </p>
                  </div>
                  <div className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center bg-slate-800 rounded-3xl border border-rose-500/30">
                    <div className="absolute inset-0 bg-rose-500/5 rounded-3xl pointer-events-none" />
                    <span className="text-5xl font-black text-rose-400 mb-4">
                      {task.reading}
                    </span>
                    <span className="text-xl font-medium text-slate-300">
                      {task.back}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speak(task.reading);
                      }}
                      className="mt-8 p-4 bg-slate-700 rounded-full text-rose-400 hover:bg-rose-500 hover:text-white transition-all shadow-lg hover:shadow-rose-500/40"
                    >
                      <Volume2 size={28} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-12 flex gap-4">
                <button
                  onClick={nextTask}
                  className="flex-1 py-4 bg-green-500 text-slate-900 font-bold rounded-2xl shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:bg-green-400 active:scale-95 transition-all"
                >
                  Ich wusste es
                </button>
                <button
                  onClick={nextTask}
                  className="flex-1 py-4 bg-slate-700 text-slate-300 font-bold rounded-2xl hover:bg-slate-600 active:scale-95 transition-all"
                >
                  Noch mal
                </button>
              </div>
            </div>
          )}

          {/* SENTENCE / BOSS TYPE LESSON */}
          {(currentLesson.type === 'sentence' ||
            currentLesson.type === 'boss') && (
            <div className="w-full max-w-md animate-fade-in">
              <div className="mb-10 text-center">
                <h3 className="text-slate-400 font-bold mb-3 text-xs uppercase tracking-widest">
                  Übersetze diesen Satz
                </h3>
                <p className="text-2xl text-white font-medium leading-relaxed">
                  {task.question}
                </p>
              </div>
              <div className="min-h-[100px] bg-slate-800/50 rounded-2xl border border-slate-700 mb-8 flex flex-wrap gap-2 items-center justify-center p-4 content-center">
                {userAnswer.map((block, idx) => (
                  <button
                    key={idx}
                    onClick={() => removeBlock(idx)}
                    className="bg-slate-700 border-b-2 border-slate-600 text-white px-4 py-2 rounded-xl font-bold shadow-md text-lg animate-pop-in hover:bg-rose-500 hover:border-rose-700 transition-colors"
                  >
                    {block}
                  </button>
                ))}
                {userAnswer.length === 0 && (
                  <span className="text-slate-600 italic text-sm">
                    Tippe auf die Wörter unten...
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                {task.blocks.map((block, idx) => {
                  return (
                    <button
                      key={idx}
                      onClick={() => handleBlockClick(block)}
                      className="bg-slate-800 border-b-4 border-slate-900 active:border-b-0 active:translate-y-1 text-slate-200 px-5 py-3 rounded-xl font-bold text-lg hover:bg-slate-700 hover:text-white hover:border-slate-800 transition-all shadow-lg"
                    >
                      {block}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Feedback / Control Footer */}
        <div
          className={`fixed bottom-0 left-0 right-0 p-6 border-t border-slate-800 z-20 transition-transform duration-300 backdrop-blur-xl
          ${feedback ? 'translate-y-0' : 'translate-y-full'} 
          ${
            feedback === 'correct'
              ? 'bg-green-900/90 border-t-green-800'
              : 'bg-red-900/90 border-t-red-800'
          }
        `}
        >
          <div className="max-w-md mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  feedback === 'correct'
                    ? 'bg-green-500 text-slate-900'
                    : 'bg-white text-red-500'
                } shadow-lg`}
              >
                {feedback === 'correct' ? (
                  <Check size={28} strokeWidth={3} />
                ) : (
                  <X size={28} strokeWidth={3} />
                )}
              </div>
              <div>
                <div
                  className={`font-bold text-lg ${
                    feedback === 'correct' ? 'text-green-400' : 'text-white'
                  }`}
                >
                  {feedback === 'correct' ? 'Ausgezeichnet!' : 'Nicht ganz...'}
                </div>
                {feedback === 'incorrect' && currentLesson.type !== 'kana' && (
                  <div className="text-red-200 text-sm mt-1 font-mono bg-red-950/50 px-2 py-1 rounded inline-block">
                    Lösung: {task.japanese}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={nextTask}
              className={`px-8 py-3 rounded-xl font-bold text-slate-900 shadow-lg transition-transform active:scale-95 ${
                feedback === 'correct'
                  ? 'bg-white hover:bg-green-50'
                  : 'bg-white hover:bg-red-50'
              }`}
            >
              Weiter
            </button>
          </div>
        </div>

        {/* Default Check Button (When no feedback shown) */}
        {!feedback &&
          currentLesson.type !== 'flashcard' &&
          currentLesson.type !== 'kana' && (
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/80 backdrop-blur-md border-t border-slate-800">
              <div className="max-w-md mx-auto">
                <button
                  onClick={checkSentence}
                  disabled={userAnswer.length === 0}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-lg
                   ${
                     userAnswer.length > 0
                       ? 'bg-rose-500 text-white shadow-rose-500/30 active:scale-95 hover:bg-rose-400'
                       : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                   }
                 `}
                >
                  Überprüfen
                </button>
              </div>
            </div>
          )}
      </div>
    );
  };

  const renderKanjiPractice = () => {
    // View 1: Deck Selection
    if (!kanjiSession) {
      return (
        <div className="space-y-6 pb-24 animate-fade-in">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 rounded-3xl border border-slate-700 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Stamp size={120} />
            </div>
            <h2 className="text-2xl font-bold mb-1 text-white relative z-10">
              Kanji Decks
            </h2>
            <p className="text-blue-100 text-sm relative z-10">
              Wähle ein Deck und übe im Anki-Style.
            </p>
          </div>

          <div className="space-y-3">
            {KANJI_DECKS.map((deck) => (
              <button
                key={deck.id}
                onClick={() => startKanjiSession(deck)}
                className="w-full bg-slate-800 p-5 rounded-2xl border border-slate-700 text-left hover:bg-slate-750 hover:border-blue-500/50 transition-all group shadow-sm active:scale-[0.98]"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">
                    {deck.title}
                  </h3>
                  <div className="bg-slate-900 px-3 py-1 rounded-full text-xs font-bold text-slate-400">
                    {deck.cards.length} Karten
                  </div>
                </div>
                <p className="text-sm text-slate-400">{deck.description}</p>
              </button>
            ))}
          </div>
        </div>
      );
    }

    // View 2: Active Session
    const currentCard = kanjiSession.queue[currentKanjiIndex];
    const progress = (currentKanjiIndex / kanjiSession.queue.length) * 100;

    return (
      <div className="flex flex-col h-full animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 pt-2">
          <button
            onClick={() => setKanjiSession(null)}
            className="p-2 -ml-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
          <div className="flex-1">
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Card Area */}
        <div className="flex-1 flex flex-col items-center justify-center relative pb-32">
          <div
            onClick={() => setIsKanjiFlipped(!isKanjiFlipped)}
            className="cursor-pointer perspective-1000 w-full max-w-sm h-96 relative group"
          >
            <div
              className={`w-full h-full absolute transition-all duration-500 preserve-3d rounded-3xl shadow-2xl border border-slate-700 bg-slate-800 flex flex-col items-center justify-center p-6 ${
                isKanjiFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Front */}
              <div className="absolute backface-hidden flex flex-col items-center justify-center w-full h-full">
                <span className="text-8xl font-black text-white mb-6">
                  {currentCard.kanji}
                </span>
                <p className="text-blue-400 text-xs font-bold uppercase tracking-widest border border-blue-500/30 px-3 py-1 rounded-full bg-blue-500/10">
                  Tap to Reveal
                </p>
              </div>

              {/* Back */}
              <div className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center bg-slate-800 rounded-3xl border border-blue-500/30 p-6 text-center">
                <h3 className="text-3xl font-bold text-white mb-1">
                  {currentCard.meaning}
                </h3>
                <div className="w-12 h-1 bg-blue-500/50 rounded-full mb-6"></div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-left w-full max-w-[240px] mb-6">
                  <div className="text-xs text-slate-500 uppercase tracking-widest">
                    Onyomi
                  </div>
                  <div className="text-sm font-bold text-blue-300">
                    {currentCard.onyomi}
                  </div>

                  <div className="text-xs text-slate-500 uppercase tracking-widest">
                    Kunyomi
                  </div>
                  <div className="text-sm font-bold text-rose-300">
                    {currentCard.kunyomi}
                  </div>
                </div>

                <div className="bg-slate-900/50 p-3 rounded-xl w-full border border-slate-700/50">
                  <div className="text-xs text-slate-500 mb-1">Beispiel</div>
                  <div className="text-sm text-slate-300">
                    {currentCard.examples}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls - Only visible when flipped */}
        {isKanjiFlipped && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 animate-fade-in z-20">
            <div className="max-w-md mx-auto grid grid-cols-3 gap-3">
              <button
                onClick={() => handleKanjiResponse('again')}
                className="py-4 rounded-xl bg-slate-800 border border-red-900/50 text-red-400 font-bold hover:bg-red-900/20 active:scale-95 transition-all flex flex-col items-center gap-1"
              >
                <span>Nochmal</span>
                <span className="text-[10px] opacity-60 font-normal">
                  Vergessen
                </span>
              </button>
              <button
                onClick={() => handleKanjiResponse('good')}
                className="py-4 rounded-xl bg-slate-800 border border-green-900/50 text-green-400 font-bold hover:bg-green-900/20 active:scale-95 transition-all flex flex-col items-center gap-1"
              >
                <span>Gut</span>
                <span className="text-[10px] opacity-60 font-normal">
                  Gewusst
                </span>
              </button>
              <button
                onClick={() => handleKanjiResponse('easy')}
                className="py-4 rounded-xl bg-slate-800 border border-blue-900/50 text-blue-400 font-bold hover:bg-blue-900/20 active:scale-95 transition-all flex flex-col items-center gap-1"
              >
                <span>Einfach</span>
                <span className="text-[10px] opacity-60 font-normal">
                  Perfekt
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderDictionary = () => {
    let allVocab = [];
    CURRICULUM.forEach((lesson) => {
      if (lesson.vocabulary) {
        lesson.vocabulary.forEach((word) => {
          allVocab.push({
            ...word,
            lessonId: lesson.id,
            lessonTitle: lesson.title,
          });
        });
      }
    });

    const filteredVocab = allVocab.filter((word) => {
      const term = searchTerm.toLowerCase();
      return (
        word.jp.toLowerCase().includes(term) ||
        word.romaji.toLowerCase().includes(term) ||
        word.de.toLowerCase().includes(term)
      );
    });

    const learnedVocab = filteredVocab.filter((w) =>
      completedLessons.includes(w.lessonId)
    );
    const unlearnedVocab = filteredVocab.filter(
      (w) => !completedLessons.includes(w.lessonId)
    );

    learnedVocab.sort((a, b) => {
      const indexA = completedLessons.indexOf(a.lessonId);
      const indexB = completedLessons.indexOf(b.lessonId);
      return indexB - indexA;
    });

    const hasResults = learnedVocab.length > 0 || unlearnedVocab.length > 0;

    return (
      <div className="space-y-6 pb-24 animate-fade-in flex flex-col h-full overflow-hidden">
        <div className="bg-slate-800 p-4 rounded-3xl border border-slate-700 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Wörterbuch</h2>
            <div className="text-slate-400 text-xs flex items-center gap-1">
              <Library size={14} />
              <span>
                {learnedVocab.length} / {allVocab.length}
              </span>
            </div>
          </div>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Suchen (Deutsch, Romaji...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 rounded-xl py-3 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1 no-scrollbar">
          {!hasResults && (
            <div className="text-center py-10 text-slate-500">
              Keine Wörter gefunden.
            </div>
          )}

          {learnedVocab.map((word, idx) => (
            <div
              key={`learned-${word.romaji}-${idx}`}
              className="bg-slate-800/60 border border-green-900/20 p-3 rounded-xl flex items-center justify-between group hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center shrink-0 border border-green-500/20">
                  <Check size={14} strokeWidth={3} />
                </div>
                <div>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-lg font-bold text-white">
                      {word.jp}
                    </span>
                    {word.kanji && word.kanji !== word.jp && (
                      <span className="text-sm text-rose-300 opacity-80">
                        ({word.kanji})
                      </span>
                    )}
                    <span className="text-xs font-bold text-rose-400 uppercase tracking-wide">
                      {word.romaji}
                    </span>
                  </div>
                  <div className="text-slate-400 text-xs whitespace-normal">
                    {word.de}
                  </div>
                </div>
              </div>
              <button
                onClick={() => speak(word.jp)}
                className="p-2 text-slate-600 hover:text-white hover:bg-slate-700 rounded-full transition-colors"
              >
                <Volume2 size={18} />
              </button>
            </div>
          ))}

          {unlearnedVocab.length > 0 && (
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-3 px-1">
                <div className="h-px bg-slate-800 flex-1"></div>
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                  Noch zu lernen
                </span>
                <div className="h-px bg-slate-800 flex-1"></div>
              </div>

              <div className="space-y-2 opacity-50 grayscale hover:grayscale-0 hover:opacity-80 transition-all duration-500">
                {unlearnedVocab.map((word, idx) => (
                  <div
                    key={`unlearned-${idx}`}
                    className="bg-slate-900/50 border border-slate-800 p-3 rounded-xl flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-600 flex items-center justify-center shrink-0 border border-slate-700">
                        <Lock size={12} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="text-lg font-bold text-slate-400">
                            {word.jp}
                          </span>
                          <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                            {word.romaji}
                          </span>
                        </div>
                        <div className="text-slate-600 text-xs flex flex-wrap items-center gap-1">
                          <span>{word.de}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-700 shrink-0"></span>
                          <span className="text-[10px] text-slate-700">
                            {word.lessonTitle}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderKanaReference = () => {
    // Collect all LEARNED characters from the curriculum
    let learnedChars = new Set();
    CURRICULUM.forEach((lesson) => {
      if (lesson.characters && completedLessons.includes(lesson.id)) {
        lesson.characters.forEach((char) => {
          learnedChars.add(char.jp);
        });
      }
    });

    return (
      <div className="space-y-6 pb-24 animate-fade-in">
        <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700">
          <h2 className="text-2xl font-bold mb-1 text-white">Zeichen</h2>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Type size={16} />
            <span>Kana Übersicht</span>
          </div>
        </div>

        {/* Hiragana Section */}
        <div>
          <h3 className="text-rose-500 font-bold mb-4 ml-1 uppercase tracking-widest text-xs">
            Hiragana
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {ALL_HIRAGANA.map((char, idx) => {
              const isLearned = learnedChars.has(char.jp);
              const isEmpty = char.jp === '';

              if (isEmpty) return <div key={idx}></div>;

              return (
                <div
                  key={idx}
                  onClick={() => isLearned && speak(char.jp)}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center border-2 transition-all
                                  ${
                                    isLearned
                                      ? 'bg-slate-800 border-slate-700 text-white cursor-pointer hover:border-rose-500 hover:bg-slate-700 shadow-lg'
                                      : 'bg-slate-900/50 border-slate-800 text-slate-700 cursor-default'
                                  }
                              `}
                >
                  <span className="text-2xl font-black mb-0.5">{char.jp}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                    {char.romaji}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Katakana Section */}
        <div>
          <h3 className="text-blue-500 font-bold mb-4 mt-8 ml-1 uppercase tracking-widest text-xs">
            Katakana
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {ALL_KATAKANA.map((char, idx) => {
              const isLearned = learnedChars.has(char.jp);
              const isEmpty = char.jp === '';

              if (isEmpty) return <div key={idx}></div>;

              return (
                <div
                  key={idx}
                  onClick={() => isLearned && speak(char.jp)}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center border-2 transition-all
                                  ${
                                    isLearned
                                      ? 'bg-slate-800 border-slate-700 text-white cursor-pointer hover:border-blue-500 hover:bg-slate-700 shadow-lg'
                                      : 'bg-slate-900/50 border-slate-800 text-slate-700 cursor-default'
                                  }
                              `}
                >
                  <span className="text-2xl font-black mb-0.5">{char.jp}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                    {char.romaji}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center text-slate-600 text-xs mt-8 pb-8">
          Tippe auf farbige Zeichen für Audio.
        </div>
      </div>
    );
  };

  const renderStrategy = () => (
    <div className="pb-24 space-y-6 animate-fade-in">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border border-slate-700 text-center">
        <h2 className="text-2xl font-bold mb-2 text-white">
          Das "Speedrun" Protokoll
        </h2>
        <p className="text-slate-400">Wie du das System austrickst.</p>
      </div>

      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-sm hover:border-rose-500/30 transition-colors">
        <div className="flex items-start gap-4 mb-2">
          <div className="bg-rose-500/10 p-3 rounded-xl text-rose-500">
            <Brain />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">1. Kein Romaji</h3>
            <p className="text-slate-400 text-sm leading-relaxed mt-2">
              Vergiss unsere Buchstaben. Lerne Hiragana & Katakana in den ersten
              2 Wochen. Wenn du Romaji liest, lernst du nicht wirklich
              Japanisch, sondern nur eine Krücke.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-sm hover:border-blue-500/30 transition-colors">
        <div className="flex items-start gap-4 mb-2">
          <div className="bg-blue-500/10 p-3 rounded-xl text-blue-500">
            <Volume2 />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">
              2. Input {'>'} Output
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mt-2">
              Ein Baby lernt nicht sprechen, indem es Grammatikbücher liest. Es
              hört zu. Hör dir jeden Tag 1 Stunde japanischen Content an (Anime
              ohne Untertitel, Podcasts), auch wenn du nichts verstehst.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-sm hover:border-yellow-500/30 transition-colors">
        <div className="flex items-start gap-4 mb-2">
          <div className="bg-yellow-500/10 p-3 rounded-xl text-yellow-500">
            <Star />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">3. Satz-Mining</h3>
            <p className="text-slate-400 text-sm leading-relaxed mt-2">
              Lerne keine isolierten Wörter ("Essen"). Lerne Sätze ("Ich esse
              Sushi"). Unser Gehirn ist eine Mustererkennungs-Maschine, keine
              Datenbank. Füttere es mit Mustern.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 selection:bg-rose-500/30 selection:text-white">
      {currentLesson ? (
        <div className="max-w-md mx-auto h-screen bg-slate-900 shadow-2xl p-4 border-x border-slate-800 relative">
          {renderActiveLesson()}
        </div>
      ) : kanjiSession ? (
        <div className="max-w-md mx-auto h-screen bg-slate-900 shadow-2xl p-4 border-x border-slate-800 relative">
          {renderKanjiPractice()}
        </div>
      ) : (
        <div className="max-w-md mx-auto min-h-screen flex flex-col relative bg-slate-950 border-x border-slate-900">
          {/* Top Header */}
          <div className="p-4 pt-6 flex justify-between items-center bg-slate-950/80 backdrop-blur-md sticky top-0 z-20 border-b border-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-rose-600 to-orange-500 rounded-xl flex items-center justify-center text-white font-black italic shadow-lg shadow-rose-900/20 transform -skew-x-6">
                JP
              </div>
              <div>
                <div className="font-bold text-white tracking-tight leading-none">
                  Nihongo
                </div>
                <div className="text-[10px] font-bold text-rose-500 uppercase tracking-widest leading-none">
                  Speedrun
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full flex items-center gap-2">
                <Trophy size={14} className="text-yellow-500" />
                <span className="text-xs font-bold text-slate-300">{xp}</span>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-4 overflow-y-auto no-scrollbar">
            {activeTab === 'home' && renderHome()}
            {activeTab === 'kanji_practice' && renderKanjiPractice()}
            {activeTab === 'dictionary' && renderDictionary()}
            {activeTab === 'kana' && renderKanaReference()}
            {activeTab === 'strategy' && renderStrategy()}
          </div>

          {/* Bottom Nav */}
          <div className="sticky bottom-0 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800 p-2 flex justify-around items-center pb-6 z-20">
            <button
              onClick={() => setActiveTab('home')}
              className={`p-3 rounded-2xl flex items-center gap-2 transition-all duration-300 ${
                activeTab === 'home'
                  ? 'text-white bg-slate-800 shadow-[0_0_15px_rgba(255,255,255,0.05)] px-4'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Home size={22} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
              {activeTab === 'home' && (
                <span className="text-xs font-bold">Lernen</span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('kanji_practice')}
              className={`p-3 rounded-2xl flex items-center gap-2 transition-all duration-300 ${
                activeTab === 'kanji_practice'
                  ? 'text-white bg-slate-800 shadow-[0_0_15px_rgba(255,255,255,0.05)] px-4'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Stamp
                size={22}
                strokeWidth={activeTab === 'kanji_practice' ? 2.5 : 2}
              />
              {activeTab === 'kanji_practice' && (
                <span className="text-xs font-bold">Decks</span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('dictionary')}
              className={`p-3 rounded-2xl flex items-center gap-2 transition-all duration-300 ${
                activeTab === 'dictionary'
                  ? 'text-white bg-slate-800 shadow-[0_0_15px_rgba(255,255,255,0.05)] px-4'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Library
                size={22}
                strokeWidth={activeTab === 'dictionary' ? 2.5 : 2}
              />
              {activeTab === 'dictionary' && (
                <span className="text-xs font-bold">Wörter</span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('kana')}
              className={`p-3 rounded-2xl flex items-center gap-2 transition-all duration-300 ${
                activeTab === 'kana'
                  ? 'text-white bg-slate-800 shadow-[0_0_15px_rgba(255,255,255,0.05)] px-4'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Type size={22} strokeWidth={activeTab === 'kana' ? 2.5 : 2} />
              {activeTab === 'kana' && (
                <span className="text-xs font-bold">Zeichen</span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('strategy')}
              className={`p-3 rounded-2xl flex items-center gap-2 transition-all duration-300 ${
                activeTab === 'strategy'
                  ? 'text-white bg-slate-800 shadow-[0_0_15px_rgba(255,255,255,0.05)] px-4'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <BookOpen
                size={22}
                strokeWidth={activeTab === 'strategy' ? 2.5 : 2}
              />
              {activeTab === 'strategy' && (
                <span className="text-xs font-bold">Guide</span>
              )}
            </button>
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop-in {
          0% { transform: scale(0); }
          80% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-pop-in { animation: pop-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}
