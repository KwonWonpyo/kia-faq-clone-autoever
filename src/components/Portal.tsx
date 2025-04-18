import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function Portal({ children }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const el = document.getElementById("portal-root");
  return el ? createPortal(children, el) : null;
}
