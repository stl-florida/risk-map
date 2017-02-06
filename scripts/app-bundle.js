define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.title = 'RISKmap';
      config.options.pushState = true;
      config.options.root = '/';
      config.map([{ route: ['', 'home'], name: 'home', moduleId: 'routes/landing/landing' }]);
      config.mapUnknownRoutes({ redirect: 'home' });
      this.router = router;
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    longStackTraces: _environment2.default.debug,
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('routes/landing/landing',['exports', 'mapbox-gl'], function (exports, _mapboxGl) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Landing = undefined;

  var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Landing = exports.Landing = function () {
    function Landing() {
      _classCallCheck(this, Landing);
    }

    Landing.prototype.attached = function attached() {
      _mapboxGl2.default.accessToken = 'pk.eyJ1IjoiYXNiYXJ2ZSIsImEiOiI4c2ZpNzhVIn0.A1lSinnWsqr7oCUo0UMT7w';
      this.map = new _mapboxGl2.default.Map({
        container: 'mapContainer',
        center: [-80.25, 26.00],
        zoom: 10,
        style: 'mapbox://styles/mapbox/dark-v9',
        hash: false
      });
    };

    return Landing;
  }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./app.css\"></require>\n  <router-view></router-view>\n</template>\n"; });
define('text!routes/landing/landing.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./landing.css\"></require>\n  <require from=\"mapbox-gl/mapbox-gl.css\"></require>\n  <div id=\"mapContainer\">\n  </div>\n</template>\n"; });
define('text!app.css', ['module'], function(module) { module.exports = "body,\nhtml {\n  background-color: black;\n  width: 100%;\n  height: 100%;\n  margin: 0px;\n  padding: 0px;\n  overflow: hidden;\n}\n"; });
define('text!routes/landing/landing.css', ['module'], function(module) { module.exports = "#mapContainer {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}\n"; });
define('text!styles/themeGuide.css', ['module'], function(module) { module.exports = ""; });
//# sourceMappingURL=app-bundle.js.map