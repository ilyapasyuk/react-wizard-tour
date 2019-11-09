"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _index = _interopRequireDefault(require("../Wizard/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rule = [{
  elementId: 'one',
  title: 'Title one',
  description: 'Description one'
}, {
  elementId: 'two',
  title: 'Title two',
  description: 'Description two'
}];
var styleElementOne = {
  background: 'grey',
  width: 200,
  height: 100
};
var styleElementTwo = {
  background: 'cornflowerblue',
  width: 200,
  height: 100,
  position: 'absolute',
  left: 300,
  top: 300
};

var App = function App() {
  return _react["default"].createElement("div", null, _react["default"].createElement("div", {
    id: rule[0].elementId,
    style: styleElementOne
  }), _react["default"].createElement("div", {
    id: rule[1].elementId,
    style: styleElementTwo
  }), _react["default"].createElement(_index["default"], {
    rule: rule,
    isShow: true
  }));
};

_reactDom["default"].render(_react["default"].createElement(App, null), document.getElementById('app'));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9BcHAvaW5kZXguanN4Il0sIm5hbWVzIjpbInJ1bGUiLCJlbGVtZW50SWQiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwic3R5bGVFbGVtZW50T25lIiwiYmFja2dyb3VuZCIsIndpZHRoIiwiaGVpZ2h0Iiwic3R5bGVFbGVtZW50VHdvIiwicG9zaXRpb24iLCJsZWZ0IiwidG9wIiwiQXBwIiwiUmVhY3RET00iLCJyZW5kZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUVBOzs7O0FBRUEsSUFBTUEsSUFBSSxHQUFHLENBQ1Q7QUFBRUMsRUFBQUEsU0FBUyxFQUFFLEtBQWI7QUFBb0JDLEVBQUFBLEtBQUssRUFBRSxXQUEzQjtBQUF3Q0MsRUFBQUEsV0FBVyxFQUFFO0FBQXJELENBRFMsRUFFVDtBQUFFRixFQUFBQSxTQUFTLEVBQUUsS0FBYjtBQUFvQkMsRUFBQUEsS0FBSyxFQUFFLFdBQTNCO0FBQXdDQyxFQUFBQSxXQUFXLEVBQUU7QUFBckQsQ0FGUyxDQUFiO0FBS0EsSUFBTUMsZUFBZSxHQUFHO0FBQ3BCQyxFQUFBQSxVQUFVLEVBQUUsTUFEUTtBQUVwQkMsRUFBQUEsS0FBSyxFQUFFLEdBRmE7QUFHcEJDLEVBQUFBLE1BQU0sRUFBRTtBQUhZLENBQXhCO0FBTUEsSUFBTUMsZUFBZSxHQUFHO0FBQ3BCSCxFQUFBQSxVQUFVLEVBQUUsZ0JBRFE7QUFFcEJDLEVBQUFBLEtBQUssRUFBRSxHQUZhO0FBR3BCQyxFQUFBQSxNQUFNLEVBQUUsR0FIWTtBQUlwQkUsRUFBQUEsUUFBUSxFQUFFLFVBSlU7QUFLcEJDLEVBQUFBLElBQUksRUFBRSxHQUxjO0FBTXBCQyxFQUFBQSxHQUFHLEVBQUU7QUFOZSxDQUF4Qjs7QUFTQSxJQUFNQyxHQUFHLEdBQUcsU0FBTkEsR0FBTTtBQUFBLFNBQ1IsNkNBQ0k7QUFBSyxJQUFBLEVBQUUsRUFBRVosSUFBSSxDQUFDLENBQUQsQ0FBSixDQUFRQyxTQUFqQjtBQUE0QixJQUFBLEtBQUssRUFBRUc7QUFBbkMsSUFESixFQUVJO0FBQUssSUFBQSxFQUFFLEVBQUVKLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUUMsU0FBakI7QUFBNEIsSUFBQSxLQUFLLEVBQUVPO0FBQW5DLElBRkosRUFHSSxnQ0FBQyxpQkFBRDtBQUFRLElBQUEsSUFBSSxFQUFFUixJQUFkO0FBQW9CLElBQUEsTUFBTTtBQUExQixJQUhKLENBRFE7QUFBQSxDQUFaOztBQVFBYSxxQkFBU0MsTUFBVCxDQUFnQixnQ0FBQyxHQUFELE9BQWhCLEVBQXlCQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsS0FBeEIsQ0FBekIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJ1xuXG5pbXBvcnQgV2l6YXJkIGZyb20gJy4uL1dpemFyZC9pbmRleCdcblxuY29uc3QgcnVsZSA9IFtcbiAgICB7IGVsZW1lbnRJZDogJ29uZScsIHRpdGxlOiAnVGl0bGUgb25lJywgZGVzY3JpcHRpb246ICdEZXNjcmlwdGlvbiBvbmUnIH0sXG4gICAgeyBlbGVtZW50SWQ6ICd0d28nLCB0aXRsZTogJ1RpdGxlIHR3bycsIGRlc2NyaXB0aW9uOiAnRGVzY3JpcHRpb24gdHdvJyB9LFxuXVxuXG5jb25zdCBzdHlsZUVsZW1lbnRPbmUgPSB7XG4gICAgYmFja2dyb3VuZDogJ2dyZXknLFxuICAgIHdpZHRoOiAyMDAsXG4gICAgaGVpZ2h0OiAxMDAsXG59XG5cbmNvbnN0IHN0eWxlRWxlbWVudFR3byA9IHtcbiAgICBiYWNrZ3JvdW5kOiAnY29ybmZsb3dlcmJsdWUnLFxuICAgIHdpZHRoOiAyMDAsXG4gICAgaGVpZ2h0OiAxMDAsXG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgbGVmdDogMzAwLFxuICAgIHRvcDogMzAwLFxufVxuXG5jb25zdCBBcHAgPSAoKSA9PiAoXG4gICAgPGRpdj5cbiAgICAgICAgPGRpdiBpZD17cnVsZVswXS5lbGVtZW50SWR9IHN0eWxlPXtzdHlsZUVsZW1lbnRPbmV9IC8+XG4gICAgICAgIDxkaXYgaWQ9e3J1bGVbMV0uZWxlbWVudElkfSBzdHlsZT17c3R5bGVFbGVtZW50VHdvfSAvPlxuICAgICAgICA8V2l6YXJkIHJ1bGU9e3J1bGV9IGlzU2hvdyAvPlxuICAgIDwvZGl2PlxuKVxuXG5SZWFjdERPTS5yZW5kZXIoPEFwcCAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKVxuIl19