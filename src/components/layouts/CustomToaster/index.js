import toast, { Toaster, ToastBar } from 'react-hot-toast'
import ToastContent from './ToastContent'





export default function CustomToaster() {
  return (
    <Toaster
      position="bottom-right" // top-right
      containerClassName="pt-8"
      toastOptions={{
        // Define default options
        style: {
          background: "transparent",
          padding: '0px',
        },
        className: `
            shadow dark:shadow-indigo
            bg-white dark:bg-coolGray-800
            text-coolGray-800 dark:text-coolGray-400
          `,
        duration: 5000,
      }}
    >
      {toastData =>
        <ToastBar
          toast={toastData}
          style={{}}
        >
          {props =>
            <ToastContent toastData={toastData} {...props}/>
          }
        </ToastBar>
      }
    </Toaster>
  )
}


