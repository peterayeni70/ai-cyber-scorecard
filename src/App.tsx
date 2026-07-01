import { useState, useEffect } from 'react';
import { Hero } from './components/landing/Hero';
import { AssessmentWizard } from './components/assessment/AssessmentWizard';
import { ScoreDashboard } from './components/dashboard/ScoreDashboard';
import { EducationalHub } from './components/education/EducationalHub';
import { PasswordToolbox } from './components/tools/PasswordToolbox';
import type { AssessmentResult } from './lib/assessment-data';

type AppView = 'landing' | 'assessment' | 'dashboard' | 'learn' | 'tools';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);

  // Load saved assessment from localStorage
  useEffect(() => {
    const savedResult = localStorage.getItem('secureScore_result');
    if (savedResult) {
      try {
        const result = JSON.parse(savedResult);
        setAssessmentResult(result);
      } catch (e) {
        console.error('Failed to parse saved assessment:', e);
      }
    }
  }, []);

  // Save assessment to localStorage
  useEffect(() => {
    if (assessmentResult) {
      localStorage.setItem('secureScore_result', JSON.stringify(assessmentResult));
    }
  }, [assessmentResult]);

  const handleStartAssessment = () => {
    setCurrentView('assessment');
  };

  const handleAssessmentComplete = (result: AssessmentResult) => {
    setAssessmentResult(result);
    setCurrentView('dashboard');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  const handleLearnMore = () => {
    setCurrentView('learn');
  };

  const handleShowTools = () => {
    setCurrentView('tools');
  };

  const handleRetakeAssessment = () => {
    setAssessmentResult(null);
    localStorage.removeItem('secureScore_result');
    setCurrentView('assessment');
  };

  return (
    <>
      {currentView === 'landing' && (
        <Hero
          onStartAssessment={handleStartAssessment}
          onLearnMore={handleLearnMore}
          onShowTools={handleShowTools}
        />
      )}
      {currentView === 'assessment' && (
        <AssessmentWizard
          onComplete={handleAssessmentComplete}
          onBack={handleBackToLanding}
        />
      )}
      {currentView === 'dashboard' && assessmentResult && (
        <ScoreDashboard
          result={assessmentResult}
          onBack={handleBackToLanding}
          onRetake={handleRetakeAssessment}
          onLearnMore={handleLearnMore}
        />
      )}
      {currentView === 'learn' && <EducationalHub onBack={handleBackToLanding} />}
      {currentView === 'tools' && <PasswordToolbox onBack={handleBackToLanding} />}
    </>
  );
}

export default App;
