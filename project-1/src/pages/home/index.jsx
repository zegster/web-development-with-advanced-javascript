/* Import 3rd Party Library */
import React from "react";
import { Image } from "semantic-ui-react";

/* Import 3rd Party CSS */
import "semantic-ui-css/semantic.min.css";

const HomePage = () => {
    return (
        <>
            <Image src={require("./home_background.jpg")} alt="star-wars-background" fluid />
        </>
    );
};

export default HomePage;
