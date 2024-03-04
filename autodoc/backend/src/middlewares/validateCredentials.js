import { check, validationResult } from "express-validator";

export const userValidatorCheck = [
  check("fullName")
    .not()
    .isEmpty()
    .withMessage("campo nome necessário")
    .isString()
    .isLength({ min: 4, max: 15 }),
  check("email").normalizeEmail().isEmail().withMessage("Email Invalido"),
  check("password")
    .not()
    .isEmpty()
    .isLength({ min: 5, max: 16 })
    .withMessage("Senha prescisa ter entre 5 e 16 caracteres"),
];
export const userLoginCheck = [
  check("email").normalizeEmail().isEmail().withMessage("Email Invalido"),
  check("password")
    .not()
    .isEmpty()
    .isLength({ min: 5, max: 16 })
    .withMessage("Senha prescisa ter entre 5 e 16 caracteres"),
];

export const userValidator = (req, res, next) => {
  const result = validationResult(req).array();

  if (!result.length > 0) return next();

  res.json({
    status: false,
    error: result[0].msg,
  });
};
