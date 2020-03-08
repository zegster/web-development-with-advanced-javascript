/* Import 3rd Party Library */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Responsive, Segment, Sidebar } from "semantic-ui-react";

/* Import 3rd Party CSS */
import "semantic-ui-css/semantic.min.css";

/* CSS */
import "./NavBar.css";

const pages = ["home", "character", "film", "planet"];

const DesktopNavBar = (props) => {
    return (
        <>
            <Responsive {...Responsive.onlyComputer}>
                <Menu className="sharp-border" inverted borderless>
                    {pages.map((page) => (
                        <Menu.Item
                            className="sharp-border"
                            key={page}
                            as={Link}
                            to={page}
                            icon={page === pages[0] ? page : null}
                            name={page === pages[0] ? null : page}
                            active={props.activeItem === page}
                            onClick={() => props.setActiveItem(page)}
                        />
                    ))}
                </Menu>
            </Responsive>
        </>
    );
};

const MobileNavBar = (props) => {
    const [visibleSideBar, setVisibleSideBar] = useState(false);

    return (
        <>
            <Responsive {...Responsive.onlyMobile}>
                <Segment className="sharp-border" inverted>
                    <Menu secondary inverted borderless icon>
                        <Menu.Item icon="bars" onClick={() => setVisibleSideBar(true)} />
                    </Menu>
                </Segment>

                <Sidebar
                    className="no-shadow"
                    as={Menu}
                    animation="overlay"
                    icon="labeled"
                    inverted
                    onHide={() => setVisibleSideBar(false)}
                    vertical
                    visible={visibleSideBar}
                    width="thin"
                >
                    {pages.map((page) => (
                        <Menu.Item
                            className="sharp-border"
                            key={page}
                            as={Link}
                            to={page}
                            name={page}
                            active={props.activeItem === page}
                            onClick={() => props.setActiveItem(page)}
                        />
                    ))}
                </Sidebar>
            </Responsive>
        </>
    );
};

const ResponsiveNavBar = () => {
    const [activeItem, setActiveItem] = useState("home");
    return (
        <>
            <DesktopNavBar activeItem={activeItem} setActiveItem={setActiveItem} />
            <MobileNavBar activeItem={activeItem} setActiveItem={setActiveItem} />
        </>
    );
};

export default ResponsiveNavBar;
