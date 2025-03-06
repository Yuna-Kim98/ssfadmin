import multer from 'multer';
import fs from 'fs';
import path from 'path';

/** 관리자 상품 등록**/
// multer 라이브러리로 파일을 업로드 폴더에 저장
const storage = multer.diskStorage({
    destination: function (req, file, cb) { // 저장 경로(파일) 지정
        cb(null, 'upload_files/')
    },
    filename: function (req, file, cb) {
        // cb(null, file.fieldname + '-' + Date.now()) // 파일명 설정
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '_' + file.originalname);
    }
})

export const fileUploadMultiple = (req, res) => {
    const maxFiles = parseInt(req.query.maxFiles);
    const upload = multer({ storage: storage }).array("files", maxFiles);

    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            const oldFileArray = req.body.oldFile.split(",");

            for (const oldFile of oldFileArray) {
                if (oldFile) {
                    const oldFilePath = path.join("upload_files/", oldFile);
                    console.log('이전 파일 삭제 완료 : ', oldFile);
                    if (fs.existsSync(oldFilePath)) {
                        try {
                            fs.unlinkSync(oldFilePath);
                        } catch (error) {
                            console.error("이전 파일 삭제 실패: ", error);
                        }
                    }
                } // if
            } // for

            let uploadFileName = [];
            let sourceFileName = [];
            let oldFile = [];

            for (const file of req.files) {
                uploadFileName.push(file.path);
                sourceFileName.push(file.originalname);
                oldFile.push(file.filename);
            }

            res.json({
                "uploadFileName": uploadFileName,
                "sourceFileName": sourceFileName,
                "oldFile": oldFile
            });
        }
    }); // upload(콜백함수)
}