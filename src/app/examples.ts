export interface Example {
  title: string;
  caption: string;
  lyrics: string;
  bpm: string;
  keyscale: string;
  timesignature: string;
  vocalLanguage: string;
  duration: number;
}

export const EXAMPLES: Example[] = [
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
  {
    title: "Disco Polo",
    caption: "disco polo, catchy synth melody, energetic dance beat, bright male vocal, upbeat and joyful, Polish party music, cheesy keyboard riffs, four-on-the-floor kick, summer wedding vibes, polished euro production",
    lyrics: "[Intro - synth melody]\n\n[Verse 1]\nMuzyka gra i noc jest mloda\nKazdy tanczy, kazdy szaleje\nTy i ja na parkiecie\nDzisiaj nic nas nie zatrzyma\n\n[Pre-Chorus]\nDaj mi reke, poczuj rytm\nNiech ten beat porwie nas w tan\n\n[Chorus]\nHej, hej, bawmy sie\nCala noc tanczymy razem\nHej, hej, krecmy sie\nDo rana nie przestajem\n\n[Verse 2]\nSwiatla migaja kolorami\nBas dudni w naszych sercach\nNie pytaj mnie o jutro\nDzis jest nasza wielka noc\n\n[Chorus]\nHej, hej, bawmy sie\nCala noc tanczymy razem\nHej, hej, krecmy sie\nDo rana nie przestajem\n\n[Outro - synth melody]",
    bpm: "138", keyscale: "D Major", timesignature: "4", vocalLanguage: "pl", duration: 150,
  },
  {
    title: "French Chanson",
    caption: "French chanson, accordion, gentle acoustic guitar, warm male vocal, intimate cafe atmosphere, romantic and melancholic, Parisian nostalgia, vintage recording warmth, Edith Piaf era inspired",
    lyrics: "[Intro - accordion]\n\n[Verse 1]\nSous les ponts de la Seine endormie\nLes lumieres dansent dans la nuit\nTon sourire comme une melodie\nQui revient hanter mes nuits\n\n[Verse 2]\nLe cafe froid sur la terrasse\nLe temps s'arrete un instant\nJe cherche encore dans la foule\nTon regard et ton parfum\n\n[Chorus]\nParis mon amour, Paris ma douleur\nChaque rue murmure ton nom\nDans le vent d'automne et les fleurs\nJe te cherche a chaque chanson\n\n[Accordion Solo - expressive]\n\n[Verse 3]\nLes saisons passent sans toi\nMais la ville se souvient\nDe nos pas sur les paves\nEt de tout ce qui fut bien\n\n[Chorus]\nParis mon amour, Paris ma douleur\n\n[Outro - gentle, fade out]",
    bpm: "96", keyscale: "A Minor", timesignature: "3", vocalLanguage: "fr", duration: 180,
  },
  {
    title: "Bollywood Dance",
    caption: "Bollywood dance track, tabla, dholak, sitar accent, bright female vocal, energetic and celebratory, colorful and festive, modern Indian pop production, dhol bass, string section",
    lyrics: "[Intro - tabla and sitar]\n\n[Verse 1]\nDil mein hai jo baat chhupee\nAaj kehne ka mausam hai\nNachle re nachle saathiya\nKhushiyon ka yeh jashn hai\n\n[Pre-Chorus - building energy]\nHaathon mein haath leke\nSapno ki raahon mein\n\n[Chorus]\nNachle re nachle\nSaari raat nachle\nDhol baje aur dil dhadke\nNachle re nachle\n\n[Verse 2]\nRangon se bhari yeh shaam\nHar taraf khushi ka naam\nPairon mein ghungroo baandh ke\nChal duniya ko nacha de\n\n[Bridge - dhol solo]\n\n[Final Chorus - powerful]\nNACHLE RE NACHLE\nSAARI RAAT NACHLE\n\n[Outro - tabla fade]",
    bpm: "130", keyscale: "C Major", timesignature: "4", vocalLanguage: "hi", duration: 150,
  },
  {
    title: "German Techno",
    caption: "Berlin techno, dark minimal, driving four-on-the-floor kick, deep pulsing bass, industrial textures, hypnotic synth loops, warehouse atmosphere, Berghain inspired, relentless and immersive",
    lyrics: "[Instrumental]\n\n[Intro - kick and bass pulse]\n\n[Build - synth loop entering]\n\n[Main Groove - full hypnotic drive]\n\n[Breakdown - dark textures, sparse]\n\n[Build - industrial layers]\n\n[Main Groove - relentless]\n\n[Outro - stripped back, fade]",
    bpm: "135", keyscale: "C Minor", timesignature: "4", vocalLanguage: "de", duration: 180,
  },
  {
    title: "Brazilian Funk",
    caption: "Brazilian funk carioca, heavy bass, atabaque percussion, catchy vocal hook, male vocal, energetic baile funk beat, Rio de Janeiro party vibe, modern and bouncy, raw production",
    lyrics: "[Intro - bass hit]\n\n[Verse 1]\nO baile comecou, ja pode chegar\nO som ta pesado, o chao vai tremer\nLevanta a mao e pode gritar\nQue a noite e nossa, ninguem vai parar\n\n[Chorus]\nVai, vai, vai descer\nTodo mundo quer saber\nO beat ta forte, o grave e demais\nA favela nunca para jamais\n\n[Verse 2]\nDJ solta o beat pesadao\nTodo mundo junto nessa conexao\nDo Leme ao Pontal, da Sul a Central\nO funk e a voz do povo real\n\n[Chorus]\nVai, vai, vai descer\nTodo mundo quer saber\n\n[Outro - bass heavy]",
    bpm: "150", keyscale: "D Minor", timesignature: "4", vocalLanguage: "pt", duration: 120,
  },
  {
    title: "Arabic Oud Ballad",
    caption: "Arabic ballad, solo oud, oriental maqam, gentle darbuka percussion, emotional male vocal, melancholic and passionate, Middle Eastern classical influence, intimate and warm, reverb-rich atmosphere",
    lyrics: "[Intro - solo oud, rubato]\n\n[Verse 1]\nيا ليل يا عين يا ليل\nقلبي حزين والدمع سايل\nفين الحبيب اللي وعدني\nراح وتركني في الليالي\n\n[Verse 2]\nنسمة هوا من بعيد\nتحمل عطرك يا حبيبي\nوأنا هنا وحدي أغني\nأغنية حب قديمة\n\n[Chorus]\nيا حبيبي يا نور عيني\nارجع تعالى لا تبعد عني\nالقلب ما ينسى حنينك\nوالروح تبكي من غيابك\n\n[Oud Solo - expressive]\n\n[Verse 3]\nلو كل نجمة في السما\nتحكي حكاية عن هوانا\nما كفت ليالي العمر كله\nيوصف جمال اللي بينا\n\n[Chorus]\nيا حبيبي يا نور عيني\n\n[Outro - oud, fade out]",
    bpm: "80", keyscale: "D Minor", timesignature: "4", vocalLanguage: "ar", duration: 180,
  },
  {
    title: "Turkish Psychedelic",
    caption: "Anatolian rock, psychedelic, electric saz, wah-wah guitar, groovy bass, driving drums, 70s Turkish rock, Baris Manco inspired, hypnotic and raw, vintage analog production",
    lyrics: "[Intro - electric saz]\n\n[Verse 1]\nDaglardan esen yel gibi\nRuhumu alip goturur\nBu yollar bitmez sanirdim\nAma her sey bir gun biter\n\n[Chorus]\nDon gel yolcu, don gel\nYollar seni bekler\nGecenin karanliginda\nBir isik hep yanar\n\n[Saz Solo - psychedelic]\n\n[Verse 2]\nZaman bir nehir akar\nGeri donusu olmayan\nBugunku gun yarin olmaz\nYasamak simdi burada\n\n[Chorus]\nDon gel yolcu, don gel\nYollar seni bekler\n\n[Outro - heavy groove]",
    bpm: "125", keyscale: "E Minor", timesignature: "4", vocalLanguage: "tr", duration: 150,
  },
  {
    title: "Korean Ballad",
    caption: "Korean ballad, emotional piano, lush string orchestra, powerful male vocal, soaring high notes, dramatic and heartfelt, K-drama OST style, polished production, bittersweet atmosphere",
    lyrics: "[Intro - piano]\n\n[Verse 1]\n텅 빈 거리에 혼자 서서\n너의 이름을 불러본다\n바람에 실려 사라지는\n우리의 마지막 인사\n\n[Pre-Chorus]\n시간이 지나도\n이 마음은 변하지 않아\n\n[Chorus - powerful]\n너를 보낸 그날부터\n하루도 잊은 적 없어\n이 가슴에 남은 너의 온기\n아직도 나를 울려\n\n[Verse 2]\n사진 속 너의 미소가\n오늘따라 더 선명해\n돌아갈 수 없는 그때로\n다시 한번 갈 수 있다면\n\n[Bridge - whispered]\n미안해 그리고 고마워\n사랑했어 정말로\n\n[Final Chorus - powerful]\n너를 보낸 그날부터\n하루도 잊은 적 없어\n\n[Outro - piano, fade out]",
    bpm: "70", keyscale: "Ab Major", timesignature: "4", vocalLanguage: "ko", duration: 180,
  },
];
