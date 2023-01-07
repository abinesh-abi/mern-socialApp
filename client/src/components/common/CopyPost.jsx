import React from 'react'
import Swal from 'sweetalert2'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Link } from 'react-router-dom'

function CopyPost({value}) {
    
    function copyAlert() {
        console.log('hi')
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Copied to the Clipboard',
            showConfirmButton: false,
            timer: 1000
        })
    }
  return (
    <Link className="dropdown-item">
        <CopyToClipboard text={value}
            onCopy={copyAlert}
            >
            <span>Copy Link</span>
        </CopyToClipboard>
    </Link>
  )
}

export default CopyPost