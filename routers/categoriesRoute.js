const express = require("express")
const {postCategory,getAllCategories,getOneCategory,updateCategory,deleteCategory} = require("../services/categoryService")
const {postCategoryValidator} = require("../util/validators/categoryValidator")
const subCategories = require("./subCategoryRoute")
const router = express.Router()

router.route("/").post(postCategoryValidator,postCategory).get(getAllCategories)
router.route("/:id").get(getOneCategory).put(updateCategory).delete(deleteCategory)
router.use("/:categoryId/subCategories", subCategories)
module.exports = router