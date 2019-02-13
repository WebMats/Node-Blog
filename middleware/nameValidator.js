

module.exports = (req, res, next) => {
    const firstLetter = req.body.name[0];
    const FirstLetter = firstLetter.toUpperCase();
    if (firstLetter !== FirstLetter) { 
        res.status(404).json({errorMessage: "Please make sure to uppercase the first letter on the user's name."})
    } else {
        next();
    }
}