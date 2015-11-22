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

        //protectedConst
        Object.defineProperties(this, {
            'filteredDataX': {
                value: WeaveAPI.SessionManager.registerDisposableChild(this, new weavedata.FilteredColumn())
            },
            'filteredDataY': {
                value: WeaveAPI.SessionManager.registerDisposableChild(this, new weavedata.FilteredColumn())
            }
        });

        Object.defineProperties(this, {
            'statsX': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, WeaveAPI.StatisticsCache.getColumnStatistics(this.filteredDataX))
            },
            'statsY': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, WeaveAPI.StatisticsCache.getColumnStatistics(this.filteredDataY))
            }
        });


        Object.defineProperty(this, 'dataX', {
            get: function () {
                return this.filteredDataX.internalDynamicColumn;
            }
        });
        Object.defineProperty(this, 'dataY', {
            get: function () {
                return this.filteredDataY.internalDynamicColumn;
            }
        });


        this.setColumnKeySources([this.dataX, this.dataY]);

        // filter x and y columns so background data bounds will be correct
        this.filteredDataX.filter.requestLocalObject(weavedata.FilteredKeySet, true);
        this.filteredDataY.filter.requestLocalObject(weavedata.FilteredKeySet, true);

        this.registerSpatialProperty(this.dataX);
        this.registerSpatialProperty(this.dataY);

        WeaveAPI.SessionManager.linkSessionState(this._filteredKeySet.keyFilter, this.filteredDataX.filter);
        WeaveAPI.SessionManager.linkSessionState(this._filteredKeySet.keyFilter, this.filteredDataY.filter);



    }

    AbstractGlyphPlotter.prototype = new weavetool.AbstractPlotter();
    AbstractGlyphPlotter.prototype.constructor = AbstractGlyphPlotter;
    var p = AbstractGlyphPlotter.prototype;

    /**
     * This function returns a Bounds2D object set to the data bounds associated with the background.
     * @param output A Bounds2D object to store the result in.
     */
    p.getBackgroundDataBounds = function (output) {
        // use filtered data so data bounds will not include points that have been filtered out.
        if (this.zoomToSubset.value) {
            output.reset();
        } else {
            output.setBounds(
                this.statsX.getMin(),
                this.statsY.getMin(),
                this.statsX.getMax(),
                this.statsY.getMax()
            );
        }
    }


    if (typeof exports !== 'undefined') {
        module.exports = AbstractGlyphPlotter;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.AbstractGlyphPlotter = AbstractGlyphPlotter;
    }

    weavecore.ClassUtils.registerClass('weavetool.AbstractGlyphPlotter', weavetool.AbstractGlyphPlotter);

}());
