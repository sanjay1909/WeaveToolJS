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

    SimpleAxisPlotter.DEFAULT_LABEL_FUNCTION = function (number, string, column) {
        return string;
    };

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

        //private const
        Object.defineProperties(this, {
            '_titleTextFormatWatcher': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableWatcher())
            },
            '_labelTextFormatWatcher': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableWatcher())
            }
        });

    }



    SimpleAxisPlotter.prototype = new weavetool.AbstractPlotter();
    SimpleAxisPlotter.prototype.constructor = SimpleAxisPlotter;
    var p = SimpleAxisPlotter.prototype;

    p.setupTextFormats = function (titleTextFormat, labelTextFormat) {
        this._titleTextFormatWatcher.target = titleTextFormat;
        this._labelTextFormatWatcher.target = labelTextFormat;
    }


    if (typeof exports !== 'undefined') {
        module.exports = SimpleAxisPlotter;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.SimpleAxisPlotter = SimpleAxisPlotter;
    }

    weavecore.ClassUtils.registerClass('weavetool.SimpleAxisPlotter', weavetool.SimpleAxisPlotter);

}());
