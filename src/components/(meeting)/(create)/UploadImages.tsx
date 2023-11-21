import React from 'react'

// Imports the Google Cloud client library
const { Storage } = require('@google-cloud/storage');

// Creates a client
const storage = new Storage({
  keyFilename: "../../../../moa-meetingplatform-27490853e5f6.json",
});



export default function UploadImages() {
  return (
    <div>
      <button>aaa</button>
    </div>
  )
}
