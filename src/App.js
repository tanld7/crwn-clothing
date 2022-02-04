import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import './App.css';

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shoppage/shoppage.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import { auth, createUserProfileDocument } from './firebase/firebase.utils'


class App extends React.Component {

    constructor() {
        super();
        this.state = {
            currentUser: null,
        }
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                // Subscribe to any changes in that data.
                userRef.onSnapshot(snapShot => {
                    this.setState({
                        currentUser: {
                            id: snapShot.id,
                            ...snapShot.data()
                        }
                    });
                })
            }
            this.setState({currentUser: userAuth})
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>

                <BrowserRouter>
                    <Header currentUser={this.state.currentUser}/>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/shop' component={ShopPage} />
                    <Route path='/signin' component={SignInAndSignUpPage}/>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
