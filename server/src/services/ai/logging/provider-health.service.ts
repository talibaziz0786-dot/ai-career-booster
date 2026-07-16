import type {

AIProvider,

ProviderHealth,

} from "../types/ai.types.js";

const healthMap =

new Map<AIProvider,ProviderHealth>();

export function updateProviderHealth(

provider:AIProvider,

success:boolean,

responseTime:number

){

const current=

healthMap.get(provider)??{

provider,

healthy:true,

averageResponseTime:0,

totalRequests:0,

failedRequests:0,

successRate:100,

};

current.totalRequests++;

if(!success){

current.failedRequests++;

}

current.averageResponseTime=

(current.averageResponseTime+

responseTime)/2;

current.successRate=

((current.totalRequests-current.failedRequests)

/current.totalRequests)*100;

current.healthy=

current.successRate>70;

healthMap.set(provider,current);

}

export function getProviderHealth(){

return [...healthMap.values()];

}