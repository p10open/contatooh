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
    grunt.loadNpmTasks('grunt-contrib-copy');//permite copiar o diretório da aplicação
    grunt.loadNpmTasks('grunt-contrib-clean');//permite limpar um diretório 
    grunt.loadNpmTasks('grunt-contrib-concat');//permite concatenar arquivos .css e .js
    grunt.loadNpmTasks('grunt-contrib-uglify');//permite minificar arquivos .js
    grunt.loadNpmTasks('grunt-contrib-cssmin');//permite minificar arquivos .css
    grunt.loadNpmTasks('grunt-usemin');//gera configurações automáticas para utilização dos plugins de concatenação e minificação
    grunt.loadNpmTasks('grunt-ng-annotate');//plugin que permite adicionar anotações nos parâmetros recebidos por injeção no angular -> 
    //para não sofrerem impactos da minificação 
    //end
};