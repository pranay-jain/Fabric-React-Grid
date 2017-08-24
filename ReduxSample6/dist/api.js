"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = {
    // Save counter state
    save: (counter) => {
        localStorage.setItem('__counterValue', counter.value.toString());
        return Promise.resolve(null);
    },
    // Load counter state
    load: () => {
        const value = parseInt(localStorage.getItem('__counterValue'), 10);
        return Promise.resolve({ value });
    },
};
//# sourceMappingURL=api.js.map