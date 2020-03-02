/* Import 3rd Party Library */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input, Menu, Responsive, Segment, Sidebar } from "semantic-ui-react";

/* Import 3rd Party CSS */
import "semantic-ui-css/semantic.min.css";

/* CSS */
import "./NavBar.css";

const pages = ["home", "character", "film", "planet"];

const DesktopNavBar = () => {
    const [activeItem, setActiveItem] = useState("home");

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
                            active={activeItem === page}
                            onClick={() => setActiveItem(page)}
                        />
                    ))}
                </Menu>
            </Responsive>
        </>
    );
};

const MobileNavBar = () => {
    const [activeItem, setActiveItem] = useState("home");
    const [visibleSideBar, setVisibleSideBar] = useState(false);

    return (
        <>
            <Responsive {...Responsive.onlyMobile}>
                <Segment className="sharp-border" inverted>
                    <Menu secondary inverted borderless icon>
                        <Menu.Item
                            icon="bars"
                            onClick={() => setVisibleSideBar(true)}
                        />

                        <Menu.Menu position="right">
                            <Menu.Item>
                                <Input icon="search" placeholder="Search..." />
                            </Menu.Item>
                        </Menu.Menu>
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
                            active={activeItem === page}
                            onClick={() => setActiveItem(page)}
                        />
                    ))}
                </Sidebar>
            </Responsive>
        </>
    );
};

const ResponsiveNavBar = () => (
    <>
        <DesktopNavBar />
        <MobileNavBar />
    </>
);

export default ResponsiveNavBar;
