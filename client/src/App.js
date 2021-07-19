import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import HomeScreen from "./screens/HomeSceen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MenuBar from "./components/MenuBar";
import AuthRoute from "./utils/AuthRoute"
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={HomeScreen} />
          <AuthRoute exact path="/login" component={LoginScreen} />
          <AuthRoute exact path="/register" component={RegisterScreen} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
