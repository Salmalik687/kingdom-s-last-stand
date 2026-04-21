import { useState, useEffect, useRef } from "react";

const WAVE_DIALOGUES = {
  // ── Land 1: The Verdant Meadow ──
  1:  { speaker: "Lord Aldric",      text: "They come. Let them. I have stared into darker eyes than these and walked away breathing. Hold the line!" },
  2:  { speaker: "Kael Ironbow",     text: "I've tracked beasts across a hundred borderlands. These ones are sloppy. They underestimate us. That is their mistake." },
  3:  { speaker: "Aurora",           text: "The light of the Sun Temple burns within me still. Every arrow that falls short is another prayer I'll make louder." },
  4:  { speaker: "Morrigan",         text: "They call my magic 'dark.' Let them watch what darkness does to those who threaten innocent lives." },
  5:  { speaker: "Queen Seraphine",  text: "The Forest Drake has fallen! Thy courage burns bright as a thousand torches, brave hero!" },

  // ── Land 2: The Dark Dungeon ──
  6:  { speaker: "Queen Seraphine",  text: "We move now into the Dark Dungeon. Ancient evil stirs in its depths. Remain vigilant, champions!" },
  7:  { speaker: "Lord Aldric",      text: "The dungeon reeks of old blood and betrayal. Good. That means the enemy has been comfortable here for too long." },
  8:  { speaker: "Morrigan",         text: "I spent years in a dungeon not unlike this one. Accused of crimes I did not commit. Today — I repay that debt in full." },
  9:  { speaker: "Kael Ironbow",     text: "Tunnels, shadows, and things that don't bleed like men should. I've seen worse. Well... almost." },
  10: { speaker: "Queen Seraphine",  text: "The Dungeon Overlord is vanquished! Two lands are now free from darkness. Half our quest remains!" },

  // ── Land 3: Volcanic Wastes ──
  11: { speaker: "Aurora",           text: "The Volcanic Wastes... even the earth itself rebels against us. But the Sun's warmth is older than any volcano's fire." },
  12: { speaker: "Lord Aldric",      text: "I've marched soldiers through mud, snow, and plague. Lava is just another obstacle. Form up. Eyes forward." },
  13: { speaker: "Kael Ironbow",     text: "The heat warps the air so badly I can barely aim. But I was trained to loose arrows in a hurricane. This is nothing." },
  14: { speaker: "Morrigan",         text: "The Flame Titan draws near. I can feel its heat from here. Fitting — they thought my banishment would be a cold death. Instead, I burn brighter." },
  15: { speaker: "Queen Seraphine",  text: "The Flame Titan burns no more! Three lands reclaimed. The frozen abyss calls to us next..." },

  // ── Land 4: The Frozen Abyss ──
  16: { speaker: "Queen Seraphine",  text: "The Frozen Abyss looms ahead, where even light itself turns to ice. Hold thy faith, champions." },
  17: { speaker: "Aurora",           text: "My paladins warned me of this place. Where faith freezes and hope shatters. But I refuse. I REFUSE to let this darkness win." },
  18: { speaker: "Lord Aldric",      text: "The cold bites deep. In my worst campaign, we lost three dozen to frostbite in a single night. Today, we lose no one." },
  19: { speaker: "Kael Ironbow",     text: "Every breath feels like swallowing glass. But I've lived through worse winters alone in the borderlands. The cold and I are old friends." },
  20: { speaker: "Queen Seraphine",  text: "The Frost Colossus shatters into eternal snow. Four lands are saved! Only one darkness remains!" },

  // ── Land 5: The Shadow Realm ──
  21: { speaker: "Queen Seraphine",  text: "This is it — The Shadow Realm. The very heart of Malgrath's power. For Eldenmoor, we fight!" },
  22: { speaker: "Morrigan",         text: "Shadow magic. The kind they accused me of wielding. But this — this is what true darkness looks like. And I will unmake it." },
  23: { speaker: "Lord Aldric",      text: "I've never feared death. I've feared being useless in the moment it matters most. That moment is NOW. I will not be useless." },
  24: { speaker: "Aurora",           text: "In the shadow realm, even the gods fall silent. But my will does not need the gods. It needs only truth — and truth is light." },
  25: { speaker: "Queen Seraphine",  text: "The Shadow Sovereign falls! Malgrath's grip loosens. One final battle stands between us and true peace..." },

  // ── Land 6: The Demon's Throne ──
  26: { speaker: "Queen Seraphine",  text: "The Demon Lord himself descends! This is our final stand, champions. Save Eldenmoor. SAVE US ALL!" },
  27: { speaker: "Kael Ironbow",     text: "Malgrath. The name fathers use to terrify children. Well. I'm not a child. And I have arrows with his name on them." },
  28: { speaker: "Morrigan",         text: "Ten thousand years of darkness incarnate stands before us. I've been preparing for this my entire life without knowing it." },
  29: { speaker: "Aurora",           text: "Demon Lord Malgrath — your reign of terror ends HERE. Every innocent soul you've claimed cries out for justice. I AM THAT JUSTICE." },
  30: { speaker: "Queen Seraphine",  text: "VICTORY! The Demon Lord Malgrath is NO MORE! Eldenmoor is FOREVER FREE! Thou art our eternal savior!" },

  // ── Land 7: The Shattered Gates ──
  31: { speaker: "Lord Aldric",      text: "The gates are broken. Whatever sealed those horrors away is gone. I didn't survive six campaigns to stop now." },
  32: { speaker: "Kael Ironbow",     text: "Beyond these gates are things no ranger's map has ever charted. Good. Uncharted territory is where I do my best work." },
  33: { speaker: "Morrigan",         text: "The seals on these gates were carved in languages older than Eldenmoor itself. Their breaking was not an accident. Someone opened them." },
  34: { speaker: "Aurora",           text: "What pours through those gates is ancient beyond measure. But so is the light that formed the stars — and the stars still shine." },
  35: { speaker: "Queen Seraphine",  text: "The Guardian falls... but the true darkness cannot be sealed. Not again. Something far older stirs behind the veil." },

  // ── Land 8: The Corrupted Grove ──
  36: { speaker: "Queen Seraphine",  text: "Nature itself has been poisoned. The Corrupted Grove spreads like a sickness. This evil is... something we haven't faced before." },
  37: { speaker: "Aurora",           text: "The trees scream. I can hear them. Living things, twisted into weapons by a will that despises all that grows. This stops NOW." },
  38: { speaker: "Lord Aldric",      text: "In forty years of war, I've never had to fight a forest. I'll adapt. I always do. That's why I'm still standing." },
  39: { speaker: "Kael Ironbow",     text: "I was raised in forests like this one. Before the corruption. I remember what they were. That memory is what I fight for." },
  40: { speaker: "Queen Seraphine",  text: "The corruption is purged... but at what cost? Nature will not heal for generations. I wonder sometimes what victory truly costs us." },

  // ── Land 9: The Plaguelands ──
  41: { speaker: "Morrigan",         text: "The Plague Mother. A creature of living disease. My magic was born to counter exactly this — corruption that masquerades as nature." },
  42: { speaker: "Lord Aldric",      text: "I watched plague take half my regiment in the Eastern Campaign. I swore I'd never be powerless against it again. Today I keep that oath." },
  43: { speaker: "Aurora",           text: "Sickness and despair are merely darkness wearing a different mask. My light has never failed against darkness. It will not fail today." },
  44: { speaker: "Kael Ironbow",     text: "Every village I've passed through recently bore the marks of this plague. Empty streets. Silence where children should be laughing. Never again." },
  45: { speaker: "Queen Seraphine",  text: "The plagues are contained. But I see it — you're all changing. This war has marked each of you deeply. Let me carry some of that weight." },

  // ── Land 10: The Crystallic Scar ──
  46: { speaker: "Lord Aldric",      text: "The Crystallic Scar. Reality cracked open like a broken shield. I've seen empires fall. I won't watch reality follow them." },
  47: { speaker: "Morrigan",         text: "The wound in reality... it calls to the arcane in my blood. Like a siren's song. But I know what lies beyond it. And I choose THIS side." },
  48: { speaker: "Kael Ironbow",     text: "Ten lands. Countless arrows. And still we stand. Whatever's in that Scar — my aim doesn't get worse under pressure. It gets sharper." },
  49: { speaker: "Aurora",           text: "A wound in the fabric of all things. Even the gods wept when this was made. But gods can weep — heroes act. Let us act." },
  50: { speaker: "Queen Seraphine",  text: "That crystalline entity... it was only one of many. We are not fighting a war, champions. We are witnessing an awakening." },

  // ── Land 11: Stormbreak Pass ──
  51: { speaker: "Lord Aldric",      text: "The Storm Sovereign commands the sky itself. I've fought in tempests before. The trick is to become the calmest thing on the battlefield." },
  52: { speaker: "Kael Ironbow",     text: "Wind makes arrows drift. But I account for wind before I loose. It's the archers who don't that worry me — and I am not one of them." },
  53: { speaker: "Morrigan",         text: "Lightning and thunder — nature's own arcane fury. I've spent a lifetime studying it. Today, I put that study to work." },
  54: { speaker: "Aurora",           text: "The storm howls and the heavens crack. But in every storm there is an eye of calm. I will BE that calm for this kingdom." },
  55: { speaker: "Queen Seraphine",  text: "The storms subside. But you... each of you has become something beyond mortal. Are we saving Eldenmoor, or forging legends?" },

  // ── Land 12: The Infernal Chasms ──
  56: { speaker: "Morrigan",         text: "The Infernal Patriarch. An ancient lord of the underworld. They say he predates the gods themselves. Good. I prefer a worthy opponent." },
  57: { speaker: "Lord Aldric",      text: "An infernal chasm belching fire and brimstone. My troops would call this a nightmare. I call it Tuesday." },
  58: { speaker: "Aurora",           text: "The underworld reaches upward for our world. It will not have it. Not while I still breathe and my light still burns." },
  59: { speaker: "Kael Ironbow",     text: "Fire from below, monsters from beyond, and an eternity of darkness above. I've had worse odds. Much worse." },
  60: { speaker: "Queen Seraphine",  text: "The infernal lords fall... but I scarcely recognize this battlefield. Or us. Are we still the same people who set out to defend Eldenmoor?" },

  // ── Land 13: The Void's Edges ──
  61: { speaker: "Morrigan",         text: "The Void. Nothingness given will. It speaks in the language of entropy. I have spent my life refusing to become nothing. I refuse still." },
  62: { speaker: "Lord Aldric",      text: "The void... I've stared into it before. In the darkest moments after my greatest failure. I did not blink then. I will not blink now." },
  63: { speaker: "Kael Ironbow",     text: "They say arrows can't wound what has no body. I say I'll find what passes for a body in the void and put an arrow through it." },
  64: { speaker: "Aurora",           text: "The Void Warden exists between dimensions. But light exists in ALL dimensions. There is nowhere it can hide from me." },
  65: { speaker: "Queen Seraphine",  text: "The Void recedes... but together we face what comes next. Not as ruler and champions — as souls who have chosen each other." },

  // ── Land 14: The Celestial Spire ──
  66: { speaker: "Lord Aldric",      text: "The Celestial Spire. I've scaled mountain fortresses in blizzards. This is simply a taller climb. And the view at the top will be worth it." },
  67: { speaker: "Aurora",           text: "The Celestial Sentinel — a guardian of the highest realms. We face not a monster, but a god's own soldier. And still we face it." },
  68: { speaker: "Kael Ironbow",     text: "At the top of the world, with nowhere left to run. Good. Running was never my style anyway. This is where rangers make their names." },
  69: { speaker: "Morrigan",         text: "The answer to everything waits at the spire's peak. I've sought knowledge my entire life. Today, I claim the greatest truth of all." },
  70: { speaker: "Queen Seraphine",  text: "You stand atop the spire. The answer is revealed... oh heroes, do you see? Do you understand now what we must do?" },

  // ── Land 15: Malgrath's Throne ──
  71: { speaker: "Lord Aldric",      text: "The Origin of All Darkness. The first evil. The reason all of this began. I will end what began before memory itself. Or I will die trying." },
  72: { speaker: "Morrigan",         text: "The primordial darkness that birthed every evil we have faced. This is why I was given my gifts. This moment. This enemy. This destiny." },
  73: { speaker: "Aurora",           text: "The Origin speaks and stars go dark. But it cannot silence the light within us — the light that has survived every darkness before it." },
  74: { speaker: "Kael Ironbow",     text: "Every arrow I've ever loosed has been leading to this moment. One final shot. I won't miss. I have NEVER missed what truly mattered." },
  75: { speaker: "Queen Seraphine",  text: "THE CYCLE BREAKS! You have not just saved Eldenmoor — you have healed the universe itself. Your names will echo until the stars themselves go dark." },
};

const SPEAKER_COLORS = {
  "Lord Aldric":     "#c9915a",
  "Queen Seraphine": "#5a9a7a",
  "Morrigan":        "#a78bfa",
  "Kael Ironbow":    "#38bdf8",
  "Aurora":          "#fbbf24",
};

const SPEAKER_ICONS = {
  "Lord Aldric":     "⚔",
  "Queen Seraphine": "♛",
  "Morrigan":        "🔮",
  "Kael Ironbow":    "🏹",
  "Aurora":          "✨",
};

export default function WaveDialogue({ wave, show }) {
  const [typed, setTyped] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const typeRef = useRef(null);
  const dialogue = WAVE_DIALOGUES[wave];

  useEffect(() => {
    if (!show || !dialogue) {
      setTyped("");
      setIsTyping(false);
      return;
    }

    setTyped("");
    setIsTyping(true);

    const timeout = setTimeout(() => {
      setIsTyping(false);
      setTimeout(() => setIsTyping(false), 4000);
    }, dialogue.text.length * 35 + 500);

    return () => clearTimeout(timeout);
  }, [wave, show, dialogue]);

  useEffect(() => {
    if (!isTyping || !dialogue) return;
    if (typed.length >= dialogue.text.length) {
      setIsTyping(false);
      return;
    }

    typeRef.current = setTimeout(() => {
      setTyped(dialogue.text.slice(0, typed.length + 1));
    }, 35);

    return () => clearTimeout(typeRef.current);
  }, [typed, isTyping, dialogue]);

  if (!show || !dialogue) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 max-w-lg mx-4"
      style={{
        animation: "slideUp 0.4s cubic-bezier(0.34,1.3,0.64,1) forwards",
      }}>

      <div style={{
        background: "linear-gradient(160deg, rgba(10,4,20,0.96) 0%, rgba(20,10,30,0.96) 100%)",
        border: `2px solid ${SPEAKER_COLORS[dialogue.speaker] ?? "#5a9a7a"}99`,
        borderRadius: 12,
        padding: "16px 20px",
        boxShadow: `0 0 40px ${SPEAKER_COLORS[dialogue.speaker] ?? "#5a9a7a"}44, 0 8px 24px rgba(0,0,0,0.6)`,
        backdropFilter: "blur(8px)",
      }}>
        {/* Speaker name */}
        <div style={{
          fontSize: 10,
          fontWeight: 900,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: SPEAKER_COLORS[dialogue.speaker] ?? "#5a9a7a",
          fontFamily: "'Cinzel', serif",
          marginBottom: 6,
          textShadow: `0 0 10px ${SPEAKER_COLORS[dialogue.speaker] ?? "#5a9a7a"}88`,
        }}>
          {SPEAKER_ICONS[dialogue.speaker] ?? "⚔"} {dialogue.speaker}
        </div>

        {/* Dialogue text */}
        <p style={{
          fontSize: 13,
          color: "#f0e6ff",
          lineHeight: 1.6,
          fontFamily: "'Cinzel', serif",
          letterSpacing: "0.01em",
          margin: 0,
        }}>
          "{typed}
          {isTyping && <span style={{ opacity: 0.7, animation: "blink 0.6s ease-in-out infinite" }}>▌</span>}"
        </p>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateX(-50%) translateY(40px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
        @keyframes blink { 0%,100% { opacity: 0.2; } 50% { opacity: 1; } }
      `}</style>
    </div>
  );
}