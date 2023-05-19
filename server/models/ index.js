const Trade = require('./Trade');
const User = require('./User');

User.hasMany(Trade, {
    foreignKey: 'user_id'
});

Trade.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = {Trade, User};