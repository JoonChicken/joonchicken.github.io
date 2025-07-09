class Node {
    constructor(category, type, name, children) {
        this.category = category;
        this.type = type
        this.name = name;
        this.selected = false;
        this.children = children;
    }
}

export default new Node("My Computer", "", "My Computer", [
    new Node("drive", "Local Disk", "C:", [
        new Node("folder", "File Folder", "projects", [
            new Node("folder", "File Folder", "joonchicken.github.io", [
                new Node("file", "NOTE File", "joonchicken.github.io", []),
                new Node("file", "NOTE File", "about", [])
            ])
        ]),
        new Node("folder", "File Folder", "temp", [
            new Node("folder", "File Folder", "temporary", []),
            new Node("file", "NOTE File", "joooon", [])
        ]),
        new Node("folder", "File Folder", "This_is_some_really_quite_long_text", [
            new Node("folder", "File Folder", "joonchicken.github.io", [
                new Node("file", "NOTE File", "joonchicken.github.io", []),
                new Node("file", "NOTE File", "about", [])
            ])
        ]),
        new Node("file", "NOTE File", "I, too, am in this episode", []),
        new Node("folder", "File Folder", "lllllllllllllllllllllllllllllllllll", [
            new Node("folder", "File Folder", "temporary", []),
            new Node("file", "NOTE File", "joooon", [])
        ]),
        new Node("folder", "File Folder", "no", [
            new Node("folder", "File Folder", "joonchicken.github.io", [
                new Node("file", "NOTE File", "joonchicken.github.io", []),
                new Node("file", "NOTE File", "about", [])
            ])
        ]),
        new Node("folder", "File Folder", "homework", [
            new Node("folder", "File Folder", "temporary", []),
            new Node("file", "NOTE File", "joooon", [])
        ]),
        new Node("folder", "File Folder", ";)", [
            new Node("folder", "File Folder", "joonchicken.github.io", [
                new Node("file", "NOTE File", "joonchicken.github.io", []),
                new Node("file", "NOTE File", "about", [])
            ])
        ])
    ])
])