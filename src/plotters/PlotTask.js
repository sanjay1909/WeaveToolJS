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
    Object.defineProperty(PlotTask, 'NS', {
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
    Object.defineProperty(PlotTask, 'CLASS_NAME', {
        value: 'PlotTask'
    });

    Object.defineProperty(PlotTask, 'debug', {
        value: false
    });

    Object.defineProperty(PlotTask, 'TASK_TYPE_SUBSET', {
        value: 0
    });
    Object.defineProperty(PlotTask, 'TASK_TYPE_SELECTION', {
        value: 1
    });
    Object.defineProperty(PlotTask, 'TASK_TYPE_PROBE', {
        value: 2
    });




    /**
     * A class implementing PlotTask defines the properties required to display shapes corresponding to record keys.
     * The interface includes basic functions for drawing and getting bounding boxes.
     * This interface is meant to be as lightweight and generic as possible.
     *
     * @author adufilie
     * @author sanjay1909
     */
    function PlotTask(taskType, plotter, spatialIndex, zoomBounds, layerSettings) {
        weavecore.ILinkableObject.call(this);
        this._taskType = taskType;
        this._plotter = plotter;
        this._spatialIndex = spatialIndex;
        this._zoomBounds = zoomBounds;
        this._layerSettings = layerSettings;

        this._delayInit = false;
        this._pendingInit = false;
        this._iteration = 0;
        this._iterationStopTime;
        this._keyFilter;
        this._recordKeys;
        this._asyncState = {};
        this._pendingKeys;
        this._iPendingKey;
        this._progress = 0;
        this._prevBusyGroupTriggerCounter = 0;

        /**
         * When this is set to true, the async task will be paused.
         */
        this.delayAsyncTask = false;

        Object.defineProperty(this, '_dependencies', {
            value: WeaveAPI.SessionManager.registerDisposableChild(this, new weavecore.CallbackCollection())
        });

        Object.defineProperty(this, '_asyncSort', {
            value: WeaveAPI.SessionManager.registerDisposableChild(this, new weavecore.AsyncSort())
        });

        Object.defineProperty(this, 'taskType', {
            get: function () {
                return this._taskType;
            }
        });

        Object.defineProperty(this, 'progress', {
            get: function () {
                return this._progress;
            }
        });





        /**
         * These are the IQualifiedKey objects identifying which records should be rendered
         */
        Object.defineProperty(this, 'recordKeys', {
            get: function () {
                return this._recordKeys;
            }
        });


        /**
         * This counter is incremented after each iteration.  When the task parameters change, this counter is reset to zero.
         */
        Object.defineProperty(this, 'iteration', {
            get: function () {
                return this._iteration;
            }
        });


        /**
         * This is the time at which the current iteration should be stopped.  Compare this value with getTimer().
         */
        Object.defineProperty(this, 'iterationStopTime', {
            get: function () {
                return this._iterationStopTime;
            }
        });


        /**
         * This object can be used to optionally store additional state variables for resuming an asynchronous task where it previously left off.
         * Setting this will not reset the iteration counter.
         */
        Object.defineProperty(this, 'asyncState', {
            get: function () {
                return this._asyncState;
            },
            set: function (value) {
                return this._asyncState = value;
            }
        });




        // TEMPORARY SOLUTION until we start using VisToolGroup
        var subsetFilter = this._plotter.filteredKeySet.keyFilter;

        var keyFilters = [subsetFilter, this._layerSettings.selectionFilter, this._layerSettings.probeFilter];
        var keyFilter = keyFilters[this._taskType];

        // _dependencies is used as the parent so we can check its busy status with a single function call.
        var list = [this._plotter, this._spatialIndex, this._layerSettings, keyFilter];
        list.forEach(function (dependency) {
            WeaveAPI.SessionManager.registerLinkableChild(this._dependencies, dependency);
        }, this);


        this._dependencies.addImmediateCallback(this, asyncStart.bind(this), true);

        //linkBindableProperty(_layerSettings.visible, completedBitmap, 'visible');
    }

    function asyncStart() {
        if (asyncInit.call(this)) {
            if (PlotTask.debug)
                trace(this, 'begin async rendering');
            // normal priority because rendering is not often a prerequisite for other tasks
            WeaveAPI.StageUtils.startTask(this, asyncIterate.bind(this), WeaveAPI.TASK_PRIORITY_NORMAL, asyncComplete.bind(this), weavecore.StandardLib.replace("Plotting {0} for {1}", ['subset', 'selection', 'mouseover'][this._taskType], WeaveAPI.debugID(this._plotter)));

            // assign secondary busy task in case async task gets cancelled due to busy dependencies
            WeaveAPI.SessionManager.assignBusyTask(this._dependencies, this);
        } else {
            if (PlotTask.debug)
                trace(this, 'should not be rendered');
        }
    }

    /**
     * This returns true if the layer should be rendered and selectable/probeable
     * @return true if the layer should be rendered and selectable/probeable
     */
    function shouldBeRendered() {
        var visible = true;
        if (!this._layerSettings.visible.value) {
            if (PlotTask.debug)
                console.log(this, 'visible=false');
            visible = false;
        } else if (!this._layerSettings.selectable.value && this._taskType != PlotTask.TASK_TYPE_SUBSET && !this._layerSettings.alwaysRenderSelection.value) {
            if (PlotTask.debug)
                console.log(this, 'selection disabled');
            visible = false;
        } else {
            // HACK - begin validating spatial index if necessary, because this may affect zoomBounds
            if (WeaveAPI.detectLinkableObjectChange(this._spatialIndex.createIndex, this._plotter.spatialCallbacks))
                this._spatialIndex.createIndex(this._plotter, this._layerSettings.hack_includeMissingRecordBounds);

            // if scale is undefined, request geometry detail because this may affect zoomBounds
            /* if (isNaN(_zoomBounds.getXScale()))
             	hack_requestGeometryDetail();*/


            // visible = this._layerSettings.isZoomBoundsWithinVisibleScale(this._zoomBounds);
            /*if (!WeaveAPI.detectLinkableObjectChange(shouldBeRendered, this._plotter.dataX)) {
                visible = false;
            }*/
        }

        if (!visible && WeaveAPI.SessionManager.linkableObjectIsBusy(this)) {

            WeaveAPI.SessionManager.unassignBusyTask(this._dependencies);

            /*disposeObject(bufferBitmap.bitmapData);
            bufferBitmap.bitmapData = null;
            disposeObject(completedBitmap.bitmapData);
            completedBitmap.bitmapData = null;
            completedDataBounds.reset();
            completedScreenBounds.reset();*/
        }
        return visible;
    }

    /**
     * @return true if shouldBeRendered() returns true.
     */
    function asyncInit() {
        var shouldRender = shouldBeRendered.call(this);
        if (this._delayInit) {
            this._pendingInit = true;
            return shouldRender;
        }
        this._pendingInit = false;

        this._progress = 0;
        this._iteration = 0;
        this._iPendingKey = 0;
        if (shouldRender) {
            this._pendingKeys = this._plotter.filteredKeySet.keys;
            this._recordKeys = [];
            /*_zoomBounds.getDataBounds(_dataBounds);
            _zoomBounds.getScreenBounds(_screenBounds);*/
            if (this._taskType === PlotTask.TASK_TYPE_SUBSET) {
                // TEMPORARY SOLUTION until we start using VisToolGroup
                this._keyFilter = this._plotter.filteredKeySet.keyFilter.getInternalKeyFilter();
                //_keyFilter = _layerSettings.subsetFilter.getInternalKeyFilter();
            } else if (this._taskType === PlotTask.TASK_TYPE_SELECTION)
                this._keyFilter = this._layerSettings.selectionFilter.getInternalKeyFilter();
            else if (this._taskType === PlotTask.TASK_TYPE_PROBE)
                this._keyFilter = this._layerSettings.probeFilter.getInternalKeyFilter();

            if (PlotTask.debug)
                console.log(this, 'clear');
            // clear bitmap and resize if necessary
            //PlotterUtils.setBitmapDataSize(bufferBitmap, _unscaledWidth, _unscaledHeight);
        } else {
            // clear graphics if not already cleared
            /* PlotterUtils.emptyBitmapData(bufferBitmap);
             PlotterUtils.emptyBitmapData(completedBitmap);
             completedDataBounds.reset();
             completedScreenBounds.reset();*/
            _pendingKeys = null;
            _recordKeys = null;
        }
        return shouldRender;
    }

    function getTimer() {
        return new Date().getTime();
    }

    function asyncIterate(stopTime) {
        /* if (debugMouseDownPause && WeaveAPI.StageUtils.mouseButtonDown)
             return 0;*/

        if (this.delayAsyncTask)
            return 0;

        // if plotter is busy, stop immediately
        if (WeaveAPI.SessionManager.linkableObjectIsBusy(this._dependencies)) {
            if (PlotTask.debug)
                console.log(this, 'dependencies are busy');
            /* if (!debugIgnoreSpatialIndex)
                 return 1;*/

            // only spend half the time rendering when dependencies are busy
            stopTime = (getTimer() + stopTime) / 2;
        }

        /***** initialize *****/

        // restart if necessary, initializing variables
        if (this._prevBusyGroupTriggerCounter !== this._dependencies.triggerCounter) {
            this._prevBusyGroupTriggerCounter = this._dependencies.triggerCounter;

            // stop immediately if we shouldn't be rendering
            if (!asyncInit.call(this))
                return 1;

            // stop immediately if the bitmap is invalid
            /*if (PlotterUtils.bitmapDataIsEmpty(bufferBitmap)) {
                if (debug)
                    trace(this, 'bitmap is empty');
                return 1;
            }*/

            // hacks
            //TO-DO enable this after geometry concept is implemented
            //hack_requestGeometryDetail();

            // hack - draw background on subset layer
            /*if (this._taskType === PlotTask.TASK_TYPE_SUBSET)
                _plotter.drawBackground(_dataBounds, _screenBounds, bufferBitmap.bitmapData);*/
        }

        /***** prepare keys *****/

        // if keys aren't ready yet, prepare keys
        if (this._pendingKeys) {
            for (; this._iPendingKey < this._pendingKeys.length; this._iPendingKey++) {
                // avoid doing too little or too much work per iteration
                if (getTimer() > stopTime)
                    return 0; // not done yet

                // next key iteration - add key if included in filter and on screen
                var key = this._pendingKeys[this._iPendingKey];
                if (!this._keyFilter || this._keyFilter.containsKey(key)) // accept all keys if _keyFilter is null
                {
                    var keysArray = this._spatialIndex.getBoundsFromKey(key)
                    for (var i = 0; i < keysArray.length; i++) {
                        var keyBounds = keysArray[i];
                        if (keyBounds.overlaps(this._dataBounds)) {
                            if (!keyBounds.isUndefined() || this._layerSettings.hack_includeMissingRecordBounds) {
                                this._recordKeys.push(key);
                                break;
                            }
                        }
                    }

                }
            }
            if (PlotTask.debug)
                console.log(this, 'recordKeys', this._recordKeys.length);

            // done with keys
            this._pendingKeys = null;
        }

        /***** draw *****/

        // next draw iteration
        this._iterationStopTime = stopTime;

        while (this._progress < 1 && getTimer() < stopTime) {
            // delay asyncInit() while calling plotter function in case it triggers callbacks
            //this._delayInit = true;


            if (this._iteration < this.recordKeys.length) {
                this._progress = this.iteration / task.recordKeys.length;
            } else {
                this._progress = 1;
            }

            /*if (PlotTask.debug)
                console.log(this, 'before iteration', this._iteration, 'recordKeys', this.recordKeys.length);
            this._progress = this._plotter.drawPlotAsyncIteration(this);
            if (PlotTask.debug)
                console.log(this, 'after iteration', this._iteration, 'progress', this._progress, 'recordKeys', this.recordKeys.length);*/

            //this._delayInit = false;
            console.log(this, 'after iteration', this._iteration, 'progress', this._progress, 'recordKeys', this.recordKeys.length);
            if (this._pendingInit) {
                // if we get here it means the plotter draw function triggered callbacks
                // and we need to restart the async task.
                if (asyncInit.call(this))
                    return asyncIterate.call(this, stopTime);
                else
                    return 1;
            } else
                this._iteration++; // prepare for next iteration
        }

        return this._progress;
    }

    function asyncComplete() {
        if (PlotTask.debug)
            console.log(this, 'rendering completed');
        this._progress = 0;
        // don't do anything else if dependencies are busy
        if (WeaveAPI.SessionManager.linkableObjectIsBusy(this._dependencies))
            return;

        // busy task gets unassigned when the render completed successfully
        WeaveAPI.SessionManager.unassignBusyTask(this._dependencies);

        if (shouldBeRendered.call(this)) {
            // BitmapData has been completely rendered, so update completedBitmap and completedDataBounds
            /*var oldBitmapData: BitmapData = completedBitmap.bitmapData;
            completedBitmap.bitmapData = bufferBitmap.bitmapData;
            bufferBitmap.bitmapData = oldBitmapData;
            PlotterUtils.clearBitmapData(bufferBitmap);
            completedDataBounds.copyFrom(_dataBounds);
            completedScreenBounds.copyFrom(_screenBounds);*/

            WeaveAPI.SessionManager.getCallbackCollection(this).triggerCallbacks();
        }
    }

    PlotTask.prototype = new weavecore.ILinkableObject();
    PlotTask.prototype.constructor = PlotTask;
    var p = PlotTask.prototype;

    p.dispose = function () {
        _plotter = null;
        _spatialIndex = null;
        _zoomBounds = null;
        _layerSettings = null;
        //WeaveAPI.SessionManager.disposeObject(completedBitmap.bitmapData);
        //WeaveAPI.SessionManager.disposeObject(bufferBitmap.bitmapData);
    }


    if (typeof exports !== 'undefined') {
        module.exports = PlotTask;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.PlotTask = PlotTask;
    }

    weavecore.ClassUtils.registerClass('weavetool.PlotTask', weavetool.PlotTask);

}());
