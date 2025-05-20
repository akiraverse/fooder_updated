"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
const menuRoute_1 = __importDefault(require("./routers/menuRoute"));
const userRoute_1 = __importDefault(require("./routers/userRoute"));
const orderRoute_1 = __importDefault(require("./routers/orderRoute"));
const reportRoute_1 = __importDefault(require("./routers/reportRoute"));
const global_1 = require("./global");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Ordering System API',
            version: '1.0.0',
            description: 'API documentation for the ordering system',
        },
        servers: [
            {
                url: `http://localhost:${global_1.PORT}`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', // Format token
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./src/routers/*.ts'], // Path to the API docs
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
app.use(`/menu`, menuRoute_1.default);
app.use(`/user`, userRoute_1.default);
app.use(`/order`, orderRoute_1.default);
app.use(`/report`, reportRoute_1.default);
// Set public folder as static
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
app.listen(global_1.PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${global_1.PORT}`);
});
