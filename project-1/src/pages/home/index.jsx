/* Import 3rd Party Library */
import React from "react";
import { Container, Header, Image, Segment } from "semantic-ui-react";

/* Import 3rd Party CSS */
import "semantic-ui-css/semantic.min.css";

/* CSS */
import "./index.css";

const HomePage = () => {
    return (
        <>
            <Container>
                <Segment className="center-overlay semi-black-transparent" inverted>
                    <Image src={require("./swapi.png")} alt="swapi-logo" centered />
                </Segment>
                <Image src={require("./home_background.jpg")} alt="star-wars-background" fluid />
            </Container>
            <Segment className="no-margin sharp-border semi-black-transparent" textAlign="center" inverted>
                <Header as="h4" inverted color="yellow">
                    Star Wars is awesome. <br />
                    So, for this project, <br />
                    we're going to build a website that can search and query an external API, <br />
                    and then display that data on our own site. <br />
                    Each of these "pages" will display all of the characters/films/planets obtained from from the API, <br />
                    depending on which menu item was selected. <br />
                    The Star Wars API (SWAPI) is a REST API that returns data based upon the requests sent to it.
                </Header>
            </Segment>
        </>
    );
};

export default HomePage;
