const API_ASSISTANT_LOCAL_HOST = `http://localhost:3000`;

export default ({ config }) => {
    /**
     *  { config } from app.json
     * console.log(config.name); // prints 'My App'
     * 
     *  process.env
     * BASE_URL_ASSISTANT=url; expo start
     */

    if (!process.env.BASE_URL_ASSISTANT) {
        console.info(`API Assistant => ${API_ASSISTANT_LOCAL_HOST}`)
    }

    return {
        ...config,
        extra: {
            baseUrlAssistant: process.env.BASE_URL_ASSISTANT || API_ASSISTANT_LOCAL_HOST,
        }
    };
};
