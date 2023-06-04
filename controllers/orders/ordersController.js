const ordersDao = require('../../models/Orders')

const ordersController = {

    getOrdersheet: async (req, res) => {
        try {
            const id = req.params.id;

            const rows = await ordersDao.getOrdersheet(id);
            console.log(rows);
            res.render('orders/orderSheet', { orders: rows, id: id });
        } catch (error) {
            res.render('error', { message: '오류가 발생했습니다.' });
        }
    },

    createOrdersheet: async (req, res) => {
        try {
            const buyerId = req.session.user.id;
            const { name, phoneNumber, pickupDate, memo, user, id, totalprice } = req.body;

            console.log(req.body);
            await ordersDao.createOrdersheet(buyerId, user, name, pickupDate, phoneNumber, memo, id, totalprice);
            res.render('user/loginSuccess');
        } catch (error) {
            res.render('error', { message: '오류가 발생했습니다.' });
        }
    }

}
module.exports = ordersController;