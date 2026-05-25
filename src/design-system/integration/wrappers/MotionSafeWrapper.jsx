import React, { ErrorBoundary } from 'react';
import { useIntegrationConfig } from '../useIntegrationConfig';
import { FadeIn } from '../../ui';

class SafeErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <>{this.props.children}</>; // Fallback silencioso a legacy UI
    return this.props.children;
  }
}

/**
 * MotionSafeWrapper
 * Envuelve componentes críticos. Si el config lo permite, inyecta FadeIn.
 * Nunca intercepta handlers del children. Si algo falla, el ErrorBoundary
 * hace fallback a renderizar el children limpio.
 */
export const MotionSafeWrapper = ({ children, delay = 0 }) => {
  const { flags } = useIntegrationConfig();

  if (!flags.enableMotion) {
    return <>{children}</>;
  }

  return (
    <SafeErrorBoundary>
      <FadeIn delay={delay} direction="up" as="div">
        {children}
      </FadeIn>
    </SafeErrorBoundary>
  );
};
