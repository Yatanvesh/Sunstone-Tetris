function rand(min: number, max: number = null) {
    return Math.floor(randf(min, max));
}

function randf(min: number, max: number) {
    if (max == null) {
        max = min || 1;
        min = 0;
    }
    return Math.random() * (max - min) + min;
}

function randOneFrom(items: any[]) {
    return items[rand(items.length)];
}

function randOneIn(max = 2) {
    return rand(0, max) === 0;
}

function distance(a: any, b: any) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

export default {
    rand,
    randf,
    randOneFrom,
    randOneIn,
    distance,
};
