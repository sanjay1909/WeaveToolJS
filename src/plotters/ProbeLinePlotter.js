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
    Object.defineProperty(ProbeLinePlotter, 'NS', {
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
    Object.defineProperty(ProbeLinePlotter, 'CLASS_NAME', {
        value: 'ProbeLinePlotter'
    });


    /**
     * This is an interface to identify Visualization tools
     *
     * @author adufilie
     * @author kmanohar
     * @author sanjay1909
     */
    function ProbeLinePlotter() {
        weavetool.AbstractPlotter.call(this);

    }



    ProbeLinePlotter.prototype = new weavetool.AbstractPlotter();
    ProbeLinePlotter.prototype.constructor = ProbeLinePlotter;
    var p = ProbeLinePlotter.prototype;




    if (typeof exports !== 'undefined') {
        module.exports = ProbeLinePlotter;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.ProbeLinePlotter = ProbeLinePlotter;
    }

    weavecore.ClassUtils.registerClass('weavetool.ProbeLinePlotter', weavetool.ProbeLinePlotter);

}());
