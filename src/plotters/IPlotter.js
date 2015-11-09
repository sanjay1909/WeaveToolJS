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
    Object.defineProperty(IPlotter, 'NS', {
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
    Object.defineProperty(IPlotter, 'CLASS_NAME', {
        value: 'IPlotter'
    });


    /**
     * A class implementing IPlotter defines the properties required to display shapes corresponding to record keys.
     * The interface includes basic functions for drawing and getting bounding boxes.
     * This interface is meant to be as lightweight and generic as possible.
     *
     * @author adufilie
     * @author sanjay1909
     */
    function IPlotter() {
        weavecore.ILinkableObject.call(this);
    }

    IPlotter.prototype = new weavecore.ILinkableObject();
    IPlotter.prototype.constructor = IPlotter;
    var p = IPlotter.prototype;




    if (typeof exports !== 'undefined') {
        module.exports = IPlotter;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.IPlotter = IPlotter;
    }

    weavecore.ClassUtils.registerClass('weavetool.IPlotter', weavetool.IPlotter);

}());
