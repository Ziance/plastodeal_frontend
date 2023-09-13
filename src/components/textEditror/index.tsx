import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


interface IeditorData {
  filteredData?: any;
  setSaveData: React.Dispatch<React.SetStateAction<any | undefined>>
  activeDescription?  : any
}

const TextEditor : React.FC<IeditorData> = ({ filteredData, setSaveData,activeDescription  }): JSX.Element => {
    return (
        <CKEditor
            editor={ClassicEditor}
            // data="<p>Hello from CKEditor&nbsp;5!</p>"
            data={filteredData ? filteredData[0]?.description : activeDescription && activeDescription  }
            onReady={(editor: any) => {
                console.log('Editor is ready to use!', editor);
            }}
            onChange={(event: any, editor: any) => {
                const data = editor.getData();
                console.log({ event, editor, data });
                setSaveData(data)
            }}
            onBlur={(event: any, editor: any) => {
                console.log('Blur.', editor);
            }}
            onFocus={(event: any, editor: any) => {
                console.log('Focus.', editor);
            }}
        />
    )
}

export default TextEditor
