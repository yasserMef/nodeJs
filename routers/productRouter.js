const express = require("express")
const {postProductService ,getProductsService,getOneProductServive,updateProductServive,deleteProductService} = require("../services/productService")
const {postProductValidator} = require("../util/validators/productValidator")
const router = express.Router()

router.route("/").post(postProductValidator,postProductService).get(getProductsService)
router.route("/:id").get(getOneProductServive).put(updateProductServive).delete(deleteProductService)

module.exports = router