const defaultOptions = {
    success: true,
    delay: 1500
};

export default function fakeRequest(data, opt = defaultOptions) {
    const { delay, success } = { ...defaultOptions, ...opt };

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                resolve(data);
            } else {
                reject(data);
            }
        }, delay);
    });
}
