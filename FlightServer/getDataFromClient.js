const getDataFromClient = ({req, res, message}) => {
    let dataFromClientRaw = [];

    req.on('data', chunk => dataFromClientRaw.push(chunk));

    return new Promise((resolve, reject) => {
       req.on('end', () => {
            const dataFromClientJSON = JSON.parse(dataFromClientRaw.toString());
            req.dataFromClientJSON = dataFromClientJSON;
            resolve({req, res, message});
       });

    });
};


module.exports = {
    getDataFromClient
};