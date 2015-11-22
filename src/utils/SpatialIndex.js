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
    Object.defineProperty(SpatialIndex, 'NS', {
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
    Object.defineProperty(SpatialIndex, 'CLASS_NAME', {
        value: 'SpatialIndex'
    });


    Object.defineProperty(SpatialIndex, 'debug', {
        value: false
    });


    /**
     * A class implementing SpatialIndex defines the properties required to display shapes corresponding to record keys.
     * The interface includes basic functions for drawing and getting bounding boxes.
     * This interface is meant to be as lightweight and generic as possible.
     *
     * @author adufilie
     * @author sanjay1909
     */
    function SpatialIndex() {
        weavecore.ILinkableObject.call(this);
        this.callbacks = WeaveAPI.SessionManager.getCallbackCollection(this);
        this._plotter;
        this._queryMissingBounds;
        this._restarted;
        this._keysIndex;
        this._keysArray = [];
        this._restarted = false;
        this._boundsArrayIndex; // used by async code
        this._boundsArray; // used by async code

        this._keyToBoundsMap = new Map();


        /**
         * This bounds represents the full extent of the shape index.
         */
        Object.defineProperty(this, 'collectiveBounds', {
            get: function () {
                return new weavedata.Bounds2D();
            }
        });
        /**
         * The list of all the IQualifiedKey objects (record identifiers) referenced in this index.
         */
        Object.defineProperty(this, 'keys', {
            get: function () {
                return this._keysArray;
            }
        });

        Object.defineProperty(this, '_iterateAll', {
            value: weavecore.StageUtils.generateCompoundIterativeTask(_iterate0.bind(this), _iterate1.bind(this), _iterate2.bind(this))
        });





    }

    function getTimer() {
        return new Date().getTime();
    }

    function _iterate0() {
        this._restarted = false;

        var key;
        var bounds;
        var i;

        /*if (_plotter is IPlotterWithGeometries)
        	_keyToGeometriesMap = new Dictionary();
        else
        	_keyToGeometriesMap = null;*/

        this._keysArray.length = 0; // hack to prevent callbacks
        this.clear();

        // make a copy of the keys vector
        if (this._plotter)
            weavedata.VectorUtils.copy(this._plotter.filteredKeySet.keys, this._keysArray);

        // randomize the order of the shapes to avoid a possibly poorly-performing
        // KDTree structure due to the given ordering of the records
        //VectorUtils.randomSort(_keysArray);
        if (SpatialIndex.debug)
            console.log(this._plotter, this, 'keys', this._keysArray.length);

        return 1;
    }


    function _iterate1(stopTime) {
        for (; this._keysIndex < this._keysArray.length; this._keysIndex++) {
            if (this._restarted)
                return 0;
            if (getTimer() > stopTime)
                return this._keysIndex / this._keysArray.length;

            var key = this._keysArray[_keysIndex];
            var boundsArray = this._keyToBoundsMap.get(key);
            boundsArray = (boundsArray && boundsArray.constructor === Array) ? boundsArray : null;
            if (!boundsArray) {
                boundsArray = []
                this._keyToBoundsMap.set(key, boundsArray)
            }

            // this may trigger callbacks, which would cause us to skip the new key
            // at index 0 if we did not have _iterate0 as part of the async task
            this._plotter.getDataBoundsFromRecordKey(key, boundsArray);

            /*if (_keyToGeometriesMap != null)
            {
            	var geoms:Array = (_plotter as IPlotterWithGeometries).getGeometriesFromRecordKey(key);
            	_keyToGeometriesMap[key] = geoms;
            }*/
        }

        return this._restarted ? 0 : 1;
    }

    function _iterate2(stopTime) {
        for (; this._keysArrayIndex < this._keysArray.length; this._keysArrayIndex++) {
            var key = this._keysArray[this._keysArrayIndex];
            if (!_boundsArray) // is there an existing nested array?
            {
                //trace(key.keyType,key.localName,'(',_keysArrayIndex,'/',_keysArray.length,')');
                // begin outer loop iteration
                this._boundsArray = this._keyToBoundsMap.get(key);

                if (!this._boundsArray)
                    continue;

                this._boundsArrayIndex = 0;
            }
            for (; this._boundsArrayIndex < this._boundsArray.length; this._boundsArrayIndex++) // iterate on nested array
            {
                if (this._restarted)
                    return 0;
                if (getTimer() > stopTime)
                    return this._keysArrayIndex / this._keysArray.length;

                //trace('bounds(',_boundsArrayIndex,'/',_boundsArray.length,')');
                var bounds = this._boundsArray[this._boundsArrayIndex];
                // do not index shapes with undefined bounds
                //TODO: index shapes with missing bounds values into a different index
                // TEMPORARY SOLUTION: store missing bounds if queryMissingBounds == true
                /*if (!bounds.isUndefined() || _queryMissingBounds)
                	_kdTree.insert([bounds.getXNumericMin(), bounds.getYNumericMin(), bounds.getXNumericMax(), bounds.getYNumericMax(), bounds.getArea()], key);*/
                // always include bounds because it may have some coords defined while others aren't
                //collectiveBounds.includeBounds(bounds);
            }
            // all done with nested array
            this._boundsArray = null;
        }

        return this._restarted ? 0 : 1;
    }

    SpatialIndex.prototype = new weavecore.ILinkableObject();
    SpatialIndex.prototype.constructor = SpatialIndex;
    var p = SpatialIndex.prototype;


    /**
     * This function gets a list of Bounds2D objects associated with a key.
     * @param key A record key.
     * @result An Array of Bounds2D objects associated with the key, or null if there are none.
     */
    p.getBoundsFromKey = function (key) {
            return this._keyToBoundsMap.get(key);
        }
        /**
         * This function fills the spatial index with the data bounds of each record in a plotter.
         *
         * @param plotter An IPlotter object to index.
         */
    p.createIndex = function (plotter, queryMissingBounds) {
        if (SpatialIndex.debug)
            console.log(plotter, this, 'createIndex');

        this._plotter = plotter;
        this._queryMissingBounds = queryMissingBounds;
        this._restarted = true;

        this._iterateAll.call(this, -1); // restart from first task
        // normal priority because some things can be done without having a fully populated spatial index (?)
        WeaveAPI.StageUtils.startTask(this, this._iterateAll.bind(this), WeaveAPI.TASK_PRIORITY_NORMAL, this.callbacks.triggerCallbacks.bind(this.callbacks), weavecore.StandardLib.replace("Creating spatial index for {0}", WeaveAPI.debugID(plotter)));
    }


    /**
     * This function empties the spatial index.
     */
    p.clear = function () {
        this.callbacks.delayCallbacks();
        if (SpatialIndex.debug)
            console.log(this._plotter, this, 'clear');

        if (this._keysArray.length > 0)
            this.callbacks.triggerCallbacks();

        this._boundsArray = null;
        this._keysArrayIndex = 0;
        this._keysIndex = 0;
        this._keysArray.length = 0;
        //_kdTree.clear();
        //collectiveBounds.reset();

        this.callbacks.resumeCallbacks();
    }


    if (typeof exports !== 'undefined') {
        module.exports = SpatialIndex;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.SpatialIndex = SpatialIndex;
    }

    weavecore.ClassUtils.registerClass('weavetool.SpatialIndex', weavetool.SpatialIndex);

}());
