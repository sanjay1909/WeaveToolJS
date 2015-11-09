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
