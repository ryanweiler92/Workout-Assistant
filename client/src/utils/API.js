export const queryExercises = (query) => {

    // from stack overflow user abdennour toumi
    function randomize(array) {
        const n=50;
        const shuffled = array.sort(function(){return .5 - Math.random()});

        const selected = shuffled.slice(0,n);
        console.log(selected);
        return selected;
    }

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
            'X-RapidAPI-Key': 'df540dbf02mshbbf9b25c53b2caap1a05a6jsne960d615f5f9'
        }
    };
    
    if (query === 'All types') {
        fetch('https://exercisedb.p.rapidapi.com/exercises', options)
            .then(response => response.json())
            .then(response => randomize(response))
            .catch(err => console.error(err));
    } else {
        const queryVal = query.toLowerCase().replace(/ /g, '%20');
        fetch('https://exercisedb.p.rapidapi.com/exercises/bodyPart/' + queryVal, options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }
} 