import React from "react";
import { Dimmer, Header, Input, Loader, Menu } from "semantic-ui-react";

/* Import 3rd Party CSS */
import "semantic-ui-css/semantic.min.css";

const SearchBar = (props) => (
    <>
        <Menu className="sharp-border" inverted borderless stackable>
            <Menu.Item>
                <Header as="h1" inverted color="teal">
                    {props.title === undefined ? "Undefined" : props.title}
                </Header>
            </Menu.Item>

            <Menu.Menu position="right">
                <Menu.Item>
                    <Dimmer className={props.isLoading === true ? "active" : "disabled"}>
                        <Loader />
                    </Dimmer>
                    <Input icon="search" placeholder="Search..." onChange={props.searchFunction} />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    </>
);

export default SearchBar;
