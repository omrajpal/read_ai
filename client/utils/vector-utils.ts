// vector-utils.ts
export const dotProduct = (A: number[], B: number[]): number => {
    return A.reduce((sum, a, idx) => sum + a * B[idx], 0);
};

export const magnitude = (v: number[]): number => {
    return Math.sqrt(v.reduce((sum, x) => sum + x ** 2, 0));
};

export const cosineSimilarity = (A: number[], B: number[]): number | null => {
    try {
        return dotProduct(A, B) / (magnitude(A) * magnitude(B));
    } catch (e) {
        return null; // Handle the case where one or both vectors are zero vectors
    }
};
