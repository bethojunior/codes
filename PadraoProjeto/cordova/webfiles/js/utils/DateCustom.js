class DateCustom{
    static getNow(){
        const date = new Date();

        return `${date.getFullYear()}-${Mask.digitsToTheLeft(2,date.getMonth() + 1)}-${Mask.digitsToTheLeft(2,date.getDate())}`+
            ` ${Mask.digitsToTheLeft(2,date.getHours())}:${Mask.digitsToTheLeft(2,date.getMinutes())}:${Mask.digitsToTheLeft(2,date.getSeconds())}`;
    }

    static getDateLocal(dateDefined){
        const date = new Date(dateDefined);
        return `${Mask.digitsToTheLeft(2,date.getDate())}/${Mask.digitsToTheLeft(2,date.getMonth() + 1)}/${date.getFullYear()}`+
            ` ${Mask.digitsToTheLeft(2,date.getHours())}:${Mask.digitsToTheLeft(2,date.getMinutes())}`;
    }

    static getMinuteBySecunds(secunds){
        return Math.floor(secunds/60)
    }

    /**
     * Retorna o tempo
     * @param dateCustom
     * @returns {string}
     */
    static getTimeNow(dateCustom = false){

        const date = !dateCustom ? new Date() : new Date(dateCustom);

        return ` ${Mask.digitsToTheLeft(2,date.getHours())}:${Mask.digitsToTheLeft(2,date.getMinutes())}`;
    }

}