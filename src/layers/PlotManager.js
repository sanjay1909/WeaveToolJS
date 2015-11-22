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
    Object.defineProperty(PlotManager, 'NS', {
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
    Object.defineProperty(PlotManager, 'CLASS_NAME', {
        value: 'PlotManager'
    });


    /**
     *
     * @author adufilie
     * @author sanjay1909
     */
    function PlotManager() {
        weavecore.ILinkableObject.call(this);



        Object.defineProperties(this, {
            'plotters': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableHashMap(weavetool.IPlotter))
            },
            'layerSettings': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableHashMap(weavetool.LayerSettings))
            },
            'zoomBounds': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavedata.ZoomBounds(), updateZoom.bind(this), false)
            },
            'marginRightNumber': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(0), updateZoom.bind(this), true)
            },
            'marginLeftNumber': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(0), updateZoom.bind(this), true)
            },
            'marginBottomNumber': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(0), updateZoom.bind(this), true)
            },
            'marginTopNumber': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(0), updateZoom.bind(this), true)
            },
            'marginRight': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString('0', weavedata.NumberUtils.verifyNumberOrPercentage), updateZoom.bind(this), true)
            },
            'marginLeft': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString('0', weavedata.NumberUtils.verifyNumberOrPercentage), updateZoom.bind(this), true)
            },
            'marginBottom': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString('0', weavedata.NumberUtils.verifyNumberOrPercentage), updateZoom.bind(this), true)
            },
            'marginTop': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString('0', weavedata.NumberUtils.verifyNumberOrPercentage), updateZoom.bind(this), true)
            },
            'minScreenSize': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(128), updateZoom.bind(this), true)
            },
            'minZoomLevel': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(0), updateZoom.bind(this), true)
            },
            'maxZoomLevel': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(18), updateZoom.bind(this), true)
            },
            'enableFixedAspectRatio': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(false), updateZoom.bind(this), true)
            },
            'enableAutoZoomToExtent': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true), updateZoom.bind(this), true)
            },
            'enableAutoZoomToSelection': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(false), updateZoom.bind(this), true)
            },
            'includeNonSelectableLayersInAutoZoom': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(false), updateZoom.bind(this), true)
            },
            'overrideXMin': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(NaN), updateZoom.bind(this), true)
            },
            'overrideYMin': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(NaN), updateZoom.bind(this), true)
            },
            'overrideXMax': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(NaN), updateZoom.bind(this), true)
            },
            'overrideYMax': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(NaN), updateZoom.bind(this), true)
            },
            'fullDataBounds': {
                value: new weavedata.Bounds2D() //This is the collective data bounds of all the selectable plot layers.
            }

        });


        this._unscaledWidth = 0;
        this._unscaledHeight = 0;

        // private const
        // reusable temporary objects
        Object.defineProperties(this, {
            'tempPoint': {
                value: new weavedata.Point()
            },
            'tempBounds': {
                value: new weavedata.Bounds2D()
            },
            'tempScreenBounds': {
                value: new weavedata.Bounds2D()
            },
            'tempDataBounds': {
                value: new weavedata.Bounds2D()
            }
        });




        this._name_to_PlotTask_Array = {}; // name -> Array of PlotTask
        this._name_to_SpatialIndex = {}; // name -> SpatialIndex
        this._shouldUpdateZoom = false;
        this._lazyUpdateZoom = true;

        /**
         * This can be set to a function that will be called to adjust fullDataBounds whenever it is updated.
         */
        this.hack_adjustFullDataBounds = null;

        /**
         * This can be set to a function that will be called whenever updateZoom is called.
         */
        this.hack_updateZoom_callbacks = [];


        //this.plotters.addImmediateCallback(this, updateZoom.bind(this));
        //this.layerSettings.addImmediateCallback(this, updateZoom.bind(this));
        //this.layerSettings.addImmediateCallback(this, refreshLayers);
        //WeaveAPI.SessionManager.getCallbackCollection(this.zoomBounds).addImmediateCallback(this, refreshLayers);

        this.plotters.childListCallbacks.addImmediateCallback(this, handlePlottersList.bind(this));
        this.layerSettings.childListCallbacks.addImmediateCallback(this, handleSettingsList.bind(this));

        WeaveAPI.SessionManager.excludeLinkableChildFromSessionState(this, this.marginBottomNumber);
        WeaveAPI.SessionManager.excludeLinkableChildFromSessionState(this, this.marginTopNumber);
        WeaveAPI.SessionManager.excludeLinkableChildFromSessionState(this, this.marginLeftNumber);
        WeaveAPI.SessionManager.excludeLinkableChildFromSessionState(this, this.marginRightNumber);

        this._frameCountSinceResize = 0;
        // WeaveAPI.StageUtils.addEventCallback("tick", this, handleFrameConstructed.bind(this));
    }

    PlotManager.prototype = new weavecore.ILinkableObject();
    PlotManager.prototype.constructor = PlotManager;
    var p = PlotManager.prototype;

    p.getPlotter = function (name) {
        return this.plotters.getObject(name);
    }

    p.getLayerSettings = function (name) {
        return this.layerSettings.getObject(name);
    }

    p.hack_onUpdateZoom = function (callback) {
        this.hack_updateZoom_callbacks.push(callback);
    }

    function handleFrameConstructed() {

        if (++this._frameCountSinceResize === 2) {
            console.log("handleFrameConstructed", this._frameCountSinceResize);
            this.plotters.getNames(weavetool.IPlotter).forEach(function (name) {
                this._name_to_PlotTask_Array[name].forEach(function (plotTask) {
                    plotTask.delayAsyncTask = false;
                });
            }, this);
        }

        if (this._shouldUpdateZoom) {
            console.log("handleFrameConstructed: _shouldUpdateZoom", this._shouldUpdateZoom);
            updateZoom.call(this, true);
        }


        if (this.shouldRender) {
            console.log("handleFrameConstructed: shouldRender", this.shouldRender);
            refreshLayers(true);
        }

    }



    function handleSettingsList() {
        // when settings are removed, remove plotter
        var oldName = this.layerSettings.childListCallbacks.lastNameRemoved;
        this.plotters.removeObject(oldName);
        this.plotters.setNameOrder(this.layerSettings.getNames());
    }

    function handlePlottersList() {
        this.plotters.delayCallbacks();
        this.layerSettings.delayCallbacks();

        // when plotter is removed, remove settings
        var oldName = this.plotters.childListCallbacks.lastNameRemoved;
        if (oldName) {
            delete this._name_to_SpatialIndex[oldName];
            delete this._name_to_PlotTask_Array[oldName];
            this.layerSettings.removeObject(oldName);
        }

        var newName = this.plotters.childListCallbacks.lastNameAdded;
        if (newName) {
            var newPlotter = this.plotters.childListCallbacks.lastObjectAdded;
            var settings = this.layerSettings.requestObject(newName, weavetool.LayerSettings, this.plotters.objectIsLocked(newName));

            // TEMPORARY SOLUTION until we start using VisToolGroup
            newPlotter.filteredKeySet.keyFilter.targetPath = ["defaultSubsetKeyFilter"];

            var spatialIndex = this._name_to_SpatialIndex[newName] = WeaveAPI.SessionManager.registerDisposableChild(newPlotter, new weavetool.SpatialIndex());
            var tasks = this._name_to_PlotTask_Array[newName] = [];

            [weavetool.PlotTask.TASK_TYPE_SUBSET, weavetool.PlotTask.TASK_TYPE_SELECTION, weavetool.PlotTask.TASK_TYPE_PROBE].forEach(function (taskType) {
                var plotTask = new weavetool.PlotTask(taskType, newPlotter, spatialIndex, this.zoomBounds, settings);
                WeaveAPI.SessionManager.registerDisposableChild(newPlotter, plotTask); // plotter is owner of task
                WeaveAPI.SessionManager.registerLinkableChild(this, plotTask); // task affects busy status of PlotManager
                tasks.push(plotTask);
                // set initial size
                //plotTask.setBitmapDataSize(_unscaledWidth, _unscaledHeight);

                // when the plot task triggers callbacks, we need to render the layered visualization
                WeaveAPI.SessionManager.getCallbackCollection(plotTask).addImmediateCallback(this, refreshLayers);
            }, this);
            //setupBitmapFilters(newPlotter, settings, tasks[0], tasks[1], tasks[2]);
            // when spatial index is recreated, we need to update zoom
            //WeaveAPI.SessionManager.getCallbackCollection(spatialIndex).addImmediateCallback(this, updateZoom.bind(this));

            /*if (newPlotter is ITextPlotter)
            	settings.hack_useTextBitmapFilters = true;*/
        }

        this.layerSettings.setNameOrder(this.plotters.getNames());

        this.plotters.resumeCallbacks();
        this.layerSettings.resumeCallbacks();
    }

    function refreshLayers() {

    }
    /**
     * This function will update the fullDataBounds and zoomBounds based on the current state of the layers.
     */
    function updateZoom(now) {
        now = (now === undefined) ? false : now;
        /*if (this._lazyUpdateZoom && !now) {
            this._shouldUpdateZoom = true;
            return;
        }*/
        this._lazyUpdateZoom = false;
        this._shouldUpdateZoom = false;

        /*// make sure callbacks only trigger once
        WeaveAPI.SessionManager.getCallbackCollection(this).delayCallbacks();
        WeaveAPI.SessionManager.getCallbackCollection(this.zoomBounds).delayCallbacks();
        //trace('begin updateZoom',ObjectUtil.toString(getSessionState(zoomBounds)));

        // make sure numeric margin values are correct
        this.marginBottomNumber.value = Math.round(weavedata.NumberUtils.getNumberFromNumberOrPercent(this.marginBottom.value, this._unscaledHeight));
        this.marginTopNumber.value = Math.round(weavedata.NumberUtils.getNumberFromNumberOrPercent(this.marginTop.value, this._unscaledHeight));
        this.marginLeftNumber.value = Math.round(weavedata.NumberUtils.getNumberFromNumberOrPercent(this.marginLeft.value, this._unscaledWidth));
        this.marginRightNumber.value = Math.round(weavedata.NumberUtils.getNumberFromNumberOrPercent(this.marginRight.value, this._unscaledWidth));

        this.updateFullDataBounds();

        // calculate new screen bounds in temp variable
        // default behaviour is to set screenBounds beginning from lower-left corner and ending at upper-right corner
        var left = this.marginLeftNumber.value;
        var top = this.marginTopNumber.value;
        var right = this._unscaledWidth - this.marginRightNumber.value;
        var bottom = this._unscaledHeight - this.marginBottomNumber.value;
        // set screenBounds beginning from lower-left corner and ending at upper-right corner
        //TODO: is other behavior required?
        this.tempScreenBounds.setBounds(left, bottom, right, top);
        if (left > right)
            this.tempScreenBounds.setWidth(0);
        if (top > bottom)
            this.tempScreenBounds.setHeight(0);
        // copy current dataBounds to temp variable
        this.zoomBounds.getDataBounds(this.tempDataBounds);

        // determine if dataBounds should be zoomed to fullDataBounds
        if (this.enableAutoZoomToExtent.value || this.tempDataBounds.isUndefined()) {
            if (!this.fullDataBounds.isEmpty())
                tthis.empDataBounds.copyFrom(this.fullDataBounds);

            if (isFinite(this.overrideXMin.value))
                this.tempDataBounds.setXMin(this.overrideXMin.value);
            if (isFinite(this.overrideXMax.value))
                this.tempDataBounds.setXMax(this.overrideXMax.value);
            if (isFinite(this.overrideYMin.value))
                this.tempDataBounds.setYMin(this.overrideYMin.value);
            if (isFinite(this.overrideYMax.value))
                this.tempDataBounds.setYMax(this.overrideYMax.value);

            if (this.enableFixedAspectRatio.value) {
                var xScale = this.tempDataBounds.getWidth() / this.tempScreenBounds.getXCoverage();
                var yScale = this.tempDataBounds.getHeight() / this.tempScreenBounds.getYCoverage();
                // keep greater data-to-pixel ratio because we want to zoom out if necessary
                if (xScale > yScale)
                    this.tempDataBounds.setHeight(this.tempScreenBounds.getYCoverage() * xScale);
                if (yScale > xScale)
                    this.tempDataBounds.setWidth(this.tempScreenBounds.getXCoverage() * yScale);
            }
        }

        var overrideBounds = isFinite(this.overrideXMin.value) || isFinite(this.overrideXMax.value) || isFinite(this.overrideYMin.value) || isFinite(this.overrideYMax.value);
        if (!this.tempScreenBounds.isEmpty() && !this.overrideBounds) {
            //var minSize = Math.min(minScreenSize.value, tempScreenBounds.getXCoverage(), tempScreenBounds.getYCoverage());

            if (!this.tempDataBounds.isUndefined() && !this.fullDataBounds.isUndefined()) {
                // Enforce pan restrictions on tempDataBounds.
                // Center of visible dataBounds should be a point inside fullDataBounds.
                this.fullDataBounds.constrainBoundsCenterPoint(this.tempDataBounds);
                //fullDataBounds.constrainBounds(tempDataBounds);
            }
        }

        // save new bounds
        this.zoomBounds.setBounds(this.tempDataBounds, this.tempScreenBounds, this.enableFixedAspectRatio.value);
        if (this.enableAutoZoomToSelection.value) {
            //zoomToSelection();
        }


        // ----------------- hack --------------------
        this.hack_updateZoom_callbacks.forEach(function (callback) {
            callback();
        });
        // -------------------------------------------

        WeaveAPI.SessionManager.getCallbackCollection(this.zoomBounds).resumeCallbacks();
        WeaveAPI.SessionManager.getCallbackCollection(this).resumeCallbacks();

        this._lazyUpdateZoom = true;*/
    }

    /**
     * This function gets called by updateZoom and updates fullDataBounds.
     */
    p.updateFullDataBounds = function () {
        this.tempBounds.copyFrom(this.fullDataBounds);
        this.fullDataBounds.reset();
        var plotterNames = this.plotters.getNames(weavetool.IPlotter)
        for (var i = 0; i < plotterNames.length; i++) {
            var name = plotterNames[i];
            var settings = this.layerSettings.getObject(name);

            // skip excluded layers
            if (!this.includeNonSelectableLayersInAutoZoom.value && !settings.selectable.value)
                continue;

            // skip invisible layers
            if (!settings.visible.value)
                continue;

            var spatialIndex = this._name_to_SpatialIndex[name];
            this.fullDataBounds.includeBounds(spatialIndex.collectiveBounds);

            var plotter = this.plotters.getObject(name);
            plotter.getBackgroundDataBounds(this.tempDataBounds);
            this.fullDataBounds.includeBounds(this.tempDataBounds);
        }
        // ----------------- hack --------------------
        if (this.hack_adjustFullDataBounds !== null)
            this.hack_adjustFullDataBounds();
        // -------------------------------------------

        if (!this.tempBounds.equals(this.fullDataBounds)) {
            //trace('fullDataBounds changed',ObjectUtil.toString(fullDataBounds));
            WeaveAPI.SessionManager.getCallbackCollection(this).triggerCallbacks();
        }
    }

    /**
     * This function sets the data bounds for zooming, but checks them against the min and max zoom first.
     * @param bounds The bounds that zoomBounds should be set to.
     * @see weave.primitives.ZoomBounds#setDataBounds()
     */
    p.setCheckedZoomDataBounds = function (dataBounds) {
        // instead of calling zoomBounds.setDataBounds() directly, we use setZoomLevel() because it's easier to constrain between min and max zoom.

        this.zoomBounds.getScreenBounds(this.tempScreenBounds);
        var minSize = Math.min(this.minScreenSize.value, this.tempScreenBounds.getXCoverage(), this.tempScreenBounds.getYCoverage());
        var newZoomLevel = weavecore.StandardLib.roundSignificant(
            weavecore.StandardLib.constrain(
                weavetool.ZoomUtils.getZoomLevel(dataBounds, this.tempScreenBounds, this.fullDataBounds, minSize),
                this.minZoomLevel.value,
                this.maxZoomLevel.value
            )
        );

        // stop if constrained zoom level doesn't change
        if (this.getZoomLevel() === newZoomLevel)
            return;

        var cc = WeaveAPI.SessionManager.getCallbackCollection(this.zoomBounds);
        cc.delayCallbacks();

        this.setZoomLevel(newZoomLevel);
        this.zoomBounds.getDataBounds(this.tempDataBounds);
        if (this.tempDataBounds.isUndefined())
            this.tempDataBounds.copyFrom(dataBounds);
        else
            this.tempDataBounds.setCenter(dataBounds.getXCenter(), dataBounds.getYCenter());
        this.zoomBounds.setDataBounds(this.tempDataBounds);

        // ----------------- hack --------------------
        this.hack_updateZoom_callbacks.forEach(function (callback) {
            callback();
        });
        // -------------------------------------------

        cc.resumeCallbacks();
    }


    /**
     * This function gets the current zoom level as defined in ZoomUtils.
     * @return The current zoom level.
     * @see weave.utils.ZoomUtils#getZoomLevel
     */
    p.getZoomLevel = function () {
        this.zoomBounds.getDataBounds(this.tempDataBounds);
        this.zoomBounds.getScreenBounds(this.tempScreenBounds);
        var minSize = Math.min(this.minScreenSize.value, this.tempScreenBounds.getXCoverage(), this.tempScreenBounds.getYCoverage());
        var zoomLevel = weavetool.ZoomUtils.getZoomLevel(this.tempDataBounds, this.tempScreenBounds, this.fullDataBounds, minSize);
        return zoomLevel;
    }

    /**
     * This function sets the zoom level as defined in ZoomUtils.
     * @param newZoomLevel The new zoom level.
     * @see weave.utils.ZoomUtils#getZoomLevel
     */
    p.setZoomLevel = function (newZoomLevel) {
        newZoomLevel = weavecore.StandardLib.roundSignificant(newZoomLevel);
        var currentZoomLevel = this.getZoomLevel();
        var newConstrainedZoomLevel = weavecore.StandardLib.constrain(newZoomLevel, this.minZoomLevel.value, this.maxZoomLevel.value);
        if (newConstrainedZoomLevel !== currentZoomLevel) {
            var scale = 1 / Math.pow(2, newConstrainedZoomLevel - currentZoomLevel);
            if (!isNaN(scale) && scale !== 0) {
                this.zoomBounds.getDataBounds(this.tempDataBounds);
                this.tempDataBounds.setWidth(this.tempDataBounds.getWidth() * scale);
                this.tempDataBounds.setHeight(this.tempDataBounds.getHeight() * scale);
                this.zoomBounds.setDataBounds(this.tempDataBounds);
            }
        }
    }



    if (typeof exports !== 'undefined') {
        module.exports = PlotManager;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.PlotManager = PlotManager;
    }

    weavecore.ClassUtils.registerClass('weavetool.PlotManager', weavetool.PlotManager);

}());
