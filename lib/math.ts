export const radians = (degrees: number) => {
    return (degrees * Math.PI) / 180;
};

export const normalizeBetween = (val: number, min: number, max: number) => {
    return (val - min) / (max - min);
};


export function fractionate(val: number, minVal: number, maxVal: number) {
    return (val - minVal) / (maxVal - minVal);
}

export function max(arr: Uint8Array) {
    return arr.reduce(function (a, b) {
        return Math.max(a, b);
    });
}

export function modulate(val: number, minVal: number, maxVal: number, outMin: number, outMax: number) {
    const fr = fractionate(val, minVal, maxVal);
    const delta = outMax - outMin;
    return outMin + (fr * delta);
}

export function avg(arr: Uint8Array) {
    const total = arr.reduce(function (sum, b) {
        return sum + b;
    });
    return (total / arr.length);
}