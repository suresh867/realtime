"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ color: [] }, { background: [] }],
  ["bold", "italic", "underline"],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

export default function Home() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [quill, setQuill] = useState<any>(null);

  const setupEditor = useCallback(async () => {
    const Quill = (await import("quill")).default;

    if (wrapperRef.current) {
      wrapperRef.current.innerHTML = "";
      const editor = document.createElement("div");
      wrapperRef.current.append(editor);

      const q = new Quill(editor, {
        theme: "snow",
        modules: {
          toolbar: TOOLBAR_OPTIONS,
        },
      });
      setQuill(q);
    }
  }, []);

  useEffect(() => {
    setupEditor();
  }, [setupEditor]);

  return <div className="container" ref={wrapperRef} />;
}
