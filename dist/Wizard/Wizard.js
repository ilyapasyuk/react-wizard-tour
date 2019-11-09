"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var styles = {
  wizard: {
    width: 226,
    minHeight: 100,
    backgroundColor: 'white',
    padding: 10,
    border: '1px solid #d9d9d9',
    boxShadow: '0 3px 8px 0 rgba(0,0,0,.15)',
    transform: 'translate(22px, -50px)',
    zIndex: 2,
    position: 'relative'
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 10,
    padding: 0,
    cursor: 'pointer',
    color: 'grey',
    border: 0,
    outline: 'none',
    background: 'transparent'
  },
  footer: {
    padding: '10px 0 0',
    textAlign: 'right'
  },
  title: {
    marginBottom: 8,
    letterSpacing: 'normal',
    color: '#000000',
    fontSize: 14,
    fontWeight: 600,
    fontStyle: 'normal'
  },
  description: {
    marginBottom: 15,
    color: '#4d4d4d',
    fontSize: 12,
    lineHeight: 1.25
  },
  info: {
    display: 'flex',
    width: '87%',
    marginBottom: 10,
    alignItems: 'center'
  },
  stepsCount: {
    width: '35%',
    fontSize: 12
  },
  pin: {
    position: 'absolute',
    zIndex: 2,
    width: 15,
    height: 15,
    borderRadius: 50,
    background: '#1787fc',
    boxShadow: '0 0 0 2px white',
    top: '-7px',
    left: '-7px'
  },
  pinLine: {
    height: 1,
    width: 25,
    top: 1,
    position: 'absolute',
    zIndex: 1,
    background: '#1787fc'
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 300,
    cursor: 'pointer',
    height: 32,
    lineHeight: '32px',
    padding: '0 16px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    border: 0,
    borderRadius: 3,
    outline: 'none',
    backgroundColor: '#0084ff',
    color: '#fff',
    fontSize: 14,
    marginLeft: 10
  }
};
var defaultPrevButtonTitle = 'Prev';
var defaultNextButtonTitle = 'Next';

var Wizard = function Wizard(props) {
  var isShow = props.isShow,
      rule = props.rule,
      _props$defaultStepNum = props.defaultStepNumber,
      defaultStepNumber = _props$defaultStepNum === void 0 ? 0 : _props$defaultStepNum,
      _props$prevButtonTitl = props.prevButtonTitle,
      prevButtonTitle = _props$prevButtonTitl === void 0 ? defaultPrevButtonTitle : _props$prevButtonTitl,
      _props$nextButtonTitl = props.nextButtonTitle,
      nextButtonTitle = _props$nextButtonTitl === void 0 ? defaultNextButtonTitle : _props$nextButtonTitl;

  var _useState = (0, _react.useState)(isShow),
      _useState2 = _slicedToArray(_useState, 2),
      isShowState = _useState2[0],
      setShow = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      transition = _useState4[0],
      setTransition = _useState4[1];

  var _useState5 = (0, _react.useState)(undefined),
      _useState6 = _slicedToArray(_useState5, 2),
      position = _useState6[0],
      setPosition = _useState6[1];

  var _useState7 = (0, _react.useState)(defaultStepNumber),
      _useState8 = _slicedToArray(_useState7, 2),
      currentStepNumber = _useState8[0],
      setCurrentStepNumber = _useState8[1];

  var currentStepContent = getStep(currentStepNumber, rule);

  var wrapperStyle = _objectSpread({
    position: 'absolute',
    zIndex: 99,
    transition: transition
  }, position);

  (0, _react.useEffect)(function () {
    setPosition(getCoords(getStep(currentStepNumber, rule).elementId));
  }, []);

  function onStepButtonClick(stepNumber) {
    setCurrentStepNumber(stepNumber);
    setPosition(getCoords(getStep(stepNumber, rule).elementId));
    setTransition('all 100ms ease');
  }

  if (!isShowState || !position) {
    return null;
  }

  return _react["default"].createElement("div", {
    style: wrapperStyle
  }, _react["default"].createElement("div", {
    style: styles.wizard
  }, _react["default"].createElement("button", {
    onClick: function onClick() {
      return setShow(false);
    },
    style: styles.closeButton
  }, "X"), _react["default"].createElement("div", {
    style: styles.info
  }, _react["default"].createElement("div", {
    style: styles.stepsCount
  }, currentStepNumber + 1, " of ", rule.length)), _react["default"].createElement("div", {
    dangerouslySetInnerHTML: {
      __html: currentStepContent.title
    },
    style: styles.title
  }), _react["default"].createElement("div", {
    dangerouslySetInnerHTML: {
      __html: currentStepContent.description
    },
    style: styles.description
  }), _react["default"].createElement("div", {
    style: styles.footer
  }, currentStepNumber !== 0 && _react["default"].createElement("button", {
    onClick: function onClick() {
      return onStepButtonClick(currentStepNumber - 1);
    },
    style: styles.button
  }, prevButtonTitle), _react["default"].createElement("button", {
    onClick: function onClick() {
      return onStepButtonClick(currentStepNumber + 1);
    },
    disabled: currentStepNumber + 1 === rule.length,
    style: styles.button
  }, nextButtonTitle))), _react["default"].createElement("div", {
    style: styles.pin
  }), _react["default"].createElement("div", {
    style: styles.pinLine
  }));
};

function getStep(stepNumber, rules) {
  return rules[stepNumber];
}

function getCoords(elementId) {
  var element = document.getElementById(elementId);
  var coordinates = element.getBoundingClientRect();
  return {
    top: coordinates.top + coordinates.height / 2,
    left: coordinates.left + coordinates.width
  };
}

var _default = Wizard;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9XaXphcmQvV2l6YXJkLmpzIl0sIm5hbWVzIjpbInN0eWxlcyIsIndpemFyZCIsIndpZHRoIiwibWluSGVpZ2h0IiwiYmFja2dyb3VuZENvbG9yIiwicGFkZGluZyIsImJvcmRlciIsImJveFNoYWRvdyIsInRyYW5zZm9ybSIsInpJbmRleCIsInBvc2l0aW9uIiwiY2xvc2VCdXR0b24iLCJ0b3AiLCJyaWdodCIsImN1cnNvciIsImNvbG9yIiwib3V0bGluZSIsImJhY2tncm91bmQiLCJmb290ZXIiLCJ0ZXh0QWxpZ24iLCJ0aXRsZSIsIm1hcmdpbkJvdHRvbSIsImxldHRlclNwYWNpbmciLCJmb250U2l6ZSIsImZvbnRXZWlnaHQiLCJmb250U3R5bGUiLCJkZXNjcmlwdGlvbiIsImxpbmVIZWlnaHQiLCJpbmZvIiwiZGlzcGxheSIsImFsaWduSXRlbXMiLCJzdGVwc0NvdW50IiwicGluIiwiaGVpZ2h0IiwiYm9yZGVyUmFkaXVzIiwibGVmdCIsInBpbkxpbmUiLCJidXR0b24iLCJqdXN0aWZ5Q29udGVudCIsIndoaXRlU3BhY2UiLCJ1c2VyU2VsZWN0IiwibWFyZ2luTGVmdCIsImRlZmF1bHRQcmV2QnV0dG9uVGl0bGUiLCJkZWZhdWx0TmV4dEJ1dHRvblRpdGxlIiwiV2l6YXJkIiwicHJvcHMiLCJpc1Nob3ciLCJydWxlIiwiZGVmYXVsdFN0ZXBOdW1iZXIiLCJwcmV2QnV0dG9uVGl0bGUiLCJuZXh0QnV0dG9uVGl0bGUiLCJpc1Nob3dTdGF0ZSIsInNldFNob3ciLCJ0cmFuc2l0aW9uIiwic2V0VHJhbnNpdGlvbiIsInVuZGVmaW5lZCIsInNldFBvc2l0aW9uIiwiY3VycmVudFN0ZXBOdW1iZXIiLCJzZXRDdXJyZW50U3RlcE51bWJlciIsImN1cnJlbnRTdGVwQ29udGVudCIsImdldFN0ZXAiLCJ3cmFwcGVyU3R5bGUiLCJnZXRDb29yZHMiLCJlbGVtZW50SWQiLCJvblN0ZXBCdXR0b25DbGljayIsInN0ZXBOdW1iZXIiLCJsZW5ndGgiLCJfX2h0bWwiLCJydWxlcyIsImVsZW1lbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY29vcmRpbmF0ZXMiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLE1BQU0sR0FBRztBQUNYQyxFQUFBQSxNQUFNLEVBQUU7QUFDSkMsSUFBQUEsS0FBSyxFQUFFLEdBREg7QUFFSkMsSUFBQUEsU0FBUyxFQUFFLEdBRlA7QUFHSkMsSUFBQUEsZUFBZSxFQUFFLE9BSGI7QUFJSkMsSUFBQUEsT0FBTyxFQUFFLEVBSkw7QUFLSkMsSUFBQUEsTUFBTSxFQUFFLG1CQUxKO0FBTUpDLElBQUFBLFNBQVMsRUFBRSw2QkFOUDtBQU9KQyxJQUFBQSxTQUFTLEVBQUUsd0JBUFA7QUFRSkMsSUFBQUEsTUFBTSxFQUFFLENBUko7QUFTSkMsSUFBQUEsUUFBUSxFQUFFO0FBVE4sR0FERztBQVlYQyxFQUFBQSxXQUFXLEVBQUU7QUFDVEQsSUFBQUEsUUFBUSxFQUFFLFVBREQ7QUFFVEUsSUFBQUEsR0FBRyxFQUFFLENBRkk7QUFHVEMsSUFBQUEsS0FBSyxFQUFFLEVBSEU7QUFJVFIsSUFBQUEsT0FBTyxFQUFFLENBSkE7QUFLVFMsSUFBQUEsTUFBTSxFQUFFLFNBTEM7QUFNVEMsSUFBQUEsS0FBSyxFQUFFLE1BTkU7QUFPVFQsSUFBQUEsTUFBTSxFQUFFLENBUEM7QUFRVFUsSUFBQUEsT0FBTyxFQUFFLE1BUkE7QUFTVEMsSUFBQUEsVUFBVSxFQUFFO0FBVEgsR0FaRjtBQXVCWEMsRUFBQUEsTUFBTSxFQUFFO0FBQ0piLElBQUFBLE9BQU8sRUFBRSxVQURMO0FBRUpjLElBQUFBLFNBQVMsRUFBRTtBQUZQLEdBdkJHO0FBMkJYQyxFQUFBQSxLQUFLLEVBQUU7QUFDSEMsSUFBQUEsWUFBWSxFQUFFLENBRFg7QUFFSEMsSUFBQUEsYUFBYSxFQUFFLFFBRlo7QUFHSFAsSUFBQUEsS0FBSyxFQUFFLFNBSEo7QUFJSFEsSUFB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QUEwQlYsSUFBSSxDQUFDbUIsTUFGN0M7QUFHSSxJQUFBLEtBQUssRUFBRWxFLE1BQU0sQ0FBQ3FDO0FBSGxCLEtBS0thLGVBTEwsQ0FWSixDQXJCSixDQURKLEVBeUNJO0FBQUssSUFBQSxLQUFLLEVBQUVsRCxNQUFNLENBQUNnQztBQUFuQixJQXpDSixFQTBDSTtBQUFLLElBQUEsS0FBSyxFQUFFaEMsTUFBTSxDQUFDb0M7QUFBbkIsSUExQ0osQ0FESjtBQThDSCxDQWxGRDs7QUFvRkEsU0FBU3dCLE9BQVQsQ0FBaUJLLFVBQWpCLEVBQTZCRyxLQUE3QixFQUFvQztBQUNoQyxTQUFPQSxLQUFLLENBQUNILFVBQUQsQ0FBWjtBQUNIOztBQUVELFNBQVNILFNBQVQsQ0FBbUJDLFNBQW5CLEVBQThCO0FBQzFCLE1BQU1NLE9BQU8sR0FBR0MsUUFBUSxDQUFDQyxjQUFULENBQXdCUixTQUF4QixDQUFoQjtBQUNBLE1BQU1TLFdBQVcsR0FBR0gsT0FBTyxDQUFDSSxxQkFBUixFQUFwQjtBQUVBLFNBQU87QUFDSDdELElBQUFBLEdBQUcsRUFBRTRELFdBQVcsQ0FBQzVELEdBQVosR0FBa0I0RCxXQUFXLENBQUN2QyxNQUFaLEdBQXFCLENBRHpDO0FBRUhFLElBQUFBLElBQUksRUFBRXFDLFdBQVcsQ0FBQ3JDLElBQVosR0FBbUJxQyxXQUFXLENBQUN0RTtBQUZsQyxHQUFQO0FBSUg7O2VBRWMwQyxNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCdcblxuY29uc3Qgc3R5bGVzID0ge1xuICAgIHdpemFyZDoge1xuICAgICAgICB3aWR0aDogMjI2LFxuICAgICAgICBtaW5IZWlnaHQ6IDEwMCxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnd2hpdGUnLFxuICAgICAgICBwYWRkaW5nOiAxMCxcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNkOWQ5ZDknLFxuICAgICAgICBib3hTaGFkb3c6ICcwIDNweCA4cHggMCByZ2JhKDAsMCwwLC4xNSknLFxuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoMjJweCwgLTUwcHgpJyxcbiAgICAgICAgekluZGV4OiAyLFxuICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICB9LFxuICAgIGNsb3NlQnV0dG9uOiB7XG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICB0b3A6IDgsXG4gICAgICAgIHJpZ2h0OiAxMCxcbiAgICAgICAgcGFkZGluZzogMCxcbiAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgICAgIGNvbG9yOiAnZ3JleScsXG4gICAgICAgIGJvcmRlcjogMCxcbiAgICAgICAgb3V0bGluZTogJ25vbmUnLFxuICAgICAgICBiYWNrZ3JvdW5kOiAndHJhbnNwYXJlbnQnLFxuICAgIH0sXG4gICAgZm9vdGVyOiB7XG4gICAgICAgIHBhZGRpbmc6ICcxMHB4IDAgMCcsXG4gICAgICAgIHRleHRBbGlnbjogJ3JpZ2h0JyxcbiAgICB9LFxuICAgIHRpdGxlOiB7XG4gICAgICAgIG1hcmdpbkJvdHRvbTogOCxcbiAgICAgICAgbGV0dGVyU3BhY2luZzogJ25vcm1hbCcsXG4gICAgICAgIGNvbG9yOiAnIzAwMDAwMCcsXG4gICAgICAgIGZvbnRTaXplOiAxNCxcbiAgICAgICAgZm9udFdlaWdodDogNjAwLFxuICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnLFxuICAgIH0sXG4gICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgbWFyZ2luQm90dG9tOiAxNSxcbiAgICAgICAgY29sb3I6ICcjNGQ0ZDRkJyxcbiAgICAgICAgZm9udFNpemU6IDEyLFxuICAgICAgICBsaW5lSGVpZ2h0OiAxLjI1LFxuICAgIH0sXG4gICAgaW5mbzoge1xuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIHdpZHRoOiAnODclJyxcbiAgICAgICAgbWFyZ2luQm90dG9tOiAxMCxcbiAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgfSxcbiAgICBzdGVwc0NvdW50OiB7XG4gICAgICAgIHdpZHRoOiAnMzUlJyxcbiAgICAgICAgZm9udFNpemU6IDEyLFxuICAgIH0sXG4gICAgcGluOiB7XG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICB6SW5kZXg6IDIsXG4gICAgICAgIHdpZHRoOiAxNSxcbiAgICAgICAgaGVpZ2h0OiAxNSxcbiAgICAgICAgYm9yZGVyUmFkaXVzOiA1MCxcbiAgICAgICAgYmFja2dyb3VuZDogJyMxNzg3ZmMnLFxuICAgICAgICBib3hTaGFkb3c6ICcwIDAgMCAycHggd2hpdGUnLFxuICAgICAgICB0b3A6ICctN3B4JyxcbiAgICAgICAgbGVmdDogJy03cHgnLFxuICAgIH0sXG4gICAgcGluTGluZToge1xuICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgIHdpZHRoOiAyNSxcbiAgICAgICAgdG9wOiAxLFxuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgekluZGV4OiAxLFxuICAgICAgICBiYWNrZ3JvdW5kOiAnIzE3ODdmYycsXG4gICAgfSxcbiAgICBidXR0b246IHtcbiAgICAgICAgZGlzcGxheTogJ2lubGluZS1mbGV4JyxcbiAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgZm9udFdlaWdodDogMzAwLFxuICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgaGVpZ2h0OiAzMixcbiAgICAgICAgbGluZUhlaWdodDogJzMycHgnLFxuICAgICAgICBwYWRkaW5nOiAnMCAxNnB4JyxcbiAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcbiAgICAgICAgYm9yZGVyOiAwLFxuICAgICAgICBib3JkZXJSYWRpdXM6IDMsXG4gICAgICAgIG91dGxpbmU6ICdub25lJyxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzAwODRmZicsXG4gICAgICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgICAgIGZvbnRTaXplOiAxNCxcbiAgICAgICAgbWFyZ2luTGVmdDogMTAsXG4gICAgfSxcbn1cblxuY29uc3QgZGVmYXVsdFByZXZCdXR0b25UaXRsZSA9ICdQcmV2J1xuY29uc3QgZGVmYXVsdE5leHRCdXR0b25UaXRsZSA9ICdOZXh0J1xuXG5jb25zdCBXaXphcmQgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICAgIGlzU2hvdyxcbiAgICAgICAgcnVsZSxcbiAgICAgICAgZGVmYXVsdFN0ZXBOdW1iZXIgPSAwLFxuICAgICAgICBwcmV2QnV0dG9uVGl0bGUgPSBkZWZhdWx0UHJldkJ1dHRvblRpdGxlLFxuICAgICAgICBuZXh0QnV0dG9uVGl0bGUgPSBkZWZhdWx0TmV4dEJ1dHRvblRpdGxlLFxuICAgIH0gPSBwcm9wc1xuXG4gICAgY29uc3QgW2lzU2hvd1N0YXRlLCBzZXRTaG93XSA9IHVzZVN0YXRlKGlzU2hvdylcbiAgICBjb25zdCBbdHJhbnNpdGlvbiwgc2V0VHJhbnNpdGlvbl0gPSB1c2VTdGF0ZShudWxsKVxuICAgIGNvbnN0IFtwb3NpdGlvbiwgc2V0UG9zaXRpb25dID0gdXNlU3RhdGUodW5kZWZpbmVkKVxuICAgIGNvbnN0IFtjdXJyZW50U3RlcE51bWJlciwgc2V0Q3VycmVudFN0ZXBOdW1iZXJdID0gdXNlU3RhdGUoZGVmYXVsdFN0ZXBOdW1iZXIpXG4gICAgY29uc3QgY3VycmVudFN0ZXBDb250ZW50ID0gZ2V0U3RlcChjdXJyZW50U3RlcE51bWJlciwgcnVsZSlcblxuICAgIGNvbnN0IHdyYXBwZXJTdHlsZSA9IHtcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgIHpJbmRleDogOTksXG4gICAgICAgIHRyYW5zaXRpb246IHRyYW5zaXRpb24sXG4gICAgICAgIC4uLnBvc2l0aW9uLFxuICAgIH1cblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIHNldFBvc2l0aW9uKGdldENvb3JkcyhnZXRTdGVwKGN1cnJlbnRTdGVwTnVtYmVyLCBydWxlKS5lbGVtZW50SWQpKVxuICAgIH0sIFtdKVxuXG4gICAgZnVuY3Rpb24gb25TdGVwQnV0dG9uQ2xpY2soc3RlcE51bWJlcikge1xuICAgICAgICBzZXRDdXJyZW50U3RlcE51bWJlcihzdGVwTnVtYmVyKVxuICAgICAgICBzZXRQb3NpdGlvbihnZXRDb29yZHMoZ2V0U3RlcChzdGVwTnVtYmVyLCBydWxlKS5lbGVtZW50SWQpKVxuICAgICAgICBzZXRUcmFuc2l0aW9uKCdhbGwgMTAwbXMgZWFzZScpXG4gICAgfVxuXG4gICAgaWYgKCFpc1Nob3dTdGF0ZSB8fCAhcG9zaXRpb24pIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IHN0eWxlPXt3cmFwcGVyU3R5bGV9PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLndpemFyZH0+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRTaG93KGZhbHNlKX0gc3R5bGU9e3N0eWxlcy5jbG9zZUJ1dHRvbn0+XG4gICAgICAgICAgICAgICAgICAgIFhcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuaW5mb30+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5zdGVwc0NvdW50fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtjdXJyZW50U3RlcE51bWJlciArIDF9IG9mIHtydWxlLmxlbmd0aH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogY3VycmVudFN0ZXBDb250ZW50LnRpdGxlIH19XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMudGl0bGV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX2h0bWw6IGN1cnJlbnRTdGVwQ29udGVudC5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvb3Rlcn0+XG4gICAgICAgICAgICAgICAgICAgIHtjdXJyZW50U3RlcE51bWJlciAhPT0gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25TdGVwQnV0dG9uQ2xpY2soY3VycmVudFN0ZXBOdW1iZXIgLSAxKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLmJ1dHRvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cHJldkJ1dHRvblRpdGxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25TdGVwQnV0dG9uQ2xpY2soY3VycmVudFN0ZXBOdW1iZXIgKyAxKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtjdXJyZW50U3RlcE51bWJlciArIDEgPT09IHJ1bGUubGVuZ3RofVxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5idXR0b259XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtuZXh0QnV0dG9uVGl0bGV9XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucGlufSAvPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnBpbkxpbmV9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgIClcbn1cblxuZnVuY3Rpb24gZ2V0U3RlcChzdGVwTnVtYmVyLCBydWxlcykge1xuICAgIHJldHVybiBydWxlc1tzdGVwTnVtYmVyXVxufVxuXG5mdW5jdGlvbiBnZXRDb29yZHMoZWxlbWVudElkKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZClcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogY29vcmRpbmF0ZXMudG9wICsgY29vcmRpbmF0ZXMuaGVpZ2h0IC8gMixcbiAgICAgICAgbGVmdDogY29vcmRpbmF0ZXMubGVmdCArIGNvb3JkaW5hdGVzLndpZHRoLFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2l6YXJkXG4iXX0=