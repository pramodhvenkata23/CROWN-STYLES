import React from 'react';
import  HomePage  from './pages/homepage/homepage.component';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect'

import {selectcurrentUser} from './redux/user/user.selector'
import ShopPage from './pages/shoppage/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up-pages/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.action'

import './App.css'

class App extends React.Component {

  unSubscribeFromAuth = null

  componentDidMount(){

    const {setCurrentUser} = this.props

    this.unSubscribeFromAuth = auth.onAuthStateChanged( async userAuth =>{
      // this.setState({currentUser:user})
      
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot =>{
         setCurrentUser({
              id:snapShot.id,
              ...snapShot.data()
            })
          
        })
        
      }
      setCurrentUser(userAuth);
    })
  }

  componentWillUnmount(){
    this.unSubscribeFromAuth();
  }


  render(){
    return (
      
      <div className='App' >
  
        <Header />
        <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route  path="/shop" component={ShopPage}/>
        <Route exact path="/checkout" component={CheckoutPage}/>
        <Route 
        exact path="/signin" 
        render={() => this.props.currentUser ? 
          (<Redirect to='/' />) : (<SignInAndSignUpPage/>)}/>
        </Switch>
      </div>
    );
  }
 
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectcurrentUser
})

const mapDispatchToProps = dispatch =>({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,
  mapDispatchToProps)(App);
