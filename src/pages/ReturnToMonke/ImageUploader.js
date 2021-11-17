import { useState, useRef } from "react"
import ReactImageProcess from 'react-image-process'

import Button from "@tw/Button"

export default function ImageUploader() {
  const [image, setImage]           = useState(null)
  const [previewUrl, setPreviewUrl] = useState("")
  const [imgHeight, setImgHeight]   = useState()
  const [imgWidth, setImgWidth]     = useState()

  const fileInput = useRef(null)
  const imgRef    = useRef(null)


  function handleFile(file) {
    setImage(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  function handleDragOver(event) {
    event.preventDefault()
  }

  function handleOnDrop(event) {
    event.preventDefault()
    event.stopPropagation()
    handleFile(event.dataTransfer.files[0])
  }

  return (
    <div>
      <div
        className={`
          flex ${previewUrl ? "" : "h-[200px]"}  w-full  rounded-2xl cursor-pointer
          border-dashed border-4 border-coolGray-600 mb-2
        `}
        style={{
          backgroundImage: 'url("/icons/upload.png")',
          backgroundRepeat: "no-repeat",
          backgroundSize: 100,
          backgroundPosition: "center"
        }}
        onDragOver={handleDragOver}
        onDrop={handleOnDrop}
        onClick={() => fileInput.current.click()}
      >
        <p className="m-auto p-3 center text-coolGray-500 text-center text-lg font-medium">
          { !previewUrl &&
            <>
              Click to Upload or
              <br/>
              Drag and drop image here...
            </>
          }
          {previewUrl &&
            <>
              Select different image?
            </>
          }
        </p>
        <input
          type="file"
          accept='image/*'
          ref={fileInput} hidden
          onChange={e => handleFile(e.target.files[0])}
        />
      </div>
      {previewUrl &&
        <ReactImageProcess
          mode="waterMark"
          waterMarkType="image"
          waterMark={`/synpfpborder.png`}
          width={imgWidth}
          height={imgHeight}
          opacity={1}
          coordinate={[0, 0]}

        >
          <img
            ref={imgRef}
            src={previewUrl}
            alt='image'
            className="rounded-2xl mb-2 m-auto"
            onLoad={_.debounce((e) => {
              const imgTarget = e.target

              if (imgTarget.naturalHeight != imgHeight) {
                setImgHeight(imgTarget.naturalHeight)
              }

              if (imgTarget.naturalWidth != imgWidth) {
                setImgWidth(imgTarget.naturalWidth)
              }

            }, 420)}
          />
        </ReactImageProcess>
      }
      {previewUrl &&
        <Button
          fancy={true}
          type='button'
          className={'w-full rounded-xl my-2 px-4 py-3 tracking-wide text-white disabled:bg-gray-300'}
          onClick={ () => {
            downloadBase64File(imgRef.current.src, `synape_${image.name?.split(".")[0] ?? 'random'}`)
          }}
        >
          Download
        </Button>
      }
    </div>
  )
}


function downloadBase64File(dataStr, fileName) {//(contentType, base64Data, fileName) {
  // const linkSource = `data:${contentType};base64,${base64Data}`;
  const downloadLink = document.createElement("a")
  downloadLink.href = dataStr
  downloadLink.download = fileName
  downloadLink.click()
  console.log("evolving into a synape")
}