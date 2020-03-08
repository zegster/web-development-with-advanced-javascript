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
                {props.filmApiData.flat().map((filmApi, index) => (
                    <Card key={index} color="teal" raised>
                        <Card.Content>
                            <Card.Header>{filmApi.title}</Card.Header>
                            <Card.Meta>{filmApi.url}</Card.Meta>
                            <Card.Description>
                                <List>
                                    <List.Item>
                                        <strong>Episode ID: </strong>
                                        {filmApi.episode_id}
                                    </List.Item>

                                    <List.Item>
                                        <strong>Release Date: </strong>
                                        {filmApi.release_date}
                                    </List.Item>
                                </List>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <DetailCard filmApi={filmApi} characterApiData={props.characterApiData} planetApiData={props.planetApiData} />
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </>
    );
};

const DetailCard = (props) => {
    const attributes = ["episode_id", "director", "producer", "release_date", "opening_crawl"];
    const capitalizeWords = (word) => {
        word = word.replace("_", " ");
        return word.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    return (
        <>
            <Modal trigger={<Button floated="right" circular icon="info" />}>
                <Modal.Header>{props.filmApi.title}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Grid stackable columns={3}>
                            <Grid.Column>
                                {attributes.map((attribute, index) => (
                                    <p key={index}>
                                        <strong>{capitalizeWords(attribute)}: </strong>
                                        {props.filmApi[attribute]}
                                    </p>
                                ))}
                            </Grid.Column>

                            <Grid.Column>
                                <List>
                                    <List.Item>
                                        <strong>Characters: </strong>
                                        <List.List>
                                            {props.filmApi.characters.map((character, index) => (
                                                <List.Item key={index}>
                                                    {props.characterApiData
                                                        .flat()
                                                        .map((characterApi) => characterApi.url === character && characterApi.name)}
                                                </List.Item>
                                            ))}
                                        </List.List>
                                    </List.Item>
                                </List>
                            </Grid.Column>

                            <Grid.Column>
                                <List>
                                    <List.Item>
                                        <strong>Planets: </strong>
                                        <List.List>
                                            {props.filmApi.planets.map((planet, index) => (
                                                <List.Item key={index}>
                                                    {props.planetApiData.flat().map((planetApi) => planetApi.url === planet && planetApi.name)}
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

const FilmPage = (props) => {
    return (
        <>
            <SearchBar title="Film" isLoading={props.isLoading} searchFunction={props.searchFunction} />

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
                className={props.filmApiData.flat().length === 0 && props.isLoading === false ? null : "hidden"}
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

export default FilmPage;
