"use client";

import {
  useRef,
  useCallback,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";

export function useDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const open = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const Dialog = useCallback(
    ({ children }: { children: ReactNode }) => {
      if (!mounted) return null;

      const node = (
        <dialog
          ref={dialogRef}
          style={{ margin: "20px auto", padding: "20px", zIndex: 1000, position: "fixed" }} 
        >
          {children}
        </dialog>
      );

      return createPortal(node, document.body);
    },
    [mounted]
  );

  return { Dialog, open, close };
}
