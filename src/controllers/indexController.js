const mercadopago = require('mercadopago');
const { 
    TEST_ACCESS_TOKEN, 
    TEST_INTEGRATOR_ID, 
    MERCADOPAGO_REDIRECT_URL, 
    MERCADOPAGO_NOTIFICATION_URL } = require('../constants');

mercadopago.configure({
    access_token: TEST_ACCESS_TOKEN,
    integrator_id: TEST_INTEGRATOR_ID
});

module.exports = {
    home: (req, res) => {
        return res.render('index');
    },
    detail: (req, res) => {
        return res.render('detail', { ...req.query });
    },
    mercadopagoRedirect: (req, res) => {
        console.log(req.query);
        if (req.query.status.includes('success')) {
            return res.render('success')
        }
        if (req.query.status.includes('pending')) {
            return res.render('pending')
        }
        if (req.query.status.includes('failure')) {
            return res.render('failure')
        }
        return res.status(404).end()
    },
    mercadopagoNotification: (req, res) => {
        console.log(req.body);
        res.status(200).end('Ok');
    },
    buy: (req, res) => {
        let item = {
            id: '1234',
            picture_url: 'https://mercadopago-workshop-cert.herokuapp.com/images/products/jordan.jpg',
            title: 'Test item',
            description: 'Dispositivo móvil de Tienda e-commerce',
            unit_price: 4999,
            quantity: 1
        }
        let preference = {
            back_urls: {
                success: `${MERCADOPAGO_REDIRECT_URL}success`,
                pending: `${MERCADOPAGO_REDIRECT_URL}pending`,
                failure: `${MERCADOPAGO_REDIRECT_URL}failure`
            },
            notification_url: MERCADOPAGO_NOTIFICATION_URL,
            auto_return: 'approved',
            payer: {
                name:'Ryan',
                surname: 'Dahl',
                email: 'test_user_63274575@testuser.com',
                phone: {
                    area_code: '11',
                    number: 55556666
                },
                adress: {
                    zip_code: '1234',
                    street_name: 'Monroe',
                    street_number: 860
                }
            },
            items: [item], // always an array
            payment_methods: {
                installments: 12, 
                excluded_payment_types: [
                    { 
                        id: 'atm'
                    }
                ],
                excluded_payment_methods: [
                    { 
                        id: 'visa' 
                    }
                ]
            },
            external_reference: 'leandrocorbalan88@hotmail.com'
        }
        mercadopago.preferences.create(preference)
            .then(response => {
                global.init_point = response.body.init_point
                res.render('confirm')
            })
            .catch(err => {
                console.error(err)
                res.send('error')
            })
    }
}