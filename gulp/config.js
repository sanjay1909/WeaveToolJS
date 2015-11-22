var dest = "./build";
var outputDocsFolder = dest + "/docs";
var src = './src';

//used both for Source reference and Order reference
var buildOrder = [

    'src/IVisTool.js',
    'src/WeaveProperties.js',
    'src/Weave.js',
    'src/utils/SpatialIndex.js',
     'src/utils/ZoomUtils.js',

    'src/plotters/IPlotter.js',
    'src/plotters/AbstractPlotter.js',
    'src/plotters/AbstractGlyphPlotter.js',
    'src/plotters/ScatterPlotPlotter.js',
    'src/plotters/SimpleAxisPlotter.js',
    'src/plotters/ProbeLinePlotter.js',
    'src/plotters/PlotTask.js',

    'src/layers/styles/SolidFillStyle.js',
    'src/layers/styles/SolidLineStyle.js',



    'src/layers/LayerSettings.js',
    'src/layers/PlotManager.js',
    'src/layers/Visualization.js',
    'src/layers/InteractiveVisualization.js',
    'src/layers/SimpleInteractiveVisualization.js',

    'src/ui/DraggablePanel.js',
    'src/tools/SimpleVisTool.js',
    'src/tools/ScatterPlotTool.js',
    'src/WeavePathUI.js'



               ];

module.exports = {
    context: __dirname,
    browserSync: {
        server: {
            // Serve up our build folder
            baseDir: dest
        }
    },
    sass: {
        src: src + "/sass/**/*.{sass,scss}",
        dest: dest,
        settings: {
            indentedSyntax: true, // Enable .sass syntax!
            imagePath: 'images' // Used by the image-url helper
        }
    },
    images: {
        src: src + "/images/**",
        dest: dest + "/images"
    },
    markup: {
        src: src + "/htdocs/**",
        dest: dest
    },
    iconFonts: {
        name: 'Gulp Starter Icons',
        src: src + '/icons/*.svg',
        dest: dest + '/fonts',
        sassDest: src + '/sass',
        template: './gulp/tasks/iconFont/template.sass.swig',
        sassOutputName: '_icons.sass',
        fontPath: 'fonts',
        className: 'icon',
        options: {
            fontName: 'Post-Creator-Icons',
            appendCodepoints: true,
            normalize: false
        }
    },
    concat: {
        combined: 'weavetool.js',
        scriptFiles: buildOrder,
        dest: dest
    },

    lint: {
        scriptFiles: buildOrder
    },
    production: {
        cssSrc: dest + '/*.css',
        jsSrc: dest + '/*.js',
        dest: dest
    }
};
