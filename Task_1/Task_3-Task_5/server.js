import { app } from "./app.js";
import { PORT } from "./config/config.env.js";

app.listen(PORT, () => {
  console.log(`Serving on http://localhost:${PORT}`);
});
