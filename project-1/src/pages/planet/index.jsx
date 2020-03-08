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
                {props.planetApiData.flat().map((planetApi, index) => (
                    <Card key={index} color="teal" raised>
                        <Card.Content>
                            <Card.Header>{planetApi.name}</Card.Header>
                            <Card.Meta>{planetApi.url}</Card.Meta>
                            <Card.Description>
                                <List>
                                    <List.Item>
                                        <strong>Terrain: </strong>
                                        {planetApi.terrain}
                                    </List.Item>

                                    <List.Item>
                                        <strong>Population: </strong>
                                        {planetApi.population}
                                    </List.Item>
                                </List>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <DetailCard planetApi={planetApi} characterApiData={props.characterApiData} filmApiData={props.filmApiData} />
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </>
    );
};

const DetailCard = (props) => {
    const attributes = ["rotation_period", "orbital_period", "diameter", "climate", "gravity", "terrain", "surface_water", "population"];
    const capitalizeWords = (word) => {
        word = word.replace("_", " ");
        return word.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    return (
        <>
            <Modal trigger={<Button floated="right" circular icon="info" />}>
                <Modal.Header>{props.planetApi.name}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Grid stackable columns={3}>
                            <Grid.Column>
                                {attributes.map((attribute, index) => (
                                    <p key={index}>
                                        <strong>{capitalizeWords(attribute)}: </strong>
                                        {props.planetApi[attribute]}
                                    </p>
                                ))}
                            </Grid.Column>

                            <Grid.Column>
                                <List>
                                    <List.Item>
                                        <strong>Residents: </strong>
                                        <List.List>
                                            {props.planetApi.residents.map((character, index) => (
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
                                        <strong>Films: </strong>
                                        <List.List>
                                            {props.planetApi.films.map((film, index) => (
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

const PlanetPage = (props) => {
    return (
        <>
            <SearchBar title="Planet" isLoading={props.isLoading} searchTerm={props.searchTerm} searchFunction={props.searchFunction} />

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
                className={props.planetApiData.flat().length === 0 && props.isLoading === false ? null : "hidden"}
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

export default PlanetPage;
