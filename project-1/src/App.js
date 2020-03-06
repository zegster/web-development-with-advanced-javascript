/* Import 3rd Party Library */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import NodeCache from "node-cache";
import { Container } from "semantic-ui-react";

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

const appCache = new NodeCache();
const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [characters, setCharacters] = useState(appCache.get("characters") || []);
    const [films, setFilms] = useState([]);
    const [planets, setPlanets] = useState([]);

    const getCharacter = async () => {
        setIsLoading(true);
        let baseUrl = "https://swapi.co/api/people/";
        let jsonResult = [];

        do {
            try {
                const res = await axios.get(baseUrl);
                baseUrl = res.data.next;
                jsonResult.push(res.data.results);
            } catch (err) {
                setIsLoading(false);
                setIsError(true);
            }
        } while (baseUrl);

        setCharacters(jsonResult);
        setIsLoading(false);
        appCache.set("characters", jsonResult);
    };

    const getFilm = async () => {
        setIsLoading(true);
        let baseUrl = "https://swapi.co/api/films/";
        let jsonResult = [];

        do {
            try {
                const res = await axios.get(baseUrl);

                baseUrl = res.data.next;
                jsonResult.push(res.data.results);
            } catch (err) {
                setIsLoading(false);
                setIsError(true);
            }
        } while (baseUrl);

        setFilms(jsonResult);
        setIsLoading(false);
    };

    const getPlanet = async () => {
        setIsLoading(true);
        let baseUrl = "https://swapi.co/api/planets/";
        let jsonResult = [];

        do {
            try {
                const res = await axios.get(baseUrl);

                baseUrl = res.data.next;
                jsonResult.push(res.data.results);
            } catch (err) {
                setIsLoading(false);
                setIsError(true);
            }
        } while (baseUrl);

        setPlanets(jsonResult);
        setIsLoading(false);
    };

    useEffect(() => {
        if (appCache.get("characters") === undefined) {
            getCharacter();
        }

        if (films.length === 0) {
            getFilm();
        }

        if (planets.length === 0) {
            getPlanet();
        }
    });

    return (
        <>
            <Container>
                <Router>
                    <NavBar />
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={(props) => <HomePage {...props} apiData={characters} isLoading={isLoading} isError={isError} />}
                        />
                        <Route
                            exact
                            path="/character"
                            render={(props) => (
                                <CharacterPage
                                    {...props}
                                    characterApiData={characters}
                                    filmApiData={films}
                                    planetApiData={planets}
                                    isLoading={isLoading}
                                    isError={isError}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/film"
                            render={(props) => (
                                <FilmPage
                                    {...props}
                                    characterApiData={characters}
                                    filmApiData={films}
                                    planetApiData={planets}
                                    isLoading={isLoading}
                                    isError={isError}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/planet"
                            render={(props) => (
                                <PlanetPage
                                    {...props}
                                    characterApiData={characters}
                                    filmApiData={films}
                                    planetApiData={planets}
                                    isLoading={isLoading}
                                    isError={isError}
                                />
                            )}
                        />
                        <Redirect to="/" />
                    </Switch>
                </Router>
            </Container>
        </>
    );
};

export default App;
