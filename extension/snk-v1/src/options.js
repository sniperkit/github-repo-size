/*
    Refs:
    - https://github.com/sniperkit/GitHub-Helper.Chrome/blob/master/res/js/options.js
    - 
*/

const $$ = document.getElementById.bind(document)

const $githubToken = $$("github-token")
const $cloneDir = $$("clone-dir")
const $msg = $$("msg")

function save_options() {
    chrome.storage.sync.set({ cloneDir: $cloneDir.value, githubToken: $githubToken.value }, () => {
        $msg.textContent = "Saved."
        console.log("githubToken = "+$githubToken.value)
        console.log("cloneDir = "+$cloneDir.value)
        setTimeout(() => {
            $msg.textContent = ""
        }, 850)
    })
}

function restore_options() {
    chrome.storage.sync.get({ cloneDir: "",githubToken: "" }, items => {
        $cloneDir.value = items.cloneDir
        $githubToken.value = items.githubToken
    })
}

document.addEventListener('DOMContentLoaded', restore_options)
$$("save").addEventListener('click', save_options)