import * as React from 'react'
// import CKEditor from '@ckeditor/ckeditor5-react'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'


import Test from './Test'

// 

const config = {
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    'blockQuote',
  ],
}

const TextEditor = () => {
  const fieldA = {
    form: {
      message: 'hey'
    }
  }
  const fieldB = undefined
  const res = fieldB
  // console.log('@@@@@', res?.message)
  console.log("fieldb", fieldB)


  return (
    <div>sdhfgjksdhfgjshdbf</div>
    // <CKEditor
    //   editor={ClassicEditor}
    //   // config={config}
    //   data="<p>Hello from CKEditor 5!</p>"
    //   onInit={(editor : any) => {
    //     // You can store the "editor" and use when it is needed.
    //     console.log(
    //       'Editor is ready to use!',
    //       editor,
    //       Array.from(editor.ui.componentFactory.names()),
    //     )
    //   }}
    //   onChange={(event: any, editor: any) => {
    //     const data = editor.getData()
    //     console.log({ event, editor, data })
    //   }}
    //   onBlur={(event: any, editor: any) => {
    //     console.log('Blur.', editor)
    //   }}
    //   onFocus={(event: any, editor: any) => {
    //     console.log('Focus.', editor)
    //   }}
    // />
  )
}
export default TextEditor