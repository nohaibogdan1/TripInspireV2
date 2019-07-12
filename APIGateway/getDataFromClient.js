const getDataFromClient = ({req, res, message}) => {
    let dataFromClientRaw = "";

    console.log('aoc');
    console.log(req.userId);

    req.on('data', chunk => {
        dataFromClientRaw += chunk;
        console.log('da');
    });

    return new Promise((resolve, reject) => {
       req.on('end', () => {
            const dataFromClientJSON = JSON.parse(dataFromClientRaw);
            console.log(dataFromClientJSON);
            req.dataFromClientJSON = dataFromClientJSON;
            resolve({req, res, message});
       });

    });
};


module.exports = {
    getDataFromClient
};