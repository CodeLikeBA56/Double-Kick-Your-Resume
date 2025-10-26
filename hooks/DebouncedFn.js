export async function DebouncedFn(fn, timeout = 500) {
    let timer;

    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), timeout);
    };
}