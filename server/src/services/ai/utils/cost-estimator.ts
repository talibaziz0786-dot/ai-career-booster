export function estimateCost(

provider:string,

tokens:number

){

switch(provider){

case "gemini-2.5-pro":

return tokens*0.00002;

case "gemini-2.5-flash":

return tokens*0.000005;

case "deepseek":

return tokens*0.000003;

default:

return 0;

}

}