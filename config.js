let environments={};

// Setting the environments
environments.staging={
    httpPort:3000,
    httpsPort:3001,
    env:'Staging'
}
environments.production={
    httpsPort:5001,
    httpPort:5000,
    env:'Production'
}

// Choosing the required mode
let chosenMode=typeof(process.env.NODE_ENV)=='string'?process.env.NODE_ENV.toLowerCase():'';
let exportSetting=typeof(environments[chosenMode])=='object'?environments[chosenMode]:environments.staging;

// exporting the mode
module.exports=exportSetting;