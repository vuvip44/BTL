const { AsyncLocalStorage } = require("node:async_hooks");

// Tạo instance của AsyncLocalStorage
const asyncLocalStorage = new AsyncLocalStorage();

// Lớp RequestContext để quản lý dữ liệu context
class RequestContext {
    static set(key, value) {
        const store = asyncLocalStorage.getStore();
        if (store) {
            store[key] = value;
        }
    }

    static get(key) {
        const store = asyncLocalStorage.getStore();
        return store ? store[key] : null;
    }
}

module.exports = { asyncLocalStorage, RequestContext };
