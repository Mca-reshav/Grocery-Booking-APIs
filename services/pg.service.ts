import { GroceryDetails } from "../models/groceryDetails.model";
import { OrderDetails } from "../models/orderDetails.model";
import { UserDetails } from "../models/userDetails.model";
import { error } from "./response.service";
import { Model, ModelStatic } from "sequelize";

const models = {
  GroceryDetails,
  OrderDetails,
  UserDetails
} as const;

interface CountOptions {
  model: keyof typeof models;
  query: Record<string, any>;
}

interface FindOneOptions {
  model: keyof typeof models;
  query: { attributes: string[]; [key: string]: any };
}

interface UpdateOptions {
  model: keyof typeof models;
  data: Record<string, any>;
  where: Record<string, any>;
}

interface FindAllOptions {
  model: keyof typeof models;
  query: { attributes: string[]; [key: string]: any };
}

interface CreateOptions {
  model: keyof typeof models;
  data: Record<string, any>;
}

interface DestroyOptions {
  model: keyof typeof models;
  where: Record<string, any>;
}

export const databaseService = {
  async count(opts: CountOptions) {
    try {
      const model = models[opts.model] as ModelStatic<Model>; 
      if (!model) {
        throw new Error(`Invalid model: ${opts.model}`);
      }
      const query = opts.query && Object.entries(opts.query).length >= 1 ? opts.query : {};
      const countResult = await model.count({ where: query });
      return countResult;
    } catch (e) {
      error(`::DATABASE ERROR :: catch error in count method. : ${e}`);
      throw e;
    }
  },

  async findOne(opts: FindOneOptions) {
    try {
      const model = models[opts.model] as ModelStatic<Model>;
      if (!model) throw new Error(`Invalid model: ${opts.model}`);
      const query = { ...opts.query };
      const result = await model.findOne(query);
      return result ? result.get({ plain: true }) : null;
    } catch (e) {
      error(`::DATABASE ERROR:: (findOne) method: ${e}`);
      throw e;
    }
  },

  async create(opts: CreateOptions) {
    try {
      const model = models[opts.model] as ModelStatic<Model>;
      if (!model) throw new Error(`Invalid model: ${opts.model}`);
      const createdData = await model.create(opts.data);
      return createdData ? createdData.get({ plain: true }) : null;
    } catch (e) {
      error(`::DATABASE ERROR:: (create) method: ${e}`);
      throw e;
    }
  },

  async update(opts: UpdateOptions) {
    try {
      const model = models[opts.model] as ModelStatic<Model>; 
      if (!model) {
        throw new Error(`Invalid model: ${opts.model}`);
      }
      const where = opts.where && Object.entries(opts.where).length >= 1 ? opts.where : {};
      const updateResult = await model.update(opts.data, {
        where: where,
        individualHooks: true,
      });
      return updateResult;
    } catch (e) {
      error(`::DATABASE ERROR :: catch error in update method. : ${e}`);
      throw e;
    }
  },

  async findAll(opts: FindAllOptions) {
    try {
      if (!opts.query?.attributes || opts.query?.attributes.length === 0) {
        error(`::DATABASE ERROR :: Attributes are required in (findAll) method for ${opts.model}`);
        throw new Error("Attributes are required");
      }

      const model = models[opts.model] as ModelStatic<Model>; 
      if (!model) {
        throw new Error(`Invalid model: ${opts.model}`);
      }
      const query = opts.query && Object.entries(opts.query).length >= 1 ? opts.query : {};
      const getData = await model.findAll(query);
      return getData ? getData.map((result: any) => result.get({ plain: true })) : null;
    } catch (e) {
      error(`::DATABASE ERROR :: catch error in (findAll) method. : ${e}`);
      throw e;
    }
  },

  async destroy(opts: DestroyOptions) {
    try {
      const model = models[opts.model] as ModelStatic<Model>;
      if (!model) {
        throw new Error(`Invalid model: ${opts.model}`);
      }
      const where = opts.where && Object.entries(opts.where).length >= 1 ? opts.where : {};
      const destroyResult = await model.destroy({ where: where });
      return destroyResult;
    } catch (e) {
      error(`::DATABASE ERROR :: catch error in delete method. : ${e}`);
      throw e;
    }
  }
};
