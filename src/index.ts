import app from "./server";
import config from "./config";
import 'dotenv/config';

app.listen(config.port, () => {
  console.log(`Server running in ${config.stage} mode on port ${config.port}`);
});