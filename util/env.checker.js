module.exports.envChecker = async () => {
    let allEnv = [
        {
            name: "API_PORT",
            value: process.env.API_PORT
        },{
            name: "WHITELIST_DOMAIN",
            value: process.env.WHITELIST_DOMAIN
        },{
            name: "DB_HOST",
            value: process.env.DB_HOST
        },{
            name: "DB_DIALECT",
            value: process.env.DB_DIALECT
        },{
            name: "DB_PORT",
            value: process.env.DB_PORT
        },{
            name: "DB_NAME",
            value: process.env.DB_NAME
        },{
            name: "DB_USERNAME",
            value: process.env.DB_USERNAME
        },{
            name: "DB_PASSWORD",
            value: process.env.DB_PASSWORD
        }, {
            name: "MAX_PROMISE_CONCURENTCY",
            value: process.env.MAX_PROMISE_CONCURENTCY
        }]
    allEnv.map(env => {
        if (!env.value) {
            console.log(chalk.red(`[env] process.env.${env.name} is missing.`))
        }
    })
}