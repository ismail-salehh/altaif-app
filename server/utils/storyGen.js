const formatAnswers = (answers) => {
  // Map answers to Arabic descriptions (customize based on your gameData)
  const map = {
    0: `الجنس: ${answers[0] === 'boy' ? 'ولد' : 'بنت'}`,
    // Add all 11+ based on your game
  };
  return Object.entries(answers).map(([key, val]) => map[key] || `${key}: ${val}`).join('\n');
};

const storyPrompt = (answers) => `
أكتب قصة أطفال مخصصة بالعربية الفصحى البسيطة بناءً على:
${formatAnswers(answers)}

اجعلها 4-6 فقرات، إيجابية، مع مغامرة، رسالة عاطفية، بداية "كان يا ما كان"، نهاية سعيدة.
`;

const imagePrompt = (paragraph, answers, sceneNum) => `
صورة كرتونية لطيفة للمشهد ${sceneNum} من القصة: "${paragraph}"
مستوحاة من الطفل: ${formatAnswers(answers).substring(0, 100)}...
ألوان زاهية، أفقي، مناسب للأطفال.
`;

export { storyPrompt, imagePrompt, formatAnswers };