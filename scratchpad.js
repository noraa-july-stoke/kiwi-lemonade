const isValid = (s) => {
    //base case is hit when all characters are removed
    // and no false condition has been raised

    if (s.length === 0) return true;
    if (s.length % 2 === 1) return false;

    const new_s = s.split("()").join('').split('[]').join('').split('{}').join('');
    if (new_s.length === s.length ) return false;
    console.log(s, new_s)
    return isValid(new_s);
};
