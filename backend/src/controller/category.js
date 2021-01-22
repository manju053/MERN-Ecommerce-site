const Category = require('../models/category');
const slugify = require('slugify');

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
            children: createCategories(categories, cat._id.toString())
        })
    }

    return categoryList;
}
exports.addCategory = (req, res) => {

   
    const categoryObject = {
        name: req.body.name,
        slug: slugify(req.body.name)
    };

    if(req.file) {
        
        categoryObject.categoryImage = process.env.API + '/public/' + req.file.filename;
    }


    if(req.body.parentId) {
        categoryObject.parentId = req.body.parentId;
    }

    const cat = new Category(categoryObject);
    cat.save((error, category) => {
        if(error) return res.status(400).json({error})
        if(category) {
            return res.status(200).json({ category })
        }
    })
}

exports.getCategories = (req, res) => {
    Category.find({})
    .exec((error, categories) => {
        if(error) return res.status(400).json({error})

        if(categories) {
            
            const categoryList = createCategories(categories);
            res.status(200).json({categoryList})
        }
    })
}