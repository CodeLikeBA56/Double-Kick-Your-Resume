export async function throttledFn(fn, limit = 500) {
    let inThrottle = false;

    return function (...args) {
      if (!inThrottle) {
        fn(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
}