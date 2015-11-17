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
    Object.defineProperty(SolidLineStyle, 'NS', {
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
    Object.defineProperty(SolidLineStyle, 'CLASS_NAME', {
        value: 'SolidLineStyle'
    });


    /**
     * This is an interface to identify Visualization tools
     *
     * @author adufilie
     * @author sanjay1909
     */
    function SolidLineStyle() {
        weavecore.ILinkableObject.call(this);


        Object.defineProperties(this, {
            'enable': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true))
            },
            'color': {
                value: createColumn.call(this, 0x000000)
            },
            'weight': {
                value: createColumn.call(this, 1)
            },
            'alpha': {
                value: createColumn.call(this, 0.5)
            },
            'pixelHinting': {
                value: createColumn.call(this, false)
            },
            'scaleMode': {
                value: createColumn.call(this, 'normal')
            },
            'caps': {
                value: createColumn.call(this, null)
            },
            'joints': {
                value: createColumn.call(this, null)
            },
            'miterLimit': {
                value: createColumn.call(this, 3)
            }
        });


    }

    function createColumn(defaultValue) {
        var column = WeaveAPI.SessionManager.registerLinkableChild(this, new weavedata.AlwaysDefinedColumn());
        column.defaultValue.value = defaultValue;
        return column;
    }

    SolidLineStyle.prototype = new weavecore.ILinkableObject();
    SolidLineStyle.prototype.constructor = SolidLineStyle;




    if (typeof exports !== 'undefined') {
        module.exports = SolidLineStyle;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.SolidLineStyle = SolidLineStyle;
    }

    weavecore.ClassUtils.registerClass('weavetool.SolidLineStyle', weavetool.SolidLineStyle);

}());
