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

        // lock an InteractiveVisualization onto the panel
        this._visualization = this.children.requestObject("visualization", weavetool.SimpleInteractiveVisualization, true);

        // returns the interactive visualization
        Object.defineProperty(this, 'visualization', {
            get: function () {
                return this._visualization
            }
        });

        Object.defineProperty(this, 'mainLayerSettings', {
            get: function () {
                return this.visualization.getMainLayerSettings()
            }
        });

        Object.defineProperty(this, 'mainPlotter', {
            get: function () {
                return this.visualization.getMainPlotter()
            }
        });
        Object.defineProperty(this, 'xAxisPlotter', {
            get: function () {
                return this.visualization.getXAxisPlotter()
            }
        });
        Object.defineProperty(this, 'yAxisPlotter', {
            get: function () {
                return this.visualization.getYAxisPlotter()
            }
        });




        WeaveAPI.SessionManager.getCallbackCollection(weave.properties.visTitleTextFormat).addGroupedCallback(this, updateTitleLabel.bind(this), true);

    }

    function updateTitleLabel() {

        //Weave.properties.visTitleTextFormat.copyToStyle(visTitle);
    }

    function handleTitleToggleChange() {

    }

    SimpleVisTool.prototype = new weavetool.DraggablePanel();
    SimpleVisTool.prototype.constructor = SimpleVisTool;
    var p = SimpleVisTool.prototype;


    /**
     * @param mainPlotterClass The main plotter class definition.
     * @param showAxes Set to true if axes should be added.
     * @return The main plotter.
     */
    p.initializePlotters = function (mainPlotterClass, showAxes) {
        return this.visualization.initializePlotters(mainPlotterClass, showAxes);
    }

    if (typeof exports !== 'undefined') {
        module.exports = SimpleVisTool;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.SimpleVisTool = SimpleVisTool;
    }

    weavecore.ClassUtils.registerClass('weavetool.SimpleVisTool', weavetool.SimpleVisTool);

}());
