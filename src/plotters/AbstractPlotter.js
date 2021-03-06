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
    Object.defineProperty(AbstractPlotter, 'NS', {
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
    Object.defineProperty(AbstractPlotter, 'CLASS_NAME', {
        value: 'AbstractPlotter'
    });


    /**
     * A class implementing AbstractPlotter defines the properties required to display shapes corresponding to record keys.
     * The interface includes basic functions for drawing and getting bounding boxes.
     * This interface is meant to be as lightweight and generic as possible.
     *
     * @author adufilie
     * @author sanjay1909
     */
    function AbstractPlotter() {
        weavetool.IPlotter.call(this);
        /**
         * This variable should not be set manually.  It cannot be made constant because we cannot guarantee that it will be initialized
         * before other properties are initialized, which means it may be null when someone wants to call registerSpatialProperty().
         */
        this._spatialCallbacks = null;

        /**
         * This is an interface for adding callbacks that get called when any spatial properties of the plotter change.
         * Spatial properties are those that affect the data bounds of visual elements.
         */
        Object.defineProperty(this, 'spatialCallbacks', {
            get: function () {
                if (this._spatialCallbacks === null)
                    this._spatialCallbacks = WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.CallbackCollection());
                return this._spatialCallbacks;
            }
        });

        /**
         * This variable is returned by get keySet().
         */
        Object.defineProperty(this, '_filteredKeySet', {
            value: this.newSpatialProperty(weavedata.FilteredKeySet)
        });

        /**
         * @return An IKeySet interface to the record keys that can be passed to the drawRecord() and getDataBoundsFromRecordKey() functions.
         */
        Object.defineProperty(this, 'filteredKeySet', {
            get: function () {
                return this._filteredKeySet;
            }
        });




    }

    AbstractPlotter.prototype = new weavetool.IPlotter();
    AbstractPlotter.prototype.constructor = AbstractPlotter;
    var p = AbstractPlotter.prototype;

    /**
     * This function creates a new registered linkable child of the plotter whose callbacks will also trigger the spatial callbacks.
     * @return A new instance of the specified class that is registered as a spatial property.
     */
    p.newSpatialProperty = function (linkableChildClass, callback, useGroupedCallback) {
        callback = (callback === undefined) ? null : callback;
        useGroupedCallback = (useGroupedCallback === undefined) ? false : useGroupedCallback;
        var child = WeaveAPI.SessionManager.registerLinkableChild(this, new linkableChildClass(), callback, useGroupedCallback);

        var thisCC = WeaveAPI.SessionManager.getCallbackCollection(this);
        var childCC = WeaveAPI.SessionManager.getCallbackCollection(child);
        // instead of triggering parent callbacks, trigger spatialCallbacks which will in turn trigger parent callbacks.
        childCC.removeCallback(thisCC.triggerCallbacks);
        WeaveAPI.SessionManager.registerLinkableChild(this.spatialCallbacks, child);

        return child;
    }

    /**
     * This function registers a linkable child of the plotter whose callbacks will also trigger the spatial callbacks.
     * @param child An object to register as a spatial property.
     * @return The child object.
     */
    p.registerSpatialProperty = function (child, callback, useGroupedCallback) {
        callback = (callback === undefined) ? null : callback;
        useGroupedCallback = (useGroupedCallback === undefined) ? false : useGroupedCallback;
        WeaveAPI.SessionManager.registerLinkableChild(this, child, callback, useGroupedCallback);

        var thisCC = WeaveAPI.SessionManager.getCallbackCollection(this);
        var childCC = WeaveAPI.SessionManager.getCallbackCollection(child);
        // instead of triggering parent callbacks, trigger spatialCallbacks which will in turn trigger parent callbacks.
        childCC.removeCallback(thisCC.triggerCallbacks);
        WeaveAPI.SessionManager.registerLinkableChild(this.spatialCallbacks, child);

        return child;
    }

    /**
     * This will set up the keySet so it provides keys in sorted order based on the values in a list of columns.
     * @param columns An Array of IAttributeColumns to use for comparing IQualifiedKeys.
     * @param sortDirections Array of sort directions corresponding to the columns and given as integers (1=ascending, -1=descending, 0=none).
     * @see weave.data.KeySets.FilteredKeySet#setColumnKeySources()
     */
    p.setColumnKeySources = function (columns, sortDirections) {
        this._filteredKeySet.setColumnKeySources(columns, sortDirections);
    }

    /**
     * This function sets the base IKeySet that is being filtered.
     * @param newBaseKeySet A new IKeySet to use as the base for this FilteredKeySet.
     */
    p.setSingleKeySource = function (keySet) {
        this._filteredKeySet.setSingleKeySource(keySet);
    }



    if (typeof exports !== 'undefined') {
        module.exports = AbstractPlotter;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.AbstractPlotter = AbstractPlotter;
    }

    weavecore.ClassUtils.registerClass('weavetool.AbstractPlotter', weavetool.AbstractPlotter);

}());
