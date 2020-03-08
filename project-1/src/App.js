/* Import 3rd Party Library */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import NodeCache from "node-cache";
import { Container } from "semantic-ui-react";

/* Import Components */
import NavBar from "./components/NavBar/NavBar";
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
    const [charactersClone, setCharactersClone] = useState([]);
    const [films, setFilms] = useState(appCache.get("films") || []);
    const [filmsClone, setFilmsClone] = useState([]);
    const [planets, setPlanets] = useState(appCache.get("planets") || []);
    const [planetsClone, setPlanetsClone] = useState([]);

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
        setCharactersClone(jsonResult);
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
        setFilmsClone(jsonResult);
        setIsLoading(false);
        appCache.set("films", jsonResult);
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
        setPlanetsClone(jsonResult);
        setIsLoading(false);
        appCache.set("planets", jsonResult);
    };

    const searchCharacter = (props) => {
        let findCharacter = charactersClone.flat().filter((character) => {
            const lowerCase = character.name.toLowerCase();
            return lowerCase.includes(props.target.value);
        });

        setCharacters(findCharacter);
        if (props.target.value === "") {
            setCharacters(charactersClone);
        }
    };

    const searchFilm = (props) => {
        let findFilm = filmsClone.flat().filter((film) => {
            const lowerCase = film.title.toLowerCase();
            return lowerCase.includes(props.target.value);
        });

        setFilms(findFilm);
        if (props.target.value === "") {
            setFilms(filmsClone);
        }
    };

    const searchPlanet = (props) => {
        let findPlanet = planetsClone.flat().filter((planet) => {
            const lowerCase = planet.name.toLowerCase();
            return lowerCase.includes(props.target.value);
        });

        setFilms(findPlanet);
        if (props.target.value === "") {
            setFilms(planetsClone);
        }
    };

    useEffect(() => {
        if (appCache.get("characters") === undefined) {
            getCharacter();
        }

        if (appCache.get("films") === undefined) {
            getFilm();
        }

        if (appCache.get("planets") === undefined) {
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
                                    searchFunction={searchCharacter}
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
                                    searchFunction={searchFilm}
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
                                    searchFunction={searchPlanet}
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
