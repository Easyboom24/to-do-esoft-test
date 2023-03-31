import { check } from "express-validator";


const registrationValidator = [
    check('login','Логин не может быть пустым').notEmpty(),
    check('password','Пароль должен состоять более, чем из 4 символов').isLength({min:5}),
    check('surname','Фамилия не может быть пустой').notEmpty(),
    check('firstname','Имя не может быть пустым').notEmpty(),
];

export default registrationValidator;