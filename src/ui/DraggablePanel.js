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
                value: WeaveAPI.SessionManager.registerLinkableChild(this, new weavecore.LinkableString(), handlePanelTitleChange, true)
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

    function handlePanelTitleChange() {
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




    if (typeof exports !== 'undefined') {
        module.exports = DraggablePanel;
    } else {

        window.weavetool = window.weavetool ? window.weavetool : {};
        window.weavetool.DraggablePanel = DraggablePanel;
    }

    weavecore.ClassUtils.registerClass('weavetool.DraggablePanel', weavetool.DraggablePanel);

}());
