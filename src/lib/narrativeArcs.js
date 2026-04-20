// 15-Land Narrative Arc with Character Development
// This tracks Queen Seraphine's journey and Aldric's growing legend

export const NARRATIVE_CHAPTERS = {
  // Land 1: The Call to Adventure
  1: {
    name: "The Verdant Meadow",
    intro: "The realm of Eldenmoor awakens to danger. Queen Seraphine calls upon Lord Aldric to defend the Verdant Meadow—the first line of defense.",
    seraphineQuote: "Our forests have always been sacred, Aldric. Protect them, and the realm's hope grows stronger.",
    tone: "hopeful_determined",
    characterArc: "aldric_accepts_mission",
  },
  5: {
    name: "Forest Drake Defeated",
    victory: "The ancient Forest Drake falls! Aldric's legend begins. Seraphine's faith is rewarded.",
    seraphineQuote: "You have proven yourself worthy. The first land is saved, but many more threats loom ahead.",
    tone: "triumphant_cautious",
    characterArc: "aldric_gains_confidence",
  },

  // Land 2: Descent into Darkness
  6: {
    name: "The Dark Dungeon Begins",
    intro: "The kingdom descends into the Dark Dungeon, where ancient evil stirs. Seraphine's grip on hope weakens.",
    seraphineQuote: "Into the darkness you go, Aldric. I can only pray the light within you guides your path.",
    tone: "ominous_tense",
    characterArc: "seraphine_worries",
  },
  10: {
    name: "Dungeon Overlord Falls",
    victory: "The Dungeon Overlord is vanquished! Two lands liberated. Seraphine's faith in Aldric grows absolute.",
    seraphineQuote: "No force of darkness can withstand your will, Aldric. You are becoming the legend we need.",
    tone: "triumphant_inspired",
    characterArc: "aldric_becomes_legend",
  },

  // Land 3: Trial by Fire
  11: {
    name: "Volcanic Wastes Await",
    intro: "The Volcanic Wastes stretch before you—a hellscape born of Malgrath's ancient wrath. Seraphine fears this land most.",
    seraphineQuote: "The Flame Titan guards this cursed place. If you fall here, Eldenmoor falls with you.",
    tone: "desperate_grave",
    characterArc: "seraphine_fears_loss",
  },
  15: {
    name: "Flame Titan Conquered",
    victory: "The Flame Titan burns no more. Aldric emerges stronger, more resolute. Seraphine sees the true power within him.",
    seraphineQuote: "You have walked through fire itself and emerged unbroken. Three lands freed. The realm begins to believe again.",
    tone: "awestruck_hopeful",
    characterArc: "aldric_transcends_mortal",
  },

  // Land 4: The Frozen Heart
  16: {
    name: "The Frozen Abyss Looms",
    intro: "The Frozen Abyss spreads before you—a desolate realm of eternal winter where even hope crystallizes into ice.",
    seraphineQuote: "This place is older than kingdoms, Aldric. The Frost Colossus has reigned here for eons. Perhaps... perhaps even you have limits.",
    tone: "fearful_doubtful",
    characterArc: "seraphine_doubts_slightly",
  },
  20: {
    name: "Frost Colossus Shatters",
    victory: "The Frost Colossus shatters into eternal snow. Aldric has proven invincible. Seraphine's doubt melts away completely.",
    seraphineQuote: "You are no mere mortal, Aldric. You are destiny itself. Four lands are free. We approach the final darkness.",
    tone: "reverent_awestruck",
    characterArc: "aldric_becomes_godlike",
  },

  // Land 5: Shadow's Grip
  21: {
    name: "Shadow Realm Beckons",
    intro: "The Shadow Realm looms—a place where light itself has been devoured. Seraphine feels the presence of Malgrath himself drawing near.",
    seraphineQuote: "We stand at the precipice of eternity, Aldric. Malgrath's power grows. This is where all lesser champions have failed.",
    tone: "apocalyptic_tense",
    characterArc: "seraphine_final_doubt",
  },
  25: {
    name: "Shadow Sovereign Falls",
    victory: "The Shadow Sovereign crumbles! Malgrath himself now prepares to descend. Seraphine and Aldric draw near their final confrontation.",
    seraphineQuote: "One more battle, Aldric. The Demon Lord himself waits. For Eldenmoor. For us. For everything.",
    tone: "climactic_determined",
    characterArc: "aldric_ready_for_final_test",
  },

  // Land 6: Demon Lord's Descent
  26: {
    name: "The Demon Lord Arrives",
    intro: "Malgrath descends from the abyss itself. The sky tears. The earth trembles. The final battle begins.",
    seraphineQuote: "He comes! The ancient evil that plagued our realm for ten thousand years is here! Aldric, this is your moment of destiny!",
    tone: "apocalyptic_final",
    characterArc: "aldric_final_stand",
  },
  30: {
    name: "Eternal Peace Restored",
    victory: "MALGRATH FALLS! The Demon Lord is no more! Eldenmoor is forever free!",
    seraphineQuote: "Lord Aldric... my champion... my hero... you have saved not just a kingdom, but the very soul of our world. History will remember your name for ten thousand years.",
    tone: "triumphant_sacred",
    characterArc: "aldric_ascends_legend_eternal",
  },

  // New Lands 7-15: Extended Campaign
  31: {
    name: "Shattered Gates Open",
    intro: "Even with Malgrath defeated, darkness persists. Ancient gates that sealed away older evils have begun to crack.",
    seraphineQuote: "The victory is hollow, Aldric. We have merely slowed the inevitable. There are older powers stirring—forces that predate even the Demon Lord.",
    tone: "grave_mysterious",
    characterArc: "seraphine_reveals_greater_threat",
  },
  35: {
    name: "Guardian of the Gates Falls",
    victory: "The guardian falls. But the gates cannot be sealed again—not without a greater sacrifice.",
    seraphineQuote: "You were meant for this, Aldric. Not just to save us from one darkness, but from the cycle itself.",
    tone: "somber_prophetic",
    characterArc: "aldric_accepts_greater_destiny",
  },

  36: {
    name: "The Grove Corrupts",
    intro: "Nature itself has been poisoned. The Corrupted Grove spreads like a sickness across the land.",
    seraphineQuote: "This is different, Aldric. This is not conquest or invasion. This is rot. Contamination. I fear we cannot simply slay this enemy.",
    tone: "haunting_uncertain",
    characterArc: "seraphine_shows_vulnerability",
  },
  40: {
    name: "Grove Purified",
    victory: "The corruption is burned away, but at great cost. Nature will not heal for generations.",
    seraphineQuote: "Salvation has a price, doesn't it? Save one thing, and something else withers. Is this the burden of being a hero?",
    tone: "bittersweet_reflective",
    characterArc: "aldric_questions_cost",
  },

  41: {
    name: "Plaguelands Spread",
    intro: "Disease and pestilence consume the land. Ancient plagues return—diseases that killed thousands in ages past.",
    seraphineQuote: "Aldric... I've never seen you look uncertain. Perhaps even a legend has his limits. Perhaps I ask too much of you.",
    tone: "worried_supportive",
    characterArc: "seraphine_shows_care",
  },
  45: {
    name: "Plague Contained",
    victory: "The plagues are contained, but Aldric himself bears new scars—both visible and unseen.",
    seraphineQuote: "You're changing, Aldric. With each battle, you carry more weight. Let me share this burden with you.",
    tone: "intimate_tender",
    characterArc: "seraphine_aldric_bond_deepens",
  },

  46: {
    name: "The Scar Awakens",
    intro: "Deep within the earth, crystalline structures pulse with an otherworldly light. Something is being born.",
    seraphineQuote: "This power... it feels older than time itself. Aldric, what are we truly fighting? What has our world become?",
    tone: "awestruck_frightened",
    characterArc: "seraphine_seeks_truth",
  },
  50: {
    name: "Crystalline Entity Broken",
    victory: "The entity crumbles, but fragments of it scatter across the realm. It was only one of many.",
    seraphineQuote: "We're not fighting a war, Aldric. We're witnessing the awakening of something fundamental. And we're caught in the middle.",
    tone: "existential_dark",
    characterArc: "aldric_reality_distorts",
  },

  51: {
    name: "Stormbreak Arrives",
    intro: "Endless storms rage across the mountain pass. Lightning that burns like divine fire strikes without mercy.",
    seraphineQuote: "Perhaps the heavens themselves object to our survival. Is the realm itself turning against us?",
    tone: "apocalyptic_questioning",
    characterArc: "aldric_communes_with_nature",
  },
  55: {
    name: "Storm Masters Subdued",
    victory: "The storms calm, but only temporarily. Aldric realizes he can now command the very forces of nature.",
    seraphineQuote: "You're becoming something beyond human, Aldric. Are we still saving Eldenmoor... or are you becoming our new god?",
    tone: "awed_concerned",
    characterArc: "aldric_power_transcendent",
  },

  56: {
    name: "Chasms Descend",
    intro: "The earth opens. Infinite chasms reveal realms beneath realms—infinite layers of hell, one below the other.",
    seraphineQuote: "How far does the darkness go, Aldric? Will there always be another land to save? Another evil to defeat?",
    tone: "weary_philosophical",
    characterArc: "seraphine_exhausted",
  },
  60: {
    name: "Infernal Lords Vanquished",
    victory: "The infernal hierarchy crumbles. Aldric has become a god of war.",
    seraphineQuote: "I scarcely recognize the man standing before me. You've changed so much, Aldric. Are you still the hero I knew?",
    tone: "sad_uncertain",
    characterArc: "seraphine_aldric_distant",
  },

  61: {
    name: "Void Calls",
    intro: "Beyond everything—beyond realms and dimensions—the Void itself has taken notice. It is hungry. It is calling.",
    seraphineQuote: "Perhaps we were never meant to win, Aldric. Perhaps all of this is the Void's game, and we are merely pieces on its board.",
    tone: "existential_hopeless",
    characterArc: "seraphine_despairs",
  },
  65: {
    name: "Void Creatures Repelled",
    victory: "The Void retreats... but only so that it might return stronger. Aldric and Seraphine stand at the edge of understanding.",
    seraphineQuote: "Aldric... whatever we are—whatever we're meant to be—let's face the end together. Not as ruler and champion, but as two souls against the darkness.",
    tone: "intimate_resolved",
    characterArc: "aldric_seraphine_together",
  },

  66: {
    name: "The Spire Beckons",
    intro: "A tower of impossible height stretches to the heavens themselves. This is where the final answer waits.",
    seraphineQuote: "This is it, Aldric. The top of this spire... that's where we'll find the truth. Why the cycle never ends. Why evil always returns.",
    tone: "determined_hopeful",
    characterArc: "final_journey_begins",
  },
  70: {
    name: "Celestial Guardians Defeated",
    victory: "Aldric stands atop the spire. The answer is revealed. And it changes everything.",
    seraphineQuote: "Oh Aldric... do you see it? Do you understand now? What we have to do?",
    tone: "sacred_revelatory",
    characterArc: "truth_revealed",
  },

  71: {
    name: "The True Final Battle",
    intro: "Malgrath was never the true source. He was merely a symptom. The real evil—the origin of all darkness—awaits. And it is something far more terrible.",
    seraphineQuote: "This is the price of being a hero, my love. To face not just one darkness, but the void from which all darkness springs. I am with you. Until the very end.",
    tone: "epic_sacred",
    characterArc: "seraphine_declares_love",
  },
  75: {
    name: "The Eternal Victory",
    victory: "THE CYCLE IS BROKEN. Not defeated—broken. The origin of all evil is sealed away, and balance is restored to the universe itself.",
    seraphineQuote: "Lord Aldric... the legend is complete. You have saved not just Eldenmoor, but every realm. Every world that could exist. You are eternal now. We both are.",
    tone: "transcendent_eternal",
    characterArc: "aldric_seraphine_legendary_eternal",
  },
};

export function getNarrativeAtWave(wave) {
  return NARRATIVE_CHAPTERS[wave] || null;
}