import logo from './logo.svg';
import Header from "./Header";
import Top from "./views/Top";
import SignIn from "./views/SignIn";
import Registration from "./views/Registration";
import Certificates from "./views/Certificates";
import Certificate from "./views/Certificate";
import NewCert from "./views/NewCert";
import './App.css';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <NewCert />
    </div>
  );
}

export default App;
