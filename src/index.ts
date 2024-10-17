import app from "./app";
import { PORT } from "./utils/env-vars";

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
