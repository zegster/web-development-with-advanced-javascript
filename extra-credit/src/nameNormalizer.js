const normalize = (name) => {
    /* Returns empty string when passed empty string */
    if (name == "") {
        return name;
    }

    /* Throws when name contains two commas */
    const commas = name.match(/,/g);
    if (commas && commas.length > 1) {
        throw null;
    }

    const filter_name = name.trim().replace(",", "").split(" ");
    switch (filter_name.length) {
        case 1:
            /* Returns single word name */
            return name;

        case 2:
            /* Swaps first and last names */
            return `${filter_name[1]}, ${filter_name[0]}`;

        case 3:
            /* Does not initialize one letter middle name */
            if (filter_name[1].length == 1) {
                return `${filter_name[2]}, ${filter_name[0]} ${filter_name[1]}`;
            }
            /* Initializes middle name */
            return `${filter_name[2]}, ${filter_name[0]} ${filter_name[1][0]}.`;

        case 4:
            /* Appends suffixes to end */
            if (filter_name[3].indexOf(".") !== -1) {
                return `${filter_name[2]}, ${filter_name[0]} ${filter_name[1][0]}., ${filter_name[3]}`;
            }
            /* Initializes each of multiple middle names */
            return `${filter_name[3]}, ${filter_name[0]} ${filter_name[1][0]}. ${filter_name[2][0]}.`;

        default:
            /* Returns single word name (default)*/
            return name;
    }
};

module.exports = normalize;
