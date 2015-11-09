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
