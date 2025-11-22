import { app } from "./app";
import { PORT } from "./config/config.env";
import { checkDBConnection } from "./utils/db";

checkDBConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Serving on http://localhost:${PORT}`);
  });
})

