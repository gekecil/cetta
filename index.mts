import express from 'express'
import Bcrypt from 'bcryptjs'
import JWT, { JwtPayload } from 'jsonwebtoken'
import User from './models/user.mjs'
import EnvironmentData from './models/environment-data.mjs'

const app = express()

User.sync()
.then(
    () => {
        EnvironmentData.sync()

        Bcrypt.hash(
            'pass',
            8,
            (e, hash) => {
                User.findOrCreate(
                    {
                        where: {
                            username: 'admin'
                        },
                        defaults: {
                            password: hash
                        }
                    }
                )
            }
        )
    }
)

app.use( '/api', express.json() )

app.use(
    [
        '/api/create',
        '/api/update',
        '/api/delete'
    ],
    (req: any, res, next) => {
        const message403 = {
            message: 'You don\'t have authorization'
        }

        if (!(req.headers.authorization) || !(req.headers.authorization.startsWith('Bearer'))) return res.writeHead( 403 ).end( JSON.stringify( message403 ) )

        const authorization = req.headers.authorization as string
        const token = authorization.substring( String('Bearer ').length )

        try {
            const payload = JWT.verify( token, 'secret' ) as JwtPayload

            req.user_id = payload.user_id

            next()

        } catch (e) {
            res.writeHead( 403 )
            .end(
                JSON.stringify( message403 )
            )
        }

    }
)

app.get('/', (req, res) => {
    res.sendFile('build/index.html', {root: '.'})
})

app.get('/_app/*', (req, res) => {
    res.sendFile(`build/${req.url}`, {root: '.'})
})

app.get('/api', (req, res) => {
    EnvironmentData.findAll()
    .then(
        (value) => {
            if (value.length) {
                const updatedAt = value.sort((a, b) => Date.parse(a.updated_at) - Date.parse(b.updated_at)).at(value.length - 1)?.updated_at

                res.setHeader('Last-Modified', (new Date(updatedAt as string)).toUTCString())
            }

            res.json(
                value.reduce(
                    ( data: any, item ) => {
                        data[item.unit] = (data[item.unit] || []).concat( [item] )

                        return data
                    },
                    {}
                )
            )
        },
        () => {
            res.writeHead( 500 )
            .end(
                JSON.stringify({
                    reason: 'Internal Server Error'
                })
            )
        }
    )
})

app.post('/api/login', (req, res) => {
    const { username, password } = req.body

    User.findOne({
        where: {
            username: username
        }
    })
    .then(
        (value) => {
            const message401 = {
                message: 'Unauthorized'
            }

            if (!value) return res.writeHead( 401 ).end( JSON.stringify( message401 ) )

            Bcrypt.compare(
                value.password,
                password,
                (e) => {
                    if (e) return res.writeHead( 401 ).end( JSON.stringify( message401 ) )

                    const accessToken = JWT.sign(
                        {
                            user_id: value.id,
                            username: value.username
                        },
                        'secret',
                        {
                            expiresIn: 1800
                        }
                    )

                    res.json({
                        user_id: value.id,
                        access_token: accessToken,
                        scheme: 'Bearer'
                    })

                }
            )
        },
        () => {
            res.writeHead( 500 )
            .end(
                JSON.stringify({
                    reason: 'Internal Server Error'
                })
            )
        }
    )
})

app.put('/api/create', (req: any, res) => {
    EnvironmentData.create({
        place: req.body.place,
        unit: req.body.unit,
        value: req.body.value,
        user_id: req.user_id
    })
    .then(
        (value) => {
            res.json(value)
        },
        () => {
            res.writeHead( 500 )
            .end(
                JSON.stringify({
                    reason: 'Internal Server Error'
                })
            )
        }
    )
})

app.patch('/api/update', (req: any, res) => {
    EnvironmentData.update(
        {
            place: req.body.place,
            unit: req.body.unit,
            value: req.body.value,
            user_id: req.user_id
        },
        {
            where: {
                id: req.body.environment_data_id
            }
        }
    )
    .then(
        (value) => {
            res.json(value)
        },
        () => {
            res.writeHead( 500 )
            .end(
                JSON.stringify({
                    reason: 'Internal Server Error'
                })
            )
        }
    )
})

app.delete('/api/delete', (req: any, res) => {
    EnvironmentData.destroy(
        {
            where: {
                id: req.body.environment_data_id
            }
        }
    )
    .then(
        (value) => {
            res.json(value)
        },
        () => {
            res.writeHead( 500 )
            .end(
                JSON.stringify({
                    reason: 'Internal Server Error'
                })
            )
        }
    )
})

app.listen(3000)
