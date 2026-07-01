import { ArrowLeft, Download, Share2, TrendingUp, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type AssessmentResult, getScoreLabel, getScoreColor } from '@/lib/assessment-data';
import { generateRecommendations, type Recommendation } from '@/lib/recommendations';

interface ScoreDashboardProps {
  result: AssessmentResult;
  onBack: () => void;
  onRetake: () => void;
  onLearnMore: () => void;
}

export function ScoreDashboard({ result, onBack, onRetake, onLearnMore }: ScoreDashboardProps) {
  const recommendations = generateRecommendations(result);
  const scoreLabel = getScoreLabel(result.totalScore);
  const scoreColor = getScoreColor(result.totalScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" className="border-2 border-cyan-400 text-cyan-400 bg-cyan-400/10 hover:bg-cyan-400/20 hover:text-white font-semibold">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" className="border-2 border-cyan-400 text-cyan-400 bg-cyan-400/10 hover:bg-cyan-400/20 hover:text-white font-semibold">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Score Overview */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
          <CardContent className="pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Score Circle */}
              <div className="text-center">
                <div className="relative inline-block">
                  <svg className="w-64 h-64 transform -rotate-90">
                    <circle
                      cx="128"
                      cy="128"
                      r="110"
                      stroke="currentColor"
                      strokeWidth="16"
                      fill="none"
                      className="text-white/10"
                    />
                    <circle
                      cx="128"
                      cy="128"
                      r="110"
                      stroke={scoreColor}
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={`${(result.totalScore / 1000) * 691} 691`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-6xl font-bold" style={{ color: scoreColor }}>
                      {result.totalScore}
                    </div>
                    <div className="text-xl text-slate-300 mt-2">{scoreLabel}</div>
                    <div className="text-sm text-slate-400">out of 1000</div>
                  </div>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Your Security Score</h2>
                  <p className="text-slate-300">
                    {result.totalScore >= 600
                      ? 'Great job! Your security posture is strong, but there is always room for improvement.'
                      : result.totalScore >= 400
                      ? 'You have a fair security foundation, but some critical areas need attention.'
                      : 'Your security needs immediate attention. Follow our recommendations to stay protected.'}
                  </p>
                </div>

                <div className="space-y-4">
                  <CategoryBar
                    label="Identity Security"
                    score={result.categoryScores.identity}
                    maxScore={250}
                    color="#06b6d4"
                  />
                  <CategoryBar
                    label="Privacy Protection"
                    score={result.categoryScores.privacy}
                    maxScore={250}
                    color="#8b5cf6"
                  />
                  <CategoryBar
                    label="Device Security"
                    score={result.categoryScores.device}
                    maxScore={250}
                    color="#10b981"
                  />
                  <CategoryBar
                    label="Network Safety"
                    score={result.categoryScores.network}
                    maxScore={250}
                    color="#f59e0b"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Priority Recommendations</h2>
              <p className="text-slate-300">Take these steps to improve your security score</p>
            </div>
            <Badge variant="outline" className="border-cyan-500/50 text-cyan-400">
              <TrendingUp className="h-3 w-3 mr-1" />
              {recommendations.length} actions
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec) => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        </div>

        {/* Learn More */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
            <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Increase Your Knowledge</h3>
                        <p className="text-slate-300">Visit our Learning Hub for articles on how to stay safe online.</p>
                    </div>
                    <Button onClick={onLearnMore} variant="outline" className="border-2 border-cyan-400 text-cyan-400 bg-cyan-400/10 hover:bg-cyan-400/20 hover:text-white font-semibold">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Learn More
                    </Button>
                </div>
            </CardContent>
        </Card>

        {/* Retake Assessment */}
        <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Track Your Progress
                </h3>
                <p className="text-slate-300">
                  Retake the assessment after implementing changes to see your improved score.
                </p>
              </div>
              <Button
                onClick={onRetake}
                className="bg-cyan-500 hover:bg-cyan-600 text-white"
              >
                Retake Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function CategoryBar({
  label,
  score,
  maxScore,
  color,
}: {
  label: string;
  score: number;
  maxScore: number;
  color: string;
}) {
  const percentage = (score / maxScore) * 100;

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-white">{label}</span>
        <span className="text-sm text-slate-300">
          {score}/{maxScore}
        </span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function RecommendationCard({ recommendation }: { recommendation: Recommendation }) {
  const impactColors = {
    high: 'bg-red-500/20 text-red-400 border-red-500/50',
    medium: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
    low: 'bg-green-500/20 text-green-400 border-green-500/50',
  };

  const difficultyColors = {
    easy: 'bg-green-500/20 text-green-400 border-green-500/50',
    medium: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
    hard: 'bg-red-500/20 text-red-400 border-red-500/50',
  };

  return (
    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-lg text-white">{recommendation.title}</CardTitle>
        </div>
        <div className="flex gap-2 mb-3">
          <Badge variant="outline" className={impactColors[recommendation.impact]}>
            {recommendation.impact.toUpperCase()} IMPACT
          </Badge>
          <Badge variant="outline" className={difficultyColors[recommendation.difficulty]}>
            {recommendation.difficulty.toUpperCase()} EFFORT
          </Badge>
        </div>
        <CardDescription className="text-slate-300">
          {recommendation.description}
        </CardDescription>
      </CardHeader>
      {recommendation.societyRelevance && (
        <CardContent>
          <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
            <p className="text-sm text-cyan-100">
              <strong>Why it matters:</strong> {recommendation.societyRelevance}
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
