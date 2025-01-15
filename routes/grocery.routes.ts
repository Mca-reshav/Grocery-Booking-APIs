import express from 'express';
import {global, one} from '../middlewares/main.middleware';

const groceryRoutes = express.Router();
groceryRoutes.use(global);

import { groceryController } from '../modules/grocery.controller';
import groceryValidator from '../validators/grocery.validator';
import { roles } from '../utils/constants.utils';

groceryRoutes.get('/getAll', one.webAuth, one.role(roles.USER), groceryController.getAllProducts);
groceryRoutes.post('/add', one.webAuth, one.role(roles.ADMIN), one.validate(groceryValidator.add), groceryController.addProduct);
groceryRoutes.post('/order', one.webAuth, one.role(roles.USER), one.validate(groceryValidator.placeOrder), groceryController.placeOrder);
groceryRoutes.delete('/remove/:groceryId', one.webAuth, one.role(roles.ADMIN), groceryController.removeProduct);
groceryRoutes.put('/edit/:groceryId', one.webAuth, one.role(roles.ADMIN), one.validate(groceryValidator.update), groceryController.updateProduct);

groceryRoutes.use('**', one._404);

export default groceryRoutes;
