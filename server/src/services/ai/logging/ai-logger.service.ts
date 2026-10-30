import type {

AIProvider,

} from "../../../lib/ai/types/ai.types.js";

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