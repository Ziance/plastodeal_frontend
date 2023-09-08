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
      console.log("cleaned up");
    };
  }, []);
  useEffect(()=>{

    console.log("content",content);
  },[content])

  useEffect(() => {
    console.log("filteredData11111111111111", filteredData);

    const data = htmlToText(filteredData?.[0].description);
    console.log("data", data);
    console.log("converted data", convertedData);

    if (editorRef.current) {
      console.log("data", data);

      const quill = new Quill(editorRef.current, {
        theme: "snow",
      });

      quillRef.current = quill;
      console.log("quill", quill);
      quill.on('text-change', (delta, oldDelta, source) => {
        console.log("delta 1",delta);
        const recieve= quill.root.innerHTML
        console.log("recieve",recieve.toString());
        // setContent(recieve)
        //  setSaveData(recieve)
        // if (source === 'user') {
        //   // Update your state here
        //   console.log("delta",delta);
        //   console.log("oldDelta",oldDelta);
        // }
      });
      quill.setText(data, "api");
    }
  }, [quillRef.current?.root.innerHTML]);
  // const html = parser.parseFromString(filteredData[0]?.description, 'text/html');
  // console.log("html ",html);

  // var tempDivElement = document.createElement("div");

  // Set the HTML content with the given value
  //  var data= tempDivElement.innerHTML;

  // Retrieve the text property of the element
  // return tempDivElement.textContent || tempDivElement.innerText || "";

  // useEffect(() => {
  //   if (quillRef.current) {
  //     console.log("quill ref",quillRef.current.root.innerHTML);
  //     console.log("content",content);

  //     // quillRef.current.root.innerHTML = content;
  //   }
  // }, [content,quillRef.current?.root?.innerHTML]);
  // useEffect(() => {

  //   let data = JSON.stringify(quillRef.current?.root?.innerHTML)
  //   setSaveData(data)
  // }, [quillRef.current?.root])
  // useEffect(() => {
  //   console.log("data inside curent");

  // }, [quillRef.current?.hasFocus])
  return (
    <div className="editor-container">
      <div ref={editorRef} className="ql-snow" />
    </div>
  );
};

export default TextEditor;
