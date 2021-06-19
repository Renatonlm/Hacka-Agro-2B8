import app, { port } from "./server/server";
import './config/db';

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});