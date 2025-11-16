export const gameData = [
  {
    question: "مرحبا! إنت ولد ولا بنت؟",
    soundname: "welcomeareyouaboyoragirl",
    options: [
      { choice: "boy", text: "ولد", media: "boy.webp" },
      { choice: "girl", text: "بنت", media: "girl.webp" }
    ]
  },

  {
    question: "قديش عمرك؟",
    soundname: "howoldareyou",
    options: [
      { choice: "4", text: "٤ سنين", media: "age4.webp" },
      { choice: "5", text: "٥ سنين", media: "age5.webp" },
      { choice: "6", text: "٦ سنين", media: "age6.webp" },
      { choice: "7+", text: "٧ سنين أو أكتر", media: "age7.webp" }
    ]
  },

  {
    question: "عندك إخوة؟ كم عددهم؟",
    soundname: "howmanysiblingsdoyouhave",
    options: [
      { choice: "0", text: "ما عندي", media: "0-siblings.webp" },
      { choice: "1", text: "عندي أخ أو أخت واحد", media: "1-sibling.webp" },
      { choice: "2", text: "عندي أخوين", media: "2-siblings.webp" },
      { choice: "3+", text: "ثلاثة أو أكتر", media: "3-siblings.webp" }
    ]
  },

  // ======== Mood ===========
  {
    question: "كيف كان شعورك اليوم؟",
    soundname: "howwasyourmoodtoday",
    options: [
      { choice: "happy", text: "مبسوط", media: "happy.webp" },
      { choice: "neutral", text: "عادي", media: "neutral.webp" },
      { choice: "sad", text: "زعلان", media: "sad.webp" },
      { choice: "angry", text: "معصب", media: "angry.webp" }
    ]
  },

  // ======== Joy Expression ===========
  {
    question: "لما تفرح، شو بتعمل عادة؟",
    soundname: "howdoyouexpressjoy",
    options: [
      { choice: "laugh", text: "بضحك", media: "laugh.webp" },
      { choice: "jump", text: "بنط", media: "jump.webp" },
      { choice: "dance", text: "برقص", media: "dance.webp" },
      { choice: "hug", text: "بحضن", media: "hug.webp" }
    ]
  },

  // ======== Story Interest ===========
  {
    question: "بتحب تسمع قصص؟",
    soundname: "doyoulovetoreadstories",
    options: [
      { choice: "yes", text: "بحب القصص", media: "love-stories.webp" },
      { choice: "sometimes", text: "أحيانًا", media: "sometimes.webp" },
      { choice: "no", text: "مش كتير", media: "no-stories.webp" }
    ]
  },

  // ======== Story Type ===========
  {
    question: "شو نوع القصص اللي بتحبها؟",
    soundname: "whatstorydoyoulike",
    options: [
      { choice: "adventure", text: "مغامرات", media: "adventure.webp" },
      { choice: "funny", text: "مضحكة", media: "funny.webp" },
      { choice: "mystery", text: "غامضة", media: "mystery.webp" },
      { choice: "friendship", text: "عن الصحاب", media: "friendship.webp" }
    ]
  },

  // ======== Interaction ===========
  {
    question: "لما تشوف شخصية بالقصة، شو بتعمل؟",
    soundname: "howdoyouinteractwithcharacters",
    options: [
      { choice: "talk", text: "بحكي معها", media: "talk.webp" },
      { choice: "help", text: "بساعدها", media: "help.webp" },
      { choice: "watch", text: "بتفرج بس", media: "watch.webp" },
      { choice: "ignore", text: "بتجاهلها", media: "ignore.webp" }
    ]
  },

  // ======== Fears ===========
  {
    question: "شو أكتر شغلة بتخوفك؟",
    soundname: "whatscaresyoumore",
    options: [
      { choice: "spiders", text: "العناكب", media: "spider.webp" },
      { choice: "heights", text: "المرتفعات", media: "height.webp" },
      { choice: "darkness", text: "العتمة", media: "darkness.webp" },
      { choice: "loudnoises", text: "الصوت العالي", media: "loud-noise.webp" }
    ]
  },

  // ======== Reading Challenges ===========
  {
    question: "لما تقرأ قصة، شو اللي بصعب عليك؟",
    soundname: "readingchallenges",
    options: [
      { choice: "letters", text: "قراءة الحروف", media: "letters.webp" },
      { choice: "longwords", text: "الكلمات الطويلة", media: "long-words.webp" },
      { choice: "focus", text: "التركيز", media: "focus.webp" },
      { choice: "none", text: "ولا اشي، أنا شاطر", media: "none.webp" }
    ]
  },

  // ======== Behavioral Challenges ===========
  {
    question: "إذا حدا أخد لعبتك، شو بتعمل؟",
    soundname: "behavioralchallenge",
    options: [
      { choice: "share", text: "بعطيه", media: "share.webp" },
      { choice: "ask", text: "بطلبها بأدب", media: "ask-politely.webp" },
      { choice: "angry", text: "بعصب", media: "angry.webp" },
      { choice: "cry", text: "ببكي", media: "cry.webp" }
    ]
  },

  // ======== Autism Indicators (Indirect) ===========
  {
    question: "أي لعبة بتحب تلعبها أكتر اشي؟",
    soundname: "autismbehaviorpattern",
    options: [
      { choice: "patterns", text: "ترتيب الأشكال", media: "patterns.webp" },
      { choice: "sounds", text: "لعبة الأصوات", media: "sounds.webp" },
      { choice: "characters", text: "لعبة الشخصيات", media: "characters.webp" },
      { choice: "movement", text: "ألعاب الحركة", media: "movement.webp" }
    ]
  }
];