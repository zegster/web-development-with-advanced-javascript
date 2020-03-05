import React from "react";
import { Card, Dimmer, Header, Icon, Input, List, Loader, Menu, Segment } from "semantic-ui-react";

/* Import 3rd Party CSS */
import "semantic-ui-css/semantic.min.css";

/* CSS */
import "./index.css";

const Search = (props) => {
    console.log(props.target.value);
};

const CharacterCard = (props) => {
    return (
        <>
            <Card.Group stackable itemsPerRow={3}>
                {props.characterApiData.flat().map((characterApi, index) => (
                    <Card key={index} color="teal">
                        <Card.Content>
                            <Card.Header>{characterApi.name}</Card.Header>
                            <Card.Meta>{characterApi.url}</Card.Meta>
                            <Card.Description>
                                <List>
                                    <List.Item>
                                        <strong>Gender: </strong>
                                        {characterApi.gender}
                                    </List.Item>

                                    <List.Item>
                                        <strong>Birth Year: </strong>
                                        {characterApi.birth_year}
                                    </List.Item>

                                    <List.Item>
                                        <strong>Height: </strong>
                                        {characterApi.height}
                                    </List.Item>

                                    <List.Item>
                                        <strong>Homeworld: </strong>
                                        {props.planetApiData.flat().map((planetApi) => planetApi.url === characterApi.homeworld && planetApi.name)}
                                    </List.Item>

                                    <List.Item>
                                        <strong>Films:</strong>
                                        <List.List>
                                            {characterApi.films.map((film, index) => (
                                                <List.Item key={index}>
                                                    {props.filmApiData.flat().map((filmApi) => filmApi.url === film && filmApi.title)}
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
                        <Input icon="search" placeholder="Search..." onChange={Search} />
                    </Menu.Item>
                </Menu.Menu>
            </Menu>

            <Segment inverted color="yellow" textAlign="center" className={props.isError === true ? null : "hidden"}>
                <Header as="h2">
                    <Header.Content>
                        <Icon name="warning sign" />
                        Error: API call failed!
                    </Header.Content>
                </Header>
            </Segment>

            <Segment placeholder className="transparent">
                <Dimmer className={props.isLoading === true ? "active" : "disabled"}>
                    <Loader>Loading</Loader>
                </Dimmer>

                <CharacterCard characterApiData={props.characterApiData} planetApiData={props.planetApiData} filmApiData={props.filmApiData} />
            </Segment>
        </>
    );
};

export default CharacterPage;
