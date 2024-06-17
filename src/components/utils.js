export const convertCountriesForSelect = (options,type) => {
    console.log(options,"options inside countries select");
    let formattedCountryOptions=[]
    if(type === "timezones") {
         formattedCountryOptions = options?.map((timezone) => {
            return {label:timezone , value:timezone}
        });
    } else {
         formattedCountryOptions = options?.map(({name,code,isoCode}) => {
            return {label:name , value:type === "country" ? code : isoCode}
        });
    }
    return formattedCountryOptions
}