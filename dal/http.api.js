class HttpApi {

    _baseURL = 'http://35.192.79.86/api/';

    callback(name, email, message) {
        const request = new Request(this._baseURL + 'test', {
            method: 'POST',
            body: JSON.stringify({name, email, message})
        });

        const promise = fetch(request)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(`Error status: ${response.status}`);
                }
            })

        return promise;
    }
}

export default new HttpApi();