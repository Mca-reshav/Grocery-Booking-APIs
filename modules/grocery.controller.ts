import { Request, Response } from "express";
import encryptService from "../services/encrypt.service";
import msg from "../utils/messages.utils";
import { error, log, success, tokenLog } from "../services/response.service";
import jwtService from "../services/jwt.service";
import { databaseService } from "../services/pg.service";
import { Op } from "sequelize";
import { placedOrderStatus, rolesPermission } from "../utils/constants.utils";
import common from "../services/common.service";
import { create } from "domain";

export const groceryController = {
  async addProduct(req: Request, res: Response): Promise<void> {
    try {
      const { name, type, subName } = req.body;
      const user = common.getUserData(req);
      const isExist = await databaseService.findOne({
        model: "GroceryDetails",
        query: {
          where: {
            [Op.and]: [{ name }, { subName }, { type }],
          },
          attributes: ["id"],
        },
      });

      if (isExist?.id) {
        res.status(400).json(log(false, msg.grocery.ALREADY_EXIST));
        return;
      }

      const groceryEntry = await databaseService.create({
        model: "GroceryDetails",
        data: {...req.body, createdBy: user.userId},
      });

      if (!groceryEntry) {
        res.status(500).json(log(false, msg.user.FAILED));
        return;
      }

      res.status(201).json(log(true, msg.grocery.GROCERY_ADDED));
    } catch (err) {
      error(err);
      res.status(500).json(log(false, msg.auth.INTERNAL_ERROR));
    }
  },
  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const obj = common.getUserData(req);
      const isAdmin = rolesPermission[obj.role].includes("1");
      const reqAry = [
        "id",
        "name",
        "sub_name",
        "price",
        "grocery_type",
        "type",
        "category_id",
      ];
      if (isAdmin) {
        reqAry.push("inventory_level", "created_at", "updated_at");
      }
      const getData = await databaseService.findAll({
        model: "GroceryDetails",
        query: {
          where: {},
          attributes: reqAry,
        },
      });
      getData?.forEach((item) => {
        if (isAdmin) {
          item.created_at = common.formatDate(item.created_at);
          item.updated_at = common.formatDate(item.updated_at);
          let level = item.inventory_level;
          item.left =
            common.totalQuantity(item.grocery_type, level, item.type) || 0;
        }
        item.price = "Rs." + item.price;
        item.grocery_type = common.groceryTypeFormatter(
          item.grocery_type,
          item.type
        );
        item.category_type = common.categoryType(item.category_id);
        delete item.category_id;
        delete item.type;
      });
      res.json(log(true, "Success", { getData }));
    } catch (err) {
      error(err);
    }
  },
  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const groceryId = req.params.groceryId;

      if (Object.keys(req.body).length < 1) {
        res.json(log(false, msg.grocery.PASS_SOMETHING));
        return;
      }
      const user = common.getUserData(req);
      const isExist = await databaseService.findOne({
        model: "GroceryDetails",
        query: {
          where: { id: groceryId},
          attributes: ["id"],
        },
      });

      if (!isExist?.id) {
        res.status(400).json(log(false, msg.grocery.NOT_EXIST));
        return;
      }

      const groceryEdited = await databaseService.update({
        model: "GroceryDetails",
        data: {...req.body, updatedBy: user.userId},
        where: { id: isExist.id}
      });

      if (!groceryEdited) {
        res.status(500).json(log(false, msg.user.FAILED));
        return;
      }

      res.status(201).json(log(true, msg.grocery.GROCERY_EDITED));
    } catch (err) {
      error(err);
    }
  },
  async removeProduct(req: Request, res: Response): Promise<void> {
    try {
      const groceryId = req.params.groceryId;
      const isDeleted = await databaseService.destroy({
        model: "GroceryDetails",
        where: { id: groceryId},
      });
      if (isDeleted) res.status(201).json(log(true, msg.grocery.GROCERY_REMOVED));
      else res.status(201).json(log(false, msg.auth.INTERNAL_ERROR));
    }catch (err) {
      error(err);
    }
  },
  async placeOrder(req: Request, res: Response): Promise<void> {
    const items = req.body.items;
    const respAry = [];
    let grandTotal = 0;
  
    for (let i = 0; i < items.length; i++) {
      const { groceryId, quantity } = items[i];
      const checkAvailability = await databaseService.findOne({
        model: 'GroceryDetails',
        query: {
          where: { id: groceryId },
          attributes: ["inventory_level", "price", "name", "sub_name"]
        }
      });
  
      const placedDetails = {
        id: groceryId,
        name: checkAvailability ? `${checkAvailability.name}-${checkAvailability.sub_name}` : '',
        price: checkAvailability?.price || '',
        quantity: quantity,
        status: '',
        total: 0
      };
  
      if (!checkAvailability) {
        placedDetails.status = placedOrderStatus[3];
        respAry.push(placedDetails);
  
      } else if (checkAvailability.inventory_level < quantity) {
        placedDetails.status = placedOrderStatus[2];
        respAry.push(placedDetails);
  
      } else {
        const left = checkAvailability.inventory_level - quantity;
        const updateGrocery = await databaseService.update({
          model: "GroceryDetails",
          data: { inventoryLevel: left },
          where: { id: groceryId }
        });
  
        if (updateGrocery) {
          const user = common.getUserData(req);
          const total = Math.round(checkAvailability.price * quantity);
  
          const orderGrocery = await databaseService.create({
            model: 'OrderDetails',
            data: {
              userId: user.userId,
              groceryId: groceryId,
              quantity: quantity,
              totalPrice: total
            }
          });
  
          if (orderGrocery) {
            placedDetails.status = placedOrderStatus[1];
            placedDetails.total = total;
            grandTotal += total;
            respAry.push(placedDetails);
          } else log(false, `${msg.grocery.ORDER_NOT_PLACED} :: ${groceryId}`);
        } else log(false, `${msg.grocery.NOT_UPDATED} :: ${groceryId}`);
      }
    }
  
    res.json(log(true, msg.grocery.ORDER_PLACED, { orderSummary: respAry, grandTotal: 'Rs.' + grandTotal }));
    return;
  }
  
};
