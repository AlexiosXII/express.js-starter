const Category = require('../model/category.model')
const News = require('../model/news.model')
const Tag = require('../model/tag.model')
const TagLog = require('../model/tag.log.model')

Category.hasMany(News, {
    foreignKey: 'category_id',
});
News.belongsTo(Category, {
    foreignKey: 'category_id',
});

News.hasMany(TagLog, {
    foreignKey: 'news_tag_id',
});
TagLog.belongsTo(News, {
    foreignKey: 'news_tag_id',
});

Tag.hasMany(TagLog, {
    foreignKey: 'tag_id',
});
TagLog.belongsTo(Tag, {
    foreignKey: 'tag_id',
});

module.exports = {
    Category,
    News,
    Tag,
    TagLog,
}