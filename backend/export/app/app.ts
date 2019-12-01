import * as express from 'express';
import { Application } from 'express';
import { ExportsController } from './controllers/exports.controller';
import * as cors from 'cors';
import { urlencoded, json } from 'body-parser';
import * as path from 'path';

const app: Application = express();

app
  .use(cors())
  .use(json())
  .use(
    urlencoded({
      extended: true
    })
  )
  .use('/exports', express.static(path.join(__dirname, 'public')));

app.post('/exports', new ExportsController().getData());

app.listen(3000, () => console.log('Example app listening on port 3000!'));
