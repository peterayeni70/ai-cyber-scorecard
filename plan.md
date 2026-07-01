# SecureScore AI - Implementation Plan (Updated)

AI-Powered Personal Cybersecurity Assessment Platform with built-in password security tools and educational resources.

## Scope Summary
- **Core Concept:** A digital "credit score" for personal cybersecurity.
- **New Features:**
  - **Password Generator:** Generate strong passwords (8-12 chars, alphanumeric + symbols).
  - **Password Strength Analyzer:** Interactive tool to check password strength based on specific metrics.
  - **Educational Hub:** "Learn More" page with articles on phishing, password hygiene, and 2FA.
  - **UI/UX Refinement:** Fix visibility of "Share", "Export", and "Learn More" buttons.
  - **Branding:** Update name to "SecureScore" and update favicon using the existing logo.

## Affected Areas
- **Frontend:**
  - `src/App.tsx`: Main routing and layout.
  - `src/components/tools/`: New `PasswordGenerator` and `PasswordStrengthChecker` components.
  - `src/components/education/`: New `EducationalHub` page/component.
  - `src/components/dashboard/ScoreDashboard.tsx`: UI fixes for buttons.
  - `src/components/landing/Hero.tsx`: UI fixes and "Learn More" link.
- **Assets:**
  - `public/favicon.ico`: Update with the "shelled" logo.
- **Data (Client-side):**
  - Password generation logic.
  - Strength analysis logic.

## Auth & RLS model
**Auth in scope:** no
**Model:** no_auth_public_read (Persistence via localStorage)
**RLS strategy:** n/a
**Frontend implication:** User data persists in localStorage.

## Migration baseline
**Local migrations in project:** none
**User confirmed proceed on connected DB:** not_applicable

## Assumptions & Open Questions
- **Assumption:** The "logo, just the shelled" refers to the `gebeya.webp` or similar asset already in the project, which will be converted/used as a favicon.
- **Assumption:** The "Learn More" page will be a new view within the SPA structure.

## Phases

### Phase 1: Branding & Global UI Refinements
- **Goal:** Set the brand identity and fix visibility issues.
- **Deliverables:**
  - Update application name/title to "SecureScore".
  - Replace favicon with the shelled logo.
  - Fix CSS/colors for "Share", "Export", and "Learn More" buttons to ensure high visibility.
- **Owner:** `quick_fix_engineer`

### Phase 2: Password Security Tools
- **Goal:** Implement the requested password generator and analyzer.
- **Deliverables:**
  - `src/components/tools/PasswordToolbox.tsx`: A container for both tools.
  - Generator logic: 8-12 chars, mixed case, numbers, symbols.
  - Analyzer logic: Metric-based feedback (length, variety).
- **Owner:** `frontend_engineer`

### Phase 3: Educational Hub
- **Goal:** Provide cyber security literacy content.
- **Deliverables:**
  - `src/components/education/EducationalHub.tsx`: Page with articles on:
    - Spotting phishing emails.
    - Creating strong passwords.
    - Password longevity/rotation.
    - Benefits of 2FA.
- **Owner:** `frontend_engineer`

### Phase 4: Integration & Navigation
- **Goal:** Connect all new parts.
- **Deliverables:**
  - Update `src/App.tsx` to handle the new "Learn More" / "Tools" routes/views.
  - Ensure "Learn More" button correctly navigates to the hub.
- **Owner:** `frontend_engineer`

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. quick_fix_engineer — Fix UI visibility issues and branding immediately.
2. frontend_engineer — Build the password tools, educational hub, and integrate navigation.

**Per-agent instructions:**

### 1. quick_fix_engineer
- **Phases:** 1
- **Scope:** 
  - Update any text references from "SecureScore AI" or "react-starter-template" to just "SecureScore".
  - Locate the "Share", "Export", and "Learn More" buttons in `ScoreDashboard.tsx` and `Hero.tsx`. Fix their text color/background to ensure visibility (likely high contrast against the dark/glassmorphic background).
  - Use `src/assets/favicon.png` or `dist/gebeya.webp` (the "shelled" logo) to update `public/favicon.ico`.
- **Files:** `src/components/dashboard/ScoreDashboard.tsx`, `src/components/landing/Hero.tsx`, `index.html`, `public/favicon.ico`
- **Depends on:** none
- **Acceptance criteria:** Buttons are clearly readable; Favicon is updated; App name is "SecureScore".

### 2. frontend_engineer
- **Phases:** 2, 3, 4
- **Scope:**
  - Create a new "Security Tools" section containing:
    - A Password Generator (8-12 chars, letters, numbers, symbols).
    - A Password Strength Checker (validation based on the same metrics).
  - Create the `EducationalHub.tsx` with the requested cybersecurity articles.
  - Update `src/App.tsx` state to include a 'learn-more' view and potentially a 'tools' view.
  - Link the "Learn More" button in `Hero.tsx` and `ScoreDashboard.tsx` to this new view.
- **Files:** `src/App.tsx`, `src/components/tools/PasswordToolbox.tsx`, `src/components/education/EducationalHub.tsx`, `src/components/landing/Hero.tsx`
- **Depends on:** quick_fix_engineer (for UI base fixes)
- **Acceptance criteria:** Password generator works; Strength checker provides feedback; Educational hub is accessible and contains the specified articles; Navigation between views is seamless.
