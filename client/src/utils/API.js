export const exercisesByBodyPart = (query) => {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
            'X-RapidAPI-Key': 'df540dbf02mshbbf9b25c53b2caap1a05a6jsne960d615f5f9'
        }
    };
    
    fetch('https://exercisedb.p.rapidapi.com/exercises/bodyPart/back', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

} 