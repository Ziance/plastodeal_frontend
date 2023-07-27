import { useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import get from 'lodash/get';
import iconImage from "../../assets/images/filedropimage/filedropIcon.jpg"
// import FolderFile from '../../assets/svg/folder-file.svg'
import './index.css';


export interface FileDropzoneProps {
  files: File[] | [];
  imagesUrls?: string[] | [];
  setFiles: (files: File[]) => void; 
  accept: string
}


const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  border:"none",
//   borderColor: '#eeeeee',
//   borderStyle: 'dashed',
  backgroundColor: '#F4F4F4',
  cursor:"pointer",
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  height: '100%',
  justifyContent: 'center'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const FileDropzone = (props: FileDropzoneProps) => {
  const { files, imagesUrls, setFiles, accept } = props;

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept,
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    if (files) {
      files.forEach(file => {
        if (file) {
          URL.revokeObjectURL(get(file, 'preview', ''))
        }
      });
    }
  }, [files]);

  const style: any = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  let thumbs: any = [];

  if (files && files.length) {
    thumbs = files.map((file: any) => {
      

      return (
        <div key={file.name}>
          <div>
            {file.name.match(/.(jpg|jpeg|png|gif)$/i) ?
              <img
                alt={file.name}
                src={file.preview}
              />
              :
              <img
                alt={file.name}
                src={iconImage}
                className='file-dropzone__placeholder'
              />
            }
          </div>
        </div>
      )
    });
  } else if (imagesUrls && imagesUrls.length) {
    thumbs = imagesUrls.map((url: any) => {
      
      return (
        <div key={url}>
          <div>
            {url.match(/.(jpg|jpeg|png|gif)/i) ?
              <img
                alt='File'
                src={url}
              />
              :
              <img
                alt={'File'}
                // src={FolderFile}
                className='file-dropzone__placeholder'
              />
            }
          </div>
        </div>
      )
    });
  }

  return (
    <div className="file-dropzone">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {files && !files.length && imagesUrls && !imagesUrls.length ?
           <div className='file-dropzone__images-container-logo'>
           {/* {thumbs} */}
         </div>
          :
          <div className='file-dropzone__images-container'>
            {thumbs}
          </div>
        }
      </div>
    </div>
  );
}

export default FileDropzone;
