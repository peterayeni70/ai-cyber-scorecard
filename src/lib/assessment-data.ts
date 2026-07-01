export interface Question {
  id: string;
  category: 'identity' | 'privacy' | 'device' | 'network';
  question: string;
  options: { label: string; score: number }[];
  weight: number;
}

export const questions: Question[] = [
  {
    id: 'id-1',
    category: 'identity',
    question: 'How do you manage your passwords across different accounts?',
    options: [
      { label: 'I use the same password everywhere for convenience', score: 0 },
      { label: 'I have a few passwords I rotate between', score: 30 },
      { label: 'I use different passwords but remember them all', score: 60 },
      { label: 'I use a password manager for all accounts', score: 100 },
    ],
    weight: 1.0,
  },
  {
    id: 'id-2',
    category: 'identity',
    question: 'Do you use two-factor authentication (2FA) on your important accounts?',
    options: [
      { label: 'No, I find it inconvenient', score: 0 },
      { label: 'Only on my email account', score: 30 },
      { label: 'On email and banking accounts', score: 65 },
      { label: 'On all accounts that support it', score: 100 },
    ],
    weight: 1.0,
  },
  {
    id: 'id-3',
    category: 'identity',
    question: 'How often do you check if your personal data has been compromised in data breaches?',
    options: [
      { label: 'Never heard of this before', score: 0 },
      { label: 'Never checked', score: 20 },
      { label: 'Checked once or twice', score: 50 },
      { label: 'Regularly monitor with services like Have I Been Pwned', score: 100 },
    ],
    weight: 0.8,
  },
  {
    id: 'pr-1',
    category: 'privacy',
    question: 'How careful are you about what you share on social media?',
    options: [
      { label: 'I share everything publicly', score: 0 },
      { label: 'I share a lot but only with friends', score: 30 },
      { label: 'I am selective about what I post', score: 65 },
      { label: 'I maintain minimal social media presence with strict privacy', score: 100 },
    ],
    weight: 0.9,
  },
  {
    id: 'pr-2',
    category: 'privacy',
    question: 'Do you read and understand privacy policies before agreeing to them?',
    options: [
      { label: 'Never, I just click agree', score: 0 },
      { label: 'Sometimes skim through them', score: 25 },
      { label: 'I read the key points', score: 60 },
      { label: 'I carefully review before agreeing to any service', score: 100 },
    ],
    weight: 0.7,
  },
  {
    id: 'pr-3',
    category: 'privacy',
    question: 'How do you handle app permissions on your phone?',
    options: [
      { label: 'I allow everything apps request', score: 0 },
      { label: 'I allow most permissions', score: 30 },
      { label: 'I deny unnecessary permissions', score: 65 },
      { label: 'I only grant essential permissions and review regularly', score: 100 },
    ],
    weight: 0.9,
  },
  {
    id: 'dv-1',
    category: 'device',
    question: 'How do you keep your devices updated?',
    options: [
      { label: 'I ignore update notifications', score: 0 },
      { label: 'I update when I remember', score: 30 },
      { label: 'I update within a week of notification', score: 65 },
      { label: 'I enable automatic updates for all devices', score: 100 },
    ],
    weight: 1.0,
  },
  {
    id: 'dv-2',
    category: 'device',
    question: 'Do you use antivirus or anti-malware software?',
    options: [
      { label: 'No protection at all', score: 0 },
      { label: 'Basic free antivirus', score: 40 },
      { label: 'Paid antivirus with regular scans', score: 70 },
      { label: 'Comprehensive security suite with real-time protection', score: 100 },
    ],
    weight: 0.9,
  },
  {
    id: 'dv-3',
    category: 'device',
    question: 'How do you back up your important data?',
    options: [
      { label: 'I do not back up my data', score: 0 },
      { label: 'I back up occasionally when I remember', score: 30 },
      { label: 'I have a regular backup schedule', score: 65 },
      { label: 'Automated backups to multiple locations (cloud + local)', score: 100 },
    ],
    weight: 0.8,
  },
  {
    id: 'nt-1',
    category: 'network',
    question: 'How do you handle public Wi-Fi networks?',
    options: [
      { label: 'I connect to any available Wi-Fi', score: 0 },
      { label: 'I only use public Wi-Fi for browsing', score: 30 },
      { label: 'I avoid sensitive transactions on public Wi-Fi', score: 65 },
      { label: 'I always use a VPN on public networks', score: 100 },
    ],
    weight: 1.0,
  },
  {
    id: 'nt-2',
    category: 'network',
    question: 'How secure is your home Wi-Fi network?',
    options: [
      { label: 'No password or default password', score: 0 },
      { label: 'Basic WPA2 password', score: 40 },
      { label: 'Strong password with WPA2/WPA3', score: 70 },
      { label: 'Strong password, guest network, and regular firmware updates', score: 100 },
    ],
    weight: 0.9,
  },
  {
    id: 'nt-3',
    category: 'network',
    question: 'Are you aware of phishing attempts and how to identify them?',
    options: [
      { label: 'I have never heard of phishing', score: 0 },
      { label: 'I know about it but cannot always spot it', score: 35 },
      { label: 'I can identify most phishing attempts', score: 70 },
      { label: 'I am highly vigilant and can spot sophisticated phishing', score: 100 },
    ],
    weight: 0.8,
  },
];

export interface AssessmentResult {
  totalScore: number;
  categoryScores: {
    identity: number;
    privacy: number;
    device: number;
    network: number;
  };
  answers: Record<string, number>;
}

export function calculateScore(answers: Record<string, number>): AssessmentResult {
  const categoryScores = { identity: 0, privacy: 0, device: 0, network: 0 };
  const categoryMaxScores = { identity: 0, privacy: 0, device: 0, network: 0 };

  questions.forEach((q) => {
    const maxOptionScore = Math.max(...q.options.map((o) => o.score));
    categoryMaxScores[q.category] += maxOptionScore * q.weight;
  });

  questions.forEach((q) => {
    const answerScore = answers[q.id] || 0;
    categoryScores[q.category] += answerScore * q.weight;
  });

  const normalizedCategoryScores = {
    identity: Math.round((categoryScores.identity / categoryMaxScores.identity) * 250),
    privacy: Math.round((categoryScores.privacy / categoryMaxScores.privacy) * 250),
    device: Math.round((categoryScores.device / categoryMaxScores.device) * 250),
    network: Math.round((categoryScores.network / categoryMaxScores.network) * 250),
  };

  const totalScore =
    normalizedCategoryScores.identity +
    normalizedCategoryScores.privacy +
    normalizedCategoryScores.device +
    normalizedCategoryScores.network;

  return { totalScore, categoryScores: normalizedCategoryScores, answers };
}

export function getScoreLabel(score: number): string {
  if (score >= 800) return 'Excellent';
  if (score >= 600) return 'Good';
  if (score >= 400) return 'Fair';
  if (score >= 200) return 'At Risk';
  return 'Critical';
}

export function getScoreColor(score: number): string {
  if (score >= 800) return '#10b981';
  if (score >= 600) return '#3b82f6';
  if (score >= 400) return '#f59e0b';
  if (score >= 200) return '#f97316';
  return '#ef4444';
}
