const multer = require('multer')

//set storage
let storage = multer.diskStorage({
    //save images to uploads folder
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    //renames images
    filename: function(req, file, cb) {
        //returns extension of file (for example ext = jpg)
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'))
        //sets the file name to name_currentDate.extension
        cb(null, file.fieldname + '-' + Date.now() + ext)
    }
})

module.exports = store = multer({ storage : storage })
