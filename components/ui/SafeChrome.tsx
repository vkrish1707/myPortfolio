'use client';

import ErrorBoundary from './ErrorBoundary';
import Nav from './Nav';
import CustomCursor from './CustomCursor';
import MeshBackground from './MeshBackground';

export default function SafeChrome() {
  return (
    <>
      <ErrorBoundary label="MeshBackground" fallback={() => null}>
        <MeshBackground />
      </ErrorBoundary>
      <ErrorBoundary label="CustomCursor" fallback={() => null}>
        <CustomCursor />
      </ErrorBoundary>
      <ErrorBoundary label="Nav" fallback={() => null}>
        <Nav />
      </ErrorBoundary>
    </>
  );
}
