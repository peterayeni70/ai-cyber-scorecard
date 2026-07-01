import { ArrowLeft, ShieldCheck, KeyRound, Lock, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface EducationalHubProps {
  onBack: () => void;
}

export function EducationalHub({ onBack }: EducationalHubProps) {
  const articles = [
    {
      id: 'phishing',
      title: 'How to Spot a Phishing Email',
      icon: <ShieldCheck className="h-6 w-6 text-cyan-400" />,
      content: [
        {
          subTitle: "Check the Sender's Email Address",
          subContent: "Phishers often use email addresses that are similar to legitimate ones, but with subtle differences. Hover over the sender's name to see the full email address and look for any inconsistencies."
        },
        {
          subTitle: "Look for Generic Greetings",
          subContent: "Legitimate companies will usually address you by your name. Be wary of emails that start with generic greetings like 'Dear Customer' or 'Dear Valued Member'."
        },
        {
          subTitle: "Beware of Urgent or Threatening Language",
          subContent: "Phishing emails often create a sense of urgency or fear to trick you into acting without thinking. Phrases like 'Your account will be suspended' or 'Immediate action required' are red flags."
        },
        {
          subTitle: "Don't Click on Suspicious Links or Attachments",
          subContent: "Hover over links to see the actual URL before clicking. If the link looks suspicious, don't click it. Never open attachments from unknown senders, as they can contain malware."
        }
      ]
    },
    {
      id: 'strong-passwords',
      title: 'How to Create a Strong Password',
      icon: <KeyRound className="h-6 w-6 text-cyan-400" />,
      content: [
         {
          subTitle: "Length is Key",
          subContent: "Aim for a password that is at least 12 characters long. The longer the password, the harder it is to crack."
        },
        {
          subTitle: "Use a Mix of Characters",
          subContent: "A strong password should include a combination of uppercase and lowercase letters, numbers, and symbols. This increases the complexity of the password exponentially."
        },
        {
          subTitle: "Avoid Personal Information",
          subContent: "Don't use personal information like your name, birthday, or address in your passwords. This information is often easy to find and can be used to guess your passwords."
        },
        {
          subTitle: "Consider a Passphrase",
          subContent: "A passphrase is a sequence of words that is easy for you to remember but hard for a computer to guess. For example, 'CorrectHorseBatteryStaple' is a strong passphrase."
        }
      ]
    },
    {
        id: 'password-longevity',
        title: 'How Long Should You Use a Password For?',
        icon: <Lock className="h-6 w-6 text-cyan-400" />,
        content: [
            {
                subTitle: "Regular Changes Aren't Always Better",
                subContent: "The old advice of changing passwords every 90 days is now considered outdated by many security experts. Frequent mandatory changes can lead to users creating weaker, more predictable passwords."
            },
            {
                subTitle: "Change Passwords After a Breach",
                subContent: "The most important time to change a password is when you know or suspect that the service has been breached. Also, change it if you think your password might have been compromised."
            },
            {
                subTitle: "Use Unique Passwords for Every Service",
                subContent: "Instead of rotating passwords, focus on using a unique and strong password for every online account. This way, if one account is compromised, your other accounts remain safe."
            }
        ]
    },
    {
        id: '2fa',
        title: 'Benefits of Two-Factor Authentication (2FA)',
        icon: <Fingerprint className="h-6 w-6 text-cyan-400" />,
        content: [
            {
                subTitle: "A Second Layer of Security",
                subContent: "2FA adds a second layer of security to your accounts. Even if a hacker gets your password, they won't be able to access your account without the second factor."
            },
            {
                subTitle: "Types of 2FA",
                subContent: "Common second factors include something you have (like a code from an authenticator app or an SMS to your phone) or something you are (like your fingerprint or face ID)."
            },
            {
                subTitle: "Enable it Everywhere",
                subContent: "Enable 2FA on all of your important accounts, such as your email, banking, and social media accounts. It's one of the most effective ways to protect your digital life."
            }
        ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4 text-white">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-white hover:bg-white/10 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
          Cybersecurity Learning Hub
        </h1>
        <p className="text-center text-slate-300 mb-12">
          Knowledge is your best defense. Learn how to protect yourself from digital threats.
        </p>

        <Accordion type="single" collapsible className="w-full">
            {articles.map((article) => (
                <AccordionItem value={article.id} key={article.id}>
                    <AccordionTrigger className="text-xl hover:text-cyan-400">
                        <div className="flex items-center gap-4">
                            {article.icon}
                            {article.title}
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="space-y-4">
                        {article.content.map((point, index) => (
                            <Card key={index} className="bg-white/5 border-white/10">
                                <CardHeader>
                                    <CardTitle className="text-lg text-cyan-300">{point.subTitle}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-300">{point.subContent}</p>
                                </CardContent>
                            </Card>
                        ))}
                      </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </div>
    </div>
  );
}
