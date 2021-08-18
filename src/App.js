import React from "react";
import logo from './logo.svg';
import Header from "./Header";
import Top from "./views/Top";
import SignIn from "./views/SignIn";
import Registration from "./views/Registration";
import Certificates from "./views/Certificates";
import Certificate from "./views/Certificate";
import NewCert from "./views/NewCert";
import './App.css';
import { Switch, Route } from "react-router-dom";

class App extends React.Component {
  constructor() {
    super(); 
  }
  render() {
    const that = this;
    return (
      <div className="App">
        <Header></Header>
        <Switch>
          <Route exact={true} path="/" component={Top} />
          <Route exact={true} path="/signup" component={SignIn} />
          <Route exact={true} path="/new" render={ () => <NewCert
              onChangeTitle={that.props.onChangeTitle}
              onChangeDescription={that.props.onChangeDescription}
              onChangeUrl={that.props.onChangeUrl}
              onChangeImage={that.props.onChangeImage}
              onChangeFrom={that.props.onChangeFrom}
              onChangeTo={that.props.onChangeTo}
              sign={that.props.sign}
            />
          } />
        </Switch>
      </div>
    );
  }
}

export default App;
