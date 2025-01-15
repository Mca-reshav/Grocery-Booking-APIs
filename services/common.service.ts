import moment from "moment";
import {
  groceryType,
  groceryTypeCategory,
  groceryCategory,
} from "../utils/constants.utils";
import { error } from "./response.service";
import { Request } from "express";

const common = {
  getUserData(req: Request) {
    return { ...JSON.parse(JSON.stringify(req.headers.user)) };
  },
  totalQuantity(
    grocery_type: string,
    quantity: number,
    type: number
  ): string | void {
    try {
      const prod = type * quantity;
      let left = "";

      if (groceryTypeCategory.KG.includes(grocery_type)) {
        const check = groceryType.gm == grocery_type;
        if (check) {
          left =
            prod <= 1
              ? prod + "gram"
              : prod <= 1000
              ? prod + "grams"
              : prod / 1000 + "Kg";
        } else left = prod + "Kg";
      } else if (groceryTypeCategory.LITRE.includes(grocery_type)) {
        const check = groceryType.ml == grocery_type;
        if (check) left = prod <= 1000 ? prod + "ml" : prod / 1000 + "Litres";
        else left = prod <= 1 ? prod + "Litre" : prod + "Litres";
      } else if (groceryType.dz == grocery_type) left = prod + "Dozen";
      else left = prod + "Units";
      return left;
    } catch (err: any) {
      error(`Error total quantity: ${err.message}`);
    }
  },
  groceryTypeFormatter(grocery_type: string, type: string) {
    let getKey = "";
    Object.entries(groceryType).map(([key, value]) => {
      if (value == grocery_type) getKey = key;
    });
    if (getKey) return parseInt(type) + getKey;
  },
  categoryType(type: string) {
    let getKey = "";
    Object.entries(groceryCategory).map(([key, value]) => {
      if (value == type) getKey = key;
    });
    if (getKey) return getKey;
  },
  formatDate(date: string) {
    const istOffset = 330;
    return moment(date).utcOffset(istOffset).format("YYYY-MM-DD HH:mm:ss");
  },
};

export default common;
