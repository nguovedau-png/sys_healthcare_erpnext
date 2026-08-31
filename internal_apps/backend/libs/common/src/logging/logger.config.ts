import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

export const loggerConfig = {
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.ms(),
                process.env.NODE_ENV === 'production'
                    ? winston.format.json()
                    : nestWinstonModuleUtilities.format.nestLike('HealthcareApp', {
                        colors: true,
                        prettyPrint: true,
                    }),
            ),
        }),
    ],
};
