class CityController{
    /**
     * Retorna todas as cidades do braisil
     * @returns {Promise<any>}
     */
    getAll(estado = null){
        return new Promise((resolve,reject)=>{
            let url = 'City/GetAll';

            if(estado !== null){
                url += `?estate=${estado}`;
            }


            ConnectionServer.sendRequest(url,'POST',{},result=>{
                if(!result.status){
                    reject(result);
                    return;
                }
                resolve(result)
            });
        });
    }


    /**
     *
     * @returns {Promise<any>}
     */
    getCities(){
        return new Promise((resolve,reject)=>{
            ConnectionServer.sendRequest('Establishment/GetCities','POST',{},result=>{
                if(!result.status){
                    reject(result);
                    return;
                }
                resolve(result)
            });
        });
    }
}