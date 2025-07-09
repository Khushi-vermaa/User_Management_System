import bcrypt from "bcrypt";
const salt_Rounds = 10;
export const hashpassowrds = async (password) => {
  return await bcrypt.hash(password, salt_Rounds);
};

export const comparePassword = async (inputpassword, hashpassword) => {
  return await bcrypt.compare(inputpassword, hashpassword);
};
