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

    const [characters, setCharacters] = useState(appCache.get("peoples") || []);
    const [films, setFilms] = useState(appCache.get("films") || []);
    const [planets, setPlanets] = useState(appCache.get("planets") || []);

    const [charactersClone, setCharactersClone] = useState([]);
    const [filmsClone, setFilmsClone] = useState([]);
    const [planetsClone, setPlanetsClone] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const getApiData = async (subUrl, setData, setClone) => {
        let baseUrl = `https://swapi.co/api/${subUrl}`;
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

        setData(jsonResult);
        setClone(jsonResult);
        appCache.set(subUrl, jsonResult);
    };

    /* Searching Function: search all the "occurrence" words.
    It may sometime look like a false search, but it is not because not all attribute is displayed on the website but the data is still there. */
    const searchCharacter = (props) => {
        let findCharacter = charactersClone.flat().filter((character) => {
            let source, toSearch;
            for (const key in character) {
                source = typeof character[key] === "string" ? character[key].toLowerCase() : "";
                toSearch = props.target.value.toLowerCase();
                if (source.includes(toSearch)) {
                    break;
                }
            }
            return source.includes(toSearch);
        });

        setCharacters(findCharacter);
        if (props.target.value === "") {
            setCharacters(charactersClone);
        }
        setSearchTerm(props.target.value.toLowerCase());
    };

    const searchFilm = (props) => {
        let findFilm = filmsClone.flat().filter((film) => {
            let source, toSearch;
            for (const key in film) {
                source = typeof film[key] === "string" ? film[key].toLowerCase() : "";
                toSearch = props.target.value.toLowerCase();
                if (source.includes(toSearch)) {
                    break;
                }
            }
            return source.includes(toSearch);
        });

        setFilms(findFilm);
        if (props.target.value === "") {
            setFilms(filmsClone);
        }
        setSearchTerm(props.target.value.toLowerCase());
    };

    const searchPlanet = (props) => {
        let findPlanet = planetsClone.flat().filter((planet) => {
            let source, toSearch;
            for (const key in planet) {
                source = typeof planet[key] === "string" ? planet[key].toLowerCase() : "";
                toSearch = props.target.value.toLowerCase();
                if (source.includes(toSearch)) {
                    break;
                }
            }
            return source.includes(toSearch);
        });

        setPlanets(findPlanet);
        if (props.target.value === "") {
            setPlanets(planetsClone);
        }
        setSearchTerm(props.target.value.toLowerCase());
    };

    /* For Loading */
    useEffect(() => {
        if (characters.length !== 0 && films.length !== 0 && planets.length !== 0) {
            setIsLoading(false);
        }
    }, [characters, films, planets]);

    /* Getting Characters Data */
    useEffect(() => {
        if (appCache.get("people") === undefined) {
            getApiData("people", setCharacters, setCharactersClone);
        }
    }, []);

    /* Getting Films Data */
    useEffect(() => {
        if (appCache.get("films") === undefined) {
            getApiData("films", setFilms, setFilmsClone);
        }
    }, []);

    /* Getting Planets Data */
    useEffect(() => {
        if (appCache.get("planets") === undefined) {
            getApiData("planets", setPlanets, setPlanetsClone);
        }
    }, []);

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
                                    searchTerm={searchTerm}
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
                                    searchTerm={searchTerm}
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
                                    searchTerm={searchTerm}
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
