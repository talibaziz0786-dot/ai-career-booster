import type {

AIProvider,

} from "../types/ai.types.js";

export function logAIRequest(

provider: AIProvider,

responseTime: number,

success: boolean

){

console.log({

provider,

responseTime,

success,

time:new Date()

});

}