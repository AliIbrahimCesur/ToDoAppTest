import React, { useState } from 'react';
import './FileUploader.css'
const FileUploader = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) {
            setErrorMessage('Please select a file.');
            return;
        }
        if (file.size > 1024 * 1024) { // Örnek boyut sınırı: 1MB
            setErrorMessage('File size exceeds limit (1MB).');
            return;
        }
        setSelectedFile(file);
        setErrorMessage('');
    };

    const handleUpload = () => {
        if (!selectedFile) {
            setErrorMessage('Please select a file to upload.');
            return;
        }
        // Burada dosya yükleme işlemleri yapılabilir
        console.log('Uploading file:', selectedFile);
        // Örneğin, dosyayı bir API'ye POST isteğiyle gönderebilirsiniz.
    };

    return (
        <div className='uploader'>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default FileUploader;
