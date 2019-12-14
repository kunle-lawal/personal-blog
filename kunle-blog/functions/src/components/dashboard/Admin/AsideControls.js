"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AsideControls =
/*#__PURE__*/
function (_Component) {
  _inherits(AsideControls, _Component);

  function AsideControls() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AsideControls);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AsideControls)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      options: {
        tags: [],
        categories: [],
        public: false
      },
      openDropdown: false
    });

    _defineProperty(_assertThisInitialized(_this), "toggleDropdown", function () {
      _this.setState({
        openDropdown: !_this.state.openDropdown
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleCategories", function (e) {
      var categories = _this.state.options.categories;

      if (categories.includes(e.target.id)) {
        categories = categories.filter(function (cats) {
          return cats !== e.target.id;
        });
        document.getElementById(e.target.id).classList.remove('highlight');

        _this.setState({
          options: _objectSpread({}, _this.state.options, {
            categories: categories
          })
        });
      } else {
        document.getElementById(e.target.id).classList.add('highlight');
        categories.push(e.target.id);

        _this.setState({
          options: _objectSpread({}, _this.state.options, {
            categories: categories
          })
        });
      }

      _this.props.snedOptions(_this.state.options);
    });

    _defineProperty(_assertThisInitialized(_this), "handleTags", function (e) {
      var tags = e.target.value;
      tags = tags.split(',');

      _this.setState({
        options: _objectSpread({}, _this.state.options, {
          tags: tags
        })
      });

      _this.props.snedOptions(_this.state.options);
    });

    _defineProperty(_assertThisInitialized(_this), "togglePrivacy", function () {
      console.log(_this.state.options.public);

      _this.setState({
        options: _objectSpread({}, _this.state.options, {
          public: !_this.state.options.public
        })
      });

      _this.props.snedOptions(_this.state.options);
    });

    return _this;
  }

  _createClass(AsideControls, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var topics = ['Technology', 'Engineering', 'Art', 'Math', 'Misc', 'Tech News', 'Money', 'Education', 'Science', 'Steam', 'Stem', 'Jobs', 'react'];
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
        className: "input-fields aside-item"
      }, _react.default.createElement("div", {
        className: "input-field categories"
      }, _react.default.createElement("div", {
        id: "dropdown",
        className: "dropdown"
      }, _react.default.createElement("h4", {
        className: "noselect",
        onClick: this.toggleDropdown
      }, "Pick a Categories ", _react.default.createElement("i", {
        className: "material-icons icon",
        onClick: this.toggleModuleSelect
      }, this.state.openDropdown ? 'keyboard_arrow_up' : 'keyboard_arrow_down')), _react.default.createElement("div", {
        className: "dropdown_content " + (this.state.openDropdown ? 'open_dropdown_content' : '')
      }, topics.map(function (topic, id) {
        return _react.default.createElement("p", {
          id: topic,
          key: id,
          className: "dropdown_item noselect",
          onClick: _this2.handleCategories
        }, topic);
      })), _react.default.createElement("div", {
        className: "display_categories"
      }, this.state.options.categories.map(function (cat, id) {
        return _react.default.createElement("span", {
          key: id
        }, cat);
      }))))), _react.default.createElement("div", {
        className: "add_tag aside-item"
      }, _react.default.createElement("h4", null, "Add Tags"), _react.default.createElement("input", {
        type: "text",
        className: "add_tags",
        id: "tags",
        onChange: this.handleTags
      }), _react.default.createElement("div", {
        className: "display_tags"
      }, this.state.options.tags.map(function (tag, id) {
        return tag.length > 1 ? _react.default.createElement("span", {
          key: id
        }, tag) : null;
      }))), _react.default.createElement("div", {
        className: "visibility aside-item"
      }, _react.default.createElement("h4", {
        className: ""
      }, "Visiblity ", _react.default.createElement("span", {
        className: "noselect btn-flat " + (this.state.options.public ? 'public' : 'private'),
        onClick: this.togglePrivacy
      }, this.state.options.public ? "Public" : "Private"))));
    }
  }]);

  return AsideControls;
}(_react.Component);

var _default = AsideControls;
exports.default = _default;