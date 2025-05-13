"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import { Delta } from "quill";

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

export default function QuilEditor() {
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
        if (!quill) return;

        const handler = (delta: Delta, oldDelta: Delta, source: string) => {
            if (source !== "user") return;
            console.log(delta);
        };

        quill.on("text-change", handler);

        return () => {
            quill.off("text-change", handler);
        };
    }, [quill]);

    useEffect(() => {
        setupEditor();
    }, [setupEditor]);

    return <div className="editor" ref={wrapperRef} />;
}
