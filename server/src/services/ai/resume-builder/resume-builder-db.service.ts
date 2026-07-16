import ResumeBuilder from "../../../models/resume-builder.model.js";

export async function saveResumeVersion(

userId: string,

content: unknown,

language: string

) {

const latest =

await ResumeBuilder.findOne({

user: userId,

}).sort({

version: -1,

});

const version =

latest

? latest.version + 1

: 1;

return ResumeBuilder.create({

user: userId,

version,

language,

content,

});

}

export async function getResumeVersions(

userId: string

) {

return ResumeBuilder.find({

user: userId,

})

.sort({

version: -1,

});

}

export async function getResumeVersion(

userId: string,

version: number

) {

return ResumeBuilder.findOne({

user: userId,

version,

});

}