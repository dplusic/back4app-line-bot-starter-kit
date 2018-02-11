# back4app-line-bot-starter-kit
Starter kit for line bot on back4app

## Features
* babel (7.0.0-beta, preset-stage-0)
* webpack (HMR)
* eslint (airbnb/base, prettier)

## Getting Started

1. [Install Back4App Cli](https://docs.back4app.com/docs/integrations/command-line-interface/setting-up-cloud-code/)
1. [Configure Back4App Account Keys](https://docs.back4app.com/docs/integrations/command-line-interface/account-keys/)
1. `npm run init-cloud-code`
1. Configure Parameters
    1. Back4App > Dashboard > Core > Config > Create a parameter
    1. Add `LINE_BOT_CHANNEL_ACCESS_TOKEN`, `LINE_BOT_CHANNEL_SECRET` as a String type
1. Set `PARSE_SERVER_DATABASE_URI` as an environment variable
    * Get the URI from: Back4App > Server Settings > Core Settings
    * or, your local MongoDB
1. `npm start`

### Deploy
1. `npm run build`
1. `npm run deploy`

## Remarks

### About `optionalDependencies` in `package.json`
* These dependencies are provided by "Parse Server 2.6.5", so will not be packed.
* `ejs@2.5.2` is excluded because of its vulnerabilities([1](https://nvd.nist.gov/vuln/detail/CVE-2017-1000228), [2](https://nvd.nist.gov/vuln/detail/CVE-2017-1000188)).
