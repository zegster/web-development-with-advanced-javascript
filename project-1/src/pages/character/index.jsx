import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Button,
    Card,
    Dimmer,
    Header,
    Icon,
    Input,
    List,
    Loader,
    Menu,
    Segment
} from "semantic-ui-react";

/* Import 3rd Party CSS */
import "semantic-ui-css/semantic.min.css";

/* CSS */
import "./index.css";

/* Reference
// const baseUrl = "https://jsonplaceholder.typicode.com/photos";
# https://www.youtube.com/watch?v=EC5ZvP87P2k&t=307s
# https://www.youtube.com/watch?v=SwDK0-heAn4
# https://www.youtube.com/watch?v=rDVe6pmeAjo
*/

const CharacterPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [characters, setCharacters] = useState([]);
    // const [homeworld, setHomeworld] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const baseUrl = `https://swapi.co/api/people/?format=json&page=${currentPage}`;

    const nextPage = () => {
        setIsLoading(true);
        setCurrentPage(currentPage + 1);
    };

    const previousPage = () => {
        setIsLoading(true);
        if (currentPage <= 1) setCurrentPage(1);
        else setCurrentPage(currentPage - 1);
    };

    useEffect(() => {
        const getCharacter = async () => {
            await axios
                .get(baseUrl)
                .then((res) => {
                    const c = res.data.results;
                    setCharacters(c);
                    setIsLoading(false);
                    console.log("From getCharacter!!!");
                    console.log(c.map((f) => f.films));
                })
                .catch((error) => {
                    setIsError(true);
                    console.log(error);
                });
        };

        const getHomeWorld = async () => {
            // console.log(characters.map((f) => f.films));
            // characters.map((f) => console.log({ f }));
            // await axios
            //     .get(baseUrl)
            //     .then((res) => {
            //         const homeworlds = res.data.results;
            //         setHomeworld(homeworlds);
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
        };

        getCharacter();
        //getHomeWorld();
    }, [baseUrl]);

    return (
        <>
            <Menu className="sharp-border" inverted borderless stackable>
                <Menu.Item>
                    <Header as="h1" inverted color="teal">
                        Character
                    </Header>
                </Menu.Item>

                <Menu.Menu position="right">
                    <Menu.Item>
                        <Input icon="search" placeholder="Search..." />
                    </Menu.Item>

                    <Menu.Item>
                        <Dimmer
                            className={
                                isLoading === true ? "active" : "disabled"
                            }
                        >
                            <Loader size="mini" />
                        </Dimmer>

                        <Button.Group widths="2">
                            <Button onClick={previousPage}>
                                <Icon name="arrow left" />
                            </Button>

                            <Button onClick={nextPage}>
                                <Icon name="arrow right" />
                            </Button>
                        </Button.Group>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>

            <Segment
                inverted
                color="yellow"
                textAlign="center"
                className={isError === true ? null : "hidden"}
            >
                <Header as="h2">
                    <Header.Content>
                        <Icon name="warning sign" />
                        Error: API Call is stalling!
                    </Header.Content>
                </Header>
            </Segment>

            <Segment placeholder className="transparent">
                <Dimmer className={isLoading === true ? "active" : "disabled"}>
                    <Loader>Loading</Loader>
                </Dimmer>

                <Card.Group stackable itemsPerRow={3}>
                    {characters.map((character, index) => (
                        <Card key={index} color="teal">
                            <Card.Content>
                                <Card.Header>{character.name}</Card.Header>
                                <Card.Meta>{character.url}</Card.Meta>
                                <Card.Description>
                                    <List>
                                        <List.Item>
                                            <strong>Gender: </strong>
                                            {character.gender}
                                        </List.Item>

                                        <List.Item>
                                            <strong>Birth Year: </strong>
                                            {character.birth_year}
                                        </List.Item>

                                        <List.Item>
                                            <strong>Height: </strong>
                                            {character.height}
                                        </List.Item>

                                        <List.Item>
                                            <strong>Homeworld: </strong>
                                            {character.homeworld}
                                        </List.Item>

                                        <List.Item>
                                            <strong>Films:</strong>

                                            <List.List>
                                                {character.films.map(
                                                    (f, index) => (
                                                        <List.Item key={index}>
                                                            {f}
                                                        </List.Item>
                                                    )
                                                )}
                                            </List.List>
                                        </List.Item>
                                    </List>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    ))}
                </Card.Group>
            </Segment>
        </>
    );
};

export default CharacterPage;
