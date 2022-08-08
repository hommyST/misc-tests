// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"script.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
* Создать по 2 инпута для Х и У для каждой точки+++
* ползунок скорость игры+++++++++
* Кнопку старт+++++++
* 
* Отображение текущего "броска кубика"++++
* 
* отрисовать точки по старту++++
* придумать функцию "бросок кубика"++
* придумать функцию отрисовки точки++
* начать бросать кубик и отрисовывать новую точку точку++
* скорость изменения анимации по ползунку+++
* 
* -придумать что-нибудь с цветами точек
*/
var canvas = document.querySelector('#canv_1');
var ctx = canvas.getContext('2d');
var controlToggle = document.querySelector('#controlToggle');
var startBtn = document.querySelector('#gameStart');
var rndBtn = document.querySelector('#rndCoord');
var speedRng = document.querySelector('#gameSpeed');
var resetBtn = document.querySelector('#gameReset');
var outDisplay = document.querySelector('#display');
var fpsInterval, startTime, now, then, difTime;
var fps = 10;
var stopAnim = false;
var startDots = []; //x1,y1,x2,y2,x3,y3

var currentDot;
startBtn.addEventListener('click', start);
rndBtn.addEventListener('click', randomStartDots);
resetBtn.addEventListener('click', resetGame);
speedRng.addEventListener('change', changeSpeed);
controlToggle.addEventListener('click', function () {
  controlToggle.parentElement.classList.toggle('hide');
});

function startAnimating() {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}

function animate() {
  if (!stopAnim) requestAnimationFrame(animate);
  now = Date.now();
  difTime = now - then;

  if (difTime > fpsInterval) {
    then = now - difTime % fpsInterval;
    addDot();
    drowStartDots();
  }
}

function start() {
  startDots = _toConsumableArray(document.querySelectorAll('.coord-inputs input[type="number"]')).map(function (el) {
    return +el.value;
  });
  if (startDots.every(function (el) {
    return el === 0;
  })) return;
  fps = +speedRng.value;
  drowStartDots();
  changeStartBtn();
  startAnimating();
}

function resetGame() {
  if (!stopAnim) return;
  stopAnim = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setTimeout(function () {
    stopAnim = false; // if (startDots.length > 0) startAnimating()
  }, 50);
}

function drowStartDots() {
  var size = 6;
  var textShift = 10; // ctx.fillStyle = 'hsl(78, 76%, 41%)'

  ctx.fillStyle = '#E8EAED';
  ctx.fillRect(startDots[0], startDots[1], size, size);
  ctx.fillText('A', startDots[0] - textShift, startDots[1]); // ctx.fillStyle = 'hsl(275, 71%, 35%)'

  ctx.fillRect(startDots[2], startDots[3], size, size);
  ctx.fillText('B', startDots[2] - textShift, startDots[3]); // ctx.fillStyle = 'hsl(275, 71%, 20%)'

  ctx.fillRect(startDots[4], startDots[5], size, size);
  ctx.fillText('C', startDots[4] + textShift, startDots[5]);
}

function randomStartDots() {
  var x1 = document.querySelector('#x1');
  var x2 = document.querySelector('#x2');
  var x3 = document.querySelector('#x3');
  var y1 = document.querySelector('#y1');
  var y2 = document.querySelector('#y2');
  var y3 = document.querySelector('#y3');
  var speed = document.querySelector('#gameSpeed');
  x1.value = rndInt(100, 200);
  x2.value = rndInt(10, 70);
  x3.value = rndInt(200, 290);
  y1.value = rndInt(10, 70);
  y2.value = rndInt(350, 490);
  y3.value = rndInt(350, 490);
  speed.value = rndInt(10, 90);
}

function addDot() {
  var bone = rndInt(1, 3);
  if (!currentDot) currentDot = startDots.slice(2, 4);
  var x1 = currentDot[0];
  var y1 = currentDot[1];
  var x2, y2, x, y;
  var size = 4;
  ctx.fillStyle = getcolor();
  ctx.fillRect(x1, y1, size, size);

  switch (bone) {
    case 1:
      x2 = startDots[0];
      y2 = startDots[1];
      x = mathCoord(x1, x2);
      y = mathCoord(y1, y2);
      currentDot[0] = x;
      currentDot[1] = y;
      outDisplay.textContent = 'A';
      break;

    case 2:
      x2 = startDots[2];
      y2 = startDots[3];
      x = mathCoord(x1, x2);
      y = mathCoord(y1, y2);
      currentDot[0] = x;
      currentDot[1] = y;
      outDisplay.textContent = 'B';
      break;

    case 3:
      x2 = startDots[4];
      y2 = startDots[5];
      x = mathCoord(x1, x2);
      y = mathCoord(y1, y2);
      currentDot[0] = x;
      currentDot[1] = y;
      outDisplay.textContent = 'C';
      break;

    default:
      break;
  }

  ctx.fillStyle = 'white';
  ctx.fillRect(x, y, size, size);

  function mathCoord(n1, n2) {
    var n;

    if (n2 >= n1) {
      n = n2 - (n2 - n1) / 2;
    } else {
      n = n1 - (n1 - n2) / 2;
    }

    return n;
  }
}

function changeStartBtn() {
  if (startBtn.classList.contains('pause')) {
    startBtn.textContent = 'старт';
    stopAnim = true;
  } else {
    startBtn.textContent = 'стоп';
    stopAnim = false;
  }

  startBtn.classList.toggle('pause');
}

function changeSpeed() {
  stopAnim = true;
  fps = +speedRng.value;
  setTimeout(function () {
    stopAnim = false;
    if (startDots.length > 0) startAnimating();
  }, 50);
}

function getcolor() {
  var hue, sat;
  if (currentDot[0] < canvas.width) hue = rndInt(30, 60);
  if (currentDot[0] < canvas.width / 2 + canvas.width / 4) hue = rndInt(90, 180);
  if (currentDot[0] < canvas.width / 2) hue = rndInt(200, 280);
  if (currentDot[0] < canvas.width / 4) hue = rndInt(300, 340);
  if (currentDot[1] < canvas.height) sat = '30%';
  if (currentDot[1] < canvas.height / 2 + canvas.height / 4) sat = '50%';
  if (currentDot[1] < canvas.height / 2) sat = '70%';
  if (currentDot[1] < canvas.height / 4) sat = '100%';
  return "hsl(".concat(hue, ", ").concat(sat, ", 55%)");
} // UTILS


function rndInt(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
},{}],"C:/Users/hommy/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51595" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/hommy/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map