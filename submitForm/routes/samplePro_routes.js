const router = require("express").Router();
const fileUpload = require("../middlewares/upload")
const sampleController = require("../controllers/sampro_controller")


router.post('/create',fileUpload.single('image'),sampleController.createOrUpdate);
router.get('/:samProId',sampleController.getById);
router.get('/get/getdata',sampleController.getAll);
router.delete('/:samProId',sampleController.delete);

module.exports = router;

