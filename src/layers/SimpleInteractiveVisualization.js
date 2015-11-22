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
    Object.defineProperty(SimpleInteractiveVisualization, 'NS', {
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
    Object.defineProperty(SimpleInteractiveVisualization, 'CLASS_NAME', {
        value: 'SimpleInteractiveVisualization'
    });



    Object.defineProperties(SimpleInteractiveVisualization, {
        'PROBE_LINE_LAYER_NAME': {
            value: 'probeLine'
        },
        'X_AXIS_LAYER_NAME': {
            value: 'xAxis'
        },
        'Y_AXIS_LAYER_NAME': {
            value: 'yAxis'
        },
        'MAIN_PLOT_LAYER_NAME': {
            value: 'plot'
        }
    });


    /**
     *
     * @author adufilie
     * @author sanjay1909
     */
    function SimpleInteractiveVisualization() {
        weavetool.InteractiveVisualization.call(this);
        Object.defineProperties(this, {
            'enableAutoZoomXToNiceNumbers': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(false))
            },
            'enableAutoZoomYToNiceNumbers': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(false))
            },
            'gridLineThickness': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber())
            },
            'gridLineColor': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber())
            },
            'gridLineAlpha': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber())
            },
            'axesThickness': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber())
            },
            'axesColor': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber())
            },
            'axesAlpha': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber())
            },
            'bottomMarginClickCallbacks': {
                value: WeaveAPI.SessionManager.registerDisposableChild(this, new weavecore.CallbackCollection())
            },
            'topMarginClickCallbacks': {
                value: WeaveAPI.SessionManager.registerDisposableChild(this, new weavecore.CallbackCollection())
            },
            'leftMarginClickCallbacks': {
                value: WeaveAPI.SessionManager.registerDisposableChild(this, new weavecore.CallbackCollection())
            },
            'rightMarginClickCallbacks': {
                value: WeaveAPI.SessionManager.registerDisposableChild(this, new weavecore.CallbackCollection())
            }
        });

        this._mainPlotterInitialized = false;

        this.xToolTipEnabled;
        this.yToolTipEnabled;


        // private const tempPoint:Point = new Point(); // reusable temp object

        Object.defineProperty(this, 'tempBounds', {
            value: new weavedata.Bounds2D()
        });

        // hacks
        this.plotManager.hack_adjustFullDataBounds = hack_adjustFullDataBounds.bind(this);
        this.plotManager.hack_onUpdateZoom(hack_updateZoom.bind(this));
        WeaveAPI.SessionManager.registerLinkableChild(this.plotManager.zoomBounds, this.enableAutoZoomXToNiceNumbers);
        WeaveAPI.SessionManager.registerLinkableChild(this.plotManager.zoomBounds, this.enableAutoZoomYToNiceNumbers);

        WeaveAPI.SessionManager.getCallbackCollection(this.plotManager.zoomBounds).addGroupedCallback(this, hack_defineZoomIfUndefined.bind(this), true);
    }

    function hack_defineZoomIfUndefined() {
        if ((this.getXAxisPlotter() || this.getYAxisPlotter()) && this.plotManager.enableAutoZoomToExtent.value) {
            this.plotManager.zoomBounds.getDataBounds(this.tempBounds);
            if (this.tempBounds.isUndefined()) {
                if (this.tempBounds.getWidth() === 0)
                    this.tempBounds.setXRange(0, 10);
                if (this.tempBounds.getHeight() === 0)
                    this.tempBounds.setYRange(0, 10);
                this.plotManager.setCheckedZoomDataBounds(this.tempBounds);
            }
        }
    }

    function hack_adjustFullDataBounds() {
        // adjust fullDataBounds based on auto zoom settings
        var fullDataBounds = this.plotManager.fullDataBounds;
        this.tempBounds.copyFrom(fullDataBounds);
        if (this.getXAxisPlotter() && this.enableAutoZoomXToNiceNumbers.value) {
            var xMinMax = weavecore.StandardLib.getNiceNumbersInRange(fullDataBounds.getXMin(), fullDataBounds.getXMax(), this.getXAxisPlotter().tickCountRequested.value);
            this.tempBounds.setXRange(xMinMax[0], xMinMax[xMinMax.length - 1]); // first & last ticks
        }
        if (this.getYAxisPlotter() && this.enableAutoZoomYToNiceNumbers.value) {
            var yMinMax = weavecore.StandardLib.getNiceNumbersInRange(fullDataBounds.getYMin(), fullDataBounds.getYMax(), this.getYAxisPlotter().tickCountRequested.value);
            this.tempBounds.setYRange(yMinMax[0], yMinMax[yMinMax.length - 1]); // first & last ticks
        }
        // if axes are enabled, make sure width and height are not zero
        if ((this.getXAxisPlotter() || this.getYAxisPlotter()) && this.plotManager.enableAutoZoomToExtent.value) {
            if (this.tempBounds.getWidth() == 0)
                this.tempBounds.setWidth(1);
            if (this.tempBounds.getHeight() == 0)
                this.tempBounds.setHeight(1);
        }
        fullDataBounds.copyFrom(this.tempBounds);
    }

    function hack_updateZoom() {
        // when the data bounds change, we need to update the min,max values for axes
        var xAxis = this.getXAxisPlotter();
        if (xAxis) {
            WeaveAPI.SessionManager.getCallbackCollection(xAxis).delayCallbacks(); // avoid recursive updateZoom() call until done setting session state
            this.plotManager.zoomBounds.getDataBounds(this.tempBounds);
            this.tempBounds.yMax = this.tempBounds.yMin;
            xAxis.axisLineDataBounds.copyFrom(this.tempBounds);
            xAxis.axisLineMinValue.value = this.tempBounds.xMin;
            xAxis.axisLineMaxValue.value = this.tempBounds.xMax;
            WeaveAPI.SessionManager.getCallbackCollection(xAxis).resumeCallbacks();
        }
        var yAxis = this.getYAxisPlotter();
        if (yAxis) {
            WeaveAPI.SessionManager.getCallbackCollection(yAxis).delayCallbacks(); // avoid recursive updateZoom() call until done setting session state
            this.plotManager.zoomBounds.getDataBounds(this.tempBounds);
            this.tempBounds.xMax = this.tempBounds.xMin;
            yAxis.axisLineDataBounds.copyFrom(this.tempBounds);
            yAxis.axisLineMinValue.value = this.tempBounds.yMin;
            yAxis.axisLineMaxValue.value = this.tempBounds.yMax;
            WeaveAPI.SessionManager.getCallbackCollection(yAxis).resumeCallbacks();
        }
    }

    function linkToAxisProperties(axisName) {
        var p = this.plotManager.plotters.getObject(axisName);
        p = (p && p instanceof weavetool.SimpleAxisPlotter) ? p : null;
        if (!p)
            throw new Error('"' + axisName + '" is not an axis');
        var list = [
				[this.gridLineThickness, p.axisGridLineThickness],
				[this.gridLineColor, p.axisGridLineColor],
				[this.gridLineAlpha, p.axisGridLineAlpha],
				[this.axesThickness, p.axesThickness],
				[this.axesColor, p.axesColor],
				[this.axesAlpha, p.axesAlpha]
			];
        list.forEach(function (pair) {
            var var0 = pair[0];
            var var1 = pair[1];
            if (var0.triggerCounter == weavecore.CallbackCollection.DEFAULT_TRIGGER_COUNT)
                WeaveAPI.SessionManager.linkSessionState(var1, var0);
            else
                WeaveAPI.SessionManager.linkSessionState(var0, var1);
            WeaveAPI.SessionManager.excludeLinkableChildFromSessionState(p, pair[1]);
        });
        //(WeaveAPI.SessionManager as SessionManager).removeLinkableChildrenFromSessionState(p, p.axisLineDataBounds);
    }

    SimpleInteractiveVisualization.prototype = new weavetool.InteractiveVisualization();
    SimpleInteractiveVisualization.prototype.constructor = SimpleInteractiveVisualization;
    var p = SimpleInteractiveVisualization.prototype;

    p.getMainLayerSettings = function () {
        return this.plotManager.getLayerSettings(SimpleInteractiveVisualization.MAIN_PLOT_LAYER_NAME);
    }
    p.getMainPlotter = function () {
        return this._mainPlotterInitialized ? this.plotManager.getPlotter(SimpleInteractiveVisualization.MAIN_PLOT_LAYER_NAME) : null;
    }
    p.getXAxisPlotter = function () {
        return this.plotManager.getPlotter(SimpleInteractiveVisualization.X_AXIS_LAYER_NAME);
    }
    p.getYAxisPlotter = function () {
        return this.plotManager.getPlotter(SimpleInteractiveVisualization.Y_AXIS_LAYER_NAME);
    }
    p.getProbeLinePlotter = function () {
        return this.plotManager.getPlotter(SimpleInteractiveVisualization.PROBE_LINE_LAYER_NAME);
    }

    /**
     * @param mainPlotterClass The main plotter class definition.
     * @param showAxes Set to true if axes should be added.
     * @return The main plotter.
     */
    p.initializePlotters = function (mainPlotterClass, showAxes) {
        WeaveAPI.SessionManager.getCallbackCollection(this.plotManager).delayCallbacks();
        WeaveAPI.SessionManager.getCallbackCollection(this.plotManager.layerSettings).delayCallbacks();
        WeaveAPI.SessionManager.getCallbackCollection(this.plotManager.plotters).delayCallbacks();

        if (mainPlotterClass && !this.getMainPlotter()) {
            this._mainPlotterInitialized = true;
            this.plotManager.plotters.requestObject(SimpleInteractiveVisualization.MAIN_PLOT_LAYER_NAME, mainPlotterClass, true);
        }
        if (showAxes) {
            // x
            var xAxis = this.plotManager.plotters.requestObject(SimpleInteractiveVisualization.X_AXIS_LAYER_NAME, weavetool.SimpleAxisPlotter, true);
            xAxis.setupTextFormats(Weave.properties.axisTitleTextFormat, Weave.properties.visTextFormat);
            xAxis.axisLabelRelativeAngle.value = -45;
            xAxis.labelVerticalAlign.value = "top";
            var xSettings = this.plotManager.getLayerSettings(SimpleInteractiveVisualization.X_AXIS_LAYER_NAME);
            xSettings.selectable.value = false;
            xSettings.selectable.lock();

            linkToAxisProperties.call(this, SimpleInteractiveVisualization.X_AXIS_LAYER_NAME);

            // y
            var yAxis = this.plotManager.plotters.requestObject(SimpleInteractiveVisualization.Y_AXIS_LAYER_NAME, weavetool.SimpleAxisPlotter, true);
            yAxis.setupTextFormats(Weave.properties.axisTitleTextFormat, Weave.properties.visTextFormat);
            yAxis.axisLabelRelativeAngle.value = 45;
            yAxis.labelVerticalAlign.value = "bottom";
            var ySettings = this.plotManager.getLayerSettings(SimpleInteractiveVisualization.Y_AXIS_LAYER_NAME);
            ySettings.selectable.value = false;
            ySettings.selectable.lock();

            linkToAxisProperties.call(this, SimpleInteractiveVisualization.Y_AXIS_LAYER_NAME);

            // todo: is this really necessary?
            WeaveAPI.SessionManager.getCallbackCollection(this.plotManager.zoomBounds).triggerCallbacks();
        }
        this.putAxesOnBottom();

        WeaveAPI.SessionManager.getCallbackCollection(this.plotManager.plotters).resumeCallbacks();
        WeaveAPI.SessionManager.getCallbackCollection(this.plotManager.layerSettings).resumeCallbacks();
        WeaveAPI.SessionManager.getCallbackCollection(this.plotManager).resumeCallbacks();
        return this.getMainPlotter();
    }


    /**
     * This function orders the layers from top to bottom in this order:
     * probe (probe lines), plot, yAxis, xAxis
     */
    p.putAxesOnBottom = function () {
        var names = this.plotManager.plotters.getNames();

        // remove axis layer names so they can be put in front.
        var i;

        [SimpleInteractiveVisualization.X_AXIS_LAYER_NAME, SimpleInteractiveVisualization.Y_AXIS_LAYER_NAME].forEach(function (name) {
            i = names.indexOf(name)
            if (i >= 0)
                names.splice(i, 1);
        });

        names.unshift(SimpleInteractiveVisualization.X_AXIS_LAYER_NAME); // default axes first
        names.unshift(SimpleInteractiveVisualization.Y_AXIS_LAYER_NAME); // default axes first
        names.push(SimpleInteractiveVisualization.PROBE_LINE_LAYER_NAME); // probe line layer last

        this.plotManager.plotters.setNameOrder(names);
    }

    /**
     * This function should be called by a tool to initialize a probe line layer and its ProbeLinePlotter.
     * To disable probe lines, call this function with both parameters set to false.
     * @param xToolTipEnabled set to true if xAxis needs a probe line and tooltip
     * @param yToolTipEnabled set to true if yAxis needs a probe line and tooltip
     * @param xLabelFunction optional function to convert xAxis number values to string
     * @param yLabelFunction optional function to convert yAxis number values to string
     */
    p.enableProbeLine = function (xToolTipEnabled, yToolTipEnabled) {
        if (!xToolTipEnabled && !yToolTipEnabled)
            return;

        this.xToolTipEnabled = xToolTipEnabled;
        this.yToolTipEnabled = yToolTipEnabled;

        this.plotManager.plotters.requestObject(SimpleInteractiveVisualization.PROBE_LINE_LAYER_NAME, weavetool.ProbeLinePlotter, true);
        var probeLayerSettings = this.plotManager.getLayerSettings(SimpleInteractiveVisualization.PROBE_LINE_LAYER_NAME);
        probeLayerSettings.selectable.value = false;
        probeLayerSettings.selectable.lock();
        WeaveAPI.SessionManager.getCallbackCollection(this.getMainLayerSettings().probeFilter).addImmediateCallback(this, updateProbeLines.bind(this), false);
    }

    /**
     * Draws the probe lines using _probePlotter and the corresponding axes tooltips
     * @param labelFunction optional function to convert number values to string
     * @param labelFunctionX optional function to convert xAxis number values to string
     *
     */
    function updateProbeLines() {}

    if (typeof exports !== 'undefined') {
        module.exports = SimpleInteractiveVisualization;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.SimpleInteractiveVisualization = SimpleInteractiveVisualization;
    }

    weavecore.ClassUtils.registerClass('weavetool.SimpleInteractiveVisualization', weavetool.SimpleInteractiveVisualization);

}());
