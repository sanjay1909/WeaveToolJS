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
    Object.defineProperty(ScatterPlotPlotter, 'NS', {
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
    Object.defineProperty(ScatterPlotPlotter, 'CLASS_NAME', {
        value: 'ScatterPlotPlotter'
    });


    /**
     *
     * @author adufilie
     * @author sanjay1909
     */
    function ScatterPlotPlotter() {
        weavetool.AbstractGlyphPlotter.call(this);

        Object.defineProperties(this, {
            'sizeBy': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavedata.DynamicColumn())
            },
            'minScreenRadius': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(3, isFinite))
            },
            'maxScreenRadius': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(25, isFinite))
            },
            'defaultScreenRadius': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(5, isFinite))
            },
            'showSquaresForMissingSize': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true))
            },
            'line': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavetool.SolidLineStyle())
            },
            'fill': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavetool.SolidFillStyle())
            },
            'colorBySize': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(false))
            },
            'colorNegative': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(0x800000))
            },
            'colorPositive': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(0x800000))
            }
        });

        Object.defineProperty(this, '_colorDataWatcher', {
            value: WeaveAPI.SessionManager.registerDisposableChild(this, new weavecore.LinkableWatcher())
        });

        this._extraKeyDependencies;
        this._keyInclusionLogic;



        this.fill.color.internalDynamicColumn.globalName = "defaultColorColumn";
        this.fill.color.internalDynamicColumn.addImmediateCallback(this, handleColor.bind(this), true);
        WeaveAPI.SessionManager.getCallbackCollection(this._colorDataWatcher).addImmediateCallback(this, updateKeySources.bind(this), true);
    }

    function handleColor() {
        var cc = (this.fill.color.getInternalColumn() && this.fill.color.getInternalColumn() instanceof weavedata.ColorColumn) ? this.fill.color.getInternalColumn() : null;
        var bc = cc ? ((cc.getInternalColumn() && cc.getInternalColumn() instanceof weavedata.BinnedColumn) ? cc.getInternalColumn() : null) : null;
        var fc = bc ? ((bc.getInternalColumn() && bc.getInternalColumn() instanceof weavedata.FilteredColumn) ? bc.getInternalColumn() : null) : null;
        var dc = fc ? fc.internalDynamicColumn : null;
        this._colorDataWatcher.target = dc || fc || bc || cc;
    }

    function updateKeySources() {
        var columns = [this.sizeBy];
        if (this._colorDataWatcher.target)
            columns.push(this._colorDataWatcher.target)
        columns.push(this.dataX, this.dataY);
        if (this._extraKeyDependencies)
            columns = columns.concat(this._extraKeyDependencies);

        // sort size descending, all others ascending
        var sortDirections = columns.map(function (c, i, a) {
            return i === 0 ? -1 : 1;
        });

        this._filteredKeySet.setColumnKeySources(columns, sortDirections, null, this._keyInclusionLogic);
    }

    ScatterPlotPlotter.prototype = new weavetool.AbstractGlyphPlotter();
    ScatterPlotPlotter.prototype.constructor = ScatterPlotPlotter;
    var p = ScatterPlotPlotter.prototype;

    p.hack_setKeyInclusionLogic = function (keyInclusionLogic, extraColumnDependencies) {
        this._extraKeyDependencies = extraColumnDependencies;
        this._keyInclusionLogic = keyInclusionLogic;
        updateKeySources.call(this);
    }

    p.getSelectableAttributeNames = function () {
        return ["X", "Y", "Color", "Size"];
    }
    p.getSelectableAttributes = function () {
        return [this.dataX, this.dataY, this.fill.color, this.sizeBy];
    }


    if (typeof exports !== 'undefined') {
        module.exports = ScatterPlotPlotter;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.ScatterPlotPlotter = ScatterPlotPlotter;
    }

    weavecore.ClassUtils.registerClass('weavetool.ScatterPlotPlotter', weavetool.ScatterPlotPlotter);

}());
