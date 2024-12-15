import React, { useState, useRef } from "react";

const UploadImage = ({ file, setFile }) => {
  const fileInputRef = useRef(null); // Create a reference for the file input

  function handleChange(e) {
    console.log(e.target.files);

    setFile(URL.createObjectURL(e.target.files[0]));
  }

  function handleRemove() {
    setFile(null); // Clear the image URL
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input
    }
  }

  return (
    <div className="App">
      <h2>Add Image:</h2>
      <input type="file" onChange={handleChange} ref={fileInputRef} />
      <button onClick={handleRemove} style={{ marginTop: "10px" }}>
        Remove Image
      </button>
      {file && (
        <div>
          <img
            src={file}
            alt="Uploaded Preview"
            style={{ maxWidth: "200px", marginTop: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
