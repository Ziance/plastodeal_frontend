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
            }}
            onChange={(event: any, editor: any) => {
                const data = editor.getData();
                setSaveData(data)
            }}
            onBlur={(event: any, editor: any) => {
            }}
            onFocus={(event: any, editor: any) => {
            }}
        />
    )
}

export default TextEditor
