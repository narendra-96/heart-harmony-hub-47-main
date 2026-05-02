import { useLocation } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";

const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [key, setKey] = useState(location.pathname);

  useEffect(() => {
    setDisplayChildren(children);
    setKey(location.pathname);
  }, [location.pathname, children]);

  return (
    <div key={key} className="animate-fade-in pb-20 md:pb-0">
      {displayChildren}
    </div>
  );
};

export default PageTransition;
