const Category = require('../../models/category');
const Product = require('../../models/product');


function createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if(parentId === null) {
        category = categories.filter(cat => cat.parentId === undefined)
    } else {
        category = categories.filter(cat => cat.parentId === parentId);
    }

    for(let cat of category) {
    console.log('categories', categories);

        categoryList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            parentId: cat.parentId,
            children: createCategories(categories, cat._id.toString())
        })
    }

    return categoryList;
}


exports.initialData = async (req, res) => {

    const categories = await Category.find({}).exec();
    const products = await Product.find({}).select('_id name slug description productPictures price quantity category')
        .populate('category').exec();

    res.status(200).json({
        categories: createCategories(categories),
        products
    })
}