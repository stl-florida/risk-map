import env from 'environment';

export class App {
  configureRouter(config, router) {
    config.title = 'RISKmap';
    config.options.pushState = true;
    config.options.root = env.root;
    config.map([
      {route: ['', 'home'],   name: 'home',  moduleId: 'routes/landing/landing'},
    ]);
    config.mapUnknownRoutes({redirect: 'home'});
    this.router = router;
  }
}
