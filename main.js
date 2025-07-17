const {app, BrowserWindow, Menu} = require("electron")
const path = require("path")

const isDev = process.env.NODE_ENV != 'development'
const isMac = process.platform === 'darwin'

function createMainWindow(){
    const mainWindow = new BrowserWindow({
        title: "Image Resizer",
        height: 1080,
        width: isDev ? 1000 : 500
    })

    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)

    // Open devtools if in dev env
    if(isDev){
        mainWindow.webContents.openDevTools()
    }

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'))
}

function createAboutWindow(){
    const aboutWindow = new BrowserWindow({
        title: "Image Resizer",
        height: 300,
        width: 300
    })

    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)

    aboutWindow.loadFile(path.join(__dirname, './renderer/about.html'))
}

app.whenReady().then(() => {
    createMainWindow()

    app.addListener('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0){
            createMainWindow()
        }
    })
})


// const fileMenuTab = {
//     label: 'File',
//     submenu: [
//         {
//             label: 'Quit',
//             click: () => app.quit(),
//             accelerator: 'CmdOrCtrl+W'
//         }
//     ]
// }
//
//OR
//
const fileMenuTab = {
    role: 'fileMenu'
}

const macAbout = {
    label: app.name,
    submenu: [
        {
            label: 'About',
            createAboutWindow
        }
    ]
}

const winAbout = {
    label: "Help",
    submenu: [
        {
            label: 'About',
            click: createAboutWindow
        }
    ]
}

//Menu Template
const menu = [fileMenuTab, ...(isMac ? [macAbout] : [winAbout])]

app.addListener('window-all-closed', () => {
    if(!isMac){
        app.quit()
    }
})

