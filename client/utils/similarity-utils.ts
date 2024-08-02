// similarity-utils.ts
export const sigmoid = (x: number): number => {
    return 1 / (1 + Math.exp(-x));
};

export const meanSquaredError = (yTrue: number[], yPred: number[]): number => {
    const mse = yTrue.reduce((sum, yt, idx) => sum + (yt - yPred[idx]) ** 2, 0) / yTrue.length;
    return Math.sqrt(mse);
};

export const weightedEuclideanDistance = (v1: number[], v2: number[], weights: number[]): number => {
    return Math.sqrt(v1.reduce((sum, a, idx) => sum + weights[idx] * (a - v2[idx]) ** 2, 0));
};

export const similarityPercentage = (v1: number[], v2: number[], weights: number[]): number => {
    const maxDistance = Math.sqrt(weights.reduce((sum, w) => sum + w * (10 ** 2), 0));
    const actualDistance = weightedEuclideanDistance(v1, v2, weights);
    const similarity = 1 - (actualDistance / maxDistance);
    return similarity;
};

export const rescaleSimilarity = (similarity: number, low = 40, high = 95): number => {
    let score = low + (high - low) * similarity;
    if (score > 85) {
        score += 7;
    } else if (score > 80) {
        score += 5;
    } else {
        score -= 7;
    }

    return Math.min(100, Math.max(1, score));
};
