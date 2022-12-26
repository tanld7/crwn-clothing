import React from "react";
import {useSelector} from "react-redux";

import {useLocation, useParams} from "react-router-dom";

import CollectionItem from "../../components/collection-item/collection-item.component";

import {selectCollection} from "../../redux/shop/shop.selectors";

import './collection.styles.scss'

const CollectionPage = () => {
    const location = useLocation();
    const params = useParams();
    console.log('location:\n', location)
    console.log('params:\n', params)

    const collection = useSelector((state) => selectCollection(params.collectionId)(state))
    console.log(collection)

    return (
        <div className='category'>
            <h2>COLLECTION PAGE</h2>
            <h4>collectionId: {params.collectionId}</h4>
            <h4>collection name: {collection.title}</h4>
        </div>
    )
}

export default CollectionPage;