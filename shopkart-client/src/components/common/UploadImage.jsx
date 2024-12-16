import React, { useRef } from "react";

const UploadImage = ({ file, setFile }) => {
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]); // Set the selected file
  };

  const handleRemove = () => {
    setFile(null); // Clear the selected file
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input field
    }
  };

  return (
    <div className="App">
      <h2>Add Image:</h2>
      {/* Add name="image" here */}
      <input
        type="file"
        name="image" // This is the key that Multer expects
        onChange={handleChange}
        ref={fileInputRef}
      />
      <button onClick={handleRemove} style={{ marginTop: "10px" }}>
        Remove Image
      </button>
      {file && (
        <div>
          <img
            src={URL.createObjectURL(file)}
            alt="Uploaded Preview"
            style={{ maxWidth: "200px", marginTop: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
