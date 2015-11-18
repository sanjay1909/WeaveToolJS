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
    Object.defineProperty(LayerSettings, 'NS', {
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
    Object.defineProperty(LayerSettings, 'CLASS_NAME', {
        value: 'LayerSettings'
    });


    /**
     * Settings for a single plot layer.
     *
     * @author adufilie
     * @author sanjay1909
     */
    function LayerSettings() {
        weavecore.ILinkableObject.call(this);


        Object.defineProperties(this, {
            'visible': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true)) //When this is false, nothing will be drawn.
            },
            'alpha': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(1, isFinite)) // Alpha value (opacity) for rendering the layer.
            },
            'selectable': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true)) //When this is false, selection and probing are disabled.
            },
            'alwaysRenderSelection': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(false)) // Specifies whether selection/probe should be rendered anyway, even if selectable is set to false.
            },
            'minVisibleScale': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(0, verifyVisibleScaleValue)) //Sets the minimum scale at which the layer should be rendered. Scale is defined by pixels per data unit.
            },
            'maxVisibleScale': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(Infinity, verifyVisibleScaleValue)) // Sets the maximum scale at which the layer should be rendered. Scale is defined by pixels per data unit.
            }
        });

        Object.defineProperties(this, {
            'selectionFilter': {
                value: WeaveAPI.SessionManager.registerDisposableChild(this, new weavedata.DynamicKeyFilter())
            },
            'alpha': {
                value: WeaveAPI.SessionManager.registerDisposableChild(this, new weavedata.DynamicKeyFilter())
            }
        });

        // hacks
        this.hack_includeMissingRecordBounds = false; // hack to include records with undefined bounds
        this.hack_useTextBitmapFilters = false; // hack to use text bitmap filters (for labels, legends)

        this.selectionFilter.targetPath = ["defaultSelectionKeySet"];
        this.probeFilter.targetPath = ["defaultProbeKeySet"];


    }

    /**
     * @private
     */
    function verifyVisibleScaleValue(value) {
        return value >= 0;
    }

    LayerSettings.prototype = new weavecore.ILinkableObject();
    LayerSettings.prototype.constructor = LayerSettings;
    var p = LayerSettings.prototype;




    if (typeof exports !== 'undefined') {
        module.exports = LayerSettings;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.LayerSettings = LayerSettings;
    }

    weavecore.ClassUtils.registerClass('weavetool.LayerSettings', weavetool.LayerSettings);

}());






/*public function isZoomBoundsWithinVisibleScale(zoomBounds:ZoomBounds):Boolean
{
	var min:Number = StandardLib.roundSignificant(minVisibleScale.value);
	var max:Number = StandardLib.roundSignificant(maxVisibleScale.value);
	var xScale:Number = StandardLib.roundSignificant(zoomBounds.getXScale());
	var yScale:Number = StandardLib.roundSignificant(zoomBounds.getYScale());
	return min <= xScale && xScale <= max
		&& min <= yScale && yScale <= max;
}*/
