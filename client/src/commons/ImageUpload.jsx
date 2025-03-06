import axios from 'axios';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

export default function ImageUpload({getFileName}) {
    const [oldFile, setOldFile] = useState([]);

    const handleFileUploadMultiple = (e) => {
        const formData = new FormData();
        const files = e.target.files;

        for (const file of files) formData.append("files", file);
        formData.append("oldFile", oldFile);

        axios.post(`http://localhost:9000/upload/multiple?maxFiles=${files.length}`, formData, {
            headers : { "Content-Type": "multipart/form-data" },
        })
            .then(res => {
                getFileName(res.data); // 호출한 부모 컴포넌트로 전송
                setOldFile(res.data.oldFile);
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <Form.Control
                type='file'
                onChange={(e) => handleFileUploadMultiple(e)}
                multiple />
        </div>
    );
}