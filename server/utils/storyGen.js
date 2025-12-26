// utils/storyGen.js

const questionKeys = [
    "Gender", 
    "Age", 
    "Siblings", 
    "Mood", 
    "JoyExpression", 
    "StoryInterest", 
    "StoryType", 
    "Interaction", 
    "Fear", 
    "ReadingChallenge", 
    "BehavioralChallenge",
    "PreferredGame"
];

const choiceTranslations = {
    // Q1: Gender
    'boy': 'ولد',
    'girl': 'بنت',
    
    // Q3: Siblings
    '0': 'ما عنده', 
    '1': 'عنده أخ أو أخت واحد', 
    '2': 'عنده أخوين', 
    '3+': 'ثلاثة أو أكتر',

    // Q4: Mood
    'happy': 'مبسوط', 
    'neutral': 'عادي', 
    'sad': 'زعلان', 
    'angry': 'معصب',

    // Q5: Joy Expression
    'laugh': 'يضحك', 
    'jump': 'ينط', 
    'dance': 'يرقص', 
    'hug': 'يحضن',

    // Q6: Story Interest
    'yes': 'يحب القصص', 
    'sometimes': 'أحيانًا', 
    'no': 'مش كتير',

    // Q7: Story Type
    'adventure': 'مغامرات', 
    'funny': 'مضحكة', 
    'mystery': 'غامضة', 
    'friendship': 'عن الصحاب',

    // Q8: Interaction
    'talk': 'يحكي معها', 
    'help': 'يساعدها', 
    'watch': 'يتفرج بس', 
    'ignore': 'يتجاهلها',

    // Q9: Fears
    'spiders': 'العناكب', 
    'heights': 'المرتفعات', 
    'darkness': 'العتمة', 
    'loudnoises': 'الصوت العالي',

    // Q10: Reading Challenges
    'letters': 'قراءة الحروف', 
    'longwords': 'الكلمات الطويلة', 
    'focus': 'التركيز', 
    'none': 'ولا اشي',

    // Q11: Behavioral Challenges
    'share': 'يعطيها', 
    'ask': 'يطلبها بأدب', 
    'cry': 'يبكي',

    // Q12: Preferred Game
    'patterns': 'ترتيب الأشكال', 
    'sounds': 'لعبة الأصوات', 
    'characters': 'لعبة الشخصيات', 
    'movement': 'ألعاب الحركة',

    // General Labels
    'Gender': 'جنس الطفل',
    'Age': 'عمر الطفل',
    'Siblings': 'عدد الإخوة',
    'Mood': 'الشعور السائد',
    'JoyExpression': 'تعبير عن الفرح',
    'StoryInterest': 'اهتمام بالقصص',
    'StoryType': 'نوع القصة المفضل',
    'Interaction': 'طريقة التفاعل مع الشخصيات',
    'Fear': 'أكبر خوف',
    'ReadingChallenge': 'تحدي القراءة',
    'BehavioralChallenge': 'استجابة سلوكية (أخذ اللعبة)',
    'PreferredGame': 'اللعبة المفضلة (مؤشر سلوكي)'
};

const formatAnswers = (answers) => {
    if (!Array.isArray(answers)) return `خطأ في تنسيق الإجابات: ${answers}`

    const formattedLines = answers.map((val, index) => {
        const key = questionKeys[index];
        if (!key) return null;

        const keyAr = choiceTranslations[key] || key;
        const valueAr = choiceTranslations[val] || val;
        if (key === 'Age') return `العمر: ${valueAr} سنوات`;

        return `${keyAr}: ${valueAr}`;
    }).filter(line => line !== null);

    return formattedLines.join('\n');
};

const storyPrompt = (answers) => `
أكتب قصة أطفال مخصصة بالعربية الفصحى البسيطة بناءً على الملامح التفصيلية التالية للطفل:أكتب قصة أطفال مخصصة بالعربية الفصحى البسيطة.

استخدم المعلومات التالية كإرشادات داخلية فقط لتشكيل القصة، 
ولا تذكرها صراحة أو بشكل مباشر داخل النص:

${formatAnswers(answers)}

اجعل القصة طبيعية وكأنها قصة عادية لطفل في هذا العمر،
بحيث تظهر الصفات من خلال الأحداث والتصرفات فقط.
.تبدأ القصة بعبارة "كان يا ما كان" وتنتهي بنهاية سعيدة وتتكون من 5 فقرات متوسطة الطول (3-6 جمل لكل فقرة)
لا تذكر العمر أو الجنس أو التحديات أو الاهتمامات أو عدد الأشقاء بشكل مباشر.
أظهرها فقط من خلال تصرفات الطفل والأحداث. يجب انت تظهر عبرة في نهاية القصة.
`;

const imagePrompt = (paragraph) => `
A cute cartoon-style illustration for scene number from the story.
Scene: "${paragraph}"
Characters/Details inspired by:
Bright and warm colors, high quality, landscape format, and very suitable for children.
`;

const splitIntoScenes = (text, maxScenes = 5) => {
  const sentences = text
    .replace(/[\s\n\t]+/g, " ")
    .split(/(?<=[.!؟])\s+/);

  const scenes = [];
  const sentencesPerScene = Math.ceil(sentences.length / maxScenes);

  for (let i = 0; i < sentences.length && scenes.length < maxScenes; i += sentencesPerScene) {
    scenes.push(sentences.slice(i, i + sentencesPerScene).join(" "));
  }

  return scenes;
}

export { storyPrompt, imagePrompt, formatAnswers , splitIntoScenes};