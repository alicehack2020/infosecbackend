import passwordValidator from 'password-validator';
const saltRounds = 10; 
import bcrypt from "bcryptjs";
export const encrypt = async (password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}


export const decrypt = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
};

export const checkPasswordStrength = async (password) => {
    const passwordSchema = new passwordValidator();
    passwordSchema
    .is().min(8)                                    // Minimum length 8
    .is().max(50)                                   // Maximum length 50
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits()                                 // Must have digits
    .has().not().spaces() 
     
    const validationResult = passwordSchema.validate(password, { list: true });
    return validationResult.length === 0;
};




