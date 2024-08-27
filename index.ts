const express = require('express')

const app = express()

app.use( '/', express.static('./build/') )

app.use( '/api', express.json() )
/*
app.use(
    [
        '/api/create',
        '/api/update',
        '/api/delete'
    ],
    (req: any, res: any, next: any) => {
        const message403 = {
            message: 'You don\'t have authorization'
        }

        if (!(req.headers.authorization) || !(req.headers.authorization.startsWith('Bearer'))) return res.writeHead( 403 ).end( JSON.stringify( message403 ) )

        const authorization = req.headers.authorization as string
        const token = authorization.substring( String('Bearer ').length )

        try {
            //const payload = JWT.verify( token, env['SECRET_KEY'] as string ) as JwtPayload

            //req.user_id = payload.user_id

            next()

        } catch (e) {
            res.writeHead( 403 )
            .end(
                JSON.stringify( message403 )
            )
        }

    }
)

app.get('/api', (req: any, res: any) => {
    EnvironmentData.findAll()
    .then(
        (value: any) => {
            res.json(
                value.reduce(
                    ( data: any, item: any ) => {
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

app.post('/api/login', (req: any, res: any) => {
    const { username, password } = req.body

    User.findOne({
        where: {
            username: username
        }
    })
    .then(
        (value: any) => {
            const message401 = {
                message: 'Unauthorized'
            }

            if (!value) return res.writeHead( 401 ).end( JSON.stringify( message401 ) )

            Bcrypt.compare(
                value.password,
                password,
                (e: any) => {
                    if (e) return res.writeHead( 401 ).end( JSON.stringify( message401 ) )

                    const accessToken = JWT.sign(
                        {
                            user_id: value.id,
                            username: value.username
                        },
                        env['SECRET_KEY'] as string,
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

app.put('/api/create', (req: any, res: any) => {
    EnvironmentData.create({
        place: req.body.place,
        unit: req.body.unit,
        value: req.body.value,
        user_id: req.user_id
    })
    .then(
        (value: any) => {
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

app.patch('/api/update', (req: any, res: any) => {
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
        (value: any) => {
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

app.delete('/api/delete', (req: any, res: any) => {
    EnvironmentData.destroy(
        {
            where: {
                id: req.body.environment_data_id
            }
        }
    )
    .then(
        (value: any) => {
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
*/
app.listen(3000, () => {
    console.log( `Listening on 3000}` )
})
