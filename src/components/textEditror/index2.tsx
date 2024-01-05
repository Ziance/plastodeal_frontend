import React, { useState, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./textEditor.css";
import { htmlToText } from "html-to-text";

interface IeditorData {
  filteredData: any;
  setSaveData: React.Dispatch<React.SetStateAction<any | undefined>>
}
const TextEditor: React.FC<IeditorData> = ({ filteredData, setSaveData }): JSX.Element => {
  const [content, setContent] = useState<any>("");
  const [convertedData, setConvertedData] = useState<any>();
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);
  useEffect(() => {
    return () => {
      quillRef.current = null;
    };
  }, []);
  useEffect(()=>{

  },[content])

  useEffect(() => {

    const data = htmlToText(filteredData?.[0].description);

    if (editorRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: "snow",
      });

      quillRef.current = quill;
      quill.on('text-change', (delta, oldDelta, source) => {
        const recieve= quill.root.innerHTML
        // setContent(recieve)
        //  setSaveData(recieve)
        // if (source === 'user') {
        //   // Update your state here
        // }
      });
      quill.setText(data, "api");
    }
  }, [quillRef.current?.root.innerHTML]);
 
  return (
    <div className="editor-container">
      <div ref={editorRef} className="ql-snow" />
    </div>
  );
};

export default TextEditor;
