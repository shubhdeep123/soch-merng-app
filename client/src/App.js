import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeSceen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MenuBar from "./components/MenuBar";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import "./App.css";

function App() {
  return (
    <Container>
      <Router>
        <MenuBar />
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />
      </Router>
    </Container>
  );
}

export default App;
