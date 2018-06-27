'use strict';

/* global chrome, alert, prompt, confirm */

/*
  Refs:
  - https://github.com/sniperkit/GitHub-Helper.Chrome/blob/master/res/js/background.js
  - 

*/

// internal vars
const GITHUB_TOKEN_KEY = 'x-github-token'
const TOKEN_FEATURE_INFORMATION_KEY = 'user-knows-token-feature'

// chrome 
const storage = chrome.storage.sync || chrome.storage.local

// setGithubToken function allows...
function setGithubToken (key, cb) {
  const obj = {}

  obj[GITHUB_TOKEN_KEY] = key

  storage.set(obj, function () {
    alert('Your Github token has been set successfully. Reload the Github page to see changes.')

    cb()
  })
}

// handleOldGithubToken function allows...
function handleOldGithubToken (cb) {
  storage.get(GITHUB_TOKEN_KEY, function (storedData) {
    const oldGithubToken = storedData[GITHUB_TOKEN_KEY]

    if (oldGithubToken) {
      if (confirm('You have already set your Github token. Do you want to remove it?')) {
        storage.remove(GITHUB_TOKEN_KEY, function () {
          alert('You have successfully removed Github token. Click extension icon again to set a new token.')

          cb(false)
        })
      } else {
        cb(false)
      }
    } else {
      cb(true)
    }
  })
}

// userNowKnowsAboutGithubTokenFeature function allows...
const userNowKnowsAboutGithubTokenFeature = (cb) => {
  const obj = {}
  obj[TOKEN_FEATURE_INFORMATION_KEY] = true

  storage.set(obj, cb)
}

// informUserAboutGithubTokenFeature function allows...
function informUserAboutGithubTokenFeature () {
  storage.get(TOKEN_FEATURE_INFORMATION_KEY, function (storedData) {
    const userKnows = storedData[TOKEN_FEATURE_INFORMATION_KEY]

    if (!userKnows) {
      if (confirm('GitHub Repository Size now supports private repositories through Github personal access tokens. Do you want to add a token?')) {
        askGithubToken(() => {
          userNowKnowsAboutGithubTokenFeature(() => {})
        })
      } else {
        userNowKnowsAboutGithubTokenFeature(() => {
          alert('You can click extension icon to set a token.')
        })
      }
    }
  })
}

// askGithubToken function allows to set a github_token in chrome store
const askGithubToken = (cb) => {
  const githubToken = prompt('Please enter your Github token')
  if (githubToken === null) return
  if (githubToken) {
    setGithubToken(githubToken, cb)
  } else {
    alert('You have entered an empty token.')
    cb()
  }
}

chrome.browserAction.onClicked.addListener(function(tab) {
    var matches = tab.url.match(/:\/\/github\.com\/([a-zA-Z0-9\.-]+)\/([a-zA-Z0-9\.-]+)/);
    if (matches) {
        window.open("http://sourcegraph.com/github.com/" + matches[1] + "/" + matches[2]);
    }
});

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener(function (tabId) {
  chrome.pageAction.show(tabId);
});

console.log('\'Hello \'SNK! Event Page for Page Action');

chrome.browserAction.onClicked.addListener((tab) => {
  handleOldGithubToken((askToSetToken) => {
    if (askToSetToken) {
      askGithubToken(() => {})
    }
  })
})

informUserAboutGithubTokenFeature()
