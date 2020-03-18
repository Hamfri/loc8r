/**
 * GET 'about' page
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const about = (req, res, next) => {
    res.render('about', { title: 'About' })
};

module.exports = {
    about
};