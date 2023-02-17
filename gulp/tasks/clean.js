//удаление папки с результатом (перед выгрузкой новой)
export function clean() {
    return app.deleteAsync(app.path.clean.res)
}
