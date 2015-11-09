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
