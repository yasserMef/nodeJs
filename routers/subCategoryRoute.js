const express = require("express")
const {postSubCategoryService,getAllSubCategoriesService,getOneSubCategory,updateSubCategory,deleteSubCategory,createFilterObject,setCategoryId} = require("../services/subCatergoryService")
const router = express.Router({mergeParams:true})

router.route("/").post(setCategoryId,postSubCategoryService).get(createFilterObject,getAllSubCategoriesService)
router.route("/:id").get(getOneSubCategory).put(updateSubCategory).delete(deleteSubCategory)

module.exports = router