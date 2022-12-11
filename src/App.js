import React from "react";
import { Routes, Route } from 'react-router-dom'

import './App.css';

import HomePage from './pages/homepage/homepage.component'
import ShopPage from "./pages/shop/shoppage.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
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
            // We check if a user actually signed in, by the userAuth object that firebase authentication sends back.
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth)

                // We subscribe (meaning we're going to listen) to any changes of this userRef;
                // And we also get back the first state of that data in snapShot object,
                // using that we will set the state of local App.js.
                userRef.onSnapshot(snapShot => {
                    this.setState({
                        currentUser: {
                            id: snapShot.id,
                            ...snapShot.data()
                        }
                    }, ()=>{
                        console.log(this.state)
                    })
                })
            } else {
                // If the user ever logs out, we set the state of local App.js to null (userAuth in this case is null)
                this.setState({currentUser: userAuth}, ()=>{
                    console.log(this.state)
                });
            }
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header currentUser={this.state.currentUser}/>
                <Routes>
                    <Route exact path='/' element={<HomePage/>} />
                    <Route path='/shop' element={<ShopPage/>} />
                    <Route path='/signin' element={<SignInAndSignUpPage/>} />
              </Routes>
            </div>
      );
    }
}

export default App;
