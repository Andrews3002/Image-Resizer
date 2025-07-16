const {app, BrowserWindow} = require("electron")
const path = require("path")

const isDev = process.env.NODE_ENV != 'development'
const isMac = process.platform === 'darwin'

function createMainWindow(){
    const mainWindow = new BrowserWindow({
        title: "Image Resizer",
        height: 1080,
        width: isDev ? 1000 : 500
    })

    // Open devtools if in dev env
    if(isDev){
        mainWindow.webContents.openDevTools()
    }

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'))
}

app.whenReady().then(() => {
    createMainWindow()

    app.addListener('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0){
            createMainWindow()
        }
    })
})

app.addListener('window-all-closed', () => {
    if(!isMac){
        app.quit()
    }
})

