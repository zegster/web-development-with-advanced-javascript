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

const Search = (props) => {
    console.log(props.target.value);
};

const DetailCharacterCard = (props) => {
    return (
        <>
            <Card.Group stackable itemsPerRow={props.item_number}>
                {props.item.flat().map((character, index) => (
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

const CharacterPage = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [characters, setCharacters] = useState([]);

    const getCharacter = async () => {
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
    };

    useEffect(() => {
        if (characters.length === 0) {
            getCharacter();
        }
    });

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
                        <Input
                            icon="search"
                            placeholder="Search..."
                            onChange={Search}
                        />
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

                {/* <button onclick={setboolean}>see more?</button>
                {getOptions()} */}

                {/* const getOptions = choice => {
                    switch (choice) {
                        case1: <div> hi</div>
                        case2: <> WHATEVER </>
                        case3:
                    }
                } */}

                <DetailCharacterCard item={characters} item_number={3} />
            </Segment>
        </>
    );
};

export default CharacterPage;
