
export async function getProjects() {
    const url = 'https://a.klaviyo.com/api/accounts/';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            revision: '2023-12-15',
            Authorization: 'Klaviyo-API-Key pk_9c460ac936185e12a49549becb9f30592f'
        }
    };


    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data, "response!!!!!!!!!!!!!!!!!!!!!!!");
        return data;
    } catch (err) {
        console.error(err);
        throw err; // Re-throw the error if needed
    }
}



  