(async () => {
    function reactHandler() {
        return Object.values(document.querySelector('#app > div > div'))[1].children[1]._owner;
    }

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
        if (!location.href.includes("/lobby")) {
          alert("You don't seem to be on the blooks page. Join a game, and then run this while waiting in the lobby.");
          location.reload();
        }
        
        reactHandler().stateNode.setState({
            lockedBlooks: []
        })
        
    } catch (e) {
        confirm('An error has occured, Would you like to report this on github?') ? window.open('https://github.com/notzastix/Blooket-Hacks/issues/new') : ""
    }
    alert('These cheats/hacks are coded by: qaiik and zastix')
})();
