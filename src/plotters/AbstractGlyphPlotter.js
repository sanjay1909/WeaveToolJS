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
