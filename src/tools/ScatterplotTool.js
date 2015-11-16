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
