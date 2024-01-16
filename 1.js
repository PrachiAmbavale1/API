const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dboperations = require('./dboperations');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const router = express.Router();

router.use((request, response, next) => {
    console.log('Middleware');
    next();
});

router.route('/barcode').get((request, response) => {
    dboperations.getBARCODE().then(result => {
        response.json(result[0]);
    });
});

router.route('/barcode/:id').get((request, response) => {
    dboperations.getBARCODE(request.params.id).then(result => {
        response.json(result[0]);
    });
});

router.route('/barcode').post((request, response) => {
    let barcode = new BARCODE(request.body.ORDERID, request.body.ITEM_NAME, request.body.ITEM_DETAIL);
    dboperations.addBARCODE(barcode).then(result => {
        response.status(201).json(result);
    });
});

app.use('/api', router);

const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Server running on port ${port}`));
