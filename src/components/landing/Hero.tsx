import { Shield, TrendingUp, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface HeroProps {
  onStartAssessment: () => void;
  onLearnMore: () => void;
  onShowTools: () => void;
}

export function Hero({ onStartAssessment, onLearnMore, onShowTools }: HeroProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-cyan-400" />
            <span className="text-xl font-bold">SecureScore</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={onShowTools}
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              Security Tools
            </Button>
            <Button
              onClick={onStartAssessment}
              className="bg-cyan-500 hover:bg-cyan-600 text-white"
            >
              Get Your Score
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 mb-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium">
            AI-Powered Cybersecurity Assessment
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
            Your Digital Security,
            <br />
            Quantified &amp; Protected
          </h1>

          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            In a world where cyber threats evolve daily, know exactly where you stand.
            SecureScore gives you a comprehensive security rating and actionable steps
            to protect what matters most.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              onClick={onStartAssessment}
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-6 text-lg"
            >
              Start Free Assessment
            </Button>
            <Button
              variant="outline"
              onClick={onLearnMore}
              size="lg"
              className="border-2 border-cyan-400 text-cyan-400 bg-cyan-400/10 hover:bg-cyan-400/20 hover:text-white px-8 py-6 text-lg font-semibold"
            >
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-cyan-400 mb-2">$8T+</div>
                <div className="text-slate-300">Global cybercrime cost by 2025</div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-cyan-400 mb-2">43%</div>
                <div className="text-slate-300">Of attacks target individuals</div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-cyan-400 mb-2">60%</div>
                <div className="text-slate-300">Of small businesses fail after a breach</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <CardContent className="pt-6">
              <Zap className="h-12 w-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Instant Assessment</h3>
              <p className="text-slate-300">
                Get your comprehensive security score in under 5 minutes with our AI-powered analysis.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <CardContent className="pt-6">
              <TrendingUp className="h-12 w-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-slate-300">
                Monitor your security posture over time and see improvements as you implement recommendations.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <CardContent className="pt-6">
              <Shield className="h-12 w-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Actionable Insights</h3>
              <p className="text-slate-300">
                Receive prioritized, step-by-step recommendations tailored to your specific security gaps.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <CardContent className="pt-6">
              <Users className="h-12 w-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Society Impact</h3>
              <p className="text-slate-300">
                Understand how your security habits affect your community and contribute to a safer digital world.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Modern Threats Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <h2 className="text-3xl font-bold text-center mb-8">Why This Matters Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/20">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3 text-red-400">AI-Powered Attacks</h3>
                <p className="text-slate-300">
                  Cybercriminals are using AI to create convincing phishing emails, deepfake voice calls,
                  and automated vulnerability scanning. Traditional defenses are not enough.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3 text-purple-400">Deepfake Threats</h3>
                <p className="text-slate-300">
                  AI-generated deepfakes can impersonate anyone - from your CEO to family members.
                  Verification and awareness are your best protection.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-400">Remote Work Risks</h3>
                <p className="text-slate-300">
                  With hybrid work becoming standard, personal devices and home networks are now
                  critical security endpoints. Your home security matters more than ever.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3 text-green-400">Data Economy</h3>
                <p className="text-slate-300">
                  Your personal data is valuable. Data breaches expose millions daily. Understanding
                  your exposure helps you take control of your digital identity.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold mb-4">Ready to Know Your Score?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of individuals and businesses who have taken control of their cybersecurity.
            It is free, takes 5 minutes, and could save you from a devastating breach.
          </p>
          <Button
            onClick={onStartAssessment}
            size="lg"
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-6 text-lg"
          >
            Start Your Free Assessment
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-slate-400">
          <p>&copy; 2024 SecureScore. Empowering digital security for everyone.</p>
        </div>
      </footer>
    </div>
  );
}
