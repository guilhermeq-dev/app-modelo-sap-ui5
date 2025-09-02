/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"comtreinamento/firstapp/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
