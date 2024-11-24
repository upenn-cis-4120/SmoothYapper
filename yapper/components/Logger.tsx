import { logger } from 'react-native-logs';

const config = {
    levels: {
        info: 0,
        warn: 1,
        error: 2,
    },
    serverity: "info",
    transportOptions: {
        _def: "console",
        colors: {
            info: "blue",
            warn: "yellow",
            error: "red",
        },
    },
};

const Logger = logger.createLogger(config);

export default Logger;