// Whitelist of every valid game answer value
const VALID_ANSWERS = new Set([
  'boy','girl',
  '4','5','6','7+',
  '0','1','2','3+',
  'happy','neutral','sad','angry',
  'laugh','jump','dance','hug',
  'yes','sometimes','no',
  'adventure','funny','mystery','friendship',
  'talk','help','watch','ignore',
  'spiders','heights','darkness','loudnoises',
  'letters','longwords','focus','none',
  'share','ask','cry','angry',
  'patterns','sounds','characters','movement',
]);

function strip(str, maxLen = 200) {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')   // strip all HTML tags
    .slice(0, maxLen);
}

export function validateSignup(req, res, next) {
  let { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ error: 'All fields are required' });

  username = strip(username, 50);
  email    = strip(email, 200).toLowerCase();

  if (username.length < 2)
    return res.status(400).json({ error: 'Username must be at least 2 characters' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ error: 'Invalid email format' });
  if (password.length < 6 || password.length > 128)
    return res.status(400).json({ error: 'Password must be 6–128 characters' });

  req.body.username = username;
  req.body.email    = email;
  next();
}

export function validateLogin(req, res, next) {
  let { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required' });

  email = strip(email, 200).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ error: 'Invalid email format' });

  req.body.email = email;
  next();
}

export function validateStoryAnswers(req, res, next) {
  const { answers } = req.body;
  if (!Array.isArray(answers) || answers.length < 1 || answers.length > 20)
    return res.status(400).json({ error: 'Answers must be an array of 1–20 items' });

  const sanitized = answers.map(a => {
    if (typeof a !== 'string') return null;
    const v = a.trim().toLowerCase();
    return VALID_ANSWERS.has(v) ? v : null;
  });

  if (sanitized.includes(null))
    return res.status(400).json({ error: 'One or more answer values are invalid' });

  req.body.answers = sanitized;
  next();
}