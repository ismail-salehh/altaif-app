export const gameData = [
  {
    question: "مرحبًا! هل أنت صبي أم فتاة؟",
    soundname: "welcomeareyouaboyoragirl",
    options: [
      { choice: "boy", text: "صبي", media: "boy.webp" },
      { choice: "girl", text: "فتاة", media: "girl.webp" },
    ],
  },
  {
    question: "كم عدد الأشقاء لديك؟",
    soundname: "howmanysiblingsdoyouhave",
    options: [
      { choice: "0", text: "0", media: "0-siblings.webp" },
      { choice: "1", text: "1", media: "1-sibling.webp" },
      { choice: "2", text: "2", media: "2-siblings.webp" },
      { choice: "3 or more", text: "3 أو أكثر", media: "3-siblings.webp" },
    ],
  },
  {
    question: "ما الذي يخيفك أكثر؟",
    soundname: "whatscaresyoumore",
    options: [
      { choice: "Spiders", text: "العناكب", media: "spider.webp" },
      { choice: "Heights", text: "الارتفاعات", media: "height.webp" },
      { choice: "Darkness", text: "الظلام", media: "darkness.webp" },
      {
        choice: "Loud noises",
        text: "الضوضاء العالية",
        media: "loud-noise.webp",
      },
    ],
  },
  {
    question: "ما هو لونك المفضل؟",
    soundname: "whatisyourfavoritecolor",
    options: [
      { choice: "Red", text: "أحمر", media: "red.webp" },
      { choice: "Blue", text: "أزرق", media: "blue.webp" },
      { choice: "Green", text: "أخضر", media: "green.webp" },
      { choice: "Yellow", text: "أصفر", media: "yellow.webp" },
    ],
  },
  {
    question: "إلى أين تريد الذهاب؟",
    soundname: "wheredoyouwanttogo",
    options: [
      { choice: "Beach", text: "الشاطئ", media: "beach.webp" },
      { choice: "Jungle", text: "الغابة", media: "mountain.webp" },
      { choice: "City", text: "المدينة", media: "city.webp" },
      { choice: "Space", text: "الفضاء", media: "spaceship.webp" },
    ],
    branches: {
      Beach: {
        question: "ماذا تريد أن تفعل على الشاطئ؟",
        soundname: "whatdoyouwanttodoonthebeach",
        options: [
          {
            choice: "Build a sandcastle",
            text: "بناء قلعة رملية",
            media: "sandcastle.webp",
          },
          {
            choice: "Go swimming",
            text: "الذهاب للسباحة",
            media: "swimming.webp",
          },
          {
            choice: "Play beachball",
            text: "لعب كرة الشاطئ",
            media: "beachball.webp",
          },
        ],
        branches: {
          "Build a sandcastle": {
            question: "ماذا تريد أن تبني؟",
            soundname: "whatdoyouwanttobuild",
            options: [
              {
                choice: "Build a house",
                text: "بناء منزل",
                media: "sandcastle-house.webp",
              },
              {
                choice: "Build a castle",
                text: "بناء قلعة",
                media: "sandcastle-castle.webp",
              },
              {
                choice: "Build a statue",
                text: "بناء تمثال",
                media: "sandcastle-statue.webp",
              },
            ],
            branches: {
              "Build a house": {
                question: "مع من تريد البناء؟",
                soundname: "whodoyouwanttobuild",
                options: [
                  {
                    choice: "Build alone",
                    text: "البناء بمفردك",
                    media: "alone-beach.webp",
                  },
                  {
                    choice: "Build with friends",
                    text: "البناء مع الأصدقاء",
                    media: "with-friends.webp",
                  },
                  {
                    choice: "Build with parents",
                    text: "البناء مع الوالدين",
                    media: "with-parents.webp",
                  },
                ],
              },
              "Build a castle": {
                question: "مع من تريد البناء؟",
                soundname: "whodoyouwanttobuild",
                options: [
                  {
                    choice: "Build alone",
                    text: "البناء بمفردك",
                    media: "alone-beach.webp",
                  },
                  {
                    choice: "Build with friends",
                    text: "البناء مع الأصدقاء",
                    media: "with-friends.webp",
                  },
                  {
                    choice: "Build with parents",
                    text: "البناء مع الوالدين",
                    media: "with-parents.webp",
                  },
                ],
              },
              "Build a statue": {
                question: "مع من تريد البناء؟",
                soundname: "whodoyouwanttobuild",
                options: [
                  {
                    choice: "Build alone",
                    text: "البناء بمفردك",
                    media: "alone-beach.webp",
                  },
                  {
                    choice: "Build with friends",
                    text: "البناء مع الأصدقاء",
                    media: "with-friends.webp",
                  },
                  {
                    choice: "Build with parents",
                    text: "البناء مع الوالدين",
                    media: "with-parents.webp",
                  },
                ],
              },
            },
          },
          "Go swimming": {
            question: "أي نوع من السباحة؟",
            soundname: "whatkindofswimming",
            options: [
              {
                choice: "Put your feet on the shore",
                text: "وضع قدميك على الشاطئ",
                media: "shore.webp",
              },
              { choice: "Swim", text: "السباحة", media: "swimming.webp" },
              {
                choice: "Surf with friends",
                text: "ركوب الأمواج مع الأصدقاء",
                media: "surf.webp",
              },
            ],
            branches: {
              "Put your feet on the shore": {
                question: "كيف تشعر؟",
                soundname: "howdoyoufeel",
                options: [
                  {
                    choice: "Feel happy",
                    text: "تشعر بالسعادة",
                    media: "happy.webp",
                  },
                  { choice: "Feel sad", text: "تشعر بالحزن", media: "sad.webp" },
                  {
                    choice: "Feel neutral",
                    text: "تشعر بالحياد",
                    media: "neutral.webp",
                  },
                ],
              },
              Swim: {
                question: "مع من تريد السباحة؟",
                soundname: "whodoyouwanttoswim",
                options: [
                  { choice: "Alone", text: "بمفردك", media: "swim-alone.webp" },
                  {
                    choice: "With friends",
                    text: "مع الأصدقاء",
                    media: "swim-friends.webp",
                  },
                ],
                branches: {
                  Alone: {
                    question: "كيف تشعر؟",
                    soundname: "howdoyoufeel",
                    options: [
                      {
                        choice: "Feel happy",
                        text: "تشعر بالسعادة",
                        media: "happy.webp",
                      },
                      {
                        choice: "Feel sad",
                        text: "تشعر بالحزن",
                        media: "sad.webp",
                      },
                      {
                        choice: "Feel neutral",
                        text: "تشعر بالحياد",
                        media: "neutral.webp",
                      },
                    ],
                  },
                  "With friends": {
                    question: "كيف تشعر؟",
                    soundname: "howdoyoufeel",
                    options: [
                      {
                        choice: "Feel happy",
                        text: "تشعر بالسعادة",
                        media: "happy.webp",
                      },
                      {
                        choice: "Feel sad",
                        text: "تشعر بالحزن",
                        media: "sad.webp",
                      },
                      {
                        choice: "Feel neutral",
                        text: "تشعر بالحياد",
                        media: "neutral.webp",
                      },
                    ],
                  },
                },
              },
              "Surf with friends": {
                question: "كيف تشعر؟",
                soundname: "howdoyoufeel",
                options: [
                  {
                    choice: "Feel happy",
                    text: "تشعر بالسعادة",
                    media: "happy.webp",
                  },
                  { choice: "Feel sad", text: "تشعر بالحزن", media: "sad.webp" },
                  {
                    choice: "Feel neutral",
                    text: "تشعر بالحياد",
                    media: "neutral.webp",
                  },
                ],
              },
            },
          },
          "Play beachball": {
            question: "مع من تريد اللعب؟",
            soundname: "whodoyouwanttoplay",
            options: [
              {
                choice: "Play with the ball alone",
                text: "اللعب بالكرة بمفردك",
                media: "beachball-alone.webp",
              },
              {
                choice: "Play with family",
                text: "اللعب مع العائلة",
                media: "beachball-family.webp",
              },
              {
                choice: "Play with other kids",
                text: "اللعب مع أطفال آخرين",
                media: "beachball-kids.webp",
              },
            ],
            branches: {
              "Play with the ball alone": {
                question: "كيف تشعر؟",
                soundname: "howdoyoufeel",
                options: [
                  {
                    choice: "Feel happy",
                    text: "تشعر بالسعادة",
                    media: "happy.webp",
                  },
                  { choice: "Feel sad", text: "تشعر بالحزن", media: "sad.webp" },
                  {
                    choice: "Feel neutral",
                    text: "تشعر بالحياد",
                    media: "neutral.webp",
                  },
                ],
              },
              "Play with family": {
                question: "كيف تشعر؟",
                soundname: "howdoyoufeel",
                options: [
                  {
                    choice: "Feel happy",
                    text: "تشعر بالسعادة",
                    media: "happy.webp",
                  },
                  { choice: "Feel sad", text: "تشعر بالحزن", media: "sad.webp" },
                  {
                    choice: "Feel neutral",
                    text: "تشعر بالحياد",
                    media: "neutral.webp",
                  },
                ],
              },
              "Play with other kids": {
                question: "كيف تشعر؟",
                soundname: "howdoyoufeel",
                options: [
                  {
                    choice: "Feel happy",
                    text: "تشعر بالسعادة",
                    media: "happy.webp",
                  },
                  { choice: "Feel sad", text: "تشعر بالحزن", media: "sad.webp" },
                  {
                    choice: "Feel neutral",
                    text: "تشعر بالحياد",
                    media: "neutral.webp",
                  },
                ],
              },
            },
          },
        },
      },
      Mountain: {
        question: "ماذا تريد أن تفعل على الجبل؟",
        soundname: "whatdoyouwanttodoonthemountain",
        options: [
          {
            choice: "Discover the hidden cave",
            text: "اكتشاف الكهف المخفي",
            media: "cave.webp",
          },
          {
            choice: "Hike to the top",
            text: "المشي إلى القمة",
            media: "hike.webp",
          },
          {
            choice: "Ride the arial lift",
            text: "ركوب التلفريك",
            media: "arial-lift.webp",
          },
        ],
        branches: {
          "Discover the hidden cave": {
            question: "أي اتجاه تريد أن تسلكه؟",
            soundname: "whichdirectionyouwanttotake",
            options: [
              {
                choice: "Go left to the open area",
                text: "الذهاب يسارًا إلى المنطقة المفتوحة",
                media: "open-area.webp",
              },
              {
                choice: "Go right to the narrow cave",
                text: "الذهاب يمينًا إلى الكهف الضيق",
                media: "narrow-cave.webp",
              },
            ],
            branches: {
              "Go left to the open area": {
                question: "ترى السماء الزرقاء. ماذا تريد أن تفعل؟",
                soundname: "youseetheblueskywhatdoyouwanttodo",
                options: [
                  {
                    choice: "Want to get out",
                    text: "تريد الخروج",
                    media: "exit-cave.webp",
                  },
                  {
                    choice: "Want to discover the other direction",
                    text: "تريد اكتشاف الاتجاه الآخر",
                    media: "narrow-cave.webp",
                  },
                ],
              },
              "Go right to the narrow cave": {
                question: "تجد عنكبوتًا كبيرًا. كيف تشعر؟",
                soundname: "youfindabigspiderhowdoyoufeel",
                options: [
                  { choice: "Fear", text: "الخوف", media: "spider-fear.webp" },
                  {
                    choice: "Exciting",
                    text: "مثير",
                    media: "spider-exciting.webp",
                  },
                ],
                branches: {
                  Fear: {
                    question: "ماذا تريد أن تفعل؟",
                    soundname: "whatdoyouwanttodo",
                    options: [
                      {
                        choice: "Get out",
                        text: "الخروج",
                        media: "exit-cave.webp",
                      },
                      {
                        choice: "Discover the other direction",
                        text: "اكتشاف الاتجاه الآخر",
                        media: "narrow-cave.webp",
                      },
                    ],
                  },
                  Exciting: {
                    question: "ماذا تريد أن تفعل؟",
                    soundname: "whatdoyouwanttodo",
                    options: [
                      {
                        choice: "Get out",
                        text: "الخروج",
                        media: "exit-cave.webp",
                      },
                      {
                        choice: "Discover the other direction",
                        text: "اكتشاف الاتجاه الآخر",
                        media: "narrow-cave.webp",
                      },
                    ],
                  },
                },
              },
            },
          },
          "Hike to the top": {
            question: "ماذا تريد أن تفعل بعد ذلك؟",
            soundname: "whatdoyouwanttodonext",
            options: [
              {
                choice: "Look at the landscapes",
                text: "النظر إلى المناظر الطبيعية",
                media: "landscape.webp",
              },
              {
                choice: "Ride the arial left down",
                text: "ركوب التلفريك للأسفل",
                media: "arial-lift-down.webp",
              },
              {
                choice: "Hike down",
                text: "المشي للأسفل",
                media: "hike-down.webp",
              },
            ],
            branches: {
              "Look at the landscapes": {
                question: "كيف تشعر؟",
                soundname: "howdoyoufeel",
                options: [
                  {
                    choice: "Feel happy",
                    text: "تشعر بالسعادة",
                    media: "happy.webp",
                  },
                  { choice: "Feel sad", text: "تشعر بالحزن", media: "sad.webp" },
                  {
                    choice: "Feel neutral",
                    text: "تشعر بالحياد",
                    media: "neutral.webp",
                  },
                ],
              },
              "Ride the arial left down": {
                question: "كيف تشعر؟",
                soundname: "howdoyoufeel",
                options: [
                  {
                    choice: "Feel happy",
                    text: "تشعر بالسعادة",
                    media: "happy.webp",
                  },
                  { choice: "Feel sad", text: "تشعر بالحزن", media: "sad.webp" },
                  {
                    choice: "Feel neutral",
                    text: "تشعر بالحياد",
                    media: "neutral.webp",
                  },
                ],
              },
              "Hike down": {
                question: "كيف تشعر؟",
                soundname: "howdoyoufeel",
                options: [
                  {
                    choice: "Feel happy",
                    text: "تشعر بالسعادة",
                    media: "happy.webp",
                  },
                  { choice: "Feel sad", text: "تشعر بالحزن", media: "sad.webp" },
                  {
                    choice: "Feel neutral",
                    text: "تشعر بالحياد",
                    media: "neutral.webp",
                  },
                ],
              },
            },
          },
          "Ride the arial lift": {
            question: "ماذا تريد أن تفعل؟",
            soundname: "whatdoyouwanttodo",
            options: [
              {
                choice: "Look at the landscapes",
                text: "النظر إلى المناظر الطبيعية",
                media: "landscape.webp",
              },
              {
                choice: "Ride the arial left down",
                text: "ركوب التلفريك للأسفل",
                media: "arial-lift-down.webp",
              },
              {
                choice: "Hike down",
                text: "المشي للأسفل",
                media: "hike-down.webp",
              },
            ],
            branches: {
              "Look at the landscapes": {
                question: "كيف تشعر؟",
                soundname: "howdoyoufeel",
                options: [
                  {
                    choice: "Feel happy",
                    text: "تشعر بالسعادة",
                    media: "happy.webp",
                  },
                  { choice: "Feel sad", text: "تشعر بالحزن", media: "sad.webp" },
                  {
                    choice: "Feel neutral",
                    text: "تشعر بالحياد",
                    media: "neutral.webp",
                  },
                ],
              },
              "Ride the arial left down": {
                question: "كيف تشعر؟",
                soundname: "howdoyoufeel",
                options: [
                  {
                    choice: "Feel happy",
                    text: "تشعر بالسعادة",
                    media: "happy.webp",
                  },
                  { choice: "Feel sad", text: "تشعر بالحزن", media: "sad.webp" },
                  {
                    choice: "Feel neutral",
                    text: "تشعر بالحياد",
                    media: "neutral.webp",
                  },
                ],
              },
              "Hike down": {
                question: "كيف تشعر؟",
                soundname: "howdoyoufeel",
                options: [
                  {
                    choice: "Feel happy",
                    text: "تشعر بالسعادة",
                    media: "happy.webp",
                  },
                  { choice: "Feel sad", text: "تشعر بالحزن", media: "sad.webp" },
                  {
                    choice: "Feel neutral",
                    text: "تشعر بالحياد",
                    media: "neutral.webp",
                  },
                ],
              },
            },
          },
        },
      },
      City: {
        question: "ماذا تريد أن تفعل في المدينة؟",
        soundname: "whatdoyouwanttodointhecity",
        options: [
          {
            choice: "Go shopping",
            text: "الذهاب للتسوق",
            media: "shopping.webp",
          },
          {
            choice: "Go to the park",
            text: "الذهاب إلى الحديقة",
            media: "park.webp",
          },
          {
            choice: "Go to the factory",
            text: "الذهاب إلى المصنع",
            media: "factory.webp",
          },
        ],
        branches: {
          "Go shopping": {
            question: "إلى أين تريد الذهاب؟",
            soundname: "wheredoyouwanttogo",
            options: [
              {
                choice: "Go to the arcade",
                text: "الذهاب إلى صالة الألعاب",
                media: "arcade.webp",
              },
              {
                choice: "Go to the toy store",
                text: "الذهاب إلى متجر الألعاب",
                media: "toy-store.webp",
              },
              {
                choice: "Shopping with parents",
                text: "التسوق مع الوالدين",
                media: "shopping-parents.webp",
              },
            ],
            branches: {
              "Go to the arcade": {
                question: "مع من تلعب؟",
                soundname: "whodoyouwanttoplay",
                options: [
                  {
                    choice: "Play alone",
                    text: "اللعب بمفردك",
                    media: "arcade-alone.webp",
                  },
                  {
                    choice: "Play with friends",
                    text: "اللعب مع الأصدقاء",
                    media: "arcade-friends.webp",
                  },
                ],
                branches: {
                  "Play alone": {
                    question: "كيف تشعر؟",
                    soundname: "howdoyoufeel",
                    options: [
                      {
                        choice: "Feel happy",
                        text: "تشعر بالسعادة",
                        media: "happy.webp",
                      },
                      {
                        choice: "Feel sad",
                        text: "تشعر بالحزن",
                        media: "sad.webp",
                      },
                      {
                        choice: "Feel neutral",
                        text: "تشعر بالحياد",
                        media: "neutral.webp",
                      },
                    ],
                  },
                  "Play with friends": {
                    question: "كيف تشعر؟",
                    soundname: "howdoyoufeel",
                    options: [
                      {
                        choice: "Feel happy",
                        text: "تشعر بالسعادة",
                        media: "happy.webp",
                      },
                      {
                        choice: "Feel sad",
                        text: "تشعر بالحزن",
                        media: "sad.webp",
                      },
                      {
                        choice: "Feel neutral",
                        text: "تشعر بالحياد",
                        media: "neutral.webp",
                      },
                    ],
                  },
                },
              },
              "Go to the toy store": {
                question: "اختر لعبة:",
                soundname: "chooseagame",
                options: [
                  { choice: "A truck", text: "شاحنة", media: "truck.webp" },
                  { choice: "A doll", text: "دمية", media: "doll.webp" },
                  { choice: "A scooter", text: "سكوتر", media: "scooter.webp" },
                ],
                branches: {
                  "A truck": {
                    question: "كيف تشعر؟",
                    soundname: "howdoyoufeel",
                    options: [
                      {
                        choice: "Feel happy",
                        text: "تشعر بالسعادة",
                        media: "happy.webp",
                      },
                      {
                        choice: "Feel sad",
                        text: "تشعر بالحزن",
                        media: "sad.webp",
                      },
                      {
                        choice: "Feel neutral",
                        text: "تشعر بالحياد",
                        media: "neutral.webp",
                      },
                    ],
                  },
                  "A doll": {
                    question: "كيف تشعر؟",
                    soundname: "howdoyoufeel",
                    options: [
                      {
                        choice: "Feel happy",
                        text: "تشعر بالسعادة",
                        media: "happy.webp",
                      },
                      {
                        choice: "Feel sad",
                        text: "تشعر بالحزن",
                        media: "sad.webp",
                      },
                      {
                        choice: "Feel neutral",
                        text: "تشعر بالحياد",
                        media: "neutral.webp",
                      },
                    ],
                  },
                  "A scooter": {
                    question: "كيف تشعر؟",
                    soundname: "howdoyoufeel",
                    options: [
                      {
                        choice: "Feel happy",
                        text: "تشعر بالسعادة",
                        media: "happy.webp",
                      },
                      {
                        choice: "Feel sad",
                        text: "تشعر بالحزن",
                        media: "sad.webp",
                      },
                      {
                        choice: "Feel neutral",
                        text: "تشعر بالحياد",
                        media: "neutral.webp",
                      },
                    ],
                  },
                },
              },
              "Shopping with parents": {
                question: "ماذا حدث؟",
                soundname: "whathappened",
                options: [
                  {
                    choice: "Buy something for yourself",
                    text: "شراء شيء لنفسك",
                    media: "buy-item.webp",
                  },
                  {
                    choice: "Don’t buy something for yourself",
                    text: "عدم شراء شيء لنفسك",
                    media: "no-buy.webp",
                  },
                ],
                branches: {
                  "Buy something for yourself": {
                    question: "كيف تشعر؟",
                    soundname: "howdoyoufeel",
                    options: [
                      {
                        choice: "Feel happy",
                        text: "تشعر بالسعادة",
                        media: "happy.webp",
                      },
                      {
                        choice: "Feel sad",
                        text: "تشعر بالحزن",
                        media: "sad.webp",
                      },
                      {
                        choice: "Feel neutral",
                        text: "تشعر بالحياد",
                        media: "neutral.webp",
                      },
                    ],
                  },
                  "Don’t buy something for yourself": {
                    question: "كيف تشعر؟",
                    soundname: "howdoyoufeel",
                    options: [
                      {
                        choice: "Feel happy",
                        text: "تشعر بالسعادة",
                        media: "happy.webp",
                      },
                      {
                        choice: "Feel sad",
                        text: "تشعر بالحزن",
                        media: "sad.webp",
                      },
                      {
                        choice: "Feel neutral",
                        text: "تشعر بالحياد",
                        media: "neutral.webp",
                      },
                    ],
                  },
                },
              },
            },
          },
          "Go to the park": {
            question: "إلى أين تريد الذهاب؟",
            soundname: "wheredoyouwanttogo",
            options: [
              {
                choice: "Go to the playground",
                text: "الذهاب إلى الملعب",
                media: "playground.webp",
              },
              {
                choice: "Sit and watch the sky",
                text: "الجلوس ومشاهدة السماء",
                media: "sky-park.webp",
              },
              {
                choice: "Talk to the kid across the path",
                text: "التحدث إلى الطفل عبر المسار",
                media: "kid-path.webp",
              },
            ],
            branches: {
              "Go to the playground": {
                question: "ماذا تريد أن تفعل؟",
                soundname: "whatdoyouwanttodo",
                options: [
                  {
                    choice: "Play on the swing",
                    text: "اللعب على الأرجوحة",
                    media: "swing.webp",
                  },
                  {
                    choice: "Play on slides",
                    text: "اللعب على الزلاقات",
                    media: "slides.webp",
                  },
                ],
                branches: {
                  "Play on the swing": {
                    question: "مع من؟",
                    soundname: "withwhom",
                    options: [
                      {
                        choice: "Alone",
                        text: "بمفردك",
                        media: "play-alone.webp",
                      },
                      {
                        choice: "With a friend",
                        text: "مع صديق",
                        media: "play-friend.webp",
                      },
                    ],
                    branches: {
                      Alone: {
                        question: "كيف تشعر؟",
                        soundname: "howdoyoufeel",
                        options: [
                          {
                            choice: "Feel happy",
                            text: "تشعر بالسعادة",
                            media: "happy.webp",
                          },
                          {
                            choice: "Feel sad",
                            text: "تشعر بالحزن",
                            media: "sad.webp",
                          },
                          {
                            choice: "Feel neutral",
                            text: "تشعر بالحياد",
                            media: "neutral.webp",
                          },
                        ],
                      },
                      "With a friend": {
                        question: "كيف تشعر؟",
                        soundname: "howdoyoufeel",
                        options: [
                          {
                            choice: "Feel happy",
                            text: "تشعر بالسعادة",
                            media: "happy.webp",
                          },
                          {
                            choice: "Feel sad",
                            text: "تشعر بالحزن",
                            media: "sad.webp",
                          },
                          {
                            choice: "Feel neutral",
                            text: "تشعر بالحياد",
                            media: "neutral.webp",
                          },
                        ],
                      },
                    },
                  },
                  "Play on slides": {
                    question: "مع من؟",
                    soundname: "withwhom",
                    options: [
                      {
                        choice: "Alone",
                        text: "بمفردك",
                        media: "play-alone.webp",
                      },
                      {
                        choice: "With a friend",
                        text: "مع صديق",
                        media: "play-friend.webp",
                      },
                    ],
                    branches: {
                      Alone: {
                        question: "كيف تشعر؟",
                        soundname: "howdoyoufeel",
                        options: [
                          {
                            choice: "Feel happy",
                            text: "تشعر بالسعادة",
                            media: "happy.webp",
                          },
                          {
                            choice: "Feel sad",
                            text: "تشعر بالحزن",
                            media: "sad.webp",
                          },
                          {
                            choice: "Feel neutral",
                            text: "تشعر بالحياد",
                            media: "neutral.webp",
                          },
                        ],
                      },
                      "With a friend": {
                        question: "كيف تشعر؟",
                        soundname: "howdoyoufeel",
                        options: [
                          {
                            choice: "Feel happy",
                            text: "تشعر بالسعادة",
                            media: "happy.webp",
                          },
                          {
                            choice: "Feel sad",
                            text: "تشعر بالحزن",
                            media: "sad.webp",
                          },
                          {
                            choice: "Feel neutral",
                            text: "تشعر بالحياد",
                            media: "neutral.webp",
                          },
                        ],
                      },
                    },
                  },
                },
              },
              "Sit and watch the sky": {
                question: "كيف تشعر؟",
                soundname: "howdoyoufeel",
                options: [
                  {
                    choice: "Feel happy",
                    text: "تشعر بالسعادة",
                    media: "happy.webp",
                  },
                  { choice: "Feel sad", text: "تشعر بالحزن", media: "sad.webp" },
                  {
                    choice: "Feel neutral",
                    text: "تشعر بالحياد",
                    media: "neutral.webp",
                  },
                ],
              },
              "Talk to the kid across the path": {
                question: "ماذا تفعل بعد ذلك؟",
                soundname: "whatdoyouwanttodonext",
                options: [
                  {
                    choice: "Go play with him on the playground",
                    text: "الذهاب للعب معه في الملعب",
                    media: "playground-friend.webp",
                  },
                  {
                    choice: "Make friends and watch the sky",
                    text: "تكوين صداقات ومشاهدة السماء",
                    media: "sky-friends.webp",
                  },
                ],
                branches: {
                  "Go play with him on the playground": {
                    question: "كيف تشعر؟",
                    soundname: "howdoyoufeel",
                    options: [
                      {
                        choice: "Feel happy",
                        text: "تشعر بالسعادة",
                        media: "happy.webp",
                      },
                      {
                        choice: "Feel sad",
                        text: "تشعر بالحزن",
                        media: "sad.webp",
                      },
                      {
                        choice: "Feel neutral",
                        text: "تشعر بالحياد",
                        media: "neutral.webp",
                      },
                    ],
                  },
                  "Make friends and watch the sky": {
                    question: "كيف تشعر؟",
                    soundname: "howdoyoufeel",
                    options: [
                      {
                        choice: "Feel happy",
                        text: "تشعر بالسعادة",
                        media: "happy.webp",
                      },
                      {
                        choice: "Feel sad",
                        text: "تشعر بالحزن",
                        media: "sad.webp",
                      },
                      {
                        choice: "Feel neutral",
                        text: "تشعر بالحياد",
                        media: "neutral.webp",
                      },
                    ],
                  },
                },
              },
            },
          },
          "Go to the factory": {
            question: "ماذا تريد أن تفعل؟",
            soundname: "whatdoyouwanttodo",
            options: [
              {
                choice: "Go on a factory tour",
                text: "الذهاب في جولة بالمصنع",
                media: "factory-tour.webp",
              },
              {
                choice: "Watch a movie across the street",
                text: "مشاهدة فيلم عبر الشارع",
                media: "movie.webp",
              },
            ],
            branches: {
              "Go on a factory tour": {
                question: "كيف تشعر؟",
                soundname: "howdoyoufeel",
                options: [
                  {
                    choice: "Feel happy",
                    text: "تشعر بالسعادة",
                    media: "happy.webp",
                  },
                  { choice: "Feel sad", text: "تشعر بالحزن", media: "sad.webp" },
                  {
                    choice: "Feel neutral",
                    text: "تشعر بالحياد",
                    media: "neutral.webp",
                  },
                ],
              },
              "Watch a movie across the street": {
                question: "كيف تشعر؟",
                soundname: "howdoyoufeel",
                options: [
                  {
                    choice: "Feel happy",
                    text: "تشعر بالسعادة",
                    media: "happy.webp",
                  },
                  { choice: "Feel sad", text: "تشعر بالحزن", media: "sad.webp" },
                  {
                    choice: "Feel neutral",
                    text: "تشعر بالحياد",
                    media: "neutral.webp",
                  },
                ],
              },
            },
          },
        },
      },
      Space: {
        question: "إلى أين تريد الذهاب؟",
        soundname: "wheredoyouwanttogo",
        options: [
          {
            choice: "Go left to the main cabin",
            text: "الذهاب يسارًا إلى الكابينة الرئيسية",
            media: "main-cabin.webp",
          },
          {
            choice: "Go right",
            text: "الذهاب يمينًا",
            media: "right-corridor.webp",
          },
          {
            choice: "Look at the window",
            text: "النظر من النافذة",
            media: "space-window.webp",
          },
        ],
        branches: {
          "Go left to the main cabin": {
            question: "مع من تتحدث؟",
            soundname: "whoareyoutalkingabout",
            options: [
              {
                choice: "Talk to the captain",
                text: "التحدث إلى القبطان",
                media: "captain.webp",
              },
              {
                choice: "Talk to the captain's daughter",
                text: "التحدث إلى ابنة القبطان",
                media: "captain-daughter.webp",
              },
            ],
            branches: {
              "Talk to the captain": {
                question: "ماذا تقول له؟",
                soundname: "whatdoyousaytohim",
                options: [
                  {
                    choice: "Go back to earth",
                    text: "العودة إلى الأرض",
                    media: "earth-return.webp",
                  },
                  {
                    choice: "Discover new planets",
                    text: "اكتشاف كواكب جديدة",
                    media: "new-planets.webp",
                  },
                ],
              },
              "Talk to the captain's daughter": {
                question: "ماذا تفعلان معًا؟",
                soundname: "whatdoyoudotogether",
                options: [
                  {
                    choice: "Watch the sky",
                    text: "مشاهدة السماء",
                    media: "space-sky.webp",
                  },
                  {
                    choice: "Go on a little spaceship",
                    text: "الذهاب في مركبة فضائية صغيرة",
                    media: "small-spaceship.webp",
                  },
                ],
                branches: {
                  "Watch the sky": {
                    question: "كيف تشعر؟",
                    soundname: "howdoyoufeel",
                    options: [
                      {
                        choice: "Feel happy",
                        text: "تشعر بالسعادة",
                        media: "happy.webp",
                      },
                      {
                        choice: "Feel sad",
                        text: "تشعر بالحزن",
                        media: "sad.webp",
                      },
                      {
                        choice: "Feel neutral",
                        text: "تشعر بالحياد",
                        media: "neutral.webp",
                      },
                    ],
                  },
                  "Go on a little spaceship": {
                    question: "كيف تشعر؟",
                    soundname: "howdoyoufeel",
                    options: [
                      {
                        choice: "Feel happy",
                        text: "تشعر بالسعادة",
                        media: "happy.webp",
                      },
                      {
                        choice: "Feel sad",
                        text: "تشعر بالحزن",
                        media: "sad.webp",
                      },
                      {
                        choice: "Feel neutral",
                        text: "تشعر بالحياد",
                        media: "neutral.webp",
                      },
                    ],
                  },
                },
              },
            },
          },
          "Go right": {
            question: "ماذا تريد أن تفعل؟",
            soundname: "whatdoyouwanttodo",
            options: [
              {
                choice: "Talk to the girl",
                text: "التحدث إلى الفتاة",
                media: "space-girl.webp",
              },
              {
                choice: "Pet the dog",
                text: "مداعبة الكلب",
                media: "space-dog.webp",
              },
            ],
            branches: {
              "Talk to the girl": {
                question: "ماذا تفعلان معًا؟",
                soundname: "whatdoyoudotogether",
                options: [
                  {
                    choice: "Watch the sky",
                    text: "مشاهدة السماء",
                    media: "space-sky.webp",
                  },
                  {
                    choice: "Go on a little spaceship",
                    text: "الذهاب في مركبة فضائية صغيرة",
                    media: "small-spaceship.webp",
                  },
                ],
                branches: {
                  "Watch the sky": {
                    question: "كيف تشعر؟",
                    soundname: "howdoyoufeel",
                    options: [
                      {
                        choice: "Feel happy",
                        text: "تشعر بالسعادة",
                        media: "happy.webp",
                      },
                      {
                        choice: "Feel sad",
                        text: "تشعر بالحزن",
                        media: "sad.webp",
                      },
                      {
                        choice: "Feel neutral",
                        text: "تشعر بالحياد",
                        media: "neutral.webp",
                      },
                    ],
                  },
                  "Go on a little spaceship": {
                    question: "كيف تشعر؟",
                    soundname: "howdoyoufeel",
                    options: [
                      {
                        choice: "Feel happy",
                        text: "تشعر بالسعادة",
                        media: "happy.webp",
                      },
                      {
                        choice: "Feel sad",
                        text: "تشعر بالحزن",
                        media: "sad.webp",
                      },
                      {
                        choice: "Feel neutral",
                        text: "تشعر بالحياد",
                        media: "neutral.webp",
                      },
                    ],
                  },
                },
              },
              "Pet the dog": {
                question: "كيف تشعر؟",
                soundname: "howdoyoufeel",
                options: [
                  {
                    choice: "Feel happy",
                    text: "تشعر بالسعادة",
                    media: "happy.webp",
                  },
                  { choice: "Feel sad", text: "تشعر بالحزن", media: "sad.webp" },
                  {
                    choice: "Feel neutral",
                    text: "تشعر بالحياد",
                    media: "neutral.webp",
                  },
                ],
              },
            },
          },
          "Look at the window": {
            question: "كيف تشعر؟",
            soundname: "howdoyoufeel",
            options: [
              { choice: "Fear", text: "الخوف", media: "space-fear.webp" },
              { choice: "Awe", text: "الإعجاب", media: "space-awe.webp" },
            ],
            branches: {
              Fear: {
                question: "ماذا تريد أن تفعل؟",
                soundname: "whatdoyouwanttodo",
                options: [
                  {
                    choice: "Talk to parents",
                    text: "التحدث إلى الوالدين",
                    media: "space-parents.webp",
                  },
                  {
                    choice: "Breathe",
                    text: "التنفس",
                    media: "space-breathe.webp",
                  },
                ],
              },
              Awe: {
                question: "ماذا تريد أن تفعل؟",
                soundname: "whatdoyouwanttodo",
                options: [
                  {
                    choice: "Talk to parents",
                    text: "التحدث إلى الوالدين",
                    media: "space-parents.webp",
                  },
                  {
                    choice: "Breathe",
                    text: "التنفس",
                    media: "space-breathe.webp",
                  },
                ],
              },
            },
          },
        },
      },
    },
  },
];
