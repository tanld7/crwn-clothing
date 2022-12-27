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
    const {title, items} = collection;

    return (
        <div className='collection-page'>
            <h2 className='title'>{title}</h2>
            <div className='items'>
                {items.map(item => (
                  <CollectionItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}

export default CollectionPage;