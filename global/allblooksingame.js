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
