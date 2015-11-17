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
