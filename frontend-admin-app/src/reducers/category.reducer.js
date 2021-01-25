import { categoryConstants } from "../actions/constants"

const initialState = {
    loading: false,
    categories: [],
    error: ''
}

const buildNewCategories = (id, categories, category) => {

    let myCategories = [];

    if(!id) {
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children: []
            }
        ]
    }
    for(let cat of categories) {

        if(cat._id == id) {
            myCategories.push({
                ...cat,
                children: cat.children  ? buildNewCategories(id, [...cat.children, {
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children
                }], category) : []
            })
        } else {
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(id, cat.children, category) : []
            })
        }
       
    }

    return myCategories;
}

export default (state=initialState, action) => {
    switch(action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            };
            break;

        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            };
            break;
        
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:

            state = {
                ...state,
                categories: buildNewCategories(action.payload.category.parentId, state.categories, action.payload.category),
                loading: false
            };
            break;
        
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            state = {
                ...initialState
            }

            break;
    }

    return state;
}