/* Import 3rd Party Library */
import React from "react";
import { Container } from "semantic-ui-react";
import {
    BrowserRouter as Router,
    Route, //render some UI when its path matches the current URL
    Switch, //switch between routes
    Redirect //navigate to a new location
} from "react-router-dom";

/* Import Components */
import NavBar from "./components/Toolbar/NavBar";
import HomePage from "./pages/home";
import CharacterPage from "./pages/character";
import FilmPage from "./pages/film";
import PlanetPage from "./pages/planet";

/* Import 3rd Party CSS */
import "semantic-ui-css/semantic.min.css";

/* CSS */
import "./App.css";

const App = () => {
    return (
        <>
            <Container>
                <Router>
                    <NavBar />
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route
                            exact
                            path="/character"
                            component={CharacterPage}
                        />
                        <Route exact path="/film" component={FilmPage} />
                        <Route exact path="/planet" component={PlanetPage} />
                        <Redirect to="/" />
                    </Switch>
                </Router>
            </Container>
        </>
    );
};

export default App;
