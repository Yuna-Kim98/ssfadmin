import React, { useRef, useState } from 'react';
import ImageUpload from '../commons/ImageUpload';

export default function RegiProduct() {
    const [fileNames, setFileNames] = useState({});
    const [preview, setPreview] = useState([]);
    let [formData, setFormData] = useState({});
    // const pnameRef = useRef(null);
    // const refs = {
    //     categoryRef: useRef("default"),
    //     subCategoryRef: useRef(null),
    //     pnameRef: useRef(null),
    //     colorRef: useRef(null),
    //     priceRef: useRef(null)
    // }
    const categoryRef = useRef("default");
    const subCategoryRef = useRef(null);
    const pnameRef = useRef(null);
    const colorRef = useRef(null);
    const priceRef = useRef(null);

    const getFileName = (fileNames) => {
        setFileNames(fileNames);
        setPreview(fileNames.uploadFileName);
    }

    console.log("previewList --> ", preview);

    // // 등록하기 버튼 클릭 이벤트
    const handleSubmit = (e) => {
        e.preventDefault();
        if (categoryRef.current.value === "default") {
            alert('대분류를 선택해주세요.');
            categoryRef.current.focus();
        } else if (subCategoryRef.current.value === "") {
            alert('소분류를 입력해주세요.');
            subCategoryRef.current.focus();
        } else if (pnameRef.current.value === "") {
            alert('상품명을 입력해주세요.');
            pnameRef.current.focus();
        } else if (colorRef.current.value === "") {
            alert("색상을 입력해주세요.");
            colorRef.current.focus();
        } else if (priceRef.current.value === "") {
            alert('가격을 입력해주세요.');
            priceRef.current.focus();
        } else {
            formData = {
                ...formData,
                "category": categoryRef.current.value,
                "sub_category": subCategoryRef.current.value,
                "name": pnameRef.current.value,
                "color": colorRef.current.value,
                "original_price": priceRef.current.value,
                "uploadFile": fileNames.uploadFileName, 
                "sourceFile": fileNames.sourceFileName
            };
            // console.log('formData --> ', formData);
            // formData 서버 전송
        }
    }


    return (
        <div className='adminRegiProduct-container'>
            <h3>상품 등록 폼</h3>
            <form onSubmit={handleSubmit}>
                <ul className='adminRegiProduct-form'>
                    <li>
                        <label>대분류</label>
                        <select name="" id="" ref={categoryRef}>
                            <option value="default">선택</option>
                            <option value="top">상의</option>
                            <option value="bottom">하의</option>
                            <option value="outer">아우터</option>
                            <option value="shoes">신발</option>
                        </select>
                    </li>
                    <li>
                        <label>소분류</label>
                        <input type="text" ref={subCategoryRef} />
                    </li>
                    <li>
                        <label>상품명</label>
                        <input type="text" ref={pnameRef} />
                    </li>
                    <li>
                        <label>색상</label>
                        <input type="text" ref={colorRef} />
                    </li>
                    <li>
                        <label>가격</label>
                        <input type="text" ref={priceRef} />
                    </li>
                    <li>
                        <label>사진 업로드</label>
                        <ImageUpload getFileName={getFileName} />
                        {/* { preview && preview.map((image) =>
                            <img src="" alt="preview" />
                        ) } */}
                    </li>
                </ul>
                <div className='regiSubmin-btn'>
                    <button type='submit'>등록하기</button>
                </div>
            </form>
        </div>
    );
}