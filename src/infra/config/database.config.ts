export const databaseConfig = {
  MONGO_URI: String(
    process.env.MONGO_URI ??
      "mongodb://admin:admin@mongo_local:27017/boleto_ai_api_db?authSource=admin"
  ),
};
