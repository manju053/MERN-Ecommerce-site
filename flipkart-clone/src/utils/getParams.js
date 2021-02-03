export default (query) => {
    if(query) {
        const queryString = query.split("?");
        if(queryString.length > 0) {
            const params = queryString[1].split("&");
            const paramsObj = {};
            params.forEach(param => {
                const keyvalue = param.split("=");
                paramsObj[keyvalue[0]] = keyvalue[1];
            })

            return paramsObj;
        }
    }

    return query;
}