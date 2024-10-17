import multer from 'multer'

const storage = multer.diskStorage({
    filename: function(req, file, callback){
        callback(null, file.originalname);
    }
})

const upload = multer({storage})

export default upload

// import multer from 'multer';
// import path from 'path';

// // Define allowed file types
// const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

// // Multer configuration
// const storage = multer.diskStorage({
//     destination: function(req, file, callback) {
//         callback(null, file.originalname); // Make sure this directory exists!
//     },
//     filename: function(req, file, callback) {
//         // Create unique filename
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         callback(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     }
// });

// // File filter function
// const fileFilter = (req, file, callback) => {
//     if (ALLOWED_FILE_TYPES.includes(file.mimetype)) {
//         callback(null, true);
//     } else {
//         callback(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false);
//     }
// };

// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter,
//     limits: {
//         fileSize: 5 * 1024 * 1024 // 5MB file size limit
//     }
// });

// export default upload;