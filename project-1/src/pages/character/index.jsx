/* Import 3rd Party Library */
import React from "react";
import { Button, Card, Dimmer, Grid, Header, Icon, List, Loader, Modal, Segment } from "semantic-ui-react";

/* Import Components */
import SearchBar from "../../components/SearchBar/SearchBar";

/* Import 3rd Party CSS */
import "semantic-ui-css/semantic.min.css";

/* CSS */
import "./index.css";

const BasicCard = (props) => {
    return (
        <>
            <Card.Group stackable itemsPerRow={3}>
                {props.characterApiData.flat().map((characterApi, index) => (
                    <Card key={index} color="teal" raised>
                        <Card.Content>
                            <Card.Header>{characterApi.name}</Card.Header>
                            <Card.Meta>{characterApi.url}</Card.Meta>
                            <Card.Description>
                                <List>
                                    <List.Item>
                                        <strong>Birth Year: </strong>
                                        {characterApi.birth_year}
                                    </List.Item>

                                    <List.Item>
                                        <strong>Gender: </strong>
                                        {characterApi.gender}
                                    </List.Item>

                                    <List.Item>
                                        <strong>Mass: </strong>
                                        {characterApi.mass}
                                    </List.Item>
                                </List>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <DetailCard characterApi={characterApi} planetApiData={props.planetApiData} filmApiData={props.filmApiData} />
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </>
    );
};

const DetailCard = (props) => {
    const attributes = ["height", "mass", "hair_color", "skin_color", "eye_color", "birth_year", "gender"];
    const capitalizeWords = (word) => {
        word = word.replace("_", " ");
        return word.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    return (
        <>
            <Modal trigger={<Button floated="right" circular icon="info" />}>
                <Modal.Header>{props.characterApi.name}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Grid stackable columns={2}>
                            <Grid.Column>
                                {attributes.map((attribute, index) => (
                                    <p key={index}>
                                        <strong>{capitalizeWords(attribute)}: </strong>
                                        {props.characterApi[attribute]}
                                    </p>
                                ))}
                            </Grid.Column>

                            <Grid.Column>
                                <p>
                                    <strong>Homeworld: </strong>
                                    {props.planetApiData.flat().map((planetApi) => planetApi.url === props.characterApi.homeworld && planetApi.name)}
                                </p>
                                <List>
                                    <List.Item>
                                        <strong>Films: </strong>
                                        <List.List>
                                            {props.characterApi.films.map((film, index) => (
                                                <List.Item key={index}>
                                                    {props.filmApiData.flat().map((filmApi) => filmApi.url === film && filmApi.title)}
                                                </List.Item>
                                            ))}
                                        </List.List>
                                    </List.Item>
                                </List>
                            </Grid.Column>
                        </Grid>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        </>
    );
};

const CharacterPage = (props) => {
    return (
        <>
            <SearchBar title="Character" isLoading={props.isLoading} searchTerm={props.searchTerm} searchFunction={props.searchFunction} />

            <Segment inverted color="yellow" textAlign="center" className={props.isError === true ? null : "hidden"}>
                <Header as="h2">
                    <Header.Content>
                        <Icon name="warning sign" />
                        Error: API Failed...
                    </Header.Content>
                </Header>
            </Segment>

            <Segment
                inverted
                color="yellow"
                textAlign="center"
                className={props.characterApiData.flat().length === 0 && props.isLoading === false ? null : "hidden"}
            >
                <Header as="h2">
                    <Header.Content>
                        <Icon name="warning circle" />
                        No Result...
                    </Header.Content>
                </Header>
            </Segment>

            <Segment placeholder className="transparent">
                <Dimmer className={props.isLoading === true ? "active" : "disabled"}>
                    <Loader>Waiting for API...</Loader>
                </Dimmer>

                <BasicCard characterApiData={props.characterApiData} planetApiData={props.planetApiData} filmApiData={props.filmApiData} />
            </Segment>
        </>
    );
};

export default CharacterPage;
