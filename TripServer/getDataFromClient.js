const getDataFromClient = ({req, res, message}) => {
    let dataFromClientRaw = '';

    req.on('data', chunk => dataFromClientRaw += chunk);

    return new Promise((resolve, reject) => {
       req.on('end', () => {
            const dataFromClientJSON = JSON.parse(dataFromClientRaw);

            req.dataFromClientJSON = dataFromClientJSON;
            resolve({req, res, message});
       });

    });
};


module.exports = {
    getDataFromClient
};