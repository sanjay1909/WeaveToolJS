(function () {

    /**
     * temporary solution to save the namespace for this class/prototype
     * @static
     * @public
     * @property NS
     * @default weavecore
     * @readOnly
     * @type String
     */
    Object.defineProperty(ScatterPlotTool, 'NS', {
        value: 'weavetool'
    });

    /**
     * TO-DO:temporary solution to save the CLASS_NAME constructor.name works for window object , but modular based won't work
     * @static
     * @public
     * @property CLASS_NAME
     * @readOnly
     * @type String
     */
    Object.defineProperty(ScatterPlotTool, 'CLASS_NAME', {
        value: 'ScatterPlotTool'
    });


    /**
     *
     * @author adufilie
     * @author sanjay1909
     */
    function ScatterPlotTool() {
        weavetool.SimpleVisTool.call(this);

        Object.defineProperties(this, {
            'isVisibleEquationTextBoolean': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true))
            },
            'attributesToIncludeInProbe': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableVariable(Array, null, null), handleAttributesToIncludeInProbe.bind(this), true)
            }
        });

        // lock dynamic objects into place
        this.plotter = this.initializePlotters(weavetool.ScatterPlotPlotter, true);

        //private var
        this._vis_undef_x;
        this._vis_undef_y;
        this._vis_undef_xy;

        //private const
        Object.defineProperties(this, {
            'UNDEFINED_X_NAME': {
                value: "undefinedX"
            },
            'UNDEFINED_Y_NAME': {
                value: "undefinedY"
            },
            'UNDEFINED_XY_NAME': {
                value: "undefinedXY"
            }
        });


        this.visualization.enableProbeLine(true, true);

        //BEGIN TEMPORARY SOLUTION
        this.visualization.plotManager.marginLeftNumber.addGroupedCallback(this, updateAxisLabels.bind(this));
        this.visualization.plotManager.marginBottomNumber.addGroupedCallback(this, updateAxisLabels.bind(this));
        WeaveAPI.SessionManager.getCallbackCollection(this.plotter).addGroupedCallback(this, updateAxisLabels.bind(this), true);
        // END TEMPORARY SOLUTION

        this.visualization.enableZoomAndPan.value = false;

        this.xAxisPlotter.setLabelFunction(this.labelFunctionX, this.plotter.dataX);
        this.yAxisPlotter.setLabelFunction(this.labelFunctionY, this.plotter.dataY);

        this.visualization.bottomMarginClickCallbacks.addImmediateCallback(this, function () {
            //AttributeSelectorPanel.open(plotter.dataX);
        });
        this.visualization.leftMarginClickCallbacks.addImmediateCallback(this, function () {
            // AttributeSelectorPanel.open(plotter.dataY);
        });

        this.visualization.enableAutoZoomXToNiceNumbers.value = true;
        this.visualization.enableAutoZoomYToNiceNumbers.value = true;

        WeaveAPI.SessionManager.getCallbackCollection(this.plotter).addGroupedCallback(this, this.handlePanelTitleChange.bind(this), true);

        this.visualization.plotManager.marginBottom.value = "80";
        this.visualization.plotManager.marginTop.value = "30";
        this.visualization.plotManager.marginLeft.value = "80";
        this.visualization.plotManager.marginRight.value = "30";

        initializeUndefinedLayers.call(this);
        //initRegressionLayer();

        this.children.childListCallbacks.addGroupedCallback(this, handleChildrenChildList.bind(this));
    }

    function initializeUndefinedLayers() {
        this._vis_undef_x = this.children.requestObject(this.UNDEFINED_X_NAME, weavetool.SimpleInteractiveVisualization, true);
        this._vis_undef_y = this.children.requestObject(this.UNDEFINED_Y_NAME, weavetool.SimpleInteractiveVisualization, true);
        this._vis_undef_xy = this.children.requestObject(this.UNDEFINED_XY_NAME, weavetool.SimpleInteractiveVisualization, true);

        /*AttributeMenuTool.hack_skipToolTargets[vis_undef_x] = true;
        AttributeMenuTool.hack_skipToolTargets[vis_undef_y] = true;
        AttributeMenuTool.hack_skipToolTargets[vis_undef_xy] = true;*/

        /*this._vis_undef_x.toolTip = "Undefined X";
        this._vis_undef_y.toolTip = "Undefined Y";
        this._vis_undef_xy.toolTip = "Undefined X and Y";*/

        //WeaveAPI.SessionManager.getCallbackCollection(this.visualization.plotManager.zoomBounds).addImmediateCallback(this, resizeUndefinedLayers, true);

				[this._vis_undef_x, this._vis_undef_y, this._vis_undef_xy].forEach(function (vis) {
            vis.initializePlotters(weavetool.ScatterPlotPlotter, false);
            vis.enableAutoZoomXToNiceNumbers.value = true;
            vis.enableAutoZoomYToNiceNumbers.value = true;

            var _plotter = vis.getMainPlotter();
            WeaveAPI.SessionManager.linkSessionState(this.plotter.fill.color, _plotter.fill.color);
            WeaveAPI.SessionManager.linkSessionState(this.plotter.fill.alpha, _plotter.fill.alpha);
            WeaveAPI.SessionManager.linkSessionState(this.plotter.sizeBy, _plotter.sizeBy);
            WeaveAPI.SessionManager.linkSessionState(this.plotter.defaultScreenRadius, _plotter.defaultScreenRadius);
            WeaveAPI.SessionManager.linkSessionState(this.plotter.maxScreenRadius, _plotter.maxScreenRadius);
            WeaveAPI.SessionManager.linkSessionState(this.plotter.minScreenRadius, _plotter.minScreenRadius);

            var undefSettings = vis.getMainLayerSettings();
            undefSettings.hack_includeMissingRecordBounds = true;
            WeaveAPI.SessionManager.linkSessionState(this.visualization.getMainLayerSettings(), undefSettings);
            WeaveAPI.SessionManager.linkSessionState(this.visualization.plotManager.zoomBounds, vis.plotManager.zoomBounds);
        }.bind(this));

        var plotter_undef_x = this._vis_undef_x.getMainPlotter();
        var plotter_undef_y = this._vis_undef_y.getMainPlotter();
        var plotter_undef_xy = this._vis_undef_xy.getMainPlotter();
        hack_setKeyInclusionLogic.call(this, plotter_undef_x, true, false);
        hack_setKeyInclusionLogic.call(this, plotter_undef_y, false, true);
        hack_setKeyInclusionLogic.call(this, plotter_undef_xy, true, true);

        WeaveAPI.SessionManager.linkSessionState(this.plotter.dataX, plotter_undef_y.dataX);
        WeaveAPI.SessionManager.linkSessionState(this.plotter.dataY, plotter_undef_x.dataY);

        /*getCallbackCollection(visualization.plotManager.zoomBounds).addImmediateCallback(this, invalidateDisplayList);

        this.visualization.plotManager.marginTopNumber.addImmediateCallback(this, invalidateDisplayList);
        this.visualization.plotManager.marginBottomNumber.addImmediateCallback(this, invalidateDisplayList);
        this.visualization.plotManager.marginRightNumber.addImmediateCallback(this, invalidateDisplayList);
        this.visualization.plotManager.marginLeftNumber.addImmediateCallback(this, invalidateDisplayList);*/

        this.visualization.gridLineAlpha.addImmediateCallback(this, updateUndefLayerLines.bind(this));
        this.visualization.gridLineColor.addImmediateCallback(this, updateUndefLayerLines.bind(this));
        this.visualization.gridLineThickness.addImmediateCallback(this, updateUndefLayerLines.bind(this), true);
    }

    function hack_setKeyInclusionLogic(undef_plotter, undef_x, undef_y) {
        undef_plotter.hack_setKeyInclusionLogic(
            function (key) {
                return !isFinite(this.plotter.dataX.getValueFromKey(key, Number)) === undef_x && !isFinite(this.plotter.dataY.getValueFromKey(key, Number)) === undef_y;
            }.bind(this), [this.plotter.dataX, this.plotter.dataY]
        );
    }

    function updateUndefLayerLines() {
        var args = [this.visualization.gridLineThickness.value, this.visualization.gridLineColor.value, this.visualization.gridLineAlpha.value];
        (this._vis_undef_x.getMainPlotter()).hack_verticalBackgroundLineStyle = args;
        (this._vis_undef_y.getMainPlotter()).hack_horizontalBackgroundLineStyle = args;
        WeaveAPI.SessionManager.getCallbackCollection(this._vis_undef_x.getMainPlotter()).triggerCallbacks();
        WeaveAPI.SessionManager.getCallbackCollection(this._vis_undef_y.getMainPlotter()).triggerCallbacks();
    }

    function handleChildrenChildList() {
        // this will make sure the undefined x,y visualizations are on top of the main vis.
        // get existing order
        var order = this.children.getNames();
        var args = [this.UNDEFINED_X_NAME, this.UNDEFINED_Y_NAME, this.UNDEFINED_XY_NAME];
        // remove vis_undef_* names
        args.forEach(function (name) {
            order.splice(order.indexOf(name), 1);
        });
        // replace the main vis name with the list of vis names
        var visName = this.children.getName(this.visualization);
        args.unshift(order.indexOf(visName), 1, visName);
        order.splice.apply(null, args);
        // save new order
        this.children.setNameOrder(order);
    }

    function handleAttributesToIncludeInProbe() {

    }

    function updateAxisLabels() {
        this.visualization.bottomMarginColumn = this.plotter.dataX;
        this.visualization.leftMarginColumn = this.plotter.dataY;

        this.xAxisPlotter.setSideAxisName(
            weavedata.ColumnUtils.getTitle(this.plotter.dataX),
            0,
            0, this.visualization.plotManager.marginBottomNumber.value - 3,
            "bottom"
        );

        this.yAxisPlotter.setSideAxisName(
            weavedata.ColumnUtils.getTitle(this.plotter.dataY), -90, -this.visualization.plotManager.marginLeftNumber.value, 0,
            "top"
        );
    }

    ScatterPlotTool.prototype = new weavetool.SimpleVisTool();
    ScatterPlotTool.prototype.constructor = ScatterPlotTool;
    var p = ScatterPlotTool.prototype;


    p.labelFunctionX = function (value) {
        return weavedata.ColumnUtils.deriveStringFromNumber(this.plotter.dataX, value);
    }
    p.labelFunctionY = function (value) {
        return weavedata.ColumnUtils.deriveStringFromNumber(this.plotter.dataY, value);
    }

    if (typeof exports !== 'undefined') {
        module.exports = ScatterPlotTool;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.ScatterPlotTool = ScatterPlotTool;
    }

    weavecore.ClassUtils.registerClass('weavetool.ScatterPlotTool', weavetool.ScatterPlotTool);

}());
