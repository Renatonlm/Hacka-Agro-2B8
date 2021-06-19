import Express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from '../router/router';
export const port = process.env.PORT || 4040;
const app = Express();

app.use(cors());

app.use('/public', Express.static(__dirname+'/public'));

app.use(Express.json());

app.use(Express.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
   res.send({message: `App is running on port ${port}`});
});
app.post('/', (req, res) => {
   res.send({message: `App is running on port ${port}`, req: req.body});
});

app.use('/api', router);

export default app;