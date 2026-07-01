import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Copy, RefreshCw, ArrowLeft } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export function PasswordToolbox({ onBack }: { onBack: () => void; }) {
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const [passwordToAnalyze, setPasswordToAnalyze] = useState('');

  const generatePassword = () => {
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charPool = lowerCaseChars;
    if (includeUppercase) charPool += upperCaseChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSymbols) charPool += symbolChars;
    
    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      password += charPool[randomIndex];
    }
    setGeneratedPassword(password);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const analyzePassword = (password: string) => {
    let score = 0;
    const criteria = {
        length: password.length >= 8,
        length_long: password.length >= 12,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        symbol: /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password),
    };

    if(criteria.length) score++;
    if(criteria.length_long) score++;
    if(criteria.uppercase) score++;
    if(criteria.lowercase) score++;
    if(criteria.number) score++;
    if(criteria.symbol) score++;

    let strength = 'Very Weak';
    let color = 'text-red-500';
    if (score >= 6) {
        strength = 'Very Strong';
        color = 'text-green-500';
    } else if (score >= 4) {
        strength = 'Strong';
        color = 'text-yellow-500';
    } else if (score >= 3) {
        strength = 'Medium';
        color = 'text-orange-500';
    } else if (score > 0) {
        strength = 'Weak';
        color = 'text-red-600';
    }

    return { score, strength, color, criteria };
  };

  const analysis = analyzePassword(passwordToAnalyze);

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
            <h1 className="text-4xl font-bold text-center mb-8">Security Toolbox</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Password Generator */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Strong Password Generator</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <Input readOnly value={generatedPassword} placeholder="Your new password appears here" className="bg-slate-800 border-slate-700"/>
                    <Button onClick={copyToClipboard} variant="outline" className="border-slate-700 hover:bg-slate-800">
                      {copied ? <Check className="h-4 w-4 text-green-500"/> : <Copy className="h-4 w-4"/>}
                    </Button>
                    <Button onClick={generatePassword} variant="outline" className="border-slate-700 hover:bg-slate-800">
                        <RefreshCw className="h-4 w-4"/>
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className='space-y-2'>
                        <div className="flex justify-between">
                            <Label htmlFor="length">Password Length</Label>
                            <span>{passwordLength}</span>
                        </div>
                        <Slider id="length" min={8} max={32} defaultValue={[12]} onValueChange={(value) => setPasswordLength(value[0])} />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="uppercase" defaultChecked={includeUppercase} onCheckedChange={(checked) => setIncludeUppercase(Boolean(checked))} />
                        <Label htmlFor="uppercase">Include Uppercase</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="numbers" defaultChecked={includeNumbers} onCheckedChange={(checked) => setIncludeNumbers(Boolean(checked))} />
                        <Label htmlFor="numbers">Include Numbers</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="symbols" defaultChecked={includeSymbols} onCheckedChange={(checked) => setIncludeSymbols(Boolean(checked))} />
                        <Label htmlFor="symbols">Include Symbols</Label>
                    </div>
                  </div>

                  <Button onClick={generatePassword} className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600">Generate Password</Button>
                </CardContent>
              </Card>

              {/* Password Strength Checker */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Password Strength Analyzer</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input 
                        type="text"
                        placeholder="Enter a password to analyze" 
                        className="bg-slate-800 border-slate-700 mb-4"
                        value={passwordToAnalyze}
                        onChange={(e) => setPasswordToAnalyze(e.target.value)}
                    />
                    
                    {passwordToAnalyze && (
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span>Strength:</span>
                                <span className={analysis.color}>{analysis.strength}</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2.5 mb-4">
                                <div className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full h-2.5" style={{ width: `${(analysis.score / 6) * 100}%` }}></div>
                            </div>

                            <ul className="space-y-1 text-sm">
                                <li className={`flex items-center ${analysis.criteria.length ? 'text-green-400' : 'text-red-400'}`}>
                                    <Check className="h-4 w-4 mr-2"/> At least 8 characters
                                </li>
                                <li className={`flex items-center ${analysis.criteria.uppercase ? 'text-green-400' : 'text-red-400'}`}>
                                    <Check className="h-4 w-4 mr-2"/> Contains uppercase letter
                                </li>
                                <li className={`flex items-center ${analysis.criteria.lowercase ? 'text-green-400' : 'text-red-400'}`}>
                                    <Check className="h-4 w-4 mr-2"/> Contains lowercase letter
                                </li>
                                 <li className={`flex items-center ${analysis.criteria.number ? 'text-green-400' : 'text-red-400'}`}>
                                    <Check className="h-4 w-4 mr-2"/> Contains a number
                                </li>
                                 <li className={`flex items-center ${analysis.criteria.symbol ? 'text-green-400' : 'text-red-400'}`}>
                                    <Check className="h-4 w-4 mr-2"/> Contains a symbol
                                </li>
                            </ul>
                        </div>
                    )}
                </CardContent>
              </Card>
            </div>
        </div>
    </div>
  );
}
