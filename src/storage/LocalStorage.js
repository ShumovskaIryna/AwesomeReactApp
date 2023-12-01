class LocalStorage {
    static createKeyWithData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    static getData(key) {
        return JSON.parse(localStorage.getItem(key));
    }
}

export default LocalStorage;