"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactQuill = _interopRequireDefault(require("react-quill"));

var _AsideControls = _interopRequireDefault(require("./AsideControls"));

var _postStateAction = require("../../../store/actions/postStateAction");

var _uploadActions = require("../../../store/actions/uploadActions");

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _reactReduxFirebase = require("react-redux-firebase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

//DISCLAIMER ADDING ANOTHER STATE CHANGE WILL BREAK THE WAY REFRESHING THE PAGE WORKS.//
var PostEditor =
/*#__PURE__*/
function (_Component) {
  _inherits(PostEditor, _Component);

  function PostEditor() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PostEditor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PostEditor)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      theme: 'snow',
      value: 'Start Typing...',
      moduleIsOpen: false,
      changesSaved: false,
      currentId: 0,
      allContent: [],
      editors: [],
      editorContents: [],
      modules: [],
      post: {
        title: '',
        content: '',
        options: {},
        totalPosts: _this.props.totalPosts ? _this.props.totalPosts[0].totalPosts : 0
      }
    });

    _defineProperty(_assertThisInitialized(_this), "formats", {
      header: ['header', 'link', 'align', 'clean'],
      paragraph: ['bold', 'italic', 'underline', 'strike', 'link', 'list', 'bullet', 'indent', 'link', 'align', 'color', 'background', 'clean'],
      quote: ['blockquote'],
      image: ['image'],
      code: ['code']
    });

    _defineProperty(_assertThisInitialized(_this), "modules", {
      header: {
        toolbar: [[{
          'header': '1'
        }, {
          'header': '2'
        }], ['link', {
          'align': []
        }], ['clean']]
      },
      paragraph: {
        toolbar: [['bold', 'italic', 'underline', 'strike', 'link'], [{
          'list': 'ordered'
        }, {
          'list': 'bullet'
        }], [{
          'indent': '+1'
        }, {
          'indent': '-1'
        }], ['link', {
          'align': []
        }], [{
          'color': []
        }, {
          'background': []
        }], ['clean']]
      },
      quote: {
        toolbar: [['blockquote'], ['link', {
          'align': []
        }], ['clean']]
      },
      image: {
        toolbar: [['image']]
      },
      code: {
        toolbar: [['code']]
      }
    });

    _defineProperty(_assertThisInitialized(_this), "toggleModuleSelect", function (e) {
      _this.setState({
        moduleToOpen: (e ? e.target : false) ? e.target.id : _this.state.moduleToOpen,
        moduleIsOpen: !_this.state.moduleIsOpen
      });
    });

    _defineProperty(_assertThisInitialized(_this), "savePost", function () {
      if (_this.state.changesSaved) {
        return 0;
      }

      var title = document.querySelector('#title').children[0].children[1].children[0].innerHTML;
      var content = '';

      for (var i = 0; i < _this.state.editors.length; i++) {
        content += _this.state.editors[i] !== '' ? document.querySelector('#' + _this.state.editors[i]).children[1].children[1].children[0].innerHTML : '';
      }

      console.log(content);

      _this.setState({
        changesSaved: true,
        post: _objectSpread({}, _this.state.post, {
          title: title,
          content: content,
          totalPosts: _this.props.totalPosts[0].totalPosts
        })
      });
    });

    _defineProperty(_assertThisInitialized(_this), "submitPost", function () {
      _this.savePost();

      _this.props.createPost(_this.state.post);

      console.log('Posted');
    });

    _defineProperty(_assertThisInitialized(_this), "addModule", function (moduleToAdd) {
      if (moduleToAdd === 'line') {
        var line = _react.default.createElement("hr", {
          className: "line"
        });

        _this.setState({
          changesSaved: false,
          editors: [].concat(_toConsumableArray(_this.state.editors), [moduleToAdd + '' + _this.state.editors.length]),
          modules: [].concat(_toConsumableArray(_this.state.modules), [[line, 'line']])
        });

        return;
      }

      var placeholder = "Add " + moduleToAdd;

      var id = _this.state.modules.length.toString();

      var module = [_react.default.createElement(_reactQuill.default, {
        theme: _this.state.theme,
        modules: _this.modules[moduleToAdd],
        placeholder: placeholder,
        formats: _this.formats.moduleToAdd,
        onChange: _this.trackContent,
        onKeyPress: _this.trackId,
        onBlur: _this.unTrackId,
        id: id
      }), moduleToAdd];

      _this.setState({
        changesSaved: false,
        editors: [].concat(_toConsumableArray(_this.state.editors), [moduleToAdd + '' + _this.state.editors.length]),
        modules: [].concat(_toConsumableArray(_this.state.modules), [module])
      });

      _this.toggleModuleSelect();
    });

    _defineProperty(_assertThisInitialized(_this), "deleteModule", function (e) {
      var modules = _this.state.modules;
      var editors = _this.state.editors;
      var allContent = _this.state.allContent;
      var id = Number(e.target.id);
      modules.splice(id, 1, '');
      editors.splice(id, 1, '');
      allContent.splice(id, 1, ''); // let filtered_modules = modules.filter((value, index) => {
      //     // console.log(index, id);
      //     return index !== id;
      // })
      // let filtered_editors = editors.filter((value, index) => {
      //     // console.log(index, id);
      //     return index !== id
      // })

      var elem = document.querySelector("#\\3" + e.target.id);
      console.log(elem);
      elem.parentElement.parentNode.removeChild(elem.parentElement);

      _this.setState({
        editors: editors,
        modules: modules,
        allContent: allContent
      }); // document.querySelector("#\\31 2wow")
      // console.log(this.state.editors)

    });

    _defineProperty(_assertThisInitialized(_this), "changesMade", function () {
      _this.setState({
        changesSaved: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "trackId", function (e) {
      var currentId = Number(e.target.parentElement.parentElement.id);
      console.log(e.target.id);

      _this.setState({
        currentId: currentId,
        makingChanges: true,
        changesSaved: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "unTrackId", function () {
      _this.setState({
        makingChanges: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "trackContent", function (content, delta, source, editor) {
      if (!_this.state.makingChanges) {
        return false;
      }

      var modules = _this.state.modules;
      var allContent = _this.state.allContent; // console.log(modules);

      var thisModule = modules[_this.state.currentId][0];
      var moduleToAdd = modules[_this.state.currentId][1];
      var placeholder = "Add " + moduleToAdd;
      var newModule = [_react.default.createElement(_reactQuill.default, {
        theme: _this.state.theme,
        modules: _this.modules[moduleToAdd],
        placeholder: placeholder,
        formats: _this.formats.moduleToAdd,
        onChange: _this.trackContent,
        onKeyPress: _this.trackId,
        onBlur: _this.unTrackId,
        value: editor.getHTML(),
        id: thisModule.props.id
      }), moduleToAdd];
      modules.splice(_this.state.currentId, 1, newModule);
      allContent.splice(_this.state.currentId, 1, editor.getHTML()); // console.log(modules);

      _this.setState({
        allContent: allContent,
        modules: modules,
        changesSaved: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "uploadImage", function (url) {
      console.log('upload');
    });

    _defineProperty(_assertThisInitialized(_this), "getAsideOptions", function (options) {
      _this.setState({
        post: _objectSpread({}, _this.state.post, {
          options: options
        })
      });
    });

    return _this;
  }

  _createClass(PostEditor, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var modules = this.state.modules;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
        className: "top_rack"
      }, _react.default.createElement(AddModule, {
        state: this.state,
        toggleModuleSelect: this.toggleModuleSelect,
        addModule: this.addModule,
        placement: 'toprack'
      }), _react.default.createElement("div", {
        className: "save_submit"
      }, _react.default.createElement("div", {
        className: 'save_changes btn-flat waves-effect' + (this.state.changesSaved ? ' changes_saved' : ''),
        onClick: this.savePost
      }, this.state.changesSaved ? 'Changes Saved' : 'Save Changes'), _react.default.createElement("div", {
        className: "submit_changes btn-flat waves-effect " + (this.state.changesSaved ? "" : "display_none"),
        onClick: this.submitPost
      }, "Publish")), _react.default.createElement("div", {
        className: "delete_post aside-item btn-flat noselect"
      }, "Delete Post")), _react.default.createElement("div", {
        className: "content_control"
      }, _react.default.createElement("div", {
        id: "postEditor",
        className: "postEditor"
      }, _react.default.createElement("div", {
        className: "module_block title header",
        id: "title"
      }, _react.default.createElement(_reactQuill.default, {
        theme: this.state.theme,
        placeholder: 'Add Title',
        modules: this.modules['header'],
        onKeyPress: this.changesMade,
        onBlur: this.unTrackId
      })), modules.length > 0 && modules.map(function (module, index) {
        return _react.default.createElement("div", {
          className: "module_block " + module[1],
          key: index,
          id: module[1] + '' + index
        }, _react.default.createElement("i", {
          id: index,
          className: "far fa-trash-alt remove_module",
          onClick: _this2.deleteModule
        }), module[0]);
      }), _react.default.createElement(AddModule, {
        state: this.state,
        toggleModuleSelect: this.toggleModuleSelect,
        addModule: this.addModule,
        placement: 'content'
      })), _react.default.createElement("aside", null, _react.default.createElement(_AsideControls.default, {
        snedOptions: this.getAsideOptions
      }))));
    }
  }]);

  return PostEditor;
}(_react.Component);

var AddModule = function AddModule(props) {
  return _react.default.createElement("div", {
    className: "addModule_container _" + props.placement
  }, _react.default.createElement("div", {
    className: " add_module " + props.placement
  }, _react.default.createElement("i", {
    id: props.placement,
    className: "material-icons icon",
    onClick: props.toggleModuleSelect
  }, props.state.moduleIsOpen ? 'close' : 'add')), _react.default.createElement("div", {
    className: "block_select_container " + (props.state.moduleIsOpen ? "open_blocks_select_" : "") + props.state.moduleToOpen
  }, _react.default.createElement("div", {
    className: "blocks_select"
  }, _react.default.createElement("div", {
    className: "block_type",
    onClick: function onClick() {
      props.addModule("paragraph");
    }
  }, _react.default.createElement("i", {
    className: "fas fa-paragraph"
  }), _react.default.createElement("p", null, "Paragraph")), _react.default.createElement("div", {
    className: "block_type",
    onClick: function onClick() {
      props.addModule("header");
    }
  }, _react.default.createElement("span", null, "T"), _react.default.createElement("p", null, "Heading")), _react.default.createElement("div", {
    className: "block_type",
    onClick: function onClick() {
      props.addModule("quote");
    }
  }, _react.default.createElement("i", {
    className: "fas fa-quote-left"
  }), _react.default.createElement("p", null, "Quote")), _react.default.createElement("div", {
    className: "block_type",
    onClick: function onClick() {
      props.addModule("image");
    }
  }, _react.default.createElement("i", {
    className: "fas fa-image"
  }), _react.default.createElement("p", null, "Image")), _react.default.createElement("div", {
    className: "block_type",
    onClick: function onClick() {
      props.addModule("code");
    }
  }, _react.default.createElement("i", {
    className: "fas fa-code"
  }), _react.default.createElement("p", null, "Code")), _react.default.createElement("div", {
    className: "block_type",
    onClick: function onClick() {
      props.addModule("line");
    }
  }, _react.default.createElement("span", null, "-"), _react.default.createElement("p", null, "Separator")))));
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    createPost: function createPost(post, ids) {
      return dispatch((0, _postStateAction.createPost)(post, ids));
    },
    uploadImage: function uploadImage(url) {
      return dispatch((0, _uploadActions.uploadImage)(url));
    }
  };
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    totalPosts: state.firestore.ordered.totalItems
  };
};

var _default = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _reactReduxFirebase.firestoreConnect)(function (props, dispatch) {
  return [{
    collection: 'totalItems'
  }];
}))(PostEditor);

exports.default = _default;