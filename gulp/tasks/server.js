export function server(done) {
    app.plugins.browsersync.init({
        server: { baseDir: `${app.path.res.html}` },
        notify: false,
        // online: false,//для работы онлайн
        port: 3000
    })
}