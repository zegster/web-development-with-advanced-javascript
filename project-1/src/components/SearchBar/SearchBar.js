/* Import 3rd Party Library */
import React from "react";
import { Dimmer, Header, Input, Loader, Menu } from "semantic-ui-react";

/* Import 3rd Party CSS */
import "semantic-ui-css/semantic.min.css";

/* CSS */
import "./SearchBar.css";

const SearchBar = (props) => (
    <>
        <Menu className="sharp-border no-margin" inverted color="violet" borderless stackable>
            <Menu.Item>
                <Header as="h1" inverted>
                    {props.title === undefined ? "Undefined" : props.title}
                </Header>
            </Menu.Item>

            <Menu.Menu position="right">
                <Menu.Item>
                    <Dimmer className={props.isLoading === true ? "active" : "disabled"}>
                        <Loader />
                    </Dimmer>
                    <Input icon="search" placeholder="Search..." value={props.searchTerm} onChange={props.searchFunction} />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    </>
);

export default SearchBar;
