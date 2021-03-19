import React, { lazy, Suspense, useState, useEffect } from "react";

const Source = lazy(() => import("../components/Source"));

export default function AaronJs() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

  return (
    hasMounted && (
      <Suspense fallback={null}>
        <Source />
      </Suspense>
    )
  );
}
