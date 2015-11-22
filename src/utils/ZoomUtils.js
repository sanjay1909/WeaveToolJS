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
    Object.defineProperty(ZoomUtils, 'NS', {
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
    Object.defineProperty(ZoomUtils, 'CLASS_NAME', {
        value: 'ZoomUtils'
    });

    ZoomUtils.tempPanBounds = new weavedata.Bounds2D(); // reusable temporary object used only by panDataBoundsByScreenCoordinates
    ZoomUtils.tempBounds = new weavedata.Bounds2D(); // reusable temporary object




    /**
     * @author adufilie
     * @author sanjay1909
     */
    function ZoomUtils() {



    }



    //ZoomUtils.prototype = new weavecore.ILinkableObject();
    // ZoomUtils.prototype.constructor = ZoomUtils;
    var p = ZoomUtils.prototype;

    /**
     * This function calculates the zoom level.  If dataBounds is scaled to fit into screenBounds,
     * the screen size of fullDataBounds would be 2^zoomLevel * minSize.  Zoom level is defined this way
     * to be compatible with the zoom level used by Google Maps and other tiled WMS services.
     * @param dataBounds The visible data coordinates.
     * @param screenBounds The visible screen coordinates.
     * @param fullDataBounds The full extent in data coordinates.
     * @param minScreenSize The minimum size that the fullDataBounds can appear as on the screen (the screen size of zoom level zero).
     * @return The zoom level, where the screen size of the full extent is 2^zoomLevel * minSize.
     */
    ZoomUtils.getZoomLevel = function (dataBounds, screenBounds, fullDataBounds, minScreenSize) {
        ZoomUtils.tempBounds.copyFrom(fullDataBounds);

        // project fullDataBounds to screen coordinates
        dataBounds.projectCoordsTo(ZoomUtils.tempBounds, screenBounds);

        // get screen size of fullDataBounds
        var screenSize;
        //If this is true, X coordinates will be used to calculate zoom level.  If this is false, Y coordinates will be used.
        var useXCoordinates = (fullDataBounds.getXCoverage() > fullDataBounds.getYCoverage()); // fit full extent inside min screen size
        if (useXCoordinates)
            screenSize = ZoomUtils.tempBounds.getWidth();
        else
            screenSize = ZoomUtils.tempBounds.getHeight();

        // calculate zoom level
        return Math.log(Math.abs(screenSize / minScreenSize)) / Math.LN2;
    }



    if (typeof exports !== 'undefined') {
        module.exports = ZoomUtils;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.ZoomUtils = ZoomUtils;
    }

    weavecore.ClassUtils.registerClass('weavetool.ZoomUtils', weavetool.ZoomUtils);

}());
