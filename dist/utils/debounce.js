// debounce.ts
export function debounceWithCancel(fn, delay) {
    let timerId;
    let currentResolve;
    const debounced = function (...args) {
        clearTimeout(timerId);
        return new Promise((resolve) => {
            currentResolve = resolve;
            timerId = setTimeout(async () => {
                try {
                    const result = await fn.apply(this, args);
                    if (currentResolve === resolve) {
                        resolve(result);
                    }
                }
                catch (error) {
                    if (currentResolve === resolve) {
                        console.error('Search error:', error);
                        resolve(null);
                    }
                }
            }, delay);
        });
    };
    debounced.cancel = () => {
        clearTimeout(timerId);
        currentResolve = null;
    };
    return debounced;
}
//# sourceMappingURL=debounce.js.map