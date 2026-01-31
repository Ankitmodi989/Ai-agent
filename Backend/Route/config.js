import dotenv from "dotenv";
dotenv.config();

const jwt_password = process.env.JWT_PASSWORD;

export default {
    jwt_password
};