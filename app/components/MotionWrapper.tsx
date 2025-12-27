import { MotionConfig } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function MotionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <div suppressHydrationWarning>{children}</div>;
  }

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20
      }}
    >
      {children}
    </MotionConfig>
  );
}
