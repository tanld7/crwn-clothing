import React from "react";
import {Routes, Route, useLocation, useParams, Outlet} from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

// const routes = [{path: "/shops/:id"}]

const ShopPage = () => {
    // const location = useLocation();
    // const params = useParams();
    // console.log('location:\n', location)
    // console.log('params:\n', params)

    return (
        <div className='shop-page'>
            <Outlet />
        </div>
    )
}

export default ShopPage;