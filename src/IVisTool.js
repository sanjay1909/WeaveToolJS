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
    Object.defineProperty(IVisTool, 'NS', {
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
    Object.defineProperty(IVisTool, 'CLASS_NAME', {
        value: 'IVisTool'
    });


    /**
     * This is an interface to identify Visualization tools
     *
     * @author adufilie
     * @author sanjay1909
     */
    function IVisTool() {
        weavecore.ILinkableObject.call(this);
    }

    IVisTool.prototype = new weavecore.ILinkableObject();
    IVisTool.prototype.constructor = IVisTool;
    var p = IVisTool.prototype;




    if (typeof exports !== 'undefined') {
        module.exports = IVisTool;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.IVisTool = IVisTool;
    }

    weavecore.ClassUtils.registerClass('weavetool.IVisTool', weavetool.IVisTool);

}());
