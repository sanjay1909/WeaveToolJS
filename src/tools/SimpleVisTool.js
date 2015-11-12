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
    Object.defineProperty(SimpleVisTool, 'NS', {
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
    Object.defineProperty(SimpleVisTool, 'CLASS_NAME', {
        value: 'SimpleVisTool'
    });


    /**
     * This is an interface to identify Visualization tools
     *
     * @author adufilie
     * @author sanjay1909
     */
    function SimpleVisTool() {
        weavetool.DraggablePanel.call(this);

        Object.defineProperties(this, {
            'enableTitle': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(false), handleTitleToggleChange.bind(this), true)
            },
            'children': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableHashMap())
            }
        });
    }

    function handleTitleToggleChange() {

    }

    SimpleVisTool.prototype = new weavetool.DraggablePanel();
    SimpleVisTool.prototype.constructor = SimpleVisTool;
    var p = SimpleVisTool.prototype;




    if (typeof exports !== 'undefined') {
        module.exports = SimpleVisTool;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.SimpleVisTool = SimpleVisTool;
    }

    weavecore.ClassUtils.registerClass('weavetool.SimpleVisTool', weavetool.SimpleVisTool);

}());
