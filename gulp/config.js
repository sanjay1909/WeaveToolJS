var dest = "./build";
var outputDocsFolder = dest + "/docs";
var src = './src';

//used both for Source reference and Order reference
var buildOrder = [



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
