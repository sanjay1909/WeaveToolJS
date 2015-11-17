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
            }
        })






        // register all properties as children of this object
        WeaveAPI.SessionManager.getLinkablePropertyNames(this).forEach(function (propertyName) {
            WeaveAPI.SessionManager.registerLinkableChild(this, this[propertyName]);
        }.bind(this));

        visTextFormat.size.value = 11;
        axisTitleTextFormat.size.value = 13;
        visTitleTextFormat.size.value = 16;

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

        panelTitleTextFormat.font.value = "Verdana";
        panelTitleTextFormat.size.value = 10;
        panelTitleTextFormat.color.value = 0xFFFFFF;

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

        /**
         * This function will run the JavaScript code specified in the startupScript LinkableString.
         */
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
} * /
