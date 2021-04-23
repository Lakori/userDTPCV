import Config from '../config/config.js';

export { baseUrl }



// const baseUrl = () => { return (Config.isRelativeUrl ? '' :  Config.url) + Config.subDomain + Config.version }
const baseUrl = () => { return Config.subDomain + Config.version }



