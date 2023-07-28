// this is another way to export the file
export * from "./constants";

//Set Item in LocalStorage
export const setItemInLocalStorage = (key, value) => {
    if (!key || !value) {
        return console.error("Can not Store in LS");
    }

    const valueToStore =
        typeof value != "string" ? JSON.stringify(value) : value;

    localStorage.setItem(key, valueToStore);
};

//Get Item from LocalStorage
export const getItemFromLocalStorage = (key) => {
    if (!key) {
        return console.error("Can not get the value from LS");
    }

    return localStorage.getItem(key);
};

//Remove Item form LocalStorage
export const removeItemFromLocalStorage = (key) => {
    if (!key) {
        return console.error("Can not get the value from LS");
    }

    localStorage.removeItem(key);
};

export const getFormBody = (params) => {
    let formBody = [];

    for (let property in params) {
        let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
        let encodedValue = encodeURIComponent(params[property]); // aakash 123 => aakash%2020123

        formBody.push(encodedKey + "=" + encodedValue);
    }

    return formBody.join("&"); // 'username=aakash&password=123213'
};
