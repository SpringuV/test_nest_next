const bcrypt = require('bcrypt');
const saltRounds = 10;

export const hashPasswordHelper = async (plainPassword: string) => {
  try {
    return await bcrypt.hash(plainPassword, saltRounds); // saltRounds là độ mạnh
  } catch (error) {
    console.error(error);
  }
};

export const comparePasswordHelper = async (plainPassword: string, hashPassword: string) => {
  try {
    return await bcrypt.compare(plainPassword, hashPassword);
  } catch (error) {
    console.log(error);
  }
};
