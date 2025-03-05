import he from "he";

//Permet de décoder les caractères spéciaux
export const d = (text) => {
    if (text == undefined) {
        return "";
    }
    return he.decode(text);
};
