import React, { lazy, Suspense, useState, useEffect } from "react";

const Gateway = lazy(() => import("../components/Gateway"));

export default function AGBEngineer() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

  return (
    hasMounted && (
      <Suspense fallback={null}>
        <Gateway />
      </Suspense>
    )
  );
}
