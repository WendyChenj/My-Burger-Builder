export const checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
        return true;
    };

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid; 
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
        const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
        const pattern = /^\d{10}$/;
        isValid = pattern.test(value) && isValid;
    }

    if (rules.postalCodeLength) {
        isValid = value.length === 6 && isValid;
    }

    return isValid;
};

