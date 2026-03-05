"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const MODELS = [
  {
    value: "AceStep_1_5_Turbo",
    label: "ACE-Step 1.5 Turbo",
    limits: {
      min_duration: 10, max_duration: 300,
      min_bpm: 50, max_bpm: 200,
      min_steps: 8, max_steps: 8,
      min_guidance: 1, max_guidance: 1,
      min_caption: 10, max_caption: 300,
    },
    defaultSteps: 8,
    defaultGuidance: 1,
  },
  {
    value: "AceStep_1_5_Base",
    label: "ACE-Step 1.5 Base",
    limits: {
      min_duration: 30, max_duration: 300,
      min_bpm: 50, max_bpm: 200,
      min_steps: 5, max_steps: 100,
      min_guidance: 3, max_guidance: 20,
      min_caption: 10, max_caption: 300,
    },
    defaultSteps: 32,
    defaultGuidance: 7,
  },
];

const getModel = (slug: string) => MODELS.find((m) => m.value === slug)!;

const EXAMPLES = [
  {
    title: "Lo-fi Chill Beat",
    caption: "lo-fi hip-hop, warm vinyl crackle, mellow piano chords, soft boom-bap drums, airy pads, relaxed bedroom production, nostalgic and dreamy atmosphere",
    lyrics: "[Instrumental]\n\n[Intro - ambient]\n\n[Main Theme - piano]\n\n[Breakdown - mellow]\n\n[Main Theme - piano]\n\n[Outro - fade out]",
    bpm: "85", keyscale: "F Major", timesignature: "4", vocalLanguage: "en", duration: 120,
  },
  {
    title: "Pop Ballad (Female)",
    caption: "emotional pop ballad, female vocal, breathy and intimate, piano-driven, lush strings building to powerful chorus, polished studio production, bittersweet atmosphere",
    lyrics: "[Intro - piano]\n\n[Verse 1]\nSilent rooms and fading light\nYour shadow still on the wall\nI replay our last goodbye\nWondering where we lost it all\n\n[Pre-Chorus - building energy]\nBut every scar you left behind\nIs a map of what was mine\n\n[Chorus - powerful]\nSo let me burn like falling stars\nLight the sky with all these scars\nBrief and bright, I won't pretend\nThis is how the story ends\n\n[Verse 2]\nPhotographs in monochrome\nYour laughter frozen in time\nThe coffee cup you left by the door\nStill carries your perfume line\n\n[Bridge - whispered]\nIf tomorrow erases us\nAt least we shone tonight\n\n[Final Chorus - powerful]\nSo let me burn like falling stars\nLight the sky with all these scars\nBrief and bright, no need to mend\nTHIS IS HOW THE STORY ENDS\n\n[Outro - fade out]",
    bpm: "72", keyscale: "A Minor", timesignature: "4", vocalLanguage: "en", duration: 180,
  },
  {
    title: "Hard Rock Anthem",
    caption: "hard rock, heavy distorted electric guitar riffs, punchy drums, driving bass, raw male vocal, powerful and aggressive energy, arena rock anthem, high-fidelity production",
    lyrics: "[Intro - heavy guitar riff]\n\n[Verse 1]\nConcrete jungle shaking ground\nEngines roaring, primal sound\nNo more chains to hold us back\nWe ride the lightning, never crack\n\n[Pre-Chorus - building energy]\nFeel the thunder in your veins\nBreak the silence, break the chains\n\n[Chorus - anthemic]\nWE ARE THE STORM TONIGHT\nBURNING THROUGH THE ENDLESS NIGHT\nRAISE YOUR FISTS UP TO THE SKY\nWE WILL NEVER SAY GOODBYE\n\n[Guitar Solo]\n\n[Chorus - anthemic]\nWE ARE THE STORM TONIGHT\nBURNING THROUGH THE ENDLESS NIGHT\n\n[Outro - heavy]",
    bpm: "140", keyscale: "E Minor", timesignature: "4", vocalLanguage: "en", duration: 150,
  },
  {
    title: "Jazz Piano Trio",
    caption: "jazz piano trio, upright bass, brushed drums, warm intimate club recording, sophisticated harmony, swing feel, classic Blue Note aesthetic, smooth and mellow",
    lyrics: "[Instrumental]\n\n[Intro - piano]\n\n[Main Theme - swing]\n\n[Piano Solo - expressive]\n\n[Bass Solo - walking bass]\n\n[Main Theme - swing]\n\n[Outro - gentle]",
    bpm: "130", keyscale: "Bb Major", timesignature: "4", vocalLanguage: "en", duration: 150,
  },
  {
    title: "EDM Festival Drop",
    caption: "EDM, progressive house, massive synth leads, euphoric build-ups, heavy bass drops, energetic festival atmosphere, punchy kick drums, bright supersaw chords, polished electronic production",
    lyrics: "[Instrumental]\n\n[Intro - ambient pads]\n\n[Build - rising energy]\n\n[Drop - explosive]\n\n[Breakdown - atmospheric]\n\n[Build - rising energy]\n\n[Drop - explosive]\n\n[Outro - fade out]",
    bpm: "128", keyscale: "F Minor", timesignature: "4", vocalLanguage: "en", duration: 180,
  },
  {
    title: "Orchestral Cinematic",
    caption: "cinematic orchestral, full symphony orchestra, epic brass fanfare, soaring strings, dramatic timpani, heroic and triumphant, film score style, Hans Zimmer inspired, grand and majestic",
    lyrics: "[Instrumental]\n\n[Intro - strings, low energy]\n\n[Build - brass joining]\n\n[Climax - full orchestra, powerful]\n\n[Breakdown - solo violin, melancholic]\n\n[Final Climax - powerful, triumphant]\n\n[Outro - fade out]",
    bpm: "90", keyscale: "D Minor", timesignature: "4", vocalLanguage: "en", duration: 180,
  },
  {
    title: "Reggaeton",
    caption: "reggaeton, dembow rhythm, Latin urban, catchy perreo beat, warm male vocal, 808 bass, tropical synths, dancehall influence, summer party vibe, polished production",
    lyrics: "[Intro]\n\n[Verse 1]\nLa noche se enciende ya\nEl ritmo no va a parar\nTu cuerpo se mueve slow\nY el beat te va a dominar\n\n[Pre-Chorus]\nDale vuelta, no pares\nQue la calle es de nadie\n\n[Chorus]\nBaila, baila, baila\nQue esta noche es para ti\nMueve, mueve, mueve\nHasta que salga el sol aqui\n\n[Verse 2]\nLas luces del boulevard\nReflejan tu mirada\nNo importa lo demas\nEsta noche no hay manana\n\n[Chorus]\nBaila, baila, baila\nQue esta noche es para ti\n\n[Outro]",
    bpm: "95", keyscale: "C Minor", timesignature: "4", vocalLanguage: "es", duration: 150,
  },
  {
    title: "R&B / Neo-Soul",
    caption: "neo-soul R&B, silky female vocal, warm Rhodes piano, mellow bass guitar, laid-back groovy drums, lush vocal harmonies, intimate and sensual, Erykah Badu inspired, vintage warmth",
    lyrics: "[Intro - Rhodes piano]\n\n[Verse 1]\nCandles burning by the window\nYour jacket still on the chair\nI close my eyes and I can feel you\nYour fingertips in my hair\n\n[Pre-Chorus]\nWe don't need a single word\nJust the space between\n\n[Chorus - harmonies]\nStay a little longer now\nLet the world outside slow down\nIn this room there's only us\nNothing more and nothing less\n\n[Verse 2]\nVinyl spinning in the corner\nShadows dancing on the wall\nYour whisper like a secret\nOnly I can recall\n\n[Bridge - whispered]\nTime don't move when you're this close\n\n[Chorus - harmonies]\nStay a little longer now\nLet the world outside slow down\n\n[Outro - fade out]",
    bpm: "78", keyscale: "Eb Major", timesignature: "4", vocalLanguage: "en", duration: 180,
  },
  {
    title: "Death Metal",
    caption: "death metal, blast beats, heavy downtuned guitars, guttural growling vocals, aggressive double bass drums, dark and brutal atmosphere, technical riffing, raw production",
    lyrics: "[Intro - heavy riff]\n\n[Verse 1]\nBeneath the dying sun\nA throne of ashen bones\nThe earth begins to crack\nAs darkness claims its own\n\n[Chorus - aggressive]\nDEVOUR THE LIGHT\nCRUSH THE REMAINS\nENDLESS VOID\nETERNAL PAIN\n\n[Breakdown - slow, crushing]\n\n[Guitar Solo]\n\n[Chorus - aggressive]\nDEVOUR THE LIGHT\nCRUSH THE REMAINS\n\n[Outro - heavy]",
    bpm: "180", keyscale: "C# Minor", timesignature: "4", vocalLanguage: "en", duration: 120,
  },
  {
    title: "Folk Acoustic",
    caption: "indie folk, acoustic fingerpicking guitar, warm male vocal, gentle harmonica, soft brushed percussion, campfire atmosphere, intimate and nostalgic, Bon Iver inspired, raw recording",
    lyrics: "[Intro - fingerpicking guitar]\n\n[Verse 1]\nDown the river where the willows bend\nI left a letter for my oldest friend\nThe ink has faded but the words remain\nWe were young before we learned the rain\n\n[Verse 2]\nBroken fences line the old dirt road\nEvery post a story never told\nThe barn still stands but the roof caved in\nLike promises we made back then\n\n[Chorus]\nOh carry me home\nThrough fields of golden grain\nWhere the creek still sings\nAnd the sky forgets the pain\n\n[Bridge - harmonica]\n\n[Verse 3]\nNow the porch light flickers in the dark\nAnd the dog still barks at passing cars\nI sit and watch the fireflies ignite\nAnd hum the songs we sang at night\n\n[Chorus]\nOh carry me home\nThrough fields of golden grain\n\n[Outro - gentle]",
    bpm: "105", keyscale: "G Major", timesignature: "3", vocalLanguage: "en", duration: 180,
  },
  {
    title: "80s Synthwave",
    caption: "synthwave, 80s retro, analog synth arpeggios, warm pads, punchy electronic drums, neon-lit atmosphere, driving bass, nostalgic and euphoric, Kavinsky inspired, polished production",
    lyrics: "[Instrumental]\n\n[Intro - synth arpeggio]\n\n[Main Theme - driving]\n\n[Breakdown - ambient pads]\n\n[Build - rising energy]\n\n[Main Theme - driving]\n\n[Outro - fade out]",
    bpm: "118", keyscale: "A Minor", timesignature: "4", vocalLanguage: "en", duration: 150,
  },
  {
    title: "Trap Hip-Hop",
    caption: "trap, hard 808 bass, hi-hat rolls, dark atmospheric pads, aggressive male vocal, confident flow, crisp snares, modern hip-hop production, heavy and bouncy",
    lyrics: "[Intro - 808 bass]\n\n[Verse 1 - spoken word]\nMidnight grind, no sleep in sight\nStacking up while they call it a night\nEvery loss just fuel for the flame\nThey whisper doubt, I answer with aim\n\n[Chorus]\nRise and grind, no looking back\nHeavy on the gas, never off the track\nThey counting me out, I'm counting the racks\nRise and grind, no looking back\n\n[Verse 2 - spoken word]\nFrom the bottom floor to the rooftop view\nEvery scar a lesson, every step was true\nHaters talk but the work don't lie\nWatch me build this empire to the sky\n\n[Bridge - ad-lib]\nYeah, yeah, we don't stop\nYeah, yeah, straight to the top\n\n[Chorus]\nRise and grind, no looking back\nHeavy on the gas, never off the track\n\n[Outro - 808 bass]",
    bpm: "145", keyscale: "D Minor", timesignature: "4", vocalLanguage: "en", duration: 120,
  },
  {
    title: "Viennese Waltz",
    caption: "classical waltz, elegant strings, grand piano, orchestral arrangement, romantic and graceful, ballroom dance, lush and flowing, Strauss inspired, live concert hall recording",
    lyrics: "[Instrumental]\n\n[Intro - piano, gentle]\n\n[Main Theme - strings waltz]\n\n[Variation - playful woodwinds]\n\n[Main Theme - full orchestra]\n\n[Coda - grand finale]",
    bpm: "180", keyscale: "Bb Major", timesignature: "3", vocalLanguage: "en", duration: 150,
  },
  {
    title: "C-Pop Ballad",
    caption: "Chinese pop ballad, emotional female vocal, gentle piano accompaniment, lush string arrangement, warm and melancholic, modern C-pop production, intimate studio recording",
    lyrics: "[Intro - piano]\n\n[Verse 1]\n\u7a97\u5916\u7684\u96e8\u6ef4\u843d\u4e0d\u505c\n\u50cf\u6211\u5fc3\u91cc\u7684\u58f0\u97f3\n\u4f60\u8d70\u540e\u7684\u623f\u95f4\u592a\u5b89\u9759\n\u53ea\u5269\u56de\u5fc6\u5728\u8f6c\u52a8\n\n[Pre-Chorus]\n\u6211\u4eec\u7684\u6545\u4e8b\u50cf\u98ce\n\u8f7b\u8f7b\u5730\u5c31\u6563\u4e86\n\n[Chorus - powerful]\n\u5982\u679c\u7231\u60c5\u6709\u56de\u97f3\n\u6211\u60f3\u542c\u89c1\u4f60\u7684\u5fc3\n\u8ddd\u79bb\u518d\u8fdc\u4e5f\u4e0d\u6015\n\u53ea\u8981\u4f60\u8fd8\u8bb0\u5f97\u6211\n\n[Verse 2]\n\u7ffb\u5f00\u65e7\u7167\u7247\u7684\u8272\u5f69\n\u4f60\u7684\u7b11\u5bb9\u8fd8\u5728\n\u90a3\u5e74\u590f\u5929\u7684\u6d77\u8fb9\n\u6211\u4eec\u8bf4\u597d\u4e0d\u53d8\n\n[Bridge - whispered]\n\u53ef\u662f\u65f6\u95f4\u4e0d\u7b49\u4eba\n\u7231\u60c5\u4e5f\u4e00\u6837\n\n[Final Chorus - powerful]\n\u5982\u679c\u7231\u60c5\u6709\u56de\u97f3\n\u6211\u60f3\u542c\u89c1\u4f60\u7684\u5fc3\n\n[Outro - fade out]",
    bpm: "68", keyscale: "C Major", timesignature: "4", vocalLanguage: "zh", duration: 180,
  },
  {
    title: "Bossa Nova",
    caption: "bossa nova, nylon guitar, soft brushed percussion, warm upright bass, smooth male vocal, gentle and swaying rhythm, tropical breeze atmosphere, Antonio Carlos Jobim inspired, intimate cafe recording",
    lyrics: "[Intro - nylon guitar]\n\n[Verse 1]\nSunlight through the morning haze\nCoffee steam and lazy days\nYour dress sways in the ocean breeze\nA melody among the trees\n\n[Verse 2]\nFootprints fading in the sand\nYou reach out and take my hand\nThe world is slow, the sky is wide\nWith you forever by my side\n\n[Chorus]\nDance with me where rivers meet the sea\nUnder stars that hum in harmony\nNothing else but you and me\nSwaying to this melody\n\n[Guitar Solo - expressive]\n\n[Verse 3]\nEvening gold on city walls\nDistant music, someone calls\nWe smile and let the moment stay\nA perfect ordinary day\n\n[Chorus]\nDance with me where rivers meet the sea\n\n[Outro - gentle]",
    bpm: "120", keyscale: "D Major", timesignature: "4", vocalLanguage: "en", duration: 180,
  },
  {
    title: "Dark Ambient",
    caption: "dark ambient, deep drones, eerie atmospheric textures, distant reverb, haunting soundscape, cinematic horror, granular synthesis, sub-bass rumbles, unsettling and immersive",
    lyrics: "[Instrumental]\n\n[Intro - deep drone]\n\n[Build - eerie textures layering]\n\n[Climax - dense, overwhelming]\n\n[Breakdown - sparse, distant]\n\n[Build - sub-bass rumble]\n\n[Outro - silence fading in]",
    bpm: "60", keyscale: "C Minor", timesignature: "4", vocalLanguage: "en", duration: 180,
  },
  {
    title: "K-Pop Dance",
    caption: "K-pop, catchy synth hook, punchy dance beat, bright female vocal group, energetic and playful, polished pop production, addictive chorus melody, modern and trendy",
    lyrics: "[Intro - synth hook]\n\n[Verse 1]\nHeartbeat racing, lights are flashing\nTonight we own the stage\nEvery step is synchronized\nWe're turning up the page\n\n[Pre-Chorus - building energy]\nCan you feel it in the air\nMagic everywhere\n\n[Chorus]\nWe go higher, higher, higher\nSet the whole world on fire\nDon't stop, never tire\nWe go higher, higher, higher\n\n[Verse 2]\nCamera flash, the crowd goes wild\nWe shine like diamond stars\nEvery move a work of art\nWe're breaking through the bars\n\n[Bridge]\n(Higher) take me to the sky\n(Higher) watch us as we fly\n\n[Final Chorus]\nWE GO HIGHER, HIGHER, HIGHER\nSET THE WHOLE WORLD ON FIRE\n\n[Outro - dance break]",
    bpm: "125", keyscale: "G Minor", timesignature: "4", vocalLanguage: "en", duration: 150,
  },
  {
    title: "Country Storyteller",
    caption: "country, twangy electric guitar, pedal steel, warm male vocal, honky-tonk piano, steady kick-snare groove, Nashville production, heartfelt and sincere, live band feel",
    lyrics: "[Intro - pedal steel]\n\n[Verse 1]\nDust road stretching mile on mile\nOld Ford truck with a crooked smile\nRadio playing our favorite song\nSinging loud and getting it wrong\n\n[Verse 2]\nMama's kitchen, Sunday stew\nDaddy's boots by the back door too\nScreen door banging in the wind\nSimple life, where do I begin\n\n[Chorus]\nThat's the place I call my own\nWhere the wheat fields kiss the sky\nWhere the river takes you home\nAnd the stars don't ever lie\n\n[Verse 3]\nFriday night at the county fair\nCotton candy in your hair\nFerris wheel and a stolen kiss\nTell me what's as good as this\n\n[Bridge - pedal steel solo]\n\n[Chorus]\nThat's the place I call my own\nWhere the wheat fields kiss the sky\n\n[Outro - gentle]",
    bpm: "110", keyscale: "E Major", timesignature: "4", vocalLanguage: "en", duration: 180,
  },
  {
    title: "Japanese City Pop",
    caption: "Japanese city pop, 80s retro, groovy bass, funky rhythm guitar, bright female vocal, lush synth pads, warm analog production, Tatsuro Yamashita inspired, nostalgic summer vibe",
    lyrics: "[Intro - funky guitar]\n\n[Verse 1]\n\u590f\u306e\u98a8\u304c\u9aea\u3092\u63fa\u3089\u3059\n\u6d77\u6cbf\u3044\u306e\u9053\u3092\u8d70\u308b\n\u30e9\u30b8\u30aa\u304b\u3089\u6d41\u308c\u308b\u30e1\u30ed\u30c7\u30a3\u30fc\n\u3042\u306e\u9803\u306e\u4e8c\u4eba\u306e\u3088\u3046\u306b\n\n[Pre-Chorus]\n\u6642\u9593\u3088\u6b62\u307e\u308c\n\u3053\u306e\u307e\u307e\u3067\u3044\u3044\n\n[Chorus]\n\u30df\u30c3\u30c9\u30ca\u30a4\u30c8\u30fb\u30c9\u30ea\u30fc\u30e0\n\u661f\u304c\u6d77\u306b\u843d\u3061\u308b\n\u4e8c\u4eba\u3060\u3051\u306e\u4e16\u754c\u3067\n\u8e0a\u308a\u7d9a\u3051\u3088\u3046\n\n[Verse 2]\n\u30cd\u30aa\u30f3\u306e\u5149\u304c\u63fa\u308c\u308b\u591c\n\u30ab\u30af\u30c6\u30eb\u30b0\u30e9\u30b9\u306e\u5411\u3053\u3046\n\u541b\u306e\u7b11\u9854\u304c\u898b\u3048\u305f\n\u305d\u308c\u3060\u3051\u3067\u5341\u5206\n\n[Bridge - synth solo]\n\n[Chorus]\n\u30df\u30c3\u30c9\u30ca\u30a4\u30c8\u30fb\u30c9\u30ea\u30fc\u30e0\n\u661f\u304c\u6d77\u306b\u843d\u3061\u308b\n\n[Outro - fade out]",
    bpm: "115", keyscale: "F Major", timesignature: "4", vocalLanguage: "ja", duration: 180,
  },
  {
    title: "Drum & Bass",
    caption: "drum and bass, liquid DnB, fast breakbeats, deep rolling bass, atmospheric pads, ethereal female vocal chops, crisp hi-hats, lush reverb, energetic yet smooth, high-fidelity electronic production",
    lyrics: "[Instrumental]\n\n[Intro - atmospheric pads]\n\n[Build - breakbeat entering]\n\n[Drop - full DnB groove]\n\n[Breakdown - vocal chops, ambient]\n\n[Drop - heavy bass, rolling]\n\n[Outro - fade out]",
    bpm: "174", keyscale: "E Minor", timesignature: "4", vocalLanguage: "en", duration: 150,
  },
  {
    title: "Gospel Choir",
    caption: "gospel, powerful choir harmonies, organ, clapping percussion, uplifting and spiritual, call and response vocals, soulful lead female vocal, church atmosphere, live recording feel",
    lyrics: "[Intro - organ]\n\n[Verse 1]\nThrough the valley I have walked\nThrough the fire I have talked\nWith a voice that's not my own\nI was never quite alone\n\n[Chorus - call and response]\nOh lift me up (lift me up)\nCarry me through (carry me through)\nWith every breath (every breath)\nI'll sing for you\n\n[Verse 2]\nMorning comes with golden light\nWashing clean the darkest night\nEvery burden falls away\nThis is my redeeming day\n\n[Bridge - choir, building energy]\nHallelujah, hallelujah\nHallelujah, hallelujah\n\n[Final Chorus - powerful]\nOH LIFT ME UP (lift me up)\nCARRY ME THROUGH (carry me through)\nWITH EVERY BREATH (every breath)\nI'LL SING FOR YOU\n\n[Outro - organ, fade out]",
    bpm: "88", keyscale: "Ab Major", timesignature: "4", vocalLanguage: "en", duration: 180,
  },
  {
    title: "Flamenco Guitar",
    caption: "flamenco, nylon string guitar, percussive rasgueado strumming, cajon, handclaps, passionate and fiery, Spanish guitar virtuoso, intimate live recording, raw and expressive",
    lyrics: "[Instrumental]\n\n[Intro - solo guitar, rubato]\n\n[Main Theme - rasgueado, fiery]\n\n[Falseta - melodic solo]\n\n[Breakdown - cajon and palmas]\n\n[Climax - fast picado, explosive]\n\n[Outro - gentle tremolo, fade]",
    bpm: "120", keyscale: "A Minor", timesignature: "4", vocalLanguage: "es", duration: 150,
  },
  {
    title: "Afrobeat Groove",
    caption: "afrobeat, polyrhythmic percussion, funky guitar licks, horn section, groovy bass, warm male vocal, Fela Kuti inspired, danceable and hypnotic, live band energy, West African rhythm",
    lyrics: "[Intro - percussion]\n\n[Verse 1]\nThe city wakes before the sun\nThe rhythm starts for everyone\nBare feet dancing on the ground\nAncient pulse, eternal sound\n\n[Chorus]\nMove your body, feel the beat\nLet the drums move your feet\nWe are one beneath the sun\nDancing till the day is done\n\n[Horn Section]\n\n[Verse 2]\nStreet to street the music flows\nEvery soul already knows\nThis groove is older than the land\nPass it on from hand to hand\n\n[Chorus]\nMove your body, feel the beat\nLet the drums move your feet\n\n[Percussion Solo]\n\n[Outro - groove fading]",
    bpm: "115", keyscale: "G Minor", timesignature: "4", vocalLanguage: "en", duration: 180,
  },
];

const FORMATS = ["flac", "mp3", "wav"];

const TIME_SIGNATURES = [
  { value: "", label: "Auto" },
  { value: "2", label: "2/4" },
  { value: "3", label: "3/4" },
  { value: "4", label: "4/4" },
  { value: "6", label: "6/8" },
];

type Status = "idle" | "submitting" | "polling" | "completed" | "failed";

interface HistoryItem {
  caption: string;
  resultUrl: string;
  cost: number | null;
  model: string;
  duration: number;
  timestamp: string;
}

export default function Home() {
  // API key
  const [apiKey, setApiKey] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  // Form fields
  const [caption, setCaption] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [model, setModel] = useState("AceStep_1_5_Turbo");
  const [duration, setDuration] = useState(30);
  const [bpm, setBpm] = useState("");
  const [keyscale, setKeyscale] = useState("");
  const [timesignature, setTimesignature] = useState("");
  const [vocalLanguage, setVocalLanguage] = useState("en");
  const [inferenceSteps, setInferenceSteps] = useState(8);
  const [guidanceScale, setGuidanceScale] = useState(1);
  const [seed, setSeed] = useState("");
  const [format, setFormat] = useState("flac");

  // Generation state
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState("");
  const [error, setError] = useState("");
  const [costCredits, setCostCredits] = useState<number | null>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // History (session only)
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load API key from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("deapi-music-key");
    if (saved) {
      setApiKey(saved);
    } else {
      setShowSettings(true);
    }
  }, []);

  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem("deapi-music-key", key);
  };

  // Auto-update constrained values when model changes
  const handleModelChange = (newModel: string) => {
    setModel(newModel);
    const m = getModel(newModel);
    setInferenceSteps(m.defaultSteps);
    setGuidanceScale(m.defaultGuidance);
    setDuration((d) => Math.max(m.limits.min_duration, Math.min(m.limits.max_duration, d)));
    if (bpm) {
      const b = Number(bpm);
      if (b < m.limits.min_bpm || b > m.limits.max_bpm) setBpm("");
    }
  };

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  // Poll job status
  const startPolling = useCallback(
    (requestId: string) => {
      setStatus("polling");
      setProgress(0);
      let attempts = 0;
      const maxAttempts = 200;

      pollingRef.current = setInterval(async () => {
        attempts++;
        if (attempts > maxAttempts) {
          stopPolling();
          setError("Generation timed out. Check your deAPI dashboard.");
          setStatus("failed");
          return;
        }

        try {
          const res = await fetch(`/api/status/${requestId}`, {
            headers: { "x-api-key": apiKey },
          });
          const json = await res.json();
          const data = json.data || json;

          if (data.progress != null) setProgress(data.progress);
          if (data.cost_credits != null) setCostCredits(data.cost_credits);

          if (data.status === "done") {
            stopPolling();
            setResultUrl(data.result_url);
            setStatus("completed");
            setHistory((prev) => [
              {
                caption,
                resultUrl: data.result_url,
                cost: data.cost_credits ?? costCredits,
                model,
                duration,
                timestamp: new Date().toLocaleTimeString(),
              },
              ...prev,
            ]);
          } else if (data.status === "error") {
            stopPolling();
            setError(data.error || "Generation failed");
            setStatus("failed");
          }
        } catch {
          stopPolling();
          setError("Failed to check generation status");
          setStatus("failed");
        }
      }, 3000);
    },
    [apiKey, caption, model, duration, costCredits, stopPolling]
  );

  // Submit generation request
  const handleGenerate = async () => {
    if (!apiKey.trim()) {
      setError("Please enter your API key first");
      setShowSettings(true);
      return;
    }
    if (!caption.trim()) {
      setError("Caption is required");
      return;
    }

    stopPolling();
    setStatus("submitting");
    setError("");
    setResultUrl("");
    setCostCredits(null);
    setProgress(0);

    const body: Record<string, unknown> = {
      caption: caption.trim(),
      model,
      duration,
      inference_steps: inferenceSteps,
      guidance_scale: guidanceScale,
      format,
    };

    if (lyrics.trim()) body.lyrics = lyrics.trim();
    if (bpm) body.bpm = Number(bpm);
    if (keyscale.trim()) body.keyscale = keyscale.trim();
    if (timesignature) body.timesignature = Number(timesignature);
    if (vocalLanguage.trim()) body.vocal_language = vocalLanguage.trim();
    body.seed = seed ? Number(seed) : Math.floor(Math.random() * 2147483647);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify(body),
      });

      const json = await res.json();

      if (!res.ok) {
        const msg =
          json.error ||
          json.detail ||
          json.message ||
          `API error ${res.status}`;
        setError(typeof msg === "string" ? msg : JSON.stringify(msg));
        setStatus("failed");
        return;
      }

      const requestId = json.data?.request_id;
      if (!requestId) {
        setError("No request ID returned from API");
        setStatus("failed");
        return;
      }

      if (json.data?.cost_credits) setCostCredits(json.data.cost_credits);
      startPolling(requestId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
      setStatus("failed");
    }
  };

  const isGenerating = status === "submitting" || status === "polling";

  const handleCancel = () => {
    stopPolling();
    setStatus("idle");
    setError("");
    setProgress(0);
  };

  const loadExample = (ex: typeof EXAMPLES[number]) => {
    setCaption(ex.caption);
    setLyrics(ex.lyrics);
    setBpm(ex.bpm);
    setKeyscale(ex.keyscale);
    setTimesignature(ex.timesignature);
    setVocalLanguage(ex.vocalLanguage);
    setDuration(Math.max(getModel(model).limits.min_duration, Math.min(getModel(model).limits.max_duration, ex.duration)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800/60 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
            <span className="text-2xl">&#9835;</span> Music Generator
            <span className="text-zinc-600 text-xs font-normal">powered by</span>
            <a href="https://deapi.ai" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <img src="https://deapi.ai/images/logo-deapi.svg" alt="deAPI" className="h-5 opacity-70 hover:opacity-100 transition-opacity" />
            </a>
          </h1>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors px-3 py-1 rounded hover:bg-zinc-800"
          >
            {showSettings ? "Hide Key" : "API Key"}
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        {/* API Key Settings */}
        {showSettings && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 animate-in">
            <label className="text-xs font-medium text-zinc-400 block mb-1.5">
              deAPI Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => saveApiKey(e.target.value)}
              placeholder="12345|xxxxxxxxxxxxxxxx"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
            />
            <p className="text-xs text-zinc-500 mt-1.5">
              Stored locally in your browser. Get your key at{" "}
              <a
                href="https://deapi.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300"
              >
                deapi.ai
              </a>
            </p>
          </div>
        )}

        {/* Main Form */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
          {/* Lyrics & Caption side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Lyrics - left, taller */}
            <div>
              <label className="text-xs font-medium text-zinc-400 block mb-1.5">
                Lyrics{" "}
                <span className="text-zinc-500 font-normal">
                  (empty = instrumental)
                </span>
              </label>
              <textarea
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
                placeholder="[Verse 1]&#10;Write your lyrics here...&#10;&#10;[Chorus]&#10;..."
                rows={8}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors resize-y"
              />
            </div>

            {/* Caption - right */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-zinc-400">
                  Caption <span className="text-red-400">*</span>
                </label>
                <span className={`text-[10px] tabular-nums ${caption.length > 280 ? "text-amber-400" : "text-zinc-600"}`}>
                  {caption.length}/{getModel(model).limits.max_caption}
                </span>
              </div>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value.slice(0, getModel(model).limits.max_caption))}
                placeholder="Describe the style and mood: upbeat electronic dance music with energetic synths and punchy drums..."
                rows={8}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors resize-y"
              />
            </div>
          </div>

          {/* Model & Format */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-zinc-400 block mb-1.5">
                Model
              </label>
              <select
                value={model}
                onChange={(e) => handleModelChange(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
              >
                {MODELS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-400 block mb-1.5">
                Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
              >
                {FORMATS.map((f) => (
                  <option key={f} value={f}>
                    {f.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Duration slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-zinc-400">
                Duration
              </label>
              <span className="text-xs text-zinc-300 tabular-nums">{duration}s</span>
            </div>
            <input
              type="range"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min={getModel(model).limits.min_duration}
              max={getModel(model).limits.max_duration}
              step={5}
              className="w-full accent-indigo-500 h-1.5 bg-zinc-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:hover:bg-indigo-400 [&::-webkit-slider-thumb]:transition-colors"
            />
            <div className="flex justify-between text-[10px] text-zinc-600 mt-0.5">
              <span>{getModel(model).limits.min_duration}s</span>
              <span>{getModel(model).limits.max_duration}s</span>
            </div>
          </div>

          {/* BPM slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-zinc-400">
                BPM
              </label>
              <div className="flex items-center gap-2">
                {bpm && (
                  <button
                    onClick={() => setBpm("")}
                    className="text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    Reset to Auto
                  </button>
                )}
                <span className="text-xs text-zinc-300 tabular-nums">
                  {bpm || "Auto"}
                </span>
              </div>
            </div>
            <input
              type="range"
              value={bpm || getModel(model).limits.min_bpm}
              onChange={(e) => setBpm(e.target.value)}
              min={getModel(model).limits.min_bpm}
              max={getModel(model).limits.max_bpm}
              step={1}
              className="w-full accent-indigo-500 h-1.5 bg-zinc-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:hover:bg-indigo-400 [&::-webkit-slider-thumb]:transition-colors"
            />
            <div className="flex justify-between text-[10px] text-zinc-600 mt-0.5">
              <span>{getModel(model).limits.min_bpm}</span>
              <span>{getModel(model).limits.max_bpm}</span>
            </div>
          </div>

          {/* Inference Steps slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-zinc-400">
                Inference Steps
              </label>
              <span className="text-xs text-zinc-300 tabular-nums">
                {inferenceSteps}
                {getModel(model).limits.min_steps === getModel(model).limits.max_steps && (
                  <span className="text-zinc-500 ml-1">(fixed)</span>
                )}
              </span>
            </div>
            <input
              type="range"
              value={inferenceSteps}
              onChange={(e) => setInferenceSteps(Number(e.target.value))}
              min={getModel(model).limits.min_steps}
              max={getModel(model).limits.max_steps}
              step={1}
              disabled={getModel(model).limits.min_steps === getModel(model).limits.max_steps}
              className="w-full accent-indigo-500 h-1.5 bg-zinc-800 rounded-full appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:hover:bg-indigo-400 [&::-webkit-slider-thumb]:transition-colors"
            />
            <div className="flex justify-between text-[10px] text-zinc-600 mt-0.5">
              <span>{getModel(model).limits.min_steps}</span>
              <span>{getModel(model).limits.max_steps}</span>
            </div>
          </div>

          {/* Guidance Scale slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-zinc-400">
                Guidance Scale
              </label>
              <span className="text-xs text-zinc-300 tabular-nums">
                {guidanceScale}
                {getModel(model).limits.min_guidance === getModel(model).limits.max_guidance && (
                  <span className="text-zinc-500 ml-1">(fixed)</span>
                )}
              </span>
            </div>
            <input
              type="range"
              value={guidanceScale}
              onChange={(e) => setGuidanceScale(Number(e.target.value))}
              min={getModel(model).limits.min_guidance}
              max={getModel(model).limits.max_guidance}
              step={0.5}
              disabled={getModel(model).limits.min_guidance === getModel(model).limits.max_guidance}
              className="w-full accent-indigo-500 h-1.5 bg-zinc-800 rounded-full appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:hover:bg-indigo-400 [&::-webkit-slider-thumb]:transition-colors"
            />
            <div className="flex justify-between text-[10px] text-zinc-600 mt-0.5">
              <span>{getModel(model).limits.min_guidance}</span>
              <span>{getModel(model).limits.max_guidance}</span>
            </div>
          </div>

          {/* Key/Scale, Time Signature, Vocal Language */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium text-zinc-400 block mb-1.5">
                Key / Scale
              </label>
              <input
                type="text"
                value={keyscale}
                onChange={(e) => setKeyscale(e.target.value)}
                placeholder="e.g. C major"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-400 block mb-1.5">
                Time Signature
              </label>
              <select
                value={timesignature}
                onChange={(e) => setTimesignature(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
              >
                {TIME_SIGNATURES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-400 block mb-1.5">
                Vocal Lang
              </label>
              <input
                type="text"
                value={vocalLanguage}
                onChange={(e) => setVocalLanguage(e.target.value)}
                placeholder="en"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
              />
            </div>
          </div>

          {/* Seed */}
          <div>
            <label className="text-xs font-medium text-zinc-400 block mb-1.5">
              Seed
            </label>
            <input
              type="number"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              placeholder="Random"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
            />
          </div>

          {/* Generate / Cancel Buttons */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-700 disabled:text-zinc-500 rounded-lg font-medium text-sm transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              {status === "submitting"
                ? "Sending..."
                : status === "polling"
                  ? `Generating... ${progress}%`
                  : "Generate Music"}
            </button>
            {isGenerating && (
              <button
                onClick={handleCancel}
                className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-sm text-zinc-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        {status === "polling" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="flex justify-between text-xs text-zinc-400 mb-2">
              <span className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                Generating your track...
              </span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-indigo-500 h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.max(progress, 2)}%` }}
              />
            </div>
            {costCredits != null && (
              <div className="text-xs text-zinc-500 mt-2">
                Cost: {costCredits} credits
              </div>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-950/40 border border-red-900/50 rounded-xl p-4 flex items-start gap-3">
            <span className="text-red-400 mt-0.5 shrink-0">&#10006;</span>
            <div>
              <p className="text-sm text-red-300">{error}</p>
              <button
                onClick={() => setError("")}
                className="text-xs text-red-400/60 hover:text-red-300 mt-1 transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Current Result */}
        {status === "completed" && resultUrl && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-zinc-100 flex items-center gap-2">
                <span className="text-green-400">&#10003;</span> Generation
                Complete
              </h2>
              {costCredits != null && (
                <span className="text-xs text-zinc-400 bg-zinc-800 px-2 py-1 rounded">
                  {costCredits} credits
                </span>
              )}
            </div>
            <audio src={resultUrl} controls className="w-full" />
            <div className="flex gap-3">
              <a
                href={resultUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Open in new tab
              </a>
              <a
                href={resultUrl}
                download
                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Download
              </a>
            </div>
          </div>
        )}

        {/* Session History */}
        {history.length > 1 && (
          <div className="space-y-3">
            <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Previous Generations
            </h3>
            {history.slice(1).map((item, i) => (
              <div
                key={i}
                className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-zinc-300 truncate max-w-md">
                    {item.caption}
                  </p>
                  <span className="text-xs text-zinc-500 shrink-0 ml-2">
                    {item.timestamp}
                  </span>
                </div>
                <audio src={item.resultUrl} controls className="w-full" />
                <div className="flex gap-4 text-xs text-zinc-500">
                  <span>
                    {MODELS.find((m) => m.value === item.model)?.label ??
                      item.model}
                  </span>
                  <span>{item.duration}s</span>
                  {item.cost != null && <span>{item.cost} credits</span>}
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Examples */}
        <div className="space-y-3">
          <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
            Examples — click to load
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.title}
                onClick={() => loadExample(ex)}
                className="text-left bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800/50 hover:border-zinc-700 rounded-lg p-3 transition-colors cursor-pointer group"
              >
                <p className="text-sm font-medium text-zinc-200 group-hover:text-indigo-300 transition-colors">
                  {ex.title}
                </p>
                <p className="text-[11px] text-zinc-500 mt-1 line-clamp-2 leading-tight">
                  {ex.caption.slice(0, 80)}...
                </p>
                <div className="flex gap-2 mt-2 text-[10px] text-zinc-600">
                  <span>{ex.bpm} bpm</span>
                  <span>{ex.keyscale}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-800/40 mt-8 py-6">
        <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-zinc-600">
          <span>Powered by</span>
          <a href="https://deapi.ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition-colors">
            <img src="https://deapi.ai/images/logo-deapi.svg" alt="deAPI" className="h-4" />
            <span>deapi.ai</span>
          </a>
          <span className="hidden sm:inline">—</span>
          <span>AI Music Generation API</span>
        </div>
      </footer>
    </div>
  );
}
