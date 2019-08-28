const db_credentials = {
  user_db: "db_user",
  password_db: "hola1234",
  collection_db: "voteapp"
};

module.exports = {
  DATABASE_URI: `mongodb://${db_credentials.user_db}:${
    db_credentials.password_db
  }@ds139632.mlab.com:39632/${db_credentials.collection_db}`
};
