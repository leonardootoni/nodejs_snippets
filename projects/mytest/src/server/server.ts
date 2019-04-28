/**
 * Boilerplate app to use express js over Typescript.
 * ESLint is set along Prettier and Airbnb style guide.
 */
import app from './app';

app.express.listen(3333);
app.logger.info('Server Listening on port 3333');
