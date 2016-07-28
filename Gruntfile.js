module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            project: {
                expand: true,
                cwd: '.',
                src: ['**', '!Gruntfile.js', '!package.json',
                '!bower.json'],
                dest: 'dist'
            }
        },
        clean: {
            dist: {
                src: 'dist'
            }
        },
        usemin: {
            html: 'dist/app/views/**/*.ejs'
        },
        useminPrepare: {
            options: {
                root: 'dist/public',
                dest: 'dist/public'
            },
            html: 'dist/app/views/**/*.ejs'
        },
        ngAnnotate: {
            scripts: {
                expand: true,
                src: ['dist/public/js/**/*.js']
            }
        }
    });

    //registra atalhos de tarefas
    grunt.registerTask('default', ['dist','minifica']);
    grunt.registerTask('minifica', ['useminPrepare', 'ngAnnotate',
                                    'concat', 'uglify', 'cssmin', 'usemin'])
    grunt.registerTask('dist', ['clean', 'copy']);
    //end

    //registra plugins
    grunt.loadNpmTasks('grunt-contrib-copy');//permite copiar o diret�rio da aplica��o
    grunt.loadNpmTasks('grunt-contrib-clean');//permite limpar um diret�rio 
    grunt.loadNpmTasks('grunt-contrib-concat');//permite concatenar arquivos .css e .js
    grunt.loadNpmTasks('grunt-contrib-uglify');//permite minificar arquivos .js
    grunt.loadNpmTasks('grunt-contrib-cssmin');//permite minificar arquivos .css
    grunt.loadNpmTasks('grunt-usemin');//gera configura��es autom�ticas para utiliza��o dos plugins de concatena��o e minifica��o
    grunt.loadNpmTasks('grunt-ng-annotate');//plugin que permite adicionar anota��es nos par�metros recebidos por inje��o no angular -> 
    //para n�o sofrerem impactos da minifica��o 
    //end
};