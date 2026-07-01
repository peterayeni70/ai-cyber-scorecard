import { useState } from 'react';
import { ArrowLeft, Loader2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { questions, calculateScore, type AssessmentResult } from '@/lib/assessment-data';

interface AssessmentWizardProps {
  onComplete: (result: AssessmentResult) => void;
  onBack: () => void;
}

export function AssessmentWizard({ onComplete, onBack }: AssessmentWizardProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (score: number) => {
    const newAnswers = { ...answers, [question.id]: score };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setIsAnalyzing(true);
      setTimeout(() => {
        const result = calculateScore(newAnswers);
        onComplete(result);
      }, 2000);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 animate-ping">
              <Shield className="h-24 w-24 text-cyan-400/20 mx-auto" />
            </div>
            <Shield className="h-24 w-24 text-cyan-400 mx-auto animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">AI Analysis in Progress</h2>
          <p className="text-slate-300 mb-6">Evaluating your cybersecurity posture...</p>
          <Loader2 className="h-8 w-8 text-cyan-400 animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <span className="text-slate-400">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-white">{question.question}</CardTitle>
            <CardDescription className="text-slate-400">
              Category: {question.category.charAt(0).toUpperCase() + question.category.slice(1)} Security
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleAnswer(option.score)}
                  className="w-full justify-start text-left h-auto py-4 px-4 bg-white/5 border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/50 text-white"
                >
                  <span className="text-base">{option.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          {currentQuestion > 0 && (
            <div className="text-slate-400 text-sm">
              {Object.keys(answers).length} of {questions.length} answered
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
