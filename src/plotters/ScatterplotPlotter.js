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
