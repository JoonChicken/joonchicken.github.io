class Node {
    constructor(type, name, children) {
        this.type = type;
        this.name = name;
        this.selected = true;
        this.children = children;
    }
}

export default [
    new Node("folder", "projects", [
        new Node("folder", "joonchicken.github.io", [
            new Node("file", "joonchicken.github.io", []),
            new Node("file", "about", [])
        ])
    ]),
    new Node("folder", "temp", [
        new Node("folder", "temporary", []),
        new Node("file", "joooon", [])
    ]),
    new Node("folder", "This_is_some_really_quite_long_text", [
        new Node("folder", "joonchicken.github.io", [
            new Node("file", "joonchicken.github.io", []),
            new Node("file", "about", [])
        ])
    ]),
    new Node("file", "I, too, am in this episode", [
        new Node("folder", "temporary", []),
        new Node("file", "joooon", [])
    ]),
    new Node("folder", "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", [
        new Node("folder", "temporary", []),
        new Node("file", "joooon", [])
    ]),
    new Node("folder", "no", [
        new Node("folder", "joonchicken.github.io", [
            new Node("file", "joonchicken.github.io", []),
            new Node("file", "about", [])
        ])
    ]),
    new Node("folder", "homework", [
        new Node("folder", "temporary", []),
        new Node("file", "joooon", [])
    ]),
    new Node("folder", ";)", [
        new Node("folder", "joonchicken.github.io", [
            new Node("file", "joonchicken.github.io", []),
            new Node("file", "about", [])
        ])
    ]),
    new Node("folder", "projects", [
        new Node("folder", "joonchicken.github.io", [
            new Node("file", "joonchicken.github.io", []),
            new Node("file", "about", [])
        ])
    ]),
    new Node("folder", "temp", [
        new Node("folder", "temporary", []),
        new Node("file", "joooon", [])
    ]),
    new Node("folder", "This_is_some_really_quite_long_text", [
        new Node("folder", "joonchicken.github.io", [
            new Node("file", "joonchicken.github.io", []),
            new Node("file", "about", [])
        ])
    ]),
    new Node("folder", "I, too, am in this episode", [
        new Node("folder", "temporary", []),
        new Node("file", "joooon", [])
    ]),
    new Node("folder", "hee hee ha ha", [
        new Node("folder", "temporary", []),
        new Node("file", "joooon", [])
    ]),
    new Node("folder", "no", [
        new Node("folder", "joonchicken.github.io", [
            new Node("file", "joonchicken.github.io", []),
            new Node("file", "about", [])
        ])
    ]),
    new Node("folder", "homework", [
        new Node("folder", "temporary", []),
        new Node("file", "joooon", [])
    ]),
    new Node("folder", ";)", [
        new Node("folder", "joonchicken.github.io", [
            new Node("file", "joonchicken.github.io", []),
            new Node("file", "about", [])
        ])
    ])
]