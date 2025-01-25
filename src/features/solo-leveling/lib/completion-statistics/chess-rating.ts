export function ratingLowerCheck ( initialUserRating: number, currentUserRating: number, lowerBound: number ): boolean {
    return (initialUserRating - currentUserRating) >= lowerBound;
}

export function ratingUpperCheck ( currentUserRating: number, upperBound: number ): boolean {
    return (currentUserRating) >= upperBound;
}

