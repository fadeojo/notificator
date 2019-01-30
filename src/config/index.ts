import { developmentConfig } from './development';
import { productionConfig } from './production';
import { testConfig } from './test';

export const getConfig = () => {
    if (process.env.NODE_ENV === 'production') {
        return productionConfig;
    } else if (process.env.NODE_ENV === 'development') {
        return developmentConfig;
    } else {
        return testConfig;
    }
};
