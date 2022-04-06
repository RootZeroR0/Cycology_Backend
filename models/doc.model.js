module.exports = (sequelize, DataTypes) => {
    const Document = sequelize.define("document", {
      type: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      data: {
        type: DataTypes.BLOB("long"),
      },
    });
    return Document;
  };