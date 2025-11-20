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

// 2. Define a map for translating the EN choices into AR text for the prompt
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

/**
 * Converts the raw array of answers into a formatted string for the Gemini prompt.
 * @param {string[]} answers - The array of raw answer strings from the frontend.
 * @returns {string} - A string with key: value pairs, translated to Arabic.
 */
const formatAnswers = (answers) => {
    // Ensure we handle non-array inputs gracefully, though it should be an array.
    if (!Array.isArray(answers)) {
        return `خطأ في تنسيق الإجابات: ${answers}`;
    }

    const formattedLines = answers.map((val, index) => {
        const key = questionKeys[index];
        if (!key) return null; // Stop if we run out of keys

        // Get the Arabic key/label (e.g., "جنس الطفل")
        const keyAr = choiceTranslations[key] || key;
        
        // Get the Arabic value/choice (e.g., "ولد"). If not found, use the English value.
        const valueAr = choiceTranslations[val] || val;

        // Special handling for Age (Q2) since it uses numbers/strings (4, 5, 6, 7+)
        if (key === 'Age') {
            return `العمر: ${valueAr} سنوات`;
        }

        // Return the final formatted line (e.g., "جنس الطفل: ولد")
        return `${keyAr}: ${valueAr}`;
    }).filter(line => line !== null);

    return formattedLines.join('\n');
};

const storyPrompt = (answers) => `
أكتب قصة أطفال مخصصة بالعربية الفصحى البسيطة بناءً على الملامح التفصيلية التالية للطفل:
${formatAnswers(answers)}

اجعل القصة تتكون من 4 إلى 6 فقرات. يجب أن تكون القصة إيجابية، وتحتوي على عنصر مغامرة، وتوصل رسالة عاطفية بسيطة. تبدأ القصة بعبارة "كان يا ما كان" وتنتهي بنهاية سعيدة.
`;

const imagePrompt = (paragraph, answers, sceneNum) => `
صورة كرتونية لطيفة بأسلوب الرسوم المتحركة (cartoon style) للمشهد رقم ${sceneNum} من القصة.
**المشهد:** "${paragraph}"
**الشخصيات/التفاصيل المستوحاة من:**
${formatAnswers(answers).substring(0, 200)}...

ألوان زاهية ودافئة، بجودة عالية، وتنسيق أفقي (landscape)، ومناسبة جدًا للأطفال.
`;
/**
 * Uses Gemini to translate an Arabic prompt to a concise English image prompt.
 * @param {string} arabicPrompt - The Arabic text to translate.
 * @param {object} ai - The GoogleGenAI client instance.
 * @returns {Promise<string>} - The translated English prompt.
 */
export { storyPrompt, imagePrompt, formatAnswers };