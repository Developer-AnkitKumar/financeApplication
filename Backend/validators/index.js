import { body } from "express-validator";

const userResgisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Email is invalid"),

    body("username")
      .trim()
      .notEmpty().withMessage("Username is required")
      .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long")
      .isLength({ max: 20 }).withMessage("Username must be at most 20 characters long"),

    body("fullname")
      .notEmpty().withMessage("Fullname is required")
      .isLength({ min: 3 }).withMessage("Fullname must be at least 3 characters long")
      .isLength({ max: 20 }).withMessage("Fullname must be at most 20 characters long"),

    body("password")
      .notEmpty().withMessage("Password is required")
      .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
      .isLength({ max: 20 }).withMessage("Password must be at most 20 characters long")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/),

    body("confirmPassword")
      .notEmpty().withMessage("Confirm Password is required")
      .isLength({ min: 6 }).withMessage("Confirm Password must be at least 6 characters long")
      .isLength({ max: 20 }).withMessage("Confirm Password must be at most 20 characters long")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match");
        }
        return true;
      }),
  ];
};

const userLoginValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Email is not valid"),

    body("password")
      .notEmpty().withMessage("Password cannot be empty"),
  ];
};

export { userResgisterValidator, userLoginValidator };
