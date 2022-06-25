(async () => {
    n = document.createElement('iframe');
    document.body.append(n);
    window.alert = n.contentWindow.alert.bind(window);
    window.prompt = n.contentWindow.prompt.bind(window);
    window.confirm = n.contentWindow.confirm.bind(window);
    n.remove();

    value = window.webpackJsonp.map(e => Object.keys(e[1]).map(t => e[1][t])).reduce((e, t) => [...e, ...t], []).find(e => /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(e.toString()) && /\(new TextEncoder\)\.encode\(\"(.+?)\"\)/.test(e.toString())).toString();
    window.blooketBuild = value.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/)[0]
    window.secret = value.match(/\(new TextEncoder\)\.encode\(\"(.+?)\"\)/)[1]

    try {
        var encodeValues = async (e, t) => {
            let d = window.crypto.getRandomValues(new Uint8Array(12));
            return window.btoa(Array.from(d).map(e => String.fromCharCode(e)).join("") + Array.from(new Uint8Array(await window.crypto.subtle.encrypt({
                name: "AES-GCM",
                iv: d
            }, await window.crypto.subtle.importKey("raw", await window.crypto.subtle.digest("SHA-256", (new TextEncoder).encode(t)), {
                name: "AES-GCM"
            }, !1, ["encrypt"]), (new TextEncoder).encode(JSON.stringify(e))))).map(e => String.fromCharCode(e)).join(""))
        };
        async function getName() {
            let r = await fetch("https://api.blooket.com/api/users", {
                credentials: "include"
            })
            return (await r.json()).name
        }

        async function getBlooks() {
            let r = await fetch("https://api.blooket.com/api/users", {
                credentials: "include"
            })
            return (await r.json()).unlocks
        }

        async function sellBlook(name, qty) {
            return await fetch("https://api.blooket.com/api/users/sellblook", {
                method: "PUT",
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                    "X-Blooket-Build": window.blooketBuild
                },
                body: await encodeValues({
                    name: await getName(),
                    blook: name,
                    numSold: qty //quantity
                }, window.secret)
            })
        }
        
        let amounts = await getBlooks();
        for (const blook in amounts) {
            if (amounts[blook] > 1) {
                console.log(`Selling ${amounts[blook] - 1} ${blook}`)
                let sold = await sellBlook(blook, (amounts[blook] - 1))
                if (!sold.ok) throw new Error();
            }
        }
        
        location.reload()
        
        
    } catch (e) {
        confirm('An error has occured, Would you like to report this on github?') ? window.open('https://github.com/notzastix/Blooket-Hacks/issues/new') : ""
    }
    alert('These cheats/hacks are coded by: rxzyx, qaiik and zastix')
})();
