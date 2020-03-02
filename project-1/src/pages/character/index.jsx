import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Button,
    Card,
    Header,
    Icon,
    Input,
    List,
    Menu
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
    const [characters, setCharacters] = useState([]);
    const [homeworld, setHomeworld] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const baseUrl = `https://swapi.co/api/people/?format=json&page=${currentPage}`;

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
        console.log(currentPage);
    };

    const previousPage = () => {
        if (currentPage <= 1) setCurrentPage(1);
        else setCurrentPage(currentPage - 1);
        console.log(currentPage);
    };

    useEffect(() => {
        const getCharacter = async () => {
            await axios
                .get(baseUrl)
                .then((res) => {
                    const characters = res.data.results;
                    setCharacters(characters);

                    console.log(characters.map((f) => f.films));
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        const getHomeWorld = async () => {
            await axios
                .get(baseUrl)
                .then((res) => {
                    const homeworlds = res.data.results;
                    setHomeworld(homeworlds);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        getCharacter();
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
                        <Button.Group widths="2">
                            <Button animated onClick={previousPage}>
                                <Button.Content visible>
                                    Previous
                                </Button.Content>
                                <Button.Content hidden>
                                    <Icon name="arrow left" />
                                </Button.Content>
                            </Button>

                            <Button animated onClick={nextPage}>
                                <Button.Content visible>Next</Button.Content>
                                <Button.Content hidden>
                                    <Icon name="arrow right" />
                                </Button.Content>
                            </Button>
                        </Button.Group>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>

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
                                            {character.films.map((f, index) => (
                                                <List.Item key={index}>
                                                    {f}
                                                </List.Item>
                                            ))}
                                        </List.List>
                                    </List.Item>
                                </List>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </>
    );
};

export default CharacterPage;
