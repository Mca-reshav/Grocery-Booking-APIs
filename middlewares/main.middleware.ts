import express, { RequestHandler } from 'express';
import validate from './joi.middleware';
import webAuth from './auth.middleware';
import _404 from './404.middleware';
import role from './role.middleware';

export const global: RequestHandler[] = [
  express.json(),
  express.urlencoded({ extended: true }),
];

export const one = {
  validate,
  webAuth,
  _404,
  role,
};
