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

const peopleUrl = "https://swapi.co/api/people/1";

const App = () => {
    return (
        <>
            <Container>
                <Router>
                    <NavBar />
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={(props) => <HomePage {...props} />}
                        />
                        <Route
                            exact
                            path="/character"
                            render={(props) => (
                                <CharacterPage {...props} url={peopleUrl} />
                            )}
                        />
                        <Route
                            exact
                            path="/film"
                            render={(props) => <FilmPage {...props} />}
                        />
                        <Route
                            exact
                            path="/planet"
                            render={(props) => <PlanetPage {...props} />}
                        />
                        <Redirect to="/" />
                    </Switch>
                </Router>
            </Container>
        </>
    );
};

export default App;
