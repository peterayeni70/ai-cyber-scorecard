import { AssessmentResult } from './assessment-data';

export interface Recommendation {
  id: string;
  category: 'identity' | 'privacy' | 'device' | 'network';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'medium' | 'hard';
  societyRelevance?: string;
}

export function generateRecommendations(result: AssessmentResult): Recommendation[] {
  const recommendations: Recommendation[] = [];

  if (result.categoryScores.identity < 150) {
    recommendations.push({
      id: 'rec-1',
      category: 'identity',
      title: 'Implement a Password Manager',
      description: 'Use a reputable password manager like Bitwarden, 1Password, or LastPass to generate and store unique, strong passwords for every account.',
      impact: 'high',
      difficulty: 'easy',
      societyRelevance: 'With AI-powered password cracking tools becoming more sophisticated, unique passwords are essential to prevent credential stuffing attacks.',
    });
  }

  if (result.categoryScores.identity < 200) {
    recommendations.push({
      id: 'rec-2',
      category: 'identity',
      title: 'Enable Two-Factor Authentication Everywhere',
      description: 'Add 2FA to all accounts that support it, especially email, banking, and social media. Use authenticator apps instead of SMS when possible.',
      impact: 'high',
      difficulty: 'easy',
      societyRelevance: 'As deepfake technology advances, even voice and video verification can be compromised. 2FA provides a critical second layer of defense.',
    });
  }

  if (result.categoryScores.privacy < 150) {
    recommendations.push({
      id: 'rec-3',
      category: 'privacy',
      title: 'Audit Your Social Media Privacy Settings',
      description: 'Review and tighten privacy settings on all social platforms. Limit public posts, disable location sharing, and review tagged photos.',
      impact: 'medium',
      difficulty: 'easy',
      societyRelevance: 'In an era of AI-driven social engineering, your public digital footprint can be used to craft convincing phishing attacks against you and your contacts.',
    });
  }

  if (result.categoryScores.privacy < 200) {
    recommendations.push({
      id: 'rec-4',
      category: 'privacy',
      title: 'Review App Permissions Quarterly',
      description: 'Go through your phone and computer apps, removing unnecessary permissions. Revoke access to contacts, location, camera, and microphone for apps that do not need them.',
      impact: 'medium',
      difficulty: 'medium',
      societyRelevance: 'Data brokers and malicious apps can exploit excessive permissions to build detailed profiles about you, which can be sold or used for targeted attacks.',
    });
  }

  if (result.categoryScores.device < 150) {
    recommendations.push({
      id: 'rec-5',
      category: 'device',
      title: 'Enable Automatic Updates',
      description: 'Turn on automatic updates for your operating system, browsers, and all installed applications. Security patches fix known vulnerabilities.',
      impact: 'high',
      difficulty: 'easy',
      societyRelevance: 'Zero-day exploits are increasingly automated. Keeping devices updated is your first line of defense against ransomware and data theft.',
    });
  }

  if (result.categoryScores.device < 200) {
    recommendations.push({
      id: 'rec-6',
      category: 'device',
      title: 'Implement the 3-2-1 Backup Strategy',
      description: 'Keep 3 copies of your data, on 2 different media types, with 1 offsite (cloud). Test restoration quarterly.',
      impact: 'high',
      difficulty: 'medium',
      societyRelevance: 'Ransomware attacks are at an all-time high. A solid backup strategy ensures you can recover without paying criminals.',
    });
  }

  if (result.categoryScores.network < 150) {
    recommendations.push({
      id: 'rec-7',
      category: 'network',
      title: 'Use a VPN on Public Networks',
      description: 'Install a reputable VPN service and always use it when connecting to public Wi-Fi. This encrypts your traffic and protects against eavesdropping.',
      impact: 'high',
      difficulty: 'easy',
      societyRelevance: 'Public Wi-Fi snooping is trivial with modern tools. A VPN protects your credentials and personal data from being intercepted.',
    });
  }

  if (result.categoryScores.network < 200) {
    recommendations.push({
      id: 'rec-8',
      category: 'network',
      title: 'Learn to Identify Phishing Attempts',
      description: 'Study common phishing indicators: urgent language, suspicious links, unexpected attachments, and requests for sensitive information. When in doubt, verify directly.',
      impact: 'high',
      difficulty: 'medium',
      societyRelevance: 'AI-generated phishing emails are becoming indistinguishable from legitimate communications. Human vigilance is the last line of defense.',
    });
  }

  if (result.totalScore < 400) {
    recommendations.push({
      id: 'rec-9',
      category: 'identity',
      title: 'Take a Cybersecurity Awareness Course',
      description: 'Consider taking free courses from platforms like Cybrary, SANS Cyber Aces, or your organization security training. Knowledge is your best defense.',
      impact: 'high',
      difficulty: 'medium',
      societyRelevance: 'Cybersecurity literacy is becoming as essential as financial literacy in our digital society. Understanding threats helps protect you and your community.',
    });
  }

  return recommendations.sort((a, b) => {
    const impactOrder = { high: 0, medium: 1, low: 2 };
    if (impactOrder[a.impact] !== impactOrder[b.impact]) {
      return impactOrder[a.impact] - impactOrder[b.impact];
    }
    return result.categoryScores[a.category] - result.categoryScores[b.category];
  });
}
