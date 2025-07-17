async function getText(name, type) {
    const resp = await fetch(`/window_content/${name}.${type}`);
    let text = await resp.text();
    return text;
}

export const files = {
    "💀.jpg" : `<img src="/images/legbones_compressed.jpg" style="width: auto; height: 100%" />`,

    "joonchicken.github.io.note" : `${await getText("joonchicken.github.io", "html")}`,

    "about.note" : "Copyright ©2025 Joon Heo",

    "blank.note" : "",

    "fooled.note" : "",

    "ya.note" : "SSN: 963-50-3233",

    "temporary.note" : `01d3fca2a598218b3cfa176b4091c600
                        1e8f00f320cd2f1699c272db23dcbdb7
                        6a7c05c7ea6ca30905b9900d4e5a9882
                        2ee193231a04915dc82f1f05076ffcb0
                        2001b3eea7f98a90f4dafcb1f18937f3
                        0f5e51e1f577dc484d72c820faff9a15
                        ce28f7906487df7277d15cfd7a8b4adf
                        c1f4f4284c32ea58bcced834ee34555a
                        ebe0ef666186e30a3577b8855fb8e381
                        52ea9457af4eaffc5bd065f8fcc0706f`,

    "yes.note" : `
        <div class ="marquee" style="height: 1000px; overflow: hidden">
            <div class="marquee-content">
                <h1>
                    Yes.
                </h1>
            </div>
        </div>
    `,

    "hello.note" : `
        <div style="display: flex; justify-content: center;">
        <h1 style="font-size: 390px; margin: 0px">
            HI
        </h1>
    `,

    "why.note" : `
        <img src="/images/not_a_kiwi.jpg" style="width: 100%; height: 70%;">
        <div class="center">
            <h1 style="font-size: 100px; font-family: impact, 'Times New Roman', Times, serif; margin: 0px">
                WHY?????
            </h1>
        </div>
    `,

    "remember.note" : `
        <h1>Remember...</h1>
        <ul>
            <li>2 carrot...</li>
            <li>pineapple...</li>
            <li>"spicy" HDMI cable (11")...</li>
            <li>3 gallons mayonnaise...</li>
            <li>WD-40...</li>
            <li>5 cent euro coin...</li>
            <li>meat thermometer...</li>
            <li>plastic bag...</li>
            <li>00 flour...</li>
            <li>apple cider vinegar...</li>
            <li>BEWARE BEWARE BEWARE...</li>
            <ul><li>sus is near</li></ul>
        </ul>
    `,

    "gatsby.note" : `<pre>${await getText("gatsby", "txt")}</pre>`,

    "trojan.exe" : `
        <div style="height: 100%; width: 100%; color: #fffa; font-family: 'windows', sans-serif; background-color: black; padding: 2px;">
        █
        </div>
    `
}