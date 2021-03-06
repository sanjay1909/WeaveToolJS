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
    Object.defineProperty(WeaveProperties, 'NS', {
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
    Object.defineProperty(WeaveProperties, 'CLASS_NAME', {
        value: 'WeaveProperties'
    });


    Object.defineProperty(WeaveProperties, 'DEFAULT_BACKGROUND_COLOR', {
        value: 0xCCCCCC
    });


    Object.defineProperties(WeaveProperties, {
        'WIKIPEDIA_URL': {
            value: "Wikipedia|http://en.wikipedia.org/wiki/Special:Search?search="
        },
        'GOOGLE_URL': {
            value: "Google|http://www.google.com/search?q="
        },
        'GOOGLE_MAPS_URL': {
            value: "Google Maps|http://maps.google.com/maps?t=h&q="
        },
        'GOOGLE_IMAGES_URL': {
            value: "Google Images|http://images.google.com/images?q="
        }
    });



    /**
     * A list of global settings for a Weave instance.
     *
     * @author adufilie
     * @author sanjay1909
     */
    function WeaveProperties() {
        weavecore.ILinkableObject.call(this);

        Object.defineProperties(this, {
            'showErrors': {
                value: new weavecore.LinkableBoolean(true)
            },
            'dataInfoURL': {
                value: new weavecore.LinkableString() // file to link to for metadata information
            },
            'windowSnapGridSize': {
                value: new weavecore.LinkableString("1%", verifyWindowSnapGridSize.bind(this)) // window snap grid size in pixels
            },
            'cssStyleSheetName': {
                value: new weavecore.LinkableString("weaveStyle.css") // CSS Style Sheet Name/URL
            },
            'backgroundColor': {
                value: new weavecore.LinkableNumber(WeaveProperties.DEFAULT_BACKGROUND_COLOR, isFinite)
            },
            'showBackgroundImage': {
                value: new weavecore.LinkableBoolean(true)
            },
            'panelBackgroundColor': {
                value: new weavecore.LinkableNumber(0xFFFFFF, isFinite)
            },
            'enableMouseWheel': {
                value: new weavecore.LinkableBoolean(true)
            },
            'enableCollaborationBar': {
                value: new weavecore.LinkableBoolean(false) // collaboration menu bar (bottom of screen)
            },
            'showCollaborationEditor': {
                value: new weavecore.LinkableBoolean(false) // menu item
            },
            'collabServerIP': {
                value: new weavecore.LinkableString("demo.iweave.com")
            },
            'collabServerName': {
                value: new weavecore.LinkableString("ivpr-vm")
            },
            'collabServerPort': {
                value: new weavecore.LinkableString("5222")
            },
            'collabServerRoom': {
                value: new weavecore.LinkableString("weaveStyle.css")
            },
            'collabSpectating': {
                value: new weavecore.LinkableBoolean(false)
            },
            'showCollaborationMenuItem': {
                value: new weavecore.LinkableBoolean(true) // menu item
            },
            'enableDynamicTools': {
                value: new weavecore.LinkableBoolean(true) // tools menu
            },
            'showColorController': {
                value: new weavecore.LinkableBoolean(true) // Show Color Controller option tools menu
            },
            'showProbeToolTipEditor': {
                value: new weavecore.LinkableBoolean(true) // Show Probe Tool Tip Editor tools menu
            },
            'showProbeWindow': {
                value: new weavecore.LinkableBoolean(true) // Show Probe Tool Tip Window in tools menu
            },
            'showEquationEditor': {
                value: new weavecore.LinkableBoolean(true) // Show Equation Editor option tools menu
            },
            'showKMeansClustering': {
                value: new weavecore.LinkableBoolean(false)
            },
            'showAddExternalTools': {
                value: new weavecore.LinkableBoolean(false) // Show Add External Tools dialog in tools menu.
            },
            'menuToggles': {
                value: new weavecore.LinkableHashMap(weavecore.LinkableBoolean) // // className -> LinkableBoolean
            }
        });

        Object.defineProperties(this, {
            'enableToolAttributeEditing': {
                value: new weavecore.LinkableBoolean(true)
            },
            'enableToolSelection': {
                value: new weavecore.LinkableBoolean(true)
            },
            'enableToolProbe': {
                value: new weavecore.LinkableBoolean(true)
            },
            'showVisToolCloseDialog': {
                value: new weavecore.LinkableBoolean(false)
            },
            'enableRightClick': {
                value: new weavecore.LinkableBoolean(true)
            },
            'maxTooltipRecordsShown': {
                value: new weavecore.LinkableNumber(1, verifyNonNegativeNumber.bind(this)) // maximum number of records shown in the probe toolTips
            },
            'showSelectedRecordsText': {
                value: new weavecore.LinkableBoolean(true) // show the tooltip in the lower-right corner of the application
            },
            'enableBitmapFilters': {
                value: new weavecore.LinkableBoolean(true) // enable/disable bitmap filters while probing or selecting
            },
            'enableGeometryProbing': {
                value: new weavecore.LinkableBoolean(true) // use the geometry probing (default to on even though it may be slow for mapping)
            }
        });

        Object.defineProperties(this, {
            'visTitleTextFormat': {
                value: new weavecore.LinkableTextFormat()
            },
            'axisTitleTextFormat': {
                value: new weavecore.LinkableTextFormat()
            },
            'panelTitleTextFormat': {
                value: new weavecore.LinkableTextFormat()
            }
        });


        Object.defineProperty(this, 'visTextFormat', {
            get: function () {
                return weavecore.LinkableTextFormat.defaultTextFormat;
            }
        });








        // register all properties as children of this object
        WeaveAPI.SessionManager.getLinkablePropertyNames(this).forEach(function (propertyName) {
            WeaveAPI.SessionManager.registerLinkableChild(this, this[propertyName]);
        }.bind(this));

        this.visTextFormat.size.value = 11;
        this.axisTitleTextFormat.size.value = 13;
        this.visTitleTextFormat.size.value = 16;

        // handle dynamic changes to the session state that change what CSS file to use
        /*cssStyleSheetName.addGroupedCallback(
            this,
            function (): void {
                CSSUtils.loadStyleSheet(cssStyleSheetName.value);
            }
        );*/

        /* _toggleMenuItem("TreeTool", false);
            _toggleMenuItem("CytoscapeWebTool", false);
            _toggleMenuItem("CustomGraphicsTool", false);
            _toggleMenuItem("KeyMappingTool", false);
            _toggleMenuItem("RDataSource", false);*/

        this.panelTitleTextFormat.font.value = "Verdana";
        this.panelTitleTextFormat.size.value = 10;
        this.panelTitleTextFormat.color.value = 0xFFFFFF;

        /* linkBindableProperty(maxComputationTimePerFrame, WeaveAPI.StageUtils, 'maxComputationTimePerFrame');

             showCollaborationMenuItem.addGroupedCallback(this, function (): void {
                 if (showCollaborationMenuItem.value) {
                     enableCollaborationBar.delayCallbacks();
                     showCollaborationEditor.delayCallbacks();

                     enableCollaborationBar.value = false;
                     showCollaborationEditor.value = false;

                     enableCollaborationBar.resumeCallbacks();
                     showCollaborationEditor.resumeCallbacks();
                 }
             });

             function handleCollabBar(): void {
                 if (enableCollaborationBar.value || showCollaborationEditor.value)
                     showCollaborationMenuItem.value = false;
             };
             enableCollaborationBar.addGroupedCallback(this, handleCollabBar);
             showCollaborationEditor.addGroupedCallback(this, handleCollabBar);
             initBitmapFilterCallbacks();*/
    }




    function verifyAlpha(value) {
        return 0 <= value && value <= 1;
    }

    function verifyNonNegativeNumber(value) {
        return value >= 0;
    }


    function verifyWindowSnapGridSize(value) {
        if (!weavedata.NumberUtils.verifyNumberOrPercentage(value))
            return false;
        if (value && value.substr(-1) === '%')
            return weavecore.StandardLib.asNumber(value.substr(0, -1)) > 0;
        return weavecore.StandardLib.asNumber(value) >= 1;
    }


    WeaveProperties.prototype = new weavecore.ILinkableObject();
    WeaveProperties.prototype.constructor = WeaveProperties;
    var p = WeaveProperties.prototype;




    if (typeof exports !== 'undefined') {
        module.exports = WeaveProperties;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.WeaveProperties = WeaveProperties;
    }

    weavecore.ClassUtils.registerClass('weavetool.WeaveProperties', weavetool.WeaveProperties);

}());

//weave.properties = WeaveAPI.globalHashMap.requestObject("WeaveProperties", weavetool.WeaveProperties, false);
//console.log(weave.properties);

/*
package weave {


    public class WeaveProperties implements ILinkableObject, ILinkableObjectWithNewProperties {
		[Embed(source = "/weave/weave_version.txt", mimeType = "application/octet-stream")]
        private static
        const WeaveVersion: Class;

        public
        const version: LinkableString = new LinkableString(); // Weave version

        public

        function WeaveProperties() {
            version.value = StringUtil.trim((new WeaveVersion() as ByteArray).toString());
            version.lock(); // don't allow changing the version

            // register all properties as children of this object
            for each(var propertyName: String in (WeaveAPI.SessionManager as SessionManager).getLinkablePropertyNames(this))
            registerLinkableChild(this, this[propertyName] as ILinkableObject);

            loadWeaveFontsSWF();
            visTextFormat.size.value = 11;
            axisTitleTextFormat.size.value = 13;
            visTitleTextFormat.size.value = 16;



            //			_toggleMenuItem("ThermometerTool", false);
            //			_toggleMenuItem("GaugeTool", false);





        }

        public static
        const embeddedFonts: ArrayCollection = new ArrayCollection();
        private

        function loadWeaveFontsSWF(bytes: ByteArray = null): void {
            if (!bytes) {
                try {
                    // attempt to load from embedded file
                    var WF: Class = getDefinitionByName('WeaveFonts') as Class;
                    bytes = (new WF()) as ByteArray;
                } catch (e: Error) {}
            }
            if (bytes) {
                var fontLoader: FontLoader = new FontLoader();
                fontLoader.addEventListener(
                    Event.COMPLETE,
                    function (event: Event): void {
                        try {
                            var fonts: Array = fontLoader.fonts;
                            for each(var font: Font in fonts) {
                                var fontClass: Class = Object(font).constructor;
                                Font.registerFont(fontClass);
                                if (!embeddedFonts.contains(font.fontName))
                                    embeddedFonts.addItem(font.fontName);
                            }
                        } catch (e: Error) {
                            var app: Object = WeaveAPI.topLevelApplication;
                            if (app.parent && app.parent.parent is Stage) // don't report error if loaded as a nested app
                                reportError(e);
                        }
                    }
                );
                fontLoader.loadBytes(bytes, false);
            } else {
                addAsyncResponder(
                    WeaveAPI.URLRequestUtils.getURL(null, new URLRequest('WeaveFonts.swf')),
                    function (event: ResultEvent, token: Object = null): void {
                        var bytes: ByteArray = ByteArray(event.result);
                        if (bytes)
                            loadWeaveFontsSWF(bytes);
                        else
                            reportError("Unable to get WeaveFonts.swf");
                    },
                    function (event: FaultEvent, token: Object = null): void {
                        reportError(event.fault);
                    }
                );
            }
        }





        public

        function getMenuToggle(classDef: Class): LinkableBoolean {
            var className: String = getQualifiedClassName(classDef).split('::').pop();
            var existsPreviously: Boolean = menuToggles.getObject(className) is LinkableBoolean;
            var toggle: LinkableBoolean = menuToggles.requestObject(className, LinkableBoolean, false);
            var deprecatedToggle: LinkableBoolean = menuToggles.getObject(toolToggleBackwardsCompatibility[className]) as LinkableBoolean;
            if (!existsPreviously) {
                if (deprecatedToggle) {
                    // backwards compatibility for old session states
                    toggle.value = deprecatedToggle.value;
                    menuToggles.removeObject(toolToggleBackwardsCompatibility[className]);
                } else {
                    // set default value
                    var is_r_tool: Boolean = ClassUtils.classImplements(getQualifiedClassName(classDef), getQualifiedClassName(IVisTool_R));
                    toggle.value = !is_r_tool;
                }
            }
            return toggle;
        }
        // maps new tool name to old tool name
        private
        const toolToggleBackwardsCompatibility: Object = {
            "AdvancedDataTable": "DataTableTool",
            "TableTool": "DataTableTool"
        };


        public

        function get geometryMetadataRequestMode(): LinkableString {
            return StreamedGeometryColumn.metadataRequestMode;
        }
        public

        function get geometryMinimumScreenArea(): LinkableNumber {
            return StreamedGeometryColumn.geometryMinimumScreenArea;
        }

        public
        const enableSessionMenu: LinkableBoolean = new LinkableBoolean(true); // all sessioning
        public
        const enableManagePlugins: LinkableBoolean = new LinkableBoolean(false); // show "manage plugins" menu item
        public
        const enableSessionHistoryControls: LinkableBoolean = new LinkableBoolean(true); // show session history controls inside Weave interface
        public
        const showCreateTemplateMenuItem: LinkableBoolean = new LinkableBoolean(true);
        public
        const isTemplate: LinkableBoolean = new LinkableBoolean(false);

        public
        const enableUserPreferences: LinkableBoolean = new LinkableBoolean(true); // open the User Preferences Panel

        public
        const enableSearchForRecord: LinkableBoolean = new LinkableBoolean(true); // allow user to right click search for record

        public
        const enableMarker: LinkableBoolean = new LinkableBoolean(true);
        public
        const enableDrawCircle: LinkableBoolean = new LinkableBoolean(true);
        //public const enableAnnotation:LinkableBoolean = new LinkableBoolean(true);
        public
        const enablePenTool: LinkableBoolean = new LinkableBoolean(true);

        public
        const enableMenuBar: LinkableBoolean = new LinkableBoolean(true); // top menu for advanced features
        public
        const enableSubsetControls: LinkableBoolean = new LinkableBoolean(true); // creating subsets
        public
        const enableExportToolImage: LinkableBoolean = new LinkableBoolean(true); // print/export tool images
        public
        const enableExportCSV: LinkableBoolean = new LinkableBoolean(true);
        public
        const enableExportApplicationScreenshot: LinkableBoolean = new LinkableBoolean(true); // print/export application screenshot

        public
        const enableDataMenu: LinkableBoolean = new LinkableBoolean(true); // enable/disable Data Menu
        public
        const enableBrowseData: LinkableBoolean = new LinkableBoolean(false); // enable/disable Browse Data option
        public
        const enableRefreshHierarchies: LinkableBoolean = new LinkableBoolean(false);
        public
        const enableManageDataSources: LinkableBoolean = new LinkableBoolean(true); // enable/disable Edit Datasources option

        public
        const enableWindowMenu: LinkableBoolean = new LinkableBoolean(true); // enable/disable Window Menu
        public
        const enableFullScreen: LinkableBoolean = new LinkableBoolean(false); // enable/disable FullScreen option
        public
        const enableCloseAllWindows: LinkableBoolean = new LinkableBoolean(true); // enable/disable Close All Windows
        public
        const enableRestoreAllMinimizedWindows: LinkableBoolean = new LinkableBoolean(true); // enable/disable Restore All Minimized Windows
        public
        const enableMinimizeAllWindows: LinkableBoolean = new LinkableBoolean(true); // enable/disable Minimize All Windows
        public
        const enableCascadeAllWindows: LinkableBoolean = new LinkableBoolean(true); // enable/disable Cascade All Windows
        public
        const enableTileAllWindows: LinkableBoolean = new LinkableBoolean(true); // enable/disable Tile All Windows

        public
        const enableSelectionsMenu: LinkableBoolean = new LinkableBoolean(false); // enable/disable Selections Menu
        public
        const enableSaveCurrentSelection: LinkableBoolean = new LinkableBoolean(true); // enable/disable Save Current Selection option
        public
        const enableClearCurrentSelection: LinkableBoolean = new LinkableBoolean(true); // enable/disable Clear Current Selection option
        public
        const enableManageSavedSelections: LinkableBoolean = new LinkableBoolean(true); // enable/disable Manage Saved Selections option
        public
        const enableSelectionSelectorBox: LinkableBoolean = new LinkableBoolean(true); //enable/disable SelectionSelector option
        public
        const selectionMode: LinkableString = new LinkableString(InteractionController.SELECTION_MODE_RECTANGLE, verifySelectionMode);

        private

        function verifySelectionMode(value: String): Boolean {
            return InteractionController.enumSelectionMode().indexOf(value) >= 0;
        }

        public
        const enableSubsetsMenu: LinkableBoolean = new LinkableBoolean(false); // enable/disable Subsets Menu
        public
        const enableCreateSubsets: LinkableBoolean = new LinkableBoolean(true); // enable/disable Create subset from selected records option
        public
        const enableRemoveSubsets: LinkableBoolean = new LinkableBoolean(true); // enable/disable Remove selected records from subset option
        public
        const enableShowAllRecords: LinkableBoolean = new LinkableBoolean(true); // enable/disable Show All Records option
        public
        const enableSaveCurrentSubset: LinkableBoolean = new LinkableBoolean(true); // enable/disable Save current subset option
        public
        const enableManageSavedSubsets: LinkableBoolean = new LinkableBoolean(true); // enable/disable Manage saved subsets option
        public
        const enableSubsetSelectionBox: LinkableBoolean = new LinkableBoolean(true); // enable/disable Subset Selection Combo Box option


        public
        const enableWeaveAnalystMode: LinkableBoolean = new LinkableBoolean(false); // enable/disable use of the Weave Analyst
        public
        const dashboardMode: LinkableBoolean = new LinkableBoolean(false); // enable/disable borders/titleBar on windows
        public
        const enableToolControls: LinkableBoolean = new LinkableBoolean(true); // enable tool controls (which enables attribute selector too)
        public
        const enableAxisToolTips: LinkableBoolean = new LinkableBoolean(true);

        public
        const showKeyTypeInColumnTitle: LinkableBoolean = new LinkableBoolean(false);

        // probing and selection
        public
        const selectionAlphaAmount: LinkableNumber = new LinkableNumber(0.5, verifyAlpha);

        //selection location information
        public
        const recordsTooltipLocation: LinkableString = new LinkableString(RECORDS_TOOLTIP_LOWER_LEFT, verifyLocationMode);

        public static
        const RECORDS_TOOLTIP_LOWER_LEFT: String = 'Lower left';
        public static
        const RECORDS_TOOLTIP_LOWER_RIGHT: String = 'Lower right';
        public

        function get recordsTooltipEnum(): Array {
            return [RECORDS_TOOLTIP_LOWER_LEFT, RECORDS_TOOLTIP_LOWER_RIGHT];
        }

        private

        function verifyLocationMode(value: String): Boolean {
            return recordsTooltipEnum.indexOf(value) >= 0;
        }


        //This is an array of LinkableEventListeners which specify a function to run on an event.
         public
        const eventListeners: LinkableHashMap = new LinkableHashMap(LinkableEventListener);

        public
        const dashedSelectionColor: LinkableNumber = new LinkableNumber(0x00ff00);
        public
        const dashedZoomColor: LinkableNumber = new LinkableNumber(0x00faff);
        public
        const dashedLengths: LinkableVariable = new LinkableVariable(null, verifyDashedLengths, [5, 5]);
        public

        function verifyDashedLengths(object: Object): Boolean {
            // backwards compatibility and support for linkBindableProperty with a text area
            if (object is String) {
                dashedLengths.setSessionState((object as String).split(',').map(function (str: String, i: int, a: Array): Number {
                    return StandardLib.asNumber(str);
                }));
                return false;
            }

            var values: Array = object as Array;
            if (!values)
                return false;
            var foundNonZero: Boolean = false;
            for (var i: int = 0; i < values.length; ++i) {
                // We want every value >= 0 with at least one value > 0
                // Undefined and negative numbers are invalid.
                var value: int = int(values[i]);
                if (isNaN(value))
                    return false;
                if (value < 0)
                    return false;
                if (value != 0)
                    foundNonZero = true;
            }

            return foundNonZero;
        }
		[Deprecated(replacement = "dashedLengths")] public

        function get dashedSelectionBox(): LinkableVariable {
            return dashedLengths;
        }

        public
        const panelTitleTextFormat: LinkableTextFormat = new LinkableTextFormat();
        public

        function get visTextFormat(): LinkableTextFormat {
            return LinkableTextFormat.defaultTextFormat;
        }
        public
        const visTitleTextFormat: LinkableTextFormat = new LinkableTextFormat();
        public
        const axisTitleTextFormat: LinkableTextFormat = new LinkableTextFormat();
        public
        const mouseoverTextFormat: LinkableTextFormat = new LinkableTextFormat();

        public

        function get probeHeaderSeparator(): LinkableString {
            return ProbeTextUtils.headerSeparator;
        }
        public

        function get probeLineFormatter(): LinkableFunction {
            return ProbeTextUtils.probeLineFormatter;
        }

        public
        const probeInnerGlow: LinkableGlowFilter = new LinkableGlowFilter(0xffffff, 1, 5, 5, 10);
		[Deprecated(replacement = "probeInnerGlow")] public

        function set probeInnerGlowColor(value: Number): void {
                probeInnerGlow.color.value = value;
            }
		[Deprecated(replacement = "probeInnerGlow")] public

        function set probeInnerGlowAlpha(value: Number): void {
                probeInnerGlow.alpha.value = value;
            }
		[Deprecated(replacement = "probeInnerGlow")] public

        function set probeInnerGlowBlur(value: Number): void {
                probeInnerGlow.blurX.value = value;
                probeInnerGlow.blurY.value = value;
            }
		[Deprecated(replacement = "probeInnerGlow")] public

        function set probeInnerGlowStrength(value: Number): void {
            probeInnerGlow.strength.value = value;
        }

        public
        const probeOuterGlow: LinkableGlowFilter = new LinkableGlowFilter(0, 1, 3, 3, 3);
		[Deprecated(replacement = "probeOuterGlow")] public

        function set probeOuterGlowColor(value: Number): void {
                probeOuterGlow.color.value = value;
            }
		[Deprecated(replacement = "probeOuterGlow")] public

        function set probeOuterGlowAlpha(value: Number): void {
                probeOuterGlow.alpha.value = value;
            }
		[Deprecated(replacement = "probeOuterGlow")] public

        function set probeOuterGlowBlur(value: Number): void {
                probeOuterGlow.blurX.value = value;
                probeOuterGlow.blurY.value = value;
            }
		[Deprecated(replacement = "probeOuterGlow")] public

        function set probeOuterGlowStrength(value: Number): void {
            probeOuterGlow.strength.value = value;
        }

        public
        const selectionDropShadow: LinkableDropShadowFilter = new LinkableDropShadowFilter(2, 45, 0, 0.5);
		[Deprecated(replacement = "selectionDropShadow")] public

        function set shadowDistance(value: Number): void {
                selectionDropShadow.distance.value = value;
            }
		[Deprecated(replacement = "selectionDropShadow")] public

        function set shadowAngle(value: Number): void {
                selectionDropShadow.angle.value = value;
            }
		[Deprecated(replacement = "selectionDropShadow")] public

        function set shadowColor(value: Number): void {
                selectionDropShadow.color.value = value;
            }
		[Deprecated(replacement = "selectionDropShadow")] public

        function set shadowAlpha(value: Number): void {
                selectionDropShadow.alpha.value = value;
            }
		[Deprecated(replacement = "selectionDropShadow")] public

        function set shadowBlur(value: Number): void {
            selectionDropShadow.blurX.value = value;
            selectionDropShadow.blurY.value = value;
        }

        public
        const probeToolTipBackgroundAlpha: LinkableNumber = new LinkableNumber(1.0, verifyAlpha);
        public
        const probeToolTipBackgroundColor: LinkableNumber = new LinkableNumber(NaN);
        public
        const probeToolTipFontColor: LinkableNumber = new LinkableNumber(0x000000, isFinite);
        public
        const probeToolTipMaxWidth: LinkableNumber = registerLinkableChild(this, new LinkableNumber(400), handleToolTipMaxWidth);
        private

        function handleToolTipMaxWidth(): void {
            ToolTip.maxWidth = Weave.properties.probeToolTipMaxWidth.value;
        }

        public
        const enableProbeLines: LinkableBoolean = new LinkableBoolean(true);
        public
        const enableAnnuliCircles: LinkableBoolean = new LinkableBoolean(false);
        public

        function get enableProbeToolTip(): LinkableBoolean {
            return ProbeTextUtils.enableProbeToolTip;
        }
        public

        function get showEmptyProbeRecordIdentifiers(): LinkableBoolean {
            return ProbeTextUtils.showEmptyProbeRecordIdentifiers;
        }

        public
        const probeBufferSize: LinkableNumber = new LinkableNumber(10, verifyNonNegativeNumber);

        public
        const toolInteractions: InteractionController = new InteractionController();

        // temporary?
        public
        const rServiceURL: LinkableString = registerLinkableChild(this, new LinkableString("/WeaveServices/RService"), handleRServiceURLChange); // url of Weave R service using Rserve
        public
        const pdbServiceURL: LinkableString = new LinkableString("/WeavePDBService/PDBService");
        private
        var _rService: WeaveRServlet;
        public

        function getRService(): WeaveRServlet {
            if (!_rService || _rService.servletURL != Weave.properties.rServiceURL.value) {
                if (_rService)
                    disposeObject(_rService);
                _rService = registerDisposableChild(this, new WeaveRServlet(Weave.properties.rServiceURL.value));
            }
            return _rService;
        }

        public
        const externalTools: LinkableHashMap = registerLinkableChild(this, new LinkableHashMap(LinkableString));

        private

        function handleRServiceURLChange(): void {
            rServiceURL.value = rServiceURL.value.replace('OpenIndicatorsRServices', 'WeaveServices');
            if (rServiceURL.value == '/WeaveServices')
                rServiceURL.value += '/RService';
        }

        //default URL
        public
        const searchServiceURLs: LinkableString = new LinkableString([WIKIPEDIA_URL, GOOGLE_URL, GOOGLE_IMAGES_URL, GOOGLE_MAPS_URL].join('\n'));

        // when this is true, a rectangle will be drawn around the screen bounds with the background
        public
        const debugScreenBounds: LinkableBoolean = new LinkableBoolean(false);


         //This field contains JavaScript code that will run when Weave is loaded, immediately after the session state
         //interface is initialized.  The variable 'weave' can be used in the JavaScript code to refer to the weave instance.

        public
        const startupJavaScript: LinkableString = new LinkableString();

		[Embed(source = "WeaveStartup.js", mimeType = "application/octet-stream")]
        private static
        const WeaveStartup: Class;


public

function runStartupJavaScript(): void {
    WeaveAPI.initializeJavaScript(WeaveStartup);
    if (startupJavaScript.value)
        JavaScript.exec({
            "this": "weave",
            "catch": reportError
        }, startupJavaScript.value);
}


public

function get macros(): ILinkableHashMap {
    return LinkableFunction.macros;
}

public

function get macroLibraries(): LinkableVariable {
    return LinkableFunction.macroLibraries;
}

public

function includeMacroLibrary(libraryName: String): void {
    LinkableFunction.includeMacroLibrary(libraryName);
}

public
const workspaceWidth: LinkableNumber = new LinkableNumber(NaN);
public
const workspaceHeight: LinkableNumber = new LinkableNumber(NaN);
public
const workspaceMultiplier: LinkableNumber = new LinkableNumber(1, verifyWorkspaceMultiplier);

private

function verifyWorkspaceMultiplier(value: Number): Boolean {
    return value >= 1 && value <= 4;
}

public

function get SecondaryKeyNumColumn_useGlobalMinMaxValues(): LinkableBoolean {
    return SecondaryKeyNumColumn.useGlobalMinMaxValues;
}
public
const maxComputationTimePerFrame: LinkableNumber = new LinkableNumber(100);


public
const filter_callbacks: ICallbackCollection = new CallbackCollection();
public
const filter_probeGlowInnerText: GlowFilter = new GlowFilter(0, 0.9, 2, 2, 255);
public
const filter_probeGlowInner: GlowFilter = new GlowFilter(0, 0.9, 5, 5, 10);
public
const filter_probeGlowOuter: GlowFilter = new GlowFilter(0, 0.7, 3, 3, 10);
public
const filter_selectionShadow: DropShadowFilter = new DropShadowFilter(1, 45, 0, 0.5, 4, 4, 2);
private

function updateFilters(): void {
    probeInnerGlow.copyTo(filter_probeGlowInnerText);
    filter_probeGlowInnerText.blurX = 2;
    filter_probeGlowInnerText.blurY = 2;
    filter_probeGlowInnerText.strength = 255;

    probeInnerGlow.copyTo(filter_probeGlowInner);
    probeOuterGlow.copyTo(filter_probeGlowOuter);
    selectionDropShadow.copyTo(filter_selectionShadow);
}
private

function initBitmapFilterCallbacks(): void {
    var objects: Array = [
				enableBitmapFilters,
				selectionAlphaAmount,
				probeInnerGlow,
				probeOuterGlow,
				selectionDropShadow
			];
    for each(var object: ILinkableObject in objects)
    registerLinkableChild(filter_callbacks, object);
    filter_callbacks.addImmediateCallback(this, updateFilters, true);
}

private

function verifyNonNegativeNumber(value: Number): Boolean {
    return value >= 0;
}


}
} */

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
    Object.defineProperty(IPlotter, 'NS', {
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
    Object.defineProperty(IPlotter, 'CLASS_NAME', {
        value: 'IPlotter'
    });


    /**
     * A class implementing IPlotter defines the properties required to display shapes corresponding to record keys.
     * The interface includes basic functions for drawing and getting bounding boxes.
     * This interface is meant to be as lightweight and generic as possible.
     *
     * @author adufilie
     * @author sanjay1909
     */
    function IPlotter() {
        weavecore.ILinkableObject.call(this);
    }

    IPlotter.prototype = new weavecore.ILinkableObject();
    IPlotter.prototype.constructor = IPlotter;
    var p = IPlotter.prototype;




    if (typeof exports !== 'undefined') {
        module.exports = IPlotter;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.IPlotter = IPlotter;
    }

    weavecore.ClassUtils.registerClass('weavetool.IPlotter', weavetool.IPlotter);

}());

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
    Object.defineProperty(SimpleAxisPlotter, 'NS', {
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
    Object.defineProperty(SimpleAxisPlotter, 'CLASS_NAME', {
        value: 'SimpleAxisPlotter'
    });

    SimpleAxisPlotter.DEFAULT_LABEL_FUNCTION = "function (number, string, column) {return string;};";

    /**
     * This is an interface to identify Visualization tools
     *
     * @author adufilie
     * @author sanjay1909
     */
    function SimpleAxisPlotter() {
        weavetool.AbstractPlotter.call(this);

        Object.defineProperties(this, {
            'axisLabelHorizontalDistance': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(-10, isFinite))
            },
            'axisLabelVerticalDistance': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(0, isFinite))
            },
            'axisLabelRelativeAngle': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(-45, isFinite))
            },
            'axisGridLineThickness': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(1, isFinite))
            },
            'axisGridLineColor': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(0xDDDDDD))
            },
            'axisGridLineAlpha': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(1, isFinite))
            },
            'axesThickness': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(10, isFinite))
            },
            'axesColor': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(0xB0B0B0))
            },
            'axesAlpha': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(1, isFinite))
            },
            'axisLineDataBounds': {
                value: this.newSpatialProperty(weavedata.LinkableBounds2D)
            },
            'axisLineMinValue': {
                value: this.newSpatialProperty(weavecore.LinkableNumber)
            },
            'axisLineMaxValue': {
                value: this.newSpatialProperty(weavecore.LinkableNumber)
            },
            'tickMinValue': {
                value: this.newSpatialProperty(weavecore.LinkableNumber)
            },
            'tickMaxValue': {
                value: this.newSpatialProperty(weavecore.LinkableNumber)
            },
            'overrideAxisName': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString())
            },
            'showAxisName': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true))
            },
            'tickCountRequested': {
                value: this.registerSpatialProperty(new weavecore.LinkableNumber(10))
            },
            'forceTickCount': {
                value: this.registerSpatialProperty(new weavecore.LinkableBoolean(false))
            },
            'showLabels': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true))
            },
            'labelNumberFormatter': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavedata.LinkableNumberFormatter())
            },
            'labelTextAlignment': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString('left'))
            },
            'labelHorizontalAlign': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString('right'))
            },
            'labelVerticalAlign': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString('middle'))
            },
            'labelWordWrapSize': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(80))
            },
            'labelFunction': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableFunction(SimpleAxisPlotter.DEFAULT_LABEL_FUNCTION))
            }

        });

        //private const
        Object.defineProperties(this, {
            '_titleTextFormatWatcher': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableWatcher())
            },
            '_labelTextFormatWatcher': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableWatcher())
            },
            '_columnWatcher': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableWatcher())
            },
            '_keySet': {
                value: this.newSpatialProperty(weavedata.KeySet)
            }



        });

        this._labelFunction = null;

        this.setSingleKeySource(this._keySet);

    }



    SimpleAxisPlotter.prototype = new weavetool.AbstractPlotter();
    SimpleAxisPlotter.prototype.constructor = SimpleAxisPlotter;
    var p = SimpleAxisPlotter.prototype;

    p.setupTextFormats = function (titleTextFormat, labelTextFormat) {
        this._titleTextFormatWatcher.target = titleTextFormat;
        this._labelTextFormatWatcher.target = labelTextFormat;
    }

    // TEMPORARY SOLUTION
    p.setLabelFunction = function (func, column) {
        this._labelFunction = func;
        this._columnWatcher.target = column;
        WeaveAPI.SessionManager.getCallbackCollection(this).triggerCallbacks();
    }

    // END TEMPORARY SOLUTION

    // BEGIN TEMPORARY SOLUTION
    p.setSideAxisName = function (name, angle, xDistance, yDistance, verticalAlign, labelPosition, labelAlignment, maxLabelWidth) {
        /*labelPosition = (labelPosition === undefined) ? LABEL_POSITION_AT_AXIS_CENTER : labelPosition;
        labelAlignment = (labelAlignment === undefined) ? null : labelAlignment;
        maxLabelWidth = (maxLabelWidth === undefined) ? -1 : maxLabelWidth;*/
        /*_axisName = name;
        _axisNameAngle = angle;
        _axisNameXDistance = xDistance;
        _axisNameYDistance = yDistance;
        _axisNameVerticalAlign = verticalAlign;
        _labelPosition = labelPosition;
        _labelAlignment = labelAlignment;
        _maxLabelWidth = maxLabelWidth;

        getCallbackCollection(this).triggerCallbacks();*/
    }

    if (typeof exports !== 'undefined') {
        module.exports = SimpleAxisPlotter;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.SimpleAxisPlotter = SimpleAxisPlotter;
    }

    weavecore.ClassUtils.registerClass('weavetool.SimpleAxisPlotter', weavetool.SimpleAxisPlotter);

}());

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
    Object.defineProperty(ProbeLinePlotter, 'NS', {
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
    Object.defineProperty(ProbeLinePlotter, 'CLASS_NAME', {
        value: 'ProbeLinePlotter'
    });


    /**
     * This is an interface to identify Visualization tools
     *
     * @author adufilie
     * @author kmanohar
     * @author sanjay1909
     */
    function ProbeLinePlotter() {
        weavetool.AbstractPlotter.call(this);

    }



    ProbeLinePlotter.prototype = new weavetool.AbstractPlotter();
    ProbeLinePlotter.prototype.constructor = ProbeLinePlotter;
    var p = ProbeLinePlotter.prototype;




    if (typeof exports !== 'undefined') {
        module.exports = ProbeLinePlotter;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.ProbeLinePlotter = ProbeLinePlotter;
    }

    weavecore.ClassUtils.registerClass('weavetool.ProbeLinePlotter', weavetool.ProbeLinePlotter);

}());

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
    Object.defineProperty(PlotTask, 'NS', {
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
    Object.defineProperty(PlotTask, 'CLASS_NAME', {
        value: 'PlotTask'
    });

    Object.defineProperty(PlotTask, 'debug', {
        value: false
    });

    Object.defineProperty(PlotTask, 'TASK_TYPE_SUBSET', {
        value: 0
    });
    Object.defineProperty(PlotTask, 'TASK_TYPE_SELECTION', {
        value: 1
    });
    Object.defineProperty(PlotTask, 'TASK_TYPE_PROBE', {
        value: 2
    });




    /**
     * A class implementing PlotTask defines the properties required to display shapes corresponding to record keys.
     * The interface includes basic functions for drawing and getting bounding boxes.
     * This interface is meant to be as lightweight and generic as possible.
     *
     * @author adufilie
     * @author sanjay1909
     */
    function PlotTask(taskType, plotter, spatialIndex, zoomBounds, layerSettings) {
        weavecore.ILinkableObject.call(this);
        this._taskType = taskType;
        this._plotter = plotter;
        this._spatialIndex = spatialIndex;
        this._zoomBounds = zoomBounds;
        this._layerSettings = layerSettings;

        this._delayInit = false;
        this._pendingInit = false;
        this._iteration = 0;
        this._iterationStopTime;
        this._keyFilter;
        this._recordKeys;
        this._asyncState = {};
        this._pendingKeys;
        this._iPendingKey;
        this._progress = 0;
        this._prevBusyGroupTriggerCounter = 0;

        /**
         * When this is set to true, the async task will be paused.
         */
        this.delayAsyncTask = false;

        Object.defineProperty(this, '_dependencies', {
            value: WeaveAPI.SessionManager.registerDisposableChild(this, new weavecore.CallbackCollection())
        });

        Object.defineProperty(this, '_asyncSort', {
            value: WeaveAPI.SessionManager.registerDisposableChild(this, new weavecore.AsyncSort())
        });

        Object.defineProperty(this, 'taskType', {
            get: function () {
                return this._taskType;
            }
        });

        Object.defineProperty(this, 'progress', {
            get: function () {
                return this._progress;
            }
        });





        /**
         * These are the IQualifiedKey objects identifying which records should be rendered
         */
        Object.defineProperty(this, 'recordKeys', {
            get: function () {
                return this._recordKeys;
            }
        });


        /**
         * This counter is incremented after each iteration.  When the task parameters change, this counter is reset to zero.
         */
        Object.defineProperty(this, 'iteration', {
            get: function () {
                return this._iteration;
            }
        });


        /**
         * This is the time at which the current iteration should be stopped.  Compare this value with getTimer().
         */
        Object.defineProperty(this, 'iterationStopTime', {
            get: function () {
                return this._iterationStopTime;
            }
        });


        /**
         * This object can be used to optionally store additional state variables for resuming an asynchronous task where it previously left off.
         * Setting this will not reset the iteration counter.
         */
        Object.defineProperty(this, 'asyncState', {
            get: function () {
                return this._asyncState;
            },
            set: function (value) {
                return this._asyncState = value;
            }
        });




        // TEMPORARY SOLUTION until we start using VisToolGroup
        var subsetFilter = this._plotter.filteredKeySet.keyFilter;

        var keyFilters = [subsetFilter, this._layerSettings.selectionFilter, this._layerSettings.probeFilter];
        var keyFilter = keyFilters[this._taskType];

        // _dependencies is used as the parent so we can check its busy status with a single function call.
        var list = [this._plotter, this._spatialIndex, this._layerSettings, keyFilter];
        list.forEach(function (dependency) {
            WeaveAPI.SessionManager.registerLinkableChild(this._dependencies, dependency);
        }, this);


        this._dependencies.addImmediateCallback(this, asyncStart.bind(this), true);

        //linkBindableProperty(_layerSettings.visible, completedBitmap, 'visible');
    }

    function asyncStart() {
        if (asyncInit.call(this)) {
            if (PlotTask.debug)
                trace(this, 'begin async rendering');
            // normal priority because rendering is not often a prerequisite for other tasks
            WeaveAPI.StageUtils.startTask(this, asyncIterate.bind(this), WeaveAPI.TASK_PRIORITY_NORMAL, asyncComplete.bind(this), weavecore.StandardLib.replace("Plotting {0} for {1}", ['subset', 'selection', 'mouseover'][this._taskType], WeaveAPI.debugID(this._plotter)));

            // assign secondary busy task in case async task gets cancelled due to busy dependencies
            WeaveAPI.SessionManager.assignBusyTask(this._dependencies, this);
        } else {
            if (PlotTask.debug)
                trace(this, 'should not be rendered');
        }
    }

    /**
     * This returns true if the layer should be rendered and selectable/probeable
     * @return true if the layer should be rendered and selectable/probeable
     */
    function shouldBeRendered() {
        var visible = true;
        if (!this._layerSettings.visible.value) {
            if (PlotTask.debug)
                console.log(this, 'visible=false');
            visible = false;
        } else if (!this._layerSettings.selectable.value && this._taskType != PlotTask.TASK_TYPE_SUBSET && !this._layerSettings.alwaysRenderSelection.value) {
            if (PlotTask.debug)
                console.log(this, 'selection disabled');
            visible = false;
        } else {
            // HACK - begin validating spatial index if necessary, because this may affect zoomBounds
            /*if (WeaveAPI.detectLinkableObjectChange(this._spatialIndex.createIndex, this._plotter.spatialCallbacks))
                this._spatialIndex.createIndex(this._plotter, this._layerSettings.hack_includeMissingRecordBounds);*/

            // if scale is undefined, request geometry detail because this may affect zoomBounds
            /* if (isNaN(_zoomBounds.getXScale()))
             	hack_requestGeometryDetail();*/


            // visible = this._layerSettings.isZoomBoundsWithinVisibleScale(this._zoomBounds);
            /*if (!WeaveAPI.detectLinkableObjectChange(shouldBeRendered, this._plotter.dataX)) {
                visible = false;
            }*/
        }

        if (!visible && WeaveAPI.SessionManager.linkableObjectIsBusy(this)) {

            WeaveAPI.SessionManager.unassignBusyTask(this._dependencies);

            /*disposeObject(bufferBitmap.bitmapData);
            bufferBitmap.bitmapData = null;
            disposeObject(completedBitmap.bitmapData);
            completedBitmap.bitmapData = null;
            completedDataBounds.reset();
            completedScreenBounds.reset();*/
        }
        return visible;
    }

    /**
     * @return true if shouldBeRendered() returns true.
     */
    function asyncInit() {
        var shouldRender = shouldBeRendered.call(this);
        if (this._delayInit) {
            this._pendingInit = true;
            return shouldRender;
        }
        this._pendingInit = false;

        this._progress = 0;
        this._iteration = 0;
        this._iPendingKey = 0;
        if (true) {
            this._pendingKeys = this._plotter.filteredKeySet.keys;
            this._recordKeys = [];
            /*_zoomBounds.getDataBounds(_dataBounds);
            _zoomBounds.getScreenBounds(_screenBounds);*/
            if (this._taskType === PlotTask.TASK_TYPE_SUBSET) {
                // TEMPORARY SOLUTION until we start using VisToolGroup
                this._keyFilter = this._plotter.filteredKeySet.keyFilter.getInternalKeyFilter();
                //_keyFilter = _layerSettings.subsetFilter.getInternalKeyFilter();
            } else if (this._taskType === PlotTask.TASK_TYPE_SELECTION)
                this._keyFilter = this._layerSettings.selectionFilter.getInternalKeyFilter();
            else if (this._taskType === PlotTask.TASK_TYPE_PROBE)
                this._keyFilter = this._layerSettings.probeFilter.getInternalKeyFilter();

            if (PlotTask.debug)
                console.log(this, 'clear');
            // clear bitmap and resize if necessary
            //PlotterUtils.setBitmapDataSize(bufferBitmap, _unscaledWidth, _unscaledHeight);
        } else {
            // clear graphics if not already cleared
            /* PlotterUtils.emptyBitmapData(bufferBitmap);
             PlotterUtils.emptyBitmapData(completedBitmap);
             completedDataBounds.reset();
             completedScreenBounds.reset();*/
            _pendingKeys = null;
            _recordKeys = null;
        }
        return shouldRender;
    }

    function getTimer() {
        return new Date().getTime();
    }

    function asyncIterate(stopTime) {
        /* if (debugMouseDownPause && WeaveAPI.StageUtils.mouseButtonDown)
             return 0;*/

        if (this.delayAsyncTask)
            return 0;

        // if plotter is busy, stop immediately
        if (WeaveAPI.SessionManager.linkableObjectIsBusy(this._dependencies)) {
            if (PlotTask.debug)
                console.log(this, 'dependencies are busy');
            /* if (!debugIgnoreSpatialIndex)
                 return 1;*/

            // only spend half the time rendering when dependencies are busy
            stopTime = (getTimer() + stopTime) / 2;
        }

        /***** initialize *****/

        // restart if necessary, initializing variables
        if (this._prevBusyGroupTriggerCounter !== this._dependencies.triggerCounter) {
            this._prevBusyGroupTriggerCounter = this._dependencies.triggerCounter;

            // stop immediately if we shouldn't be rendering
            if (!asyncInit.call(this))
                return 1;

            // stop immediately if the bitmap is invalid
            /*if (PlotterUtils.bitmapDataIsEmpty(bufferBitmap)) {
                if (debug)
                    trace(this, 'bitmap is empty');
                return 1;
            }*/

            // hacks
            //TO-DO enable this after geometry concept is implemented
            //hack_requestGeometryDetail();

            // hack - draw background on subset layer
            /*if (this._taskType === PlotTask.TASK_TYPE_SUBSET)
                _plotter.drawBackground(_dataBounds, _screenBounds, bufferBitmap.bitmapData);*/
        }

        /***** prepare keys *****/

        // if keys aren't ready yet, prepare keys
        if (this._pendingKeys) {
            for (; this._iPendingKey < this._pendingKeys.length; this._iPendingKey++) {
                // avoid doing too little or too much work per iteration
                if (getTimer() > stopTime)
                    return 0; // not done yet

                // next key iteration - add key if included in filter and on screen
                var key = this._pendingKeys[this._iPendingKey];
                if (!this._keyFilter || this._keyFilter.containsKey(key)) // accept all keys if _keyFilter is null
                {
                    var keysArray = this._spatialIndex.getBoundsFromKey(key)
                    for (var i = 0; i < keysArray.length; i++) {
                        var keyBounds = keysArray[i];
                        if (keyBounds.overlaps(this._dataBounds)) {
                            if (!keyBounds.isUndefined() || this._layerSettings.hack_includeMissingRecordBounds) {
                                this._recordKeys.push(key);
                                break;
                            }
                        }
                    }

                }
            }
            if (PlotTask.debug)
                console.log(this, 'recordKeys', this._recordKeys.length);

            // done with keys
            this._pendingKeys = null;
        }

        /***** draw *****/

        // next draw iteration
        this._iterationStopTime = stopTime;

        while (this._progress < 1 && getTimer() < stopTime) {
            // delay asyncInit() while calling plotter function in case it triggers callbacks
            //this._delayInit = true;


            if (this._iteration < this.recordKeys.length) {
                this._progress = this.iteration / task.recordKeys.length;
            } else {
                this._progress = 1;
            }

            /*if (PlotTask.debug)
                console.log(this, 'before iteration', this._iteration, 'recordKeys', this.recordKeys.length);
            this._progress = this._plotter.drawPlotAsyncIteration(this);
            if (PlotTask.debug)
                console.log(this, 'after iteration', this._iteration, 'progress', this._progress, 'recordKeys', this.recordKeys.length);*/

            //this._delayInit = false;
            console.log(this, 'after iteration', this._iteration, 'progress', this._progress, 'recordKeys', this.recordKeys.length);
            if (this._pendingInit) {
                // if we get here it means the plotter draw function triggered callbacks
                // and we need to restart the async task.
                if (asyncInit.call(this))
                    return asyncIterate.call(this, stopTime);
                else
                    return 1;
            } else
                this._iteration++; // prepare for next iteration
        }

        return this._progress;
    }

    function asyncComplete() {
        if (PlotTask.debug)
            console.log(this, 'rendering completed');
        this._progress = 0;
        // don't do anything else if dependencies are busy
        if (WeaveAPI.SessionManager.linkableObjectIsBusy(this._dependencies))
            return;

        // busy task gets unassigned when the render completed successfully
        WeaveAPI.SessionManager.unassignBusyTask(this._dependencies);

        if (shouldBeRendered.call(this)) {
            // BitmapData has been completely rendered, so update completedBitmap and completedDataBounds
            /*var oldBitmapData: BitmapData = completedBitmap.bitmapData;
            completedBitmap.bitmapData = bufferBitmap.bitmapData;
            bufferBitmap.bitmapData = oldBitmapData;
            PlotterUtils.clearBitmapData(bufferBitmap);
            completedDataBounds.copyFrom(_dataBounds);
            completedScreenBounds.copyFrom(_screenBounds);*/

            WeaveAPI.SessionManager.getCallbackCollection(this).triggerCallbacks();
        }
    }

    PlotTask.prototype = new weavecore.ILinkableObject();
    PlotTask.prototype.constructor = PlotTask;
    var p = PlotTask.prototype;

    p.dispose = function () {
        _plotter = null;
        _spatialIndex = null;
        _zoomBounds = null;
        _layerSettings = null;
        //WeaveAPI.SessionManager.disposeObject(completedBitmap.bitmapData);
        //WeaveAPI.SessionManager.disposeObject(bufferBitmap.bitmapData);
    }


    if (typeof exports !== 'undefined') {
        module.exports = PlotTask;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.PlotTask = PlotTask;
    }

    weavecore.ClassUtils.registerClass('weavetool.PlotTask', weavetool.PlotTask);

}());
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
    Object.defineProperty(SolidFillStyle, 'NS', {
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
    Object.defineProperty(SolidFillStyle, 'CLASS_NAME', {
        value: 'SolidFillStyle'
    });


    /**
     * This is an interface to identify Visualization tools
     *
     * @author adufilie
     * @author sanjay1909
     */
    function SolidFillStyle() {
        weavecore.ILinkableObject.call(this);


        Object.defineProperties(this, {
            'enable': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true))
            },
            'color': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavedata.AlwaysDefinedColumn(NaN))
            },
            'alpha': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavedata.AlwaysDefinedColumn(1.0))
            }
        });


    }

    SolidFillStyle.prototype = new weavecore.ILinkableObject();
    SolidFillStyle.prototype.constructor = SolidFillStyle;
    var p = SolidFillStyle.prototype;




    if (typeof exports !== 'undefined') {
        module.exports = SolidFillStyle;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.SolidFillStyle = SolidFillStyle;
    }

    weavecore.ClassUtils.registerClass('weavetool.SolidFillStyle', weavetool.SolidFillStyle);

}());

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
            'probeFilter': {
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


    p.isZoomBoundsWithinVisibleScale = function (zoomBounds) {
        var min = weavecore.StandardLib.roundSignificant(this.minVisibleScale.value);
        var max = weavecore.StandardLib.roundSignificant(this.maxVisibleScale.value);
        var xScale = weavecore.StandardLib.roundSignificant(zoomBounds.getXScale());
        var yScale = weavecore.StandardLib.roundSignificant(zoomBounds.getYScale());
        return min <= xScale && xScale <= max && min <= yScale && yScale <= max;
    }

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
    Object.defineProperty(PlotManager, 'NS', {
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
    Object.defineProperty(PlotManager, 'CLASS_NAME', {
        value: 'PlotManager'
    });


    /**
     *
     * @author adufilie
     * @author sanjay1909
     */
    function PlotManager() {
        weavecore.ILinkableObject.call(this);



        Object.defineProperties(this, {
            'plotters': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableHashMap(weavetool.IPlotter))
            },
            'layerSettings': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableHashMap(weavetool.LayerSettings))
            },
            'zoomBounds': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavedata.ZoomBounds(), updateZoom.bind(this), false)
            },
            'marginRightNumber': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(0), updateZoom.bind(this), true)
            },
            'marginLeftNumber': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(0), updateZoom.bind(this), true)
            },
            'marginBottomNumber': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(0), updateZoom.bind(this), true)
            },
            'marginTopNumber': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(0), updateZoom.bind(this), true)
            },
            'marginRight': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString('0', weavedata.NumberUtils.verifyNumberOrPercentage), updateZoom.bind(this), true)
            },
            'marginLeft': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString('0', weavedata.NumberUtils.verifyNumberOrPercentage), updateZoom.bind(this), true)
            },
            'marginBottom': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString('0', weavedata.NumberUtils.verifyNumberOrPercentage), updateZoom.bind(this), true)
            },
            'marginTop': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString('0', weavedata.NumberUtils.verifyNumberOrPercentage), updateZoom.bind(this), true)
            },
            'minScreenSize': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(128), updateZoom.bind(this), true)
            },
            'minZoomLevel': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(0), updateZoom.bind(this), true)
            },
            'maxZoomLevel': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(18), updateZoom.bind(this), true)
            },
            'enableFixedAspectRatio': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(false), updateZoom.bind(this), true)
            },
            'enableAutoZoomToExtent': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true), updateZoom.bind(this), true)
            },
            'enableAutoZoomToSelection': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(false), updateZoom.bind(this), true)
            },
            'includeNonSelectableLayersInAutoZoom': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(false), updateZoom.bind(this), true)
            },
            'overrideXMin': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(NaN), updateZoom.bind(this), true)
            },
            'overrideYMin': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(NaN), updateZoom.bind(this), true)
            },
            'overrideXMax': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(NaN), updateZoom.bind(this), true)
            },
            'overrideYMax': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(NaN), updateZoom.bind(this), true)
            },
            'fullDataBounds': {
                value: new weavedata.Bounds2D() //This is the collective data bounds of all the selectable plot layers.
            }

        });


        this._unscaledWidth = 0;
        this._unscaledHeight = 0;

        // private const
        // reusable temporary objects
        Object.defineProperties(this, {
            'tempPoint': {
                value: new weavedata.Point()
            },
            'tempBounds': {
                value: new weavedata.Bounds2D()
            },
            'tempScreenBounds': {
                value: new weavedata.Bounds2D()
            },
            'tempDataBounds': {
                value: new weavedata.Bounds2D()
            }
        });




        this._name_to_PlotTask_Array = {}; // name -> Array of PlotTask
        this._name_to_SpatialIndex = {}; // name -> SpatialIndex
        this._shouldUpdateZoom = false;
        this._lazyUpdateZoom = true;

        /**
         * This can be set to a function that will be called to adjust fullDataBounds whenever it is updated.
         */
        this.hack_adjustFullDataBounds = null;

        /**
         * This can be set to a function that will be called whenever updateZoom is called.
         */
        this.hack_updateZoom_callbacks = [];


        //this.plotters.addImmediateCallback(this, updateZoom.bind(this));
        //this.layerSettings.addImmediateCallback(this, updateZoom.bind(this));
        //this.layerSettings.addImmediateCallback(this, refreshLayers);
        //WeaveAPI.SessionManager.getCallbackCollection(this.zoomBounds).addImmediateCallback(this, refreshLayers);

        this.plotters.childListCallbacks.addImmediateCallback(this, handlePlottersList.bind(this));
        this.layerSettings.childListCallbacks.addImmediateCallback(this, handleSettingsList.bind(this));

        WeaveAPI.SessionManager.excludeLinkableChildFromSessionState(this, this.marginBottomNumber);
        WeaveAPI.SessionManager.excludeLinkableChildFromSessionState(this, this.marginTopNumber);
        WeaveAPI.SessionManager.excludeLinkableChildFromSessionState(this, this.marginLeftNumber);
        WeaveAPI.SessionManager.excludeLinkableChildFromSessionState(this, this.marginRightNumber);

        this._frameCountSinceResize = 0;
        // WeaveAPI.StageUtils.addEventCallback("tick", this, handleFrameConstructed.bind(this));
    }

    PlotManager.prototype = new weavecore.ILinkableObject();
    PlotManager.prototype.constructor = PlotManager;
    var p = PlotManager.prototype;

    p.getPlotter = function (name) {
        return this.plotters.getObject(name);
    }

    p.getLayerSettings = function (name) {
        return this.layerSettings.getObject(name);
    }

    p.hack_onUpdateZoom = function (callback) {
        this.hack_updateZoom_callbacks.push(callback);
    }

    function handleFrameConstructed() {

        if (++this._frameCountSinceResize === 2) {
            console.log("handleFrameConstructed", this._frameCountSinceResize);
            this.plotters.getNames(weavetool.IPlotter).forEach(function (name) {
                this._name_to_PlotTask_Array[name].forEach(function (plotTask) {
                    plotTask.delayAsyncTask = false;
                });
            }, this);
        }

        if (this._shouldUpdateZoom) {
            console.log("handleFrameConstructed: _shouldUpdateZoom", this._shouldUpdateZoom);
            updateZoom.call(this, true);
        }


        if (this.shouldRender) {
            console.log("handleFrameConstructed: shouldRender", this.shouldRender);
            refreshLayers(true);
        }

    }



    function handleSettingsList() {
        // when settings are removed, remove plotter
        var oldName = this.layerSettings.childListCallbacks.lastNameRemoved;
        this.plotters.removeObject(oldName);
        this.plotters.setNameOrder(this.layerSettings.getNames());
    }

    function handlePlottersList() {
        this.plotters.delayCallbacks();
        this.layerSettings.delayCallbacks();

        // when plotter is removed, remove settings
        var oldName = this.plotters.childListCallbacks.lastNameRemoved;
        if (oldName) {
            delete this._name_to_SpatialIndex[oldName];
            delete this._name_to_PlotTask_Array[oldName];
            this.layerSettings.removeObject(oldName);
        }

        var newName = this.plotters.childListCallbacks.lastNameAdded;
        if (newName) {
            var newPlotter = this.plotters.childListCallbacks.lastObjectAdded;
            var settings = this.layerSettings.requestObject(newName, weavetool.LayerSettings, this.plotters.objectIsLocked(newName));

            // TEMPORARY SOLUTION until we start using VisToolGroup
            newPlotter.filteredKeySet.keyFilter.targetPath = ["defaultSubsetKeyFilter"];

            var spatialIndex = this._name_to_SpatialIndex[newName] = WeaveAPI.SessionManager.registerDisposableChild(newPlotter, new weavetool.SpatialIndex());
            var tasks = this._name_to_PlotTask_Array[newName] = [];

            [weavetool.PlotTask.TASK_TYPE_SUBSET, weavetool.PlotTask.TASK_TYPE_SELECTION, weavetool.PlotTask.TASK_TYPE_PROBE].forEach(function (taskType) {
                var plotTask = new weavetool.PlotTask(taskType, newPlotter, spatialIndex, this.zoomBounds, settings);
                WeaveAPI.SessionManager.registerDisposableChild(newPlotter, plotTask); // plotter is owner of task
                WeaveAPI.SessionManager.registerLinkableChild(this, plotTask); // task affects busy status of PlotManager
                tasks.push(plotTask);
                // set initial size
                //plotTask.setBitmapDataSize(_unscaledWidth, _unscaledHeight);

                // when the plot task triggers callbacks, we need to render the layered visualization
                WeaveAPI.SessionManager.getCallbackCollection(plotTask).addImmediateCallback(this, refreshLayers);
            }, this);
            //setupBitmapFilters(newPlotter, settings, tasks[0], tasks[1], tasks[2]);
            // when spatial index is recreated, we need to update zoom
            //WeaveAPI.SessionManager.getCallbackCollection(spatialIndex).addImmediateCallback(this, updateZoom.bind(this));

            /*if (newPlotter is ITextPlotter)
            	settings.hack_useTextBitmapFilters = true;*/
        }

        this.layerSettings.setNameOrder(this.plotters.getNames());

        this.plotters.resumeCallbacks();
        this.layerSettings.resumeCallbacks();
    }

    function refreshLayers() {

    }
    /**
     * This function will update the fullDataBounds and zoomBounds based on the current state of the layers.
     */
    function updateZoom(now) {
        now = (now === undefined) ? false : now;
        /*if (this._lazyUpdateZoom && !now) {
            this._shouldUpdateZoom = true;
            return;
        }*/
        this._lazyUpdateZoom = false;
        this._shouldUpdateZoom = false;

        /*// make sure callbacks only trigger once
        WeaveAPI.SessionManager.getCallbackCollection(this).delayCallbacks();
        WeaveAPI.SessionManager.getCallbackCollection(this.zoomBounds).delayCallbacks();
        //trace('begin updateZoom',ObjectUtil.toString(getSessionState(zoomBounds)));

        // make sure numeric margin values are correct
        this.marginBottomNumber.value = Math.round(weavedata.NumberUtils.getNumberFromNumberOrPercent(this.marginBottom.value, this._unscaledHeight));
        this.marginTopNumber.value = Math.round(weavedata.NumberUtils.getNumberFromNumberOrPercent(this.marginTop.value, this._unscaledHeight));
        this.marginLeftNumber.value = Math.round(weavedata.NumberUtils.getNumberFromNumberOrPercent(this.marginLeft.value, this._unscaledWidth));
        this.marginRightNumber.value = Math.round(weavedata.NumberUtils.getNumberFromNumberOrPercent(this.marginRight.value, this._unscaledWidth));

        this.updateFullDataBounds();

        // calculate new screen bounds in temp variable
        // default behaviour is to set screenBounds beginning from lower-left corner and ending at upper-right corner
        var left = this.marginLeftNumber.value;
        var top = this.marginTopNumber.value;
        var right = this._unscaledWidth - this.marginRightNumber.value;
        var bottom = this._unscaledHeight - this.marginBottomNumber.value;
        // set screenBounds beginning from lower-left corner and ending at upper-right corner
        //TODO: is other behavior required?
        this.tempScreenBounds.setBounds(left, bottom, right, top);
        if (left > right)
            this.tempScreenBounds.setWidth(0);
        if (top > bottom)
            this.tempScreenBounds.setHeight(0);
        // copy current dataBounds to temp variable
        this.zoomBounds.getDataBounds(this.tempDataBounds);

        // determine if dataBounds should be zoomed to fullDataBounds
        if (this.enableAutoZoomToExtent.value || this.tempDataBounds.isUndefined()) {
            if (!this.fullDataBounds.isEmpty())
                tthis.empDataBounds.copyFrom(this.fullDataBounds);

            if (isFinite(this.overrideXMin.value))
                this.tempDataBounds.setXMin(this.overrideXMin.value);
            if (isFinite(this.overrideXMax.value))
                this.tempDataBounds.setXMax(this.overrideXMax.value);
            if (isFinite(this.overrideYMin.value))
                this.tempDataBounds.setYMin(this.overrideYMin.value);
            if (isFinite(this.overrideYMax.value))
                this.tempDataBounds.setYMax(this.overrideYMax.value);

            if (this.enableFixedAspectRatio.value) {
                var xScale = this.tempDataBounds.getWidth() / this.tempScreenBounds.getXCoverage();
                var yScale = this.tempDataBounds.getHeight() / this.tempScreenBounds.getYCoverage();
                // keep greater data-to-pixel ratio because we want to zoom out if necessary
                if (xScale > yScale)
                    this.tempDataBounds.setHeight(this.tempScreenBounds.getYCoverage() * xScale);
                if (yScale > xScale)
                    this.tempDataBounds.setWidth(this.tempScreenBounds.getXCoverage() * yScale);
            }
        }

        var overrideBounds = isFinite(this.overrideXMin.value) || isFinite(this.overrideXMax.value) || isFinite(this.overrideYMin.value) || isFinite(this.overrideYMax.value);
        if (!this.tempScreenBounds.isEmpty() && !this.overrideBounds) {
            //var minSize = Math.min(minScreenSize.value, tempScreenBounds.getXCoverage(), tempScreenBounds.getYCoverage());

            if (!this.tempDataBounds.isUndefined() && !this.fullDataBounds.isUndefined()) {
                // Enforce pan restrictions on tempDataBounds.
                // Center of visible dataBounds should be a point inside fullDataBounds.
                this.fullDataBounds.constrainBoundsCenterPoint(this.tempDataBounds);
                //fullDataBounds.constrainBounds(tempDataBounds);
            }
        }

        // save new bounds
        this.zoomBounds.setBounds(this.tempDataBounds, this.tempScreenBounds, this.enableFixedAspectRatio.value);
        if (this.enableAutoZoomToSelection.value) {
            //zoomToSelection();
        }


        // ----------------- hack --------------------
        this.hack_updateZoom_callbacks.forEach(function (callback) {
            callback();
        });
        // -------------------------------------------

        WeaveAPI.SessionManager.getCallbackCollection(this.zoomBounds).resumeCallbacks();
        WeaveAPI.SessionManager.getCallbackCollection(this).resumeCallbacks();

        this._lazyUpdateZoom = true;*/
    }

    /**
     * This function gets called by updateZoom and updates fullDataBounds.
     */
    p.updateFullDataBounds = function () {
        this.tempBounds.copyFrom(this.fullDataBounds);
        this.fullDataBounds.reset();
        var plotterNames = this.plotters.getNames(weavetool.IPlotter)
        for (var i = 0; i < plotterNames.length; i++) {
            var name = plotterNames[i];
            var settings = this.layerSettings.getObject(name);

            // skip excluded layers
            if (!this.includeNonSelectableLayersInAutoZoom.value && !settings.selectable.value)
                continue;

            // skip invisible layers
            if (!settings.visible.value)
                continue;

            var spatialIndex = this._name_to_SpatialIndex[name];
            this.fullDataBounds.includeBounds(spatialIndex.collectiveBounds);

            var plotter = this.plotters.getObject(name);
            plotter.getBackgroundDataBounds(this.tempDataBounds);
            this.fullDataBounds.includeBounds(this.tempDataBounds);
        }
        // ----------------- hack --------------------
        if (this.hack_adjustFullDataBounds !== null)
            this.hack_adjustFullDataBounds();
        // -------------------------------------------

        if (!this.tempBounds.equals(this.fullDataBounds)) {
            //trace('fullDataBounds changed',ObjectUtil.toString(fullDataBounds));
            WeaveAPI.SessionManager.getCallbackCollection(this).triggerCallbacks();
        }
    }

    /**
     * This function sets the data bounds for zooming, but checks them against the min and max zoom first.
     * @param bounds The bounds that zoomBounds should be set to.
     * @see weave.primitives.ZoomBounds#setDataBounds()
     */
    p.setCheckedZoomDataBounds = function (dataBounds) {
        // instead of calling zoomBounds.setDataBounds() directly, we use setZoomLevel() because it's easier to constrain between min and max zoom.

        this.zoomBounds.getScreenBounds(this.tempScreenBounds);
        var minSize = Math.min(this.minScreenSize.value, this.tempScreenBounds.getXCoverage(), this.tempScreenBounds.getYCoverage());
        var newZoomLevel = weavecore.StandardLib.roundSignificant(
            weavecore.StandardLib.constrain(
                weavetool.ZoomUtils.getZoomLevel(dataBounds, this.tempScreenBounds, this.fullDataBounds, minSize),
                this.minZoomLevel.value,
                this.maxZoomLevel.value
            )
        );

        // stop if constrained zoom level doesn't change
        if (this.getZoomLevel() === newZoomLevel)
            return;

        var cc = WeaveAPI.SessionManager.getCallbackCollection(this.zoomBounds);
        cc.delayCallbacks();

        this.setZoomLevel(newZoomLevel);
        this.zoomBounds.getDataBounds(this.tempDataBounds);
        if (this.tempDataBounds.isUndefined())
            this.tempDataBounds.copyFrom(dataBounds);
        else
            this.tempDataBounds.setCenter(dataBounds.getXCenter(), dataBounds.getYCenter());
        this.zoomBounds.setDataBounds(this.tempDataBounds);

        // ----------------- hack --------------------
        this.hack_updateZoom_callbacks.forEach(function (callback) {
            callback();
        });
        // -------------------------------------------

        cc.resumeCallbacks();
    }


    /**
     * This function gets the current zoom level as defined in ZoomUtils.
     * @return The current zoom level.
     * @see weave.utils.ZoomUtils#getZoomLevel
     */
    p.getZoomLevel = function () {
        this.zoomBounds.getDataBounds(this.tempDataBounds);
        this.zoomBounds.getScreenBounds(this.tempScreenBounds);
        var minSize = Math.min(this.minScreenSize.value, this.tempScreenBounds.getXCoverage(), this.tempScreenBounds.getYCoverage());
        var zoomLevel = weavetool.ZoomUtils.getZoomLevel(this.tempDataBounds, this.tempScreenBounds, this.fullDataBounds, minSize);
        return zoomLevel;
    }

    /**
     * This function sets the zoom level as defined in ZoomUtils.
     * @param newZoomLevel The new zoom level.
     * @see weave.utils.ZoomUtils#getZoomLevel
     */
    p.setZoomLevel = function (newZoomLevel) {
        newZoomLevel = weavecore.StandardLib.roundSignificant(newZoomLevel);
        var currentZoomLevel = this.getZoomLevel();
        var newConstrainedZoomLevel = weavecore.StandardLib.constrain(newZoomLevel, this.minZoomLevel.value, this.maxZoomLevel.value);
        if (newConstrainedZoomLevel !== currentZoomLevel) {
            var scale = 1 / Math.pow(2, newConstrainedZoomLevel - currentZoomLevel);
            if (!isNaN(scale) && scale !== 0) {
                this.zoomBounds.getDataBounds(this.tempDataBounds);
                this.tempDataBounds.setWidth(this.tempDataBounds.getWidth() * scale);
                this.tempDataBounds.setHeight(this.tempDataBounds.getHeight() * scale);
                this.zoomBounds.setDataBounds(this.tempDataBounds);
            }
        }
    }



    if (typeof exports !== 'undefined') {
        module.exports = PlotManager;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.PlotManager = PlotManager;
    }

    weavecore.ClassUtils.registerClass('weavetool.PlotManager', weavetool.PlotManager);

}());

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
    Object.defineProperty(Visualization, 'NS', {
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
    Object.defineProperty(Visualization, 'CLASS_NAME', {
        value: 'Visualization'
    });


    /**
     * This is an interface to identify Visualization tools
     *
     * @author adufilie
     * @author sanjay1909
     */
    function Visualization() {
        weavecore.ILinkableObject.call(this);

        Object.defineProperty(this, 'plotManager', {
            value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavetool.PlotManager())
        });
    }

    Visualization.prototype = new weavecore.ILinkableObject();
    Visualization.prototype.constructor = Visualization;
    var p = Visualization.prototype;




    if (typeof exports !== 'undefined') {
        module.exports = Visualization;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.Visualization = Visualization;
    }

    weavecore.ClassUtils.registerClass('weavetool.Visualization', weavetool.Visualization);

}());

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
    Object.defineProperty(InteractiveVisualization, 'NS', {
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
    Object.defineProperty(InteractiveVisualization, 'CLASS_NAME', {
        value: 'InteractiveVisualization'
    });


    /**
     * This is an interface to identify Visualization tools
     *
     * @author adufilie
     * @author sanjay1909
     */
    function InteractiveVisualization() {
        weavetool.Visualization.call(this);

        Object.defineProperties(this, {
            'enableZoomAndPan': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true))
            },
            'enableSelection': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true))
            },
            'enableProbe': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true))
            },
            'zoomFactor': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(2, verifyZoomFactor.bind(this)))
            }
        });

    }

    function verifyZoomFactor(value) {
        return value >= 1;
    }

    InteractiveVisualization.prototype = new weavetool.Visualization();
    InteractiveVisualization.prototype.constructor = InteractiveVisualization;
    var p = InteractiveVisualization.prototype;




    if (typeof exports !== 'undefined') {
        module.exports = InteractiveVisualization;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.InteractiveVisualization = InteractiveVisualization;
    }

    weavecore.ClassUtils.registerClass('weavetool.InteractiveVisualization', weavetool.InteractiveVisualization);

}());

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
    Object.defineProperty(SimpleInteractiveVisualization, 'NS', {
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
    Object.defineProperty(SimpleInteractiveVisualization, 'CLASS_NAME', {
        value: 'SimpleInteractiveVisualization'
    });



    Object.defineProperties(SimpleInteractiveVisualization, {
        'PROBE_LINE_LAYER_NAME': {
            value: 'probeLine'
        },
        'X_AXIS_LAYER_NAME': {
            value: 'xAxis'
        },
        'Y_AXIS_LAYER_NAME': {
            value: 'yAxis'
        },
        'MAIN_PLOT_LAYER_NAME': {
            value: 'plot'
        }
    });


    /**
     *
     * @author adufilie
     * @author sanjay1909
     */
    function SimpleInteractiveVisualization() {
        weavetool.InteractiveVisualization.call(this);
        Object.defineProperties(this, {
            'enableAutoZoomXToNiceNumbers': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(false))
            },
            'enableAutoZoomYToNiceNumbers': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(false))
            },
            'gridLineThickness': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber())
            },
            'gridLineColor': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber())
            },
            'gridLineAlpha': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber())
            },
            'axesThickness': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber())
            },
            'axesColor': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber())
            },
            'axesAlpha': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber())
            },
            'bottomMarginClickCallbacks': {
                value: WeaveAPI.SessionManager.registerDisposableChild(this, new weavecore.CallbackCollection())
            },
            'topMarginClickCallbacks': {
                value: WeaveAPI.SessionManager.registerDisposableChild(this, new weavecore.CallbackCollection())
            },
            'leftMarginClickCallbacks': {
                value: WeaveAPI.SessionManager.registerDisposableChild(this, new weavecore.CallbackCollection())
            },
            'rightMarginClickCallbacks': {
                value: WeaveAPI.SessionManager.registerDisposableChild(this, new weavecore.CallbackCollection())
            }
        });

        this._mainPlotterInitialized = false;

        this.xToolTipEnabled;
        this.yToolTipEnabled;


        // private const tempPoint:Point = new Point(); // reusable temp object

        Object.defineProperty(this, 'tempBounds', {
            value: new weavedata.Bounds2D()
        });

        // hacks
        this.plotManager.hack_adjustFullDataBounds = hack_adjustFullDataBounds.bind(this);
        this.plotManager.hack_onUpdateZoom(hack_updateZoom.bind(this));
        WeaveAPI.SessionManager.registerLinkableChild(this.plotManager.zoomBounds, this.enableAutoZoomXToNiceNumbers);
        WeaveAPI.SessionManager.registerLinkableChild(this.plotManager.zoomBounds, this.enableAutoZoomYToNiceNumbers);

        WeaveAPI.SessionManager.getCallbackCollection(this.plotManager.zoomBounds).addGroupedCallback(this, hack_defineZoomIfUndefined.bind(this), true);
    }

    function hack_defineZoomIfUndefined() {
        if ((this.getXAxisPlotter() || this.getYAxisPlotter()) && this.plotManager.enableAutoZoomToExtent.value) {
            this.plotManager.zoomBounds.getDataBounds(this.tempBounds);
            if (this.tempBounds.isUndefined()) {
                if (this.tempBounds.getWidth() === 0)
                    this.tempBounds.setXRange(0, 10);
                if (this.tempBounds.getHeight() === 0)
                    this.tempBounds.setYRange(0, 10);
                this.plotManager.setCheckedZoomDataBounds(this.tempBounds);
            }
        }
    }

    function hack_adjustFullDataBounds() {
        // adjust fullDataBounds based on auto zoom settings
        var fullDataBounds = this.plotManager.fullDataBounds;
        this.tempBounds.copyFrom(fullDataBounds);
        if (this.getXAxisPlotter() && this.enableAutoZoomXToNiceNumbers.value) {
            var xMinMax = weavecore.StandardLib.getNiceNumbersInRange(fullDataBounds.getXMin(), fullDataBounds.getXMax(), this.getXAxisPlotter().tickCountRequested.value);
            this.tempBounds.setXRange(xMinMax[0], xMinMax[xMinMax.length - 1]); // first & last ticks
        }
        if (this.getYAxisPlotter() && this.enableAutoZoomYToNiceNumbers.value) {
            var yMinMax = weavecore.StandardLib.getNiceNumbersInRange(fullDataBounds.getYMin(), fullDataBounds.getYMax(), this.getYAxisPlotter().tickCountRequested.value);
            this.tempBounds.setYRange(yMinMax[0], yMinMax[yMinMax.length - 1]); // first & last ticks
        }
        // if axes are enabled, make sure width and height are not zero
        if ((this.getXAxisPlotter() || this.getYAxisPlotter()) && this.plotManager.enableAutoZoomToExtent.value) {
            if (this.tempBounds.getWidth() == 0)
                this.tempBounds.setWidth(1);
            if (this.tempBounds.getHeight() == 0)
                this.tempBounds.setHeight(1);
        }
        fullDataBounds.copyFrom(this.tempBounds);
    }

    function hack_updateZoom() {
        // when the data bounds change, we need to update the min,max values for axes
        var xAxis = this.getXAxisPlotter();
        if (xAxis) {
            WeaveAPI.SessionManager.getCallbackCollection(xAxis).delayCallbacks(); // avoid recursive updateZoom() call until done setting session state
            this.plotManager.zoomBounds.getDataBounds(this.tempBounds);
            this.tempBounds.yMax = this.tempBounds.yMin;
            xAxis.axisLineDataBounds.copyFrom(this.tempBounds);
            xAxis.axisLineMinValue.value = this.tempBounds.xMin;
            xAxis.axisLineMaxValue.value = this.tempBounds.xMax;
            WeaveAPI.SessionManager.getCallbackCollection(xAxis).resumeCallbacks();
        }
        var yAxis = this.getYAxisPlotter();
        if (yAxis) {
            WeaveAPI.SessionManager.getCallbackCollection(yAxis).delayCallbacks(); // avoid recursive updateZoom() call until done setting session state
            this.plotManager.zoomBounds.getDataBounds(this.tempBounds);
            this.tempBounds.xMax = this.tempBounds.xMin;
            yAxis.axisLineDataBounds.copyFrom(this.tempBounds);
            yAxis.axisLineMinValue.value = this.tempBounds.yMin;
            yAxis.axisLineMaxValue.value = this.tempBounds.yMax;
            WeaveAPI.SessionManager.getCallbackCollection(yAxis).resumeCallbacks();
        }
    }

    function linkToAxisProperties(axisName) {
        var p = this.plotManager.plotters.getObject(axisName);
        p = (p && p instanceof weavetool.SimpleAxisPlotter) ? p : null;
        if (!p)
            throw new Error('"' + axisName + '" is not an axis');
        var list = [
				[this.gridLineThickness, p.axisGridLineThickness],
				[this.gridLineColor, p.axisGridLineColor],
				[this.gridLineAlpha, p.axisGridLineAlpha],
				[this.axesThickness, p.axesThickness],
				[this.axesColor, p.axesColor],
				[this.axesAlpha, p.axesAlpha]
			];
        list.forEach(function (pair) {
            var var0 = pair[0];
            var var1 = pair[1];
            if (var0.triggerCounter == weavecore.CallbackCollection.DEFAULT_TRIGGER_COUNT)
                WeaveAPI.SessionManager.linkSessionState(var1, var0);
            else
                WeaveAPI.SessionManager.linkSessionState(var0, var1);
            WeaveAPI.SessionManager.excludeLinkableChildFromSessionState(p, pair[1]);
        });
        //(WeaveAPI.SessionManager as SessionManager).removeLinkableChildrenFromSessionState(p, p.axisLineDataBounds);
    }

    SimpleInteractiveVisualization.prototype = new weavetool.InteractiveVisualization();
    SimpleInteractiveVisualization.prototype.constructor = SimpleInteractiveVisualization;
    var p = SimpleInteractiveVisualization.prototype;

    p.getMainLayerSettings = function () {
        return this.plotManager.getLayerSettings(SimpleInteractiveVisualization.MAIN_PLOT_LAYER_NAME);
    }
    p.getMainPlotter = function () {
        return this._mainPlotterInitialized ? this.plotManager.getPlotter(SimpleInteractiveVisualization.MAIN_PLOT_LAYER_NAME) : null;
    }
    p.getXAxisPlotter = function () {
        return this.plotManager.getPlotter(SimpleInteractiveVisualization.X_AXIS_LAYER_NAME);
    }
    p.getYAxisPlotter = function () {
        return this.plotManager.getPlotter(SimpleInteractiveVisualization.Y_AXIS_LAYER_NAME);
    }
    p.getProbeLinePlotter = function () {
        return this.plotManager.getPlotter(SimpleInteractiveVisualization.PROBE_LINE_LAYER_NAME);
    }

    /**
     * @param mainPlotterClass The main plotter class definition.
     * @param showAxes Set to true if axes should be added.
     * @return The main plotter.
     */
    p.initializePlotters = function (mainPlotterClass, showAxes) {
        WeaveAPI.SessionManager.getCallbackCollection(this.plotManager).delayCallbacks();
        WeaveAPI.SessionManager.getCallbackCollection(this.plotManager.layerSettings).delayCallbacks();
        WeaveAPI.SessionManager.getCallbackCollection(this.plotManager.plotters).delayCallbacks();

        if (mainPlotterClass && !this.getMainPlotter()) {
            this._mainPlotterInitialized = true;
            this.plotManager.plotters.requestObject(SimpleInteractiveVisualization.MAIN_PLOT_LAYER_NAME, mainPlotterClass, true);
        }
        if (showAxes) {
            // x
            var xAxis = this.plotManager.plotters.requestObject(SimpleInteractiveVisualization.X_AXIS_LAYER_NAME, weavetool.SimpleAxisPlotter, true);
            xAxis.setupTextFormats(Weave.properties.axisTitleTextFormat, Weave.properties.visTextFormat);
            xAxis.axisLabelRelativeAngle.value = -45;
            xAxis.labelVerticalAlign.value = "top";
            var xSettings = this.plotManager.getLayerSettings(SimpleInteractiveVisualization.X_AXIS_LAYER_NAME);
            xSettings.selectable.value = false;
            xSettings.selectable.lock();

            linkToAxisProperties.call(this, SimpleInteractiveVisualization.X_AXIS_LAYER_NAME);

            // y
            var yAxis = this.plotManager.plotters.requestObject(SimpleInteractiveVisualization.Y_AXIS_LAYER_NAME, weavetool.SimpleAxisPlotter, true);
            yAxis.setupTextFormats(Weave.properties.axisTitleTextFormat, Weave.properties.visTextFormat);
            yAxis.axisLabelRelativeAngle.value = 45;
            yAxis.labelVerticalAlign.value = "bottom";
            var ySettings = this.plotManager.getLayerSettings(SimpleInteractiveVisualization.Y_AXIS_LAYER_NAME);
            ySettings.selectable.value = false;
            ySettings.selectable.lock();

            linkToAxisProperties.call(this, SimpleInteractiveVisualization.Y_AXIS_LAYER_NAME);

            // todo: is this really necessary?
            WeaveAPI.SessionManager.getCallbackCollection(this.plotManager.zoomBounds).triggerCallbacks();
        }
        this.putAxesOnBottom();

        WeaveAPI.SessionManager.getCallbackCollection(this.plotManager.plotters).resumeCallbacks();
        WeaveAPI.SessionManager.getCallbackCollection(this.plotManager.layerSettings).resumeCallbacks();
        WeaveAPI.SessionManager.getCallbackCollection(this.plotManager).resumeCallbacks();
        return this.getMainPlotter();
    }


    /**
     * This function orders the layers from top to bottom in this order:
     * probe (probe lines), plot, yAxis, xAxis
     */
    p.putAxesOnBottom = function () {
        var names = this.plotManager.plotters.getNames();

        // remove axis layer names so they can be put in front.
        var i;

        [SimpleInteractiveVisualization.X_AXIS_LAYER_NAME, SimpleInteractiveVisualization.Y_AXIS_LAYER_NAME].forEach(function (name) {
            i = names.indexOf(name)
            if (i >= 0)
                names.splice(i, 1);
        });

        names.unshift(SimpleInteractiveVisualization.X_AXIS_LAYER_NAME); // default axes first
        names.unshift(SimpleInteractiveVisualization.Y_AXIS_LAYER_NAME); // default axes first
        names.push(SimpleInteractiveVisualization.PROBE_LINE_LAYER_NAME); // probe line layer last

        this.plotManager.plotters.setNameOrder(names);
    }

    /**
     * This function should be called by a tool to initialize a probe line layer and its ProbeLinePlotter.
     * To disable probe lines, call this function with both parameters set to false.
     * @param xToolTipEnabled set to true if xAxis needs a probe line and tooltip
     * @param yToolTipEnabled set to true if yAxis needs a probe line and tooltip
     * @param xLabelFunction optional function to convert xAxis number values to string
     * @param yLabelFunction optional function to convert yAxis number values to string
     */
    p.enableProbeLine = function (xToolTipEnabled, yToolTipEnabled) {
        if (!xToolTipEnabled && !yToolTipEnabled)
            return;

        this.xToolTipEnabled = xToolTipEnabled;
        this.yToolTipEnabled = yToolTipEnabled;

        this.plotManager.plotters.requestObject(SimpleInteractiveVisualization.PROBE_LINE_LAYER_NAME, weavetool.ProbeLinePlotter, true);
        var probeLayerSettings = this.plotManager.getLayerSettings(SimpleInteractiveVisualization.PROBE_LINE_LAYER_NAME);
        probeLayerSettings.selectable.value = false;
        probeLayerSettings.selectable.lock();
        WeaveAPI.SessionManager.getCallbackCollection(this.getMainLayerSettings().probeFilter).addImmediateCallback(this, updateProbeLines.bind(this), false);
    }

    /**
     * Draws the probe lines using _probePlotter and the corresponding axes tooltips
     * @param labelFunction optional function to convert number values to string
     * @param labelFunctionX optional function to convert xAxis number values to string
     *
     */
    function updateProbeLines() {}

    if (typeof exports !== 'undefined') {
        module.exports = SimpleInteractiveVisualization;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.SimpleInteractiveVisualization = SimpleInteractiveVisualization;
    }

    weavecore.ClassUtils.registerClass('weavetool.SimpleInteractiveVisualization', weavetool.SimpleInteractiveVisualization);

}());

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
    Object.defineProperty(DraggablePanel, 'NS', {
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
    Object.defineProperty(DraggablePanel, 'CLASS_NAME', {
        value: 'DraggablePanel'
    });


    /**
     * This is an interface to identify Visualization tools
     *
     * @author adufilie
     * @author sanjay1909
     */
    function DraggablePanel() {
        weavecore.ILinkableObject.call(this);

        Object.defineProperties(this, {
            'panelX': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString(null, weavedata.NumberUtils.verifyNumberOrPercentage))
            },
            'panelY': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString(null, weavedata.NumberUtils.verifyNumberOrPercentage))
            },
            'panelWidth': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString(null, weavedata.NumberUtils.verifyNumberOrPercentage))
            },
            'panelHeight': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString(null, weavedata.NumberUtils.verifyNumberOrPercentage))
            },
            'maximized': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(false, verifyMaximized.bind(this)), handleMaximizedChange.bind(this), true)
            },
            'minimized': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(false, verifyMinimized.bind(this)), handleMinimizedChange.bind(this), true)
            },
            'zOrder': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(0, weavecore.StandardLib.isDefined), handleZOrderChange.bind(this), true)
            },
            'panelTitle': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString(), this.handlePanelTitleChange.bind(this), true)
            },
            'enableMoveResize': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true), panelNeedsUpdate, true)
            },
            'enableSubMenu': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(false))
            },
            'minimizable': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true), panelNeedsUpdate, true)
            },
            'maximizable': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true), panelNeedsUpdate, true)
            },
            'enableZOrder': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true), panelNeedsUpdate, true)
            },
            'closeable': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true), panelNeedsUpdate, true)
            },
            'enableBorders': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true), panelNeedsUpdate, true)
            },
            'panelBorderColor': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(NaN), handleBorderColorChange, true)
            },
            'panelBackgroundColor': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(NaN), handleBackgroundColorChange, true)
            },
            'buttonRadius': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableNumber(3, isFinite), panelNeedsUpdate, true)
            },
            'panelStyleList': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString(), handlePanelStyleListChange, true)
            }
        });
    }

    function verifyMinimized(value) {
        return !this.minimizable || this.minimizable.value || !value;
    }

    function verifyMaximized(value) {
        return !this.maximizable || this.maximizable.value || !value;
    }

    function handleMaximizedChange() {
        /*copyCoordinatesFromSessionedProperties();

        setupButtonIcons(maximizeButton, maximized.value ? _unmaximizeIcon : _maximizeIcon);
        maximizeButton.toolTip = maximized.value ? lang(TOOLTIP_RESTORE) : lang(TOOLTIP_MAXIMIZE);*/
    }

    function handleMinimizedChange() {
        /*if (minimized.value) // minimize
				{
					enabled = visible = false;
					if (!minimizedComponentVersion)
						minimizedComponentVersion = VisTaskbar.instance.addMinimizedComponent(this, restorePanel);
				}
				else // restore
				{
					enabled = visible = true;
					if (minimizedComponentVersion)
						VisTaskbar.instance.removeMinimizedComponent(minimizedComponentVersion);
					minimizedComponentVersion = null;
					copyCoordinatesFromSessionedProperties();

					// this fixes the display bugs that occur when restoring a minimized window
					updateBorders();
				}*/
    }

    function handleZOrderChange() {
        /*if (zOrder.value == 0)
        {
        	zOrderButton.toolTip = lang(TOOLTIP_ZORDER);
        	setupButtonIcons(zOrderButton, [icon_zOrder, icon_zOrderReverse, icon_zOrder]);
        	zOrderButton.setStyle("fillColors", [_titleBarButtonBackgroundColor, _titleBarButtonBackgroundColor]);
        }
        else
        {
        	if (zOrder.value < 0)
        	{
        		zOrderButton.toolTip = lang("Always below");
        		setupButtonIcons(zOrderButton, [icon_zOrderBelow, icon_zOrderBelow_color, icon_zOrderBelow_color]);
        	}
        	else
        	{
        		zOrderButton.toolTip = lang("Always above");
        		setupButtonIcons(zOrderButton, [icon_zOrderAbove, icon_zOrderAbove_color, icon_zOrderAbove_color]);
        	}
        	zOrderButton.setStyle("fillColors", [_titleBarButtonSelectedColor, _titleBarButtonSelectedColor]);
        }
        updatePanelZOrder();*/
    }



    function panelNeedsUpdate() {
        /*if (!parent)
        	return;

        // disable highlight when borders are disabled (avoids display bug when corners are rounded)
        setStyle('highlightAlphas', enableBorders.value ? undefined : [0,0]);

        _enableMoveResize = (!Weave.properties.dashboardMode.value && enableMoveResize.value) || adminMode;
        if (!enableMoveResize.value && _enableMoveResize)
        	_moveImage.alpha = 0.1;
        else
        	_moveImage.alpha = 0.25;

        if (!maximizable.value)
        	maximized.value = false;
        if (!minimizable.value)
        	minimized.value = false;
        if (!enableZOrder.value)
        	zOrder.value = 0;

        invalidateSize();
        invalidateDisplayList();
        updateBorders();*/
    }

    function handleBorderColorChange() {
        //updateBorders();
    }

    function handleBackgroundColorChange() {
        //updateBorders();
    }


    function handlePanelStyleListChange() {
        /*_overriddenStyles = new Object();

        try
        {
        	var ss:StyleSheet = new StyleSheet();
        	var styleName:String = 'panel';
        	ss.parseCSS(styleName + '{' + panelStyleList.value + '}');
        	var style:Object = ss.getStyle(styleName);
        	for (var propName:String in style)
        	{
        		var value:* = style[propName];

        		// the only case that seems to cause problems is Numbers, which will not get parsed properly when
        		// in String format by getStyle(...).  If it is a valid Number, cast it to one
        		try {
        			_overriddenStyles[propName] = Number(value);
        		} catch (e:Error) { } // ok if number parse fails

        		if (isNaN(_overriddenStyles[propName]))
        			_overriddenStyles[propName] = String(value);
        	}
        }
        catch(error:Error) { } // ok if style parse fails

        // notify style change, just a random style chosen here so we only call it once instead of in the loop above
        // this causes the style changes above to take effect
        styleChanged("headerHeight");
        notifyStyleChangeInChildren("headerHeight", true);*/
    }


    DraggablePanel.prototype = new weavecore.ILinkableObject();
    DraggablePanel.prototype.constructor = DraggablePanel;
    var p = DraggablePanel.prototype;


    p.handlePanelTitleChange = function () {
        /*if (panelTitle.value)
        {
        	panelTitleFunction.value = '`' + panelTitle.value.split('`').join('\\`') + '`';
        	// title will be automatically updated by grouped callback
        }
        else
        {
        	title = defaultPanelTitle;
        }*/
    }

    if (typeof exports !== 'undefined') {
        module.exports = DraggablePanel;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.DraggablePanel = DraggablePanel;
    }

    weavecore.ClassUtils.registerClass('weavetool.DraggablePanel', weavetool.DraggablePanel);

}());

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

        // lock an InteractiveVisualization onto the panel
        this._visualization = this.children.requestObject("visualization", weavetool.SimpleInteractiveVisualization, true);

        // returns the interactive visualization
        Object.defineProperty(this, 'visualization', {
            get: function () {
                return this._visualization
            }
        });

        Object.defineProperty(this, 'mainLayerSettings', {
            get: function () {
                return this.visualization.getMainLayerSettings()
            }
        });

        Object.defineProperty(this, 'mainPlotter', {
            get: function () {
                return this.visualization.getMainPlotter()
            }
        });
        Object.defineProperty(this, 'xAxisPlotter', {
            get: function () {
                return this.visualization.getXAxisPlotter()
            }
        });
        Object.defineProperty(this, 'yAxisPlotter', {
            get: function () {
                return this.visualization.getYAxisPlotter()
            }
        });




        WeaveAPI.SessionManager.getCallbackCollection(Weave.properties.visTitleTextFormat).addGroupedCallback(this, updateTitleLabel.bind(this), true);

    }

    function updateTitleLabel() {

        //Weave.properties.visTitleTextFormat.copyToStyle(visTitle);
    }

    function handleTitleToggleChange() {

    }

    SimpleVisTool.prototype = new weavetool.DraggablePanel();
    SimpleVisTool.prototype.constructor = SimpleVisTool;
    var p = SimpleVisTool.prototype;


    /**
     * @param mainPlotterClass The main plotter class definition.
     * @param showAxes Set to true if axes should be added.
     * @return The main plotter.
     */
    p.initializePlotters = function (mainPlotterClass, showAxes) {
        return this.visualization.initializePlotters(mainPlotterClass, showAxes);
    }

    if (typeof exports !== 'undefined') {
        module.exports = SimpleVisTool;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.SimpleVisTool = SimpleVisTool;
    }

    weavecore.ClassUtils.registerClass('weavetool.SimpleVisTool', weavetool.SimpleVisTool);

}());

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
    Object.defineProperty(ScatterPlotTool, 'NS', {
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
    Object.defineProperty(ScatterPlotTool, 'CLASS_NAME', {
        value: 'ScatterPlotTool'
    });


    /**
     *
     * @author adufilie
     * @author sanjay1909
     */
    function ScatterPlotTool() {
        weavetool.SimpleVisTool.call(this);

        Object.defineProperties(this, {
            'isVisibleEquationTextBoolean': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableBoolean(true))
            },
            'attributesToIncludeInProbe': {
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableVariable(Array, null, null), handleAttributesToIncludeInProbe.bind(this), true)
            }
        });

        // lock dynamic objects into place
        this.plotter = this.initializePlotters(weavetool.ScatterPlotPlotter, true);

        //private var
        this._vis_undef_x;
        this._vis_undef_y;
        this._vis_undef_xy;

        //private const
        Object.defineProperties(this, {
            'UNDEFINED_X_NAME': {
                value: "undefinedX"
            },
            'UNDEFINED_Y_NAME': {
                value: "undefinedY"
            },
            'UNDEFINED_XY_NAME': {
                value: "undefinedXY"
            }
        });


        this.visualization.enableProbeLine(true, true);

        //BEGIN TEMPORARY SOLUTION
        this.visualization.plotManager.marginLeftNumber.addGroupedCallback(this, updateAxisLabels.bind(this));
        this.visualization.plotManager.marginBottomNumber.addGroupedCallback(this, updateAxisLabels.bind(this));
        WeaveAPI.SessionManager.getCallbackCollection(this.plotter).addGroupedCallback(this, updateAxisLabels.bind(this), true);
        // END TEMPORARY SOLUTION

        this.visualization.enableZoomAndPan.value = false;

        this.xAxisPlotter.setLabelFunction(this.labelFunctionX, this.plotter.dataX);
        this.yAxisPlotter.setLabelFunction(this.labelFunctionY, this.plotter.dataY);

        this.visualization.bottomMarginClickCallbacks.addImmediateCallback(this, function () {
            //AttributeSelectorPanel.open(plotter.dataX);
        });
        this.visualization.leftMarginClickCallbacks.addImmediateCallback(this, function () {
            // AttributeSelectorPanel.open(plotter.dataY);
        });

        this.visualization.enableAutoZoomXToNiceNumbers.value = true;
        this.visualization.enableAutoZoomYToNiceNumbers.value = true;

        WeaveAPI.SessionManager.getCallbackCollection(this.plotter).addGroupedCallback(this, this.handlePanelTitleChange.bind(this), true);

        this.visualization.plotManager.marginBottom.value = "80";
        this.visualization.plotManager.marginTop.value = "30";
        this.visualization.plotManager.marginLeft.value = "80";
        this.visualization.plotManager.marginRight.value = "30";

        initializeUndefinedLayers.call(this);
        //initRegressionLayer();

        this.children.childListCallbacks.addGroupedCallback(this, handleChildrenChildList.bind(this));
    }

    function initializeUndefinedLayers() {
        this._vis_undef_x = this.children.requestObject(this.UNDEFINED_X_NAME, weavetool.SimpleInteractiveVisualization, true);
        this._vis_undef_y = this.children.requestObject(this.UNDEFINED_Y_NAME, weavetool.SimpleInteractiveVisualization, true);
        this._vis_undef_xy = this.children.requestObject(this.UNDEFINED_XY_NAME, weavetool.SimpleInteractiveVisualization, true);

        /*AttributeMenuTool.hack_skipToolTargets[vis_undef_x] = true;
        AttributeMenuTool.hack_skipToolTargets[vis_undef_y] = true;
        AttributeMenuTool.hack_skipToolTargets[vis_undef_xy] = true;*/

        /*this._vis_undef_x.toolTip = "Undefined X";
        this._vis_undef_y.toolTip = "Undefined Y";
        this._vis_undef_xy.toolTip = "Undefined X and Y";*/

        //WeaveAPI.SessionManager.getCallbackCollection(this.visualization.plotManager.zoomBounds).addImmediateCallback(this, resizeUndefinedLayers, true);

        [this._vis_undef_x, this._vis_undef_y, this._vis_undef_xy].forEach(function (vis) {
            vis.initializePlotters(weavetool.ScatterPlotPlotter, false);
            vis.enableAutoZoomXToNiceNumbers.value = true;
            vis.enableAutoZoomYToNiceNumbers.value = true;

            var _plotter = vis.getMainPlotter();
            WeaveAPI.SessionManager.linkSessionState(this.plotter.fill.color, _plotter.fill.color);
            WeaveAPI.SessionManager.linkSessionState(this.plotter.fill.alpha, _plotter.fill.alpha);
            WeaveAPI.SessionManager.linkSessionState(this.plotter.sizeBy, _plotter.sizeBy);
            WeaveAPI.SessionManager.linkSessionState(this.plotter.defaultScreenRadius, _plotter.defaultScreenRadius);
            WeaveAPI.SessionManager.linkSessionState(this.plotter.maxScreenRadius, _plotter.maxScreenRadius);
            WeaveAPI.SessionManager.linkSessionState(this.plotter.minScreenRadius, _plotter.minScreenRadius);

            var undefSettings = vis.getMainLayerSettings();
            undefSettings.hack_includeMissingRecordBounds = true;
            WeaveAPI.SessionManager.linkSessionState(this.visualization.getMainLayerSettings(), undefSettings);
            WeaveAPI.SessionManager.linkSessionState(this.visualization.plotManager.zoomBounds, vis.plotManager.zoomBounds);
        }.bind(this));

        var plotter_undef_x = this._vis_undef_x.getMainPlotter();
        var plotter_undef_y = this._vis_undef_y.getMainPlotter();
        var plotter_undef_xy = this._vis_undef_xy.getMainPlotter();
        hack_setKeyInclusionLogic.call(this, plotter_undef_x, true, false);
        hack_setKeyInclusionLogic.call(this, plotter_undef_y, false, true);
        hack_setKeyInclusionLogic.call(this, plotter_undef_xy, true, true);

        WeaveAPI.SessionManager.linkSessionState(this.plotter.dataX, plotter_undef_y.dataX);
        WeaveAPI.SessionManager.linkSessionState(this.plotter.dataY, plotter_undef_x.dataY);

        /*getCallbackCollection(visualization.plotManager.zoomBounds).addImmediateCallback(this, invalidateDisplayList);

        this.visualization.plotManager.marginTopNumber.addImmediateCallback(this, invalidateDisplayList);
        this.visualization.plotManager.marginBottomNumber.addImmediateCallback(this, invalidateDisplayList);
        this.visualization.plotManager.marginRightNumber.addImmediateCallback(this, invalidateDisplayList);
        this.visualization.plotManager.marginLeftNumber.addImmediateCallback(this, invalidateDisplayList);*/

        this.visualization.gridLineAlpha.addImmediateCallback(this, updateUndefLayerLines.bind(this));
        this.visualization.gridLineColor.addImmediateCallback(this, updateUndefLayerLines.bind(this));
        this.visualization.gridLineThickness.addImmediateCallback(this, updateUndefLayerLines.bind(this), true);
    }

    function hack_setKeyInclusionLogic(undef_plotter, undef_x, undef_y) {
        undef_plotter.hack_setKeyInclusionLogic(
            function (key) {
                return !isFinite(this.plotter.dataX.getValueFromKey(key, Number)) === undef_x && !isFinite(this.plotter.dataY.getValueFromKey(key, Number)) === undef_y;
            }.bind(this), [this.plotter.dataX, this.plotter.dataY]
        );
    }

    function updateUndefLayerLines() {
        var args = [this.visualization.gridLineThickness.value, this.visualization.gridLineColor.value, this.visualization.gridLineAlpha.value];
        (this._vis_undef_x.getMainPlotter()).hack_verticalBackgroundLineStyle = args;
        (this._vis_undef_y.getMainPlotter()).hack_horizontalBackgroundLineStyle = args;
        WeaveAPI.SessionManager.getCallbackCollection(this._vis_undef_x.getMainPlotter()).triggerCallbacks();
        WeaveAPI.SessionManager.getCallbackCollection(this._vis_undef_y.getMainPlotter()).triggerCallbacks();
    }

    function handleChildrenChildList() {
        // this will make sure the undefined x,y visualizations are on top of the main vis.
        // get existing order
        var order = this.children.getNames();
        var args = [this.UNDEFINED_X_NAME, this.UNDEFINED_Y_NAME, this.UNDEFINED_XY_NAME];
        // remove vis_undef_* names
        args.forEach(function (name) {
            order.splice(order.indexOf(name), 1);
        });
        // replace the main vis name with the list of vis names
        var visName = this.children.getName(this.visualization);
        args.unshift(order.indexOf(visName), 1, visName);
        order.splice.apply(null, args);
        // save new order
        this.children.setNameOrder(order);
    }

    function handleAttributesToIncludeInProbe() {

    }

    function updateAxisLabels() {
        this.visualization.bottomMarginColumn = this.plotter.dataX;
        this.visualization.leftMarginColumn = this.plotter.dataY;

        this.xAxisPlotter.setSideAxisName(
            weavedata.ColumnUtils.getTitle(this.plotter.dataX),
            0,
            0, this.visualization.plotManager.marginBottomNumber.value - 3,
            "bottom"
        );

        this.yAxisPlotter.setSideAxisName(
            weavedata.ColumnUtils.getTitle(this.plotter.dataY), -90, -this.visualization.plotManager.marginLeftNumber.value, 0,
            "top"
        );
    }

    ScatterPlotTool.prototype = new weavetool.SimpleVisTool();
    ScatterPlotTool.prototype.constructor = ScatterPlotTool;
    var p = ScatterPlotTool.prototype;


    p.labelFunctionX = function (value) {
        return weavedata.ColumnUtils.deriveStringFromNumber(this.plotter.dataX, value);
    }
    p.labelFunctionY = function (value) {
        return weavedata.ColumnUtils.deriveStringFromNumber(this.plotter.dataY, value);
    }

    p.initSelectableAttributes = function (input) {
        weavedata.ColumnUtils.initSelectableAttributes([this.plotter.dataX, this.plotter.dataY, this.plotter.fill.color], input);
    }

    if (typeof exports !== 'undefined') {
        module.exports = ScatterPlotTool;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.ScatterPlotTool = ScatterPlotTool;
    }

    weavecore.ClassUtils.registerClass('weavetool.ScatterPlotTool', weavetool.ScatterPlotTool);

}());

/* ***** BEGIN LICENSE BLOCK *****
 *
 * This file is part of Weave.
 *
 * The Initial Developer of Weave is the Institute for Visualization
 * and Perception Research at the University of Massachusetts Lowell.
 * Portions created by the Initial Developer are Copyright (C) 2008-2015
 * the Initial Developer. All Rights Reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * ***** END LICENSE BLOCK ***** */

/* "use strict"; */

/*if (!weave.WeavePath)
    return;*/



var checkType = weave.evaluateExpression(null, "(o, type) => o instanceof type");

/**
 * Requests that a panel object be created if it doesn't already exist at the current path.
 * @param type The type of panel requested.
 * @param x A numeric value for the panel X coordinate.
 * @param y A numeric value for the panel Y coordinate.
 * @param width A numeric value for the panel width.
 * @param height A numeric value for the panel height.
 * @return The current WeavePath object.
 */
weave.WeavePath.prototype.requestPanel = function (type, x, y, width, height) {
    this.request(type);

    if (!checkType(this, 'weavetool.DraggablePanel'))
        this._failMessage('requestPanel', type + " is not a DraggablePanel type.", this._path);

    /*var snap = weave.path('WeaveProperties', 'windowSnapGridSize').getState() || '';
    if (snap.indexOf('%') >= 0) {
        x = x + '%';
        y = y + '%';
        width = width + '%';
        height = height + '%';
    }*/
    return this.state({
        panelX: x,
        panelY: y,
        panelWidth: width,
        panelHeight: height
    });
};

/**
 * This is a shortcut for pushing the path to a plotter from the current path, which should reference a visualization tool.
 * @param plotterName (Optional) The name of an existing or new plotter.
 *                    If omitted and the current path points to a LayerSettings object, the corresponding plotter will be used.
 *                    Otherwise if omitted the default plotter name ("plot") will be used.
 * @param plotterType (Optional) The type of plotter to request if it doesn't exist yet.
 * @return A new WeavePath object which remembers the current WeavePath as its parent.
 */
weave.WeavePath.prototype.pushPlotter = function (plotterName, plotterType, index) {
    index = (index === undefined) ? 0 : index;
    var pathArray = [];
    // if (index > 0) {
    for (var i = 0; i <= index; i++) {
        pathArray[i] = this._path[i]
    }
    // }
    var tool = this.weave.path(pathArray);
    if (!checkType(tool, 'weavetool.SimpleVisTool'))
        this._failMessage('pushPlotter', "Not a compatible visualization tool", this._path);

    if (!plotterName)
        plotterName = checkType(this, 'LayerSettings') ? this._path[this._path.length - 1] : 'plot';

    var result = tool.push('children', 'visualization', 'plotManager', 'plotters', plotterName);
    result._parent = this;
    if (plotterType)
        result.request(plotterType);
    return result;
};

/**
 * This is a shortcut for pushing the path to a LayerSettings object from the current path, which should reference a visualization tool.
 * @param plotterName (Optional) The name of an existing plotter.
 *                    If omitted, either the plotter at the current path or the default plotter ("plot") will be used.
 * @return A new WeavePath object which remembers the current WeavePath as its parent.
 */
weave.WeavePath.prototype.pushLayerSettings = function (plotterName, index) {
    index = (index === undefined) ? 0 : index;
    var tool = this.weave.path(this._path[index]);
    if (!checkType(tool, 'weavetool.SimpleVisTool'))
        this._failMessage('pushLayerSettings', "Not a compatible visualization tool", this._path);

    if (!plotterName)
        plotterName = checkType(this, 'IPlotter') ? this._path[this._path.length - 1] : 'plot';

    var result = tool.push('children', 'visualization', 'plotManager', 'layerSettings', plotterName);
    result._parent = this;
    return result;
};
