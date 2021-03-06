export const queryExercises = (query) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
            'X-RapidAPI-Key': 'df540dbf02mshbbf9b25c53b2caap1a05a6jsne960d615f5f9'
        }
    };
    if (query === 'All types') {
        return fetch('https://exercisedb.p.rapidapi.com/exercises', options);
    } else if (query === 'Body weight') {
        const queryVal = query.toLowerCase().replace(/ /g, '%20');
        return fetch('https://exercisedb.p.rapidapi.com/exercises/equipment/' + queryVal, options);
    } else {
        const queryVal = query.toLowerCase().replace(/ /g, '%20');
        return fetch('https://exercisedb.p.rapidapi.com/exercises/bodyPart/' + queryVal, options);
    }
} 