import { setupServer} from 'msw/node';
import { handlers } from './handlers';

// This configures a request mocking server with the give request

export const server = setupServer(...handlers);