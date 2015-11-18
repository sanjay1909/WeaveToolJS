(function () {

    function Weave() {

    }

    Object.defineProperties(Weave, {
        'DEFAULT_WEAVE_PROPERTIES': {
            value: 'WeaveProperties'
        },
        'DEFAULT_COLOR_COLUMN': {
            value: 'defaultColorColumn'
        },
        'DEFAULT_COLOR_BIN_COLUMN': {
            value: 'defaultColorBinColumn'
        },
        'DEFAULT_COLOR_DATA_COLUMN': {
            value: 'defaultColorDataColumn'
        },
        'DEFAULT_SUBSET_KEYFILTER': {
            value: 'defaultSubsetKeyFilter'
        },
        'DEFAULT_SELECTION_KEYSET': {
            value: 'defaultSelectionKeySet'
        },
        'DEFAULT_PROBE_KEYSET': {
            value: 'defaultProbeKeySet'
        },
        'ALWAYS_HIGHLIGHT_KEYSET': {
            value: 'alwaysHighlightKeySet'
        },
        'SAVED_SELECTION_KEYSETS': {
            value: 'savedSelections'
        },
        'SAVED_SUBSETS_KEYFILTERS': {
            value: 'savedSubsets'
        }
    });

    Object.defineProperties(Weave, {
        'defaultColorColumn': {
            get: function () {
                return WeaveAPI.globalHashMap.getObject(Weave.DEFAULT_COLOR_COLUMN);
            }
        },
        'defaultColorBinColumn': {
            get: function get() {
                return WeaveAPI.globalHashMap.getObject(Weave.DEFAULT_COLOR_BIN_COLUMN);
            }
        },
        'defaultColorDataColumn': {
            get: function get() {
                return WeaveAPI.globalHashMap.getObject(Weave.DEFAULT_COLOR_DATA_COLUMN);
            }
        },
        'defaultSubsetKeyFilter': {
            get: function get() {
                return WeaveAPI.globalHashMap.getObject(Weave.DEFAULT_SUBSET_KEYFILTER);
            }
        },
        'defaultSelectionKeySet': {
            get: function get() {
                return WeaveAPI.globalHashMap.getObject(Weave.DEFAULT_SELECTION_KEYSET);
            }
        },
        'defaultProbeKeySet': {
            get: function get() {
                return WeaveAPI.globalHashMap.getObject(Weave.DEFAULT_PROBE_KEYSET);
            }
        },
        'alwaysHighlightKeySet': {
            get: function get() {
                return WeaveAPI.globalHashMap.getObject(Weave.ALWAYS_HIGHLIGHT_KEYSET);
            }
        },
        'savedSelectionKeySets': {
            get: function get() {
                return WeaveAPI.globalHashMap.getObject(Weave.SAVED_SELECTION_KEYSETS);
            }
        },
        'savedSubsetsKeyFilters': {
            get: function get() {
                return WeaveAPI.globalHashMap.getObject(Weave.SAVED_SUBSETS_KEYFILTERS);
            }
        }
    });


    Weave._root = null; // root object of Weave

    /**
     * This initializes a default set of objects in an ILinkableHashMap.
     */
    Weave.createDefaultObjects = function (target) {
        if (target.objectIsLocked(Weave.DEFAULT_WEAVE_PROPERTIES))
            return;

        target.requestObject(Weave.DEFAULT_WEAVE_PROPERTIES, weavetool.WeaveProperties, true);

        // default color column
        var cc = target.requestObject(Weave.DEFAULT_COLOR_COLUMN, weavedata.ColorColumn, true);
        //To-do add support for binned column
        //var bc = cc.internalDynamicColumn.requestGlobalObject(Weave.DEFAULT_COLOR_BIN_COLUMN, weavedata.BinnedColumn, true);
        //var fc = bc.internalDynamicColumn.requestGlobalObject(Weave.DEFAULT_COLOR_DATA_COLUMN, weavedata.FilteredColumn, true);
        //fc.filter.requestGlobalObject(Weave.DEFAULT_SUBSET_KEYFILTER, weavedata.KeyFilter, false); // false to allow disabling filtering

        // default key sets
        var subset = target.requestObject(Weave.DEFAULT_SUBSET_KEYFILTER, weavedata.KeyFilter, true);
        subset.includeMissingKeys.value = true; // default subset should include all keys
        target.requestObject(Weave.DEFAULT_SELECTION_KEYSET, weavedata.KeySet, true);
        var probe = target.requestObject(Weave.DEFAULT_PROBE_KEYSET, weavedata.KeySet, true);
        var always = target.requestObject(Weave.ALWAYS_HIGHLIGHT_KEYSET, weavedata.KeySet, true);
        var callback = function () {
            probe.addKeys(always.keys);
        };
        probe.addImmediateCallback(always, callback);
        always.addImmediateCallback(probe, callback);

        target.requestObject(Weave.SAVED_SELECTION_KEYSETS, weavecore.LinkableHashMap, true);
        target.requestObject(Weave.SAVED_SUBSETS_KEYFILTERS, weavecore.LinkableHashMap, true);

        // clear history afterwards so that the creation of these default objects do not get recorded.
        Weave.history.clearHistory();
    }

    Object.defineProperty(Weave, 'root', {
        get: function () {
            Weave.createDefaultObjects(WeaveAPI.globalHashMap);
            return WeaveAPI.globalHashMap;
        }
    });


    Weave._history = null;
    Object.defineProperty(Weave, 'history', {
        get: function () {
            if (!Weave._history)
                Weave._history = new weavecore.SessionStateLog(WeaveAPI.globalHashMap, 100);
            return Weave._history;
        },
        set: function (history) {
            Weave._history = history;
        }
    });

    Object.defineProperty(Weave, 'properties', {
        get: function () {
            Weave.createDefaultObjects(WeaveAPI.globalHashMap);
            return Weave.root.getObject(Weave.DEFAULT_WEAVE_PROPERTIES);
        }
    });

    if (typeof exports !== 'undefined') {
        module.exports = Weave;
    } else {
        window.Weave = Weave;
    }

}());
