import React, { useState, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./textEditor.module.css";

const TextEditor: React.FC = () => {
  const [content, setContent] = useState<any>("");
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: "snow",
      });

      quill.on("text-change", () => {
        setContent(quill.root.innerHTML);
      });

      quillRef.current = quill;
    }
  }, []);

  // useEffect(() => {
  //   if (quillRef.current) {
  //     console.log("quill ref",quillRef.current.root.innerHTML);
  //     console.log("content",content);
      
      
  //     // quillRef.current.root.innerHTML = content;
  //   }
  // }, [content]);
  return (
    <div className="editor-container">
      <div ref={editorRef} className="quill-editor" />
    </div>
  );
};

export default TextEditor;
