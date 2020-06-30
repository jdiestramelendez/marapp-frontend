module.exports = {
  files: ["./src/icon-font/icons/*.svg"],
  dest: "./icons",
  scssFile: true,
  css: false,
  normalize: true,
  optimize: false,
  startCodepoint: 0xf000,
  embed: ["woff2", "woff"],
  fontName: "icon-font",
  classPrefix: "ng-icon-",
  baseSelector: "ng-icon",
  codepoints: {
    add: 61442,
    alarmbell: 61443,
    audioloud: 61458,
    audiomute: 61459,
    boxarrowne: 61462,
    bullet: 61463,
    close: 61475,
    "danger-circle": 61481,
    directiondown: 61482,
    directionleft: 61483,
    directionright: 61484,
    directionup: 61485,
    geolocate: 61500,
    lightclose: 61523,
    lightdirectiondown: 61524,
    lightdirectionleft: 61525,
    lightdirectionright: 61526,
    lightdirectionup: 61527,
    menu: 61537,
    "minus-square-o": 61538,
    "plus-square-o": 61548,
    remove: 61552,
    search: 61553,
    spinner: 61556,
    video: 61566,
    layers: 61592,
    "check-circle": 61440,
    "drag-vertical": 61441,
    "eye-off-outline": 61444,
    "eye-outline": 61445,
    "info-circle": 61446,
    opacity: 61447,
    zoomin: 61448,
    zoomout: 61449,
    check: 61450,
  },
  types: ["woff2", "woff"],
  fixedWidth: true,
  cssTemplate: "./src/icon-font/icon-fonts.template.css.hbs",
};
