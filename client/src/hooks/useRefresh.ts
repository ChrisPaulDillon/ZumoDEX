import { useState, useEffect } from "react";

const FAST_INTERVAL = 10000;
const SLOW_INTERVAL = 60000;

// This hook maintain 2 counters that can be used as a dependencies on other hooks to force a periodic refresh
const useRefresh = () => {
  const [slowRefresh, setSlow] = useState(0);
  const [fastRefresh, setFast] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      setFast((prev) => prev + 1);
    }, FAST_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      setSlow((prev) => prev + 1);
    }, SLOW_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return { slowRefresh, fastRefresh };
};

export default useRefresh;
