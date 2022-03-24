const regexExpressions = {
  password: {
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    msg:"Your password is too weak",
  }, 
};

export default regexExpressions;