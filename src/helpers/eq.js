module.exports.register = function (handlebars) {
  handlebars.registerHelper('eq', function(val, val2) {
    return val == val2;
  });
};
