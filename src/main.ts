import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './styles/globals.css';

import './styles/navbar.css';
import './styles/home.css';
import './styles/user-profile.css';
import './styles/repo-detail.css';

import { initRouter } from './router';

const app = document.querySelector<HTMLDivElement>('#app')!;
initRouter(app);
