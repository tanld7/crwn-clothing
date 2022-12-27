import {createSelector} from "reselect";
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key])
)

// Before using memoize, this selectCollection selector is not memoized due to the collectionUrlParam being passed
// in from the collection component. In this case collectionUrlParam is a dynamic argument meaning it can change, so
// to memoize selectCollection selector we have to memoize the whole function using a memoize helper function from
// lodash library.
export const selectCollection = memoize(collectionUrlParam => (
    createSelector(
        [selectCollections],
        collections => collections[collectionUrlParam]
    )
))