import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import './App.css';

// Pages
import Header from "./components/header/header.component";
import HomePage from './pages/homepage/homepage.component'
import ShopPage from "./pages/shop/shoppage.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import {setCurrentUser} from "./redux/user/user.actions";
import {selectCurrentUser} from "./redux/user/user.selectors";
import CollectionsOverview from "./components/collections-overview/collections-overview.component";
import CollectionPage from "./pages/collection/collection.component";


class App extends React.Component {
    unsubscribeFromAuth = null;

    componentDidMount() {
        const {setCurrentUser} = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            // We check if a user actually signed in, by the userAuth object that firebase authentication sends back.
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth)

                // We subscribe (meaning we're going to listen) to any changes of this userRef;
                // And we also get back the first state of that data in snapShot object,
                // using that we will set the state of local App.js.
                userRef.onSnapshot(snapShot => {
                    setCurrentUser({
                            id: snapShot.id,
                            ...snapShot.data()
                        })
                })
            } else {
                // If the user ever logs out, we set the state of local App.js to null (userAuth in this case is null)
                setCurrentUser(userAuth);
            }
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header />
                <Routes>
                    <Route exact path='/' element={<HomePage/>} />
                    <Route path='/shop' element={<ShopPage/>}>
                        <Route index element={<CollectionsOverview />} />
                        <Route path=":collectionId" element={<CollectionPage/>}/>
                    </Route>
                    <Route exact path='/checkout' element={<CheckoutPage/>} />
                    <Route
                        exact
                        path='/signin'
                        element={this.props.currentUser
                            ? (<Navigate to='/' />)
                            : (<SignInAndSignUpPage/>)
                        }
                    />
              </Routes>
            </div>
      );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
})

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
