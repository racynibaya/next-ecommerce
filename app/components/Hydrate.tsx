'use client';

import { ReactNode, useEffect, useState } from 'react';

const Hydrate = ({ children }: { children: ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);
  return <>{isHydrated ? <>{children}</> : <div>Loading ...</div>}</>;
};

export default Hydrate;
