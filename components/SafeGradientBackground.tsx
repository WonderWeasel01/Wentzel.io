'use client';

import { Component, type ReactNode } from 'react';
import { GradientBackground } from './GradientBackground';

function CssGradientFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse 120% 80% at 20% 20%, hsl(193 85% 66% / 0.9), transparent 55%), radial-gradient(ellipse 100% 70% at 80% 30%, hsl(196 100% 83% / 0.85), transparent 50%), linear-gradient(160deg, hsl(195 100% 50%), hsl(210 80% 35%))',
      }}
    />
  );
}

class ShaderErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <CssGradientFallback />;
    }
    return this.props.children;
  }
}

export function SafeGradientBackground() {
  return (
    <ShaderErrorBoundary>
      <GradientBackground />
    </ShaderErrorBoundary>
  );
}
