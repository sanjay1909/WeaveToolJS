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
    Object.defineProperty(IVisTool, 'NS', {
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
    Object.defineProperty(IVisTool, 'CLASS_NAME', {
        value: 'IVisTool'
    });


    /**
     * This is an interface to identify Visualization tools
     *
     * @author adufilie
     * @author sanjay1909
     */
    function IVisTool() {
        weavecore.ILinkableObject.call(this);
    }

    IVisTool.prototype = new weavecore.ILinkableObject();
    IVisTool.prototype.constructor = IVisTool;
    var p = IVisTool.prototype;




    if (typeof exports !== 'undefined') {
        module.exports = IVisTool;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.IVisTool = IVisTool;
    }

    weavecore.ClassUtils.registerClass('weavetool.IVisTool', weavetool.IVisTool);

}());

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
    Object.defineProperty(IPlotter, 'NS', {
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
    Object.defineProperty(IPlotter, 'CLASS_NAME', {
        value: 'IPlotter'
    });


    /**
     * A class implementing IPlotter defines the properties required to display shapes corresponding to record keys.
     * The interface includes basic functions for drawing and getting bounding boxes.
     * This interface is meant to be as lightweight and generic as possible.
     *
     * @author adufilie
     * @author sanjay1909
     */
    function IPlotter() {
        weavecore.ILinkableObject.call(this);
    }

    IPlotter.prototype = new weavecore.ILinkableObject();
    IPlotter.prototype.constructor = IPlotter;
    var p = IPlotter.prototype;




    if (typeof exports !== 'undefined') {
        module.exports = IPlotter;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.IPlotter = IPlotter;
    }

    weavecore.ClassUtils.registerClass('weavetool.IPlotter', weavetool.IPlotter);

}());

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
    Object.defineProperty(AbstractPlotter, 'NS', {
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
    Object.defineProperty(AbstractPlotter, 'CLASS_NAME', {
        value: 'AbstractPlotter'
    });


    /**
     * A class implementing AbstractPlotter defines the properties required to display shapes corresponding to record keys.
     * The interface includes basic functions for drawing and getting bounding boxes.
     * This interface is meant to be as lightweight and generic as possible.
     *
     * @author adufilie
     * @author sanjay1909
     */
    function AbstractPlotter() {
        weavetool.IPlotter.call(this);
        /**
         * This variable should not be set manually.  It cannot be made constant because we cannot guarantee that it will be initialized
         * before other properties are initialized, which means it may be null when someone wants to call registerSpatialProperty().
         */
        this._spatialCallbacks = null;

        /**
         * This is an interface for adding callbacks that get called when any spatial properties of the plotter change.
         * Spatial properties are those that affect the data bounds of visual elements.
         */
        Object.defineProperty(this, 'spatialCallbacks', {
            get: function () {
                if (this._spatialCallbacks === null)
                    this._spatialCallbacks = WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.CallbackCollection());
                return this._spatialCallbacks;
            }
        });


    }

    AbstractPlotter.prototype = new weavetool.IPlotter();
    AbstractPlotter.prototype.constructor = AbstractPlotter;
    var p = AbstractPlotter.prototype;

    /**
     * This function creates a new registered linkable child of the plotter whose callbacks will also trigger the spatial callbacks.
     * @return A new instance of the specified class that is registered as a spatial property.
     */
    p.newSpatialProperty = function (linkableChildClass, callback, useGroupedCallback) {
        callback = (callback === undefined) ? null : callback;
        useGroupedCallback = (useGroupedCallback === undefined) ? false : useGroupedCallback;
        var child = WeaveAPI.SessionManager.registerLinkableChild(this, new linkableChildClass(), callback, useGroupedCallback);

        var thisCC = WeaveAPI.SessionManager.getCallbackCollection(this);
        var childCC = WeaveAPI.SessionManager.getCallbackCollection(child);
        // instead of triggering parent callbacks, trigger spatialCallbacks which will in turn trigger parent callbacks.
        childCC.removeCallback(thisCC.triggerCallbacks);
        WeaveAPI.SessionManager.registerLinkableChild(this.spatialCallbacks, child);

        return child;
    }

    /**
     * This function registers a linkable child of the plotter whose callbacks will also trigger the spatial callbacks.
     * @param child An object to register as a spatial property.
     * @return The child object.
     */
    p.registerSpatialProperty = function (child, callback, useGroupedCallback) {
        callback = (callback === undefined) ? null : callback;
        useGroupedCallback = (useGroupedCallback === undefined) ? false : useGroupedCallback;
        WeaveAPI.SessionManager.registerLinkableChild(this, child, callback, useGroupedCallback);

        var thisCC = WeaveAPI.SessionManager.getCallbackCollection(this);
        var childCC = WeaveAPI.SessionManager.getCallbackCollection(child);
        // instead of triggering parent callbacks, trigger spatialCallbacks which will in turn trigger parent callbacks.
        childCC.removeCallback(thisCC.triggerCallbacks);
        WeaveAPI.SessionManager.registerLinkableChild(this.spatialCallbacks, child);

        return child;
    }



    if (typeof exports !== 'undefined') {
        module.exports = AbstractPlotter;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.AbstractPlotter = AbstractPlotter;
    }

    weavecore.ClassUtils.registerClass('weavetool.AbstractPlotter', weavetool.AbstractPlotter);

}());

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
    Object.defineProperty(AbstractGlyphPlotter, 'NS', {
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
    Object.defineProperty(AbstractGlyphPlotter, 'CLASS_NAME', {
        value: 'AbstractGlyphPlotter'
    });


    /**
     * This is an interface to identify Visualization tools
     *
     * @author adufilie
     * @author sanjay1909
     */
    function AbstractGlyphPlotter() {
        weavetool.AbstractPlotter.call(this);

        Object.defineProperties(this, {
            'zoomToSubset': {
                value: this.registerSpatialProperty(new weavecore.LinkableBoolean(false))
            },
            'sourceProjection': {
                value: this.newSpatialProperty(weavecore.LinkableString)
            },
            'destinationProjection': {
                value: this.newSpatialProperty(weavecore.LinkableString)
            }
        });
    }

    AbstractGlyphPlotter.prototype = new weavetool.AbstractPlotter();
    AbstractGlyphPlotter.prototype.constructor = AbstractGlyphPlotter;
    var p = AbstractGlyphPlotter.prototype;




    if (typeof exports !== 'undefined') {
        module.exports = AbstractGlyphPlotter;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.AbstractGlyphPlotter = AbstractGlyphPlotter;
    }

    weavecore.ClassUtils.registerClass('weavetool.AbstractGlyphPlotter', weavetool.AbstractGlyphPlotter);

}());

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
    Object.defineProperty(ScatterplotPlotter, 'NS', {
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
    Object.defineProperty(ScatterplotPlotter, 'CLASS_NAME', {
        value: 'ScatterplotPlotter'
    });


    /**
     *
     * @author adufilie
     * @author sanjay1909
     */
    function ScatterplotPlotter() {
        weavetool.AbstractGlyphPlotter.call(this);

        Object.defineProperties(this, {
            'sizeBy': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavedata.DynamicColumn())
            },
            'minScreenRadius': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(3, isFinite))
            },
            'maxScreenRadius': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(25, isFinite))
            },
            'defaultScreenRadius': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(5, isFinite))
            },
            'showSquaresForMissingSize': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true))
            },
            'line': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavetool.SolidLineStyle())
            },
            'fill': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavetool.SolidFillStyle())
            },
            'colorBySize': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(false))
            },
            'colorNegative': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(0x800000))
            },
            'colorPositive': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(0x800000))
            }
        });
    }

    ScatterplotPlotter.prototype = new weavetool.AbstractGlyphPlotter();
    ScatterplotPlotter.prototype.constructor = ScatterplotPlotter;
    var p = ScatterplotPlotter.prototype;




    if (typeof exports !== 'undefined') {
        module.exports = ScatterplotPlotter;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.ScatterplotPlotter = ScatterplotPlotter;
    }

    weavecore.ClassUtils.registerClass('weavetool.ScatterplotPlotter', weavetool.ScatterplotPlotter);

}());

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
    Object.defineProperty(SimpleAxisPlotter, 'NS', {
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
    Object.defineProperty(SimpleAxisPlotter, 'CLASS_NAME', {
        value: 'SimpleAxisPlotter'
    });


    /**
     * This is an interface to identify Visualization tools
     *
     * @author adufilie
     * @author sanjay1909
     */
    function SimpleAxisPlotter() {
        weavetool.AbstractPlotter.call(this);

        Object.defineProperties(this, {
            'axisLabelHorizontalDistance': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(-10, isFinite))
            },
            'axisLabelVerticalDistance': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(0, isFinite))
            },
            'axisLabelRelativeAngle': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(-45, isFinite))
            },
            'axisGridLineThickness': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(1, isFinite))
            },
            'axisGridLineColor': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(0xDDDDDD))
            },
            'axisGridLineAlpha': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(1, isFinite))
            },
            'axesThickness': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(10, isFinite))
            },
            'axesColor': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(0xB0B0B0))
            },
            'axesAlpha': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(1, isFinite))
            },
            'axisLineDataBounds': {
                value: this.newSpatialProperty(weavedata.LinkableBounds2D)
            },
            'axisLineMinValue': {
                value: this.newSpatialProperty(weavecore.LinkableNumber)
            },
            'axisLineMaxValue': {
                value: this.newSpatialProperty(weavecore.LinkableNumber)
            },
            'tickMinValue': {
                value: this.newSpatialProperty(weavecore.LinkableNumber)
            },
            'tickMaxValue': {
                value: this.newSpatialProperty(weavecore.LinkableNumber)
            },
            'overrideAxisName': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString())
            },
            'showAxisName': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true))
            },
            'tickCountRequested': {
                value: this.registerSpatialProperty(new weavecore.LinkableNumber(10))
            },
            'forceTickCount': {
                value: this.registerSpatialProperty(new weavecore.LinkableBoolean(false))
            },
            'showLabels': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true))
            },
            'labelNumberFormatter': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavedata.LinkableNumberFormatter())
            },
            'labelTextAlignment': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString('left'))
            },
            'labelHorizontalAlign': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString('right'))
            },
            'labelVerticalAlign': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString('middle'))
            },
            'labelWordWrapSize': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(80))
            },
            'labelFunction': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableFunction(SimpleAxisPlotter.DEFAULT_LABEL_FUNCTION))
            }

        });
    }

    SimpleAxisPlotter.DEFAULT_LABEL_FUNCTION = "< ![CDATA[ function (number, string, column) { return string; } ]] > ";

    SimpleAxisPlotter.prototype = new weavetool.AbstractPlotter();
    SimpleAxisPlotter.prototype.constructor = SimpleAxisPlotter;
    var p = SimpleAxisPlotter.prototype;




    if (typeof exports !== 'undefined') {
        module.exports = SimpleAxisPlotter;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.SimpleAxisPlotter = SimpleAxisPlotter;
    }

    weavecore.ClassUtils.registerClass('weavetool.SimpleAxisPlotter', weavetool.SimpleAxisPlotter);

}());

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
    Object.defineProperty(SolidFillStyle, 'NS', {
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
    Object.defineProperty(SolidFillStyle, 'CLASS_NAME', {
        value: 'SolidFillStyle'
    });


    /**
     * This is an interface to identify Visualization tools
     *
     * @author adufilie
     * @author sanjay1909
     */
    function SolidFillStyle() {
        weavecore.ILinkableObject.call(this);


        Object.defineProperties(this, {
            'enable': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true))
            },
            'color': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavedata.AlwaysDefinedColumn(NaN))
            },
            'alpha': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavedata.AlwaysDefinedColumn(1.0))
            }
        });


    }

    SolidFillStyle.prototype = new weavecore.ILinkableObject();
    SolidFillStyle.prototype.constructor = SolidFillStyle;
    var p = SolidFillStyle.prototype;




    if (typeof exports !== 'undefined') {
        module.exports = SolidFillStyle;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.SolidFillStyle = SolidFillStyle;
    }

    weavecore.ClassUtils.registerClass('weavetool.SolidFillStyle', weavetool.SolidFillStyle);

}());
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
    Object.defineProperty(SolidLineStyle, 'NS', {
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
    Object.defineProperty(SolidLineStyle, 'CLASS_NAME', {
        value: 'SolidLineStyle'
    });


    /**
     * This is an interface to identify Visualization tools
     *
     * @author adufilie
     * @author sanjay1909
     */
    function SolidLineStyle() {
        weavecore.ILinkableObject.call(this);


        Object.defineProperties(this, {
            'enable': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true))
            },
            'color': {
                value: createColumn(0x000000)
            },
            'weight': {
                value: createColumn(1)
            },
            'alpha': {
                value: createColumn(0.5)
            },
            'pixelHinting': {
                value: createColumn(false)
            },
            'scaleMode': {
                value: createColumn('normal')
            },
            'caps': {
                value: createColumn(null)
            },
            'joints': {
                value: createColumn(null)
            },
            'miterLimit': {
                value: createColumn(3)
            }
        });


    }

    function createColumn(defaultValue) {
        var column = WeaveAPI.SessionManager.registerLinkableChild(this, new weavedata.AlwaysDefinedColumn());
        column.defaultValue.value = defaultValue;
        return column;
    }

    SolidLineStyle.prototype = new weavecore.ILinkableObject();
    SolidLineStyle.prototype.constructor = SolidLineStyle;




    if (typeof exports !== 'undefined') {
        module.exports = SolidLineStyle;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.SolidLineStyle = SolidLineStyle;
    }

    weavecore.ClassUtils.registerClass('weavetool.SolidLineStyle', weavetool.SolidLineStyle);

}());
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
    }

    PlotManager.prototype = new weavecore.ILinkableObject();
    PlotManager.prototype.constructor = PlotManager;
    var p = PlotManager.prototype;

    /**
     * This function will update the fullDataBounds and zoomBounds based on the current state of the layers.
     */
    function updateZoom(now) {
        /*now = (now === undefined) ? false : now;
        if (this._lazyUpdateZoom && !now) {
            this._shouldUpdateZoom = true;
            return;
        }
        this._lazyUpdateZoom = false;
        this._shouldUpdateZoom = false;

        // make sure callbacks only trigger once
        WeaveAPI.SessionManager.getCallbackCollection(this).delayCallbacks();
        WeaveAPI.SessionManager.getCallbackCollection(this.zoomBounds).delayCallbacks();
        //trace('begin updateZoom',ObjectUtil.toString(getSessionState(zoomBounds)));

        // make sure numeric margin values are correct
        this.marginBottomNumber.value = Math.round(NumberUtils.getNumberFromNumberOrPercent(this.marginBottom.value, this._unscaledHeight));
        this.marginTopNumber.value = Math.round(NumberUtils.getNumberFromNumberOrPercent(this.marginTop.value, this._unscaledHeight));
        this.marginLeftNumber.value = Math.round(NumberUtils.getNumberFromNumberOrPercent(this.marginLeft.value, this._unscaledWidth));
        this.marginRightNumber.value = Math.round(NumberUtils.getNumberFromNumberOrPercent(this.marginRight.value, this._unscaledWidth));

        updateFullDataBounds();

        // calculate new screen bounds in temp variable
        // default behaviour is to set screenBounds beginning from lower-left corner and ending at upper-right corner
        var left = this.marginLeftNumber.value;
        var top = this.marginTopNumber.value;
        var right = this._unscaledWidth - this.marginRightNumber.value;
        var bottom = this._unscaledHeight - this.marginBottomNumber.value;
        // set screenBounds beginning from lower-left corner and ending at upper-right corner
        //TODO: is other behavior required?
        tempScreenBounds.setBounds(left, bottom, right, top);
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
        if (this.enableAutoZoomToSelection.value)
            zoomToSelection();

        // ----------------- hack --------------------
        hack_updateZoom_callbacks.forEach(function (callback) {
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
        /*this.tempBounds.copyFrom(this.fullDataBounds);
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

            var spatialIndex = _name_to_SpatialIndex[name];
            fullDataBounds.includeBounds(spatialIndex.collectiveBounds);

            var plotter = this.plotters.getObject(name);
            plotter.getBackgroundDataBounds(tempDataBounds);
            fullDataBounds.includeBounds(tempDataBounds);
        }
        // ----------------- hack --------------------
        if (hack_adjustFullDataBounds != null)
            hack_adjustFullDataBounds();
        // -------------------------------------------

        if (!this.tempBounds.equals(this.fullDataBounds)) {
            //trace('fullDataBounds changed',ObjectUtil.toString(fullDataBounds));
            WeaveAPI.SessionManager.getCallbackCollection(this).triggerCallbacks();
        }*/
    }



    if (typeof exports !== 'undefined') {
        module.exports = PlotManager;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.PlotManager = PlotManager;
    }

    weavecore.ClassUtils.registerClass('weavetool.PlotManager', weavetool.PlotManager);

}());

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
    Object.defineProperty(Visualization, 'NS', {
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
    Object.defineProperty(Visualization, 'CLASS_NAME', {
        value: 'Visualization'
    });


    /**
     * This is an interface to identify Visualization tools
     *
     * @author adufilie
     * @author sanjay1909
     */
    function Visualization() {
        weavecore.ILinkableObject.call(this);

        Object.defineProperty(this, 'plotManager', {
            value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavetool.PlotManager())
        });
    }

    Visualization.prototype = new weavecore.ILinkableObject();
    Visualization.prototype.constructor = Visualization;
    var p = Visualization.prototype;




    if (typeof exports !== 'undefined') {
        module.exports = Visualization;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.Visualization = Visualization;
    }

    weavecore.ClassUtils.registerClass('weavetool.Visualization', weavetool.Visualization);

}());

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
    Object.defineProperty(InteractiveVisualization, 'NS', {
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
    Object.defineProperty(InteractiveVisualization, 'CLASS_NAME', {
        value: 'InteractiveVisualization'
    });


    /**
     * This is an interface to identify Visualization tools
     *
     * @author adufilie
     * @author sanjay1909
     */
    function InteractiveVisualization() {
        weavetool.Visualization.call(this);

        Object.defineProperties(this, {
            'enableZoomAndPan': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true))
            },
            'enableSelection': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true))
            },
            'enableProbe': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true))
            },
            'zoomFactor': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(2, verifyZoomFactor.bind(this)))
            }
        });

    }

    function verifyZoomFactor(value) {
        return value >= 1;
    }

    InteractiveVisualization.prototype = new weavetool.Visualization();
    InteractiveVisualization.prototype.constructor = InteractiveVisualization;
    var p = InteractiveVisualization.prototype;




    if (typeof exports !== 'undefined') {
        module.exports = InteractiveVisualization;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.InteractiveVisualization = InteractiveVisualization;
    }

    weavecore.ClassUtils.registerClass('weavetool.InteractiveVisualization', weavetool.InteractiveVisualization);

}());

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
    }

    SimpleInteractiveVisualization.prototype = new weavetool.InteractiveVisualization();
    SimpleInteractiveVisualization.prototype.constructor = SimpleInteractiveVisualization;
    var p = SimpleInteractiveVisualization.prototype;




    if (typeof exports !== 'undefined') {
        module.exports = SimpleInteractiveVisualization;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.SimpleInteractiveVisualization = SimpleInteractiveVisualization;
    }

    weavecore.ClassUtils.registerClass('weavetool.SimpleInteractiveVisualization', weavetool.SimpleInteractiveVisualization);

}());

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
    Object.defineProperty(DraggablePanel, 'NS', {
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
    Object.defineProperty(DraggablePanel, 'CLASS_NAME', {
        value: 'DraggablePanel'
    });


    /**
     * This is an interface to identify Visualization tools
     *
     * @author adufilie
     * @author sanjay1909
     */
    function DraggablePanel() {
        weavecore.ILinkableObject.call(this);

        Object.defineProperties(this, {
            'panelX': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString(null, weavedata.NumberUtils.verifyNumberOrPercentage))
            },
            'panelY': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString(null, weavedata.NumberUtils.verifyNumberOrPercentage))
            },
            'panelWidth': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString(null, weavedata.NumberUtils.verifyNumberOrPercentage))
            },
            'panelHeight': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString(null, weavedata.NumberUtils.verifyNumberOrPercentage))
            },
            'maximized': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(false, verifyMaximized.bind(this)), handleMaximizedChange.bind(this), true)
            },
            'minimized': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(false, verifyMinimized.bind(this)), handleMinimizedChange.bind(this), true)
            },
            'zOrder': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(0, weavecore.StandardLib.isDefined), handleZOrderChange.bind(this), true)
            },
            'panelTitle': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString(), handlePanelTitleChange, true)
            },
            'enableMoveResize': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true), panelNeedsUpdate, true)
            },
            'enableSubMenu': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(false))
            },
            'minimizable': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true), panelNeedsUpdate, true)
            },
            'maximizable': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true), panelNeedsUpdate, true)
            },
            'enableZOrder': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true), panelNeedsUpdate, true)
            },
            'closeable': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true), panelNeedsUpdate, true)
            },
            'enableBorders': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true), panelNeedsUpdate, true)
            },
            'panelBorderColor': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(NaN), handleBorderColorChange, true)
            },
            'panelBackgroundColor': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(NaN), handleBackgroundColorChange, true)
            },
            'buttonRadius': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(3, isFinite), panelNeedsUpdate, true)
            },
            'panelStyleList': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString(), handlePanelStyleListChange, true)
            }
        });
    }

    function verifyMinimized(value) {
        return !this.minimizable || this.minimizable.value || !value;
    }

    function verifyMaximized(value) {
        return !this.maximizable || this.maximizable.value || !value;
    }

    function handleMaximizedChange() {
        /*copyCoordinatesFromSessionedProperties();

        setupButtonIcons(maximizeButton, maximized.value ? _unmaximizeIcon : _maximizeIcon);
        maximizeButton.toolTip = maximized.value ? lang(TOOLTIP_RESTORE) : lang(TOOLTIP_MAXIMIZE);*/
    }

    function handleMinimizedChange() {
        /*if (minimized.value) // minimize
				{
					enabled = visible = false;
					if (!minimizedComponentVersion)
						minimizedComponentVersion = VisTaskbar.instance.addMinimizedComponent(this, restorePanel);
				}
				else // restore
				{
					enabled = visible = true;
					if (minimizedComponentVersion)
						VisTaskbar.instance.removeMinimizedComponent(minimizedComponentVersion);
					minimizedComponentVersion = null;
					copyCoordinatesFromSessionedProperties();

					// this fixes the display bugs that occur when restoring a minimized window
					updateBorders();
				}*/
    }

    function handleZOrderChange() {
        /*if (zOrder.value == 0)
        {
        	zOrderButton.toolTip = lang(TOOLTIP_ZORDER);
        	setupButtonIcons(zOrderButton, [icon_zOrder, icon_zOrderReverse, icon_zOrder]);
        	zOrderButton.setStyle("fillColors", [_titleBarButtonBackgroundColor, _titleBarButtonBackgroundColor]);
        }
        else
        {
        	if (zOrder.value < 0)
        	{
        		zOrderButton.toolTip = lang("Always below");
        		setupButtonIcons(zOrderButton, [icon_zOrderBelow, icon_zOrderBelow_color, icon_zOrderBelow_color]);
        	}
        	else
        	{
        		zOrderButton.toolTip = lang("Always above");
        		setupButtonIcons(zOrderButton, [icon_zOrderAbove, icon_zOrderAbove_color, icon_zOrderAbove_color]);
        	}
        	zOrderButton.setStyle("fillColors", [_titleBarButtonSelectedColor, _titleBarButtonSelectedColor]);
        }
        updatePanelZOrder();*/
    }

    function handlePanelTitleChange() {
        /*if (panelTitle.value)
        {
        	panelTitleFunction.value = '`' + panelTitle.value.split('`').join('\\`') + '`';
        	// title will be automatically updated by grouped callback
        }
        else
        {
        	title = defaultPanelTitle;
        }*/
    }

    function panelNeedsUpdate() {
        /*if (!parent)
        	return;

        // disable highlight when borders are disabled (avoids display bug when corners are rounded)
        setStyle('highlightAlphas', enableBorders.value ? undefined : [0,0]);

        _enableMoveResize = (!Weave.properties.dashboardMode.value && enableMoveResize.value) || adminMode;
        if (!enableMoveResize.value && _enableMoveResize)
        	_moveImage.alpha = 0.1;
        else
        	_moveImage.alpha = 0.25;

        if (!maximizable.value)
        	maximized.value = false;
        if (!minimizable.value)
        	minimized.value = false;
        if (!enableZOrder.value)
        	zOrder.value = 0;

        invalidateSize();
        invalidateDisplayList();
        updateBorders();*/
    }

    function handleBorderColorChange() {
        //updateBorders();
    }

    function handleBackgroundColorChange() {
        //updateBorders();
    }


    function handlePanelStyleListChange() {
        /*_overriddenStyles = new Object();

        try
        {
        	var ss:StyleSheet = new StyleSheet();
        	var styleName:String = 'panel';
        	ss.parseCSS(styleName + '{' + panelStyleList.value + '}');
        	var style:Object = ss.getStyle(styleName);
        	for (var propName:String in style)
        	{
        		var value:* = style[propName];

        		// the only case that seems to cause problems is Numbers, which will not get parsed properly when
        		// in String format by getStyle(...).  If it is a valid Number, cast it to one
        		try {
        			_overriddenStyles[propName] = Number(value);
        		} catch (e:Error) { } // ok if number parse fails

        		if (isNaN(_overriddenStyles[propName]))
        			_overriddenStyles[propName] = String(value);
        	}
        }
        catch(error:Error) { } // ok if style parse fails

        // notify style change, just a random style chosen here so we only call it once instead of in the loop above
        // this causes the style changes above to take effect
        styleChanged("headerHeight");
        notifyStyleChangeInChildren("headerHeight", true);*/
    }


    DraggablePanel.prototype = new weavecore.ILinkableObject();
    DraggablePanel.prototype.constructor = DraggablePanel;
    var p = DraggablePanel.prototype;




    if (typeof exports !== 'undefined') {
        module.exports = DraggablePanel;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.DraggablePanel = DraggablePanel;
    }

    weavecore.ClassUtils.registerClass('weavetool.DraggablePanel', weavetool.DraggablePanel);

}());

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
    Object.defineProperty(SimpleVisTool, 'NS', {
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
    Object.defineProperty(SimpleVisTool, 'CLASS_NAME', {
        value: 'SimpleVisTool'
    });


    /**
     * This is an interface to identify Visualization tools
     *
     * @author adufilie
     * @author sanjay1909
     */
    function SimpleVisTool() {
        weavetool.DraggablePanel.call(this);

        Object.defineProperties(this, {
            'enableTitle': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(false), handleTitleToggleChange.bind(this), true)
            },
            'children': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableHashMap())
            }
        });
    }

    function handleTitleToggleChange() {

    }

    SimpleVisTool.prototype = new weavetool.DraggablePanel();
    SimpleVisTool.prototype.constructor = SimpleVisTool;
    var p = SimpleVisTool.prototype;




    if (typeof exports !== 'undefined') {
        module.exports = SimpleVisTool;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.SimpleVisTool = SimpleVisTool;
    }

    weavecore.ClassUtils.registerClass('weavetool.SimpleVisTool', weavetool.SimpleVisTool);

}());

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
    Object.defineProperty(ScatterplotTool, 'NS', {
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
    Object.defineProperty(ScatterplotTool, 'CLASS_NAME', {
        value: 'ScatterplotTool'
    });


    /**
     *
     * @author adufilie
     * @author sanjay1909
     */
    function ScatterplotTool() {
        weavetool.SimpleVisTool.call(this);

        Object.defineProperties(this, {
            'isVisibleEquationTextBoolean': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true))
            },
            'attributesToIncludeInProbe': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableVariable(Array, null, null), handleAttributesToIncludeInProbe.bind(this), true)
            }
        });
    }

    function handleAttributesToIncludeInProbe() {

    }

    ScatterplotTool.prototype = new weavetool.SimpleVisTool();
    ScatterplotTool.prototype.constructor = ScatterplotTool;
    var p = ScatterplotTool.prototype;




    if (typeof exports !== 'undefined') {
        module.exports = ScatterplotTool;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.ScatterplotTool = ScatterplotTool;
    }

    weavecore.ClassUtils.registerClass('weavetool.ScatterplotTool', weavetool.ScatterplotTool);

}());

/* ***** BEGIN LICENSE BLOCK *****
 *
 * This file is part of Weave.
 *
 * The Initial Developer of Weave is the Institute for Visualization
 * and Perception Research at the University of Massachusetts Lowell.
 * Portions created by the Initial Developer are Copyright (C) 2008-2015
 * the Initial Developer. All Rights Reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * ***** END LICENSE BLOCK ***** */

/* "use strict"; */

/*if (!weave.WeavePath)
    return;*/

var checkType = weave.evaluateExpression(null, "(o, type) => o instanceof type");

/**
 * Requests that a panel object be created if it doesn't already exist at the current path.
 * @param type The type of panel requested.
 * @param x A numeric value for the panel X coordinate.
 * @param y A numeric value for the panel Y coordinate.
 * @param width A numeric value for the panel width.
 * @param height A numeric value for the panel height.
 * @return The current WeavePath object.
 */
weave.WeavePath.prototype.requestPanel = function (type, x, y, width, height) {
    this.request(type);

    if (!checkType(this, 'weavetool.DraggablePanel'))
        this._failMessage('requestPanel', type + " is not a DraggablePanel type.", this._path);

    /*var snap = weave.path('WeaveProperties', 'windowSnapGridSize').getState() || '';
    if (snap.indexOf('%') >= 0) {
        x = x + '%';
        y = y + '%';
        width = width + '%';
        height = height + '%';
    }*/
    return this.state({
        panelX: x,
        panelY: y,
        panelWidth: width,
        panelHeight: height
    });
};

/**
 * This is a shortcut for pushing the path to a plotter from the current path, which should reference a visualization tool.
 * @param plotterName (Optional) The name of an existing or new plotter.
 *                    If omitted and the current path points to a LayerSettings object, the corresponding plotter will be used.
 *                    Otherwise if omitted the default plotter name ("plot") will be used.
 * @param plotterType (Optional) The type of plotter to request if it doesn't exist yet.
 * @return A new WeavePath object which remembers the current WeavePath as its parent.
 */
weave.WeavePath.prototype.pushPlotter = function (plotterName, plotterType, index) {
    index = (index === undefined) ? 0 : index;
    var pathArray = [];
    if (index > 0) {
        for (var i = 0; i <= index; i++) {
            pathArray[i] = this._path[i]
        }
    }
    var tool = this.weave.path(pathArray);
    if (!checkType(tool, 'weavetool.SimpleVisTool'))
        this._failMessage('pushPlotter', "Not a compatible visualization tool", this._path);

    if (!plotterName)
        plotterName = checkType(this, 'LayerSettings') ? this._path[this._path.length - 1] : 'plot';

    var result = tool.push('children', 'visualization', 'plotManager', 'plotters', plotterName);
    result._parent = this;
    if (plotterType)
        result.request(plotterType);
    return result;
};

/**
 * This is a shortcut for pushing the path to a LayerSettings object from the current path, which should reference a visualization tool.
 * @param plotterName (Optional) The name of an existing plotter.
 *                    If omitted, either the plotter at the current path or the default plotter ("plot") will be used.
 * @return A new WeavePath object which remembers the current WeavePath as its parent.
 */
weave.WeavePath.prototype.pushLayerSettings = function (plotterName, index) {
    index = (index === undefined) ? 0 : index;
    var tool = this.weave.path(this._path[index]);
    if (!checkType(tool, 'weavetool.SimpleVisTool'))
        this._failMessage('pushLayerSettings', "Not a compatible visualization tool", this._path);

    if (!plotterName)
        plotterName = checkType(this, 'IPlotter') ? this._path[this._path.length - 1] : 'plot';

    var result = tool.push('children', 'visualization', 'plotManager', 'layerSettings', plotterName);
    result._parent = this;
    return result;
};
