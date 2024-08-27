"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const process_1 = require("process");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_mjs_1 = __importDefault(require("./models/user.mjs"));
const environment_data_mjs_1 = __importDefault(require("./models/environment-data.mjs"));
const app = (0, express_1.default)();
user_mjs_1.default.sync()
    .then(() => {
    environment_data_mjs_1.default.sync();
});
app.use('/', express_1.default.static('../cetta-svelte/build/'));
app.use('/api', express_1.default.json());
app.use([
    '/api/create',
    '/api/update',
    '/api/delete'
], (req, res, next) => {
    const message403 = {
        message: 'You don\'t have authorization'
    };
    if (!(req.headers.authorization) || !(req.headers.authorization.startsWith('Bearer')))
        return res.writeHead(403).end(JSON.stringify(message403));
    const authorization = req.headers.authorization;
    const token = authorization.substring(String('Bearer ').length);
    try {
        const payload = jsonwebtoken_1.default.verify(token, process_1.env['SECRET_KEY']);
        req.user_id = payload.user_id;
        next();
    }
    catch (e) {
        res.writeHead(403)
            .end(JSON.stringify(message403));
    }
});
app.get('/api', (req, res) => {
    environment_data_mjs_1.default.findAll()
        .then((value) => {
        res.json(value.reduce((data, item) => {
            data[item.unit] = (data[item.unit] || []).concat([item]);
            return data;
        }, {}));
    }, () => {
        res.writeHead(500)
            .end(JSON.stringify({
            reason: 'Internal Server Error'
        }));
    });
});
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    user_mjs_1.default.findOne({
        where: {
            username: username
        }
    })
        .then((value) => {
        const message401 = {
            message: 'Unauthorized'
        };
        if (!value)
            return res.writeHead(401).end(JSON.stringify(message401));
        bcryptjs_1.default.compare(value.password, password, (e) => {
            if (e)
                return res.writeHead(401).end(JSON.stringify(message401));
            const accessToken = jsonwebtoken_1.default.sign({
                user_id: value.id,
                username: value.username
            }, process_1.env['SECRET_KEY'], {
                expiresIn: 1800
            });
            res.json({
                user_id: value.id,
                access_token: accessToken,
                scheme: 'Bearer'
            });
        });
    }, () => {
        res.writeHead(500)
            .end(JSON.stringify({
            reason: 'Internal Server Error'
        }));
    });
});
app.put('/api/create', (req, res) => {
    environment_data_mjs_1.default.create({
        place: req.body.place,
        unit: req.body.unit,
        value: req.body.value,
        user_id: req.user_id
    })
        .then((value) => {
        res.json(value);
    }, () => {
        res.writeHead(500)
            .end(JSON.stringify({
            reason: 'Internal Server Error'
        }));
    });
});
app.patch('/api/update', (req, res) => {
    environment_data_mjs_1.default.update({
        place: req.body.place,
        unit: req.body.unit,
        value: req.body.value,
        user_id: req.user_id
    }, {
        where: {
            id: req.body.environment_data_id
        }
    })
        .then((value) => {
        res.json(value);
    }, () => {
        res.writeHead(500)
            .end(JSON.stringify({
            reason: 'Internal Server Error'
        }));
    });
});
app.delete('/api/delete', (req, res) => {
    environment_data_mjs_1.default.destroy({
        where: {
            id: req.body.environment_data_id
        }
    })
        .then((value) => {
        res.json(value);
    }, () => {
        res.writeHead(500)
            .end(JSON.stringify({
            reason: 'Internal Server Error'
        }));
    });
});
app.listen(process_1.env['PORT'], () => {
    console.log(`Listening on ${process_1.env['PORT']}`);
});
